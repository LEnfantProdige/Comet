
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { historicalPeriods, Course } from "../data/historyData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";

const CourseDetail = () => {
  const { periodId, courseId } = useParams<{ periodId: string; courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [periodTitle, setPeriodTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (periodId && courseId) {
      const period = historicalPeriods.find(p => p.id === periodId);
      if (period) {
        setPeriodTitle(period.title);
        const foundCourse = period.courses.find(c => c.id === courseId);
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          navigate("/not-found");
        }
      } else {
        navigate("/not-found");
      }
    }
  }, [periodId, courseId, navigate]);

  const handleStartQuiz = () => {
    if (periodId && courseId) {
      navigate(`/period/${periodId}/course/${courseId}/quiz`);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Bannière du cours */}
      <header className="bg-histoire-bordeaux text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto relative z-10">
          <Button
            onClick={() => navigate(`/period/${periodId}`)}
            variant="outline"
            className="mb-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour à {periodTitle}
          </Button>
          
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">{course.title}</h1>
          <div className="flex items-center text-sm opacity-90 mb-4">
            <BookOpen size={16} className="mr-1" />
            <span>{course.duration}</span>
          </div>
          <p className="text-lg max-w-2xl opacity-90">{course.description}</p>
        </div>
      </header>

      {/* Contenu du cours */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Contenu du cours - placeholder */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed">
              Comme les êtres humains, les civilisations naissent, grandissent, déclinent et meurent. Mais contrairement aux êtres humains, leurs réalisations peuvent survivre pendant des milliers d'années. Les pyramides d'Égypte, construites il y a 4500 ans, se dressent encore aujourd'hui, témoins silencieux d'une civilisation autrefois puissante.
            </p>
            
            <p className="text-lg leading-relaxed mt-4">
              Les mini-cours d'HistoVoyage vous permettent de plonger dans ces mondes disparus. À travers des récits vivants et des anecdotes captivantes, vous découvrirez comment nos ancêtres vivaient, ce en quoi ils croyaient, et comment leurs actions ont façonné le monde que nous connaissons aujourd'hui.
            </p>

            <div className="my-8 bg-histoire-parchemin p-6 rounded-lg border border-histoire-sepia">
              <h3 className="font-serif text-xl font-bold mb-2">Le saviez-vous ?</h3>
              <p className="italic">
                Des études archéologiques récentes suggèrent que les ouvriers qui ont construit les pyramides n'étaient pas des esclaves, mais des travailleurs qualifiés et respectés qui recevaient un salaire et des rations alimentaires généreuses.
              </p>
            </div>

            <p className="text-lg leading-relaxed">
              En explorant l'histoire, nous ne cherchons pas seulement à connaître le passé, mais aussi à mieux comprendre notre présent. Les défis auxquels nos ancêtres ont été confrontés - guerres, maladies, changements climatiques - résonnent avec nos propres défis contemporains.
            </p>
          </div>

          {/* Bouton pour commencer le quiz */}
          <div className="mt-12 text-center">
            <Button 
              onClick={handleStartQuiz} 
              size="lg"
              className="bg-histoire-bleu-royal hover:bg-histoire-bleu-royal/90 text-white"
            >
              Commencer le Quiz
            </Button>
          </div>
        </div>
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

export default CourseDetail;
