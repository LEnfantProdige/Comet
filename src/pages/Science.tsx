
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Atom, FlaskConical as Flask, TestTube, Microscope, Rocket as RocketIcon } from "lucide-react";

// Custom green-punk theme styles
const greenPunkGradient = "bg-gradient-to-br from-green-900 via-emerald-700 to-teal-700";
const greenPunkAccent = "bg-gradient-to-r from-lime-500 to-emerald-500";
const greenPunkCard = "border-2 border-emerald-600/50 backdrop-blur-sm bg-black/30";

const ScienceArticleCard = ({ title, image, description }: { title: string, image: string, description: string }) => {
  const { t } = useLanguage();
  
  return (
    <Card className={`${greenPunkCard} group hover:border-lime-500/70 transition-all duration-300`}>
      <CardHeader className="p-0">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <CardTitle className="text-white text-xl font-bold">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-gray-300">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="text-emerald-500 border-emerald-600/50 hover:bg-emerald-900/30 w-full">
          {t('explore')}
        </Button>
      </CardFooter>
    </Card>
  );
};

const GameCard = ({ title, icon, description, comingSoon = false }: { 
  title: string, 
  icon: React.ReactNode, 
  description: string,
  comingSoon?: boolean 
}) => {
  const { t } = useLanguage();
  return (
    <Card className={`${greenPunkCard} hover:border-lime-500/70 transition-all duration-300`}>
      <CardHeader className="flex flex-row items-center gap-2">
        <div className={`${greenPunkAccent} p-2 rounded-lg`}>
          {icon}
        </div>
        <div>
          <CardTitle className="text-lg text-emerald-400">{title}</CardTitle>
          {comingSoon && (
            <CardDescription className="text-amber-500">
              {t('science.comingsoon')}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-300">{description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant={comingSoon ? "outline" : "default"} 
          disabled={comingSoon}
          className={!comingSoon ? "bg-gradient-to-r from-emerald-600 to-green-700 hover:opacity-90 w-full" : "w-full"}
        >
          {t('explore')}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Science = () => {
  const { t } = useLanguage();

  // Sample articles data
  const articles = [
    {
      title: "La Fusion Nucléaire",
      image: "https://images.unsplash.com/photo-1581093804475-577d72e14cc7?auto=format&fit=crop&w=800",
      description: "Les dernières avancées en matière de fusion nucléaire et comment cette technologie pourrait révolutionner notre production d'énergie."
    },
    {
      title: "Biologie Synthétique",
      image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=800",
      description: "Comment la biologie synthétique transforme la médecine moderne et ouvre de nouvelles possibilités de traitement."
    },
    {
      title: "L'Intelligence Artificielle",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800",
      description: "L'évolution rapide de l'IA et son impact sur notre société et notre avenir collectif."
    }
  ];

  return (
    <div className={`min-h-screen ${greenPunkGradient} py-12 px-4 md:px-8`}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-emerald-400 font-serif mb-3">
            {t('science.title')}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t('science.subtitle')}
          </p>
        </div>

        <Tabs defaultValue="articles" className="w-full max-w-5xl mx-auto">
          <TabsList className="w-full bg-black/40 border border-emerald-600/30 mb-8">
            <TabsTrigger value="articles" className="flex-1 data-[state=active]:bg-emerald-900/70">
              <Flask className="mr-2 h-4 w-4" />
              {t('science.articles')}
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex-1 data-[state=active]:bg-emerald-900/70">
              <TestTube className="mr-2 h-4 w-4" />
              {t('science.quizzes')}
            </TabsTrigger>
            <TabsTrigger value="games" className="flex-1 data-[state=active]:bg-emerald-900/70">
              <Microscope className="mr-2 h-4 w-4" />
              {t('science.games')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <ScienceArticleCard 
                  key={index} 
                  title={article.title} 
                  image={article.image} 
                  description={article.description} 
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className={`${greenPunkCard} h-full`}>
                <CardHeader>
                  <CardTitle className="text-emerald-400">Quiz sur l'Espace</CardTitle>
                  <CardDescription className="text-gray-400">
                    Testez vos connaissances sur notre univers et les découvertes récentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 relative overflow-hidden rounded-md">
                    <img 
                      src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800" 
                      alt="Space Quiz" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-emerald-600 to-green-700 hover:opacity-90 w-full">
                    {t('start')}
                  </Button>
                </CardFooter>
              </Card>

              <Card className={`${greenPunkCard} h-full`}>
                <CardHeader>
                  <CardTitle className="text-emerald-400">Quiz sur la Biologie</CardTitle>
                  <CardDescription className="text-gray-400">
                    Explorez les mystères du corps humain et des écosystèmes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 relative overflow-hidden rounded-md">
                    <img 
                      src="https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=800" 
                      alt="Biology Quiz" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-emerald-600 to-green-700 hover:opacity-90 w-full">
                    {t('start')}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="games" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GameCard 
                title={t('science.space')} 
                icon={<RocketIcon className="text-white" />}
                description="Construisez votre propre ascenseur spatial et voyez jusqu'où vous pouvez aller dans l'espace."
              />
              <GameCard 
                title={t('science.deepsea')} 
                icon={<TestTube className="text-white" />}
                description="Explorez les mystères des abysses et découvrez des créatures étranges et merveilleuses."
                comingSoon={true}
              />
              <GameCard 
                title={t('science.infinitycraft')} 
                icon={<Atom className="text-white" />}
                description="Combinez des éléments pour créer de nouvelles découvertes scientifiques dans ce jeu inspiré par l'alchimie."
                comingSoon={true}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Science;
