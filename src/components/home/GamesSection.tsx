
import React from "react";
import GameCard from "@/components/science/GameCard";
import { Atom, Rocket, Anchor, Archive } from "lucide-react";

type ActiveGameType = "infinity-craft" | "space-elevator" | "deep-sea" | "internet-archives" | null;

interface GamesSectionProps {
  setActiveGame: (game: ActiveGameType) => void;
}

const GamesSection = ({ setActiveGame }: GamesSectionProps) => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🎮 Jeux & Expériences
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Découvrez des expériences interactives uniques qui mélangent apprentissage et divertissement
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <GameCard 
          title="Archives Internet"
          description="Voyagez dans le temps et explorez l'évolution du web depuis ses débuts"
          icon={<Archive className="h-6 w-6 text-white" />}
          onClick={() => setActiveGame("internet-archives")}
        />
      </div>
    </div>
  );
};

export default GamesSection;
