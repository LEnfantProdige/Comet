
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const CallToActionSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
      <CardHeader>
        <CardTitle className="text-2xl">
          {t('cta.title')}
        </CardTitle>
        <CardDescription className="text-emerald-100">
          {t('cta.description')}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button 
          variant="secondary" 
          className="bg-white text-emerald-600 hover:bg-gray-100"
          onClick={() => navigate("/comete")}
        >
          {t('cta.button')}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CallToActionSection;
