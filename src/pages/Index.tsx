
import { useState, useEffect } from "react";
import { historicalPeriods } from "../data/historyData";
import PeriodCard from "../components/PeriodCard";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Effet de chargement pour l'animation
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Bannière héro */}
      <header className="bg-histoire-bordeaux text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto relative z-10">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            HistoVoyage
          </h1>
          <p className={`text-xl md:text-2xl max-w-2xl transition-all duration-700 delay-300 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Voyagez à travers le temps et explorez l'histoire de façon ludique et interactive
          </p>
        </div>
      </header>

      {/* Section principale avec les périodes historiques */}
      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="font-serif text-3xl font-bold mb-8 text-center">Périodes Historiques</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {historicalPeriods.map((period) => (
              <PeriodCard key={period.id} period={period} />
            ))}
          </div>
        </section>

        {/* Section de fonctionnalités */}
        <section className="py-12 bg-histoire-parchemin rounded-lg p-8">
          <h2 className="font-serif text-3xl font-bold mb-8 text-center">Pourquoi HistoVoyage?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-histoire-bleu-royal w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Mini-cours Concis</h3>
              <p className="text-sm">Des leçons de 5 à 10 minutes, parfaites pour apprendre à votre rythme.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-histoire-bordeaux w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Quiz Interactifs</h3>
              <p className="text-sm">Testez vos connaissances avec des quiz variés et gagnez des badges.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-histoire-or w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-black">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Progression Personnalisée</h3>
              <p className="text-sm">Suivez votre progression et apprenez à votre rythme.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Pied de page */}
      <footer className="bg-histoire-bleu-royal text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-serif text-2xl mb-4">HistoVoyage</h2>
            <p className="text-sm opacity-80">© 2025 HistoVoyage - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
