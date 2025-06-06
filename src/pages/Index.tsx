
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { historicalPeriods } from "../data/historyData";
import PeriodCard from "../components/PeriodCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, BookOpen, Brain, Zap, Target } from "lucide-react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section avec Comète */}
      <header className="bg-gradient-to-br from-emerald-900 via-teal-700 to-green-700 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-emerald-400 to-teal-400 p-4 rounded-full">
              <Sparkles className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Comète
          </h1>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 transition-all duration-700 delay-300 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Plateforme d'apprentissage interactive - Histoire, Sciences, Actualités et bien plus !
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <Button 
              size="lg" 
              onClick={() => navigate("/comete")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 text-lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Commencer à apprendre
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-3 text-lg"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Explorer l'histoire
            </Button>
          </div>
        </div>
      </header>

      {/* Fonctionnalités principales */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
            Pourquoi choisir Comète ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Apprentissage Interactif</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Des leçons engageantes avec des quiz, des jeux et des défis pour rendre l'apprentissage amusant.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-gradient-to-r from-teal-500 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Progression Personnalisée</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Suivez vos progrès, gagnez de l'XP et débloquez de nouveaux contenus à votre rythme.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Multidisciplinaire</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Histoire, sciences, mathématiques, logique - tout en un seul endroit pour un apprentissage complet.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Histoire */}
      <main className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Explorez l'Histoire
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Voyagez à travers les époques et découvrez les événements qui ont façonné notre monde
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {historicalPeriods.map((period) => (
              <PeriodCard key={period.id} period={period} />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Prêt à commencer votre voyage d'apprentissage ?</h2>
          <p className="text-lg mb-8 opacity-90">
            Rejoignez des milliers d'apprenants qui explorent déjà l'univers avec Comète
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/comete")}
            className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Lancer Comète
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Index;
