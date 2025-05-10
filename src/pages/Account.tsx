
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Settings, User, Info, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Account = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState(16);
  const [showSources, setShowSources] = useState(true);
  
  // Profile information state
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [bio, setBio] = useState("I'm a history enthusiast passionate about ancient civilizations and modern technology.");

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
    document.documentElement.style.fontSize = `${value[0]}px`;
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('account.profile.updated'),
      description: t('account.profile.updateSuccess')
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white font-serif mb-3">
            {t('account.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {t('account.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full bg-gray-100 dark:bg-gray-800 mb-8">
              <TabsTrigger value="settings" className="flex-1">
                <Settings className="mr-2 h-4 w-4" />
                {t('account.settings')}
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex-1">
                <User className="mr-2 h-4 w-4" />
                {t('account.profile')}
              </TabsTrigger>
              <TabsTrigger value="details" className="flex-1">
                <Info className="mr-2 h-4 w-4" />
                {t('account.details')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>{t('account.appearance')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="theme-mode">{t('account.theme')}</Label>
                      <p className="text-sm text-gray-500">{t('account.theme.description')}</p>
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
                    <p className="text-sm text-gray-500">{t('account.fontSize.description')}</p>
                  </div>

                  {/* Sources Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-sources">{t('account.sources')}</Label>
                      <p className="text-sm text-gray-500">{t('account.sources.description')}</p>
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
              <Card>
                <CardHeader>
                  <CardTitle>{t('account.profile.title')}</CardTitle>
                  <CardDescription>{t('account.profile.subtitle')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('account.profile.name')}</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('account.profile.namePlaceholder')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('account.profile.email')}</Label>
                      <div className="flex">
                        <div className="relative flex-grow">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input 
                            id="email" 
                            type="email" 
                            className="pl-10"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('account.profile.emailPlaceholder')}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">{t('account.profile.bio')}</Label>
                      <Textarea 
                        id="bio" 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)}
                        placeholder={t('account.profile.bioPlaceholder')}
                        rows={4}
                      />
                      <p className="text-xs text-gray-500">{t('account.profile.bioHelp')}</p>
                    </div>
                  
                    <Button type="submit" className="w-full md:w-auto">
                      {t('account.profile.save')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>{t('account.details.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('account.details.description')}
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
