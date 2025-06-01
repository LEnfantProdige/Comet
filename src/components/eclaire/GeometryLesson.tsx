
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Check, X, Eye } from "lucide-react";

interface GeometryLessonProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const GeometryLesson = ({ onBack, onComplete }: GeometryLessonProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const steps = [
    {
      title: "Les angles",
      content: "Un angle est formé par deux droites qui se croisent. On mesure les angles en degrés (°).",
      visual: (
        <svg width="200" height="150" className="mx-auto">
          <line x1="50" y1="100" x2="150" y2="100" stroke="#059669" strokeWidth="2"/>
          <line x1="100" y1="100" x2="130" y2="70" stroke="#059669" strokeWidth="2"/>
          <path d="M 110 100 A 10 10 0 0 0 115 92" fill="none" stroke="#f59e0b" strokeWidth="2"/>
          <text x="125" y="95" fill="#059669" fontSize="14">α</text>
        </svg>
      ),
      question: "Combien de degrés fait un angle droit ?",
      answer: "90",
      explanation: "Un angle droit mesure exactement 90°. C'est l'angle que forme un L parfait."
    },
    {
      title: "Les triangles",
      content: "Un triangle a trois côtés et trois angles. La somme des angles d'un triangle est toujours 180°.",
      visual: (
        <svg width="200" height="150" className="mx-auto">
          <polygon points="100,30 60,120 140,120" fill="none" stroke="#059669" strokeWidth="2"/>
          <text x="95" y="25" fill="#059669" fontSize="12">A</text>
          <text x="55" y="135" fill="#059669" fontSize="12">B</text>
          <text x="145" y="135" fill="#059669" fontSize="12">C</text>
          <text x="75" y="80" fill="#f59e0b" fontSize="12">60°</text>
          <text x="115" y="80" fill="#f59e0b" fontSize="12">60°</text>
          <text x="100" y="110" fill="#f59e0b" fontSize="12">60°</text>
        </svg>
      ),
      question: "Si un triangle a deux angles de 45° et 90°, quel est le troisième angle ?",
      answer: "45",
      explanation: "45° + 90° = 135°, donc le troisième angle = 180° - 135° = 45°"
    },
    {
      title: "Le cercle",
      content: "Un cercle est l'ensemble des points situés à égale distance d'un point central.",
      visual: (
        <svg width="200" height="150" className="mx-auto">
          <circle cx="100" cy="75" r="40" fill="none" stroke="#059669" strokeWidth="2"/>
          <line x1="100" y1="75" x2="140" y2="75" stroke="#f59e0b" strokeWidth="2"/>
          <circle cx="100" cy="75" r="2" fill="#059669"/>
          <text x="120" y="80" fill="#f59e0b" fontSize="12">rayon</text>
          <text x="95" y="90" fill="#059669" fontSize="12">centre</text>
        </svg>
      ),
      question: "Si le rayon d'un cercle est de 5 cm, quel est son diamètre ?",
      answer: "10",
      explanation: "Le diamètre est égal à 2 fois le rayon : 2 × 5 = 10 cm"
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
            <span className="text-2xl">📐</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Géométrie</h1>
            <p className="text-gray-600 dark:text-gray-300">Formes et mesures</p>
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
                      {isCorrect ? 'Parfait ! 🎉' : 'Pas tout à fait...'}
                    </span>
                    <p className="text-sm mt-1">{currentStepData.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeometryLesson;
