import { useState } from 'react';
import { Flame } from 'lucide-react';
import cakeImage from '../assets/5bg1.png';

interface BirthdayCakeProps {
  candleCount?: number;
  onAllBlown?: () => void;
}

const BirthdayCake = ({ candleCount = 20, onAllBlown }: BirthdayCakeProps) => {
  const [blownCandles, setBlownCandles] = useState<Set<number>>(new Set());
  const [showSmoke, setShowSmoke] = useState<Set<number>>(new Set());
  const [isBlowing, setIsBlowing] = useState(false);

  const handleBlowCandles = () => {
    if (isBlowing || blownCandles.size === candleCount) return;
    setIsBlowing(true);

    // Blow out ALL candles simultaneously
    const allCandleIndices = Array.from({ length: candleCount }, (_, i) => i);
    
    // Show smoke for all candles at once
    setShowSmoke(new Set(allCandleIndices));
    
    // Extinguish all flames simultaneously with a slight stagger for visual effect
    allCandleIndices.forEach((candleIndex) => {
      const stagger = Math.random() * 200; // Small random stagger (0-200ms)
      setTimeout(() => {
        setBlownCandles(prev => new Set([...prev, candleIndex]));
      }, stagger);
    });

    // Remove smoke after animation completes
    setTimeout(() => {
      setShowSmoke(new Set());
      setIsBlowing(false);
      onAllBlown?.();
    }, 3000);
  };

  const allBlown = blownCandles.size === candleCount;

  const candleColors = [
    'linear-gradient(90deg, #FFFFFF, #F0F0F0, #E0E0E0)', // White/Silver
    'linear-gradient(90deg, #FFD700, #FFEC8B, #FFD700)', // Gold
    'linear-gradient(90deg, #E6E6FA, #D8BFD8, #E6E6FA)', // Lavender
    'linear-gradient(90deg, #ADD8E6, #B0E0E6, #ADD8E6)', // Light Blue
    'linear-gradient(90deg, #F5FFFA, #F0FFF0, #F5FFFA)', // Mint Cream
  ];

  // Arrange candles in rows
  const candleRows = [
    Array.from({ length: 3 }, (_, i) => i),      // Top row: 8 candles
    Array.from({ length: 0 }, (_, i) => i + 3),  // Middle row: 7 candles
    // Array.from({ length: 1 }, (_, i) => i + 15), // Bottom row: 5 candles
  ];

  return (
    <div className="relative flex flex-col items-center">
      {/* <audio ref={audioRef} src={birthdaySong} loop /> */}
      {/* 3D-style Cake with layered gradients */}
      <div className="relative">
        {/* Candle container */}
        <div className="absolute top-12 left-40 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
          {candleRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-3 mb-1">
              {row.map((candleIndex) => (
                <div key={candleIndex} className="candle relative flex flex-col items-center">
                  {/* Flame */}
                  <div className={`relative h-5 transition-all duration-300 ${
                    blownCandles.has(candleIndex) ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}>
                    <div className="flame relative">
                      {/* Outer glow */}
                      <div className="absolute -inset-1 bg-amber-500/30 rounded-full blur-md" />
                      {/* Main flame */}
                      <div className="relative w-2.5 h-5 bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 rounded-full blur-[0.5px]">
                        {/* Inner bright core */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-gradient-to-t from-orange-300 to-white rounded-full opacity-90" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Smoke particles */}
                  {showSmoke.has(candleIndex) && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      {[...Array(3)].map((_, smokeIndex) => (
                        <div
                          key={smokeIndex}
                          className="smoke absolute"
                          style={{
                            animationDelay: `${smokeIndex * 0.15}s`,
                            left: `${-3 + smokeIndex * 3}px`,
                          }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{
                              background: 'radial-gradient(ellipse, rgba(180, 180, 190, 0.7) 0%, rgba(120, 120, 130, 0.3) 60%, transparent 100%)',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Candle stick */}
                  <div className="w-2 h-8 rounded-t-sm shadow-md"
                    style={{
                      background: candleColors[candleIndex % candleColors.length],
                    }}
                  >
                    {/* Candle highlight */}
                    <div className="absolute left-0.5 top-0 w-0.5 h-full bg-gradient-to-b from-white/30 to-transparent rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Cake Image */}
        <div className="relative mt-8">
          <img 
            src={cakeImage} 
            alt="Birthday Cake" 
            className="w-60 h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Blow button */}
      <button
        onClick={handleBlowCandles}
        disabled={allBlown || isBlowing}
        className={`mt-8 px-8 py-3 rounded-full font-display text-lg transition-all duration-300 ${
          allBlown
            ? 'bg-romantic-soft-violet/30 text-foreground cursor-default'
            : 'btn-romantic hover:scale-105'
        }`}
      >
        {allBlown ? (
          <span className="flex items-center gap-2">
            🎉 Happy Birthday! 🎉
          </span>
        ) : isBlowing ? (
          <span className="flex items-center gap-2">
            <Flame className="w-5 h-5 animate-pulse" />
            Blowing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            ✨ Click to Blow the Candles ✨
          </span>
        )}
      </button>

      {allBlown && (
        <p className="mt-4 text-center font-display text-lg text-muted-foreground animate-fade-in-up">
          Make a wish! 💫
        </p>
      )}
    </div>
  );
};

export default BirthdayCake;
