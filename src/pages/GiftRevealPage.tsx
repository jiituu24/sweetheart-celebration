import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingElements from '@/components/FloatingElements';
import MysteryGift from '@/components/MysteryGift';
import TeddyBear from '@/components/TeddyBear';
import HeartSticker from '@/components/HeartSticker';
import { Button } from '@/components/ui/button';
import { ArrowRight, Gift } from 'lucide-react';

const GiftRevealPage = () => {
  const navigate = useNavigate();
  const [allRevealed, setAllRevealed] = useState(false);

  const gifts = [
    { id: 1, title: 'Endless Hugs', description: 'A lifetime supply of warm embraces', icon: 'heart' as const },
    { id: 2, title: 'Adventure Awaits', description: 'A trip to wherever your heart desires', icon: 'star' as const },
    { id: 3, title: 'Sweet Surprises', description: 'Daily treats and random acts of love', icon: 'sparkle' as const },
    { id: 4, title: 'Quality Time', description: 'Dedicated moments just for us', icon: 'heart' as const },
    { id: 5, title: 'Love Letters', description: 'Handwritten notes of affection', icon: 'heart' as const },
    { id: 6, title: 'Forever Promise', description: 'My heart, always and forever yours', icon: 'sparkle' as const },
  ];

  return (
    <div className="min-h-screen romantic-gradient relative overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Gift className="w-10 h-10 text-primary animate-float" />
            <h1 className="text-3xl md:text-4xl font-display text-foreground">
              Mystery Gifts
            </h1>
            <Gift className="w-10 h-10 text-primary animate-float" style={{ animationDelay: '0.5s' } as React.CSSProperties} />
          </div>
          <p className="text-lg text-muted-foreground font-body">
            Click each box to reveal your special surprises! 🎁
          </p>
        </header>

        {/* Decorations */}
        <div className="relative">
          <TeddyBear className="absolute -top-4 -left-4 animate-float hidden md:block" size={60} />
          <HeartSticker variant="sparkle" size={45} className="absolute -top-2 -right-2 animate-float" />
        </div>

        {/* Gift Grid */}
        <section className="max-w-4xl mx-auto mb-12">
          <MysteryGift gifts={gifts} onAllRevealed={() => setAllRevealed(true)} />
        </section>

        {/* Continue Button */}
        <section className="text-center pb-12">
          <div className={`transition-all duration-500 ${allRevealed ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2'}`}>
            <Button
              onClick={() => navigate('/cake')}
              className="btn-romantic text-lg px-10 py-6 flex items-center gap-3 mx-auto"
            >
              <span>Continue to Cake</span>
              <ArrowRight className="w-6 h-6" />
            </Button>
            {!allRevealed && (
              <p className="mt-3 text-sm text-muted-foreground font-body">
                Open all gifts to unlock the full magic! ✨
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default GiftRevealPage;
