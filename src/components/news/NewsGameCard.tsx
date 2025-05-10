
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NewsGameCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  comingSoon?: boolean;
  onClick?: () => void;
}

const NewsGameCard = ({ title, icon, description, comingSoon = false, onClick }: NewsGameCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card 
      className="border bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={!comingSoon ? onClick : undefined}
    >
      <div className="h-28 relative bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
        <div className="text-4xl text-blue-600 dark:text-blue-400">
          {icon}
        </div>
        {comingSoon && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
            {t('science.comingsoon')}
          </div>
        )}
      </div>
      <CardHeader className="py-3">
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-0 pb-4">
        <Button 
          variant={comingSoon ? "outline" : "default"} 
          disabled={comingSoon}
          onClick={(e) => {
            e.stopPropagation();
            if (onClick && !comingSoon) onClick();
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          {t('play')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsGameCard;
