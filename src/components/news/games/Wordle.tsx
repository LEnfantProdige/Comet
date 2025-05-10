
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';

interface WordleProps {
  onBackToNews: () => void;
}

// Word lists for different languages
const WORDS = {
  en: ['APPLE', 'WORLD', 'PIANO', 'GHOST', 'LIGHT', 'OCEAN', 'DREAM', 'SPACE', 'BRAIN', 'TIGER'],
  fr: ['POMME', 'MONDE', 'PIANO', 'LIVRE', 'TEMPS', 'RÊVER', 'FLEUR', 'SOLEIL', 'PLAGE', 'ARBRE'],
  es: ['MUNDO', 'PLAYA', 'FUEGO', 'LIBRO', 'RELOJ', 'CALLE', 'NOCHE', 'VERDE', 'CIELO', 'PERRO']
};

const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

// Types for cell state
type CellState = 'empty' | 'filled' | 'correct' | 'present' | 'absent';

const Wordle = ({ onBackToNews }: WordleProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const gameContainerRef = useRef<HTMLDivElement>(null);
  
  const [targetWord, setTargetWord] = useState<string>('');
  const [attempts, setAttempts] = useState<string[]>(Array(MAX_ATTEMPTS).fill(''));
  const [currentAttempt, setCurrentAttempt] = useState<number>(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [cellStates, setCellStates] = useState<CellState[][]>(
    Array(MAX_ATTEMPTS).fill([]).map(() => Array(WORD_LENGTH).fill('empty'))
  );
  
  // Reset and setup a new game
  useEffect(() => {
    startNewGame();
  }, [language]);

  // Focus the game container for keyboard input
  useEffect(() => {
    if (gameState === 'playing' && gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  }, [gameState, gameContainerRef]);

  // Handle physical keyboard events
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      
      const key = e.key.toUpperCase();
      
      if (key === 'BACKSPACE') {
        handleKeyInput('BACKSPACE');
      } else if (key === 'ENTER') {
        handleKeyInput('ENTER');
      } else if (/^[A-Z]$/.test(key)) {
        handleKeyInput(key);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [gameState, attempts, currentAttempt]);

  const startNewGame = () => {
    // Choose language-appropriate words based on current language
    const wordList = WORDS[language] || WORDS.en;
    const newTargetWord = wordList[Math.floor(Math.random() * wordList.length)];
    
    console.log('Target word:', newTargetWord); // For testing
    
    setTargetWord(newTargetWord);
    setAttempts(Array(MAX_ATTEMPTS).fill(''));
    setCurrentAttempt(0);
    setGameState('playing');
    setCellStates(Array(MAX_ATTEMPTS).fill([]).map(() => Array(WORD_LENGTH).fill('empty')));
  };
  
  const handleKeyInput = (key: string) => {
    if (gameState !== 'playing') return;
    
    if (key === 'BACKSPACE') {
      if (attempts[currentAttempt].length > 0) {
        const newAttempts = [...attempts];
        newAttempts[currentAttempt] = attempts[currentAttempt].slice(0, -1);
        setAttempts(newAttempts);
        
        // Update cell state
        const newCellStates = [...cellStates];
        newCellStates[currentAttempt][attempts[currentAttempt].length - 1] = 'empty';
        setCellStates(newCellStates);
      }
    } else if (key === 'ENTER') {
      if (attempts[currentAttempt].length === WORD_LENGTH) {
        checkAttempt();
      } else {
        toast({
          title: t('games.wordle.word_too_short'),
          description: t('games.wordle.need_five_letters'),
          variant: "destructive"
        });
      }
    } else if (/^[A-Z]$/.test(key) && attempts[currentAttempt].length < WORD_LENGTH) {
      const newAttempts = [...attempts];
      newAttempts[currentAttempt] = attempts[currentAttempt] + key;
      setAttempts(newAttempts);
      
      // Update cell state
      const newCellStates = [...cellStates];
      newCellStates[currentAttempt][attempts[currentAttempt].length] = 'filled';
      setCellStates(newCellStates);
    }
  };
  
  const checkAttempt = () => {
    const attempt = attempts[currentAttempt];
    
    // Check if the word matches the target
    if (attempt === targetWord) {
      // Win!
      const newCellStates = [...cellStates];
      newCellStates[currentAttempt] = Array(WORD_LENGTH).fill('correct');
      setCellStates(newCellStates);
      
      setGameState('won');
      toast({
        title: t('games.wordle.correct'),
        description: t('games.wordle.congratulations')
      });
      return;
    }
    
    // Evaluate each letter
    const newCellStates = [...cellStates];
    const attemptCellStates: CellState[] = Array(WORD_LENGTH).fill('absent');
    
    // Check for correct positions first
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (attempt[i] === targetWord[i]) {
        attemptCellStates[i] = 'correct';
      }
    }
    
    // Check for present letters (in the wrong position)
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (attemptCellStates[i] !== 'correct') {
        // Count how many occurrences of this letter are left to match
        const letter = attempt[i];
        
        // Count how many of this letter exist in the target word
        const totalInTarget = targetWord.split('').filter(l => l === letter).length;
        
        // Count how many have already been marked as correct or present
        const alreadyMarked = attempt.split('')
          .filter((l, idx) => l === letter && (attemptCellStates[idx] === 'correct' || attemptCellStates[idx] === 'present'))
          .length;
        
        if (targetWord.includes(letter) && alreadyMarked < totalInTarget) {
          attemptCellStates[i] = 'present';
        }
      }
    }
    
    newCellStates[currentAttempt] = attemptCellStates;
    setCellStates(newCellStates);
    
    // Move to next attempt
    if (currentAttempt < MAX_ATTEMPTS - 1) {
      setCurrentAttempt(currentAttempt + 1);
    } else {
      // Game over - out of attempts
      setGameState('lost');
      toast({
        title: t('games.wordle.game_over'),
        description: `${t('games.wordle.word_was')} ${targetWord}`,
        variant: "destructive"
      });
    }
  };
  
  return (
    <div 
      className="w-full max-w-md mx-auto p-4 bg-white dark:bg-gray-900"
      ref={gameContainerRef}
      tabIndex={0} // Make sure the container is focusable
      onKeyDown={(e) => {
        // This is for accessibility, the main keyboard handling is in the useEffect
        e.stopPropagation();
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <Button 
          onClick={onBackToNews}
          variant="outline"
          className="text-sm"
        >
          {t('games.back')}
        </Button>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">{t('games.wordle')}</h2>
        <Button 
          onClick={startNewGame}
          variant="ghost"
          className="text-sm"
        >
          {t('games.wordle.restart')}
        </Button>
      </div>
      
      <div className="mb-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">{t('games.wordle.instructions')}</p>
      </div>
      
      {/* Game board */}
      <div className="grid gap-2 mb-6">
        {Array(MAX_ATTEMPTS).fill(null).map((_, attemptIndex) => (
          <div key={attemptIndex} className="grid grid-cols-5 gap-2">
            {Array(WORD_LENGTH).fill(null).map((_, letterIndex) => {
              const letter = attempts[attemptIndex][letterIndex] || '';
              const state = cellStates[attemptIndex][letterIndex];
              
              return (
                <div
                  key={letterIndex}
                  className={`
                    w-full aspect-square flex items-center justify-center text-2xl font-bold border-2 transition-all
                    ${state === 'empty' ? 'border-gray-300 dark:border-gray-700' : ''}
                    ${state === 'filled' ? 'border-gray-400 dark:border-gray-500' : ''}
                    ${state === 'correct' ? 'bg-green-500 dark:bg-green-600 border-green-500 dark:border-green-600 text-white' : ''}
                    ${state === 'present' ? 'bg-yellow-500 dark:bg-yellow-600 border-yellow-500 dark:border-yellow-600 text-white' : ''}
                    ${state === 'absent' ? 'bg-gray-400 dark:bg-gray-700 border-gray-400 dark:border-gray-700 text-white' : ''}
                  `}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Keyboard */}
      <div className="space-y-2">
        {[
          ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
          ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
          ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
        ].map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map(key => {
              // Determine key state (color) based on previous attempts
              let keyState: 'absent' | 'present' | 'correct' | null = null;
              
              for (let i = 0; i <= currentAttempt; i++) {
                const attempt = attempts[i];
                for (let j = 0; j < attempt.length; j++) {
                  if (attempt[j] === key) {
                    const cellState = cellStates[i][j];
                    if (cellState === 'correct') {
                      keyState = 'correct';
                    } else if (cellState === 'present' && keyState !== 'correct') {
                      keyState = 'present';
                    } else if (cellState === 'absent' && !keyState) {
                      keyState = 'absent';
                    }
                  }
                }
              }

              return (
                <Button
                  key={key}
                  variant="outline"
                  className={`
                    ${key === 'ENTER' || key === 'BACKSPACE' ? 'text-xs px-2 py-6' : 'text-sm p-2 aspect-square'}
                    ${keyState === 'correct' ? 'bg-green-500 dark:bg-green-600 border-green-500 dark:border-green-600 text-white hover:bg-green-600' : ''}
                    ${keyState === 'present' ? 'bg-yellow-500 dark:bg-yellow-600 border-yellow-500 dark:border-yellow-600 text-white hover:bg-yellow-600' : ''}
                    ${keyState === 'absent' ? 'bg-gray-400 dark:bg-gray-700 border-gray-400 dark:border-gray-700 text-white hover:bg-gray-500' : ''}
                  `}
                  onClick={() => handleKeyInput(key)}
                  disabled={gameState !== 'playing'}
                >
                  {key === 'BACKSPACE' ? '←' : key}
                </Button>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Game over message */}
      {gameState !== 'playing' && (
        <div className="mt-6 p-4 text-center border rounded-md bg-gray-100 dark:bg-gray-800">
          <h3 className="text-xl font-bold mb-2">
            {gameState === 'won' ? t('games.wordle.you_won') : t('games.wordle.you_lost')}
          </h3>
          <p className="mb-4">
            {gameState === 'lost' && `${t('games.wordle.word_was')} ${targetWord}`}
          </p>
          <Button onClick={startNewGame}>
            {t('games.wordle.play_again')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Wordle;
