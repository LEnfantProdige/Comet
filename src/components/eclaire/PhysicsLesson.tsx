
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Check, X, Lightbulb, Play } from "lucide-react";

interface PhysicsLessonProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const PhysicsLesson = ({ onBack, onComplete }: PhysicsLessonProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const steps = [
    {
      title: "Qu'est-ce que la physique ?",
      content: "La physique étudie la matière, l'énergie et leurs interactions dans l'univers.",
      visual: (
        <div className="text-center p-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
          <div className="text-6xl mb-4">🌌</div>
          <p className="text-lg font-semibold">Univers • Matière • Énergie</p>
        </div>
      ),
      question: "Combien y a-t-il d'états principaux de la matière ?",
      answer: "3",
      hint: "Solide, liquide et gazeux",
      explanation: "Les trois états principaux de la matière sont : solide, liquide et gazeux."
    },
    {
      title: "Le mouvement",
      content: "Le mouvement décrit le changement de position d'un objet au cours du temps.",
      visual: (
        <svg width="300" height="150" className="mx-auto">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
            refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#059669" />
            </marker>
          </defs>
          <circle cx="50" cy="75" r="20" fill="#f59e0b" />
          <circle cx="150" cy="75" r="20" fill="#f59e0b" opacity="0.5" />
          <circle cx="250" cy="75" r="20" fill="#f59e0b" opacity="0.3" />
          <line x1="80" y1="75" x2="220" y2="75" stroke="#059669" strokeWidth="3" markerEnd="url(#arrowhead)" />
          <text x="150" y="110" textAnchor="middle" fill="#059669" fontSize="14">Mouvement</text>
        </svg>
      ),
      question: "Si une voiture parcourt 60 km en 1 heure, quelle est sa vitesse moyenne en km/h ?",
      answer: "60",
      hint: "Vitesse = Distance ÷ Temps",
      explanation: "Vitesse = 60 km ÷ 1 h = 60 km/h"
    },
    {
      title: "Les forces",
      content: "Une force peut modifier l'état de mouvement d'un objet : l'accélérer, le ralentir ou changer sa direction.",
      visual: (
        <svg width="300" height="150" className="mx-auto">
          <rect x="130" y="100" width="40" height="30" fill="#8b5cf6" rx="5" />
          <line x1="100" y1="115" x2="130" y2="115" stroke="#dc2626" strokeWidth="4" markerEnd="url(#arrowhead)" />
          <line x1="170" y1="115" x2="200" y2="115" stroke="#dc2626" strokeWidth="4" markerEnd="url(#arrowhead)" />
          <text x="85" y="140" fill="#dc2626" fontSize="12">Force</text>
          <text x="175" y="140" fill="#dc2626" fontSize="12">Force</text>
          <text x="135" y="150" fill="#8b5cf6" fontSize="12">Objet</text>
        </svg>
      ),
      question: "Quel est l'unité de mesure de la force dans le système international ?",
      answer: "Newton",
      hint: "C'est le nom d'un célèbre physicien anglais",
      explanation: "L'unité de force est le Newton (N), du nom d'Isaac Newton."
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const checkAnswer = () => {
    const userValue = userAnswer.trim().toLowerCase();
    const correctValue = currentStepData.answer.toLowerCase();
    const correct = userValue === correctValue;
    setIsCorrect(correct);
    
    setTimeout(() => {
      if (correct) {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
          setUserAnswer('');
          setIsCorrect(null);
          setShowHint(false);
        } else {
          onComplete(35);
        }
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-emerald-900 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="bg-green-500 p-3 rounded-full text-white">
            <span className="text-2xl">⚛️</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Physique</h1>
            <p className="text-gray-600 dark:text-gray-300">Les lois de l'univers</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>Progression</span>
            <span>{currentStep + 1}/{steps.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">{currentStepData.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-4">{currentStepData.content}</p>
              <div className="flex justify-center">
                {currentStepData.visual}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{currentStepData.question}</h3>
              
              <div className="flex gap-3">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded text-center text-lg"
                  placeholder="Ta réponse..."
                />
                <Button 
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Vérifier
                </Button>
              </div>

              {isCorrect !== null && (
                <div className={`flex items-start gap-2 p-3 rounded-lg ${
                  isCorrect 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                }`}>
                  {isCorrect ? <Check className="h-5 w-5 mt-0.5" /> : <X className="h-5 w-5 mt-0.5" />}
                  <div>
                    <span className="font-medium block">
                      {isCorrect ? 'Excellent ! 🎉' : 'Pas tout à fait...'}
                    </span>
                    <p className="text-sm mt-1">{currentStepData.explanation}</p>
                  </div>
                </div>
              )}

              {showHint && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border-l-4 border-yellow-400">
                  <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
                    <Lightbulb className="h-4 w-4" />
                    <span className="font-medium">Indice :</span>
                  </div>
                  <p className="text-yellow-700 dark:text-yellow-300 mt-1">{currentStepData.hint}</p>
                </div>
              )}

              <Button 
                variant="outline" 
                onClick={() => setShowHint(!showHint)}
                className="w-full"
              >
                {showHint ? 'Masquer l\'indice' : 'Voir un indice'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PhysicsLesson;
