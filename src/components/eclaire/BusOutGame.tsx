
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, Trophy, Star } from "lucide-react";

interface Character {
  id: string;
  color: string;
  position: { x: number; y: number };
  targetBus?: string;
}

interface Bus {
  id: string;
  color: string;
  length: number; // 2, 3, or 4 cases
  position: { x: number; y: number };
  direction: 'horizontal' | 'vertical';
  passengers: string[]; // IDs des personnages
  maxCapacity: number;
  isTarget?: boolean; // Le bus qui doit sortir
}

const BusOutGame = ({ onBack, onComplete }: { onBack: () => void; onComplete: (xp: number) => void }) => {
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(0);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);

  // Grille 6x6 pour le parking
  const GRID_SIZE = 6;
  const EXIT_POSITION = { x: 5, y: 2 }; // Sortie à droite au milieu

  const levels = [
    {
      characters: [
        { id: 'c1', color: 'bg-red-500', position: { x: 1, y: 1 } },
        { id: 'c2', color: 'bg-blue-500', position: { x: 2, y: 1 } },
        { id: 'c3', color: 'bg-green-500', position: { x: 3, y: 1 } },
        { id: 'c4', color: 'bg-yellow-500', position: { x: 1, y: 4 } },
        { id: 'c5', color: 'bg-purple-500', position: { x: 2, y: 4 } },
      ],
      buses: [
        { id: 'target', color: 'bg-red-400', length: 2, position: { x: 1, y: 2 }, direction: 'horizontal' as const, maxCapacity: 2, isTarget: true },
        { id: 'b1', color: 'bg-blue-400', length: 3, position: { x: 0, y: 0 }, direction: 'vertical' as const, maxCapacity: 3 },
        { id: 'b2', color: 'bg-green-400', length: 2, position: { x: 3, y: 3 }, direction: 'horizontal' as const, maxCapacity: 2 },
        { id: 'b3', color: 'bg-yellow-400', length: 3, position: { x: 4, y: 0 }, direction: 'vertical' as const, maxCapacity: 3 },
      ]
    },
    {
      characters: [
        { id: 'c1', color: 'bg-red-500', position: { x: 0, y: 1 } },
        { id: 'c2', color: 'bg-blue-500', position: { x: 1, y: 1 } },
        { id: 'c3', color: 'bg-green-500', position: { x: 2, y: 1 } },
        { id: 'c4', color: 'bg-yellow-500', position: { x: 0, y: 4 } },
        { id: 'c5', color: 'bg-purple-500', position: { x: 1, y: 4 } },
        { id: 'c6', color: 'bg-pink-500', position: { x: 2, y: 4 } },
        { id: 'c7', color: 'bg-orange-500', position: { x: 3, y: 4 } },
      ],
      buses: [
        { id: 'target', color: 'bg-red-400', length: 3, position: { x: 2, y: 2 }, direction: 'horizontal' as const, maxCapacity: 3, isTarget: true },
        { id: 'b1', color: 'bg-blue-400', length: 2, position: { x: 0, y: 0 }, direction: 'vertical' as const, maxCapacity: 2 },
        { id: 'b2', color: 'bg-green-400', length: 4, position: { x: 1, y: 2 }, direction: 'vertical' as const, maxCapacity: 4 },
        { id: 'b3', color: 'bg-yellow-400', length: 2, position: { x: 4, y: 3 }, direction: 'horizontal' as const, maxCapacity: 2 },
      ]
    }
  ];

  useEffect(() => {
    initializeLevel(level);
  }, [level]);

  const initializeLevel = (levelNum: number) => {
    const levelData = levels[levelNum - 1];
    if (levelData) {
      setCharacters(levelData.characters.map(c => ({ ...c, targetBus: undefined })));
      setBuses(levelData.buses.map(b => ({ ...b, passengers: [] })));
      setMoves(0);
      setGameWon(false);
      setSelectedBus(null);
    }
  };

  const isCellOccupied = (x: number, y: number, excludeBusId?: string) => {
    return buses.some(bus => {
      if (bus.id === excludeBusId) return false;
      return getBusOccupiedCells(bus).some(cell => cell.x === x && cell.y === y);
    });
  };

  const getBusOccupiedCells = (bus: Bus) => {
    const cells = [];
    for (let i = 0; i < bus.length; i++) {
      if (bus.direction === 'horizontal') {
        cells.push({ x: bus.position.x + i, y: bus.position.y });
      } else {
        cells.push({ x: bus.position.x, y: bus.position.y + i });
      }
    }
    return cells;
  };

  const canMoveBus = (bus: Bus, newX: number, newY: number) => {
    // Vérifier si le nouveau position est dans les limites
    if (bus.direction === 'horizontal') {
      if (newX < 0 || newX + bus.length > GRID_SIZE || newY < 0 || newY >= GRID_SIZE) return false;
    } else {
      if (newX < 0 || newX >= GRID_SIZE || newY < 0 || newY + bus.length > GRID_SIZE) return false;
    }

    // Vérifier les collisions
    const newCells = [];
    for (let i = 0; i < bus.length; i++) {
      if (bus.direction === 'horizontal') {
        newCells.push({ x: newX + i, y: newY });
      } else {
        newCells.push({ x: newX, y: newY + i });
      }
    }

    return !newCells.some(cell => isCellOccupied(cell.x, cell.y, bus.id));
  };

  const moveBus = (busId: string, direction: 'up' | 'down' | 'left' | 'right') => {
    const bus = buses.find(b => b.id === busId);
    if (!bus) return;

    let newX = bus.position.x;
    let newY = bus.position.y;

    switch (direction) {
      case 'up': newY -= 1; break;
      case 'down': newY += 1; break;
      case 'left': newX -= 1; break;
      case 'right': newX += 1; break;
    }

    if (canMoveBus(bus, newX, newY)) {
      setBuses(prev => prev.map(b => 
        b.id === busId ? { ...b, position: { x: newX, y: newY } } : b
      ));
      setMoves(moves + 1);

      // Vérifier si le bus cible peut sortir
      if (bus.isTarget && newX + bus.length >= GRID_SIZE) {
        setGameWon(true);
        const levelScore = Math.max(100 - moves * 5, 20);
        setScore(levelScore);
        setTimeout(() => {
          onComplete(levelScore);
        }, 1500);
      }
    }
  };

  const handleCellClick = (x: number, y: number) => {
    // Vérifier si c'est un personnage
    const character = characters.find(c => c.position.x === x && c.position.y === y);
    if (character && selectedBus) {
      const bus = buses.find(b => b.id === selectedBus);
      if (bus && bus.passengers.length < bus.maxCapacity) {
        setBuses(prev => prev.map(b => 
          b.id === selectedBus 
            ? { ...b, passengers: [...b.passengers, character.id] }
            : b
        ));
        setCharacters(prev => prev.filter(c => c.id !== character.id));
      }
      return;
    }

    // Vérifier si c'est un bus
    const bus = buses.find(b => 
      getBusOccupiedCells(b).some(cell => cell.x === x && cell.y === y)
    );
    if (bus) {
      setSelectedBus(selectedBus === bus.id ? null : bus.id);
    }
  };

  const resetLevel = () => {
    initializeLevel(level);
  };

  const nextLevel = () => {
    if (level < levels.length) {
      setLevel(level + 1);
    }
  };

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isExit = x === EXIT_POSITION.x && y === EXIT_POSITION.y;
        const character = characters.find(c => c.position.x === x && c.position.y === y);
        const bus = buses.find(b => 
          getBusOccupiedCells(b).some(cell => cell.x === x && cell.y === y)
        );

        grid.push(
          <div
            key={`${x}-${y}`}
            className={`
              w-12 h-12 border border-gray-300 cursor-pointer transition-all
              ${isExit ? 'bg-yellow-200 border-yellow-400' : 'bg-gray-100'}
              ${bus && selectedBus === bus.id ? 'ring-2 ring-blue-500' : ''}
              hover:bg-gray-200
            `}
            onClick={() => handleCellClick(x, y)}
          >
            {bus && (
              <div className={`
                w-full h-full ${bus.color} opacity-80 flex items-center justify-center text-white text-xs font-bold
                ${bus.isTarget ? 'ring-2 ring-red-500' : ''}
              `}>
                {bus.passengers.length}/{bus.maxCapacity}
              </div>
            )}
            {character && (
              <div className={`w-8 h-8 ${character.color} rounded-full mx-auto mt-2 border-2 border-white`} />
            )}
            {isExit && !bus && (
              <div className="w-full h-full flex items-center justify-center text-yellow-600 font-bold text-xs">
                EXIT
              </div>
            )}
          </div>
        );
      }
    }
    return grid;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-emerald-900 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="bg-orange-500 p-3 rounded-full text-white">
            <Trophy className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bus Out</h1>
            <p className="text-gray-600 dark:text-gray-300">Fais sortir le bus rouge du parking !</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Niveau {level}</CardTitle>
                  <div className="flex gap-4 mt-2">
                    <Badge variant="outline">Mouvements: {moves}</Badge>
                    {selectedBus && (
                      <Badge className="bg-blue-500">
                        Bus sélectionné: {buses.find(b => b.id === selectedBus)?.isTarget ? 'Rouge (Cible)' : 'Autre'}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button variant="outline" onClick={resetLevel}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </CardHeader>
              <CardContent>
                <div 
                  className="grid grid-cols-6 gap-1 mx-auto w-fit p-4 bg-white rounded-lg shadow-inner"
                  style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}
                >
                  {renderGrid()}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>🎯 <strong>Objectif:</strong> Fais sortir le bus rouge par la sortie</p>
                <p>🚌 <strong>Contrôles:</strong> Clique sur un bus pour le sélectionner</p>
                <p>👥 <strong>Passagers:</strong> Clique sur les personnages pour les faire monter</p>
                <p>⚠️ <strong>Attention:</strong> Les bus ne peuvent pas se chevaucher</p>
                <p>🏆 <strong>Score:</strong> Moins de mouvements = plus de points</p>
              </CardContent>
            </Card>

            {selectedBus && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contrôles du Bus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => moveBus(selectedBus, 'up')}
                      disabled={!canMoveBus(buses.find(b => b.id === selectedBus)!, buses.find(b => b.id === selectedBus)!.position.x, buses.find(b => b.id === selectedBus)!.position.y - 1)}
                    >
                      ↑ Haut
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => moveBus(selectedBus, 'down')}
                      disabled={!canMoveBus(buses.find(b => b.id === selectedBus)!, buses.find(b => b.id === selectedBus)!.position.x, buses.find(b => b.id === selectedBus)!.position.y + 1)}
                    >
                      ↓ Bas
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => moveBus(selectedBus, 'left')}
                      disabled={!canMoveBus(buses.find(b => b.id === selectedBus)!, buses.find(b => b.id === selectedBus)!.position.x - 1, buses.find(b => b.id === selectedBus)!.position.y)}
                    >
                      ← Gauche
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => moveBus(selectedBus, 'right')}
                      disabled={!canMoveBus(buses.find(b => b.id === selectedBus)!, buses.find(b => b.id === selectedBus)!.position.x + 1, buses.find(b => b.id === selectedBus)!.position.y)}
                    >
                      → Droite
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {gameWon && (
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg text-green-700 flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Niveau réussi !
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-600 mb-4">
                    Bravo ! Tu as réussi en {moves} mouvements.
                  </p>
                  <p className="text-green-600 mb-4">Score: {score} XP</p>
                  {level < levels.length ? (
                    <Button onClick={nextLevel} className="w-full bg-green-500 hover:bg-green-600">
                      Niveau suivant
                    </Button>
                  ) : (
                    <p className="text-center text-green-600 font-bold">
                      Tous les niveaux terminés ! 🎉
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusOutGame;
