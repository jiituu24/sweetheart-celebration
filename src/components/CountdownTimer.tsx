import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

const CountdownTimer = ({ targetDate, onComplete }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsComplete(true);
        onComplete?.();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="timer-box">
      <span className="text-3xl md:text-4xl font-display font-bold text-primary">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide mt-1">
        {label}
      </span>
    </div>
  );

  if (isComplete) {
    return (
      <div className="text-center animate-pulse-glow p-6 rounded-2xl">
        <p className="text-2xl font-display text-primary">🎉 The moment has arrived! 🎉</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
      <TimeBox value={timeLeft.days} label="Days" />
      <span className="text-3xl font-display text-primary self-center">:</span>
      <TimeBox value={timeLeft.hours} label="Hours" />
      <span className="text-3xl font-display text-primary self-center">:</span>
      <TimeBox value={timeLeft.minutes} label="Minutes" />
      <span className="text-3xl font-display text-primary self-center">:</span>
      <TimeBox value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default CountdownTimer;
