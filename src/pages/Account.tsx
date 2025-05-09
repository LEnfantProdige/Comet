
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Settings, User } from "lucide-react";

const Account = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState(16);
  const [showSources, setShowSources] = useState(true);
  
  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
    document.documentElement.style.fontSize = `${value[0]}px`;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-700 to-teal-700 py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-emerald-400 font-serif mb-3">
            {t('account.title')}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t('account.subtitle')}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="w-full bg-black/40 border border-emerald-600/30 mb-8">
              <TabsTrigger value="settings" className="flex-1 data-[state=active]:bg-emerald-900/70">
                <Settings className="mr-2 h-4 w-4" />
                {t('account.settings')}
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex-1 data-[state=active]:bg-emerald-900/70">
                <User className="mr-2 h-4 w-4" />
                {t('account.profile')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="settings">
              <Card className="border-2 border-emerald-600/50 backdrop-blur-sm bg-black/30">
                <CardHeader>
                  <CardTitle className="text-emerald-400">{t('account.appearance')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="theme-mode">{t('account.theme')}</Label>
                      <p className="text-sm text-gray-400">{t('account.theme.description')}</p>
                    </div>
                    <ToggleGroup type="single" value={theme} onValueChange={(value) => value && setTheme(value)}>
                      <ToggleGroupItem value="light" className="text-xs">
                        {t('theme.light')}
                      </ToggleGroupItem>
                      <ToggleGroupItem value="dark" className="text-xs">
                        {t('theme.dark')}
                      </ToggleGroupItem>
                      <ToggleGroupItem value="system" className="text-xs">
                        {t('theme.system')}
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  
                  {/* Font Size Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="font-size">{t('account.fontSize')}: {fontSize}px</Label>
                    </div>
                    <Slider 
                      id="font-size" 
                      min={12} 
                      max={24} 
                      step={1}
                      value={[fontSize]} 
                      onValueChange={handleFontSizeChange}
                      className="py-4"
                    />
                    <p className="text-sm text-gray-400">{t('account.fontSize.description')}</p>
                  </div>
                  
                  {/* Sources Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-sources">{t('account.sources')}</Label>
                      <p className="text-sm text-gray-400">{t('account.sources.description')}</p>
                    </div>
                    <Switch 
                      id="show-sources" 
                      checked={showSources} 
                      onCheckedChange={setShowSources}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile">
              <Card className="border-2 border-emerald-600/50 backdrop-blur-sm bg-black/30">
                <CardHeader>
                  <CardTitle className="text-emerald-400">{t('account.profile.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    {t('account.profile.description')}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;
