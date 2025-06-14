
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
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
  );
};

export default HeroSection;
