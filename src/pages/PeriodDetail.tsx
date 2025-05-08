
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { historicalPeriods, Period } from "../data/historyData";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const PeriodDetail = () => {
  const { periodId } = useParams<{ periodId: string }>();
  const [period, setPeriod] = useState<Period | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (periodId) {
      const foundPeriod = historicalPeriods.find(p => p.id === periodId);
      if (foundPeriod) {
        setPeriod(foundPeriod);
      } else {
        navigate("/not-found");
      }
    }
  }, [periodId, navigate]);

  if (!period) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Bannière de la période */}
      <header className="bg-histoire-bleu-royal text-white dark:bg-gray-900 py-12 px-4 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center" 
          style={{ backgroundImage: `url(${period.image})` }}
        />
        <div className="container mx-auto relative z-10">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="mb-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> {t('back')}
          </Button>
          
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">{period.title}</h1>
          <div className="text-lg mb-4 opacity-90">{period.startYear} - {period.endYear}</div>
          <p className="text-lg max-w-2xl opacity-90">{period.description}</p>
        </div>
      </header>

      {/* Section des cours */}
      <main className="container mx-auto px-4 py-12">
        <h2 className="font-serif text-3xl font-bold mb-8">{t('period.courses')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {period.courses.map((course) => (
            <CourseCard key={course.id} course={course} periodId={period.id} />
          ))}
        </div>

        {/* Section chronologie */}
        <section className="mt-16">
          <h2 className="font-serif text-3xl font-bold mb-8">{t('period.timeline')}</h2>
          <div className="relative h-4 bg-histoire-sepia dark:bg-gray-700 rounded-full mb-12">
            <div className="h-full bg-histoire-bordeaux dark:bg-histoire-or rounded-full" style={{ width: "35%" }}></div>
            <div className="absolute -top-10 left-[35%] transform -translate-x-1/2">
              <div className="w-6 h-6 rounded-full bg-histoire-bordeaux dark:bg-histoire-or mx-auto"></div>
              <div className="text-center mt-2 font-medium">{period.startYear}</div>
            </div>
            <div className="absolute -top-10 right-0">
              <div className="w-6 h-6 rounded-full bg-histoire-bleu-royal dark:bg-gray-500 mx-auto"></div>
              <div className="text-center mt-2 font-medium">{period.endYear}</div>
            </div>
          </div>
        </section>
      </main>

      {/* Pied de page */}
      <Footer />
    </div>
  );
};

export default PeriodDetail;
