
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from '@/hooks/useLanguage';
import { Timer, SquareX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type SudokuBoard = (number | null)[][];

// Helper to generate Sudoku puzzles
const generateSudoku = (difficulty: 'easy' | 'medium' | 'hard'): { puzzle: SudokuBoard, solution: SudokuBoard } => {
  // Create a solved Sudoku board
  const solution: SudokuBoard = Array(9).fill(null).map(() => Array(9).fill(null));
  
  // Fill diagonal boxes first (these can be filled independently)
  for (let box = 0; box < 3; box++) {
    fillBox(solution, box * 3, box * 3);
  }
  
  // Fill the rest of the board
  solveSudoku(solution);
  
  // Create puzzle by removing numbers from solution
  const puzzle: SudokuBoard = JSON.parse(JSON.stringify(solution)); // Deep copy
  
  // Remove numbers based on difficulty
  const cellsToRemove = 
    difficulty === 'easy' ? 35 : 
    difficulty === 'medium' ? 45 : 55;
  
  let count = 0;
  while (count < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== null) {
      puzzle[row][col] = null;
      count++;
    }
  }
  
  return { puzzle, solution };
};

// Fill a 3x3 box with random numbers
const fillBox = (board: SudokuBoard, startRow: number, startCol: number): void => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffleArray(nums);
  let index = 0;
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[startRow + i][startCol + j] = nums[index++];
    }
  }
};

// Shuffle array randomly
const shuffleArray = (array: number[]): void => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Check if safe to place number
const isSafe = (board: SudokuBoard, row: number, col: number, num: number): boolean => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) {
      return false;
    }
  }
  
  // Check column
  for (let y = 0; y < 9; y++) {
    if (board[y][col] === num) {
      return false;
    }
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) {
        return false;
      }
    }
  }
  
  return true;
};

// Solve the Sudoku using backtracking
const solveSudoku = (board: SudokuBoard): boolean => {
  let row = -1;
  let col = -1;
  let isEmpty = true;
  
  // Find an empty cell
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === null) {
        row = i;
        col = j;
        isEmpty = false;
        break;
      }
    }
    if (!isEmpty) {
      break;
    }
  }
  
  // No empty cell found, puzzle solved
  if (isEmpty) {
    return true;
  }
  
  // Try placing numbers 1-9
  for (let num = 1; num <= 9; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;
      
      if (solveSudoku(board)) {
        return true;
      }
      
      // If placing num doesn't lead to a solution, backtrack
      board[row][col] = null;
    }
  }
  
  return false;
};

// Validate the current board against the solution
const validateBoard = (board: SudokuBoard, solution: SudokuBoard): boolean => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== null && board[i][j] !== solution[i][j]) {
        return false;
      }
    }
  }
  return true;
};

interface SudokuProps {
  onBackToNews: () => void;
}

const Sudoku = ({ onBackToNews }: SudokuProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [board, setBoard] = useState<SudokuBoard>([]);
  const [initialBoard, setInitialBoard] = useState<SudokuBoard>([]);
  const [solution, setSolution] = useState<SudokuBoard>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Initialize game
  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);
  
  const startNewGame = () => {
    const { puzzle, solution } = generateSudoku(difficulty);
    setBoard(JSON.parse(JSON.stringify(puzzle)));
    setInitialBoard(JSON.parse(JSON.stringify(puzzle)));
    setSolution(solution);
    setTimer(0);
    setIsRunning(true);
  };
  
  const handleCellClick = (row: number, col: number) => {
    if (initialBoard[row][col] === null) {
      setSelectedCell([row, col]);
    }
  };
  
  const handleNumberInput = (num: number) => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      if (initialBoard[row][col] === null) {
        const newBoard = [...board];
        newBoard[row][col] = num;
        setBoard(newBoard);
      }
    }
  };
  
  const handleValidate = () => {
    const isValid = validateBoard(board, solution);
    
    if (isValid) {
      // Check if board is complete
      const isComplete = board.every(row => 
        row.every(cell => cell !== null)
      );
      
      if (isComplete) {
        setIsRunning(false);
        toast({
          title: t('games.sudoku.complete'),
          description: t('games.sudoku.congratulations'),
        });
      } else {
        toast({
          title: t('games.sudoku.valid'),
          description: t('games.sudoku.continue'),
        });
      }
    } else {
      toast({
        title: t('games.sudoku.invalid'),
        description: t('games.sudoku.try_again'),
        variant: "destructive"
      });
    }
  };
  
  const handleReset = () => {
    setBoard(JSON.parse(JSON.stringify(initialBoard)));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <Button 
          onClick={onBackToNews}
          variant="outline"
          className="text-sm"
        >
          {t('games.back')}
        </Button>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">{t('games.sudoku')}</h2>
        <div className="flex items-center space-x-2">
          <Timer size={16} className="text-blue-500" />
          <span className="font-mono">{formatTime(timer)}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="mb-2 text-sm font-medium">{t('games.sudoku.difficulty')}</div>
          <Select
            value={difficulty}
            onValueChange={(value) => setDifficulty(value as 'easy' | 'medium' | 'hard')}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('games.sudoku.difficulty')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">{t('games.sudoku.easy')}</SelectItem>
              <SelectItem value="medium">{t('games.sudoku.medium')}</SelectItem>
              <SelectItem value="hard">{t('games.sudoku.hard')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleValidate} className="flex-1 bg-blue-600 hover:bg-blue-700">
            {t('games.sudoku.validate')}
          </Button>
          <Button onClick={handleReset} variant="outline" className="flex-1">
            {t('games.sudoku.reset')}
          </Button>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-1 md:p-2 rounded-lg shadow-inner">
        <div className="grid grid-cols-9 gap-0.5 md:gap-1">
          {board.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`}
                className={`aspect-square flex items-center justify-center text-lg md:text-xl font-medium border cursor-pointer
                  ${rowIndex % 3 === 0 && 'border-t-2 border-t-gray-400 dark:border-t-gray-600'} 
                  ${colIndex % 3 === 0 && 'border-l-2 border-l-gray-400 dark:border-l-gray-600'}
                  ${rowIndex === 8 && 'border-b-2 border-b-gray-400 dark:border-b-gray-600'}
                  ${colIndex === 8 && 'border-r-2 border-r-gray-400 dark:border-r-gray-600'}
                  ${selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex 
                    ? 'bg-blue-100 dark:bg-blue-900/30' 
                    : initialBoard[rowIndex][colIndex] !== null 
                      ? 'bg-gray-200 dark:bg-gray-700' 
                      : 'bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }
                `}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell || ''}
              </div>
            ))
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <Button 
              key={num}
              variant="outline"
              className="h-12 text-xl font-medium"
              onClick={() => handleNumberInput(num)}
              disabled={!selectedCell}
            >
              {num}
            </Button>
          ))}
          <Button 
            variant="outline" 
            className="h-12 flex items-center justify-center"
            onClick={() => {
              if (selectedCell) {
                const [row, col] = selectedCell;
                const newBoard = [...board];
                newBoard[row][col] = null;
                setBoard(newBoard);
              }
            }}
            disabled={!selectedCell}
          >
            <SquareX size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sudoku;
