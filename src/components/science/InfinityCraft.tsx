
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { Atom } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Element {
  id: string;
  name: string;
  icon: string;
  description: string;
  discovered: boolean;
}

type Recipe = [string, string, string]; // [element1Id, element2Id, resultId]

const InfinityCraft = ({ onBack }: { onBack: () => void }) => {
  const { t } = useLanguage();
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [discoveredElements, setDiscoveredElements] = useState<Element[]>([]);
  const [result, setResult] = useState<Element | null>(null);
  const [craftHistory, setCraftHistory] = useState<string[]>([]);

  // Éléments de base
  const baseElements: Element[] = [
    { id: "earth", name: "Terre", icon: "🌍", description: "L'élément fondamental de la planète", discovered: true },
    { id: "water", name: "Eau", icon: "💧", description: "Source de vie", discovered: true },
    { id: "fire", name: "Feu", icon: "🔥", description: "L'énergie ardente", discovered: true },
    { id: "air", name: "Air", icon: "💨", description: "L'atmosphère qui nous entoure", discovered: true },
  ];

  // Tous les éléments possibles
  const allElements: Element[] = [
    ...baseElements,
    { id: "steam", name: "Vapeur", icon: "☁️", description: "Eau chauffée à haute température", discovered: false },
    { id: "lava", name: "Lave", icon: "🌋", description: "Roche en fusion", discovered: false },
    { id: "dust", name: "Poussière", icon: "💨", description: "Particules fines dans l'air", discovered: false },
    { id: "mud", name: "Boue", icon: "🟤", description: "Mélange de terre et d'eau", discovered: false },
    { id: "pond", name: "Mare", icon: "🏞️", description: "Petite étendue d'eau", discovered: false },
    { id: "lake", name: "Lac", icon: "🌊", description: "Grande étendue d'eau", discovered: false },
    { id: "ocean", name: "Océan", icon: "🌊", description: "Immense étendue d'eau", discovered: false },
    { id: "plant", name: "Plante", icon: "🌱", description: "Organisme vivant qui photosynthétise", discovered: false },
    { id: "tree", name: "Arbre", icon: "🌳", description: "Grande plante ligneuse", discovered: false },
    { id: "forest", name: "Forêt", icon: "🌲", description: "Écosystème dominé par les arbres", discovered: false },
    { id: "life", name: "Vie", icon: "🧬", description: "Forme organique capable de se reproduire", discovered: false },
    { id: "fish", name: "Poisson", icon: "🐟", description: "Animal aquatique", discovered: false },
    { id: "bird", name: "Oiseau", icon: "🦅", description: "Animal volant", discovered: false },
    { id: "human", name: "Humain", icon: "👤", description: "Espèce intelligente", discovered: false },
    { id: "civilization", name: "Civilisation", icon: "🏙️", description: "Organisation sociale complexe", discovered: false },
    { id: "technology", name: "Technologie", icon: "⚙️", description: "Outils et machines avancés", discovered: false },
    { id: "energy", name: "Énergie", icon: "⚡", description: "Force motrice de l'univers", discovered: false },
    { id: "star", name: "Étoile", icon: "⭐", description: "Corps céleste lumineux", discovered: false },
    { id: "planet", name: "Planète", icon: "🪐", description: "Corps céleste orbitant autour d'une étoile", discovered: false },
    { id: "galaxy", name: "Galaxie", icon: "🌌", description: "Vaste système d'étoiles", discovered: false },
    { id: "universe", name: "Univers", icon: "🌠", description: "Totalité de l'espace-temps", discovered: false },
  ];

  // Recettes de craft
  const recipes: Recipe[] = [
    ["water", "fire", "steam"],
    ["earth", "fire", "lava"],
    ["earth", "air", "dust"],
    ["earth", "water", "mud"],
    ["water", "water", "pond"],
    ["pond", "water", "lake"],
    ["lake", "water", "ocean"],
    ["earth", "water", "plant"],
    ["plant", "plant", "tree"],
    ["tree", "tree", "forest"],
    ["water", "earth", "life"],
    ["life", "water", "fish"],
    ["life", "air", "bird"],
    ["life", "earth", "human"],
    ["human", "human", "civilization"],
    ["civilization", "fire", "technology"],
    ["fire", "technology", "energy"],
    ["fire", "energy", "star"],
    ["earth", "star", "planet"],
    ["star", "star", "galaxy"],
    ["galaxy", "galaxy", "universe"],
  ];

  useEffect(() => {
    // Initialiser les éléments découverts avec les éléments de base
    setDiscoveredElements(baseElements);
  }, []);

  const handleSelectElement = (element: Element) => {
    if (selectedElements.length < 2) {
      setSelectedElements([...selectedElements, element.id]);
    }
  };

  const handleCombine = () => {
    if (selectedElements.length !== 2) return;
    
    // Recherche d'une recette correspondante
    const recipe = recipes.find(([e1, e2, _]) => 
      (e1 === selectedElements[0] && e2 === selectedElements[1]) || 
      (e1 === selectedElements[1] && e2 === selectedElements[0])
    );
    
    if (recipe) {
      const resultId = recipe[2];
      const resultElement = allElements.find(e => e.id === resultId);
      
      if (resultElement) {
        setResult(resultElement);
        
        // Ajouter aux éléments découverts s'il ne l'est pas déjà
        if (!resultElement.discovered) {
          const updatedElement = { ...resultElement, discovered: true };
          setDiscoveredElements(prev => [...prev, updatedElement]);
          
          // Mettre à jour la liste complète des éléments
          allElements.find(e => e.id === resultId)!.discovered = true;
        }
        
        // Ajouter à l'historique de craft
        const element1 = allElements.find(e => e.id === selectedElements[0]);
        const element2 = allElements.find(e => e.id === selectedElements[1]);
        setCraftHistory(prev => [
          `${element1?.name} + ${element2?.name} = ${resultElement.name}`,
          ...prev.slice(0, 9) // Garder seulement les 10 derniers crafts
        ]);
      }
    } else {
      setResult(null);
      // Ajouter à l'historique que la combinaison n'a pas fonctionné
      const element1 = allElements.find(e => e.id === selectedElements[0]);
      const element2 = allElements.find(e => e.id === selectedElements[1]);
      setCraftHistory(prev => [
        `${element1?.name} + ${element2?.name} = Rien...`,
        ...prev.slice(0, 9)
      ]);
    }
  };

  const handleClear = () => {
    setSelectedElements([]);
    setResult(null);
  };
  
  const handleAddDiscovered = () => {
    if (result && !discoveredElements.some(e => e.id === result.id)) {
      setDiscoveredElements([...discoveredElements, result]);
    }
    setSelectedElements([]);
    setResult(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" onClick={onBack} className="text-emerald-400 border-emerald-600/30">
          {t('back')}
        </Button>
        <div className="text-sm text-gray-400">
          {discoveredElements.length}/{allElements.length} éléments découverts
        </div>
      </div>

      <Card className="border-2 border-emerald-600/50 backdrop-blur-sm bg-black/30">
        <CardHeader>
          <CardTitle className="flex items-center text-emerald-400">
            <Atom className="mr-2" /> 
            {t('science.infinitycraft')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-2">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {selectedElements.map((elementId, index) => {
                    const element = allElements.find(e => e.id === elementId);
                    return (
                      <div 
                        key={index}
                        className="h-24 rounded-lg flex items-center justify-center bg-emerald-900/30 border border-emerald-600/50"
                      >
                        {element && (
                          <div className="text-center">
                            <div className="text-4xl mb-1">{element.icon}</div>
                            <div className="text-sm font-medium text-emerald-300">{element.name}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {selectedElements.length < 2 && (
                    <div className="h-24 rounded-lg flex items-center justify-center bg-emerald-900/10 border border-dashed border-emerald-600/30">
                      <div className="text-center text-gray-500">
                        {selectedElements.length === 0 ? "Sélectionnez un élément" : "Sélectionnez un second élément"}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleCombine}
                    disabled={selectedElements.length !== 2}
                    className="bg-gradient-to-r from-emerald-600 to-green-700 hover:opacity-90"
                  >
                    Combiner
                  </Button>
                </div>

                {result && (
                  <div className="mt-4 p-4 rounded-lg bg-emerald-900/30 border border-emerald-600/50">
                    <div className="flex items-center space-x-4">
                      <div className="text-5xl">{result.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg text-emerald-300">{result.name}</h3>
                        <p className="text-sm text-gray-300">{result.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" onClick={handleClear} className="flex-1 text-emerald-400 border-emerald-600/30">
                        Effacer
                      </Button>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-emerald-400 mb-2">Historique</h3>
                  <div className="bg-black/20 rounded-lg border border-emerald-600/30 p-2 h-32 overflow-y-auto">
                    <ul className="space-y-1">
                      {craftHistory.length > 0 ? (
                        craftHistory.map((entry, index) => (
                          <li key={index} className="text-sm text-gray-300">{entry}</li>
                        ))
                      ) : (
                        <li className="text-sm text-gray-500">Aucun craft effectué</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">Éléments découverts</h3>
              <ScrollArea className="h-96 border-2 border-emerald-600/30 rounded-lg">
                <div className="grid grid-cols-2 gap-2 p-2">
                  {discoveredElements.map((element) => (
                    <div 
                      key={element.id}
                      className="p-2 rounded-lg bg-emerald-900/20 border border-emerald-600/30 hover:border-lime-500/50 cursor-pointer transition-all duration-200"
                      onClick={() => handleSelectElement(element)}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">{element.icon}</div>
                        <div className="text-xs font-medium text-emerald-300 truncate">{element.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfinityCraft;
