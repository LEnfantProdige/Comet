
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Check, X, Lightbulb, Brain } from "lucide-react";

interface LogicLessonProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const LogicLesson = ({ onBack, onComplete }: LogicLessonProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const steps = [
    {
      title: "Logique booléenne",
      content: "En logique, une affirmation est soit vraie (VRAI) soit fausse (FAUX). Il n'y a pas d'entre-deux.",
      visual: (
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-100 rounded-lg border-2 border-green-400">
              <div className="text-2xl mb-2">✅</div>
              <div className="font-bold text-green-700">VRAI</div>
              <div className="text-sm text-green-600">"Il fait jour"</div>
            </div>
            <div className="text-center p-4 bg-red-100 rounded-lg border-2 border-red-400">
              <div className="text-2xl mb-2">❌</div>
              <div className="font-bold text-red-700">FAUX</div>
              <div className="text-sm text-red-600">"Il fait nuit"</div>
            </div>
          </div>
        </div>
      ),
      question: "Si l'affirmation 'Il pleut' est VRAIE, que vaut l'affirmation 'Il ne pleut pas' ?",
      answer: "faux",
      hint: "C'est l'opposé de VRAI",
      explanation: "Si 'Il pleut' est VRAI, alors 'Il ne pleut pas' est FAUX."
    },
    {
      title: "Raisonnement déductif",
      content: "Le raisonnement déductif part de règles générales pour arriver à une conclusion spécifique.",
      visual: (
        <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
          <div className="space-y-3 text-center">
            <div className="p-3 bg-white rounded shadow">
              <strong>Règle :</strong> Tous les oiseaux ont des plumes
            </div>
            <div className="text-2xl">⬇️</div>
            <div className="p-3 bg-white rounded shadow">
              <strong>Fait :</strong> Un canard est un oiseau
            </div>
            <div className="text-2xl">⬇️</div>
            <div className="p-3 bg-purple-200 rounded shadow">
              <strong>Conclusion :</strong> Un canard a des plumes
            </div>
          </div>
        </div>
      ),
      question: "Si tous les chats sont des mammifères et que Minou est un chat, que peut-on en déduire ?",
      answer: "mammifère",
      hint: "Applique la règle générale au cas particulier",
      explanation: "Minou est un mammifère (car tous les chats sont des mammifères)."
    },
    {
      title: "Ensembles et relations",
      content: "Un ensemble est une collection d'objets. On peut étudier les relations entre différents ensembles.",
      visual: (
        <svg width="300" height="200" className="mx-auto">
          <circle cx="100" cy="100" r="60" fill="#fbbf24" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2"/>
          <circle cx="200" cy="100" r="60" fill="#3b82f6" fillOpacity="0.3" stroke="#2563eb" strokeWidth="2"/>
          <text x="70" y="70" fill="#f59e0b" fontSize="12" fontWeight="bold">Fruits</text>
          <text x="210" y="70" fill="#2563eb" fontSize="12" fontWeight="bold">Rouge</text>
          <text x="90" y="110" fill="#000" fontSize="10">Banane</text>
          <text x="85" y="125" fill="#000" fontSize="10">Orange</text>
          <text x="200" y="110" fill="#000" fontSize="10">Tomate</text>
          <text x="205" y="125" fill="#000" fontSize="10">Rose</text>
          <text x="145" y="110" fill="#000" fontSize="10">Pomme</text>
          <text x="140" y="125" fill="#000" fontSize="10">Fraise</text>
        </svg>
      ),
      question: "Dans l'intersection de deux ensembles, que trouve-t-on ?",
      answer: "commun",
      hint: "Ce qui appartient aux deux ensembles à la fois",
      explanation: "L'intersection contient les éléments communs aux deux ensembles."
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
          <div className="bg-teal-500 p-3 rounded-full text-white">
            <Brain className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Logique</h1>
            <p className="text-gray-600 dark:text-gray-300">Raisonnement et pensée critique</p>
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
            <CardTitle className="text-2xl text-teal-700">{currentStepData.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
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
                  className="bg-teal-500 hover:bg-teal-600"
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
                      {isCorrect ? 'Logique ! 🧠' : 'Réfléchis encore...'}
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

export default LogicLesson;
