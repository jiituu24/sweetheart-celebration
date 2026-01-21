import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingElements from '@/components/FloatingElements';
import PhotoCollage from '@/components/PhotoCollage';
import CountdownTimer from '@/components/CountdownTimer';
import CountUpTimer from '@/components/CountUpTimer';
import TeddyBear from '@/components/TeddyBear';
import HeartSticker from '@/components/HeartSticker';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [countdownComplete, setCountdownComplete] = useState(false);
  
  // Target date: January 22, 2026
  const targetDate = new Date('2026-01-22T00:00:00');
  
  // Start date: August 25, 2024
  const startDate = new Date('2024-08-25T00:00:00');

  const birthdayNote = `
    To the most amazing person in my life, Every day with
    you is a blessing. Your smile brightens my world, 
    and your love fills my heart with endless joy. 
    Can't wait to celebrate this special day with you! 💕
  `;

  return (
    <div className="min-h-screen romantic-gradient relative overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <TeddyBear size={50} className="animate-float" />
            <h1 className="text-4xl md:text-5xl font-parisienne text-foreground">
              <br/>Happy Birthday, My Love Tiya
            </h1>
            <TeddyBear size={50} className="animate-float" style={{ animationDelay: '0.5s' } as React.CSSProperties} />
          </div>
            <p className="text-lg text-muted-foreground font-lobster">
            Created By <a href="https://instagram.com/jiituu.24" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@jiituu.24</a> with pure love for <a href="https://instagram.com/_acheronsmermaid" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@_acheronsmermaid</a> 💕
            </p>
        </header>

        {/* Photo Collage Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-sacramento text-center mb-8 text-foreground">
            ✨ My Beautiful Tiya ✨
          </h2>
          <PhotoCollage />
        </section>

        {/* Countdown Timer */}
        <section className="mb-16">
          <div className="card-romantic max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <HeartSticker variant="sparkle" size={50} />
            </div>
            <h2 className="text-2xl font-pacifico text-center mb-6 text-foreground">
              Countdown to Your Special Day
            </h2>
            <CountdownTimer 
              targetDate={targetDate} 
              onComplete={() => setCountdownComplete(true)} 
            />
            
            {/* Birthday Note */}
            <div className="mt-8 p-6 bg-romantic-blush/50 rounded-xl">
              <h3 className="font-pacifico text-lg text-center text-foreground mb-0">
                💝 A Beautiful Birthday Note 💝
              </h3>           
              <p className="font-pacifico text-muted-foreground italic text-center whitespace-pre-line text-lg">
                {birthdayNote}
              </p>
            </div>
          </div>
        </section>

        {/* Count Up Timer */}
        <section className="mb-16">
          <div className="card-romantic max-w-2xl mx-auto">
            <h2 className="text-2xl font-pacifico text-center mb-6 text-foreground">
              💑 Time We've Spent Together 💑
            </h2>
            <CountUpTimer startDate={startDate} />
          </div>
        </section>

        {/* Proceed Button */}
        <section className="text-center pb-12">
          {countdownComplete ? (
            <div className="animate-fade-in-up">
              <Button
                onClick={() => navigate('/cake')}
                className="btn-romantic text-lg px-10 py-6 flex items-center gap-3 mx-auto"
              >
                <Heart className="w-6 h-6" fill="currentColor" />
                <span>Continue the Celebration</span>
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground font-body italic">
              The magic button will appear when the countdown ends... ✨
            </p>
          )}
          
          {/* For testing - remove in production */}
          {/* <Button
            variant="ghost"
            onClick={() => navigate('/cake')}
            className="mt-4 text-muted-foreground hover:text-primary"
          >
            (Preview next page)
          </Button> */}

          

              {/* <h3 className="font-display text-lg text-center text-foreground mb-3">
                💝 display 💝
              </h3>
              <h3 className="font-body text-lg text-center text-foreground mb-3">
                💝 body 💝
              </h3>
              <h3 className="font-cursive text-lg text-center text-foreground mb-3">
                💝 cursive 💝
              </h3>
              <h3 className="font-montserrat text-lg text-center text-foreground mb-3">
                💝 montserrat 💝
              </h3>
              <h3 className="font-playfair text-lg text-center text-foreground mb-3">
                💝 playfair 💝
              </h3>
              <h3 className="font-roboto text-lg text-center text-foreground mb-3">
                💝 roboto 💝
              </h3>
              <h3 className="font-poppins text-lg text-center text-foreground mb-3">
                💝 poppins 💝
              </h3><h3 className="font-lora text-lg text-center text-foreground mb-3">
                💝 lora 💝
              </h3>
              <h3 className="font-pacifico  text-lg text-center text-foreground mb-3">
                💝 pacifico 💝
              </h3>
              <h3 className="font-oswald text-lg text-center text-foreground mb-3">
                💝 oswald 💝
              </h3>

              <h3 className="font-caveat text-lg text-center text-foreground mb-3">
                💝 caveat 💝
              </h3>
              <h3 className="font-cinzel text-lg text-center text-foreground mb-3">
                💝 cinzel 💝
              </h3>
              <h3 className="font-sacramento text-lg text-center text-foreground mb-3">
                💝 sacramento 💝
              </h3>
              <h3 className="font-lobster text-lg text-center text-foreground mb-3">
                💝 lobster 💝
              </h3>
              <h3 className="font-pinyon text-lg text-center text-foreground mb-3">
                💝 pinyon 💝
              </h3>
              <h3 className="font- text-lg text-center text-foreground mb-3">
                💝 fredoka 💝
              </h3>
              <h3 className="font- text-lg text-center text-foreground mb-3">
                💝 italianno 💝
              </h3>
              <h3 className="font-parisienne text-lg text-center text-foreground mb-3">
                💝 parisienne 💝
              </h3>    */}
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
