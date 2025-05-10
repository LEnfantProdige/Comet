
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';

interface CrosswordsProps {
  onBackToNews: () => void;
}

interface Clue {
  number: number;
  text: string;
  answer: string;
  startRow: number;
  startCol: number;
  direction: 'across' | 'down';
}

interface Cell {
  letter: string;
  number: number | null;
  correctLetter: string;
  revealed: boolean;
}

// Simple crossword puzzle data
const PUZZLES = {
  en: {
    size: 5,
    grid: [
      ['1', '2', '3', '4', '5'],
      ['6', ' ', ' ', ' ', ' '],
      ['7', '8', ' ', ' ', ' '],
      ['9', ' ', ' ', '10', ' '],
      ['11', ' ', ' ', ' ', ' ']
    ],
    across: [
      { number: 1, text: 'Capital of France', answer: 'PARIS' },
      { number: 6, text: 'To make a mistake', answer: 'ERR' },
      { number: 7, text: 'Opposite of yes', answer: 'NO' },
      { number: 9, text: 'Large body of water', answer: 'SEA' },
      { number: 11, text: 'State of being happy', answer: 'JOY' }
    ],
    down: [
      { number: 1, text: 'Writing instrument', answer: 'PEN' },
      { number: 2, text: 'Opposite of off', answer: 'ON' },
      { number: 3, text: 'First person pronoun', answer: 'I' },
      { number: 4, text: 'Finish line', answer: 'END' },
      { number: 5, text: 'To look at words', answer: 'READ' },
      { number: 8, text: 'Number after seven', answer: 'EIGHT' },
      { number: 10, text: 'Metal element symbol Au', answer: 'AU' }
    ]
  },
  fr: {
    size: 5,
    grid: [
      ['1', '2', '3', '4', '5'],
      ['6', ' ', ' ', ' ', ' '],
      ['7', '8', ' ', ' ', ' '],
      ['9', ' ', ' ', '10', ' '],
      ['11', ' ', ' ', ' ', ' ']
    ],
    across: [
      { number: 1, text: 'Capitale de la France', answer: 'PARIS' },
      { number: 6, text: 'Faire une erreur', answer: 'ERR' },
      { number: 7, text: 'Contraire de oui', answer: 'NON' },
      { number: 9, text: 'Grande étendue d\'eau', answer: 'MER' },
      { number: 11, text: 'État de bonheur', answer: 'JOIE' }
    ],
    down: [
      { number: 1, text: 'Instrument d\'écriture', answer: 'STYLO' },
      { number: 2, text: 'Contraire de éteint', answer: 'ON' },
      { number: 3, text: 'Pronom première personne', answer: 'JE' },
      { number: 4, text: 'Ligne d\'arrivée', answer: 'FIN' },
      { number: 5, text: 'Regarder des mots', answer: 'LIRE' },
      { number: 8, text: 'Chiffre après sept', answer: 'HUIT' },
      { number: 10, text: 'Symbole de l\'élément or', answer: 'OR' }
    ]
  },
  es: {
    size: 5,
    grid: [
      ['1', '2', '3', '4', '5'],
      ['6', ' ', ' ', ' ', ' '],
      ['7', '8', ' ', ' ', ' '],
      ['9', ' ', ' ', '10', ' '],
      ['11', ' ', ' ', ' ', ' ']
    ],
    across: [
      { number: 1, text: 'Capital de Francia', answer: 'PARIS' },
      { number: 6, text: 'Cometer un error', answer: 'ERR' },
      { number: 7, text: 'Contrario de sí', answer: 'NO' },
      { number: 9, text: 'Gran masa de agua', answer: 'MAR' },
      { number: 11, text: 'Estado de felicidad', answer: 'GOZO' }
    ],
    down: [
      { number: 1, text: 'Instrumento de escritura', answer: 'PLUMA' },
      { number: 2, text: 'Contrario de apagado', answer: 'ON' },
      { number: 3, text: 'Pronombre primera persona', answer: 'YO' },
      { number: 4, text: 'Línea de meta', answer: 'FIN' },
      { number: 5, text: 'Mirar palabras', answer: 'LEER' },
      { number: 8, text: 'Número después del siete', answer: 'OCHO' },
      { number: 10, text: 'Símbolo del elemento oro', answer: 'AU' }
    ]
  }
};

const Crosswords = ({ onBackToNews }: CrosswordsProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [acrossClues, setAcrossClues] = useState<Clue[]>([]);
  const [downClues, setDownClues] = useState<Clue[]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [isComplete, setIsComplete] = useState(false);
  
  // Initialize the puzzle
  useEffect(() => {
    const puzzleData = PUZZLES[language as keyof typeof PUZZLES] || PUZZLES.en;
    initializePuzzle(puzzleData);
  }, [language]);
  
  const initializePuzzle = (puzzleData: typeof PUZZLES.en) => {
    const size = puzzleData.size;
    const templateGrid = puzzleData.grid;
    
    // Create empty grid
    const newGrid: Cell[][] = Array(size).fill(null).map(() => 
      Array(size).fill(null).map(() => ({ letter: '', number: null, correctLetter: '', revealed: false }))
    );
    
    // Process across clues
    const newAcrossClues = puzzleData.across.map(clue => {
      // Find position in the grid based on clue number
      let startRow = -1;
      let startCol = -1;
      
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (templateGrid[i][j] === clue.number.toString()) {
            startRow = i;
            startCol = j;
            break;
          }
        }
        if (startRow !== -1) break;
      }
      
      // Update grid with correct letters
      for (let i = 0; i < clue.answer.length; i++) {
        newGrid[startRow][startCol + i].correctLetter = clue.answer[i];
      }
      
      // Add cell number
      newGrid[startRow][startCol].number = clue.number;
      
      return {
        ...clue,
        startRow,
        startCol,
        direction: 'across' as const
      };
    });
    
    // Process down clues
    const newDownClues = puzzleData.down.map(clue => {
      // Find position in the grid based on clue number
      let startRow = -1;
      let startCol = -1;
      
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (templateGrid[i][j] === clue.number.toString()) {
            startRow = i;
            startCol = j;
            break;
          }
        }
        if (startRow !== -1) break;
      }
      
      // Update grid with correct letters
      for (let i = 0; i < clue.answer.length; i++) {
        if (startRow + i < size) {
          newGrid[startRow + i][startCol].correctLetter = clue.answer[i];
        }
      }
      
      // Add cell number (if not already added)
      if (newGrid[startRow][startCol].number === null) {
        newGrid[startRow][startCol].number = clue.number;
      }
      
      return {
        ...clue,
        startRow,
        startCol,
        direction: 'down' as const
      };
    });
    
    // Mark empty cells (cells with no correct letter)
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (newGrid[i][j].correctLetter === '') {
          newGrid[i][j] = { letter: '#', number: null, correctLetter: '#', revealed: true };
        }
      }
    }
    
    setGrid(newGrid);
    setAcrossClues(newAcrossClues);
    setDownClues(newDownClues);
    setIsComplete(false);
    setSelectedCell(null);
  };
  
  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col].correctLetter === '#') return;
    
    if (selectedCell && selectedCell[0] === row && selectedCell[1] === col) {
      // Toggle direction when clicking the same cell
      setDirection(direction === 'across' ? 'down' : 'across');
    } else {
      setSelectedCell([row, col]);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selectedCell) return;
    
    const [row, col] = selectedCell;
    
    if (/^[A-Za-z]$/.test(e.key)) {
      // Enter letter
      const newGrid = [...grid];
      newGrid[row][col].letter = e.key.toUpperCase();
      setGrid(newGrid);
      
      // Move to next cell
      moveToNextCell();
      
      // Check if puzzle is complete
      checkPuzzleComplete();
    } else if (e.key === 'Backspace') {
      // Clear current cell and move back
      const newGrid = [...grid];
      newGrid[row][col].letter = '';
      setGrid(newGrid);
      moveToPrevCell();
    } else if (e.key === 'ArrowRight') {
      setDirection('across');
      moveSelectedCell(0, 1);
    } else if (e.key === 'ArrowLeft') {
      setDirection('across');
      moveSelectedCell(0, -1);
    } else if (e.key === 'ArrowDown') {
      setDirection('down');
      moveSelectedCell(1, 0);
    } else if (e.key === 'ArrowUp') {
      setDirection('down');
      moveSelectedCell(-1, 0);
    }
  };
  
  const moveSelectedCell = (rowDelta: number, colDelta: number) => {
    if (!selectedCell) return;
    
    const [currentRow, currentCol] = selectedCell;
    const newRow = currentRow + rowDelta;
    const newCol = currentCol + colDelta;
    
    if (
      newRow >= 0 && newRow < grid.length &&
      newCol >= 0 && newCol < grid[0].length &&
      grid[newRow][newCol].correctLetter !== '#'
    ) {
      setSelectedCell([newRow, newCol]);
    }
  };
  
  const moveToNextCell = () => {
    if (!selectedCell) return;
    
    const [row, col] = selectedCell;
    if (direction === 'across') {
      moveSelectedCell(0, 1);
    } else {
      moveSelectedCell(1, 0);
    }
  };
  
  const moveToPrevCell = () => {
    if (!selectedCell) return;
    
    const [row, col] = selectedCell;
    if (direction === 'across') {
      moveSelectedCell(0, -1);
    } else {
      moveSelectedCell(-1, 0);
    }
  };
  
  const checkPuzzleComplete = () => {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const cell = grid[row][col];
        if (cell.correctLetter !== '#' && cell.letter !== cell.correctLetter) {
          return false;
        }
      }
    }
    
    setIsComplete(true);
    toast({
      title: t('games.crosswords.complete'),
      description: t('games.crosswords.congratulations')
    });
    
    return true;
  };
  
  const handleCheck = () => {
    let incorrect = 0;
    
    const newGrid = [...grid];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const cell = newGrid[row][col];
        if (cell.correctLetter !== '#' && cell.letter !== '' && cell.letter !== cell.correctLetter) {
          incorrect++;
          cell.letter = '';
        }
      }
    }
    
    setGrid(newGrid);
    
    if (incorrect > 0) {
      toast({
        title: t('games.crosswords.incorrect'),
        description: `${incorrect} ${t('games.crosswords.incorrect_entries')}`,
        variant: "destructive"
      });
    } else {
      toast({
        title: t('games.crosswords.all_correct'),
        description: t('games.crosswords.keep_going')
      });
    }
  };
  
  const handleReveal = () => {
    const newGrid = [...grid];
    
    if (selectedCell) {
      const [row, col] = selectedCell;
      newGrid[row][col].letter = newGrid[row][col].correctLetter;
      newGrid[row][col].revealed = true;
    }
    
    setGrid(newGrid);
    checkPuzzleComplete();
  };
  
  const handleRevealAll = () => {
    const newGrid = [...grid];
    
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (newGrid[row][col].correctLetter !== '#') {
          newGrid[row][col].letter = newGrid[row][col].correctLetter;
          newGrid[row][col].revealed = true;
        }
      }
    }
    
    setGrid(newGrid);
    setIsComplete(true);
    
    toast({
      title: t('games.crosswords.solution_revealed'),
      description: t('games.crosswords.try_another')
    });
  };
  
  const renderClueList = (clues: Clue[], title: string) => (
    <div className="mb-6">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="space-y-1">
        {clues.map((clue) => (
          <div 
            key={clue.number}
            className={`text-sm p-2 rounded cursor-pointer
              ${selectedCell && 
                ((direction === 'across' && clue.direction === 'across' && 
                  selectedCell[0] === clue.startRow && selectedCell[1] >= clue.startCol && 
                  selectedCell[1] < clue.startCol + clue.answer.length) ||
                (direction === 'down' && clue.direction === 'down' && 
                  selectedCell[1] === clue.startCol && selectedCell[0] >= clue.startRow && 
                  selectedCell[0] < clue.startRow + clue.answer.length))
                ? 'bg-blue-100 dark:bg-blue-900/20 font-medium'
                : ''
              }
            `}
            onClick={() => {
              setDirection(clue.direction);
              setSelectedCell([clue.startRow, clue.startCol]);
            }}
          >
            <span className="font-medium">{clue.number}.</span> {clue.text}
          </div>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={onBackToNews} variant="outline" className="text-sm">
          {t('games.back')}
        </Button>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          {t('games.crosswords')}
        </h2>
        <Button variant="ghost" className="invisible">
          {/* Placeholder for alignment */}
          {t('games.back')}
        </Button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Crossword grid */}
        <div className="flex flex-col items-center">
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4" 
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <div className="grid" style={{ gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))` }}>
              {grid.map((row, rowIndex) => (
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      w-10 h-10 md:w-12 md:h-12 border border-gray-300 dark:border-gray-700 flex items-center justify-center relative
                      ${cell.correctLetter === '#' ? 'bg-gray-900 dark:bg-gray-950' : 'bg-white dark:bg-gray-800'}
                      ${selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex
                        ? 'bg-blue-200 dark:bg-blue-900/40 border-blue-500 dark:border-blue-400'
                        : ''}
                      ${selectedCell && ((
                        direction === 'across' && selectedCell[0] === rowIndex && 
                        acrossClues.some(c => c.startRow === rowIndex && colIndex >= c.startCol && colIndex < c.startCol + c.answer.length)
                      ) || (
                        direction === 'down' && selectedCell[1] === colIndex &&
                        downClues.some(c => c.startCol === colIndex && rowIndex >= c.startRow && rowIndex < c.startRow + c.answer.length)
                      ))
                        ? 'bg-blue-100 dark:bg-blue-900/20'
                        : ''}
                      ${isComplete && cell.correctLetter !== '#' ? 'bg-green-100 dark:bg-green-900/20' : ''}
                    `}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {cell.correctLetter !== '#' && (
                      <>
                        {cell.number && (
                          <span className="absolute top-0.5 left-1 text-xs font-medium">
                            {cell.number}
                          </span>
                        )}
                        <span className={`text-lg font-medium ${cell.revealed ? 'text-gray-400 dark:text-gray-500' : ''}`}>
                          {cell.letter}
                        </span>
                      </>
                    )}
                  </div>
                ))
              ))}
            </div>
          </div>
          
          {/* Control buttons */}
          <div className="flex gap-2 mb-4">
            <Button onClick={handleCheck} variant="outline" size="sm">
              {t('games.crosswords.check')}
            </Button>
            <Button onClick={handleReveal} variant="outline" size="sm">
              {t('games.crosswords.reveal_letter')}
            </Button>
            <Button onClick={handleRevealAll} variant="outline" size="sm" className="text-red-500 dark:text-red-400">
              {t('games.crosswords.reveal_all')}
            </Button>
          </div>
        </div>
        
        {/* Clue lists */}
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col md:flex-row md:gap-6">
            <div className="flex-1">
              {renderClueList(acrossClues, t('games.crosswords.across'))}
            </div>
            <div className="flex-1">
              {renderClueList(downClues, t('games.crosswords.down'))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crosswords;
