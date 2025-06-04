import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Topics from "./pages/Topics";
import ExerciseType from "./pages/ExerciseType";
import Flashcards from "./pages/Flashcards";
import Translation from "./pages/Translation";
import Profile from "./pages/Profile";
import Dictionary from "./pages/Dictionary";
import NotFound from "./pages/NotFound";
import { AppSidebar } from "./components/AppSidebar";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={
              <ProtectedRoute>
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
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;