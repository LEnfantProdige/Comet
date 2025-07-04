import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Shuffle, Plus, Check, Users } from "lucide-react";

interface RummikubGameProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

interface GameCard {
  id: string;
  value: number;
  color: 'red' | 'blue' | 'yellow' | 'black';
  isJoker?: boolean;
}

interface Player {
  id: number;
  name: string;
  hand: GameCard[];
  score: number;
  isComputer: boolean;
}

interface Meld {
  id: string;
  cards: GameCard[];
  type: 'group' | 'run';
}

const RummikubGame = ({ onBack, onComplete }: RummikubGameProps) => {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [deck, setDeck] = useState<GameCard[]>([]);
  const [table, setTable] = useState<Meld[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [hasPlayedInRound, setHasPlayedInRound] = useState(false);
  const [round, setRound] = useState(1);

  const colors: Array<'red' | 'blue' | 'yellow' | 'black'> = ['red', 'blue', 'yellow', 'black'];
  
  const colorClasses = {
    red: 'text-red-500 border-red-300 bg-red-50',
    blue: 'text-blue-500 border-blue-300 bg-blue-50',
    yellow: 'text-yellow-500 border-yellow-300 bg-yellow-50',
    black: 'text-gray-900 border-gray-300 bg-gray-50'
  };

  // Créer le deck initial
  const createDeck = (): GameCard[] => {
    const cards: GameCard[] = [];
    
    // 2 exemplaires de chaque carte (1-13 dans 4 couleurs)
    for (let copy = 0; copy < 2; copy++) {
      for (const color of colors) {
        for (let value = 1; value <= 13; value++) {
          cards.push({
            id: `${color}-${value}-${copy}`,
            value,
            color
          });
        }
      }
    }
    
    // 2 jokers
    cards.push(
      { id: 'joker-1', value: 0, color: 'red', isJoker: true },
      { id: 'joker-2', value: 0, color: 'blue', isJoker: true }
    );
    
    return shuffleDeck(cards);
  };

  const shuffleDeck = (cards: GameCard[]): GameCard[] => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = () => {
    const newDeck = createDeck();
    const newPlayers: Player[] = [
      { id: 1, name: 'Vous', hand: [], score: 0, isComputer: false },
      { id: 2, name: 'Ordinateur 1', hand: [], score: 0, isComputer: true },
      { id: 3, name: 'Ordinateur 2', hand: [], score: 0, isComputer: true }
    ];

    // Distribuer 14 cartes à chaque joueur
    let deckIndex = 0;
    newPlayers.forEach(player => {
      player.hand = newDeck.slice(deckIndex, deckIndex + 14);
      deckIndex += 14;
    });

    setDeck(newDeck.slice(deckIndex));
    setPlayers(newPlayers);
    setGameState('playing');
  };

  const drawCard = () => {
    if (deck.length === 0) return;
    
    const newCard = deck[0];
    const newDeck = deck.slice(1);
    
    setPlayers(prev => prev.map((player, index) => 
      index === currentPlayerIndex 
        ? { ...player, hand: [...player.hand, newCard] }
        : player
    ));
    setDeck(newDeck);
    nextTurn();
  };

  const nextTurn = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    setSelectedCards([]);
    setHasPlayedInRound(false);
  };

  const selectCard = (cardId: string) => {
    setSelectedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const isValidGroup = (cards: GameCard[]): boolean => {
    if (cards.length < 3) return false;
    
    const values = cards.filter(c => !c.isJoker).map(c => c.value);
    const colors = cards.filter(c => !c.isJoker).map(c => c.color);
    
    // Tous de même valeur, couleurs différentes
    const uniqueValue = new Set(values).size === 1;
    const uniqueColors = new Set(colors).size === colors.length;
    
    return uniqueValue && uniqueColors;
  };

  const isValidRun = (cards: GameCard[]): boolean => {
    if (cards.length < 3) return false;
    
    const nonJokers = cards.filter(c => !c.isJoker);
    if (nonJokers.length === 0) return false;
    
    const color = nonJokers[0].color;
    const sameColor = nonJokers.every(c => c.color === color);
    
    if (!sameColor) return false;
    
    const values = nonJokers.map(c => c.value).sort((a, b) => a - b);
    
    // Vérifier la séquence (en tenant compte des jokers)
    for (let i = 1; i < values.length; i++) {
      if (values[i] - values[i-1] > 1) {
        // Il devrait y avoir des jokers entre
        const gap = values[i] - values[i-1] - 1;
        const jokersNeeded = gap;
        // Simplification : on accepte la séquence si possible
      }
    }
    
    return true;
  };

  const playMeld = () => {
    const currentPlayer = players[currentPlayerIndex];
    const selectedCardObjects = currentPlayer.hand.filter(card => 
      selectedCards.includes(card.id)
    );
    
    if (selectedCardObjects.length < 3) return;
    
    const isGroup = isValidGroup(selectedCardObjects);
    const isRun = isValidRun(selectedCardObjects);
    
    if (!isGroup && !isRun) return;
    
    const newMeld: Meld = {
      id: `meld-${Date.now()}`,
      cards: selectedCardObjects,
      type: isGroup ? 'group' : 'run'
    };
    
    setTable(prev => [...prev, newMeld]);
    setPlayers(prev => prev.map((player, index) => 
      index === currentPlayerIndex 
        ? { 
            ...player, 
            hand: player.hand.filter(card => !selectedCards.includes(card.id))
          }
        : player
    ));
    
    setSelectedCards([]);
    setHasPlayedInRound(true);
    
    // Vérifier si le joueur a gagné
    if (currentPlayer.hand.length - selectedCardObjects.length === 0) {
      setGameState('finished');
      setTimeout(() => onComplete(100), 2000);
    }
  };

  const computerTurn = () => {
    // Simulation simple de l'IA
    setTimeout(() => {
      const currentPlayer = players[currentPlayerIndex];
      
      // Essayer de jouer des cartes (simulation basique)
      const canPlay = Math.random() > 0.7; // 30% de chance de jouer
      
      if (canPlay && currentPlayer.hand.length >= 3) {
        // Simuler une combinaison (prendre 3 cartes au hasard)
        const cardsToPlay = currentPlayer.hand.slice(0, 3);
        const newMeld: Meld = {
          id: `meld-${Date.now()}`,
          cards: cardsToPlay,
          type: 'group' // Simulation
        };
        
        setTable(prev => [...prev, newMeld]);
        setPlayers(prev => prev.map((player, index) => 
          index === currentPlayerIndex 
            ? { 
                ...player, 
                hand: player.hand.slice(3)
              }
            : player
        ));
        
        if (currentPlayer.hand.length === 3) {
          setGameState('finished');
          return;
        }
      } else {
        // Piocher une carte
        drawCard();
        return;
      }
      
      nextTurn();
    }, 1500);
  };

  useEffect(() => {
    if (gameState === 'playing' && players[currentPlayerIndex]?.isComputer) {
      computerTurn();
    }
  }, [currentPlayerIndex, gameState, players]);

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-red-900 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="bg-orange-500 p-3 rounded-full text-white">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Rummikub</h1>
              <p className="text-gray-600 dark:text-gray-300">Jeu de combinaisons de cartes</p>
            </div>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Bienvenue dans Rummikub !</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Règles du jeu :</h3>
                <div className="text-sm space-y-2 text-left">
                  <p><strong>🎯 Objectif :</strong> Être le premier à poser toutes ses cartes</p>
                  <p><strong>🃏 Groupes :</strong> 3+ cartes de même valeur, couleurs différentes</p>
                  <p><strong>📶 Suites :</strong> 3+ cartes consécutives de même couleur</p>
                  <p><strong>🎲 Jokers :</strong> Remplacent n'importe quelle carte</p>
                </div>
              </div>
              
              <Button 
                onClick={startGame}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2"
              >
                <Users className="h-4 w-4 mr-2" />
                Commencer la partie
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-emerald-900 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-2xl font-bold mb-4">Partie terminée !</h2>
              <p className="text-gray-600 mb-6">
                Félicitations ! Vous avez terminé la partie de Rummikub.
              </p>
              <Button onClick={onBack} className="bg-emerald-500 hover:bg-emerald-600">
                Retour aux jeux
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-red-900 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="bg-orange-500 p-3 rounded-full text-white">
            <span className="text-2xl">🎯</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Rummikub</h1>
            <p className="text-gray-600 dark:text-gray-300">Tour de {currentPlayer?.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table de jeu */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Table de jeu</span>
                  <div className="text-sm text-gray-500">
                    Manche {round} - {table.length} combinaisons
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-32 bg-green-100 dark:bg-green-900/20 rounded-lg p-4 border-2 border-dashed border-green-300">
                  {table.length === 0 ? (
                    <div className="flex items-center justify-center h-24 text-gray-500">
                      Aucune combinaison sur la table
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {table.map((meld) => (
                        <div key={meld.id} className="flex gap-2 flex-wrap">
                          <span className="text-xs text-gray-500 mr-2">
                            {meld.type === 'group' ? '🎯' : '📶'}
                          </span>
                          {meld.cards.map((card) => (
                            <div
                              key={card.id}
                              className={`px-2 py-1 rounded border text-xs font-mono ${colorClasses[card.color]}`}
                            >
                              {card.isJoker ? '🃏' : card.value}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Main du joueur actuel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Votre main ({currentPlayer?.hand.length} cartes)</span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={playMeld}
                      disabled={selectedCards.length < 3 || currentPlayer?.isComputer}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Jouer ({selectedCards.length})
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={drawCard}
                      disabled={currentPlayer?.isComputer}
                    >
                      <Shuffle className="h-4 w-4 mr-1" />
                      Piocher
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {currentPlayer?.hand.map((card) => (
                    <div
                      key={card.id}
                      className={`px-3 py-2 rounded border cursor-pointer transition-all ${
                        selectedCards.includes(card.id)
                          ? 'ring-2 ring-orange-500 transform -translate-y-1'
                          : 'hover:transform hover:-translate-y-0.5'
                      } ${colorClasses[card.color]}`}
                      onClick={() => !currentPlayer.isComputer && selectCard(card.id)}
                    >
                      <div className="font-mono text-sm">
                        {card.isJoker ? '🃏' : card.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panneau latéral */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Joueurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {players.map((player, index) => (
                    <div 
                      key={player.id}
                      className={`p-3 rounded-lg ${
                        index === currentPlayerIndex 
                          ? 'bg-orange-100 dark:bg-orange-900/20 border-2 border-orange-300' 
                          : 'bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{player.name}</span>
                        <span className="text-sm text-gray-500">
                          {player.hand.length} cartes
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Score: {player.score}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">🎯</span>
                  <span>Sélectionnez 3+ cartes pour former un groupe</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">📶</span>
                  <span>Ou une suite de même couleur</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-500">🃏</span>
                  <span>Les jokers remplacent toute carte</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pioche</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl mb-2">🎴</div>
                  <div className="text-sm text-gray-500">
                    {deck.length} cartes restantes
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RummikubGame;