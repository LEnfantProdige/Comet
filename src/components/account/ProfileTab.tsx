
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Camera, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileTabProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  favoriteSubjects: string[];
}

const ProfileTab = ({ 
  name, setName, email, setEmail, bio, setBio, 
  language, setLanguage, favoriteSubjects 
}: ProfileTabProps) => {
  const { toast } = useToast();

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
    <>
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
    </>
  );
};

export default ProfileTab;
