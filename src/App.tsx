
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./hooks/useLanguage";
import Index from "./pages/Index";
import PeriodDetail from "./pages/PeriodDetail";
import CourseDetail from "./pages/CourseDetail";
import QuizPage from "./pages/QuizPage";
import Eclaire from "./pages/Eclaire";
import Account from "./pages/Account";
import News from "./pages/News";
import InternetArchives from "./pages/InternetArchives";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" enableSystem>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/comete" element={<Eclaire />} />
                  <Route path="/period/:periodId" element={<PeriodDetail />} />
                  <Route path="/period/:periodId/course/:courseId" element={<CourseDetail />} />
                  <Route path="/period/:periodId/course/:courseId/quiz" element={<QuizPage />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/archives" element={<InternetArchives />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
