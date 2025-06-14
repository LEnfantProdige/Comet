
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, CheckCircle, Crown, Target } from "lucide-react";

interface PieceMovementLessonProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const PieceMovementLesson: React.FC<PieceMovementLessonProps> = ({ onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);

  const pieces = [
    {
      name: 'Roi',
      symbol: '♔',
      movement: 'Une case dans toutes les directions',
      description: 'Le roi est la pièce la plus importante. Il se déplace d\'une seule case à la fois dans n\'importe quelle direction.',
      pattern: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 2, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
    },
    {
      name: 'Dame',
      symbol: '♕',
      movement: 'Toutes les directions, toute la longueur',
      description: 'La dame est la pièce la plus puissante. Elle combine les mouvements de la tour et du fou.',
      pattern: [
        [1, 0, 0, 1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 1, 0, 0],
        [1, 1, 1, 2, 1, 1, 1, 1],
        [0, 0, 1, 1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 0, 1, 0, 0, 0, 0]
      ]
    },
    {
      name: 'Tour',
      symbol: '♖',
      movement: 'Horizontal et vertical uniquement',
      description: 'La tour se déplace en ligne droite horizontalement ou verticalement.',
      pattern: [
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [1, 1, 1, 2, 1, 1, 1, 1],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0]
      ]
    },
    {
      name: 'Fou',
      symbol: '♗',
      movement: 'Diagonal uniquement',
      description: 'Le fou se déplace uniquement en diagonale.',
      pattern: [
        [1, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
    },
    {
      name: 'Cavalier',
      symbol: '♘',
      movement: 'En forme de L',
      description: 'Le cavalier se déplace en forme de L et peut sauter par-dessus les autres pièces.',
      pattern: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 2, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
    },
    {
      name: 'Pion',
      symbol: '♙',
      movement: 'Une case vers l\'avant',
      description: 'Le pion avance d\'une case vers l\'avant, capture en diagonale.',
      pattern: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
    }
  ];

  const steps = [
    "Bienvenue dans votre première leçon d'échecs !",
    "Chaque pièce a son propre mouvement unique",
    "Cliquez sur une pièce pour voir son mouvement",
    "Félicitations ! Vous connaissez maintenant les mouvements de base"
  ];

  const renderBoard = () => (
    <div className="grid grid-cols-8 gap-0 border-2 border-gray-800 w-80 h-80 mx-auto">
      {selectedPiece ? (
        pieces.find(p => p.name === selectedPiece)?.pattern.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                w-10 h-10 flex items-center justify-center text-lg font-bold
                ${(rowIndex + colIndex) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-700'}
                ${cell === 1 ? 'bg-emerald-300' : ''}
                ${cell === 2 ? 'bg-blue-500' : ''}
              `}
            >
              {cell === 2 && (
                <span className="text-white text-2xl">
                  {pieces.find(p => p.name === selectedPiece)?.symbol}
                </span>
              )}
            </div>
          ))
        )
      ) : (
        Array(64).fill(null).map((_, index) => (
          <div
            key={index}
            className={`
              w-10 h-10 flex items-center justify-center
              ${(Math.floor(index / 8) + (index % 8)) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-700'}
            `}
          />
        ))
      )}
    </div>
  );

  const handleComplete = () => {
    onComplete(20);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-emerald-900 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="bg-emerald-500 p-3 rounded-full text-white">
            <Crown className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Les pièces et leurs mouvements</h1>
            <p className="text-gray-600 dark:text-gray-300">Apprenez comment chaque pièce se déplace</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Échiquier d'apprentissage</CardTitle>
                <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2" />
              </CardHeader>
              <CardContent className="flex justify-center">
                {renderBoard()}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Instruction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{steps[currentStep]}</p>
                {currentStep === steps.length - 1 && (
                  <Button 
                    onClick={handleComplete}
                    className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Terminer la leçon
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Les pièces d'échecs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pieces.map((piece) => (
                  <div
                    key={piece.name}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedPiece === piece.name 
                        ? 'bg-emerald-100 border-emerald-300' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setSelectedPiece(piece.name);
                      if (currentStep < 2) setCurrentStep(2);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{piece.symbol}</span>
                      <div>
                        <h4 className="font-semibold">{piece.name}</h4>
                        <p className="text-sm text-gray-500">{piece.movement}</p>
                      </div>
                    </div>
                    {selectedPiece === piece.name && (
                      <p className="text-sm mt-2 text-gray-600">{piece.description}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieceMovementLesson;
