
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
}

const ProgressBar = ({ value, max, label }: ProgressBarProps) => {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1 text-sm">
          <span>{label}</span>
          <span className="text-muted-foreground">{value}/{max}</span>
        </div>
      )}
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

export default ProgressBar;
