import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Play, 
  RotateCcw, 
  BookOpen, 
  Target, 
  Trophy, 
  Clock, 
  Brain,
  Zap,
  Star,
  Crown,
  Lightbulb,
  Gamepad2
} from "lucide-react";

interface ChessGameProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
type PieceColor = 'white' | 'black';

interface ChessPiece {
  type: PieceType;
  color: PieceColor;
}

interface Position {
  row: number;
  col: number;
}

interface Move {
  from: Position;
  to: Position;
  piece: ChessPiece;
  captured?: ChessPiece;
  notation: string;
}

const ChessGame: React.FC<ChessGameProps> = ({ onBack, onComplete }) => {
  const [activeTab, setActiveTab] = useState('game');
  const [board, setBoard] = useState<(ChessPiece | null)[][]>([]);
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white');
  const [moves, setMoves] = useState<Move[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'white-wins' | 'black-wins' | 'draw'>('playing');
  const [aiDifficulty, setAiDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [playerRating, setPlayerRating] = useState(1200);
  const [gameMode, setGameMode] = useState<'training' | 'ai' | 'puzzle'>('training');
  const [currentLesson, setCurrentLesson] = useState(0);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedLessonComponent, setSelectedLessonComponent] = useState<string | null>(null);

  const handleLessonComplete = (xp: number) => {
    setScore(prev => prev + xp);
    onComplete(xp);
    setSelectedLessonComponent(null);
  };

  const pieceSymbols: Record<PieceType, Record<PieceColor, string>> = {
    king: { white: '♔', black: '♚' },
    queen: { white: '♕', black: '♛' },
    rook: { white: '♖', black: '♜' },
    bishop: { white: '♗', black: '♝' },
    knight: { white: '♘', black: '♞' },
    pawn: { white: '♙', black: '♟' }
  };

  const lessons = [
    {
      title: "Les pièces et leurs mouvements",
      description: "Apprenez comment chaque pièce se déplace",
      completed: false,
      xp: 20,
      component: 'piece-movement'
    },
    {
      title: "Les règles spéciales",
      description: "Roque, prise en passant, promotion",
      completed: false,
      xp: 25,
      component: 'special-rules'
    },
    {
      title: "Tactiques de base",
      description: "Fourchette, clouage, découverte",
      completed: false,
      xp: 30,
      component: 'tactics'
    },
    {
      title: "Mat en 1 coup",
      description: "Reconnaître les mats simples",
      completed: false,
      xp: 35,
      component: 'mate-in-one'
    },
    {
      title: "Fins de partie",
      description: "Tours et dames vs roi nu",
      completed: false,
      xp: 40,
      component: 'endgames'
    }
  ];

  const puzzles = [
    {
      title: "Mat en 2 coups",
      description: "Trouvez le mat en 2 coups pour les blancs",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1",
      solution: ["Bxf7+", "Ke7", "Nd5#"],
      xp: 50
    },
    {
      title: "Tactique de fourchette",
      description: "Gagnez du matériel avec une fourchette",
      fen: "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1",
      solution: ["exd5"],
      xp: 30
    }
  ];

  const initializeBoard = useCallback(() => {
    const newBoard: (ChessPiece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Place pawns
    for (let col = 0; col < 8; col++) {
      newBoard[1][col] = { type: 'pawn', color: 'black' };
      newBoard[6][col] = { type: 'pawn', color: 'white' };
    }
    
    // Place other pieces
    const pieceOrder: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    for (let col = 0; col < 8; col++) {
      newBoard[0][col] = { type: pieceOrder[col], color: 'black' };
      newBoard[7][col] = { type: pieceOrder[col], color: 'white' };
    }
    
    setBoard(newBoard);
    setCurrentPlayer('white');
    setMoves([]);
    setGameStatus('playing');
    setSelectedSquare(null);
  }, []);

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  const isValidMove = (from: Position, to: Position, piece: ChessPiece): boolean => {
    const dx = Math.abs(to.row - from.row);
    const dy = Math.abs(to.col - from.col);
    
    // Basic validation - simplified chess rules
    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        
        if (dy === 0) { // Moving forward
          if (to.row === from.row + direction && !board[to.row][to.col]) return true;
          if (from.row === startRow && to.row === from.row + 2 * direction && !board[to.row][to.col]) return true;
        } else if (dy === 1 && to.row === from.row + direction) { // Diagonal capture
          return board[to.row][to.col] !== null && board[to.row][to.col]?.color !== piece.color;
        }
        return false;
        
      case 'rook':
        return (dx === 0 || dy === 0) && isPathClear(from, to);
        
      case 'bishop':
        return dx === dy && isPathClear(from, to);
        
      case 'queen':
        return (dx === 0 || dy === 0 || dx === dy) && isPathClear(from, to);
        
      case 'knight':
        return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
        
      case 'king':
        return dx <= 1 && dy <= 1;
        
      default:
        return false;
    }
  };

  const isPathClear = (from: Position, to: Position): boolean => {
    const dx = Math.sign(to.row - from.row);
    const dy = Math.sign(to.col - from.col);
    
    let currentRow = from.row + dx;
    let currentCol = from.col + dy;
    
    while (currentRow !== to.row || currentCol !== to.col) {
      if (board[currentRow][currentCol] !== null) return false;
      currentRow += dx;
      currentCol += dy;
    }
    
    return true;
  };

  const makeMove = (from: Position, to: Position) => {
    const piece = board[from.row][from.col];
    if (!piece || piece.color !== currentPlayer) return false;
    
    if (!isValidMove(from, to, piece)) return false;
    
    const targetPiece = board[to.row][to.col];
    if (targetPiece && targetPiece.color === piece.color) return false;
    
    const newBoard = board.map(row => [...row]);
    newBoard[to.row][to.col] = piece;
    newBoard[from.row][from.col] = null;
    
    const move: Move = {
      from,
      to,
      piece,
      captured: targetPiece || undefined,
      notation: `${piece.type}${String.fromCharCode(97 + to.col)}${8 - to.row}`
    };
    
    setBoard(newBoard);
    setMoves(prev => [...prev, move]);
    setCurrentPlayer(prev => prev === 'white' ? 'black' : 'white');
    setSelectedSquare(null);
    
    // Update score
    if (targetPiece) {
      const pieceValues = { pawn: 1, knight: 3, bishop: 3, rook: 5, queen: 9, king: 0 };
      setScore(prev => prev + pieceValues[targetPiece.type] * 10);
    }
    
    return true;
  };

  const handleSquareClick = (row: number, col: number) => {
    if (gameMode === 'puzzle') return; // Puzzles need specific solutions
    
    const clickedPiece = board[row][col];
    
    if (selectedSquare) {
      if (selectedSquare.row === row && selectedSquare.col === col) {
        setSelectedSquare(null);
      } else {
        const moveSuccessful = makeMove(selectedSquare, { row, col });
        if (!moveSuccessful) {
          if (clickedPiece && clickedPiece.color === currentPlayer) {
            setSelectedSquare({ row, col });
          } else {
            setSelectedSquare(null);
          }
        }
      }
    } else if (clickedPiece && clickedPiece.color === currentPlayer) {
      setSelectedSquare({ row, col });
    }
  };

  const makeAiMove = useCallback(() => {
    if (currentPlayer !== 'black' || gameMode !== 'ai') return;
    
    // Simple AI: make a random valid move
    const possibleMoves: { from: Position; to: Position }[] = [];
    
    for (let fromRow = 0; fromRow < 8; fromRow++) {
      for (let fromCol = 0; fromCol < 8; fromCol++) {
        const piece = board[fromRow][fromCol];
        if (piece && piece.color === 'black') {
          for (let toRow = 0; toRow < 8; toRow++) {
            for (let toCol = 0; toCol < 8; toCol++) {
              if (isValidMove({ row: fromRow, col: fromCol }, { row: toRow, col: toCol }, piece)) {
                const targetPiece = board[toRow][toCol];
                if (!targetPiece || targetPiece.color !== piece.color) {
                  possibleMoves.push({ from: { row: fromRow, col: fromCol }, to: { row: toRow, col: toCol } });
                }
              }
            }
          }
        }
      }
    }
    
    if (possibleMoves.length > 0) {
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      setTimeout(() => {
        makeMove(randomMove.from, randomMove.to);
      }, 1000);
    }
  }, [currentPlayer, gameMode, board]);

  useEffect(() => {
    if (gameMode === 'ai') {
      makeAiMove();
    }
  }, [currentPlayer, makeAiMove, gameMode]);

  const completeLesson = (lessonIndex: number) => {
    const lesson = lessons[lessonIndex];
    setScore(prev => prev + lesson.xp);
    onComplete(lesson.xp);
  };

  const startLesson = (component: string) => {
    setSelectedLessonComponent(component);
  };

  // Handle lesson component rendering
  if (selectedLessonComponent === 'piece-movement') {
    const PieceMovementLesson = require('./chess/PieceMovementLesson').default;
    return <PieceMovementLesson onBack={() => setSelectedLessonComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (selectedLessonComponent === 'special-rules') {
    const SpecialRulesLesson = require('./chess/SpecialRulesLesson').default;
    return <SpecialRulesLesson onBack={() => setSelectedLessonComponent(null)} onComplete={handleLessonComplete} />;
  }

  if (selectedLessonComponent === 'tactics') {
    const TacticsLesson = require('./chess/TacticsLesson').default;
    return <TacticsLesson onBack={() => setSelectedLessonComponent(null)} onComplete={handleLessonComplete} />;
  }

  const renderBoard = () => (
    <div className="grid grid-cols-8 gap-0 border-2 border-gray-800 w-96 h-96 mx-auto">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`
              w-12 h-12 flex items-center justify-center cursor-pointer text-2xl font-bold
              ${(rowIndex + colIndex) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-700'}
              ${selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex 
                ? 'ring-4 ring-emerald-500' 
                : 'hover:ring-2 hover:ring-emerald-300'
              }
            `}
            onClick={() => handleSquareClick(rowIndex, colIndex)}
          >
            {piece && (
              <span className={piece.color === 'white' ? 'text-white drop-shadow-lg' : 'text-black'}>
                {pieceSymbols[piece.type][piece.color]}
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-emerald-900 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="bg-emerald-500 p-3 rounded-full text-white">
            <Crown className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">École d'Échecs</h1>
            <p className="text-gray-600 dark:text-gray-300">Apprenez et maîtrisez le jeu des rois</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-500">{playerRating}</div>
              <div className="text-sm text-gray-500">Rating ELO</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">{score}</div>
              <div className="text-sm text-gray-500">Score total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{moves.length}</div>
              <div className="text-sm text-gray-500">Coups joués</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-500">{lessons.filter(l => l.completed).length}/{lessons.length}</div>
              <div className="text-sm text-gray-500">Leçons terminées</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="game" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              Partie
            </TabsTrigger>
            <TabsTrigger value="lessons" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Cours
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Entraînement
            </TabsTrigger>
            <TabsTrigger value="puzzles" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Puzzles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="game" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Échiquier</CardTitle>
                      <div className="flex gap-2">
                        <Badge variant={currentPlayer === 'white' ? 'default' : 'secondary'}>
                          Tour des blancs
                        </Badge>
                        <Badge variant={currentPlayer === 'black' ? 'default' : 'secondary'}>
                          Tour des noirs
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    {renderBoard()}
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mode de jeu</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      onClick={() => { setGameMode('training'); initializeBoard(); }}
                      variant={gameMode === 'training' ? 'default' : 'outline'}
                      className="w-full"
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Entraînement libre
                    </Button>
                    <Button 
                      onClick={() => { setGameMode('ai'); initializeBoard(); }}
                      variant={gameMode === 'ai' ? 'default' : 'outline'}
                      className="w-full"
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      Contre l'IA
                    </Button>
                    <Button 
                      onClick={() => setGameMode('puzzle')}
                      variant={gameMode === 'puzzle' ? 'default' : 'outline'}
                      className="w-full"
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Puzzle tactique
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Historique des coups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {moves.map((move, index) => (
                        <div key={index} className="text-sm flex justify-between">
                          <span>{index + 1}.</span>
                          <span>{move.notation}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={initializeBoard}
                  variant="outline" 
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Nouvelle partie
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lessons" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lessons.map((lesson, index) => (
                <Card key={index} className="hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{lesson.description}</p>
                      </div>
                      {lesson.completed && (
                        <Badge className="bg-emerald-500">
                          <Star className="h-3 w-3 mr-1" />
                          Terminé
                        </Badge>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                        +{lesson.xp} XP
                      </Badge>
                      <Button 
                        size="sm" 
                        onClick={() => lesson.component ? startLesson(lesson.component) : completeLesson(index)}
                        disabled={lesson.completed}
                      >
                        {lesson.completed ? 'Terminé' : 'Commencer'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Entraîneur tactique</CardTitle>
                <p className="text-gray-600">Améliorez vos tactiques avec des exercices ciblés</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Target className="h-6 w-6 mb-2" />
                    <span>Mat en 1</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Zap className="h-6 w-6 mb-2" />
                    <span>Fourchettes</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Trophy className="h-6 w-6 mb-2" />
                    <span>Clouages</span>
                  </Button>
                </div>
                <div className="text-center text-gray-500 mt-8">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Sélectionnez un type d'exercice pour commencer l'entraînement</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="puzzles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {puzzles.map((puzzle, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{puzzle.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{puzzle.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="border-purple-200 text-purple-700">
                        +{puzzle.xp} XP
                      </Badge>
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Résoudre
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChessGame;
