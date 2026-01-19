import FloatingElements from '@/components/FloatingElements';
import LoveLetter from '@/components/LoveLetter';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Heart } from 'lucide-react';

const LetterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen romantic-gradient relative overflow-hidden">
      <FloatingElements />
      
      <div className="relative z-10">
        <LoveLetter />
        
        {/* Back to start */}
        <div className="text-center pb-12">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-muted-foreground hover:text-primary flex items-center gap-2 mx-auto"
          >
            <Home className="w-5 h-5" />
            <span>Back to Start</span>
            <Heart className="w-4 h-4" fill="currentColor" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LetterPage;
