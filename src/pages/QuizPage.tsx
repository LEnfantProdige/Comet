
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { historicalPeriods, Question } from "../data/historyData";
import QuizQuestion from "../components/QuizQuestion";
import ProgressBar from "../components/ProgressBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const QuizPage = () => {
  const { periodId, courseId } = useParams<{ periodId: string; courseId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (periodId && courseId) {
      const period = historicalPeriods.find(p => p.id === periodId);
      if (period) {
        const course = period.courses.find(c => c.id === courseId);
        if (course && course.quiz) {
          setQuestions(course.quiz.questions);
          setCourseTitle(course.title);
        } else {
          navigate("/not-found");
        }
      } else {
        navigate("/not-found");
      }
    }
  }, [periodId, courseId, navigate]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      toast({
        title: "Bonne réponse !",
        description: "Continuez comme ça !",
        duration: 2000,
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizCompleted(true);
      
      // Afficher un message de félicitation basé sur le score
      const percentage = (score / questions.length) * 100;
      let message;
      
      if (percentage >= 80) {
        message = "Excellent ! Vous maîtrisez ce sujet !";
      } else if (percentage >= 60) {
        message = "Bien joué ! Vous avez de bonnes connaissances.";
      } else {
        message = "Continuez à apprendre ! Vous pouvez retenter le quiz.";
      }
      
      toast({
        title: `Quiz terminé ! Score: ${score}/${questions.length}`,
        description: message,
        duration: 5000,
      });
    }
  };

  const handleReturnToCourse = () => {
    navigate(`/period/${periodId}/course/${courseId}`);
  };

  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête du quiz */}
      <header className="bg-histoire-bleu-royal text-white py-8 px-4">
        <div className="container mx-auto">
          <Button
            onClick={handleReturnToCourse}
            variant="outline"
            className="mb-4 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour au cours
          </Button>
          
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">Quiz: {courseTitle}</h1>
        </div>
      </header>

      {/* Contenu du quiz */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {!quizCompleted ? (
            <>
              <div className="mb-8">
                <ProgressBar 
                  value={currentQuestionIndex + 1} 
                  max={questions.length} 
                  label="Progression"
                />
              </div>
              
              <QuizQuestion 
                question={questions[currentQuestionIndex]} 
                onAnswer={handleAnswer}
              />
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} sur {questions.length}
                </div>
                <Button 
                  onClick={handleNextQuestion} 
                  className="bg-histoire-bordeaux hover:bg-histoire-bordeaux/90 text-white"
                >
                  {currentQuestionIndex < questions.length - 1 ? "Question suivante" : "Terminer le quiz"}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <div className="mb-8">
                <div className="w-24 h-24 bg-histoire-or rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="h-12 w-12 text-black" />
                </div>
                <h2 className="text-3xl font-serif font-bold mb-2">Quiz terminé !</h2>
                <p className="text-xl mb-4">Votre score: {score}/{questions.length}</p>
                <div className="w-full max-w-md mx-auto mb-8">
                  <ProgressBar 
                    value={score} 
                    max={questions.length}
                  />
                </div>
                <p className="text-lg mb-8">
                  {score === questions.length
                    ? "Parfait ! Vous avez répondu correctement à toutes les questions !"
                    : score >= questions.length / 2
                    ? "Bien joué ! Vous avez de bonnes connaissances sur ce sujet."
                    : "Continuez à apprendre ! Vous pourrez ensuite retenter le quiz."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleRetryQuiz} 
                  className="bg-histoire-bleu-royal hover:bg-histoire-bleu-royal/90 text-white"
                >
                  Retenter le quiz
                </Button>
                <Button 
                  onClick={handleReturnToCourse} 
                  variant="outline"
                >
                  Retour au cours
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Pied de page */}
      <footer className="bg-histoire-bleu-royal text-white py-6 px-4 mt-auto">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-serif text-xl mb-2">HistoVoyage</h2>
            <p className="text-xs opacity-80">© 2025 HistoVoyage - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuizPage;
