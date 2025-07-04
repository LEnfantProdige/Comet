import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCw, RefreshCcw, Check, Lightbulb } from "lucide-react";

interface TangramGameImprovedProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

interface Piece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  shape: 'large-triangle' | 'medium-triangle' | 'small-triangle' | 'square' | 'parallelogram';
  placed: boolean;
  originalX: number;
  originalY: number;
}

interface DropZone {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  expectedPiece: number;
  filled: boolean;
}

const TangramGameImproved = ({ onBack, onComplete }: TangramGameImprovedProps) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [completedPuzzles, setCompletedPuzzles] = useState<boolean[]>([false, false, false]);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  
  const initialPieces: Piece[] = [
    { id: 1, x: 50, y: 50, rotation: 0, color: '#ef4444', shape: 'large-triangle', placed: false, originalX: 50, originalY: 50 },
    { id: 2, x: 50, y: 120, rotation: 0, color: '#f97316', shape: 'large-triangle', placed: false, originalX: 50, originalY: 120 },
    { id: 3, x: 50, y: 190, rotation: 0, color: '#eab308', shape: 'medium-triangle', placed: false, originalX: 50, originalY: 190 },
    { id: 4, x: 130, y: 50, rotation: 0, color: '#22c55e', shape: 'small-triangle', placed: false, originalX: 130, originalY: 50 },
    { id: 5, x: 130, y: 120, rotation: 0, color: '#3b82f6', shape: 'small-triangle', placed: false, originalX: 130, originalY: 120 },
    { id: 6, x: 130, y: 190, rotation: 0, color: '#8b5cf6', shape: 'square', placed: false, originalX: 130, originalY: 190 },
    { id: 7, x: 210, y: 120, rotation: 0, color: '#ec4899', shape: 'parallelogram', placed: false, originalX: 210, originalY: 120 }
  ];

  const [pieces, setPieces] = useState<Piece[]>(initialPieces);

  const puzzles = [
    {
      name: "Maison",
      shape: "🏠",
      description: "Forme une maison avec les 7 pièces",
      hint: "Commence par placer le grand triangle pour le toit",
      dropZones: [
        { id: 1, x: 350, y: 80, width: 60, height: 60, expectedPiece: 1, filled: false },
        { id: 2, x: 320, y: 140, width: 50, height: 50, expectedPiece: 2, filled: false },
        { id: 3, x: 380, y: 140, width: 50, height: 50, expectedPiece: 3, filled: false },
        { id: 4, x: 340, y: 190, width: 40, height: 40, expectedPiece: 4, filled: false },
        { id: 5, x: 380, y: 190, width: 40, height: 40, expectedPiece: 5, filled: false },
        { id: 6, x: 350, y: 230, width: 40, height: 40, expectedPiece: 6, filled: false },
        { id: 7, x: 320, y: 230, width: 60, height: 40, expectedPiece: 7, filled: false }
      ]
    },
    {
      name: "Poisson",
      shape: "🐟", 
      description: "Crée un poisson avec toutes les pièces",
      hint: "Utilise les triangles pour la queue et la tête",
      dropZones: [
        { id: 1, x: 300, y: 120, width: 60, height: 60, expectedPiece: 1, filled: false },
        { id: 2, x: 360, y: 100, width: 50, height: 50, expectedPiece: 2, filled: false },
        { id: 3, x: 360, y: 150, width: 50, height: 50, expectedPiece: 3, filled: false },
        { id: 4, x: 410, y: 120, width: 40, height: 40, expectedPiece: 4, filled: false },
        { id: 5, x: 250, y: 100, width: 40, height: 40, expectedPiece: 5, filled: false },
        { id: 6, x: 250, y: 150, width: 40, height: 40, expectedPiece: 6, filled: false },
        { id: 7, x: 200, y: 120, width: 60, height: 40, expectedPiece: 7, filled: false }
      ]
    },
    {
      name: "Chat",
      shape: "🐱",
      description: "Assemble un chat avec les formes", 
      hint: "Pense aux oreilles pointues du chat",
      dropZones: [
        { id: 1, x: 320, y: 80, width: 50, height: 50, expectedPiece: 1, filled: false },
        { id: 2, x: 380, y: 80, width: 50, height: 50, expectedPiece: 2, filled: false },
        { id: 3, x: 350, y: 130, width: 60, height: 60, expectedPiece: 3, filled: false },
        { id: 4, x: 300, y: 180, width: 40, height: 40, expectedPiece: 4, filled: false },
        { id: 5, x: 410, y: 180, width: 40, height: 40, expectedPiece: 5, filled: false },
        { id: 6, x: 350, y: 190, width: 40, height: 40, expectedPiece: 6, filled: false },
        { id: 7, x: 330, y: 230, width: 80, height: 40, expectedPiece: 7, filled: false }
      ]
    }
  ];

  const [dropZones, setDropZones] = useState<DropZone[]>(puzzles[currentPuzzle].dropZones);

  const handleMouseDown = (pieceId: number, e: React.MouseEvent) => {
    if (pieces.find(p => p.id === pieceId)?.placed) return;
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
    if (draggedPiece !== null) {
      const piece = pieces.find(p => p.id === draggedPiece);
      if (!piece) return;

      // Vérifier si la pièce est dans une zone valide
      const validZone = dropZones.find(zone => 
        !zone.filled &&
        piece.x >= zone.x - 20 &&
        piece.x <= zone.x + zone.width + 20 &&
        piece.y >= zone.y - 20 &&
        piece.y <= zone.y + zone.height + 20 &&
        zone.expectedPiece === piece.id
      );

      if (validZone) {
        // Placer la pièce dans la zone
        setPieces(prev => prev.map(p => 
          p.id === draggedPiece 
            ? { ...p, x: validZone.x + validZone.width / 2 - 25, y: validZone.y + validZone.height / 2 - 25, placed: true }
            : p
        ));
        setDropZones(prev => prev.map(z => 
          z.id === validZone.id ? { ...z, filled: true } : z
        ));
      } else {
        // Remettre à la position initiale
        setPieces(prev => prev.map(p => 
          p.id === draggedPiece 
            ? { ...p, x: p.originalX, y: p.originalY }
            : p
        ));
      }
    }
    setDraggedPiece(null);
  };

  const rotatePiece = (pieceId: number) => {
    setPieces(prev => prev.map(piece => 
      piece.id === pieceId && !piece.placed
        ? { ...piece, rotation: (piece.rotation + 45) % 360 }
        : piece
    ));
  };

  const resetPuzzle = () => {
    setPieces(initialPieces);
    setDropZones(puzzles[currentPuzzle].dropZones);
  };

  const checkSolution = () => {
    const allPiecesPlaced = pieces.every(piece => piece.placed);
    const allZonesFilled = dropZones.every(zone => zone.filled);
    
    if (allPiecesPlaced && allZonesFilled) {
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
    }
  };

  const progress = ((completedPuzzles.filter(Boolean).length) / puzzles.length) * 100;
  const currentPuzzleData = puzzles[currentPuzzle];

  const renderPiece = (piece: Piece) => {
    const { shape, color, rotation } = piece;
    
    switch (shape) {
      case 'large-triangle':
        return (
          <polygon 
            points="25,5 45,40 5,40" 
            fill={color} 
            stroke="white" 
            strokeWidth="2"
            transform={`rotate(${rotation} 25 25)`}
          />
        );
      case 'medium-triangle':
        return (
          <polygon 
            points="25,8 40,35 10,35" 
            fill={color} 
            stroke="white" 
            strokeWidth="2"
            transform={`rotate(${rotation} 25 25)`}
          />
        );
      case 'small-triangle':
        return (
          <polygon 
            points="25,10 35,30 15,30" 
            fill={color} 
            stroke="white" 
            strokeWidth="2"
            transform={`rotate(${rotation} 25 25)`}
          />
        );
      case 'square':
        return (
          <rect 
            x="15" y="15" width="20" height="20" 
            fill={color} 
            stroke="white" 
            strokeWidth="2"
            transform={`rotate(${rotation} 25 25)`}
          />
        );
      case 'parallelogram':
        return (
          <polygon 
            points="10,15 40,15 35,35 5,35" 
            fill={color} 
            stroke="white" 
            strokeWidth="2"
            transform={`rotate(${rotation} 25 25)`}
          />
        );
      default:
        return null;
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tangram Avancé</h1>
            <p className="text-gray-600 dark:text-gray-300">Puzzle avec zones de placement</p>
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
                  {/* Zones de drop */}
                  {dropZones.map((zone) => (
                    <div
                      key={zone.id}
                      className={`absolute border-2 border-dashed rounded ${
                        zone.filled 
                          ? 'border-green-500 bg-green-100 dark:bg-green-900/20' 
                          : 'border-purple-400 bg-purple-50 dark:bg-purple-900/20'
                      }`}
                      style={{
                        left: zone.x,
                        top: zone.y,
                        width: zone.width,
                        height: zone.height
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                        {zone.filled ? '✓' : zone.expectedPiece}
                      </div>
                    </div>
                  ))}
                  
                  {/* Pièces du tangram */}
                  {pieces.map((piece) => (
                    <div
                      key={piece.id}
                      className={`absolute cursor-pointer select-none ${
                        piece.placed ? 'cursor-default' : 'cursor-move'
                      }`}
                      style={{
                        left: piece.x,
                        top: piece.y,
                        zIndex: draggedPiece === piece.id ? 10 : piece.placed ? 5 : 1
                      }}
                      onMouseDown={(e) => handleMouseDown(piece.id, e)}
                      onDoubleClick={() => rotatePiece(piece.id)}
                    >
                      <svg width="50" height="50" viewBox="0 0 50 50">
                        {renderPiece(piece)}
                      </svg>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  💡 Glisse les pièces dans les zones violettes. Double-clique pour tourner.
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
                <CardTitle className="text-lg">Règles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Place chaque pièce dans sa zone correspondante</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Les numéros indiquent quelle pièce va où</span>
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

export default TangramGameImproved;