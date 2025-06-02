
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Check, X, Lightbulb, Code, Cpu } from "lucide-react";

interface ComputerScienceLessonProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const ComputerScienceLesson = ({ onBack, onComplete }: ComputerScienceLessonProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const steps = [
    {
      title: "Qu'est-ce qu'un algorithme ?",
      content: "Un algorithme est une séquence d'instructions précises pour résoudre un problème ou accomplir une tâche.",
      visual: (
        <div className="p-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg">
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white p-3 rounded shadow-sm">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <span>Début</span>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 rounded shadow-sm">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <span>Traitement</span>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 rounded shadow-sm">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <span>Fin</span>
            </div>
          </div>
        </div>
      ),
      question: "Pour faire du pain, quelle est la première étape ?",
      answer: "mélanger",
      hint: "Il faut d'abord combiner les ingrédients",
      explanation: "La première étape est de mélanger les ingrédients (farine, eau, levure, sel)."
    },
    {
      title: "Variables et données",
      content: "Une variable est comme une boîte qui stocke une information que l'on peut utiliser et modifier.",
      visual: (
        <div className="p-6 space-y-4">
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <div className="w-24 h-16 bg-green-200 border-2 border-green-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-green-800">age</span>
              </div>
              <div className="mt-2 text-sm font-medium">25</div>
            </div>
            <div className="text-center">
              <div className="w-24 h-16 bg-blue-200 border-2 border-blue-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-blue-800">nom</span>
              </div>
              <div className="mt-2 text-sm font-medium">"Alice"</div>
            </div>
          </div>
        </div>
      ),
      question: "Si on a une variable 'score' qui vaut 10, et qu'on lui ajoute 5, quelle est sa nouvelle valeur ?",
      answer: "15",
      hint: "10 + 5 = ?",
      explanation: "score = 10 + 5 = 15"
    },
    {
      title: "Conditions",
      content: "Les conditions permettent au programme de prendre des décisions selon les circonstances.",
      visual: (
        <div className="p-6">
          <svg width="300" height="200" className="mx-auto">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" 
              refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#059669" />
              </marker>
            </defs>
            <rect x="110" y="20" width="80" height="40" fill="#fbbf24" rx="20" />
            <text x="150" y="45" textAnchor="middle" fontSize="12" fill="white">Il pleut ?</text>
            
            <rect x="50" y="120" width="80" height="40" fill="#10b981" rx="10" />
            <text x="90" y="145" textAnchor="middle" fontSize="11" fill="white">Prendre parapluie</text>
            
            <rect x="170" y="120" width="80" height="40" fill="#3b82f6" rx="10" />
            <text x="210" y="145" textAnchor="middle" fontSize="11" fill="white">Pas de parapluie</text>
            
            <line x1="130" y1="60" x2="90" y2="120" stroke="#059669" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="170" y1="60" x2="210" y2="120" stroke="#059669" strokeWidth="2" markerEnd="url(#arrow)" />
            
            <text x="100" y="90" fontSize="10" fill="#059669">OUI</text>
            <text x="195" y="90" fontSize="10" fill="#059669">NON</text>
          </svg>
        </div>
      ),
      question: "Dans une condition IF-ELSE, que se passe-t-il si la condition est fausse ?",
      answer: "else",
      hint: "La partie qui s'exécute quand la condition n'est pas vraie",
      explanation: "Quand la condition IF est fausse, c'est la partie ELSE qui s'exécute."
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
          onComplete(40);
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
          <div className="bg-lime-500 p-3 rounded-full text-white">
            <Cpu className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Informatique</h1>
            <p className="text-gray-600 dark:text-gray-300">Algorithmes et programmation</p>
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
            <CardTitle className="text-2xl text-lime-700">{currentStepData.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-lime-50 dark:bg-lime-900/20 p-4 rounded-lg">
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
                  className="bg-lime-500 hover:bg-lime-600"
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
                      {isCorrect ? 'Parfait ! 💻' : 'Pas tout à fait...'}
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

export default ComputerScienceLesson;
