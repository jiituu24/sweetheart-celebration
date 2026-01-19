import React from 'react';

interface HeartStickerProps {
  className?: string;
  size?: number;
  variant?: 'filled' | 'outline' | 'sparkle';
  style?: React.CSSProperties;
}

const HeartSticker = ({ className = '', size = 40, variant = 'filled', style }: HeartStickerProps) => {
  if (variant === 'sparkle') {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 50 50" fill="none" style={style}>
        <path
          d="M25 45 L21 41 C10 31 3 24 3 16 C3 9 8 4 15 4 C19 4 23 6 25 9 C27 6 31 4 35 4 C42 4 47 9 47 16 C47 24 40 31 29 41 Z"
          fill="url(#heartGradient)"
        />
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF69B4" />
            <stop offset="100%" stopColor="#FF1493" />
          </linearGradient>
        </defs>
        {/* Sparkles */}
        <circle cx="12" cy="8" r="2" fill="#FFD700" />
        <circle cx="40" cy="12" r="1.5" fill="#FFD700" />
        <circle cx="8" cy="28" r="1.5" fill="#FFD700" />
        <path d="M42 25 L44 23 L46 25 L44 27 Z" fill="#FFD700" />
      </svg>
    );
  }

  if (variant === 'outline') {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 50 50" fill="none" style={style}>
        <path
          d="M25 45 L21 41 C10 31 3 24 3 16 C3 9 8 4 15 4 C19 4 23 6 25 9 C27 6 31 4 35 4 C42 4 47 9 47 16 C47 24 40 31 29 41 Z"
          stroke="#FF69B4"
          strokeWidth="3"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg className={className} width={size} height={size} viewBox="0 0 50 50" fill="none" style={style}>
      <path
        d="M25 45 L21 41 C10 31 3 24 3 16 C3 9 8 4 15 4 C19 4 23 6 25 9 C27 6 31 4 35 4 C42 4 47 9 47 16 C47 24 40 31 29 41 Z"
        fill="#FF69B4"
      />
    </svg>
  );
};

export default HeartSticker;
