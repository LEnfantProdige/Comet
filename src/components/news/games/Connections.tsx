
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { Timer } from 'lucide-react';

// Define category types with distinct colors
type CategoryColor = 'yellow' | 'green' | 'blue' | 'purple';

interface Category {
  name: string;
  words: string[];
  color: CategoryColor;
}

interface ConnectionsProps {
  onBackToNews: () => void;
}

const CONNECTIONS_DATA = [
  {
    name: 'FRUITS',
    words: ['APPLE', 'BANANA', 'ORANGE', 'GRAPE'],
    color: 'yellow' as CategoryColor
  },
  {
    name: 'PLANETS',
    words: ['MERCURY', 'VENUS', 'EARTH', 'MARS'],
    color: 'green' as CategoryColor
  },
  {
    name: 'ELEMENTS',
    words: ['CARBON', 'OXYGEN', 'HYDROGEN', 'NITROGEN'],
    color: 'blue' as CategoryColor
  },
  {
    name: 'COLORS',
    words: ['RED', 'BLUE', 'GREEN', 'YELLOW'],
    color: 'purple' as CategoryColor
  }
];

const ALTERNATE_CONNECTIONS_DATA = [
  {
    name: 'SPORTS',
    words: ['SOCCER', 'BASKETBALL', 'TENNIS', 'GOLF'],
    color: 'yellow' as CategoryColor
  },
  {
    name: 'MUSICAL INSTRUMENTS',
    words: ['PIANO', 'VIOLIN', 'GUITAR', 'DRUMS'],
    color: 'green' as CategoryColor
  },
  {
    name: 'ANIMALS',
    words: ['LION', 'ELEPHANT', 'TIGER', 'GIRAFFE'],
    color: 'blue' as CategoryColor
  },
  {
    name: 'COUNTRIES',
    words: ['FRANCE', 'ITALY', 'SPAIN', 'GERMANY'],
    color: 'purple' as CategoryColor
  }
];

const Connections = ({ onBackToNews }: ConnectionsProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const gameContainerRef = useRef<HTMLDivElement>(null);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [foundCategories, setFoundCategories] = useState<Category[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [focusedWordIndex, setFocusedWordIndex] = useState<number | null>(null);
  
  // Initialize the game
  useEffect(() => {
    startNewGame();
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (words.length === 0) return;

      // Handle keyboard navigation with arrow keys
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setFocusedWordIndex(prev => {
          if (prev === null) return 0;
          return (prev + 1) % words.length;
        });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocusedWordIndex(prev => {
          if (prev === null) return words.length - 1;
          return (prev - 1 + words.length) % words.length;
        });
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const cols = 4; // Number of columns in the grid
        setFocusedWordIndex(prev => {
          if (prev === null) return e.key === 'ArrowDown' ? 0 : words.length - 1;
          const newIndex = prev + (e.key === 'ArrowDown' ? cols : -cols);
          if (newIndex >= 0 && newIndex < words.length) return newIndex;
          return prev;
        });
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (focusedWordIndex !== null) {
          toggleWordSelection(words[focusedWordIndex]);
        }
      } else if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        if (focusedWordIndex !== null) {
          setFocusedWordIndex(null);
          if (selectedWords.length === 4) {
            const submitButton = document.querySelector('button[data-submit="true"]');
            if (submitButton instanceof HTMLButtonElement) {
              submitButton.focus();
            }
          }
        }
      }
    };

    if (gameContainerRef.current) {
      gameContainerRef.current.addEventListener('keydown', handleKeyDown as any);
    }

    return () => {
      if (gameContainerRef.current) {
        gameContainerRef.current.removeEventListener('keydown', handleKeyDown as any);
      }
    };
  }, [words, focusedWordIndex, selectedWords]);

  const startNewGame = () => {
    // Randomly choose between the two sets of connections
    const connectionData = Math.random() > 0.5 ? CONNECTIONS_DATA : ALTERNATE_CONNECTIONS_DATA;
    setCategories(connectionData);
    
    // Shuffle all the words
    const allWords = connectionData.flatMap(cat => cat.words);
    setWords(shuffleArray([...allWords]));
    
    setSelectedWords([]);
    setFoundCategories([]);
    setMistakes(0);
    setTimer(0);
    setFocusedWordIndex(null);
  };
  
  const shuffleArray = (array: string[]): string[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  const toggleWordSelection = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      if (selectedWords.length < 4) {
        setSelectedWords([...selectedWords, word]);
      }
    }
  };
  
  const checkSelection = () => {
    if (selectedWords.length !== 4) return;
    
    // Check if the selected words form a category
    for (const category of categories) {
      const categoryWords = category.words;
      if (selectedWords.every(word => categoryWords.includes(word)) && 
          categoryWords.every(word => selectedWords.includes(word))) {
        
        // Found a category!
        setFoundCategories([...foundCategories, category]);
        setWords(words.filter(word => !selectedWords.includes(word)));
        setSelectedWords([]);
        setFocusedWordIndex(null);
        
        toast({
          title: t('games.connections.correct'),
          description: category.name
        });
        
        // Check if game is over
        if (foundCategories.length === 3) {
          // Last category found automatically
          const lastCategory = categories.find(cat => 
            !foundCategories.some(found => found.name === cat.name)
          );
          if (lastCategory) {
            setTimeout(() => {
              setFoundCategories([...foundCategories, lastCategory]);
              setWords([]);
              toast({
                title: t('games.connections.complete'),
                description: t('games.connections.congratulations')
              });
            }, 500);
          }
        }
        
        return;
      }
    }
    
    // If we got here, the selection was incorrect
    setMistakes(mistakes + 1);
    setSelectedWords([]);
    toast({
      title: t('games.connections.incorrect'),
      description: t('games.connections.try_again'),
      variant: "destructive"
    });
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div 
      className="w-full max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900"
      ref={gameContainerRef}
      tabIndex={0} // Make container focusable
    >
      <div className="flex justify-between items-center mb-6">
        <Button 
          onClick={onBackToNews}
          variant="outline"
          className="text-sm"
        >
          {t('games.back')}
        </Button>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">{t('games.connections')}</h2>
        <div className="flex items-center space-x-2">
          <Timer size={16} className="text-blue-500" />
          <span className="font-mono">{formatTime(timer)}</span>
        </div>
      </div>
      
      <div className="mb-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">{t('games.connections.instructions')}</p>
        <div className="mt-2 flex justify-center items-center space-x-2">
          <div className="text-sm font-medium">{t('games.score')}:</div>
          <div className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
            {foundCategories.length}/4
          </div>
          <div className="text-sm font-medium ml-2">{t('mistakes')}:</div>
          <div className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
            {mistakes}
          </div>
        </div>
      </div>
      
      {/* Found categories */}
      <div className="space-y-2 mb-6">
        {foundCategories.map((category, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-md text-center
              ${category.color === 'yellow' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200' : ''}
              ${category.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : ''}
              ${category.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : ''}
              ${category.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : ''}
            `}
          >
            <div className="font-bold mb-1">{category.name}</div>
            <div className="flex flex-wrap justify-center gap-2">
              {category.words.map((word, idx) => (
                <div key={idx} className="px-3 py-1 text-sm border rounded">
                  {word}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Word grid */}
      {words.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {words.map((word, index) => (
            <button
              key={index}
              className={`py-4 text-center border rounded-md transition outline-offset-2
                ${selectedWords.includes(word) 
                  ? 'bg-blue-100 dark:bg-blue-900/40 border-blue-400 dark:border-blue-600'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'}
                ${focusedWordIndex === index ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
              `}
              onClick={() => toggleWordSelection(word)}
              onFocus={() => setFocusedWordIndex(index)}
              tabIndex={0}
            >
              {word}
            </button>
          ))}
        </div>
      )}
      
      {/* Submit button */}
      {words.length > 0 && (
        <Button
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          disabled={selectedWords.length !== 4}
          onClick={checkSelection}
          data-submit="true"
        >
          {t('games.connections.submit')}
        </Button>
      )}
      
      {/* Game over - all categories found */}
      {words.length === 0 && foundCategories.length === 4 && (
        <div className="mt-8 text-center">
          <h3 className="text-xl font-bold mb-2">{t('games.connections.complete')}</h3>
          <p className="mb-4">{t('games.connections.congratulations')}</p>
          <Button onClick={startNewGame}>
            {t('games.connections.play_again')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Connections;
