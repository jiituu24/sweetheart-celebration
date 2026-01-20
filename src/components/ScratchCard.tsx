import { useRef, useState, useEffect } from 'react';
import { Gift, Heart, Star, Sparkles } from 'lucide-react';

interface ScratchCardProps {
  id: number;
  gift: string;
  compliment: string;
  onRevealed: (id: number) => void;
  isRevealed: boolean;
}

const ScratchCard = ({ id, gift, compliment, onRevealed, isRevealed }: ScratchCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [hasTriggeredReveal, setHasTriggeredReveal] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const icons = [Heart, Star, Sparkles];
  const IconComponent = icons[id % 3];
  const iconColors = ['text-primary', 'text-accent', 'text-romantic-gold'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create dark romantic gradient scratch layer
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#4A2040');
    gradient.addColorStop(0.5, '#5C2A4A');
    gradient.addColorStop(1, '#6B3050');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add decorative pattern with muted sparkles
    ctx.fillStyle = 'rgba(147, 112, 219, 0.2)';
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, 2 + Math.random() * 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add "Scratch Me!" text
    ctx.fillStyle = 'rgba(200, 180, 200, 0.8)';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Scratch Me! ✨', canvas.width / 2, canvas.height / 2);
  }, [isRevealed]);

  const calculateScratchPercentage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }
    
    return (transparentPixels / (pixels.length / 4)) * 100;
  };

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching || isRevealed || isFadingOut) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    // Scale coordinates
    x = (x / rect.width) * canvas.width;
    y = (y / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    const percentage = calculateScratchPercentage(ctx, canvas);
    setScratchPercentage(percentage);

    // Trigger fade out transition when 40% is scratched
    if (percentage > 40 && !hasTriggeredReveal) {
      setHasTriggeredReveal(true);
      setIsFadingOut(true);
      
      // Wait for fade animation (0.7s) before marking as revealed
      setTimeout(() => {
        onRevealed(id);
      }, 700);
    }
  };

  const handleStart = () => setIsScratching(true);
  const handleEnd = () => setIsScratching(false);

  return (
    <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02]">
      {/* Revealed content - dark romantic styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-secondary to-muted p-3 flex flex-col items-center justify-center text-center border border-border/30">
        <div className={`mb-2 animate-float ${iconColors[id % 3]}`}>
          <IconComponent className="w-6 h-6" fill="currentColor" />
        </div>
        <div className="space-y-2">
          <div className="bg-primary/20 rounded-lg p-2 border border-primary/20">
            <p className="text-xs text-muted-foreground font-body">🎁 Gift</p>
            <p className="text-sm font-display text-foreground leading-tight">{gift}</p>
          </div>
          <div className="bg-accent/20 rounded-lg p-2 border border-accent/20">
            <p className="text-xs text-muted-foreground font-body">💕 Compliment</p>
            <p className="text-xs font-body text-foreground italic leading-tight">{compliment}</p>
          </div>
        </div>
      </div>

      {/* Scratch layer with fade transition */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          width={200}
          height={260}
          className={`absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-700 ease-out ${
            isFadingOut ? 'opacity-0' : 'opacity-100'
          }`}
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onMouseMove={scratch}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onTouchMove={scratch}
        />
      )}

      {/* Sparkle effect on reveal */}
      {isRevealed && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-romantic-soft-violet animate-ping"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s',
              }}
              size={12}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScratchCard;
