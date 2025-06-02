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
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
      title: "Nouvelle découverte sur Mars",
      content: "Des scientifiques de la NASA ont découvert de nouvelles preuves suggérant la présence d'eau liquide sous la surface martienne, renforçant l'hypothèse d'une vie microbienne potentielle.",
      image: "https://images.unsplash.com/photo-1614728894747-a83421789f10?auto=format&fit=crop&w=800",
      date: "2025-05-01",
      category: "space",
      source: "Science Today"
    },
    {
      id: "2",
      title: "Avancée majeure en fusion nucléaire",
      content: "Des chercheurs du MIT ont réalisé une percée significative dans le domaine de la fusion nucléaire, atteignant un rendement net positif pendant plusieurs minutes, ouvrant la voie à une nouvelle ère énergétique.",
      image: "https://images.unsplash.com/photo-1580508244245-c466fefc9d60?auto=format&fit=crop&w=800",
      date: "2025-04-28",
      category: "energy",
      source: "Tech Review"
    },
    {
      id: "3",
      title: "Nouveau vaccin contre la tuberculose",
      content: "Une équipe internationale de médecins a développé un vaccin prometteur contre la tuberculose, montrant une efficacité de 89% lors des essais cliniques de phase 3.",
      image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800",
      date: "2025-04-15",
      category: "health",
      source: "Medical Journal"
    },
    {
      id: "4",
      title: "Intelligence artificielle révolutionnant l'archéologie",
      content: "Des archéologues utilisant des algorithmes d'IA ont découvert un réseau de cités mayas jusque-là inconnu en analysant des données LiDAR, révolutionnant notre compréhension de cette civilisation ancienne.",
      image: "https://images.unsplash.com/photo-1588428608577-71d0290a3f50?auto=format&fit=crop&w=800",
      date: "2025-04-10",
      category: "archaeology",
      source: "History Channel"
    },
    {
      id: "5",
      title: "Projet de reforestation massive en Amazonie",
      content: "Une initiative internationale lance un ambitieux projet de reforestation en Amazonie, visant à planter plus de 100 millions d'arbres sur cinq ans pour lutter contre le changement climatique.",
      image: "https://images.unsplash.com/photo-1586176930729-e0c48ae5a384?auto=format&fit=crop&w=800",
      date: "2025-03-22",
      category: "environment",
      source: "Green Earth"
    },
    {
      id: "6",
      title: "Percée en informatique quantique",
      content: "Google annonce une avancée majeure dans l'informatique quantique avec son nouveau processeur qui pourrait révolutionner le calcul complexe.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800",
      date: "2025-05-10",
      category: "technology",
      source: "Quantum Today"
    }
  ];

  const featuredArticles = articles.slice(0, 3);

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
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white font-serif mb-4">
            {t('news.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto">
            {t('news.subtitle')}
          </p>
        </div>
        
        {activeGame ? (
          renderActiveGame()
        ) : (
          <>
            {/* Carrousel d'articles à la une */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <Star className="h-7 w-7 text-yellow-500" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">À la une</h2>
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              
              <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                <CarouselContent>
                  {featuredArticles.map((article) => (
                    <CarouselItem key={article.id} className="md:basis-1/2 lg:basis-1/3">
                      <FeaturedNewsCard article={article} onClick={() => setOpenArticle(article)} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12" />
                <CarouselNext className="hidden md:flex -right-12" />
              </Carousel>
            </section>

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.map((article) => (
                    <NewsCard key={article.id} article={article} onClick={() => setOpenArticle(article)} />
                  ))}
                </div>
              </TabsContent>
              
              {["space", "health", "environment"].map((category) => (
                <TabsContent key={category} value={category} className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles
                      .filter(article => article.category === category)
                      .map((article) => (
                        <NewsCard key={article.id} article={article} onClick={() => setOpenArticle(article)} />
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

// Featured News Card Component for Carousel
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
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
              {article.category}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h3>
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

// News Card Component
interface NewsCardProps {
  article: NewsArticle;
  onClick: () => void;
}

const NewsCard = ({ article, onClick }: NewsCardProps) => {
  return (
    <Card 
      className="border bg-white dark:bg-gray-800 cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden group"
      onClick={onClick}
    >
      <div className="h-48 relative overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="inline-block px-2 py-1 bg-white/90 text-gray-800 text-xs font-semibold rounded">
            {article.category}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-bold text-white line-clamp-2">{article.title}</h3>
        </div>
      </div>
      <CardContent className="pt-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{article.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-xs text-gray-500">{article.date}</span>
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{article.source}</span>
      </CardFooter>
    </Card>
  );
};

export default News;
