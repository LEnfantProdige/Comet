
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import GamesSection from "@/components/home/GamesSection";
import PeriodsSection from "@/components/home/PeriodsSection";
import CallToActionSection from "@/components/home/CallToActionSection";
import InfinityCraft from "@/components/science/InfinityCraft";
import SpaceElevator from "@/components/science/SpaceElevator";
import DeepSeaExploration from "@/components/science/DeepSeaExploration";
import InternetArchivesGame from "@/components/science/InternetArchivesGame";

type ActiveGameType = "infinity-craft" | "space-elevator" | "deep-sea" | "internet-archives" | null;

const Index = () => {
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
      case 'internet-archives':
        return <InternetArchivesGame onBack={() => setActiveGame(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {activeGame ? (
          renderActiveGame()
        ) : (
          <>
            <HeroSection />
            <StatsSection />
            <GamesSection setActiveGame={setActiveGame} />
            <PeriodsSection />
            <CallToActionSection />
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
