
import { useState } from "react";
import { Question } from "../data/historyData";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface QuizQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizQuestion = ({ question, onAnswer }: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

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
            Vrai
          </button>
          <button
            className={getOptionClassName("false")}
            onClick={() => handleOptionClick("false")}
          >
            Faux
          </button>
        </div>
      )}

      {isAnswered ? (
        <div className="bg-muted p-4 rounded-lg mt-4">
          <h4 className="font-medium mb-2">Explication</h4>
          <p className="text-sm">{question.explanation}</p>
        </div>
      ) : (
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedAnswer}
          className="mt-4 bg-histoire-bordeaux hover:bg-histoire-bordeaux/90 text-white"
        >
          Vérifier
        </Button>
      )}
    </div>
  );
};

export default QuizQuestion;
