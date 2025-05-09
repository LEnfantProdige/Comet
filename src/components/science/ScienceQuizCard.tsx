
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

interface ScienceQuizCardProps {
  title: string;
  image: string;
  description: string;
}

const ScienceQuizCard = ({ title, image, description }: ScienceQuizCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="border-2 border-emerald-600/50 backdrop-blur-sm bg-black/30 h-full">
      <CardHeader>
        <CardTitle className="text-emerald-400">{title}</CardTitle>
        <CardDescription className="text-gray-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-48 relative overflow-hidden rounded-md">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-gradient-to-r from-emerald-600 to-green-700 hover:opacity-90 w-full">
          {t('start')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScienceQuizCard;
