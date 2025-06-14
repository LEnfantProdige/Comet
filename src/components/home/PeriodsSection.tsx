
import React from "react";
import { Badge } from "@/components/ui/badge";
import PeriodCard from "@/components/PeriodCard";
import { Zap, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { historicalPeriods } from "@/data/historyData";

const PeriodsSection = () => {
  const { t } = useLanguage();
  const featuredPeriods = historicalPeriods.slice(0, 3);
  const allPeriods = historicalPeriods.slice(3);

  return (
    <>
      {/* Featured Periods */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('featured.title')}
          </h2>
          <Badge variant="secondary" className="text-sm">
            <Zap className="mr-1 h-4 w-4" />
            {t('featured.popular')}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPeriods.map((period) => (
            <PeriodCard key={period.id} period={period} />
          ))}
        </div>
      </div>

      {/* All Periods */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('periods.allPeriods')}
          </h2>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Clock className="mr-2 h-5 w-5" />
            <span className="text-sm">{t('periods.chronological')}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPeriods.map((period) => (
            <PeriodCard key={period.id} period={period} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PeriodsSection;
