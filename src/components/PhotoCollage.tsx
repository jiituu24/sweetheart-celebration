import { useState } from 'react';
import HeartSticker from './HeartSticker';
import memory1 from '@/assets/20.jpg';
import memory2 from '@/assets/10.jpg';
import memory3 from '@/assets/7.jpg';
import memory4 from '@/assets/24.jpg';
import memory5 from '@/assets/1.jpg';
import memory6 from '@/assets/8.jpg';
import memory7 from '@/assets/9.jpg';
import memory8 from '@/assets/11.jpg';
import memory9 from '@/assets/12.jpg';
import memory10 from '@/assets/18.jpg';
import memory11 from '@/assets/22.jpg';
import memory12 from '@/assets/26.jpg';
import memory13 from '@/assets/4.jpg';

interface Photo {
  id: number;
  url: string;
  caption?: string;
}

const PhotoCollage = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const photos: Photo[] = [
    { id: 1, url: memory1, caption: 'Effortless smile, pure grace' },
    { id: 2, url: memory2, caption: 'Grace in blue.' },
    { id: 3, url: memory3, caption: 'Tiny smile, big magic' },
    { id: 4, url: memory4, caption: 'Lioness' },
    { id: 5, url: memory5, caption: 'Beauty in bloom.' },
    { id: 6, url: memory6, caption: 'Safe in My arms' },
    { id: 7, url: memory7, caption: 'In my hostel' },
    { id: 8, url: memory8, caption: 'Diwali with dil wali' },
    { id: 9, url: memory9, caption: 'my dulhaniya' },
    { id: 10, url: memory10, caption: 'Inside my heart' },
    { id: 11, url: memory11, caption: 'My oversized ring' },
    { id: 12, url: memory12, caption: 'Shooting ' },
    { id: 13, url: memory13, caption: 'Holding my arm' },  
  ];

  return (
    <div className="relative">
      <HeartSticker 
        variant="sparkle" 
        size={30} 
        className="absolute -top-6 -left-6 animate-float z-10" 
      />
      <HeartSticker 
        variant="filled" 
        size={25} 
        className="absolute -bottom-4 -right-4 animate-float z-10" 
        style={{ animationDelay: '1s' }}
      />
      
      <div className="grid grid-cols-2 md:grid-cols-8 gap-4 p-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 cursor-pointer
              ${index === 0 ? 'md:col-span-4 md:row-span-4' : index < 5 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'}
              ${hoveredId === photo.id ? 'scale-105 z-10 shadow-2x1' : 'scale-100'}
            `}
            style={{ 
              animationDelay: `${index * 0.1}s`,
            }}
            onMouseEnter={() => setHoveredId(photo.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* <div className={`aspect-square ${index === 0 ? 'md:aspect-[1/1]' : ''} bg-romantic-blush`}> */}
            <div className={`aspect-square ${index === 0 ? 'md:aspect-[1/1]' : ''} bg-romantic-blush`}>
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent 
                flex items-end p-4 transition-opacity duration-300
                ${hoveredId === photo.id ? 'opacity-100' : 'opacity-0'}`}
            >
              <p className="text-primary-foreground font-cursive text-lg">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoCollage;
