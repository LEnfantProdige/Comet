
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GameCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  comingSoon?: boolean;
  onClick?: () => void;
}

const GameCard = ({ title, icon, description, comingSoon = false, onClick }: GameCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="border-2 border-emerald-600/50 backdrop-blur-sm bg-black/30 hover:border-lime-500/70 transition-all duration-300">
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="bg-gradient-to-r from-lime-500 to-emerald-500 p-2 rounded-lg">
          {icon}
        </div>
        <div>
          <CardTitle className="text-lg text-emerald-400">{title}</CardTitle>
          {comingSoon && (
            <CardDescription className="text-amber-500">
              {t('science.comingsoon')}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-300">{description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant={comingSoon ? "outline" : "default"} 
          disabled={comingSoon}
          className={!comingSoon ? "bg-gradient-to-r from-emerald-600 to-green-700 hover:opacity-90 w-full" : "w-full"}
          onClick={onClick}
        >
          {t('explore')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
