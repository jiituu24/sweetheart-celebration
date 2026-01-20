import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  type: 'petal' | 'leaf' | 'sparkle' | 'heart';
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  driftX: number;
  driftRotate: number;
}

const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      
      // Dark romantic color palette
      const petalColors = ['#8B2252', '#6B1839', '#A0455A', '#7D3C5E'];
      const leafColors = ['#4A3728', '#5C4033', '#3D2B1F', '#4E3B31'];
      const sparkleColors = ['#9370DB', '#8A6BBE', '#7B68EE', '#6A5ACD'];
      const heartColors = ['#722F37', '#800020', '#8B0000', '#A52A2A'];
      
      // Petals - distributed across viewport
      for (let i = 0; i < 12; i++) {
        newElements.push({
          id: i,
          type: 'petal',
          left: (i * 8.3) + Math.random() * 5, // Evenly distributed with slight randomness
          top: Math.random() * -20,
          size: 12 + Math.random() * 10,
          duration: 25 + Math.random() * 15, // Slower, more gentle
          delay: Math.random() * 20,
          color: petalColors[Math.floor(Math.random() * petalColors.length)],
          driftX: -50 + Math.random() * 100,
          driftRotate: 180 + Math.random() * 360,
        });
      }
      
      // Leaves - distributed across viewport
      for (let i = 12; i < 20; i++) {
        newElements.push({
          id: i,
          type: 'leaf',
          left: ((i - 12) * 12.5) + Math.random() * 8,
          top: Math.random() * -20,
          size: 16 + Math.random() * 12,
          duration: 30 + Math.random() * 15,
          delay: Math.random() * 25,
          color: leafColors[Math.floor(Math.random() * leafColors.length)],
          driftX: -60 + Math.random() * 120,
          driftRotate: 360 + Math.random() * 360,
        });
      }
      
      // Sparkles - magical elements distributed evenly
      for (let i = 20; i < 32; i++) {
        newElements.push({
          id: i,
          type: 'sparkle',
          left: ((i - 20) * 8.3) + Math.random() * 5,
          top: Math.random() * -15,
          size: 8 + Math.random() * 8,
          duration: 20 + Math.random() * 20,
          delay: Math.random() * 30,
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
          driftX: -40 + Math.random() * 80,
          driftRotate: 0,
        });
      }
      
      // Hearts - fewer, more special
      for (let i = 32; i < 38; i++) {
        newElements.push({
          id: i,
          type: 'heart',
          left: ((i - 32) * 16.6) + Math.random() * 10,
          top: Math.random() * -10,
          size: 10 + Math.random() * 8,
          duration: 35 + Math.random() * 15,
          delay: Math.random() * 35,
          color: heartColors[Math.floor(Math.random() * heartColors.length)],
          driftX: -30 + Math.random() * 60,
          driftRotate: -30 + Math.random() * 60,
        });
      }
      
      setElements(newElements);
    };

    generateElements();
  }, []);

  const renderPetal = (el: FloatingElement) => (
    <svg
      key={el.id}
      className="petal"
      style={{
        left: `${el.left}%`,
        width: el.size,
        height: el.size,
        animationDuration: `${el.duration}s, 4s`,
        animationDelay: `${el.delay}s, 0s`,
        '--drift-x': `${el.driftX}px`,
        '--drift-rotate': `${el.driftRotate}deg`,
        opacity: 0.6,
      } as React.CSSProperties}
      viewBox="0 0 24 24"
      fill={el.color}
    >
      <path d="M12 2C8 6 4 10 4 14c0 4 4 8 8 8s8-4 8-8c0-4-4-8-8-12z" />
    </svg>
  );

  const renderLeaf = (el: FloatingElement) => (
    <svg
      key={el.id}
      className="leaf"
      style={{
        left: `${el.left}%`,
        width: el.size,
        height: el.size,
        animationDuration: `${el.duration}s, 5s`,
        animationDelay: `${el.delay}s, 0s`,
        '--drift-x': `${el.driftX}px`,
        '--drift-rotate': `${el.driftRotate}deg`,
        opacity: 0.5,
      } as React.CSSProperties}
      viewBox="0 0 24 24"
      fill={el.color}
    >
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z" />
    </svg>
  );

  const renderSparkle = (el: FloatingElement) => (
    <svg
      key={el.id}
      className="sparkle-float"
      style={{
        left: `${el.left}%`,
        width: el.size,
        height: el.size,
        animationDuration: `${el.duration}s, 6s`,
        animationDelay: `${el.delay}s, 0s`,
        '--drift-x': `${el.driftX}px`,
        '--drift-rotate': '0deg',
        '--sway-amount': '15px',
        opacity: 0.7,
      } as React.CSSProperties}
      viewBox="0 0 24 24"
      fill={el.color}
    >
      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
    </svg>
  );

  const renderHeart = (el: FloatingElement) => (
    <svg
      key={el.id}
      className="petal"
      style={{
        left: `${el.left}%`,
        width: el.size,
        height: el.size,
        animationDuration: `${el.duration}s, 5s`,
        animationDelay: `${el.delay}s, 0s`,
        '--drift-x': `${el.driftX}px`,
        '--drift-rotate': `${el.driftRotate}deg`,
        opacity: 0.5,
      } as React.CSSProperties}
      viewBox="0 0 24 24"
      fill={el.color}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => {
        switch (el.type) {
          case 'petal':
            return renderPetal(el);
          case 'leaf':
            return renderLeaf(el);
          case 'sparkle':
            return renderSparkle(el);
          case 'heart':
            return renderHeart(el);
          default:
            return null;
        }
      })}
    </div>
  );
};

export default FloatingElements;
