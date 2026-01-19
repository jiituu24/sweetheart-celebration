import { useState } from 'react';
import { Gift, Heart, Star, Sparkles } from 'lucide-react';

interface GiftItem {
  id: number;
  title: string;
  description: string;
  icon: 'heart' | 'star' | 'sparkle';
}

interface MysteryGiftProps {
  gifts: GiftItem[];
  onAllRevealed?: () => void;
}

const MysteryGift = ({ gifts, onAllRevealed }: MysteryGiftProps) => {
  const [revealedGifts, setRevealedGifts] = useState<Set<number>>(new Set());

  const handleGiftClick = (id: number) => {
    const newRevealed = new Set(revealedGifts);
    newRevealed.add(id);
    setRevealedGifts(newRevealed);
    
    if (newRevealed.size === gifts.length) {
      setTimeout(() => onAllRevealed?.(), 500);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'heart':
        return <Heart className="w-8 h-8 text-primary" fill="currentColor" />;
      case 'star':
        return <Star className="w-8 h-8 text-accent" fill="currentColor" />;
      case 'sparkle':
        return <Sparkles className="w-8 h-8 text-romantic-gold" />;
      default:
        return <Heart className="w-8 h-8 text-primary" fill="currentColor" />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {gifts.map((gift) => (
        <div
          key={gift.id}
          className="mystery-gift aspect-square"
          onClick={() => handleGiftClick(gift.id)}
        >
          <div
            className={`w-full h-full transition-all duration-700 transform-gpu
              ${revealedGifts.has(gift.id) ? 'gift-revealed' : ''}`}
          >
            {!revealedGifts.has(gift.id) ? (
              <div className="gift-box hover:scale-105 transition-transform">
                <div className="text-center text-primary-foreground">
                  <Gift className="w-12 h-12 mb-2 mx-auto" />
                  <p className="font-display text-sm">Click to Open</p>
                </div>
                {/* Ribbon */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-romantic-gold opacity-50" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-4 bg-romantic-gold opacity-50" />
              </div>
            ) : (
              <div className="w-full h-full rounded-xl bg-card border border-border p-4 flex flex-col items-center justify-center text-center shadow-lg">
                <div className="mb-3 animate-float">
                  {getIcon(gift.icon)}
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{gift.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{gift.description}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MysteryGift;
