import { useState } from 'react';
import { Lock, Heart, Key } from 'lucide-react';
import HeartSticker from './HeartSticker';

interface SecretGateProps {
  secretKey: string;
  onSuccess: () => void;
}

const SecretGate = ({ secretKey, onSuccess }: SecretGateProps) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.toLowerCase().trim() === secretKey.toLowerCase()) {
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setError(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`card-romantic max-w-md w-full text-center relative
        ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
        style={{
          animation: shake ? 'shake 0.5s ease-in-out' : undefined,
        }}
      >
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
        `}</style>
        
        <HeartSticker variant="sparkle" size={60} className="absolute -top-8 left-1/2 -translate-x-1/2" />
        
        <div className="mt-8 mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-romantic-blush flex items-center justify-center mb-4">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-display text-foreground mb-2">
            The Secret Gate
          </h2>
          <p className="text-muted-foreground font-body">
            What is the magic Sentence that unlocks my heart?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter the secret key..."
              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 font-body text-center
                bg-background text-foreground placeholder:text-muted-foreground
                focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all
                ${error ? 'border-destructive' : 'border-border focus:border-primary'}`}
            />
          </div>
          
          {error && (
            <p className="text-destructive text-sm font-body animate-fade-in-up">
              That's not quite right... Try again! 💕
            </p>
          )}

          <button
            type="submit"
            className="btn-romantic w-full flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5" fill="currentColor" />
            <span>Unlock</span>
          </button>
        </form>

        <p className="mt-6 text-xs text-muted-foreground font-body">
          Hint: Phle din deal hui thi ye sentence use nhi krenge it's one of my stickers i use to tease you  💝
        </p>
      </div>
    </div>
  );
};

export default SecretGate;
