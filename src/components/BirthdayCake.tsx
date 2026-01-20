import { useState } from 'react';
import { Flame } from 'lucide-react';

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
    }, 2000);
  };

  const allBlown = blownCandles.size === candleCount;

  // Arrange candles in rows
  const candleRows = [
    Array.from({ length: 8 }, (_, i) => i),      // Top row: 8 candles
    Array.from({ length: 7 }, (_, i) => i + 8),  // Middle row: 7 candles
    Array.from({ length: 5 }, (_, i) => i + 15), // Bottom row: 5 candles
  ];

  return (
    <div className="relative flex flex-col items-center">
      {/* 3D-style Cake with layered gradients */}
      <div className="relative">
        {/* Candle container */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          {candleRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
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
                            className="w-2 h-3 rounded-full"
                            style={{
                              background: 'radial-gradient(ellipse, rgba(180, 180, 190, 0.7) 0%, rgba(120, 120, 130, 0.3) 60%, transparent 100%)',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Candle stick */}
                  <div className="w-2 h-8 rounded-sm shadow-md"
                    style={{
                      background: `linear-gradient(90deg, 
                        hsl(350, 40%, 45%) 0%, 
                        hsl(350, 50%, 55%) 40%, 
                        hsl(350, 40%, 40%) 100%
                      )`,
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

        {/* Cake layers - 3D appearance */}
        <div className="relative mt-8">
          {/* Top layer */}
          <div className="relative mx-auto w-40 h-16 rounded-t-2xl shadow-xl z-30"
            style={{
              background: `linear-gradient(180deg, 
                hsl(270, 30%, 35%) 0%, 
                hsl(270, 35%, 25%) 100%
              )`,
              boxShadow: 'inset 0 4px 12px rgba(255, 255, 255, 0.1), 0 8px 24px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Frosting drizzle */}
            <div className="absolute -bottom-3 left-4 w-4 h-6 rounded-b-full"
              style={{ background: 'linear-gradient(180deg, hsl(350, 50%, 40%), hsl(350, 60%, 30%))' }}
            />
            <div className="absolute -bottom-4 left-12 w-3 h-8 rounded-b-full"
              style={{ background: 'linear-gradient(180deg, hsl(350, 50%, 40%), hsl(350, 60%, 30%))' }}
            />
            <div className="absolute -bottom-2 right-6 w-3 h-5 rounded-b-full"
              style={{ background: 'linear-gradient(180deg, hsl(350, 50%, 40%), hsl(350, 60%, 30%))' }}
            />
            {/* Decorative line */}
            <div className="absolute top-3 inset-x-3 h-1 bg-gradient-to-r from-transparent via-romantic-muted-crimson/50 to-transparent rounded-full" />
          </div>

          {/* Middle layer */}
          <div className="relative mx-auto w-52 h-20 -mt-1 rounded-b-xl shadow-xl z-20"
            style={{
              background: `linear-gradient(180deg, 
                hsl(280, 25%, 30%) 0%, 
                hsl(280, 30%, 20%) 100%
              )`,
              boxShadow: 'inset 0 -4px 12px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Decorative stripes */}
            <div className="absolute top-4 inset-x-4 h-0.5 bg-romantic-muted-crimson/30 rounded-full" />
            <div className="absolute bottom-5 inset-x-4 h-0.5 bg-romantic-muted-crimson/30 rounded-full" />
            {/* Heart decorations */}
            <div className="absolute top-2 left-4 text-romantic-muted-crimson opacity-60">❤</div>
            <div className="absolute top-2 right-4 text-romantic-muted-crimson opacity-60">❤</div>
          </div>

          {/* Bottom layer */}
          <div className="relative mx-auto w-64 h-24 -mt-1 rounded-b-2xl shadow-2xl z-10"
            style={{
              background: `linear-gradient(180deg, 
                hsl(270, 25%, 25%) 0%, 
                hsl(270, 30%, 15%) 100%
              )`,
              boxShadow: 'inset 0 -6px 16px rgba(0, 0, 0, 0.4), 0 12px 32px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-4 inset-x-6 h-1 bg-gradient-to-r from-transparent via-romantic-soft-violet/30 to-transparent rounded-full" />
            <div className="absolute bottom-6 inset-x-6 h-1 bg-gradient-to-r from-transparent via-romantic-soft-violet/30 to-transparent rounded-full" />
            {/* Rosettes */}
            <div className="absolute -top-2 left-6 w-4 h-4 rounded-full bg-romantic-muted-crimson/60 shadow-md" />
            <div className="absolute -top-2 right-6 w-4 h-4 rounded-full bg-romantic-muted-crimson/60 shadow-md" />
          </div>

          {/* Cake plate/stand */}
          <div className="relative mx-auto w-72 h-4 -mt-1 rounded-full shadow-lg"
            style={{
              background: 'linear-gradient(180deg, hsl(40, 40%, 45%) 0%, hsl(40, 35%, 35%) 100%)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            }}
          />
          <div className="relative mx-auto w-20 h-8 -mt-1 rounded-b-lg"
            style={{
              background: 'linear-gradient(180deg, hsl(40, 35%, 40%) 0%, hsl(40, 30%, 30%) 100%)',
            }}
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
