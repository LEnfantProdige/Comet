
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Palette, Shield, Gamepad2 } from "lucide-react";
import ProfileTab from "@/components/account/ProfileTab";
import AppearanceTab from "@/components/account/AppearanceTab";
import GamesTab from "@/components/account/GamesTab";
import NotificationsTab from "@/components/account/NotificationsTab";
import PrivacyTab from "@/components/account/PrivacyTab";

const Account = () => {
  const { t } = useLanguage();
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
  const [favoriteSubjects, setFavoriteSubjects] = useState(["Histoire", "Sciences", "Art", "Archives Internet"]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 py-8 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg mb-8">
            <TabsTrigger value="profile" className="flex-1">
              <User className="mr-2 h-4 w-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex-1">
              <Palette className="mr-2 h-4 w-4" />
              Apparence
            </TabsTrigger>
            <TabsTrigger value="games" className="flex-1">
              <Gamepad2 className="mr-2 h-4 w-4" />
              Jeux
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
            <ProfileTab 
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              bio={bio}
              setBio={setBio}
              language={language}
              setLanguage={setLanguage}
              favoriteSubjects={favoriteSubjects}
            />
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <AppearanceTab 
              fontSize={fontSize}
              setFontSize={setFontSize}
              showSources={showSources}
              setShowSources={setShowSources}
              autoSave={autoSave}
              setAutoSave={setAutoSave}
            />
          </TabsContent>

          <TabsContent value="games" className="space-y-6">
            <GamesTab />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <NotificationsTab 
              emailNotifications={emailNotifications}
              setEmailNotifications={setEmailNotifications}
              pushNotifications={pushNotifications}
              setPushNotifications={setPushNotifications}
            />
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <PrivacyTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
