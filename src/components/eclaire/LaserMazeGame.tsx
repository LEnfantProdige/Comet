
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RotateCw, Play, RefreshCw } from "lucide-react";

interface LaserMazeGameProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

type CellType = 'empty' | 'laser' | 'target' | 'mirror' | 'wall';
type Direction = 'up' | 'down' | 'left' | 'right';

interface Cell {
  type: CellType;
  rotation?: number;
  hasBeam?: boolean;
}

const LaserMazeGame = ({ onBack, onComplete }: LaserMazeGameProps) => {
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [selectedMirror, setSelectedMirror] = useState<{row: number, col: number} | null>(null);

  const levels = [
    {
      name: "Premier rayon",
      grid: [
        [{ type: 'laser' as CellType }, { type: 'empty' as CellType }, { type: 'empty' as CellType }, { type: 'target' as CellType }],
        [{ type: 'empty' as CellType }, { type: 'wall' as CellType }, { type: 'empty' as CellType }, { type: 'empty' as CellType }],
        [{ type: 'empty' as CellType }, { type: 'mirror' as CellType, rotation: 45 }, { type: 'empty' as CellType }, { type: 'empty' as CellType }],
        [{ type: 'empty' as CellType }, { type: 'empty' as CellType }, { type: 'empty' as CellType }, { type: 'empty' as CellType }]
      ]
    },
    {
      name: "Double réflexion",
      grid: [
        [{ type: 'laser' as CellType }, { type: 'empty' as CellType }, { type: 'empty' as CellType }, { type: 'empty' as CellType }, { type: 'target' as CellType }],
        [{ type: 'empty' as CellType }, { type: 'mirror' as CellType, rotation: 45 }, { type: 'empty' as CellType }, { type: 'mirror' as CellType, rotation: 135 }, { type: 'empty' as CellType }],
        [{ type: 'empty' as CellType }, { type: 'empty' as CellType }, { type: 'wall' as CellType }, { type: 'empty' as CellType }, { type: 'empty' as CellType }],
        [{ type: 'empty' as CellType }, { type: 'empty' as CellType }, { type: 'empty' as CellType }, { type: 'empty' as CellType }, { type: 'empty' as CellType }],
        [{ type: 'empty' as CellType }, { type: 'empty' as CellType }, { type: 'empty' as CellType }, { type: 'empty' as CellType }, { type: 'empty' as CellType }]
      ]
    }
  ];

  React.useEffect(() => {
    initializeLevel();
  }, [level]);

  const initializeLevel = () => {
    const currentLevel = levels[level - 1];
    setGrid(currentLevel.grid.map(row => row.map(cell => ({ ...cell, hasBeam: false }))));
    setIsPlaying(false);
  };

  const rotateMirror = useCallback((row: number, col: number) => {
    setGrid(prev => {
      const newGrid = [...prev];
      if (newGrid[row][col].type === 'mirror') {
        newGrid[row][col] = {
          ...newGrid[row][col],
          rotation: ((newGrid[row][col].rotation || 0) + 45) % 180
        };
      }
      return newGrid;
    });
  }, []);

  const simulateLaser = useCallback(() => {
    const newGrid = grid.map(row => row.map(cell => ({ ...cell, hasBeam: false })));
    
    // Find laser position
    let laserRow = 0, laserCol = 0;
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        if (newGrid[i][j].type === 'laser') {
          laserRow = i;
          laserCol = j;
          break;
        }
      }
    }

    // Simulate beam
    let currentRow = laserRow;
    let currentCol = laserCol;
    let direction: Direction = 'right';
    let steps = 0;
    const maxSteps = 100; // Prevent infinite loops

    while (steps < maxSteps) {
      newGrid[currentRow][currentCol].hasBeam = true;

      // Calculate next position
      let nextRow = currentRow;
      let nextCol = currentCol;

      switch (direction) {
        case 'right': nextCol++; break;
        case 'left': nextCol--; break;
        case 'down': nextRow++; break;
        case 'up': nextRow--; break;
      }

      // Check bounds
      if (nextRow < 0 || nextRow >= newGrid.length || nextCol < 0 || nextCol >= newGrid[0].length) {
        break;
      }

      const nextCell = newGrid[nextRow][nextCol];

      // Check for wall
      if (nextCell.type === 'wall') {
        break;
      }

      // Check for target
      if (nextCell.type === 'target') {
        newGrid[nextRow][nextCol].hasBeam = true;
        setGrid(newGrid);
        setTimeout(() => {
          alert('Niveau réussi ! 🎉');
          if (level < levels.length) {
            setLevel(level + 1);
          } else {
            onComplete(50);
          }
        }, 500);
        return;
      }

      // Check for mirror
      if (nextCell.type === 'mirror') {
        const rotation = nextCell.rotation || 45;
        
        // Simple reflection logic based on direction and mirror angle
        if (rotation === 45) {
          switch (direction) {
            case 'right': direction = 'down'; break;
            case 'left': direction = 'up'; break;
            case 'down': direction = 'right'; break;
            case 'up': direction = 'left'; break;
          }
        } else if (rotation === 135) {
          switch (direction) {
            case 'right': direction = 'up'; break;
            case 'left': direction = 'down'; break;
            case 'down': direction = 'left'; break;
            case 'up': direction = 'right'; break;
          }
        }
      }

      currentRow = nextRow;
      currentCol = nextCol;
      steps++;
    }

    setGrid(newGrid);
  }, [grid, level, onComplete]);

  const playLevel = () => {
    setIsPlaying(true);
    simulateLaser();
  };

  const resetLevel = () => {
    initializeLevel();
  };

  const renderCell = (cell: Cell, row: number, col: number) => {
    let content = '';
    let bgColor = 'bg-gray-100 dark:bg-gray-800';
    let textColor = 'text-gray-600';

    switch (cell.type) {
      case 'laser':
        content = '🔴';
        bgColor = 'bg-red-100 dark:bg-red-900/30';
        break;
      case 'target':
        content = '🎯';
        bgColor = 'bg-green-100 dark:bg-green-900/30';
        break;
      case 'mirror':
        content = '🪞';
        bgColor = 'bg-blue-100 dark:bg-blue-900/30 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50';
        break;
      case 'wall':
        content = '⬛';
        bgColor = 'bg-gray-400 dark:bg-gray-600';
        break;
      default:
        content = '';
    }

    if (cell.hasBeam) {
      bgColor += ' ring-2 ring-red-400 ring-opacity-60';
    }

    return (
      <div
        key={`${row}-${col}`}
        className={`w-12 h-12 border border-gray-300 dark:border-gray-600 flex items-center justify-center text-xl ${bgColor} ${textColor} transition-all`}
        onClick={() => cell.type === 'mirror' && rotateMirror(row, col)}
        style={cell.type === 'mirror' ? { transform: `rotate(${cell.rotation || 45}deg)` } : {}}
      >
        {content}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-emerald-900 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="bg-emerald-500 p-3 rounded-full text-white">
            <span className="text-2xl">🔬</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Labyrinthe Laser</h1>
            <p className="text-gray-600 dark:text-gray-300">Utilise les miroirs pour diriger le laser vers la cible</p>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Niveau {level}: {levels[level - 1]?.name}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetLevel}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button onClick={playLevel} className="bg-emerald-500 hover:bg-emerald-600">
                  <Play className="h-4 w-4 mr-2" />
                  Lancer le laser
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 4}, 1fr)` }}>
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))
                )}
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  💡 Clique sur les miroirs pour les faire tourner
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>🔴 Laser</span>
                  <span>🎯 Cible</span>
                  <span>🪞 Miroir</span>
                  <span>⬛ Mur</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaserMazeGame;
