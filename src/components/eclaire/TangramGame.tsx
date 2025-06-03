
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCw, RefreshCcw, Check, Lightbulb } from "lucide-react";

interface TangramGameProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const TangramGame = ({ onBack, onComplete }: TangramGameProps) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [completedPuzzles, setCompletedPuzzles] = useState<boolean[]>([false, false, false]);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const [pieces, setPieces] = useState([
    { id: 1, x: 50, y: 50, rotation: 0, color: '#ef4444' },
    { id: 2, x: 50, y: 100, rotation: 0, color: '#f97316' },
    { id: 3, x: 50, y: 150, rotation: 0, color: '#eab308' },
    { id: 4, x: 100, y: 50, rotation: 0, color: '#22c55e' },
    { id: 5, x: 100, y: 100, rotation: 0, color: '#3b82f6' },
    { id: 6, x: 100, y: 150, rotation: 0, color: '#8b5cf6' },
    { id: 7, x: 150, y: 100, rotation: 0, color: '#ec4899' }
  ]);

  const puzzles = [
    {
      name: "Maison",
      shape: "🏠",
      description: "Forme une maison avec les 7 pièces",
      hint: "Commence par placer le grand triangle pour le toit"
    },
    {
      name: "Poisson",
      shape: "🐟",
      description: "Crée un poisson avec toutes les pièces",
      hint: "Utilise les triangles pour la queue et la tête"
    },
    {
      name: "Chat",
      shape: "🐱",
      description: "Assemble un chat avec les formes",
      hint: "Pense aux oreilles pointues du chat"
    }
  ];

  const handleMouseDown = (pieceId: number, e: React.MouseEvent) => {
    setDraggedPiece(pieceId);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedPiece !== null) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setPieces(prev => prev.map(piece => 
        piece.id === draggedPiece 
          ? { ...piece, x: x - 25, y: y - 25 }
          : piece
      ));
    }
  };

  const handleMouseUp = () => {
    setDraggedPiece(null);
  };

  const rotatePiece = (pieceId: number) => {
    setPieces(prev => prev.map(piece => 
      piece.id === pieceId 
        ? { ...piece, rotation: (piece.rotation + 45) % 360 }
        : piece
    ));
  };

  const resetPuzzle = () => {
    setPieces([
      { id: 1, x: 50, y: 50, rotation: 0, color: '#ef4444' },
      { id: 2, x: 50, y: 100, rotation: 0, color: '#f97316' },
      { id: 3, x: 50, y: 150, rotation: 0, color: '#eab308' },
      { id: 4, x: 100, y: 50, rotation: 0, color: '#22c55e' },
      { id: 5, x: 100, y: 100, rotation: 0, color: '#3b82f6' },
      { id: 6, x: 100, y: 150, rotation: 0, color: '#8b5cf6' },
      { id: 7, x: 150, y: 100, rotation: 0, color: '#ec4899' }
    ]);
  };

  const checkSolution = () => {
    // Simulation de la vérification - dans un vrai jeu, on vérifierait les positions
    const newCompleted = [...completedPuzzles];
    newCompleted[currentPuzzle] = true;
    setCompletedPuzzles(newCompleted);
    
    if (currentPuzzle < puzzles.length - 1) {
      setTimeout(() => {
        setCurrentPuzzle(currentPuzzle + 1);
        resetPuzzle();
      }, 2000);
    } else {
      setTimeout(() => {
        onComplete(50);
      }, 2000);
    }
  };

  const progress = ((completedPuzzles.filter(Boolean).length) / puzzles.length) * 100;
  const currentPuzzleData = puzzles[currentPuzzle];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-emerald-900 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="bg-purple-500 p-3 rounded-full text-white">
            <span className="text-2xl">🧩</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tangram</h1>
            <p className="text-gray-600 dark:text-gray-300">Puzzle de formes géométriques</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>Progression</span>
            <span>{completedPuzzles.filter(Boolean).length}/{puzzles.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Zone de jeu */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-2xl flex items-center gap-2">
                    {currentPuzzleData.shape} {currentPuzzleData.name}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={resetPuzzle}>
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={checkSolution}
                      className="bg-purple-500 hover:bg-purple-600"
                      size="sm"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Vérifier
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="relative w-full h-96 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                >
                  {/* Zone cible */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl opacity-20">{currentPuzzleData.shape}</div>
                  </div>
                  
                  {/* Pièces du tangram */}
                  {pieces.map((piece) => (
                    <div
                      key={piece.id}
                      className="absolute cursor-pointer select-none"
                      style={{
                        left: piece.x,
                        top: piece.y,
                        transform: `rotate(${piece.rotation}deg)`,
                        zIndex: draggedPiece === piece.id ? 10 : 1
                      }}
                      onMouseDown={(e) => handleMouseDown(piece.id, e)}
                      onDoubleClick={() => rotatePiece(piece.id)}
                    >
                      <svg width="50" height="50" viewBox="0 0 50 50">
                        {piece.id <= 2 ? (
                          // Grands triangles
                          <polygon 
                            points="25,5 45,40 5,40" 
                            fill={piece.color} 
                            stroke="white" 
                            strokeWidth="2"
                          />
                        ) : piece.id <= 4 ? (
                          // Triangle moyen et petit
                          <polygon 
                            points="25,10 40,35 10,35" 
                            fill={piece.color} 
                            stroke="white" 
                            strokeWidth="2"
                          />
                        ) : piece.id === 5 ? (
                          // Carré
                          <rect 
                            x="15" y="15" width="20" height="20" 
                            fill={piece.color} 
                            stroke="white" 
                            strokeWidth="2"
                          />
                        ) : (
                          // Parallélogramme
                          <polygon 
                            points="10,15 40,15 35,35 5,35" 
                            fill={piece.color} 
                            stroke="white" 
                            strokeWidth="2"
                          />
                        )}
                      </svg>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  💡 Glisse les pièces et double-clique pour les faire tourner
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Panneau latéral */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Objectif</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{currentPuzzleData.description}</p>
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
                    <Lightbulb className="h-4 w-4" />
                    <span className="font-medium">Astuce :</span>
                  </div>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                    {currentPuzzleData.hint}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Règles du Tangram</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Utilise toutes les 7 pièces</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Les pièces ne doivent pas se chevaucher</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Elles doivent toutes se toucher</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">ℹ</span>
                  <span>Double-clique pour faire tourner une pièce</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {puzzles.map((puzzle, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-3 p-2 rounded ${
                        index === currentPuzzle 
                          ? 'bg-purple-100 dark:bg-purple-900/20' 
                          : completedPuzzles[index]
                            ? 'bg-green-100 dark:bg-green-900/20'
                            : 'bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      <span className="text-2xl">{puzzle.shape}</span>
                      <span className="flex-1 text-sm">{puzzle.name}</span>
                      {completedPuzzles[index] && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TangramGame;
