import { useEffect, useState } from 'react';
import HeartSticker from './HeartSticker';
import TeddyBear from './TeddyBear';

const LoveLetter = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const letterContent = `My Dearest Tiya,
  I'm extremely sorry i ruined your birthday last year by breaking up with you on your special day 😔.I know i have ruined so many speacial moments of yours but believe me it was never my intention to hurt you.I became overpossessive just ruined your special day. This year again i planned so many surprises for your birthday. but started late and i thought i won't be able to complete them in time. i'm writing this letter and right now the time is 4:37 am on 21st Jan 2026. Just to implement all the plans i have in mind for you, i stayed awake whole night. I'm really sorry for all the pain i have caused you in past.

  You're not my princess or my queen you're my world, you're my godess and i want to live in a happy world. you're such a understanding girlfriend. believe me people have there criteria about their girlfriend but i was never having any such criteria but if this is my luck or what i got you that i never thought of. you're exactly what i wanted in my life. you're so caring, loving, beautiful, understaning, smart and what not you even care for my money that i don't care while i'm spending on you, you gifted me the guradian bell, you came to varanasi just to me. I really love you and i want you to be my loop invariant (Don't care it is a computer science term which means a property that never changes in a loop) and for me the loop is the loop of lifes i want you in every incarnation of mine, i want to live with you only, i want to have babies with you, i want to go to heaven with you,i want to save you from the devils in the hell. i want to remove spikes from fish for you, i want to peel a orange for you, i want to love you for the eternity. 
  
  Forever and always yours,
  Jiituu
  `;

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
            <h1 className="text-3xl md:text-4xl font-cursive text-center text-foreground mb-8">
              A Love Letter For You
            </h1>

            <div className="space-y-4 font-parisienne text-foreground leading-relaxed whitespace-pre-line">
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
