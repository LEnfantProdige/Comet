
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Atom, FlaskConical as Flask, TestTube, Microscope, Rocket } from "lucide-react";

// Custom green-punk theme styles
const greenPunkGradient = "bg-gradient-to-br from-green-900 via-emerald-700 to-teal-700";

// Import des composants personnalisés pour la section Science
import ScienceArticleCard from "@/components/science/ScienceArticleCard";
import GameCard from "@/components/science/GameCard";
import ScienceQuizCard from "@/components/science/ScienceQuizCard";
import SpaceElevator from "@/components/science/SpaceElevator";
import DeepSeaExploration from "@/components/science/DeepSeaExploration";
import InfinityCraft from "@/components/science/InfinityCraft";

const Science = () => {
  const { t } = useLanguage();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Sample articles data
  const articles = [
    {
      title: "La Fusion Nucléaire",
      image: "https://images.unsplash.com/photo-1581093804475-577d72e14cc7?auto=format&fit=crop&w=800",
      description: "Les dernières avancées en matière de fusion nucléaire et comment cette technologie pourrait révolutionner notre production d'énergie."
    },
    {
      title: "Biologie Synthétique",
      image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=800",
      description: "Comment la biologie synthétique transforme la médecine moderne et ouvre de nouvelles possibilités de traitement."
    },
    {
      title: "L'Intelligence Artificielle",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800",
      description: "L'évolution rapide de l'IA et son impact sur notre société et notre avenir collectif."
    }
  ];

  // Rendu du jeu actif ou des onglets
  if (activeGame === "space-elevator") {
    return (
      <div className={`min-h-screen ${greenPunkGradient} py-12 px-4 md:px-8`}>
        <div className="container mx-auto">
          <SpaceElevator onBack={() => setActiveGame(null)} />
        </div>
      </div>
    );
  }

  if (activeGame === "deep-sea") {
    return (
      <div className={`min-h-screen ${greenPunkGradient} py-12 px-4 md:px-8`}>
        <div className="container mx-auto">
          <DeepSeaExploration onBack={() => setActiveGame(null)} />
        </div>
      </div>
    );
  }

  if (activeGame === "infinity-craft") {
    return (
      <div className={`min-h-screen ${greenPunkGradient} py-12 px-4 md:px-8`}>
        <div className="container mx-auto">
          <InfinityCraft onBack={() => setActiveGame(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${greenPunkGradient} py-12 px-4 md:px-8`}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-emerald-400 font-serif mb-3">
            {t('science.title')}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t('science.subtitle')}
          </p>
        </div>

        <Tabs defaultValue="articles" className="w-full max-w-5xl mx-auto">
          <TabsList className="w-full bg-black/40 border border-emerald-600/30 mb-8">
            <TabsTrigger value="articles" className="flex-1 data-[state=active]:bg-emerald-900/70">
              <Flask className="mr-2 h-4 w-4" />
              {t('science.articles')}
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex-1 data-[state=active]:bg-emerald-900/70">
              <TestTube className="mr-2 h-4 w-4" />
              {t('science.quizzes')}
            </TabsTrigger>
            <TabsTrigger value="games" className="flex-1 data-[state=active]:bg-emerald-900/70">
              <Microscope className="mr-2 h-4 w-4" />
              {t('science.games')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <ScienceArticleCard 
                  key={index} 
                  title={article.title} 
                  image={article.image} 
                  description={article.description} 
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScienceQuizCard
                title="Quiz sur l'Espace"
                description="Testez vos connaissances sur notre univers et les découvertes récentes"
                image="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800"
              />
              <ScienceQuizCard
                title="Quiz sur la Biologie"
                description="Explorez les mystères du corps humain et des écosystèmes"
                image="https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=800"
              />
            </div>
          </TabsContent>

          <TabsContent value="games" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GameCard 
                title={t('science.space')} 
                icon={<Rocket className="text-white" />}
                description="Construisez votre propre ascenseur spatial et voyez jusqu'où vous pouvez aller dans l'espace."
                onClick={() => setActiveGame("space-elevator")}
              />
              <GameCard 
                title={t('science.deepsea')} 
                icon={<TestTube className="text-white" />}
                description="Explorez les mystères des abysses et découvrez des créatures étranges et merveilleuses."
                onClick={() => setActiveGame("deep-sea")}
              />
              <GameCard 
                title={t('science.infinitycraft')} 
                icon={<Atom className="text-white" />}
                description="Combinez des éléments pour créer de nouvelles découvertes scientifiques dans ce jeu inspiré par l'alchimie."
                onClick={() => setActiveGame("infinity-craft")}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Science;
