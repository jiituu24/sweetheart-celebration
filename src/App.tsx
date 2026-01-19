import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GiftRevealPage from "./pages/GiftRevealPage";
import CakePage from "./pages/CakePage";
import GalleryPage from "./pages/GalleryPage";
import SecretPage from "./pages/SecretPage";
import LetterPage from "./pages/LetterPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/gifts" element={<GiftRevealPage />} />
          <Route path="/cake" element={<CakePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/secret" element={<SecretPage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
