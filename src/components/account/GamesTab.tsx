
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gamepad2, Layers, Grid2X2, Timer, Keyboard, SquareX, Anchor } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const GamesTab = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGameNavigation = (gameType: string) => {
    if (gameType === "internet-archives") {
      navigate("/");
      toast({
        title: "🌐 Archives de l'Internet",
        description: "Redirection vers les jeux scientifiques !"
      });
    } else {
      navigate("/news");
      toast({
        title: "🎮 Jeux disponibles",
        description: "Redirection vers la section actualités !"
      });
    }
  };

  return (
    <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Gamepad2 className="h-5 w-5" />
          Jeux & Expériences
        </CardTitle>
        <CardDescription className="text-indigo-100">
          Découvrez nos jeux éducatifs et expériences interactives
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Archives de l'Internet */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-indigo-300 dark:hover:border-indigo-600"
            onClick={() => handleGameNavigation("internet-archives")}
          >
            <CardContent className="p-4 text-center">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Layers className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Archives de l'Internet</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Explorez l'évolution du web à travers les âges</p>
            </CardContent>
          </Card>

          {/* Sudoku */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-emerald-300 dark:hover:border-emerald-600"
            onClick={() => handleGameNavigation("sudoku")}
          >
            <CardContent className="p-4 text-center">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Grid2X2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Sudoku</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Défiez votre logique avec nos grilles</p>
            </CardContent>
          </Card>

          {/* Connections */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300 dark:hover:border-blue-600"
            onClick={() => handleGameNavigation("connections")}
          >
            <CardContent className="p-4 text-center">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Timer className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Connections</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Trouvez les liens entre les mots</p>
            </CardContent>
          </Card>

          {/* Wordle */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-green-300 dark:hover:border-green-600"
            onClick={() => handleGameNavigation("wordle")}
          >
            <CardContent className="p-4 text-center">
              <div className="bg-gradient-to-r from-green-500 to-lime-500 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Keyboard className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Wordle</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Devinez le mot mystère en 6 essais</p>
            </CardContent>
          </Card>

          {/* Mots croisés */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-300 dark:hover:border-purple-600"
            onClick={() => handleGameNavigation("crosswords")}
          >
            <CardContent className="p-4 text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <SquareX className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Mots croisés</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Testez votre vocabulaire</p>
            </CardContent>
          </Card>

          {/* Exploration des profondeurs */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-teal-300 dark:hover:border-teal-600"
            onClick={() => handleGameNavigation("deep-sea")}
          >
            <CardContent className="p-4 text-center">
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Anchor className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Exploration marine</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Plongez dans les abysses</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default GamesTab;
