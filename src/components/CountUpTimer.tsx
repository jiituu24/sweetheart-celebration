import { useState, useEffect } from 'react';

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountUpTimerProps {
  startDate: Date;
}

const CountUpTimer = ({ startDate }: CountUpTimerProps) => {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const now = new Date();
      const start = new Date(startDate);
      
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      let hours = now.getHours() - start.getHours();
      let minutes = now.getMinutes() - start.getMinutes();
      let seconds = now.getSeconds() - start.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      return { years, months, days, hours, minutes, seconds };
    };

    const timer = setInterval(() => {
      setTimeElapsed(calculateTimeElapsed());
    }, 1000);

    setTimeElapsed(calculateTimeElapsed());

    return () => clearInterval(timer);
  }, [startDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <span className="text-2xl md:text-3xl font-pacifico font-bold text-primary">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );

  return (
    <div className="text-center">
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3">
        <TimeUnit value={timeElapsed.years} label="YY" />
        <span className="text-xl font-display text-primary">:</span>
        <TimeUnit value={timeElapsed.months} label="MM" />
        <span className="text-xl font-display text-primary">:</span>
        <TimeUnit value={timeElapsed.days} label="DD" />
        <span className="text-xl font-display text-primary">:</span>
        <TimeUnit value={timeElapsed.hours} label="HH" />
        <span className="text-xl font-display text-primary">:</span>
        <TimeUnit value={timeElapsed.minutes} label="MIN" />
        <span className="text-xl font-display text-primary">:</span>
        <TimeUnit value={timeElapsed.seconds} label="SS" />
      </div>
      <p className="mt-4 text-lg font-pacifico text-secondary-foreground italic">
        seconds of love spent together 💕
      </p>
    </div>
  );
};

export default CountUpTimer;
