import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  type: 'petal' | 'leaf' | 'balloon';
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      
      // Petals
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          type: 'petal',
          left: Math.random() * 100,
          size: 15 + Math.random() * 15,
          duration: 8 + Math.random() * 6,
          delay: Math.random() * 10,
          color: ['#FFB6C1', '#FFC0CB', '#FFD6E0', '#FFDEE2'][Math.floor(Math.random() * 4)],
        });
      }
      
      // Leaves
      for (let i = 15; i < 25; i++) {
        newElements.push({
          id: i,
          type: 'leaf',
          left: Math.random() * 100,
          size: 20 + Math.random() * 15,
          duration: 10 + Math.random() * 5,
          delay: Math.random() * 8,
          color: ['#D2691E', '#CD853F', '#B8860B', '#DAA520'][Math.floor(Math.random() * 4)],
        });
      }
      
      // Balloons
      for (let i = 25; i < 32; i++) {
        newElements.push({
          id: i,
          type: 'balloon',
          left: Math.random() * 100,
          size: 30 + Math.random() * 20,
          duration: 15 + Math.random() * 10,
          delay: Math.random() * 12,
          color: ['#FF69B4', '#FF1493', '#DC143C', '#FFD700', '#FF6B6B'][Math.floor(Math.random() * 5)],
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
        animationDuration: `${el.duration}s`,
        animationDelay: `${el.delay}s`,
      }}
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
        animationDuration: `${el.duration}s`,
        animationDelay: `${el.delay}s`,
      }}
      viewBox="0 0 24 24"
      fill={el.color}
    >
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z" />
    </svg>
  );

  const renderBalloon = (el: FloatingElement) => (
    <svg
      key={el.id}
      className="balloon"
      style={{
        left: `${el.left}%`,
        width: el.size,
        height: el.size * 1.3,
        animationDuration: `${el.duration}s`,
        animationDelay: `${el.delay}s`,
      }}
      viewBox="0 0 24 36"
    >
      <ellipse cx="12" cy="10" rx="10" ry="12" fill={el.color} />
      <path d="M12 22 L12 36" stroke={el.color} strokeWidth="1" />
      <ellipse cx="12" cy="22" rx="3" ry="2" fill={el.color} opacity="0.7" />
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
          case 'balloon':
            return renderBalloon(el);
          default:
            return null;
        }
      })}
    </div>
  );
};

export default FloatingElements;
