
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Music, 
  Video, 
  FileText, 
  Globe, 
  Calendar,
  ExternalLink,
  Clock,
  Users,
  MessageSquare
} from "lucide-react";
import Header from "@/components/Header";

interface ArchiveItem {
  id: string;
  title: string;
  type: 'music' | 'video' | 'blog' | 'website';
  year: number;
  description: string;
  url?: string;
  thumbnail?: string;
  popularity: number;
  tags: string[];
}

const InternetArchives = () => {
  const [currentYear, setCurrentYear] = useState(2000);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const timelineYears = [1995, 1998, 2000, 2003, 2005, 2008, 2010, 2015, 2020, 2024];
  
  const archiveData: ArchiveItem[] = [
    // 1995-1998 Era
    { id: '1', title: 'Netscape Navigator', type: 'website', year: 1995, description: 'Le navigateur qui a démocratisé le Web', popularity: 95, tags: ['navigateur', 'pionnier'] },
    { id: '2', title: 'Geocities - Ma première page', type: 'website', year: 1996, description: 'Pages personnelles avec GIFs animés et compteurs de visiteurs', popularity: 80, tags: ['personnel', 'nostalgie'] },
    
    // 2000-2003 Era
    { id: '3', title: 'Napster - Révolution P2P', type: 'music', year: 2000, description: 'Le partage de musique qui a changé l\'industrie', popularity: 90, tags: ['p2p', 'révolution'] },
    { id: '4', title: 'Flash Games - Newgrounds', type: 'video', year: 2001, description: 'Animations et jeux Flash qui ont marqué une génération', popularity: 85, tags: ['flash', 'jeux'] },
    { id: '5', title: 'Blog Skyrock - Journal Intime', type: 'blog', year: 2002, description: 'Le phénomène des blogs adolescents français', popularity: 75, tags: ['blog', 'jeunesse'] },
    
    // 2005-2008 Era
    { id: '6', title: 'YouTube - Broadcast Yourself', type: 'video', year: 2005, description: 'Les premiers YouTubeurs et vidéos virales', popularity: 100, tags: ['viral', 'créateurs'] },
    { id: '7', title: 'MySpace - Music & Friends', type: 'music', year: 2006, description: 'Le réseau social des musiciens et la découverte de nouveaux artistes', popularity: 88, tags: ['social', 'découverte'] },
    { id: '8', title: 'WordPress - Blogosphère', type: 'blog', year: 2007, description: 'L\'explosion des blogs personnels et professionnels', popularity: 82, tags: ['cms', 'expression'] },
    
    // 2010-2015 Era
    { id: '9', title: 'Spotify - Streaming Musical', type: 'music', year: 2010, description: 'La révolution du streaming légal', popularity: 95, tags: ['streaming', 'légal'] },
    { id: '10', title: 'Vine - 6 secondes de créativité', type: 'video', year: 2013, description: 'Les micro-vidéos qui ont inspiré TikTok', popularity: 78, tags: ['micro-contenu', 'créatif'] },
    { id: '11', title: 'Medium - Plateforme d\'écriture', type: 'blog', year: 2012, description: 'Le renouveau du blog avec un design épuré', popularity: 70, tags: ['écriture', 'qualité'] },
    
    // 2020-2024 Era
    { id: '12', title: 'TikTok - L\'algorithme qui captive', type: 'video', year: 2020, description: 'Vidéos courtes et algorithme ultra-personnalisé', popularity: 98, tags: ['viral', 'ia'] },
    { id: '13', title: 'Clubhouse - Audio Social', type: 'music', year: 2021, description: 'Les conversations audio en temps réel', popularity: 65, tags: ['audio', 'temps-réel'] },
    { id: '14', title: 'Newsletter Substack', type: 'blog', year: 2022, description: 'Le retour des contenus longs et de qualité', popularity: 73, tags: ['newsletter', 'monétisation'] }
  ];

  const filteredData = archiveData.filter(item => {
    const yearMatch = item.year <= currentYear;
    const categoryMatch = selectedCategory === 'all' || item.type === selectedCategory;
    return yearMatch && categoryMatch;
  }).sort((a, b) => b.year - a.year);

  const nextYear = () => {
    const currentIndex = timelineYears.indexOf(currentYear);
    if (currentIndex < timelineYears.length - 1) {
      setCurrentYear(timelineYears[currentIndex + 1]);
    }
  };

  const prevYear = () => {
    const currentIndex = timelineYears.indexOf(currentYear);
    if (currentIndex > 0) {
      setCurrentYear(timelineYears[currentIndex - 1]);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'music': return <Music className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'blog': return <FileText className="h-4 w-4" />;
      case 'website': return <Globe className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'music': return 'bg-purple-500';
      case 'video': return 'bg-red-500';
      case 'blog': return 'bg-blue-500';
      case 'website': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full text-white w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Clock className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Archives de l'Internet
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Voyage à travers l'évolution du web et de sa culture
          </p>
        </div>

        {/* Timeline Navigation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5" />
              Ligne du temps - {currentYear}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button 
                variant="outline" 
                onClick={prevYear}
                disabled={timelineYears.indexOf(currentYear) === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Précédent
              </Button>
              
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                    {timelineYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => setCurrentYear(year)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                          year === currentYear
                            ? 'bg-blue-500 text-white scale-110'
                            : year <= currentYear
                              ? 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'text-gray-400'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={nextYear}
                disabled={timelineYears.indexOf(currentYear) === timelineYears.length - 1}
              >
                Suivant
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Tout</TabsTrigger>
            <TabsTrigger value="music">Musique</TabsTrigger>
            <TabsTrigger value="video">Vidéos</TabsTrigger>
            <TabsTrigger value="blog">Blogs</TabsTrigger>
            <TabsTrigger value="website">Sites Web</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-full ${getTypeColor(item.type)} text-white`}>
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge variant="outline">{item.year}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>Popularité: {item.popularity}%</span>
                  </div>
                  
                  <Button size="sm" variant="ghost" className="group-hover:bg-blue-50">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Explorer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Era Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>L'ère {currentYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Music className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h4 className="font-semibold">Musique</h4>
                <p className="text-sm text-gray-600">
                  {filteredData.filter(item => item.type === 'music').length} entrées
                </p>
              </div>
              
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <Video className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <h4 className="font-semibold">Vidéos</h4>
                <p className="text-sm text-gray-600">
                  {filteredData.filter(item => item.type === 'video').length} entrées
                </p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h4 className="font-semibold">Blogs & Sites</h4>
                <p className="text-sm text-gray-600">
                  {filteredData.filter(item => item.type === 'blog' || item.type === 'website').length} entrées
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InternetArchives;
