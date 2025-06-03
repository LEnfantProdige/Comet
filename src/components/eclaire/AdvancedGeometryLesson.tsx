
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Check, X, Lightbulb, Box } from "lucide-react";

interface AdvancedGeometryLessonProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const AdvancedGeometryLesson = ({ onBack, onComplete }: AdvancedGeometryLessonProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const steps = [
    {
      title: "Aires des figures",
      content: "L'aire d'une figure est la mesure de sa surface. Elle s'exprime en unités carrées (cm², m², etc.)",
      visual: (
        <div className="p-6 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold text-emerald-600">Aire = longueur × largeur</div>
            <svg width="200" height="120" className="mx-auto">
              <rect x="50" y="20" width="100" height="60" fill="#22c55e" fillOpacity="0.3" stroke="#22c55e" strokeWidth="2"/>
              <text x="100" y="40" textAnchor="middle" className="text-sm font-medium">6 cm</text>
              <text x="25" y="55" textAnchor="middle" className="text-sm font-medium">4 cm</text>
              <text x="100" y="100" textAnchor="middle" className="text-sm font-bold">Aire = 6 × 4 = 24 cm²</text>
            </svg>
          </div>
        </div>
      ),
      question: "Quelle est l'aire d'un rectangle de 8 cm sur 5 cm ?",
      answer: "40",
      hint: "Multiplie la longueur par la largeur",
      explanation: "Aire = 8 × 5 = 40 cm²"
    },
    {
      title: "Volume des solides",
      content: "Le volume mesure l'espace occupé par un objet en 3D. Il s'exprime en unités cubiques (cm³, m³, etc.)",
      visual: (
        <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold text-blue-600">Volume = L × l × h</div>
            <svg width="200" height="150" className="mx-auto">
              <defs>
                <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8"/>
                </linearGradient>
              </defs>
              <polygon points="50,100 150,100 170,80 70,80" fill="url(#cubeGrad)" stroke="#1d4ed8" strokeWidth="2"/>
              <polygon points="50,100 70,80 70,30 50,50" fill="url(#cubeGrad)" stroke="#1d4ed8" strokeWidth="2"/>
              <polygon points="150,100 170,80 170,30 150,50" fill="url(#cubeGrad)" stroke="#1d4ed8" strokeWidth="2"/>
              <text x="100" y="125" textAnchor="middle" className="text-sm font-bold">Volume = 3 × 3 × 3 = 27 cm³</text>
            </svg>
          </div>
        </div>
      ),
      question: "Quel est le volume d'un cube de 4 cm de côté ?",
      answer: "64",
      hint: "Pour un cube : Volume = côté³",
      explanation: "Volume = 4³ = 4 × 4 × 4 = 64 cm³"
    },
    {
      title: "Théorème de Pythagore",
      content: "Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés : a² + b² = c²",
      visual: (
        <div className="p-6 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold text-green-600">a² + b² = c²</div>
            <svg width="200" height="150" className="mx-auto">
              <polygon points="50,120 150,120 150,70" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="2"/>
              <text x="100" y="135" textAnchor="middle" className="text-sm">a = 4</text>
              <text x="165" y="95" textAnchor="middle" className="text-sm">b = 3</text>
              <text x="90" y="90" textAnchor="middle" className="text-sm">c = 5</text>
              <text x="100" y="30" textAnchor="middle" className="text-sm font-bold">4² + 3² = 16 + 9 = 25 = 5²</text>
            </svg>
          </div>
        </div>
      ),
      question: "Dans un triangle rectangle avec les côtés 6 et 8, quelle est l'hypoténuse ?",
      answer: "10",
      hint: "Calcule √(6² + 8²)",
      explanation: "c² = 6² + 8² = 36 + 64 = 100, donc c = √100 = 10"
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
          <div className="bg-emerald-500 p-3 rounded-full text-white">
            <Box className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Géométrie Avancée</h1>
            <p className="text-gray-600 dark:text-gray-300">Volumes et aires</p>
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
                      {isCorrect ? 'Parfait ! 🎯' : 'Réessaie...'}
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

export default AdvancedGeometryLesson;
