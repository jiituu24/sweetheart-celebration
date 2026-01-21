// src/context/AudioContext.tsx
import { createContext, useContext, useRef, useState, ReactNode } from 'react';
import birthdaySong from "@/assets/song.mp3";

interface AudioContextType {
  play: () => void;
  isPlayed: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlayed, setIsPlayed] = useState(false);

  const play = () => {
    if (audioRef.current && !isPlayed) {
      audioRef.current.play().catch((error) => {
        console.error("Audio autoplay failed:", error);
      });
      setIsPlayed(true);
    }
  };

  return (
    <AudioContext.Provider value={{ play, isPlayed }}>
      <audio ref={audioRef} src={birthdaySong} loop />
      {children}
    </AudioContext.Provider>
  );
};
