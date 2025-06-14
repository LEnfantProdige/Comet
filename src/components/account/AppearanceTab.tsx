
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Palette } from "lucide-react";
import { useTheme } from "next-themes";

interface AppearanceTabProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  showSources: boolean;
  setShowSources: (show: boolean) => void;
  autoSave: boolean;
  setAutoSave: (save: boolean) => void;
}

const AppearanceTab = ({ 
  fontSize, setFontSize, showSources, setShowSources, 
  autoSave, setAutoSave 
}: AppearanceTabProps) => {
  const { theme, setTheme } = useTheme();

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
    document.documentElement.style.fontSize = `${value[0]}px`;
  };

  return (
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
  );
};

export default AppearanceTab;
