
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { useNavigate } from "react-router-dom";
import { 
  Brain, 
  Target, 
  Zap, 
  Trophy, 
  BookOpen, 
  Star, 
  Play, 
  ChevronRight,
  ArrowLeft,
  Flame,
  Calculator,
  Atom,
  Lightbulb,
  Sparkles
} from "lucide-react";

const Eclaire = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState({
    xp: 1247,
    streak: 5,
    level: 12,
    dailyGoal: 150
  });

  const modules = [
    {
      id: 'math',
      title: 'Mathématiques',
      description: 'Algèbre, géométrie et calculs fondamentaux',
      icon: <Calculator className="h-8 w-8" />,
      color: 'bg-blue-500',
      progress: 75,
      lessons: 24,
      completed: 18
    },
    {
      id: 'physics',
      title: 'Physique',
      description: 'Mécanique, électricité et thermodynamique',
      icon: <Atom className="h-8 w-8" />,
      color: 'bg-purple-500',
      progress: 45,
      lessons: 32,
      completed: 14
    },
    {
      id: 'logic',
      title: 'Logique',
      description: 'Raisonnement, puzzles et pensée critique',
      icon: <Brain className="h-8 w-8" />,
      color: 'bg-green-500',
      progress: 60,
      lessons: 28,
      completed: 17
    },
    {
      id: 'computer',
      title: 'Informatique',
      description: 'Algorithmes, programmation et structures de données',
      icon: <Lightbulb className="h-8 w-8" />,
      color: 'bg-orange-500',
      progress: 30,
      lessons: 40,
      completed: 12
    }
  ];

  const dailyLessons = [
    {
      title: "Équations du second degré",
      subject: "Mathématiques",
      duration: "5 min",
      xp: 15,
      completed: false
    },
    {
      title: "Les forces et le mouvement",
      subject: "Physique", 
      duration: "7 min",
      xp: 20,
      completed: false
    },
    {
      title: "Logique booléenne",
      subject: "Logique",
      duration: "4 min",
      xp: 12,
      completed: true
    }
  ];

  const achievements = [
    { name: "Premier pas", icon: "🎯", earned: true },
    { name: "Série de 5 jours", icon: "🔥", earned: true },
    { name: "Expert en maths", icon: "📐", earned: false },
    { name: "Physicien en herbe", icon: "⚡", earned: false }
  ];

  if (selectedModule) {
    const module = modules.find(m => m.id === selectedModule);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedModule(null)}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className={`p-3 rounded-full ${module?.color} text-white`}>
              {module?.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{module?.title}</h1>
              <p className="text-gray-600 dark:text-gray-300">{module?.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {[1, 2, 3, 4, 5].map((lesson) => (
                <Card key={lesson} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold">
                        {lesson}
                      </div>
                      <div>
                        <h3 className="font-semibold">Leçon {lesson}</h3>
                        <p className="text-sm text-gray-500">Introduction aux concepts</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">+15 XP</Badge>
                      <Play className="h-5 w-5 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Progression</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Leçons complétées</span>
                      <span>{module?.completed}/{module?.lessons}</span>
                    </div>
                    <Progress value={module?.progress} className="h-2" />
                    <div className="text-center text-sm text-gray-500">
                      {module?.progress}% terminé
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header avec navigation */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/science")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux Sciences
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-orange-500">
              <Flame className="h-5 w-5" />
              <span className="font-bold">{userProgress.streak}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-500">
              <Zap className="h-5 w-5" />
              <span className="font-bold">{userProgress.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Éclaire
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Apprends les sciences de manière interactive et engageante. 
            Mathématiques, physique, logique et informatique à ton rythme.
          </p>
        </div>

        {/* Stats utilisateur */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-500">{userProgress.xp}</div>
              <div className="text-sm text-gray-500">Total XP</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-500">{userProgress.streak}</div>
              <div className="text-sm text-gray-500">Jours consécutifs</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-500">{userProgress.level}</div>
              <div className="text-sm text-gray-500">Niveau</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-500">75%</div>
              <div className="text-sm text-gray-500">Objectif quotidien</div>
            </CardContent>
          </Card>
        </div>

        {/* Objectif quotidien */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                Objectif quotidien
              </CardTitle>
              <Badge variant="secondary">112/{userProgress.dailyGoal} XP</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={75} className="h-3 mb-2" />
            <p className="text-sm text-gray-500">Continue ! Il te reste 38 XP pour atteindre ton objectif.</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Modules principaux */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-500" />
              Tes modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map((module) => (
                <Card 
                  key={module.id} 
                  className="hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => setSelectedModule(module.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-full ${module.color} text-white group-hover:scale-110 transition-transform`}>
                        {module.icon}
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{module.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progression</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                      <div className="text-xs text-gray-500">
                        {module.completed}/{module.lessons} leçons terminées
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar avec activités */}
          <div className="space-y-6">
            {/* Leçons suggérées */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Suggestions du jour
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dailyLessons.map((lesson, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-sm">{lesson.title}</h4>
                      {lesson.completed && <span className="text-green-500">✓</span>}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{lesson.subject}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">{lesson.duration}</span>
                      <Badge variant="outline" className="text-xs">+{lesson.xp} XP</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`text-center p-3 rounded-lg border ${
                        achievement.earned 
                          ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20' 
                          : 'bg-gray-50 border-gray-200 dark:bg-gray-800'
                      }`}
                    >
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <div className={`text-xs ${achievement.earned ? 'text-yellow-700 dark:text-yellow-300' : 'text-gray-500'}`}>
                        {achievement.name}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eclaire;
