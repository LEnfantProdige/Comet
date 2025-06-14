
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Star, 
  Trophy, 
  Target, 
  Brain, 
  Flame, 
  Zap,
  BookOpen,
  Calculator,
  Atom,
  Lightbulb,
  Crown,
  Settings,
  Heart,
  TrendingUp,
  CheckCircle,
  Lock
} from "lucide-react";

interface LevelingSystemProps {
  onBack: () => void;
  userProgress: {
    xp: number;
    level: number;
    streak: number;
  };
}

const LevelingSystem: React.FC<LevelingSystemProps> = ({ onBack, userProgress }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['math', 'logic']);
  const [learningStyle, setLearningStyle] = useState<'visual' | 'auditory' | 'kinesthetic' | 'mixed'>('visual');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const subjects = [
    { id: 'math', name: 'Mathématiques', icon: <Calculator className="h-5 w-5" />, color: 'bg-emerald-500' },
    { id: 'physics', name: 'Physique', icon: <Atom className="h-5 w-5" />, color: 'bg-green-500' },
    { id: 'logic', name: 'Logique', icon: <Brain className="h-5 w-5" />, color: 'bg-teal-500' },
    { id: 'computer', name: 'Informatique', icon: <Lightbulb className="h-5 w-5" />, color: 'bg-lime-500' },
    { id: 'history', name: 'Histoire', icon: <BookOpen className="h-5 w-5" />, color: 'bg-amber-500' }
  ];

  const levels = [
    { level: 1, name: "Explorateur", minXp: 0, maxXp: 100, color: "bg-gray-500", description: "Premiers pas dans l'aventure" },
    { level: 2, name: "Apprenti", minXp: 100, maxXp: 250, color: "bg-green-500", description: "Les bases sont acquises" },
    { level: 3, name: "Étudiant", minXp: 250, maxXp: 500, color: "bg-blue-500", description: "Progression constante" },
    { level: 4, name: "Passionné", minXp: 500, maxXp: 1000, color: "bg-purple-500", description: "L'apprentissage devient passion" },
    { level: 5, name: "Expert", minXp: 1000, maxXp: 2000, color: "bg-orange-500", description: "Maîtrise avancée" },
    { level: 6, name: "Maître", minXp: 2000, maxXp: 4000, color: "bg-red-500", description: "Sagesse et expertise" },
    { level: 7, name: "Légende", minXp: 4000, maxXp: 8000, color: "bg-yellow-500", description: "Au sommet de l'excellence" },
    { level: 8, name: "Génie", minXp: 8000, maxXp: 16000, color: "bg-pink-500", description: "Innovation et créativité" },
    { level: 9, name: "Visionnaire", minXp: 16000, maxXp: 32000, color: "bg-indigo-500", description: "Repousser les limites" },
    { level: 10, name: "Immortel", minXp: 32000, maxXp: Infinity, color: "bg-gradient-to-r from-purple-500 to-pink-500", description: "L'ultime sagesse" }
  ];

  const achievements = [
    { id: 'first-lesson', name: 'Premier pas', description: 'Terminer sa première leçon', xp: 10, unlocked: true },
    { id: 'streak-5', name: 'Régularité', description: '5 jours consécutifs', xp: 25, unlocked: true },
    { id: 'math-master', name: 'Maître des maths', description: 'Terminer tous les modules de maths', xp: 100, unlocked: true },
    { id: 'perfect-score', name: 'Score parfait', description: 'Obtenir 100% à un quiz', xp: 50, unlocked: false },
    { id: 'speed-demon', name: 'Vitesse éclair', description: 'Terminer une leçon en moins de 2 minutes', xp: 30, unlocked: false },
    { id: 'night-owl', name: 'Chouette de nuit', description: 'Apprendre après 22h', xp: 15, unlocked: false },
    { id: 'early-bird', name: 'Lève-tôt', description: 'Apprendre avant 7h', xp: 15, unlocked: false },
    { id: 'streak-30', name: 'Dédication totale', description: '30 jours consécutifs', xp: 200, unlocked: false }
  ];

  const personalizedLessons = [
    {
      title: "Algèbre adaptée",
      description: "Leçon personnalisée selon votre style d'apprentissage",
      duration: "8 min",
      xp: 35,
      difficulty: difficulty,
      style: learningStyle,
      recommended: true
    },
    {
      title: "Logique visuelle",
      description: "Puzzles adaptés à votre niveau",
      duration: "12 min",
      xp: 45,
      difficulty: difficulty,
      style: learningStyle,
      recommended: selectedInterests.includes('logic')
    },
    {
      title: "Physique interactive",
      description: "Expériences virtuelles personnalisées",
      duration: "15 min",
      xp: 50,
      difficulty: difficulty,
      style: learningStyle,
      recommended: selectedInterests.includes('physics')
    }
  ];

  const currentLevel = levels.find(l => userProgress.xp >= l.minXp && userProgress.xp < l.maxXp) || levels[0];
  const nextLevel = levels[currentLevel.level] || currentLevel;
  const progressToNext = ((userProgress.xp - currentLevel.minXp) / (nextLevel.maxXp - currentLevel.minXp)) * 100;

  const toggleInterest = (subjectId: string) => {
    setSelectedInterests(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-emerald-900 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-full text-white">
            <TrendingUp className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Système de Progression</h1>
            <p className="text-gray-600 dark:text-gray-300">Personnalisez votre parcours d'apprentissage</p>
          </div>
        </div>

        <Tabs defaultValue="level" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="level">Niveau</TabsTrigger>
            <TabsTrigger value="personalization">Personnalisation</TabsTrigger>
            <TabsTrigger value="achievements">Succès</TabsTrigger>
            <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
          </TabsList>

          <TabsContent value="level" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${currentLevel.color} text-white`}>
                        <Crown className="h-6 w-6" />
                      </div>
                      Niveau {currentLevel.level} - {currentLevel.name}
                    </CardTitle>
                    <p className="text-gray-600">{currentLevel.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Progression vers le niveau {nextLevel.level}</span>
                        <span>{userProgress.xp} / {nextLevel.maxXp} XP</span>
                      </div>
                      <Progress value={progressToNext} className="h-3" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {levels.slice(0, 6).map((level) => (
                        <Card key={level.level} className={`transition-all ${
                          userProgress.level >= level.level ? 'ring-2 ring-emerald-300' : 'opacity-60'
                        }`}>
                          <CardContent className="p-4 text-center">
                            <div className={`w-12 h-12 rounded-full ${level.color} mx-auto mb-2 flex items-center justify-center text-white`}>
                              {userProgress.level >= level.level ? (
                                <CheckCircle className="h-6 w-6" />
                              ) : (
                                <Lock className="h-6 w-6" />
                              )}
                            </div>
                            <h3 className="font-semibold text-sm">{level.name}</h3>
                            <p className="text-xs text-gray-500">Niveau {level.level}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Statistiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>XP Total</span>
                      <Badge variant="secondary">{userProgress.xp}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Série actuelle</span>
                      <Badge variant="secondary">{userProgress.streak} jours</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Succès débloqués</span>
                      <Badge variant="secondary">{achievements.filter(a => a.unlocked).length}/{achievements.length}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="personalization" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vos centres d'intérêt</CardTitle>
                  <p className="text-gray-600">Sélectionnez les matières qui vous passionnent</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {subjects.map((subject) => (
                      <Button
                        key={subject.id}
                        variant={selectedInterests.includes(subject.id) ? "default" : "outline"}
                        onClick={() => toggleInterest(subject.id)}
                        className="justify-start h-auto p-4"
                      >
                        <div className={`p-2 rounded-full ${subject.color} text-white mr-3`}>
                          {subject.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">{subject.name}</div>
                          {selectedInterests.includes(subject.id) && (
                            <div className="text-sm opacity-75">Sélectionné</div>
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Style d'apprentissage</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant={learningStyle === 'visual' ? "default" : "outline"}
                      onClick={() => setLearningStyle('visual')}
                      className="w-full justify-start"
                    >
                      Visuel - J'apprends mieux avec des images et diagrammes
                    </Button>
                    <Button
                      variant={learningStyle === 'auditory' ? "default" : "outline"}
                      onClick={() => setLearningStyle('auditory')}
                      className="w-full justify-start"
                    >
                      Auditif - J'aime les explications verbales
                    </Button>
                    <Button
                      variant={learningStyle === 'kinesthetic' ? "default" : "outline"}
                      onClick={() => setLearningStyle('kinesthetic')}
                      className="w-full justify-start"
                    >
                      Kinesthésique - J'apprends en pratiquant
                    </Button>
                    <Button
                      variant={learningStyle === 'mixed' ? "default" : "outline"}
                      onClick={() => setLearningStyle('mixed')}
                      className="w-full justify-start"
                    >
                      Mixte - Je combine plusieurs approches
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Niveau de difficulté</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant={difficulty === 'easy' ? "default" : "outline"}
                      onClick={() => setDifficulty('easy')}
                      className="w-full"
                    >
                      Facile - Je débute
                    </Button>
                    <Button
                      variant={difficulty === 'medium' ? "default" : "outline"}
                      onClick={() => setDifficulty('medium')}
                      className="w-full"
                    >
                      Moyen - J'ai des bases
                    </Button>
                    <Button
                      variant={difficulty === 'hard' ? "default" : "outline"}
                      onClick={() => setDifficulty('hard')}
                      className="w-full"
                    >
                      Difficile - Je cherche un défi
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`transition-all ${
                  achievement.unlocked ? 'ring-2 ring-yellow-300 bg-yellow-50' : 'opacity-60'
                }`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      achievement.unlocked ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      {achievement.unlocked ? <Trophy className="h-8 w-8" /> : <Lock className="h-8 w-8" />}
                    </div>
                    <h3 className="font-semibold mb-2">{achievement.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                      +{achievement.xp} XP
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="space-y-4">
              {personalizedLessons.map((lesson, index) => (
                <Card key={index} className={`transition-all hover:shadow-lg ${
                  lesson.recommended ? 'ring-2 ring-emerald-300' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{lesson.title}</h3>
                          {lesson.recommended && (
                            <Badge className="bg-emerald-500">
                              <Star className="h-3 w-3 mr-1" />
                              Recommandé
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{lesson.description}</p>
                        <div className="flex gap-2 text-sm text-gray-500">
                          <span>⏱️ {lesson.duration}</span>
                          <span>🎯 {lesson.difficulty}</span>
                          <span>🎨 {lesson.style}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">+{lesson.xp} XP</Badge>
                        <Button size="sm" className="block">
                          Commencer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LevelingSystem;
