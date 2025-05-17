
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
    // News translations
    'news.title': 'Actualités',
    'news.subtitle': 'Restez informé des dernières découvertes scientifiques',
    'news.categories.all': 'Toutes',
    'news.categories.space': 'Espace',
    'news.categories.health': 'Santé',
    'news.categories.environment': 'Environnement',
    'news.categories.games': 'Jeux',
    'news.cite': 'Citer',
    'news.sourceCopied': 'Source copiée',
    // Game translations
    'games.title': 'Jeux',
    'games.subtitle': 'Exercez votre esprit avec nos jeux intellectuels',
    'games.sudoku': 'Sudoku',
    'games.sudoku.description': 'Un puzzle classique de logique numérique',
    'games.sudoku.difficulty': 'Difficulté',
    'games.sudoku.easy': 'Facile',
    'games.sudoku.medium': 'Moyen',
    'games.sudoku.hard': 'Difficile',
    'games.sudoku.validate': 'Valider',
    'games.sudoku.reset': 'Réinitialiser',
    'games.connections': 'Connexions',
    'games.connections.description': 'Regroupez les mots en catégories',
    'games.connections.instructions': 'Trouvez les groupes de quatre mots qui partagent un thème commun',
    'games.connections.submit': 'Soumettre',
    'games.connections.correct': 'Correct !',
    'games.connections.incorrect': 'Essayez encore',
    'games.crosswords': 'Mots Croisés',
    'games.crosswords.description': 'Remplissez la grille avec les bonnes réponses',
    'games.crosswords.across': 'Horizontal',
    'games.crosswords.down': 'Vertical',
    'games.crosswords.check': 'Vérifier',
    'games.crosswords.reveal': 'Révéler',
    'games.wordle': 'Motus',
    'games.wordle.description': 'Devinez le mot en six essais',
    'games.wordle.instructions': 'Chaque lettre correcte et bien placée sera verte, correcte mais mal placée en jaune',
    'games.wordle.submit': 'Essayer',
    'games.wordle.restart': 'Nouvelle partie',
    'games.back': 'Retour aux actualités',
    'games.timer': 'Chrono',
    'games.score': 'Score',
    'games.internetarchives': 'Archives Internet',
    'games.internetarchives.description': 'Explorez l\'histoire du web à travers le temps',
    'games.internetarchives.explore': 'Explorez les sites web historiques',
    'games.internetarchives.search': 'Rechercher un site...',
    'games.internetarchives.select': 'Sélectionnez une année pour explorer',
    'games.internetarchives.viewing': 'Visualisation de',
    'games.internetarchives.from': 'de',
    'games.internetarchives.other': 'Autres années',
    'games.internetarchives.visit': 'Visiter l\'archive',
    'games.internetarchives.differentsite': 'Choisir un autre site',
    'play': 'Jouer',
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
    // News translations
    'news.title': 'News',
    'news.subtitle': 'Stay informed about the latest scientific discoveries',
    'news.categories.all': 'All',
    'news.categories.space': 'Space',
    'news.categories.health': 'Health',
    'news.categories.environment': 'Environment',
    'news.categories.games': 'Games',
    'news.cite': 'Cite',
    'news.sourceCopied': 'Source copied',
    // Game translations
    'games.title': 'Games',
    'games.subtitle': 'Exercise your mind with our brain games',
    'games.sudoku': 'Sudoku',
    'games.sudoku.description': 'A classic number logic puzzle',
    'games.sudoku.difficulty': 'Difficulty',
    'games.sudoku.easy': 'Easy',
    'games.sudoku.medium': 'Medium',
    'games.sudoku.hard': 'Hard',
    'games.sudoku.validate': 'Validate',
    'games.sudoku.reset': 'Reset',
    'games.connections': 'Connections',
    'games.connections.description': 'Group words into categories',
    'games.connections.instructions': 'Find groups of four words that share a common theme',
    'games.connections.submit': 'Submit',
    'games.connections.correct': 'Correct!',
    'games.connections.incorrect': 'Try again',
    'games.crosswords': 'Crosswords',
    'games.crosswords.description': 'Fill the grid with the correct answers',
    'games.crosswords.across': 'Across',
    'games.crosswords.down': 'Down',
    'games.crosswords.check': 'Check',
    'games.crosswords.reveal': 'Reveal',
    'games.wordle': 'Wordle',
    'games.wordle.description': 'Guess the word in six tries',
    'games.wordle.instructions': 'Each correct letter in the right spot will turn green, correct letter in the wrong spot will turn yellow',
    'games.wordle.submit': 'Submit',
    'games.wordle.restart': 'New Game',
    'games.back': 'Back to news',
    'games.timer': 'Timer',
    'games.score': 'Score',
    'games.internetarchives': 'Internet Archives',
    'games.internetarchives.description': 'Explore the history of the web through time',
    'games.internetarchives.explore': 'Explore historical websites',
    'games.internetarchives.search': 'Search for a site...',
    'games.internetarchives.select': 'Select a year to explore',
    'games.internetarchives.viewing': 'Viewing',
    'games.internetarchives.from': 'from',
    'games.internetarchives.other': 'Other years',
    'games.internetarchives.visit': 'Visit archive',
    'games.internetarchives.differentsite': 'Choose another site',
    'play': 'Play',
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
    // News translations
    'news.title': 'Noticias',
    'news.subtitle': 'Mantente informado sobre los últimos descubrimientos científicos',
    'news.categories.all': 'Todas',
    'news.categories.space': 'Espacio',
    'news.categories.health': 'Salud',
    'news.categories.environment': 'Medio Ambiente',
    'news.categories.games': 'Juegos',
    'news.cite': 'Citar',
    'news.sourceCopied': 'Fuente copiada',
    // Game translations
    'games.title': 'Juegos',
    'games.subtitle': 'Ejercita tu mente con nuestros juegos intelectuales',
    'games.sudoku': 'Sudoku',
    'games.sudoku.description': 'Un clásico puzzle de lógica numérica',
    'games.sudoku.difficulty': 'Dificultad',
    'games.sudoku.easy': 'Fácil',
    'games.sudoku.medium': 'Medio',
    'games.sudoku.hard': 'Difícil',
    'games.sudoku.validate': 'Validar',
    'games.sudoku.reset': 'Reiniciar',
    'games.connections': 'Conexiones',
    'games.connections.description': 'Agrupa palabras en categorías',
    'games.connections.instructions': 'Encuentra grupos de cuatro palabras que comparten un tema común',
    'games.connections.submit': 'Enviar',
    'games.connections.correct': '¡Correcto!',
    'games.connections.incorrect': 'Inténtalo de nuevo',
    'games.crosswords': 'Crucigramas',
    'games.crosswords.description': 'Completa la cuadrícula con las respuestas correctas',
    'games.crosswords.across': 'Horizontal',
    'games.crosswords.down': 'Vertical',
    'games.crosswords.check': 'Verificar',
    'games.crosswords.reveal': 'Revelar',
    'games.wordle': 'Wordle',
    'games.wordle.description': 'Adivina la palabra en seis intentos',
    'games.wordle.instructions': 'Cada letra correcta en el lugar correcto se volverá verde, letra correcta en lugar incorrecto será amarilla',
    'games.wordle.submit': 'Enviar',
    'games.wordle.restart': 'Nuevo juego',
    'games.back': 'Volver a noticias',
    'games.timer': 'Cronómetro',
    'games.score': 'Puntuación',
    'games.internetarchives': 'Archivos de Internet',
    'games.internetarchives.description': 'Explora la historia de la web a través del tiempo',
    'games.internetarchives.explore': 'Explora sitios web históricos',
    'games.internetarchives.search': 'Buscar un sitio...',
    'games.internetarchives.select': 'Selecciona un año para explorar',
    'games.internetarchives.viewing': 'Visualizando',
    'games.internetarchives.from': 'de',
    'games.internetarchives.other': 'Otros años',
    'games.internetarchives.visit': 'Visitar archivo',
    'games.internetarchives.differentsite': 'Elegir otro sitio',
    'play': 'Jugar',
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
