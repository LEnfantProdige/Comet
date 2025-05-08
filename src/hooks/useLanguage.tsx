
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en' | 'es';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  fr: {
    'app.title': 'HistoVoyage',
    'home.title': 'Voyagez à travers le temps',
    'home.subtitle': 'Découvrez les moments clés qui ont façonné notre monde',
    'explore': 'Explorer',
    'courses': 'cours',
    'period.courses': 'Cours disponibles',
    'period.timeline': 'Chronologie',
    'back': 'Retour',
    'check': 'Vérifier',
    'start': 'Commencer',
    'true': 'Vrai',
    'false': 'Faux',
    'explanation': 'Explication',
    'footer.rights': '© 2025 HistoVoyage - Tous droits réservés',
  },
  en: {
    'app.title': 'HistoryJourney',
    'home.title': 'Travel Through Time',
    'home.subtitle': 'Discover the key moments that shaped our world',
    'explore': 'Explore',
    'courses': 'courses',
    'period.courses': 'Available Courses',
    'period.timeline': 'Timeline',
    'back': 'Back',
    'check': 'Check',
    'start': 'Start',
    'true': 'True',
    'false': 'False',
    'explanation': 'Explanation',
    'footer.rights': '© 2025 HistoryJourney - All rights reserved',
  },
  es: {
    'app.title': 'ViajeHistórico',
    'home.title': 'Viaja a través del tiempo',
    'home.subtitle': 'Descubre los momentos clave que formaron nuestro mundo',
    'explore': 'Explorar',
    'courses': 'cursos',
    'period.courses': 'Cursos disponibles',
    'period.timeline': 'Cronología',
    'back': 'Volver',
    'check': 'Verificar',
    'start': 'Comenzar',
    'true': 'Verdadero',
    'false': 'Falso',
    'explanation': 'Explicación',
    'footer.rights': '© 2025 ViajeHistórico - Todos los derechos reservados',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Récupérer la langue depuis localStorage ou utiliser la langue du navigateur
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'fr' || savedLang === 'en' || savedLang === 'es') {
      return savedLang;
    }
    
    const browserLang = navigator.language.substring(0, 2);
    if (browserLang === 'fr' || browserLang === 'en' || browserLang === 'es') {
      return browserLang as Language;
    }
    
    return 'fr'; // Langue par défaut
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
