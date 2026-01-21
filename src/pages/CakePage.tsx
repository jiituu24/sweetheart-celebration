import { useNavigate } from 'react-router-dom';
import FloatingElements from '@/components/FloatingElements';
import BirthdayCake from '@/components/BirthdayCake';
import TeddyBear from '@/components/TeddyBear';
import HeartSticker from '@/components/HeartSticker';
import { Cake } from 'lucide-react';

const CakePage = () => {
  const navigate = useNavigate();

  const handleCandlesBlown = () => {
    setTimeout(() => {
      navigate('/gifts');
    }, 2000);
  };

  return (
    <div className="min-h-screen romantic-gradient relative overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Cake className="w-10 h-10 text-primary animate-float" />
            <h1 className="text-3xl md:text-4xl font-pacifico text-foreground">
              Make a Wish!
            </h1>
            <Cake className="w-10 h-10 text-primary animate-float" style={{ animationDelay: '0.5s' } as React.CSSProperties} />
          </div>
          <p className="text-lg text-muted-foreground font-pacifico">
            Close your eyes, make a wish, and blow out the candles! 🕯️
          </p>
        </header>

        {/* Decorations */}
        <div className="relative max-w-xl mx-auto">
          <TeddyBear className="absolute top-0 -left-16 animate-float hidden lg:block" size={70} />
          <TeddyBear className="absolute top-0 -right-16 animate-float hidden lg:block" size={70} />
          <HeartSticker variant="sparkle" size={50} className="absolute -top-8 left-1/4 animate-float" />
          <HeartSticker variant="filled" size={35} className="absolute -top-4 right-1/4 animate-float" style={{ animationDelay: '0.7s' } as React.CSSProperties} />
        </div>

        {/* Cake */}
        <section className="flex justify-center items-center py-16">
          <BirthdayCake candleCount={20} onAllBlown={handleCandlesBlown} />
        </section>

        {/* Ambient messages */}
        <div className="max-w-md mx-auto text-center">
          <p className="font-oswald text-muted-foreground italic mb-4">
          . May all your wishes come true today and always."
          </p>
          <div className="flex justify-center gap-2">
            <HeartSticker variant="filled" size={20} />
            <HeartSticker variant="outline" size={20} />
            <HeartSticker variant="filled" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakePage;
