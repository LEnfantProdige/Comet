
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ChevronRight, Play, BookOpen, Clock, Users, Zap, Atom, Rocket, Anchor } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PeriodCard from "@/components/PeriodCard";
import { historyData } from "@/data/historyData";
import { useNavigate } from "react-router-dom";
import GameCard from "@/components/science/GameCard";
import InfinityCraft from "@/components/science/InfinityCraft";
import SpaceElevator from "@/components/science/SpaceElevator";
import DeepSeaExploration from "@/components/science/DeepSeaExploration";

type ActiveGameType = "infinity-craft" | "space-elevator" | "deep-sea" | null;

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState<ActiveGameType>(null);

  // Render the active game
  const renderActiveGame = () => {
    if (!activeGame) return null;

    switch (activeGame) {
      case 'infinity-craft':
        return <InfinityCraft onBack={() => setActiveGame(null)} />;
      case 'space-elevator':
        return <SpaceElevator onBack={() => setActiveGame(null)} />;
      case 'deep-sea':
        return <DeepSeaExploration onBack={() => setActiveGame(null)} />;
      default:
        return null;
    }
  };

  const featuredPeriods = historyData.slice(0, 3);
  const allPeriods = historyData.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {activeGame ? (
          renderActiveGame()
        ) : (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-full text-white w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Sparkles className="h-10 w-10" />
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                Comète
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-3"
                  onClick={() => navigate("/comete")}
                >
                  <Play className="mr-2 h-5 w-5" />
                  {t('hero.startLearning')}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 font-semibold px-8 py-3"
                  onClick={() => navigate("/news")}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  {t('hero.exploreNews')}
                </Button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">12+</div>
                  <p className="text-gray-600 dark:text-gray-300">Périodes historiques</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">50+</div>
                  <p className="text-gray-600 dark:text-gray-300">Cours interactifs</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">∞</div>
                  <p className="text-gray-600 dark:text-gray-300">Possibilités d'apprentissage</p>
                </CardContent>
              </Card>
            </div>

            {/* Jeux & Expériences Section */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  🎮 Jeux & Expériences
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Découvrez des expériences interactives uniques qui mélangent apprentissage et divertissement
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <GameCard 
                  title="Infinite Craft"
                  description="Combinez les éléments pour créer de nouveaux objets et découvrir l'univers infini des possibilités"
                  icon={<Atom className="h-6 w-6 text-white" />}
                  onClick={() => setActiveGame("infinity-craft")}
                />
                <GameCard 
                  title="Ascenseur Spatial"
                  description="Montez vers l'espace et découvrez les différentes couches de l'atmosphère terrestre"
                  icon={<Rocket className="h-6 w-6 text-white" />}
                  onClick={() => setActiveGame("space-elevator")}
                />
                <GameCard 
                  title="Exploration Abyssale"
                  description="Plongez dans les profondeurs marines et explorez les mystères des océans"
                  icon={<Anchor className="h-6 w-6 text-white" />}
                  onClick={() => setActiveGame("deep-sea")}
                />
              </div>
            </div>

            {/* Featured Periods */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t('featured.title')}
                </h2>
                <Badge variant="secondary" className="text-sm">
                  <Zap className="mr-1 h-4 w-4" />
                  {t('featured.popular')}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPeriods.map((period) => (
                  <PeriodCard key={period.id} period={period} featured />
                ))}
              </div>
            </div>

            {/* All Periods */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t('periods.allPeriods')}
                </h2>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Clock className="mr-2 h-5 w-5" />
                  <span className="text-sm">{t('periods.chronological')}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allPeriods.map((period) => (
                  <PeriodCard key={period.id} period={period} />
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {t('cta.title')}
                </CardTitle>
                <CardDescription className="text-emerald-100">
                  {t('cta.description')}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  variant="secondary" 
                  className="bg-white text-emerald-600 hover:bg-gray-100"
                  onClick={() => navigate("/comete")}
                >
                  {t('cta.button')}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
