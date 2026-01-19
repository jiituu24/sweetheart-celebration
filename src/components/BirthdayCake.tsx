import { useState } from 'react';

interface BirthdayCakeProps {
  candleCount?: number;
  onAllBlown?: () => void;
}

const BirthdayCake = ({ candleCount = 20, onAllBlown }: BirthdayCakeProps) => {
  const [blownCandles, setBlownCandles] = useState<Set<number>>(new Set());
  const [showSmoke, setShowSmoke] = useState<Set<number>>(new Set());

  const handleCakeClick = () => {
    // Blow out candles one by one with slight delay
    const unbownCandles = Array.from({ length: candleCount }, (_, i) => i)
      .filter(i => !blownCandles.has(i));
    
    if (unbownCandles.length === 0) return;

    unbownCandles.forEach((candleIndex, i) => {
      setTimeout(() => {
        setShowSmoke(prev => new Set([...prev, candleIndex]));
        setBlownCandles(prev => new Set([...prev, candleIndex]));
        
        // Remove smoke after animation
        setTimeout(() => {
          setShowSmoke(prev => {
            const next = new Set(prev);
            next.delete(candleIndex);
            return next;
          });
        }, 1000);

        // Check if all candles are blown
        if (i === unbownCandles.length - 1) {
          setTimeout(() => onAllBlown?.(), 1500);
        }
      }, i * 100);
    });
  };

  const allBlown = blownCandles.size === candleCount;

  return (
    <div 
      className="relative cursor-pointer transition-transform hover:scale-105"
      onClick={handleCakeClick}
    >
      {/* Cake stand */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-4 bg-romantic-gold rounded-full shadow-lg" />
      
      {/* Bottom layer */}
      <div className="relative mx-auto w-56 h-24 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-lg rounded-b-3xl mt-8 shadow-lg">
        <div className="absolute inset-x-0 top-4 h-3 bg-pink-200 opacity-50" />
        <div className="absolute inset-x-0 bottom-6 h-3 bg-pink-200 opacity-50" />
        {/* Cherries */}
        <div className="absolute -top-2 left-8 w-4 h-4 bg-red-500 rounded-full shadow" />
        <div className="absolute -top-2 right-8 w-4 h-4 bg-red-500 rounded-full shadow" />
      </div>

      {/* Middle layer */}
      <div className="relative mx-auto w-44 h-20 bg-gradient-to-b from-rose-300 to-rose-400 rounded-t-lg -mt-2 shadow-lg">
        <div className="absolute inset-x-0 top-3 h-2 bg-white opacity-40" />
        <div className="absolute inset-x-0 bottom-4 h-2 bg-white opacity-40" />
        {/* Hearts decoration */}
        <div className="absolute -top-1 left-4 text-red-500 text-xs">❤️</div>
        <div className="absolute -top-1 right-4 text-red-500 text-xs">❤️</div>
      </div>

      {/* Top layer */}
      <div className="relative mx-auto w-32 h-16 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-lg -mt-2 shadow-lg">
        <div className="absolute inset-x-0 top-2 h-2 bg-white opacity-50" />
        {/* Frosting drips */}
        <div className="absolute -bottom-2 left-2 w-3 h-6 bg-pink-200 rounded-b-full" />
        <div className="absolute -bottom-3 left-8 w-2 h-8 bg-pink-200 rounded-b-full" />
        <div className="absolute -bottom-2 right-2 w-3 h-6 bg-pink-200 rounded-b-full" />
        <div className="absolute -bottom-4 right-8 w-2 h-9 bg-pink-200 rounded-b-full" />
      </div>

      {/* Candles */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex justify-center gap-1 flex-wrap max-w-40">
        {Array.from({ length: candleCount }).map((_, i) => (
          <div key={i} className="candle relative flex flex-col items-center">
            {/* Flame */}
            {!blownCandles.has(i) && (
              <div className="flame relative">
                <div className="w-2 h-4 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full blur-[1px]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-yellow-100 rounded-full" />
              </div>
            )}
            {/* Smoke */}
            {showSmoke.has(i) && (
              <div className="smoke absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-2 h-4 bg-gray-400 rounded-full opacity-60" />
              </div>
            )}
            {/* Candle stick */}
            <div className="w-1.5 h-6 bg-gradient-to-b from-pink-400 to-pink-500 rounded-sm" />
          </div>
        ))}
      </div>

      {/* Click instruction */}
      <p className={`text-center mt-8 font-display text-lg text-muted-foreground transition-opacity
        ${allBlown ? 'opacity-0' : 'opacity-100'}`}>
        ✨ Click the cake to blow out the candles ✨
      </p>
      
      {allBlown && (
        <p className="text-center mt-8 font-display text-xl text-primary animate-pulse-glow">
          🎉 Happy Birthday! 🎉
        </p>
      )}
    </div>
  );
};

export default BirthdayCake;
