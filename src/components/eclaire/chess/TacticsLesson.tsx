
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, CheckCircle, Target, Lightbulb } from "lucide-react";

interface TacticsLessonProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const TacticsLesson: React.FC<TacticsLessonProps> = ({ onBack, onComplete }) => {
  const [currentTactic, setCurrentTactic] = useState(0);
  const [completed, setCompleted] = useState(false);

  const tactics = [
    {
      name: "La Fourchette",
      description: "Attaquer deux pièces en même temps",
      explanation: "Une fourchette se produit quand une pièce attaque simultanément deux ou plusieurs pièces adverses. Le cavalier est particulièrement efficace pour les fourchettes.",
      example: "Un cavalier en e4 peut attaquer un roi en f6 et une dame en d6 simultanément.",
      symbol: "♘",
      color: "bg-blue-500"
    },
    {
      name: "Le Clouage",
      description: "Immobiliser une pièce",
      explanation: "Un clouage empêche une pièce de bouger car cela exposerait une pièce plus importante derrière elle. La pièce clouée ne peut pas ou ne devrait pas bouger.",
      example: "Un fou qui cloue un cavalier devant le roi adverse. Le cavalier ne peut pas bouger.",
      symbol: "♗",
      color: "bg-purple-500"
    },
    {
      name: "L'Enfilade",
      description: "Forcer le mouvement d'une pièce",
      explanation: "L'enfilade force une pièce importante à bouger, exposant une pièce moins importante derrière elle qui peut être capturée.",
      example: "Une tour attaque le roi. Le roi doit bouger et expose la dame derrière lui.",
      symbol: "♖",
      color: "bg-green-500"
    },
    {
      name: "La Découverte",
      description: "Révéler une attaque cachée",
      explanation: "Une attaque découverte se produit quand une pièce bouge et révèle l'attaque d'une pièce derrière elle. C'est très puissant car vous attaquez avec deux pièces.",
      example: "Un fou bouge et révèle l'attaque d'une tour sur la dame adverse.",
      symbol: "⚡",
      color: "bg-yellow-500"
    }
  ];

  const handleComplete = () => {
    setCompleted(true);
    onComplete(30);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-emerald-900 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="bg-emerald-500 p-3 rounded-full text-white">
            <Target className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tactiques de base</h1>
            <p className="text-gray-600 dark:text-gray-300">Fourchette, clouage, découverte</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${tactics[currentTactic].color} text-white`}>
                      <span className="text-xl">{tactics[currentTactic].symbol}</span>
                    </div>
                    {tactics[currentTactic].name}
                  </CardTitle>
                  <Badge variant="secondary">
                    {currentTactic + 1}/{tactics.length}
                  </Badge>
                </div>
                <Progress value={((currentTactic + 1) / tactics.length) * 100} className="h-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{tactics[currentTactic].description}</h3>
                  <p className="text-gray-600 mb-4">{tactics[currentTactic].explanation}</p>
                </div>

                <Card className="bg-emerald-50 border-emerald-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-emerald-800">Exemple pratique</h4>
                        <p className="text-sm text-emerald-700">{tactics[currentTactic].example}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Diagramme simplifié */}
                <div className="bg-amber-50 p-4 rounded-lg border">
                  <h4 className="font-semibold mb-3">Position d'exemple</h4>
                  <div className="grid grid-cols-8 gap-1 w-64 h-64 mx-auto border-2 border-gray-800">
                    {Array(64).fill(null).map((_, index) => (
                      <div
                        key={index}
                        className={`
                          flex items-center justify-center text-lg
                          ${(Math.floor(index / 8) + (index % 8)) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-700'}
                        `}
                      >
                        {/* Positions exemple selon la tactique */}
                        {currentTactic === 0 && index === 28 && '♘'}
                        {currentTactic === 0 && index === 21 && '♚'}
                        {currentTactic === 0 && index === 29 && '♛'}
                        {currentTactic === 1 && index === 35 && '♗'}
                        {currentTactic === 1 && index === 28 && '♞'}
                        {currentTactic === 1 && index === 21 && '♚'}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentTactic(Math.max(0, currentTactic - 1))}
                    disabled={currentTactic === 0}
                  >
                    Précédent
                  </Button>
                  
                  {currentTactic < tactics.length - 1 ? (
                    <Button
                      onClick={() => setCurrentTactic(currentTactic + 1)}
                      className="bg-emerald-500 hover:bg-emerald-600"
                    >
                      Suivant
                    </Button>
                  ) : (
                    <Button
                      onClick={handleComplete}
                      className="bg-emerald-500 hover:bg-emerald-600"
                      disabled={completed}
                    >
                      {completed ? 'Terminé ✓' : 'Terminer la leçon'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tactiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tactics.map((tactic, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        index === currentTactic
                          ? 'bg-emerald-100 border-emerald-300'
                          : index < currentTactic
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                      onClick={() => setCurrentTactic(index)}
                    >
                      <div className="flex items-center gap-3">
                        {index < currentTactic ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : index === currentTactic ? (
                          <Play className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <div className="h-4 w-4 border border-gray-300 rounded-full" />
                        )}
                        <div className={`p-1 rounded ${tactic.color} text-white text-sm`}>
                          {tactic.symbol}
                        </div>
                        <span className="font-medium text-sm">{tactic.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conseil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Cherchez toujours des tactiques dans vos parties ! Elles permettent de gagner du matériel ou de donner échec et mat.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticsLesson;
