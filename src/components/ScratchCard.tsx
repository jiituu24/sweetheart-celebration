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

  const icons = [Heart, Star, Sparkles];
  const IconComponent = icons[id % 3];
  const iconColors = ['text-primary', 'text-accent', 'text-romantic-gold'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create gradient scratch layer
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#e879a9');
    gradient.addColorStop(0.5, '#f4a5c4');
    gradient.addColorStop(1, '#ffd4e5');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add decorative pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, 3 + Math.random() * 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add "Scratch Me!" text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 14px sans-serif';
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
    if (!isScratching || isRevealed) return;

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

    if (percentage > 40 && !hasTriggeredReveal) {
      setHasTriggeredReveal(true);
      onRevealed(id);
    }
  };

  const handleStart = () => setIsScratching(true);
  const handleEnd = () => setIsScratching(false);

  return (
    <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02]">
      {/* Revealed content */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-muted p-3 flex flex-col items-center justify-center text-center">
        <div className={`mb-2 animate-float ${iconColors[id % 3]}`}>
          <IconComponent className="w-6 h-6" fill="currentColor" />
        </div>
        <div className="space-y-2">
          <div className="bg-primary/10 rounded-lg p-2">
            <p className="text-xs text-muted-foreground font-body">🎁 Gift</p>
            <p className="text-sm font-display text-foreground leading-tight">{gift}</p>
          </div>
          <div className="bg-accent/10 rounded-lg p-2">
            <p className="text-xs text-muted-foreground font-body">💕 Compliment</p>
            <p className="text-xs font-body text-foreground italic leading-tight">{compliment}</p>
          </div>
        </div>
      </div>

      {/* Scratch layer */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          width={200}
          height={260}
          className="absolute inset-0 w-full h-full cursor-pointer touch-none"
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
              className="absolute text-romantic-gold animate-ping"
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
