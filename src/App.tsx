
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Topics from "./pages/Topics";
import ExerciseType from "./pages/ExerciseType";
import Flashcards from "./pages/Flashcards";
import Translation from "./pages/Translation";
import Profile from "./pages/Profile";
import Dictionary from "./pages/Dictionary";
import NotFound from "./pages/NotFound";
import { AppSidebar } from "./components/AppSidebar";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full bg-gradient-to-br from-language-primary/10 to-language-accent/10">
                  <AppSidebar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/topics" element={<Topics />} />
                      <Route path="/exercise/:topicId" element={<ExerciseType />} />
                      <Route path="/flashcards/:topicId" element={<Flashcards />} />
                      <Route path="/translation/:topicId" element={<Translation />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/dictionary" element={<Dictionary />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              </SidebarProvider>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
