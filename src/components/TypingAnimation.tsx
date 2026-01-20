import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const TypingAnimation = ({ text, speed = 100, onComplete }: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const words = text.split(' ');

  useEffect(() => {
    if (words.length === 0) {
      if (onComplete) onComplete();
      return;
    }

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayedText((prev) => (prev ? `${prev} ${words[currentIndex]}` : words[currentIndex]));
        currentIndex++;
      } else {
        clearInterval(intervalId);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, onComplete]);

  return (
    <p className="font-body text-foreground leading-relaxed">
      {displayedText}
      <span className="animate-pulse">|</span>
    </p>
  );
};

export default TypingAnimation;
