
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Layers, Search, ArrowRight, Clock, ExternalLink } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface InternetArchivesProps {
  onBackToNews: () => void;
}

// Sites web célèbres avec leurs années d'archive
const historicalSites = [
  { name: "Google", url: "google.com", years: [1998, 2001, 2004, 2008, 2012] },
  { name: "Amazon", url: "amazon.com", years: [1999, 2003, 2007, 2010, 2015] },
  { name: "YouTube", url: "youtube.com", years: [2005, 2008, 2011, 2014, 2017] },
  { name: "Facebook", url: "facebook.com", years: [2004, 2007, 2010, 2013, 2016] },
  { name: "Wikipedia", url: "wikipedia.org", years: [2001, 2004, 2007, 2010, 2015] },
  { name: "Yahoo", url: "yahoo.com", years: [1995, 1998, 2002, 2006, 2010] },
  { name: "eBay", url: "ebay.com", years: [1997, 2000, 2003, 2007, 2012] },
  { name: "Twitter", url: "twitter.com", years: [2006, 2009, 2012, 2015, 2018] }
];

const InternetArchives = ({ onBackToNews }: InternetArchivesProps) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSite, setSelectedSite] = useState<typeof historicalSites[0] | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [exploring, setExploring] = useState(false);
  
  const filteredSites = searchQuery.trim() === ""
    ? historicalSites
    : historicalSites.filter(site => 
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        site.url.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  const handleSiteSelect = (site: typeof historicalSites[0]) => {
    setSelectedSite(site);
    setSelectedYear(null);
    setExploring(false);
  };
  
  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setExploring(true);
  };
  
  const handleBack = () => {
    if (exploring) {
      setExploring(false);
    } else if (selectedSite) {
      setSelectedSite(null);
      setSelectedYear(null);
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <Button 
          onClick={selectedSite ? handleBack : onBackToNews}
          variant="outline"
          className="text-sm"
        >
          {selectedSite ? t('back') : t('games.back')}
        </Button>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">{t('games.internetarchives')}</h2>
      </div>
      
      {!selectedSite ? (
        <Card className="border dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-center">{t('games.internetarchives.explore')}</CardTitle>
            <CardDescription className="text-center">{t('games.internetarchives.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex gap-2">
                <Input 
                  type="text" 
                  placeholder={t('games.internetarchives.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredSites.map((site) => (
                <Card 
                  key={site.url} 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => handleSiteSelect(site)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold">{site.name}</h4>
                      <p className="text-xs text-gray-500">{site.url}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : exploring ? (
        <Card className="border dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-center">{selectedSite.name} - {selectedYear}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center">
            <div className="w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-md mb-4 overflow-hidden relative">
              {/* Simuler l'affichage d'une capture d'écran du site */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <img 
                  src={`https://placehold.co/600x400?text=${selectedSite.name}+${selectedYear}`}
                  alt={`${selectedSite.name} en ${selectedYear}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
              {t('games.internetarchives.viewing')} <strong>{selectedSite.name}</strong> {t('games.internetarchives.from')} {selectedYear}.
            </p>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {t('games.internetarchives.other')}
              </Button>
              <Button className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                {t('games.internetarchives.visit')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-center">{selectedSite.name}</CardTitle>
            <CardDescription className="text-center">{selectedSite.url}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-4 text-center">{t('games.internetarchives.select')}</p>
            
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {selectedSite.years.map((year) => (
                <Button 
                  key={year} 
                  variant="outline"
                  onClick={() => handleYearSelect(year)}
                  className="px-4 py-2"
                >
                  {year}
                </Button>
              ))}
            </div>
            
            <div className="text-center">
              <Button variant="outline" onClick={() => setSelectedSite(null)}>
                {t('games.internetarchives.differentsite')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InternetArchives;
