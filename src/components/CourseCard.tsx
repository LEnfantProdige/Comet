
import { useNavigate } from "react-router-dom";
import { Course } from "../data/historyData";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface CourseCardProps {
  course: Course;
  periodId: string;
}

const CourseCard = ({ course, periodId }: CourseCardProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleClick = () => {
    navigate(`/period/${periodId}/course/${course.id}`);
  };

  return (
    <div className="histoire-card">
      <div className="relative h-40 rounded-t-lg overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-serif text-xl font-medium mb-2">{course.title}</h3>
        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <Clock size={14} className="mr-1" />
          <span>{course.duration}</span>
        </div>
        <p className="text-sm mb-4">{course.description}</p>
        <Button 
          onClick={handleClick} 
          className="w-full bg-histoire-bleu-royal hover:bg-histoire-bleu-royal/90 text-white dark:bg-histoire-or dark:text-gray-900 dark:hover:bg-histoire-or/90"
        >
          {t('start')}
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
