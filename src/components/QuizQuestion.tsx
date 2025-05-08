
import { useState } from "react";
import { Question } from "../data/historyData";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface QuizQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizQuestion = ({ question, onAnswer }: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const { t } = useLanguage();

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || isAnswered) return;
    
    const isCorrect = selectedAnswer === question.correctAnswer;
    setIsAnswered(true);
    onAnswer(isCorrect);
  };

  const getOptionClassName = (option: string) => {
    if (!isAnswered) {
      return selectedAnswer === option ? "quiz-option-selected" : "quiz-option-default";
    }
    
    if (option === question.correctAnswer) {
      return "quiz-option-correct";
    }
    
    if (selectedAnswer === option && option !== question.correctAnswer) {
      return "quiz-option-incorrect";
    }
    
    return "quiz-option-default opacity-50";
  };

  // Générer un feedback personnalisé basé sur la réponse
  const getFeedback = () => {
    if (!isAnswered || !selectedAnswer) return null;
    
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    if (isCorrect) {
      // Feedback positif personnalisé
      const correctFeedbacks = [
        `Bien joué ! ${question.correctAnswer} est en effet la bonne réponse.`,
        `Excellent ! Vous avez trouvé la réponse correcte.`,
        `Bravo, c'est exact !`
      ];
      return correctFeedbacks[Math.floor(Math.random() * correctFeedbacks.length)];
    } else {
      // Feedback constructif pour réponse incorrecte
      const incorrectFeedbacks = [
        `Je comprends votre raisonnement avec "${selectedAnswer}", mais la réponse correcte était "${question.correctAnswer}".`,
        `Pas tout à fait. La bonne réponse était "${question.correctAnswer}".`,
        `Votre réponse mérite réflexion, mais historiquement, "${question.correctAnswer}" est la réponse correcte.`
      ];
      return incorrectFeedbacks[Math.floor(Math.random() * incorrectFeedbacks.length)];
    }
  };

  return (
    <div className="space-y-4 mb-8 animate-fade-in">
      <h3 className="text-xl font-serif mb-4">{question.question}</h3>
      
      {question.type === "mcq" && question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={getOptionClassName(option)}
              onClick={() => handleOptionClick(option)}
            >
              <div className="flex items-center">
                <div className="flex-grow">{option}</div>
                {isAnswered && option === question.correctAnswer && (
                  <Check className="text-green-600" size={20} />
                )}
                {isAnswered && selectedAnswer === option && option !== question.correctAnswer && (
                  <X className="text-red-600" size={20} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {question.type === "true-false" && (
        <div className="flex space-x-4">
          <button
            className={getOptionClassName("true")}
            onClick={() => handleOptionClick("true")}
          >
            {t('true')}
          </button>
          <button
            className={getOptionClassName("false")}
            onClick={() => handleOptionClick("false")}
          >
            {t('false')}
          </button>
        </div>
      )}

      {isAnswered ? (
        <div className="space-y-4 mt-4">
          {/* Affichage du feedback personnalisé */}
          <div className={`p-4 rounded-lg ${selectedAnswer === question.correctAnswer ? 'bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'}`}>
            <p className="text-sm font-medium">{getFeedback()}</p>
          </div>
          
          {/* Explication détaillée */}
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">{t('explanation')}</h4>
            <p className="text-sm">{question.explanation}</p>
          </div>
        </div>
      ) : (
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedAnswer}
          className="mt-4 bg-histoire-bordeaux hover:bg-histoire-bordeaux/90 text-white dark:bg-histoire-or dark:text-gray-900 dark:hover:bg-histoire-or/90"
        >
          {t('check')}
        </Button>
      )}
    </div>
  );
};

export default QuizQuestion;
