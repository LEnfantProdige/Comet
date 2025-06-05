
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "next-themes";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Maximize, 
  Minimize, 
  Timer, 
  Grid2X2, 
  SquareX, 
  Keyboard, 
  Anchor, 
  Rocket, 
  Layers,
  Search
} from "lucide-react";
import NewsGameCard from "@/components/news/NewsGameCard";
import Sudoku from "@/components/news/games/Sudoku";
import Connections from "@/components/news/games/Connections";
import Crosswords from "@/components/news/games/Crosswords";
import Wordle from "@/components/news/games/Wordle";
import SpaceElevator from "@/components/science/SpaceElevator";
import DeepSeaExploration from "@/components/science/DeepSeaExploration";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  category: string;
  source: string;
  featured?: boolean;
}

type ActiveGameType = "sudoku" | "connections" | "crosswords" | "wordle" | "space-elevator" | "deep-sea" | "internet-archives" | null;

const News = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [openArticle, setOpenArticle] = useState<NewsArticle | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeGame, setActiveGame] = useState<ActiveGameType>(null);
  
  const articles: NewsArticle[] = [
    {
      id: "1",
      title: "Nouvelle découverte sur Mars révèle des traces d'eau",
      content: "Des scientifiques de la NASA ont découvert de nouvelles preuves suggérant la présence d'eau liquide sous la surface martienne, renforçant l'hypothèse d'une vie microbienne potentielle. Cette découverte majeure pourrait révolutionner notre compréhension de la planète rouge.",
      image: "https://images.unsplash.com/photo-1614728894747-a83421789f10?auto=format&fit=crop&w=800",
      date: "il y a 2 heures",
      category: "space",
      source: "Science Today",
      featured: true
    },
    {
      id: "2",
      title: "Avancée majeure en fusion nucléaire",
      content: "Des chercheurs du MIT ont réalisé une percée significative dans le domaine de la fusion nucléaire, atteignant un rendement net positif pendant plusieurs minutes, ouvrant la voie à une nouvelle ère énergétique.",
      image: "https://images.unsplash.com/photo-1580508244245-c466fefc9d60?auto=format&fit=crop&w=800",
      date: "il y a 5 heures",
      category: "energy",
      source: "Tech Review"
    },
    {
      id: "3",
      title: "Nouveau vaccin contre la tuberculose",
      content: "Une équipe internationale de médecins a développé un vaccin prometteur contre la tuberculose, montrant une efficacité de 89% lors des essais cliniques.",
      image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800",
      date: "il y a 2 heures",
      category: "health",
      source: "Medical Journal"
    },
    {
      id: "4",
      title: "Intelligence artificielle révolutionne l'archéologie",
      content: "Des archéologues utilisant des algorithmes d'IA ont découvert un réseau de cités mayas jusque-là inconnu.",
      image: "https://images.unsplash.com/photo-1588428608577-71d0290a3f50?auto=format&fit=crop&w=800",
      date: "il y a 3 heures",
      category: "archaeology",
      source: "History Channel"
    },
    {
      id: "5",
      title: "Projet de reforestation massive en Amazonie",
      content: "Initiative internationale pour planter plus de 100 millions d'arbres sur cinq ans.",
      image: "https://images.unsplash.com/photo-1586176930729-e0c48ae5a384?auto=format&fit=crop&w=800",
      date: "il y a 2 heures",
      category: "environment",
      source: "Green Earth"
    },
    {
      id: "6",
      title: "Percée en informatique quantique",
      content: "Google annonce une avancée majeure avec son nouveau processeur quantique.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800",
      date: "il y a 2 heures",
      category: "technology",
      source: "Quantum Today"
    }
  ];

  const handleCiteSource = (source: string) => {
    navigator.clipboard.writeText(`Source: ${source}`);
    toast({
      title: t('news.sourceCopied'),
      description: source
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Render article dialog or drawer based on device
  const renderArticleDetail = () => {
    if (!openArticle) return null;
    
    const content = (
      <>
        <div className={`relative ${isFullscreen ? 'h-[40vh]' : 'h-48 md:h-64'} overflow-hidden rounded-t-lg transition-all duration-300`}>
          <img 
            src={openArticle.image} 
            alt={openArticle.title}
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <h2 className="text-2xl font-bold text-white">{openArticle.title}</h2>
            <p className="text-sm text-gray-300">{openArticle.date}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
            className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 p-1"
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </Button>
        </div>
        <div className={`p-6 ${isFullscreen ? 'overflow-y-auto bg-white dark:bg-gray-900' : ''}`}>
          <p className={`${isFullscreen ? 'text-lg leading-relaxed' : 'text-base'} text-gray-700 dark:text-gray-300`}>
            {openArticle.content}
          </p>
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500">
              Source: {openArticle.source}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleCiteSource(openArticle.source)}
              className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/30 text-xs"
            >
              {t('news.cite')}
            </Button>
          </div>
        </div>
      </>
    );
    
    if (isMobile) {
      return (
        <Drawer open={!!openArticle} onOpenChange={() => {
          setOpenArticle(null);
          setIsFullscreen(false);
        }}>
          <DrawerContent className={`bg-white dark:bg-gray-900 border-t ${isFullscreen ? 'max-h-screen h-screen' : 'max-h-[85vh]'}`}>
            <DrawerHeader className={isFullscreen ? 'sr-only' : ''}>
              <DrawerTitle>{openArticle.title}</DrawerTitle>
              <DrawerDescription>{openArticle.date}</DrawerDescription>
            </DrawerHeader>
            <ScrollArea className={`${isFullscreen ? 'h-screen' : 'max-h-[70vh]'} px-4`}>
              {content}
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      );
    }
    
    return (
      <Dialog open={!!openArticle} onOpenChange={() => {
        setOpenArticle(null);
        setIsFullscreen(false);
      }}>
        <DialogContent 
          className={`bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 ${
            isFullscreen 
            ? 'max-w-full max-h-screen h-screen w-screen rounded-none fixed inset-0 m-0'
            : 'max-w-2xl max-h-[85vh]'
          }`}
        >
          <DialogHeader className={isFullscreen ? 'sr-only' : ''}>
            <DialogTitle>{openArticle.title}</DialogTitle>
            <DialogDescription>{openArticle.date}</DialogDescription>
          </DialogHeader>
          <ScrollArea className={isFullscreen ? 'h-[calc(100vh-2rem)]' : 'max-h-[70vh]'}>
            {content}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  };

  // Render the active game
  const renderActiveGame = () => {
    if (!activeGame) return null;

    switch (activeGame) {
      case 'sudoku':
        return <Sudoku onBackToNews={() => setActiveGame(null)} />;
      case 'connections':
        return <Connections onBackToNews={() => setActiveGame(null)} />;
      case 'crosswords':
        return <Crosswords onBackToNews={() => setActiveGame(null)} />;
      case 'wordle':
        return <Wordle onBackToNews={() => setActiveGame(null)} />;
      case 'space-elevator':
        return <SpaceElevator onBack={() => setActiveGame(null)} />;
      case 'deep-sea':
        return <DeepSeaExploration onBack={() => setActiveGame(null)} />;
      case 'internet-archives':
        return (
          <div className="w-full max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900">
            <div className="flex justify-between items-center mb-6">
              <Button 
                onClick={() => setActiveGame(null)}
                variant="outline"
                className="text-sm"
              >
                {t('games.back')}
              </Button>
              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">{t('games.internetarchives')}</h2>
            </div>
            <Card className="border dark:border-gray-700">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Layers size={48} className="mx-auto text-amber-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{t('games.comingsoon')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{t('games.internetarchives.description')}</p>
                  <Button onClick={() => setActiveGame(null)}>
                    {t('games.back')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header avec recherche */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-teal-600 dark:text-teal-400">ACTUS</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-gray-600 dark:text-gray-300">Une</Button>
            <Button variant="ghost" className="text-gray-600 dark:text-gray-300">Catégorie</Button>
            <Button variant="ghost" className="text-gray-600 dark:text-gray-300">Catégorie</Button>
            <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {activeGame ? (
          renderActiveGame()
        ) : (
          <>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full bg-gray-100 dark:bg-gray-800 mb-8 grid grid-cols-5">
                <TabsTrigger value="all" className="flex-1">
                  {t('news.categories.all')}
                </TabsTrigger>
                <TabsTrigger value="space" className="flex-1">
                  {t('news.categories.space')}
                </TabsTrigger>
                <TabsTrigger value="health" className="flex-1">
                  {t('news.categories.health')}
                </TabsTrigger>
                <TabsTrigger value="environment" className="flex-1">
                  {t('news.categories.environment')}
                </TabsTrigger>
                <TabsTrigger value="games" className="flex-1">
                  {t('news.categories.games')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Article principal */}
                  {featuredArticle && (
                    <div className="lg:col-span-2">
                      <FeaturedNewsCard article={featuredArticle} onClick={() => setOpenArticle(featuredArticle)} />
                    </div>
                  )}
                  
                  {/* Articles secondaires */}
                  <div className="space-y-4">
                    {regularArticles.slice(0, 3).map((article) => (
                      <SmallNewsCard key={article.id} article={article} onClick={() => setOpenArticle(article)} />
                    ))}
                  </div>
                </div>
                
                {/* Grille d'articles supplémentaires */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {regularArticles.slice(3).map((article) => (
                    <RegularNewsCard key={article.id} article={article} onClick={() => setOpenArticle(article)} />
                  ))}
                </div>
              </TabsContent>
              
              {["space", "health", "environment"].map((category) => (
                <TabsContent key={category} value={category} className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles
                      .filter(article => article.category === category)
                      .map((article) => (
                        <RegularNewsCard key={article.id} article={article} onClick={() => setOpenArticle(article)} />
                      ))}
                  </div>
                </TabsContent>
              ))}
              
              {/* Games Tab */}
              <TabsContent value="games" className="animate-fade-in">
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <NewsGameCard 
                      title={t('games.sudoku')}
                      description={t('games.sudoku.description')}
                      icon={<Grid2X2 size={32} />}
                      onClick={() => setActiveGame("sudoku")}
                    />
                    <NewsGameCard 
                      title={t('games.connections')}
                      description={t('games.connections.description')}
                      icon={<Timer size={32} />}
                      onClick={() => setActiveGame("connections")}
                    />
                    <NewsGameCard 
                      title={t('games.wordle')}
                      description={t('games.wordle.description')}
                      icon={<Keyboard size={32} />}
                      onClick={() => setActiveGame("wordle")}
                    />
                    <NewsGameCard 
                      title={t('games.crosswords')}
                      description={t('games.crosswords.description')}
                      icon={<SquareX size={32} />}
                      onClick={() => setActiveGame("crosswords")}
                    />
                    <NewsGameCard 
                      title={t('games.deepsea')}
                      description={t('games.deepsea.description')}
                      icon={<Anchor size={32} />}
                      onClick={() => setActiveGame("deep-sea")}
                    />
                    <NewsGameCard 
                      title={t('games.space')}
                      description={t('games.space.description')}
                      icon={<Rocket size={32} />}
                      onClick={() => setActiveGame("space-elevator")}
                    />
                    <NewsGameCard 
                      title={t('games.internetarchives')}
                      description={t('games.internetarchives.description')}
                      icon={<Layers size={32} />}
                      onClick={() => setActiveGame("internet-archives")}
                      comingSoon={true}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
      
      {renderArticleDetail()}
    </div>
  );
};

// Article principal en vedette
interface FeaturedNewsCardProps {
  article: NewsArticle;
  onClick: () => void;
}

const FeaturedNewsCard = ({ article, onClick }: FeaturedNewsCardProps) => {
  return (
    <Card 
      className="border-0 bg-transparent cursor-pointer group overflow-hidden h-96"
      onClick={onClick}
    >
      <div className="relative h-full rounded-xl overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-3 line-clamp-2">{article.title}</h3>
          <p className="text-sm text-gray-300 line-clamp-2 mb-3">{article.content}</p>
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{article.date}</span>
            <span>{article.source}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Carte d'article petite pour la sidebar
interface SmallNewsCardProps {
  article: NewsArticle;
  onClick: () => void;
}

const SmallNewsCard = ({ article, onClick }: SmallNewsCardProps) => {
  return (
    <Card 
      className="border bg-white dark:bg-gray-800 cursor-pointer hover:shadow-md transition-all duration-300 overflow-hidden group"
      onClick={onClick}
    >
      <div className="flex">
        <div className="w-24 h-16 relative overflow-hidden flex-shrink-0">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </div>
        <div className="p-3 flex-1">
          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-2 mb-1">{article.title}</h4>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Carte d'article régulière
interface RegularNewsCardProps {
  article: NewsArticle;
  onClick: () => void;
}

const RegularNewsCard = ({ article, onClick }: RegularNewsCardProps) => {
  return (
    <Card 
      className="border bg-white dark:bg-gray-800 cursor-pointer hover:shadow-md transition-all duration-300 overflow-hidden group"
      onClick={onClick}
    >
      <div className="h-48 relative overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 line-clamp-2 mb-2">{article.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">{article.content}</p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{article.date}</span>
          <span className="text-blue-600 dark:text-blue-400 font-medium">{article.source}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default News;
