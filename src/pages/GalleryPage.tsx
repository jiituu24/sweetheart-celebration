import { useNavigate } from 'react-router-dom';
import FloatingElements from '@/components/FloatingElements';
import MemoryGallery from '@/components/MemoryGallery';
import TeddyBear from '@/components/TeddyBear';
import { Button } from '@/components/ui/button';
import { ArrowRight, Images } from 'lucide-react';

const GalleryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen romantic-gradient relative overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Images className="w-10 h-10 text-primary animate-float" />
            <h1 className="text-3xl md:text-4xl font-display text-foreground">
              Your Precious Memories
            </h1>
            <Images className="w-10 h-10 text-primary animate-float" style={{ animationDelay: '0.5s' } as React.CSSProperties} />
          </div>
          <p className="text-lg text-muted-foreground font-body">
            A gallery of moments that make my heart smile 📸
          </p>
        </header>

        {/* Gallery */}
        <section className="max-w-5xl mx-auto mb-12">
          <MemoryGallery />
        </section>

        {/* Continue Button */}
        <section className="text-center pb-12">
          <Button
            onClick={() => navigate('/secret')}
            className="btn-romantic text-lg px-10 py-6 flex items-center gap-3 mx-auto"
          >
            <span>Enter the Secret Gate</span>
            <ArrowRight className="w-6 h-6" />
          </Button>
        </section>

        {/* Bottom decoration */}
        <div className="flex justify-center gap-8 pb-8">
          <TeddyBear size={50} className="animate-float" />
          <TeddyBear size={50} className="animate-float" style={{ animationDelay: '0.5s' } as React.CSSProperties} />
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
