
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { Rocket } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";

interface SpaceLocation {
  height: number;
  name: string;
  description: string;
  color: string;
}

const SpaceElevator = ({ onBack }: { onBack: () => void }) => {
  const { t } = useLanguage();
  const [currentHeight, setCurrentHeight] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [autoScroll, setAutoScroll] = useState(false);
  
  const spaceLocations: SpaceLocation[] = [
    { height: 0, name: "Surface terrestre", description: "Niveau de la mer", color: "bg-emerald-500" },
    { height: 5, name: "Limite des nuages bas", description: "Altitude des nuages bas", color: "bg-emerald-500" },
    { height: 12, name: "Limite des avions commerciaux", description: "Altitude de croisière maximale des avions de ligne", color: "bg-emerald-400" },
    { height: 20, name: "Stratosphère inférieure", description: "Début de la stratosphère", color: "bg-emerald-400" },
    { height: 30, name: "Zone des ballons stratosphériques", description: "Altitude maximale des ballons météorologiques", color: "bg-teal-500" },
    { height: 50, name: "Stratopause", description: "Limite entre la stratosphère et la mésosphère", color: "bg-teal-500" },
    { height: 85, name: "Mésopause", description: "Limite entre la mésosphère et la thermosphère", color: "bg-blue-500" },
    { height: 100, name: "Ligne de Kármán", description: "Frontière officiellement reconnue de l'espace", color: "bg-blue-600" },
    { height: 150, name: "Orbite des satellites en orbite basse", description: "Altitude de la Station Spatiale Internationale", color: "bg-indigo-500" },
    { height: 400, name: "Thermosphère moyenne", description: "Zone des aurores boréales", color: "bg-indigo-600" },
    { height: 600, name: "Satellites en orbite moyenne", description: "Zone des satellites de navigation (GPS, GLONASS)", color: "bg-violet-500" },
    { height: 1000, name: "Exosphère", description: "La couche la plus externe de l'atmosphère", color: "bg-violet-600" },
    { height: 2000, name: "Espace lointain", description: "En route vers la Lune", color: "bg-purple-700" },
    { height: 5000, name: "Espace interplanétaire", description: "Profondeurs de l'espace", color: "bg-purple-800" }
  ];
  
  const closestLocation = spaceLocations.reduce((prev, curr) => 
    Math.abs(curr.height - currentHeight) < Math.abs(prev.height - currentHeight) ? curr : prev
  );

  const maxHeight = spaceLocations[spaceLocations.length - 1].height;
  
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollElement = event.currentTarget;
    const scrollPercentage = scrollElement.scrollTop / (scrollElement.scrollHeight - scrollElement.clientHeight);
    const newHeight = scrollPercentage * maxHeight;
    setCurrentHeight(Math.min(Math.max(newHeight, 0), maxHeight));
    setDirection(newHeight > currentHeight ? "up" : "down");
  };
  
  useEffect(() => {
    if (autoScroll) {
      const interval = setInterval(() => {
        if (direction === "up" && currentHeight < maxHeight) {
          setCurrentHeight(h => Math.min(h + 10, maxHeight));
        } else if (direction === "down" && currentHeight > 0) {
          setCurrentHeight(h => Math.max(h - 10, 0));
          if (currentHeight <= 0) {
            setDirection("up");
          }
        } else if (currentHeight >= maxHeight) {
          setDirection("down");
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [autoScroll, direction, currentHeight, maxHeight]);

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
            <Rocket className="mr-2" /> 
            {t('science.space')} - {Math.round(currentHeight)} km
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="relative h-80 border-2 border-emerald-600/30 rounded-lg p-2 flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-emerald-900/50 rounded-lg" />
                <div className="relative z-10 flex-grow flex flex-col justify-between">
                  {/* Indicateur de position */}
                  <div className="absolute right-0 h-full w-4 bg-black/50 rounded-r-lg overflow-hidden">
                    {spaceLocations.map((loc) => (
                      <div 
                        key={loc.height} 
                        className={`absolute w-4 h-1 ${loc.color} transition-all duration-300`}
                        style={{ bottom: `${(loc.height / maxHeight) * 100}%` }}
                      />
                    ))}
                    <div 
                      className="absolute w-4 h-2 bg-white transition-all duration-100"
                      style={{ bottom: `${(currentHeight / maxHeight) * 100}%` }}
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="text-4xl font-bold text-white">{Math.round(currentHeight)}</div>
                    <div className="text-xs text-gray-300">kilomètres</div>
                  </div>
                  
                  <div className="p-2 bg-black/30 rounded-lg">
                    <div className="text-lg font-bold text-emerald-400">{closestLocation.name}</div>
                    <div className="text-xs text-gray-300">{closestLocation.description}</div>
                  </div>
                  
                  <ProgressBar value={currentHeight} max={maxHeight} label="Altitude" />
                </div>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <ScrollArea className="h-80 border-2 border-emerald-600/30 rounded-lg p-2" onScroll={handleScroll}>
                <div className="space-y-64">
                  {spaceLocations.map((location) => (
                    <div 
                      key={location.height} 
                      className={`p-4 rounded-lg ${
                        Math.abs(location.height - currentHeight) < 50 ? 
                        `${location.color}/20 border border-${location.color.replace('bg-', '')} animate-pulse` : 
                        'bg-black/20'
                      }`}
                    >
                      <h3 className="text-lg font-bold text-white">{location.height} km - {location.name}</h3>
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

export default SpaceElevator;
