
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Check, X, Lightbulb, PieChart } from "lucide-react";

interface FractionsLessonProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const FractionsLesson = ({ onBack, onComplete }: FractionsLessonProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const steps = [
    {
      title: "Qu'est-ce qu'une fraction ?",
      content: "Une fraction représente une partie d'un tout. Elle s'écrit avec un numérateur (en haut) et un dénominateur (en bas).",
      visual: (
        <div className="p-6 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-emerald-600">3/4</div>
            <svg width="200" height="200" className="mx-auto">
              <circle cx="100" cy="100" r="80" fill="#f0fdf4" stroke="#22c55e" strokeWidth="3"/>
              <path d="M 100 100 L 100 20 A 80 80 0 0 1 156.56 143.43 Z" fill="#22c55e"/>
              <path d="M 100 100 L 156.56 143.43 A 80 80 0 0 1 43.44 143.43 Z" fill="#22c55e"/>
              <path d="M 100 100 L 43.44 143.43 A 80 80 0 0 1 100 20 Z" fill="#22c55e"/>
              <text x="100" y="210" textAnchor="middle" className="text-sm font-medium">3 parts sur 4</text>
            </svg>
          </div>
        </div>
      ),
      question: "Dans la fraction 2/5, quel est le dénominateur ?",
      answer: "5",
      hint: "Le dénominateur est le nombre du bas",
      explanation: "Dans 2/5, le dénominateur est 5 (il indique en combien de parts on divise le tout)."
    },
    {
      title: "Fractions équivalentes",
      content: "Deux fractions sont équivalentes si elles représentent la même quantité. On peut les obtenir en multipliant ou divisant le numérateur et le dénominateur par le même nombre.",
      visual: (
        <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold text-blue-600">1/2 = 2/4 = 3/6</div>
            <div className="flex justify-center gap-4">
              <div className="space-y-2">
                <div className="w-16 h-8 bg-blue-500 rounded"></div>
                <div className="w-16 h-8 bg-gray-200 rounded"></div>
                <div className="text-xs">1/2</div>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-7 h-7 bg-blue-500 rounded"></div>
                  <div className="w-7 h-7 bg-blue-500 rounded"></div>
                  <div className="w-7 h-7 bg-gray-200 rounded"></div>
                  <div className="w-7 h-7 bg-gray-200 rounded"></div>
                </div>
                <div className="text-xs">2/4</div>
              </div>
            </div>
          </div>
        </div>
      ),
      question: "Quelle fraction est équivalente à 1/3 ?",
      answer: "2/6",
      hint: "Multiplie le numérateur et le dénominateur par 2",
      explanation: "1/3 = 2/6 (on multiplie 1 et 3 par 2)"
    },
    {
      title: "Addition de fractions",
      content: "Pour additionner des fractions avec le même dénominateur, on additionne les numérateurs et on garde le même dénominateur.",
      visual: (
        <div className="p-6 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg">
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold text-green-600">1/4 + 2/4 = 3/4</div>
            <div className="flex justify-center items-center gap-4">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
              </div>
              <span className="text-2xl">+</span>
              <div className="grid grid-cols-2 gap-1">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
                <div className="w-6 h-6 bg-green-500 rounded"></div>
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
              </div>
              <span className="text-2xl">=</span>
              <div className="grid grid-cols-2 gap-1">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
                <div className="w-6 h-6 bg-green-500 rounded"></div>
                <div className="w-6 h-6 bg-green-500 rounded"></div>
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ),
      question: "Combien fait 2/7 + 3/7 ?",
      answer: "5/7",
      hint: "Additionne les numérateurs : 2 + 3",
      explanation: "2/7 + 3/7 = (2+3)/7 = 5/7"
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const checkAnswer = () => {
    const userValue = userAnswer.trim();
    const correctValue = currentStepData.answer;
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
          onComplete(30);
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
            <PieChart className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fractions</h1>
            <p className="text-gray-600 dark:text-gray-300">Introduction aux fractions simples</p>
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
                  className="bg-emerald-500 hover:bg-emerald-600"
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
                      {isCorrect ? 'Super ! 🎉' : 'Pas tout à fait...'}
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

export default FractionsLesson;
