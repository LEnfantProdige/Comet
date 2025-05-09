
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { Infinity } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";

interface SeaLocation {
  depth: number;
  name: string;
  description: string;
  color: string;
}

const DeepSeaExploration = ({ onBack }: { onBack: () => void }) => {
  const { t } = useLanguage();
  const [currentDepth, setCurrentDepth] = useState(0);
  const [direction, setDirection] = useState<"down" | "up">("down");
  const [autoScroll, setAutoScroll] = useState(false);

  const seaLocations: SeaLocation[] = [
    { depth: 0, name: "Surface de l'océan", description: "Niveau de la mer", color: "bg-cyan-300" },
    { depth: 50, name: "Zone euphotique", description: "La lumière solaire peut pénétrer ici", color: "bg-cyan-400" },
    { depth: 200, name: "Zone dysphotique", description: "Zone de pénombre, peu de lumière solaire", color: "bg-cyan-500" },
    { depth: 500, name: "Zone mésopélagique", description: "Habitat des calamars géants", color: "bg-cyan-600" },
    { depth: 1000, name: "Zone bathyale", description: "Début de l'obscurité totale", color: "bg-blue-600" },
    { depth: 2000, name: "Zone abyssale", description: "Pression 200 fois supérieure à la surface", color: "bg-blue-700" },
    { depth: 3000, name: "Grandes plaines abyssales", description: "Vastes étendues de sédiments", color: "bg-blue-800" },
    { depth: 4000, name: "Zone de dorsales océaniques", description: "Sources hydrothermales", color: "bg-indigo-700" },
    { depth: 5000, name: "Fosses abyssales", description: "Dépressions les plus profondes des océans", color: "bg-indigo-800" },
    { depth: 6000, name: "Zone hadal", description: "Les fosses les plus profondes de la planète", color: "bg-violet-700" },
    { depth: 8000, name: "Challenger Deep", description: "Proche du point le plus profond de l'océan", color: "bg-violet-800" },
    { depth: 10000, name: "Abîme de Challenger", description: "10 911 m - Le point le plus profond de la Terre", color: "bg-purple-800" }
  ];

  const closestLocation = seaLocations.reduce((prev, curr) => 
    Math.abs(curr.depth - currentDepth) < Math.abs(prev.depth - currentDepth) ? curr : prev
  );

  const maxDepth = seaLocations[seaLocations.length - 1].depth;
  
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollElement = event.currentTarget;
    const scrollPercentage = scrollElement.scrollTop / (scrollElement.scrollHeight - scrollElement.clientHeight);
    const newDepth = scrollPercentage * maxDepth;
    setCurrentDepth(Math.min(Math.max(newDepth, 0), maxDepth));
    setDirection(newDepth > currentDepth ? "down" : "up");
  };
  
  useEffect(() => {
    if (autoScroll) {
      const interval = setInterval(() => {
        if (direction === "down" && currentDepth < maxDepth) {
          setCurrentDepth(d => Math.min(d + 10, maxDepth));
        } else if (direction === "up" && currentDepth > 0) {
          setCurrentDepth(d => Math.max(d - 10, 0));
          if (currentDepth <= 0) {
            setDirection("down");
          }
        } else if (currentDepth >= maxDepth) {
          setDirection("up");
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [autoScroll, direction, currentDepth, maxDepth]);
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" onClick={onBack} className="text-emerald-400 border-emerald-600/30">
          {t('back')}
        </Button>
        <Button 
          variant={autoScroll ? "default" : "outline"} 
          onClick={() => setAutoScroll(!autoScroll)} 
          className={autoScroll ? "bg-gradient-to-r from-emerald-600 to-green-700" : "text-emerald-400 border-emerald-600/30"}
        >
          {autoScroll ? t('science.autopilot.stop') : t('science.autopilot.start')}
        </Button>
      </div>

      <Card className="border-2 border-emerald-600/50 backdrop-blur-sm bg-black/30">
        <CardHeader>
          <CardTitle className="flex items-center text-emerald-400">
            <Infinity className="mr-2" /> 
            {t('science.deepsea')} - {Math.round(currentDepth)} m
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="relative h-80 border-2 border-emerald-600/30 rounded-lg p-2 flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-purple-900/70 rounded-lg" />
                <div className="relative z-10 flex-grow flex flex-col justify-between">
                  {/* Indicateur de position */}
                  <div className="absolute right-0 h-full w-4 bg-black/50 rounded-r-lg overflow-hidden">
                    {seaLocations.map((loc) => (
                      <div 
                        key={loc.depth} 
                        className={`absolute w-4 h-1 ${loc.color} transition-all duration-300`}
                        style={{ top: `${(loc.depth / maxDepth) * 100}%` }}
                      />
                    ))}
                    <div 
                      className="absolute w-4 h-2 bg-white transition-all duration-100"
                      style={{ top: `${(currentDepth / maxDepth) * 100}%` }}
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="text-4xl font-bold text-white">-{Math.round(currentDepth)}</div>
                    <div className="text-xs text-gray-300">mètres</div>
                  </div>
                  
                  <div className="p-2 bg-black/30 rounded-lg">
                    <div className="text-lg font-bold text-emerald-400">{closestLocation.name}</div>
                    <div className="text-xs text-gray-300">{closestLocation.description}</div>
                  </div>
                  
                  <ProgressBar value={currentDepth} max={maxDepth} label="Profondeur" />
                </div>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <ScrollArea className="h-80 border-2 border-emerald-600/30 rounded-lg p-2" onScroll={handleScroll}>
                <div className="space-y-64">
                  {seaLocations.map((location) => (
                    <div 
                      key={location.depth} 
                      className={`p-4 rounded-lg ${
                        Math.abs(location.depth - currentDepth) < 100 ? 
                        `${location.color}/20 border border-${location.color.replace('bg-', '')} animate-pulse` : 
                        'bg-black/20'
                      }`}
                    >
                      <h3 className="text-lg font-bold text-white">-{location.depth} m - {location.name}</h3>
                      <p className="text-sm text-gray-300">{location.description}</p>
                    </div>
                  ))}
                  <div className="h-20" /> {/* Espace supplémentaire pour le défilement */}
                </div>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeepSeaExploration;
