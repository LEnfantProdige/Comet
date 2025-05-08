
export interface Period {
  id: string;
  title: string;
  description: string;
  startYear: string;
  endYear: string;
  image: string;
  courses: Course[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  image: string;
  content?: string;
  quiz: Quiz;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  type: 'mcq' | 'true-false' | 'fill-in-blank';
  question: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
}

// Données d'exemple pour notre plateforme
export const historicalPeriods: Period[] = [
  {
    id: "ancient",
    title: "Antiquité",
    description: "Découvrez les civilisations fondatrices qui ont façonné notre monde moderne, de l'Égypte à Rome.",
    startYear: "3000 av. J.-C.",
    endYear: "476 ap. J.-C.",
    image: "/placeholder.svg",
    courses: [
      {
        id: "egypt",
        title: "L'Égypte des Pharaons",
        description: "Plongez dans le mystère des pyramides et la vie quotidienne au bord du Nil.",
        duration: "8 min",
        image: "/placeholder.svg",
        content: "L'Égypte ancienne est l'une des plus anciennes civilisations au monde...",
        quiz: {
          id: "egypt-quiz",
          title: "Quiz sur l'Égypte ancienne",
          questions: [
            {
              id: "q1",
              type: "mcq",
              question: "Quelle est la fonction principale des pyramides égyptiennes?",
              options: [
                "Observatoires astronomiques",
                "Tombeaux pour les pharaons",
                "Centres administratifs",
                "Temples religieux"
              ],
              correctAnswer: "Tombeaux pour les pharaons",
              explanation: "Les pyramides étaient principalement des tombeaux construits pour les pharaons et leurs consorts. Elles étaient destinées à protéger le corps du pharaon et à faciliter son passage vers l'au-delà."
            },
            {
              id: "q2",
              type: "true-false",
              question: "Le Sphinx de Gizeh a été construit avant les pyramides.",
              correctAnswer: false,
              explanation: "Le Sphinx de Gizeh a été construit après les pyramides, durant le règne du pharaon Khéphren (environ 2500 avant J.-C.)."
            }
          ]
        }
      }
    ]
  },
  {
    id: "medieval",
    title: "Moyen Âge",
    description: "Explorez mille ans d'histoire européenne entre chevaliers, châteaux forts et cathédrales.",
    startYear: "476",
    endYear: "1492",
    image: "/placeholder.svg",
    courses: [
      {
        id: "crusades",
        title: "Les Croisades",
        description: "L'épopée des expéditions militaires chrétiennes vers la Terre Sainte.",
        duration: "7 min",
        image: "/placeholder.svg",
        quiz: {
          id: "crusades-quiz",
          title: "Quiz sur les Croisades",
          questions: [
            {
              id: "q1",
              type: "mcq",
              question: "Combien de croisades majeures ont été lancées entre 1095 et 1291?",
              options: [
                "Quatre",
                "Six",
                "Huit",
                "Dix"
              ],
              correctAnswer: "Huit",
              explanation: "Historiquement, on compte huit croisades principales lancées entre 1095 et 1291, bien que certains historiens comptent différemment selon les critères utilisés."
            }
          ]
        }
      }
    ]
  },
  {
    id: "renaissance",
    title: "Renaissance",
    description: "Immergez-vous dans une période d'innovation artistique, scientifique et philosophique sans précédent.",
    startYear: "XIV° siècle",
    endYear: "XVI° siècle",
    image: "/placeholder.svg",
    courses: [
      {
        id: "artists",
        title: "Les Grands Maîtres",
        description: "Léonard, Michel-Ange, Raphaël: découvrez les génies qui ont révolutionné l'art.",
        duration: "6 min",
        image: "/placeholder.svg",
        quiz: {
          id: "artists-quiz",
          title: "Quiz sur les Grands Maîtres",
          questions: [
            {
              id: "q1",
              type: "mcq",
              question: "Quelle célèbre fresque Léonard de Vinci a-t-il peinte à Milan?",
              options: [
                "La Création d'Adam",
                "L'École d'Athènes",
                "La Cène",
                "Le Jugement Dernier"
              ],
              correctAnswer: "La Cène",
              explanation: "Léonard de Vinci a peint La Cène (Il Cenacolo) entre 1495 et 1498 sur un mur du réfectoire du couvent dominicain de Santa Maria delle Grazie à Milan."
            }
          ]
        }
      }
    ]
  },
  {
    id: "modern",
    title: "Époque Moderne",
    description: "Des révolutions à l'industrialisation, suivez les transformations radicales de notre monde.",
    startYear: "1492",
    endYear: "1914",
    image: "/placeholder.svg",
    courses: [
      {
        id: "french-revolution",
        title: "Révolution Française",
        description: "La chute de l'Ancien Régime et la naissance de la République.",
        duration: "10 min",
        image: "/placeholder.svg",
        quiz: {
          id: "french-revolution-quiz",
          title: "Quiz sur la Révolution Française",
          questions: [
            {
              id: "q1",
              type: "mcq",
              question: "Quel événement marque le début de la Révolution française?",
              options: [
                "La prise de la Bastille",
                "Le serment du Jeu de paume",
                "La convocation des États généraux",
                "L'exécution de Louis XVI"
              ],
              correctAnswer: "La prise de la Bastille",
              explanation: "Bien que la convocation des États généraux en mai 1789 et le serment du Jeu de paume en juin soient des événements importants, la prise de la Bastille le 14 juillet 1789 est traditionnellement considérée comme le début symbolique de la Révolution française."
            }
          ]
        }
      }
    ]
  },
  {
    id: "contemporary",
    title: "Époque Contemporaine",
    description: "Des guerres mondiales à la mondialisation, comprendre les forces qui ont façonné notre présent.",
    startYear: "1914",
    endYear: "Aujourd'hui",
    image: "/placeholder.svg",
    courses: [
      {
        id: "world-wars",
        title: "Les Guerres Mondiales",
        description: "Les deux conflits qui ont redessiné les frontières et changé le cours de l'histoire.",
        duration: "9 min",
        image: "/placeholder.svg",
        quiz: {
          id: "world-wars-quiz",
          title: "Quiz sur les Guerres Mondiales",
          questions: [
            {
              id: "q1",
              type: "mcq",
              question: "Quel événement a déclenché la Première Guerre mondiale?",
              options: [
                "L'invasion de la Pologne",
                "L'assassinat de l'archiduc François-Ferdinand",
                "La crise de Suez",
                "Le krach boursier de 1929"
              ],
              correctAnswer: "L'assassinat de l'archiduc François-Ferdinand",
              explanation: "L'assassinat de l'archiduc François-Ferdinand, héritier du trône austro-hongrois, à Sarajevo le 28 juin 1914, a déclenché une série d'événements qui ont conduit à la Première Guerre mondiale."
            }
          ]
        }
      }
    ]
  }
];
