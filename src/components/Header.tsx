
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate("/")}
        >
          <img 
            src="/logo.png" 
            alt="HistoVoyage" 
            className="h-10 w-10" 
          />
          <h1 className="text-xl md:text-2xl font-serif font-bold text-histoire-bordeaux dark:text-histoire-or">
            {t('app.title')}
          </h1>
        </div>
        <div className="flex gap-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
