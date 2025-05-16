
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface InternetArchivesProps {
  onBackToNews: () => void;
}

const InternetArchives = ({ onBackToNews }: InternetArchivesProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <Button 
          onClick={onBackToNews}
          variant="outline"
          className="text-sm"
        >
          {t('games.back')}
        </Button>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">{t('games.internetarchives')}</h2>
      </div>
      <Card className="border dark:border-gray-700">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <Layers size={48} className="mx-auto text-amber-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">{t('games.comingsoon')}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t('games.internetarchives.description')}</p>
            <Button onClick={onBackToNews}>
              {t('games.back')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InternetArchives;
