
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ScienceArticleCardProps {
  title: string;
  image: string;
  description: string;
}

const ScienceArticleCard = ({ title, image, description }: ScienceArticleCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="border-2 border-emerald-600/50 backdrop-blur-sm bg-black/30 group hover:border-lime-500/70 transition-all duration-300">
      <CardHeader className="p-0">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <CardTitle className="text-white text-xl font-bold">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-gray-300">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="text-emerald-500 border-emerald-600/50 hover:bg-emerald-900/30 w-full">
          {t('explore')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScienceArticleCard;
