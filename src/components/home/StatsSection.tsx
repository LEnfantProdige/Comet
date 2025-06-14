
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="text-3xl font-bold text-emerald-600 mb-2">12+</div>
          <p className="text-gray-600 dark:text-gray-300">Périodes historiques</p>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="text-3xl font-bold text-emerald-600 mb-2">50+</div>
          <p className="text-gray-600 dark:text-gray-300">Cours interactifs</p>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="text-3xl font-bold text-emerald-600 mb-2">∞</div>
          <p className="text-gray-600 dark:text-gray-300">Possibilités d'apprentissage</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsSection;
