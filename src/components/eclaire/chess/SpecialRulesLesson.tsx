
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, CheckCircle, Crown, Zap } from "lucide-react";

interface SpecialRulesLessonProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const SpecialRulesLesson: React.FC<SpecialRulesLessonProps> = ({ onBack, onComplete }) => {
  const [currentRule, setCurrentRule] = useState(0);
  const [completed, setCompleted] = useState(false);

  const rules = [
    {
      title: "Le Roque",
      description: "Un mouvement spécial du roi et de la tour",
      explanation: "Le roque permet de mettre le roi en sécurité tout en développant la tour. Le roi se déplace de 2 cases vers la tour, et la tour passe de l'autre côté du roi.",
      conditions: [
        "Le roi et la tour n'ont jamais bougé",
        "Aucune pièce entre le roi et la tour",
        "Le roi n'est pas en échec",
        "Le roi ne passe pas par une case attaquée"
      ],
      animation: "👑➡️🏰"
    },
    {
      title: "La Prise en Passant",
      description: "Capture spéciale du pion",
      explanation: "Quand un pion adverse avance de 2 cases et se retrouve à côté de votre pion, vous pouvez le capturer 'en passant' comme s'il n'avait avancé que d'une case.",
      conditions: [
        "Le pion adverse vient d'avancer de 2 cases",
        "Votre pion est à côté de lui",
        "Vous devez jouer immédiatement"
      ],
      animation: "♟️➡️♙"
    },
    {
      title: "La Promotion",
      description: "Transformation du pion",
      explanation: "Quand un pion atteint la dernière rangée, il doit être promu en une autre pièce (dame, tour, fou ou cavalier). La dame est généralement choisie.",
      conditions: [
        "Le pion atteint la 8ème rangée (1ère pour les noirs)",
        "Vous devez choisir une nouvelle pièce",
        "La promotion est obligatoire"
      ],
      animation: "♙➡️♕"
    }
  ];

  const handleComplete = () => {
    setCompleted(true);
    onComplete(25);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-emerald-900 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="bg-emerald-500 p-3 rounded-full text-white">
            <Zap className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Les règles spéciales</h1>
            <p className="text-gray-600 dark:text-gray-300">Roque, prise en passant, promotion</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{rules[currentRule].title}</CardTitle>
                  <Badge variant="secondary">
                    {currentRule + 1}/{rules.length}
                  </Badge>
                </div>
                <Progress value={((currentRule + 1) / rules.length) * 100} className="h-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">{rules[currentRule].animation}</div>
                  <h3 className="text-xl font-semibold mb-2">{rules[currentRule].description}</h3>
                  <p className="text-gray-600">{rules[currentRule].explanation}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Conditions :</h4>
                  <ul className="space-y-2">
                    {rules[currentRule].conditions.map((condition, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentRule(Math.max(0, currentRule - 1))}
                    disabled={currentRule === 0}
                  >
                    Précédent
                  </Button>
                  
                  {currentRule < rules.length - 1 ? (
                    <Button
                      onClick={() => setCurrentRule(currentRule + 1)}
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
                <CardTitle>Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rules.map((rule, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        index === currentRule
                          ? 'bg-emerald-100 border-emerald-300'
                          : index < currentRule
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                      onClick={() => setCurrentRule(index)}
                    >
                      <div className="flex items-center gap-2">
                        {index < currentRule ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : index === currentRule ? (
                          <Play className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <div className="h-4 w-4 border border-gray-300 rounded-full" />
                        )}
                        <span className="font-medium">{rule.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Astuce</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Ces règles spéciales sont importantes à maîtriser car elles apparaissent souvent dans les parties !
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialRulesLesson;
