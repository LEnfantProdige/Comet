
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
    'feedback.correct': 'Bien joué ! C\'est la bonne réponse.',
    'feedback.incorrect': 'Je comprends votre réponse, mais ce n\'est pas tout à fait ça.',
    'footer.rights': '© 2025 HistoVoyage - Tous droits réservés',
    'science': 'Sciences',
    'science.title': 'Explorez les Sciences',
    'science.subtitle': 'Découvrez les merveilles de la science et de l\'innovation',
    'science.articles': 'Articles',
    'science.quizzes': 'Quiz Scientifiques',
    'science.games': 'Jeux Interactifs',
    'science.space': 'Ascenseur Spatial',
    'science.deepsea': 'Exploration des Abysses',
    'science.infinitycraft': 'Infinity Craft',
    'science.comingsoon': 'Bientôt disponible',
    'science.autopilot.start': 'Mode automatique',
    'science.autopilot.stop': 'Arrêter',
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
    'feedback.correct': 'Well done! That\'s the correct answer.',
    'feedback.incorrect': 'I understand your reasoning, but that\'s not quite right.',
    'footer.rights': '© 2025 HistoryJourney - All rights reserved',
    'science': 'Science',
    'science.title': 'Explore Science',
    'science.subtitle': 'Discover the wonders of science and innovation',
    'science.articles': 'Articles',
    'science.quizzes': 'Science Quizzes',
    'science.games': 'Interactive Games',
    'science.space': 'Space Elevator',
    'science.deepsea': 'Deep Sea Exploration',
    'science.infinitycraft': 'Infinity Craft',
    'science.comingsoon': 'Coming Soon',
    'science.autopilot.start': 'Auto Mode',
    'science.autopilot.stop': 'Stop',
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
    'feedback.correct': '¡Bien hecho! Esa es la respuesta correcta.',
    'feedback.incorrect': 'Entiendo tu razonamiento, pero no es del todo correcto.',
    'footer.rights': '© 2025 ViajeHistórico - Todos los derechos reservados',
    'science': 'Ciencias',
    'science.title': 'Explora las Ciencias',
    'science.subtitle': 'Descubre las maravillas de la ciencia y la innovación',
    'science.articles': 'Artículos',
    'science.quizzes': 'Cuestionarios Científicos',
    'science.games': 'Juegos Interactivos',
    'science.space': 'Elevador Espacial',
    'science.deepsea': 'Exploración de las Profundidades',
    'science.infinitycraft': 'Infinity Craft',
    'science.comingsoon': 'Próximamente',
    'science.autopilot.start': 'Modo automático',
    'science.autopilot.stop': 'Detener',
  },
};

// Create the context with undefined as default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define the provider as a proper React functional component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Récupérer la langue depuis localStorage ou utiliser la langue du navigateur
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'fr' || savedLang === 'en' || savedLang === 'es') {
      return savedLang as Language;
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

// Hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
