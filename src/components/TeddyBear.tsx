import React from 'react';

interface TeddyBearProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

const TeddyBear = ({ className = '', size = 60, style }: TeddyBearProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={style}
    >
      {/* Ears */}
      <circle cx="25" cy="25" r="15" fill="#D2691E" />
      <circle cx="25" cy="25" r="8" fill="#F4A460" />
      <circle cx="75" cy="25" r="15" fill="#D2691E" />
      <circle cx="75" cy="25" r="8" fill="#F4A460" />
      
      {/* Head */}
      <circle cx="50" cy="45" r="30" fill="#D2691E" />
      
      {/* Face */}
      <ellipse cx="50" cy="52" rx="18" ry="15" fill="#F4A460" />
      
      {/* Eyes */}
      <circle cx="40" cy="40" r="5" fill="#2C1810" />
      <circle cx="60" cy="40" r="5" fill="#2C1810" />
      <circle cx="42" cy="38" r="2" fill="white" />
      <circle cx="62" cy="38" r="2" fill="white" />
      
      {/* Nose */}
      <ellipse cx="50" cy="50" rx="5" ry="4" fill="#2C1810" />
      
      {/* Mouth */}
      <path d="M45 56 Q50 62 55 56" stroke="#2C1810" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* Blush */}
      <circle cx="35" cy="50" r="4" fill="#FFB6C1" opacity="0.6" />
      <circle cx="65" cy="50" r="4" fill="#FFB6C1" opacity="0.6" />
      
      {/* Body */}
      <ellipse cx="50" cy="85" rx="25" ry="18" fill="#D2691E" />
      
      {/* Belly */}
      <ellipse cx="50" cy="85" rx="15" ry="12" fill="#F4A460" />
      
      {/* Heart on belly */}
      <path d="M50 80 L47 77 C44 74 44 70 47 70 C49 70 50 72 50 72 C50 72 51 70 53 70 C56 70 56 74 53 77 Z" fill="#FF69B4" />
    </svg>
  );
};

export default TeddyBear;
