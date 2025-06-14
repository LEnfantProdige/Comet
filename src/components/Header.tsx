
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";
import { useNavigate, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Sparkles, BookOpen, User, Newspaper, GraduationCap, Archive } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { path: "/comete", icon: GraduationCap, label: "Apprendre" },
    { path: "/", icon: BookOpen, label: "Histoire" },
    { path: "/news", icon: Newspaper, label: "Actualités" },
    { path: "/archives", icon: Archive, label: "Archives" },
    { path: "/account", icon: User, label: "Compte" }
  ];

  if (isMobile) {
    return (
      <>
        {/* Header mobile simplifié */}
        <header className="border-b border-border bg-card shadow-sm md:hidden">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => navigate("/")}
            >
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-full">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                Comète
              </h1>
            </div>
            <div className="flex gap-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Navigation mobile en bas */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
          <div className="flex justify-around items-center py-2 px-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px] ${
                    isActive 
                      ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Spacer pour éviter que le contenu soit masqué par la nav mobile */}
        <div className="h-20 md:hidden" />
      </>
    );
  }

  // Header desktop
  return (
    <header className="border-b border-border bg-card shadow-sm hidden md:block">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-full">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
              Comète
            </h1>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()} 
                  onClick={() => navigate("/comete")}
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Apprendre
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()} 
                  onClick={() => navigate("/")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Histoire
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()} 
                  onClick={() => navigate("/news")}
                >
                  <Newspaper className="mr-2 h-4 w-4" />
                  Actualités
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()} 
                  onClick={() => navigate("/archives")}
                >
                  <Archive className="mr-2 h-4 w-4" />
                  Archives
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()} 
                  onClick={() => navigate("/account")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Compte
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex gap-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
