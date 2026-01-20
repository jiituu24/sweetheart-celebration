import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import LandingPage from "./pages/LandingPage";
import GiftRevealPage from "./pages/GiftRevealPage";
import CakePage from "./pages/CakePage";
import GalleryPage from "./pages/GalleryPage";
import SecretPage from "./pages/SecretPage";
import LetterPage from "./pages/LetterPage";
import NotFound from "./pages/NotFound";
import birthdaySong from "./assets/song.mp3";

const queryClient = new QueryClient();

const App = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Audio autoplay failed:", error);
          // Autoplay was prevented. Show a UI element to let the user start playback.
        });
      }
    };

    // Play audio on the first user interaction
    const handleFirstInteraction = () => {
      playAudio();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <audio ref={audioRef} src={birthdaySong} loop />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/cake" element={<CakePage />} />
            <Route path="/gifts" element={<GiftRevealPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/secret" element={<SecretPage />} />
            <Route path="/letter" element={<LetterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
