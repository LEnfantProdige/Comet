
import { useNavigate } from "react-router-dom";
import { Period } from "../data/historyData";
import { Button } from "@/components/ui/button";

interface PeriodCardProps {
  period: Period;
}

const PeriodCard = ({ period }: PeriodCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/period/${period.id}`);
  };

  return (
    <div className="periode-card">
      <div className="periode-card-header">
        <img 
          src={period.image} 
          alt={period.title} 
          className="periode-card-image"
        />
        <div className="periode-card-overlay">
          <h3 className="periode-card-title">{period.title}</h3>
        </div>
      </div>
      <div className="periode-card-content">
        <div className="text-xs font-medium text-muted-foreground mb-2">
          {period.startYear} - {period.endYear}
        </div>
        <p className="text-sm mb-4 flex-grow">{period.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-xs font-medium text-muted-foreground">
            {period.courses.length} cours
          </div>
          <Button 
            onClick={handleClick}
            className="bg-histoire-bordeaux hover:bg-histoire-bordeaux/90 text-white"
          >
            Explorer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PeriodCard;
