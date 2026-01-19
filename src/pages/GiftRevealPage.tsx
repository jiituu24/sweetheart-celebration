import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingElements from '@/components/FloatingElements';
import ScratchCard from '@/components/ScratchCard';
import TeddyBear from '@/components/TeddyBear';
import HeartSticker from '@/components/HeartSticker';
import { Button } from '@/components/ui/button';
import { ArrowRight, Gift, Sparkles } from 'lucide-react';

const GiftRevealPage = () => {
  const navigate = useNavigate();
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
  const [showContinue, setShowContinue] = useState(false);

  const giftsAndCompliments = [
    { id: 1, gift: 'Endless Hugs', compliment: 'Your smile lights up my world' },
    { id: 2, gift: 'Adventure Trip', compliment: 'You make every day an adventure' },
    { id: 3, gift: 'Sweet Treats', compliment: 'You\'re sweeter than any dessert' },
    { id: 4, gift: 'Quality Time', compliment: 'Every moment with you is precious' },
    { id: 5, gift: 'Love Letters', compliment: 'Your words touch my soul' },
    { id: 6, gift: 'Forever Promise', compliment: 'You\'re my forever person' },
    { id: 7, gift: 'Cozy Movie Nights', compliment: 'Your warmth is my comfort' },
    { id: 8, gift: 'Breakfast in Bed', compliment: 'You deserve to be pampered' },
    { id: 9, gift: 'Spa Day Together', compliment: 'Your beauty radiates inside out' },
    { id: 10, gift: 'Star Gazing Date', compliment: 'You\'re my brightest star' },
    { id: 11, gift: 'Surprise Flowers', compliment: 'You bloom my heart with joy' },
    { id: 12, gift: 'Dance in the Rain', compliment: 'You make storms feel magical' },
    { id: 13, gift: 'Picnic at Sunset', compliment: 'Sunsets are prettier with you' },
    { id: 14, gift: 'Handmade Jewelry', compliment: 'You\'re one of a kind treasure' },
    { id: 15, gift: 'Love Playlist', compliment: 'Every love song reminds me of you' },
    { id: 16, gift: 'Photo Album', compliment: 'Every picture captures your grace' },
    { id: 17, gift: 'Midnight Snacks', compliment: 'Late nights are better with you' },
    { id: 18, gift: 'Dream Vacation', compliment: 'You\'re my dream come true' },
    { id: 19, gift: 'Forever Cuddles', compliment: 'Your embrace is my safe place' },
    { id: 20, gift: 'All My Love', compliment: 'You are absolutely perfect to me' },
  ];

  const handleCardRevealed = (id: number) => {
    setRevealedCards(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  useEffect(() => {
    if (revealedCards.size === 20) {
      setTimeout(() => setShowContinue(true), 500);
    }
  }, [revealedCards]);

  const progress = (revealedCards.size / 20) * 100;

  return (
    <div className="min-h-screen romantic-gradient relative overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="flex justify-center items-center gap-3 mb-3">
            <Gift className="w-8 h-8 text-primary animate-float" />
            <h1 className="text-2xl md:text-3xl font-display text-foreground">
              Scratch & Reveal
            </h1>
            <Gift className="w-8 h-8 text-primary animate-float" style={{ animationDelay: '0.5s' } as React.CSSProperties} />
          </div>
          <p className="text-sm md:text-base text-muted-foreground font-body mb-4">
            Scratch each card to discover your birthday gifts & sweet compliments! 💝
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{revealedCards.size} / 20 revealed</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        {/* Decorations */}
        <div className="relative">
          <TeddyBear className="absolute -top-2 left-2 animate-float hidden lg:block" size={50} />
          <HeartSticker variant="sparkle" size={35} className="absolute -top-1 right-2 animate-float" />
        </div>

        {/* Scratch Cards Grid */}
        <section className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {giftsAndCompliments.map((item) => (
              <ScratchCard
                key={item.id}
                id={item.id}
                gift={item.gift}
                compliment={item.compliment}
                onRevealed={handleCardRevealed}
                isRevealed={revealedCards.has(item.id)}
              />
            ))}
          </div>
        </section>

        {/* Continue Button */}
        <section className="text-center pb-8">
          <div className={`transition-all duration-700 ${showContinue ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-romantic-gold animate-pulse" />
              <span className="text-sm text-muted-foreground font-body">All gifts revealed!</span>
              <Sparkles className="w-5 h-5 text-romantic-gold animate-pulse" />
            </div>
            <Button
              onClick={() => navigate('/cake')}
              className="btn-romantic text-lg px-10 py-6 flex items-center gap-3 mx-auto"
            >
              <span>Time to Blow the Candles!</span>
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
          
          {!showContinue && revealedCards.size > 0 && (
            <p className="text-sm text-muted-foreground font-body animate-pulse">
              Keep scratching! {20 - revealedCards.size} more to go... ✨
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default GiftRevealPage;
