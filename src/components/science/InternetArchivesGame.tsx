
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  Music, 
  Video, 
  FileText, 
  Globe, 
  Calendar,
  Clock,
  ExternalLink
} from "lucide-react";

interface InternetArchivesGameProps {
  onBack: () => void;
}

interface ArchiveItem {
  id: string;
  title: string;
  type: 'music' | 'video' | 'blog' | 'website';
  year: number;
  description: string;
  popularity: number;
  tags: string[];
}

const InternetArchivesGame = ({ onBack }: InternetArchivesGameProps) => {
  const [currentYear, setCurrentYear] = useState(2000);
  
  const timelineYears = [1995, 1998, 2000, 2003, 2005, 2008, 2010, 2015, 2020, 2024];
  
  const archiveData: ArchiveItem[] = [
    { id: '1', title: 'Netscape Navigator', type: 'website', year: 1995, description: 'Le navigateur qui a démocratisé le Web', popularity: 95, tags: ['navigateur', 'pionnier'] },
    { id: '2', title: 'Geocities', type: 'website', year: 1996, description: 'Pages personnelles avec GIFs animés', popularity: 80, tags: ['personnel', 'nostalgie'] },
    { id: '3', title: 'Napster', type: 'music', year: 2000, description: 'Le partage de musique P2P', popularity: 90, tags: ['p2p', 'révolution'] },
    { id: '4', title: 'Flash Games', type: 'video', year: 2001, description: 'Animations Flash sur Newgrounds', popularity: 85, tags: ['flash', 'jeux'] },
    { id: '5', title: 'Blog Skyrock', type: 'blog', year: 2002, description: 'Le phénomène des blogs français', popularity: 75, tags: ['blog', 'jeunesse'] },
    { id: '6', title: 'YouTube', type: 'video', year: 2005, description: 'Broadcast Yourself', popularity: 100, tags: ['viral', 'créateurs'] },
    { id: '7', title: 'MySpace', type: 'music', year: 2006, description: 'Le réseau social des musiciens', popularity: 88, tags: ['social', 'découverte'] },
    { id: '8', title: 'WordPress', type: 'blog', year: 2007, description: 'L\'explosion des blogs', popularity: 82, tags: ['cms', 'expression'] },
    { id: '9', title: 'Spotify', type: 'music', year: 2010, description: 'La révolution du streaming', popularity: 95, tags: ['streaming', 'légal'] },
    { id: '10', title: 'Vine', type: 'video', year: 2013, description: '6 secondes de créativité', popularity: 78, tags: ['micro-contenu'] },
    { id: '11', title: 'TikTok', type: 'video', year: 2020, description: 'L\'algorithme qui captive', popularity: 98, tags: ['viral', 'ia'] },
  ];

  const filteredData = archiveData.filter(item => item.year <= currentYear).sort((a, b) => b.year - a.year);

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
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
          Archives de l'Internet
        </h2>
        <div></div>
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
                  <Clock className="h-4 w-4" />
                  <span>Pop: {item.popularity}%</span>
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
    </div>
  );
};

export default InternetArchivesGame;
