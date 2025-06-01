
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, Star } from "lucide-react";

interface ArithmeticGameProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const ArithmeticGame = ({ onBack, onComplete }: ArithmeticGameProps) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProblem, setCurrentProblem] = useState<{num1: number, num2: number, operator: string, answer: number} | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [streak, setStreak] = useState(0);

  const operators = ['+', '-', '*'];

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, isPlaying]);

  useEffect(() => {
    if (isPlaying && !currentProblem) {
      generateProblem();
    }
  }, [isPlaying, currentProblem]);

  const generateProblem = () => {
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1, num2, answer;

    switch (operator) {
      case '+':
        num1 = Math.floor(Math.random() * (10 * level)) + 1;
        num2 = Math.floor(Math.random() * (10 * level)) + 1;
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * (10 * level)) + 10;
        num2 = Math.floor(Math.random() * num1) + 1;
        answer = num1 - num2;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 * num2;
        break;
      default:
        num1 = 1; num2 = 1; answer = 2;
    }

    setCurrentProblem({ num1, num2, operator, answer });
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setCurrentProblem(null);
  };

  const endGame = () => {
    setIsPlaying(false);
    const xpEarned = Math.floor(score / 2);
    onComplete(xpEarned);
  };

  const checkAnswer = () => {
    if (!currentProblem) return;

    const isCorrect = parseInt(userAnswer) === currentProblem.answer;
    
    if (isCorrect) {
      setScore(score + (10 * level) + (streak * 2));
      setStreak(streak + 1);
      if (streak > 0 && streak % 5 === 0) {
        setLevel(Math.min(level + 1, 5));
      }
    } else {
      setStreak(0);
    }

    setUserAnswer('');
    setCurrentProblem(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-emerald-900 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="bg-emerald-500 p-3 rounded-full text-white">
            <span className="text-2xl">🧮</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calcul Mental</h1>
            <p className="text-gray-600 dark:text-gray-300">Entraîne-toi au calcul rapide</p>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Niveau {level}</span>
              {isPlaying && (
                <div className="flex items-center gap-4 text-lg">
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <span className={timeLeft <= 10 ? 'text-red-500 font-bold' : 'text-gray-600'}>{timeLeft}s</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span>{score}</span>
                  </div>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isPlaying ? (
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Prêt pour le défi ?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Résous un maximum de calculs en 60 secondes !
                  </p>
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-sm">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded">
                      <div className="font-semibold">Addition</div>
                      <div className="text-emerald-600">+10 points</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                      <div className="font-semibold">Soustraction</div>
                      <div className="text-blue-600">+10 points</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
                      <div className="font-semibold">Multiplication</div>
                      <div className="text-purple-600">+10 points</div>
                    </div>
                  </div>
                </div>
                <Button onClick={startGame} className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8 py-3">
                  Commencer
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {streak > 0 && (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full">
                      <span className="text-lg">🔥</span>
                      <span className="font-semibold">Série de {streak}!</span>
                    </div>
                  </div>
                )}

                {currentProblem && (
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold space-x-4">
                      <span>{currentProblem.num1}</span>
                      <span className="text-emerald-500">{currentProblem.operator}</span>
                      <span>{currentProblem.num2}</span>
                      <span>=</span>
                      <span className="text-gray-400">?</span>
                    </div>
                    
                    <div className="flex justify-center">
                      <input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-32 p-3 text-2xl text-center border border-gray-300 rounded-lg"
                        placeholder="..."
                        autoFocus
                      />
                    </div>

                    <Button 
                      onClick={checkAnswer}
                      disabled={!userAnswer}
                      className="bg-emerald-500 hover:bg-emerald-600 px-8"
                    >
                      Valider
                    </Button>
                  </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span>Temps restant</span>
                    <span>{timeLeft}s</span>
                  </div>
                  <Progress value={(timeLeft / 60) * 100} className="h-2" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArithmeticGame;
