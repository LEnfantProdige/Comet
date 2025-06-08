
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Star, Trash2, RotateCcw } from "lucide-react";

interface Element {
  id: string;
  name: string;
  emoji: string;
  isFirstDiscovery?: boolean;
  discoveredAt?: Date;
}

interface Recipe {
  element1: string;
  element2: string;
  result: Element;
}

const AlchimistCraft = ({ onBack, onComplete }: { onBack: () => void; onComplete: (xp: number) => void }) => {
  const [discoveredElements, setDiscoveredElements] = useState<Element[]>([]);
  const [workArea, setWorkArea] = useState<(Element | null)[]>([null, null]);
  const [draggedElement, setDraggedElement] = useState<Element | null>(null);
  const [combinationResult, setCombinationResult] = useState<Element | null>(null);
  const [totalDiscoveries, setTotalDiscoveries] = useState(0);
  const [score, setScore] = useState(0);

  // Éléments de base
  const baseElements: Element[] = [
    { id: 'water', name: 'Eau', emoji: '💧' },
    { id: 'fire', name: 'Feu', emoji: '🔥' },
    { id: 'earth', name: 'Terre', emoji: '🌍' },
    { id: 'air', name: 'Air', emoji: '💨' }
  ];

  // Recettes de combinaison
  const recipes: Recipe[] = [
    // Combinaisons de base
    { element1: 'water', element2: 'fire', result: { id: 'steam', name: 'Vapeur', emoji: '💨' } },
    { element1: 'water', element2: 'earth', result: { id: 'mud', name: 'Boue', emoji: '🪨' } },
    { element1: 'water', element2: 'air', result: { id: 'mist', name: 'Brume', emoji: '🌫️' } },
    { element1: 'fire', element2: 'earth', result: { id: 'lava', name: 'Lave', emoji: '🌋' } },
    { element1: 'fire', element2: 'air', result: { id: 'energy', name: 'Énergie', emoji: '⚡' } },
    { element1: 'earth', element2: 'air', result: { id: 'dust', name: 'Poussière', emoji: '💨' } },
    
    // Combinaisons avancées
    { element1: 'steam', element2: 'earth', result: { id: 'geyser', name: 'Geyser', emoji: '🌋' } },
    { element1: 'lava', element2: 'water', result: { id: 'stone', name: 'Pierre', emoji: '🪨' } },
    { element1: 'mud', element2: 'fire', result: { id: 'brick', name: 'Brique', emoji: '🧱' } },
    { element1: 'energy', element2: 'water', result: { id: 'lightning', name: 'Foudre', emoji: '⚡' } },
    { element1: 'steam', element2: 'steam', result: { id: 'cloud', name: 'Nuage', emoji: '☁️' } },
    { element1: 'stone', element2: 'fire', result: { id: 'metal', name: 'Métal', emoji: '⚙️' } },
    
    // Éléments plus complexes
    { element1: 'cloud', element2: 'energy', result: { id: 'storm', name: 'Tempête', emoji: '⛈️' } },
    { element1: 'metal', element2: 'fire', result: { id: 'sword', name: 'Épée', emoji: '⚔️' } },
    { element1: 'stone', element2: 'stone', result: { id: 'mountain', name: 'Montagne', emoji: '🏔️' } },
    { element1: 'water', element2: 'water', result: { id: 'ocean', name: 'Océan', emoji: '🌊' } },
    { element1: 'earth', element2: 'water', result: { id: 'plant', name: 'Plante', emoji: '🌱' } },
    { element1: 'plant', element2: 'fire', result: { id: 'ash', name: 'Cendre', emoji: '💨' } },
    { element1: 'plant', element2: 'water', result: { id: 'tree', name: 'Arbre', emoji: '🌳' } },
    { element1: 'tree', element2: 'fire', result: { id: 'paper', name: 'Papier', emoji: '📄' } },
    { element1: 'paper', element2: 'fire', result: { id: 'ash', name: 'Cendre', emoji: '💨' } },
    
    // Éléments magiques
    { element1: 'energy', element2: 'stone', result: { id: 'crystal', name: 'Cristal', emoji: '💎' } },
    { element1: 'crystal', element2: 'energy', result: { id: 'magic', name: 'Magie', emoji: '✨' } },
    { element1: 'magic', element2: 'water', result: { id: 'potion', name: 'Potion', emoji: '🧪' } },
    { element1: 'magic', element2: 'fire', result: { id: 'dragon', name: 'Dragon', emoji: '🐉' } },
  ];

  useEffect(() => {
    setDiscoveredElements(baseElements);
  }, []);

  const findRecipe = (elem1: Element, elem2: Element): Element | null => {
    const recipe = recipes.find(r => 
      (r.element1 === elem1.id && r.element2 === elem2.id) ||
      (r.element1 === elem2.id && r.element2 === elem1.id)
    );
    return recipe ? recipe.result : null;
  };

  const handleDragStart = (element: Element) => {
    setDraggedElement(element);
  };

  const handleDrop = (index: number) => {
    if (draggedElement && workArea[index] === null) {
      const newWorkArea = [...workArea];
      newWorkArea[index] = draggedElement;
      setWorkArea(newWorkArea);
      setDraggedElement(null);
    }
  };

  const handleCombine = () => {
    if (workArea[0] && workArea[1]) {
      const result = findRecipe(workArea[0], workArea[1]);
      
      if (result) {
        const isNewDiscovery = !discoveredElements.find(e => e.id === result.id);
        
        if (isNewDiscovery) {
          const newElement: Element = {
            ...result,
            isFirstDiscovery: true,
            discoveredAt: new Date()
          };
          
          setDiscoveredElements(prev => [...prev, newElement]);
          setTotalDiscoveries(prev => prev + 1);
          setScore(prev => prev + 50);
          setCombinationResult(newElement);
        } else {
          setCombinationResult(result);
          setScore(prev => prev + 10);
        }
      } else {
        // Pas de recette trouvée
        setCombinationResult({ id: 'nothing', name: 'Rien...', emoji: '❌' });
      }
      
      // Vider la zone de travail après 2 secondes
      setTimeout(() => {
        setWorkArea([null, null]);
        setCombinationResult(null);
      }, 2000);
    }
  };

  const clearWorkArea = () => {
    setWorkArea([null, null]);
    setCombinationResult(null);
  };

  const resetGame = () => {
    setDiscoveredElements(baseElements);
    setWorkArea([null, null]);
    setCombinationResult(null);
    setTotalDiscoveries(0);
    setScore(0);
  };

  const handleComplete = () => {
    const xpGained = score;
    onComplete(xpGained);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="bg-purple-500 p-3 rounded-full text-white">
            <Sparkles className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Alchimist Craft</h1>
            <p className="text-gray-600 dark:text-gray-300">Combine les éléments pour créer de nouveaux objets magiques !</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Zone de travail */}
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Zone d'Alchimie</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      Score: {score}
                    </Badge>
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                      Découvertes: {totalDiscoveries}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-8 mb-6">
                  {/* Zone de drop 1 */}
                  <div
                    className="w-24 h-24 border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center bg-purple-50 dark:bg-purple-900/20 cursor-pointer hover:border-purple-500 transition-colors"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(0)}
                  >
                    {workArea[0] ? (
                      <div className="text-center">
                        <div className="text-3xl mb-1">{workArea[0].emoji}</div>
                        <div className="text-xs font-medium">{workArea[0].name}</div>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-center">
                        <div className="text-2xl mb-1">+</div>
                        <div className="text-xs">Élément 1</div>
                      </div>
                    )}
                  </div>

                  {/* Bouton de combinaison */}
                  <Button
                    onClick={handleCombine}
                    disabled={!workArea[0] || !workArea[1]}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-3"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Combiner
                  </Button>

                  {/* Zone de drop 2 */}
                  <div
                    className="w-24 h-24 border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center bg-purple-50 dark:bg-purple-900/20 cursor-pointer hover:border-purple-500 transition-colors"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(1)}
                  >
                    {workArea[1] ? (
                      <div className="text-center">
                        <div className="text-3xl mb-1">{workArea[1].emoji}</div>
                        <div className="text-xs font-medium">{workArea[1].name}</div>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-center">
                        <div className="text-2xl mb-1">+</div>
                        <div className="text-xs">Élément 2</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Résultat de combinaison */}
                {combinationResult && (
                  <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-lg">
                    <div className="text-4xl mb-2">{combinationResult.emoji}</div>
                    <div className="font-bold text-lg">{combinationResult.name}</div>
                    {combinationResult.isFirstDiscovery && (
                      <Badge className="mt-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                        <Star className="h-4 w-4 mr-1" />
                        Première Découverte !
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex justify-center gap-2 mt-4">
                  <Button variant="outline" onClick={clearWorkArea} size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Vider
                  </Button>
                  <Button variant="outline" onClick={resetGame} size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Recommencer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Inventaire des éléments */}
            <Card>
              <CardHeader>
                <CardTitle>Inventaire ({discoveredElements.length} éléments)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                  {discoveredElements.map((element) => (
                    <div
                      key={element.id}
                      className="relative group cursor-grab active:cursor-grabbing"
                      draggable
                      onDragStart={() => handleDragStart(element)}
                    >
                      <div className="w-16 h-16 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center hover:shadow-md transition-all hover:scale-105">
                        <div className="text-2xl mb-1">{element.emoji}</div>
                        <div className="text-xs font-medium text-center px-1 truncate w-full">{element.name}</div>
                      </div>
                      {element.isFirstDiscovery && (
                        <Star className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Objectifs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>🧪 <strong>Combine</strong> les éléments en les glissant dans la zone d'alchimie</p>
                <p>⭐ <strong>Découvre</strong> de nouveaux éléments pour gagner des points</p>
                <p>🎯 <strong>Expérimente</strong> avec différentes combinaisons</p>
                <p>💎 <strong>Trouve</strong> des éléments rares et magiques</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Éléments découverts:</span>
                  <span className="font-bold">{discoveredElements.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Premières découvertes:</span>
                  <span className="font-bold">{totalDiscoveries}</span>
                </div>
                <div className="flex justify-between">
                  <span>Score total:</span>
                  <span className="font-bold text-purple-600">{score}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Indices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>💧 + 🔥 = ?</p>
                <p>🌍 + 💨 = ?</p>
                <p>⚡ + 🪨 = ?</p>
                <p className="text-purple-600 font-medium">Explore toutes les possibilités !</p>
              </CardContent>
            </Card>

            {score > 0 && (
              <Button 
                onClick={handleComplete}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
              >
                Terminer (+{score} XP)
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlchimistCraft;
