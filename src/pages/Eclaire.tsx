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
  Sparkles,
  Check,
  Lock,
  Gamepad2,
  Shapes,
  Newspaper,
  Clock,
  Bus,
  Crown,
  TrendingUp
} from "lucide-react";

// Import des composants de leçons
import AlgebraLesson from "@/components/eclaire/AlgebraLesson";
import LaserMazeGame from "@/components/eclaire/LaserMazeGame";
import GeometryLesson from "@/components/eclaire/GeometryLesson";
import ArithmeticGame from "@/components/eclaire/ArithmeticGame";
import PhysicsLesson from "@/components/eclaire/PhysicsLesson";
import ComputerScienceLesson from "@/components/eclaire/ComputerScienceLesson";
import LogicLesson from "@/components/eclaire/LogicLesson";
import DivisionLesson from "@/components/eclaire/DivisionLesson";
import FractionsLesson from "@/components/eclaire/FractionsLesson";
import TangramGame from "@/components/eclaire/TangramGame";
import TangramGameImproved from "@/components/eclaire/TangramGameImproved";
import RummikubGame from "@/components/eclaire/RummikubGame";
import AdvancedGeometryLesson from "@/components/eclaire/AdvancedGeometryLesson";
import BusOutGame from "@/components/eclaire/BusOutGame";
import AlchimistCraft from "@/components/eclaire/AlchimistCraft";
import ChessGame from "@/components/eclaire/ChessGame";
import LevelingSystem from "@/components/eclaire/LevelingSystem";

const Eclaire = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
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
      color: 'bg-emerald-500',
      progress: 75,
      lessons: 6,
      completed: 4
    },
    {
      id: 'physics',
      title: 'Physique',
      description: 'Mécanique, électricité et thermodynamique',
      icon: <Atom className="h-8 w-8" />,
      color: 'bg-green-500',
      progress: 65,
      lessons: 5,
      completed: 3
    },
    {
      id: 'logic',
      title: 'Logique',
      description: 'Raisonnement, puzzles et pensée critique',
      icon: <Brain className="h-8 w-8" />,
      color: 'bg-teal-500',
      progress: 80,
      lessons: 7,
      completed: 5
    },
    {
      id: 'computer',
      title: 'Informatique',
      description: 'Algorithmes, programmation et structures de données',
      icon: <Lightbulb className="h-8 w-8" />,
      color: 'bg-lime-500',
      progress: 60,
      lessons: 5,
      completed: 3
    },
    {
      id: 'history',
      title: 'Histoire',
      description: 'Périodes historiques et civilisations',
      icon: <BookOpen className="h-8 w-8" />,
      color: 'bg-amber-500',
      progress: 40,
      lessons: 8,
      completed: 3
    },
    {
      id: 'news',
      title: 'Actualités',
      description: 'Sciences, découvertes et actualités',
      icon: <Newspaper className="h-8 w-8" />,
      color: 'bg-blue-500',
      progress: 20,
      lessons: 6,
      completed: 1
    }
  ];

  const lessonsData = {
    math: [
      { id: 'algebra', title: "Algèbre", description: "Équations et résolution", completed: true, locked: false, type: 'lesson' },
      { id: 'geometry', title: "Géométrie", description: "Formes et mesures", completed: true, locked: false, type: 'lesson' },
      { id: 'arithmetic', title: "Calcul Mental", description: "Entraînement rapide", completed: true, locked: false, type: 'game' },
      { id: 'division', title: "Division", description: "Division euclidienne et décimale", completed: true, locked: false, type: 'lesson' },
      { id: 'fractions', title: "Fractions simples", description: "Introduction aux fractions", completed: false, locked: false, type: 'lesson' },
      { id: 'advanced-geometry', title: "Géométrie avancée", description: "Volumes et aires", completed: false, locked: false, type: 'lesson' }
    ],
    physics: [
      { id: 'physics-basics', title: "Bases de la physique", description: "Introduction aux concepts", completed: true, locked: false, type: 'lesson' },
      { id: 'matter-states', title: "La matière et ses états", description: "Solide, liquide, gazeux", completed: false, locked: false, type: 'lesson' },
      { id: 'movement', title: "Le mouvement", description: "Vitesse et accélération", completed: false, locked: false, type: 'lesson' },
      { id: 'forces', title: "Les forces", description: "Comprendre les forces et leur effet", completed: false, locked: false, type: 'lesson' },
      { id: 'energy', title: "L'énergie", description: "Formes d'énergie et conservation", completed: false, locked: false, type: 'lesson' }
    ],
    logic: [
      { id: 'logic-basics', title: "Logique de base", description: "Raisonnement et déduction", completed: true, locked: false, type: 'lesson' },
      { id: 'chess', title: "École d'Échecs", description: "Cours, entraînement et parties", completed: false, locked: false, type: 'game' },
      { id: 'deductive-reasoning', title: "Raisonnement déductif", description: "Tirer des conclusions logiques", completed: false, locked: false, type: 'lesson' },
      { id: 'laser-maze', title: "Labyrinthe Laser", description: "Jeu de logique avec miroirs", completed: true, locked: false, type: 'game' },
      { id: 'tangram', title: "Tangram", description: "Puzzle de formes géométriques", completed: false, locked: false, type: 'game' },
      { id: 'tangram-advanced', title: "Tangram Avancé", description: "Puzzle avec zones de placement", completed: false, locked: false, type: 'game' },
      { id: 'rummikub', title: "Rummikub", description: "Jeu de combinaisons de cartes", completed: false, locked: false, type: 'game' },
      { id: 'bus-out', title: "Bus Out", description: "Puzzle de parking avec bus", completed: false, locked: false, type: 'game' },
      { id: 'alchimist-craft', title: "Alchimist Craft", description: "Jeu de combinaison d'éléments", completed: false, locked: false, type: 'game' },
      { id: 'set-theory', title: "Théorie des ensembles", description: "Collections d'objets et relations", completed: false, locked: false, type: 'lesson' }
    ],
    computer: [
      { id: 'computer-basics', title: "Bases de l'informatique", description: "Algorithmes et logique", completed: true, locked: false, type: 'lesson' },
      { id: 'variables-data', title: "Variables et données", description: "Stocker et manipuler l'information", completed: false, locked: false, type: 'lesson' },
      { id: 'conditions', title: "Conditions", description: "Prendre des décisions en programmation", completed: false, locked: false, type: 'lesson' },
      { id: 'loops', title: "Boucles", description: "Répéter des actions", completed: false, locked: false, type: 'lesson' },
      { id: 'functions', title: "Fonctions", description: "Organiser le code en modules", completed: false, locked: false, type: 'lesson' }
    ],
    history: [
      { id: 'ancient-egypt', title: "Égypte Antique", description: "Pharaons et pyramides", completed: true, locked: false, type: 'lesson' },
      { id: 'ancient-greece', title: "Grèce Antique", description: "Démocratie et philosophie", completed: false, locked: false, type: 'lesson' },
      { id: 'roman-empire', title: "Empire Romain", description: "Conquêtes et civilisation", completed: false, locked: false, type: 'lesson' },
      { id: 'middle-ages', title: "Moyen Âge", description: "Chevaliers et châteaux", completed: false, locked: false, type: 'lesson' },
      { id: 'renaissance', title: "Renaissance", description: "Art et découvertes", completed: false, locked: false, type: 'lesson' },
      { id: 'industrial-revolution', title: "Révolution Industrielle", description: "Machines et changements", completed: false, locked: false, type: 'lesson' },
      { id: 'world-wars', title: "Guerres Mondiales", description: "Histoire du 20e siècle", completed: false, locked: false, type: 'lesson' },
      { id: 'modern-era', title: "Ère Moderne", description: "De 1945 à aujourd'hui", completed: false, locked: false, type: 'lesson' }
    ],
    news: [
      { id: 'space-discoveries', title: "Découvertes Spatiales", description: "Exploration de l'univers", completed: true, locked: false, type: 'lesson' },
      { id: 'climate-change', title: "Changement Climatique", description: "Sciences environnementales", completed: false, locked: false, type: 'lesson' },
      { id: 'medical-breakthroughs', title: "Avancées Médicales", description: "Nouvelles technologies de santé", completed: false, locked: false, type: 'lesson' },
      { id: 'ai-technology', title: "Intelligence Artificielle", description: "IA et société", completed: false, locked: false, type: 'lesson' },
      { id: 'renewable-energy', title: "Énergies Renouvelables", description: "Transition énergétique", completed: false, locked: false, type: 'lesson' },
      { id: 'biotechnology', title: "Biotechnologie", description: "Manipulation du vivant", completed: false, locked: false, type: 'lesson' }
    ]
  };

  const dailyLessons = [
    {
      title: "Division euclidienne",
      subject: "Mathématiques",
      duration: "5 min",
      xp: 15,
      completed: false
    },
    {
      title: "Découvertes spatiales",
      subject: "Actualités", 
      duration: "7 min",
      xp: 20,
      completed: false
    },
    {
      title: "Syllogismes",
      subject: "Logique",
      duration: "4 min",
      xp: 12,
      completed: true
    }
  ];

  const achievements = [
    { name: "Premier pas", icon: "🎯", earned: true },
    { name: "Série de 5 jours", icon: "🔥", earned: true },
    { name: "Expert en maths", icon: "📐", earned: true },
    { name: "Historien en herbe", icon: "📚", earned: false }
  ];

  const handleLessonComplete = (xp: number) => {
    setUserProgress(prev => ({
      ...prev,
      xp: prev.xp + xp
    }));
    setActiveComponent(null);
    setSelectedLesson(null);
  };

  if (activeComponent === 'algebra') {
    return <AlgebraLesson onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'laser-maze') {
    return <LaserMazeGame onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'geometry') {
    return <GeometryLesson onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'arithmetic') {
    return <ArithmeticGame onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'physics-basics') {
    return <PhysicsLesson onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'computer-basics') {
    return <ComputerScienceLesson onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'logic-basics') {
    return <LogicLesson onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'division') {
    return <DivisionLesson onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'fractions') {
    return <FractionsLesson onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'tangram') {
    return <TangramGame onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'tangram-advanced') {
    return <TangramGameImproved onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'rummikub') {
    return <RummikubGame onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'advanced-geometry') {
    return <AdvancedGeometryLesson onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'bus-out') {
    return <BusOutGame onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'alchimist-craft') {
    return <AlchimistCraft onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'chess') {
    return <ChessGame onBack={() => setActiveComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (activeComponent === 'leveling-system') {
    return <LevelingSystem onBack={() => setActiveComponent(null)} userProgress={userProgress} />;
  }

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-emerald-900 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedLesson(null)}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="bg-emerald-500 p-3 rounded-full text-white">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leçon en cours</h1>
              <p className="text-gray-600 dark:text-gray-300">Apprentissage interactif</p>
            </div>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Leçon interactive</h2>
                <p className="text-gray-600">
                  Cette fonctionnalité sera bientôt disponible ! 
                  Les leçons interactives de Comète offriront des explications visuelles, 
                  des quiz et des exercices pratiques.
                </p>
              </div>
              <Button 
                onClick={() => setSelectedLesson(null)}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                Retour aux leçons
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedModule) {
    const module = modules.find(m => m.id === selectedModule);
    const lessons = lessonsData[selectedModule as keyof typeof lessonsData] || [];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-emerald-900 py-8 px-4">
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
              {lessons.map((lesson) => (
                <Card 
                  key={lesson.id} 
                  className={`transition-all cursor-pointer ${
                    lesson.locked 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'hover:shadow-md hover:scale-[1.02]'
                  }`}
                  onClick={() => {
                    if (!lesson.locked) {
                      if (typeof lesson.id === 'string' && ['algebra', 'laser-maze', 'geometry', 'arithmetic', 'physics-basics', 'computer-basics', 'logic-basics', 'division', 'fractions', 'tangram', 'tangram-advanced', 'rummikub', 'advanced-geometry', 'bus-out', 'alchimist-craft', 'chess'].includes(lesson.id)) {
                        setActiveComponent(lesson.id);
                      } else {
                        setSelectedLesson(lesson.id.toString());
                      }
                    }
                  }}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                        lesson.completed 
                          ? 'bg-emerald-500 text-white' 
                          : lesson.locked 
                            ? 'bg-gray-200 text-gray-400' 
                            : 'bg-emerald-100 text-emerald-600'
                      }`}>
                        {lesson.completed ? (
                          <Check className="h-6 w-6" />
                        ) : lesson.locked ? (
                          <Lock className="h-5 w-5" />
                        ) : lesson.type === 'game' ? (
                          lesson.id === 'bus-out' ? <Bus className="h-5 w-5" /> :
                          lesson.id === 'alchimist-craft' ? <Sparkles className="h-5 w-5" /> :
                          lesson.id === 'chess' ? <Crown className="h-5 w-5" /> :
                          <Gamepad2 className="h-5 w-5" />
                        ) : lesson.type === 'lesson' && typeof lesson.id === 'string' ? (
                          <Shapes className="h-5 w-5" />
                        ) : (
                          lesson.id
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{lesson.title}</h3>
                        <p className="text-sm text-gray-500">{lesson.description}</p>
                        {lesson.type === 'game' && (
                          <Badge variant="secondary" className="mt-1 bg-purple-100 text-purple-700">
                            Jeu interactif
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!lesson.locked && (
                        <>
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                            +{lesson.type === 'game' ? '25-50' : lesson.completed ? '✓' : '15-40'} XP
                          </Badge>
                          <Play className="h-5 w-5 text-emerald-500" />
                        </>
                      )}
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
                      <span>{lessons.filter(l => l.completed).length}/{lessons.length}</span>
                    </div>
                    <Progress value={module?.progress} className="h-2" />
                    <div className="text-center text-sm text-gray-500">
                      {module?.progress}% terminé
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prochaine étape</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const nextLesson = lessons.find(l => !l.completed && !l.locked);
                    if (nextLesson) {
                      return (
                        <div className="space-y-2">
                          <h4 className="font-medium">{nextLesson.title}</h4>
                          <p className="text-sm text-gray-500">{nextLesson.description}</p>
                          <Button 
                            size="sm" 
                            className="w-full bg-emerald-500 hover:bg-emerald-600"
                            onClick={() => {
                              if (typeof nextLesson.id === 'string' && ['algebra', 'laser-maze', 'geometry', 'arithmetic', 'physics-basics', 'computer-basics', 'logic-basics', 'division', 'fractions', 'tangram', 'advanced-geometry', 'bus-out', 'alchimist-craft', 'chess'].includes(nextLesson.id)) {
                                setActiveComponent(nextLesson.id);
                              } else {
                                setSelectedLesson(nextLesson.id.toString());
                              }
                            }}
                          >
                            Commencer
                          </Button>
                        </div>
                      );
                    }
                    return <p className="text-sm text-gray-500">Module terminé ! Félicitations 🎉</p>;
                  })()}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-emerald-900 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header avec navigation */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Button>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setActiveComponent('leveling-system')}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Niveau {userProgress.level}
            </Button>
            <div className="flex items-center gap-2 text-orange-500">
              <Flame className="h-5 w-5" />
              <span className="font-bold">{userProgress.streak}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-500">
              <Zap className="h-5 w-5" />
              <span className="font-bold">{userProgress.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4 rounded-full">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 mb-4">
            Comète
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Plateforme d'apprentissage intelligente avec système de niveaux et personnalisation
          </p>
        </div>

        {/* Stats utilisateur avec niveau */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="text-center cursor-pointer hover:shadow-md" onClick={() => setActiveComponent('leveling-system')}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-500">{userProgress.level}</div>
              <div className="text-sm text-gray-500">Niveau</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-emerald-500">{userProgress.xp}</div>
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
              <div className="text-2xl font-bold text-green-500">4/6</div>
              <div className="text-sm text-gray-500">Modules actifs</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-teal-500">75%</div>
              <div className="text-sm text-gray-500">Objectif quotidien</div>
            </CardContent>
          </Card>
        </div>

        {/* Objectif quotidien */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-500" />
                Objectif quotidien
              </CardTitle>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                112/{userProgress.dailyGoal} XP
              </Badge>
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
              <BookOpen className="h-6 w-6 text-emerald-500" />
              Tes modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map((module) => (
                <Card 
                  key={module.id} 
                  className="hover:shadow-lg transition-all cursor-pointer group hover:scale-[1.02]"
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
                  <div key={index} className="p-3 border rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 cursor-pointer transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-sm">{lesson.title}</h4>
                      {lesson.completed && <span className="text-emerald-500">✓</span>}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{lesson.subject}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">{lesson.duration}</span>
                      <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700">
                        +{lesson.xp} XP
                      </Badge>
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
                      className={`text-center p-3 rounded-lg border transition-all ${
                        achievement.earned 
                          ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 shadow-sm' 
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

            {/* Nouveau: Bouton système de niveaux */}
            <Card className="border-2 border-emerald-200 bg-emerald-50">
              <CardContent className="p-4 text-center">
                <div className="mb-3">
                  <TrendingUp className="h-8 w-8 text-emerald-500 mx-auto" />
                </div>
                <h3 className="font-semibold text-emerald-700 mb-2">Système de Progression</h3>
                <p className="text-xs text-emerald-600 mb-3">
                  Découvrez votre niveau, personnalisez votre apprentissage et débloquez des succès !
                </p>
                <Button 
                  onClick={() => setActiveComponent('leveling-system')}
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                  size="sm"
                >
                  Explorer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eclaire;
