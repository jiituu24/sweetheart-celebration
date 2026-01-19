import { useEffect, useState } from 'react';
import HeartSticker from './HeartSticker';
import TeddyBear from './TeddyBear';

const LoveLetter = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const letterContent = `My Dearest Love,

On this special day, I want you to know just how much you mean to me. Every moment we've shared has been a precious gift that I treasure deep in my heart.

From the first day we met, you've brought so much joy, laughter, and love into my life. Your smile lights up my darkest days, and your presence makes everything feel right in the world.

Thank you for being my partner, my confidant, my best friend, and my greatest love. You make me want to be a better person every single day.

As we celebrate another year of your beautiful existence, I want you to know that my love for you grows stronger with each passing moment. You are my today and all of my tomorrows.

Happy Birthday, my love. May this year bring you all the happiness, success, and love that you so richly deserve.

Forever and always yours,
With all my heart ❤️`;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 md:p-8
      transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative max-w-2xl w-full">
        {/* Decorations */}
        <TeddyBear 
          className="absolute -top-16 -left-8 md:-left-16 animate-float hidden md:block" 
          size={80} 
        />
        <TeddyBear 
          className="absolute -bottom-16 -right-8 md:-right-16 animate-float hidden md:block" 
          size={80} 
        />
        <HeartSticker 
          variant="sparkle" 
          size={50} 
          className="absolute -top-6 right-10 animate-float" 
        />
        <HeartSticker 
          variant="filled" 
          size={30} 
          className="absolute bottom-20 -left-4 animate-float" 
          style={{ animationDelay: '0.5s' } as React.CSSProperties}
        />

        {/* Letter */}
        <div className="parchment rounded-lg p-8 md:p-12 relative overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-romantic-gold opacity-50" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-romantic-gold opacity-50" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-romantic-gold opacity-50" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-romantic-gold opacity-50" />

          {/* Wax seal */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <HeartSticker variant="filled" size={30} className="text-primary-foreground" />
          </div>

          <div className="mt-8 space-y-4">
            <h1 className="text-3xl md:text-4xl font-display text-center text-foreground mb-8">
              A Love Letter For You
            </h1>

            <div className="space-y-4 font-body text-foreground leading-relaxed whitespace-pre-line">
              {letterContent.split('\n\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Bottom decoration */}
          <div className="mt-8 flex justify-center gap-2">
            <HeartSticker variant="filled" size={20} />
            <HeartSticker variant="outline" size={20} />
            <HeartSticker variant="filled" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveLetter;
