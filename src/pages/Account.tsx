
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, User, Bell, Palette, Globe, Camera, Shield, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Account = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState(16);
  const [showSources, setShowSources] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  
  // Profile information state
  const [name, setName] = useState("Sophie Martin");
  const [email, setEmail] = useState("sophie.martin@example.com");
  const [bio, setBio] = useState("Passionnée d'histoire ancienne et de civilisations perdues. J'adore explorer les mystères du passé à travers Comète.");
  const [language, setLanguage] = useState("fr");
  const [favoriteSubjects, setFavoriteSubjects] = useState(["Histoire", "Sciences", "Art"]);

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
    document.documentElement.style.fontSize = `${value[0]}px`;
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "✨ Profil mis à jour",
      description: "Vos modifications ont été sauvegardées avec succès !"
    });
  };

  const handleAvatarUpload = () => {
    toast({
      title: "📸 Photo de profil",
      description: "Fonctionnalité disponible prochainement !"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 py-8 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header avec avatar */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-2xl font-bold">
                SM
              </AvatarFallback>
            </Avatar>
            <Button 
              size="icon" 
              variant="secondary"
              className="absolute -bottom-2 -right-2 rounded-full shadow-lg"
              onClick={handleAvatarUpload}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white font-serif mb-2">
            {name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Gérez votre compte Comète
          </p>
          <div className="flex justify-center gap-2 mt-4">
            {favoriteSubjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                <Heart className="w-3 h-3 mr-1" />
                {subject}
              </Badge>
            ))}
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg mb-8">
            <TabsTrigger value="profile" className="flex-1">
              <User className="mr-2 h-4 w-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex-1">
              <Palette className="mr-2 h-4 w-4" />
              Apparence
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex-1">
              <Shield className="mr-2 h-4 w-4" />
              Confidentialité
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informations personnelles
                </CardTitle>
                <CardDescription className="text-emerald-100">
                  Personnalisez votre profil Comète
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold">Nom complet</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="border-2 focus:border-emerald-500"
                        placeholder="Votre nom complet"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold">Adresse email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 focus:border-emerald-500"
                        placeholder="votre.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-sm font-semibold">Langue préférée</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="border-2 focus:border-emerald-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">🇫🇷 Français</SelectItem>
                        <SelectItem value="en">🇬🇧 English</SelectItem>
                        <SelectItem value="es">🇪🇸 Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-semibold">Biographie</Label>
                    <Textarea 
                      id="bio" 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)}
                      className="border-2 focus:border-emerald-500 min-h-[100px]"
                      placeholder="Parlez-nous de vous et de vos passions..."
                      rows={4}
                    />
                    <p className="text-xs text-gray-500">Décrivez vos centres d'intérêt et ce qui vous passionne</p>
                  </div>
                
                  <Button type="submit" className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                    💾 Sauvegarder le profil
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Personnalisation de l'interface
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                {/* Thème */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-base font-semibold">🎨 Thème d'affichage</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Choisissez votre apparence préférée</p>
                  </div>
                  <ToggleGroup type="single" value={theme} onValueChange={(value) => value && setTheme(value)}>
                    <ToggleGroupItem value="light" className="text-xs">
                      ☀️ Clair
                    </ToggleGroupItem>
                    <ToggleGroupItem value="dark" className="text-xs">
                      🌙 Sombre
                    </ToggleGroupItem>
                    <ToggleGroupItem value="system" className="text-xs">
                      💻 Auto
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Taille de police */}
                <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">📝 Taille du texte: {fontSize}px</Label>
                  </div>
                  <Slider 
                    min={12} 
                    max={24} 
                    step={1}
                    value={[fontSize]} 
                    onValueChange={handleFontSizeChange}
                    className="py-4"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Ajustez la taille du texte pour votre confort</p>
                </div>

                {/* Sources */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-base font-semibold">📚 Afficher les sources</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Afficher les références dans les contenus</p>
                  </div>
                  <Switch 
                    checked={showSources} 
                    onCheckedChange={setShowSources}
                  />
                </div>

                {/* Auto-save */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-base font-semibold">💾 Sauvegarde automatique</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sauvegarder vos progrès automatiquement</p>
                  </div>
                  <Switch 
                    checked={autoSave} 
                    onCheckedChange={setAutoSave}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Préférences de notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-base font-semibold">📧 Notifications par email</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Recevoir les nouveautés par email</p>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-base font-semibold">🔔 Notifications push</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Notifications en temps réel</p>
                  </div>
                  <Switch 
                    checked={pushNotifications} 
                    onCheckedChange={setPushNotifications}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Confidentialité et sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">🔐 Sécurité du compte</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mb-4">
                    Votre compte est sécurisé et vos données sont protégées.
                  </p>
                  <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-50">
                    Changer le mot de passe
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">📊 Données personnelles</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">
                    Gérez vos données et votre historique d'apprentissage.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-blue-500 text-blue-700 hover:bg-blue-50">
                      Exporter mes données
                    </Button>
                    <Button variant="outline" className="border-red-500 text-red-700 hover:bg-red-50">
                      Supprimer mon compte
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
