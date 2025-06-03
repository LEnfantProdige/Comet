
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Check, X, Lightbulb, Calculator } from "lucide-react";

interface DivisionLessonProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const DivisionLesson = ({ onBack, onComplete }: DivisionLessonProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const steps = [
    {
      title: "Division euclidienne",
      content: "La division euclidienne permet de partager une quantité en parts égales. Elle donne un quotient et parfois un reste.",
      visual: (
        <div className="p-6 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-emerald-600">15 ÷ 4 = ?</div>
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
              {Array.from({length: 15}, (_, i) => (
                <div key={i} className={`w-8 h-8 rounded ${i < 12 ? 'bg-emerald-500' : 'bg-orange-400'}`}></div>
              ))}
            </div>
            <div className="text-lg">
              <span className="text-emerald-600 font-bold">Quotient: 3</span>
              <span className="mx-4">•</span>
              <span className="text-orange-500 font-bold">Reste: 3</span>
            </div>
          </div>
        </div>
      ),
      question: "Quelle est le quotient de 20 ÷ 6 ?",
      answer: "3",
      hint: "Combien de fois 6 rentre-t-il dans 20 ?",
      explanation: "20 ÷ 6 = 3 reste 2 (car 6 × 3 = 18, et 20 - 18 = 2)"
    },
    {
      title: "Division décimale",
      content: "Quand on veut un résultat précis, on peut continuer la division en utilisant des décimales.",
      visual: (
        <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold text-blue-600">7 ÷ 2 = 3,5</div>
            <div className="bg-white p-4 rounded shadow">
              <div className="text-sm text-left font-mono">
                <div>  3,5</div>
                <div>2)7,0</div>
                <div>  6↓</div>
                <div>  --</div>
                <div>  10</div>
                <div>  10</div>
                <div>  --</div>
                <div>   0</div>
              </div>
            </div>
          </div>
        </div>
      ),
      question: "Combien fait 9 ÷ 2 en décimal ?",
      answer: "4.5",
      hint: "Pense à ajouter une virgule et un zéro",
      explanation: "9 ÷ 2 = 4,5 (car 2 × 4 = 8, reste 1, puis 10 ÷ 2 = 5)"
    },
    {
      title: "Vérification",
      content: "Pour vérifier une division, on peut utiliser la multiplication : quotient × diviseur + reste = dividende",
      visual: (
        <div className="p-6 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold text-green-600">Vérification</div>
            <div className="bg-white p-4 rounded shadow">
              <div className="space-y-2">
                <div>17 ÷ 5 = 3 reste 2</div>
                <div className="border-t pt-2">
                  <div className="text-green-600 font-bold">Vérification :</div>
                  <div>3 × 5 + 2 = 15 + 2 = 17 ✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      question: "Si 23 ÷ 7 = 3 reste 2, quelle est la vérification ?",
      answer: "23",
      hint: "Calcule 3 × 7 + 2",
      explanation: "Vérification : 3 × 7 + 2 = 21 + 2 = 23 ✓"
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const checkAnswer = () => {
    const userValue = userAnswer.trim();
    const correctValue = currentStepData.answer;
    const correct = userValue === correctValue || userValue.replace(',', '.') === correctValue;
    setIsCorrect(correct);
    
    setTimeout(() => {
      if (correct) {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
          setUserAnswer('');
          setIsCorrect(null);
          setShowHint(false);
        } else {
          onComplete(25);
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
            <Calculator className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Division</h1>
            <p className="text-gray-600 dark:text-gray-300">Division euclidienne et décimale</p>
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
                      {isCorrect ? 'Parfait ! 🎯' : 'Essaie encore...'}
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

export default DivisionLesson;
