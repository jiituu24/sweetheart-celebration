import { useState } from 'react';
import HeartSticker from './HeartSticker';
import memory1 from '@/assets/memory-1.jpg';
import memory2 from '@/assets/memory-2.jpg';
import memory3 from '@/assets/memory-3.jpg';
import memory4 from '@/assets/memory-4.jpg';
import memory5 from '@/assets/memory-5.jpg';
import memory6 from '@/assets/memory-6.jpg';

interface Photo {
  id: number;
  url: string;
  caption?: string;
}

const PhotoCollage = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const photos: Photo[] = [
    { id: 1, url: memory1, caption: 'Our first adventure' },
    { id: 2, url: memory2, caption: 'Coffee dates' },
    { id: 3, url: memory3, caption: 'Sunset together' },
    { id: 4, url: memory4, caption: 'Laughing moments' },
    { id: 5, url: memory5, caption: 'Sweet memories' },
    { id: 6, url: memory6, caption: 'Forever yours' },
  ];

  return (
    <div className="relative">
      <HeartSticker 
        variant="sparkle" 
        size={50} 
        className="absolute -top-6 -left-6 animate-float z-10" 
      />
      <HeartSticker 
        variant="filled" 
        size={35} 
        className="absolute -bottom-4 -right-4 animate-float z-10" 
        style={{ animationDelay: '1s' }}
      />
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 cursor-pointer
              ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              ${hoveredId === photo.id ? 'scale-105 z-10 shadow-2xl' : 'scale-100'}
            `}
            style={{ 
              animationDelay: `${index * 0.1}s`,
            }}
            onMouseEnter={() => setHoveredId(photo.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className={`aspect-square ${index === 0 ? 'md:aspect-[4/3]' : ''} bg-romantic-blush`}>
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent 
                flex items-end p-4 transition-opacity duration-300
                ${hoveredId === photo.id ? 'opacity-100' : 'opacity-0'}`}
            >
              <p className="text-primary-foreground font-body text-sm">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoCollage;
