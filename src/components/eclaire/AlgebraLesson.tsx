
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Check, X, Lightbulb } from "lucide-react";

interface AlgebraLessonProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const AlgebraLesson = ({ onBack, onComplete }: AlgebraLessonProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const steps = [
    {
      title: "Introduction aux équations",
      content: "Une équation est une égalité mathématique qui contient une ou plusieurs inconnues.",
      example: "2x + 3 = 7",
      question: "Quelle est la valeur de x dans l'équation 2x + 3 = 7 ?",
      answer: "2",
      hint: "Soustrais 3 des deux côtés, puis divise par 2.",
      explanation: "2x + 3 = 7 → 2x = 7 - 3 → 2x = 4 → x = 2"
    },
    {
      title: "Résolution d'équations simples",
      content: "Pour résoudre une équation, on isole l'inconnue en effectuant les mêmes opérations des deux côtés.",
      example: "3x - 5 = 10",
      question: "Résous l'équation 3x - 5 = 10",
      answer: "5",
      hint: "Ajoute 5 des deux côtés, puis divise par 3.",
      explanation: "3x - 5 = 10 → 3x = 15 → x = 5"
    },
    {
      title: "Équations avec parenthèses",
      content: "Quand il y a des parenthèses, on les développe d'abord avant de résoudre.",
      example: "2(x + 3) = 14",
      question: "Quelle est la valeur de x dans 2(x + 3) = 14 ?",
      answer: "4",
      hint: "Développe d'abord : 2x + 6 = 14",
      explanation: "2(x + 3) = 14 → 2x + 6 = 14 → 2x = 8 → x = 4"
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const checkAnswer = () => {
    const correct = userAnswer.trim() === currentStepData.answer;
    setIsCorrect(correct);
    
    setTimeout(() => {
      if (correct) {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
          setUserAnswer('');
          setIsCorrect(null);
          setShowHint(false);
        } else {
          onComplete(25); // XP reward
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
          <div className="bg-emerald-500 p-3 rounded-full text-white">
            <span className="text-2xl">📐</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Algèbre</h1>
            <p className="text-gray-600 dark:text-gray-300">Résolution d'équations</p>
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
            <CardTitle className="text-2xl text-emerald-700">{currentStepData.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">{currentStepData.content}</p>
              <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded border-l-4 border-emerald-500">
                <span className="font-mono text-lg">{currentStepData.example}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{currentStepData.question}</h3>
              
              <div className="flex gap-3">
                <div className="flex-1">
                  <span className="text-lg">x = </span>
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-20 p-2 border border-gray-300 rounded text-center text-lg"
                    placeholder="?"
                  />
                </div>
                <Button 
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  Vérifier
                </Button>
              </div>

              {isCorrect !== null && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  isCorrect 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                }`}>
                  {isCorrect ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                  <span className="font-medium">
                    {isCorrect ? 'Excellent ! Tu as trouvé la bonne réponse !' : 'Pas tout à fait... Essaie encore !'}
                  </span>
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

export default AlgebraLesson;
