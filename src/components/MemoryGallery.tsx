import { useState } from 'react';
import HeartSticker from './HeartSticker';
import TeddyBear from './TeddyBear';
import { loadMemories } from '@/lib/image-loader';

interface Memory {
  id: number;
  imageUrl: string;
  message: string;
}

const MemoryGallery = () => {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);

  const memories: Memory[] = loadMemories();

  const loveMessages = [
    "Every moment with you is a treasure I hold dear in my heart.",
    "You make ordinary days feel extraordinary just by being you.",
    "In your smile, I find my home. In your eyes, I see my future.",
    "Thank you for being my person, my best friend, my everything.",
  ];

  return (
    <div className="space-y-12">
      {/* Decorations */}
      <div className="relative">
        <TeddyBear className="absolute -top-8 -left-4 animate-float" size={50} />
        <HeartSticker variant="sparkle" size={40} className="absolute -top-4 -right-4 animate-float" />
        
        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {memories.map((memory) => (
            <div
              key={memory.id}
              className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500
                ${selectedMemory === memory.id ? 'ring-4 ring-primary shadow-2xl scale-105 z-10' : 'hover:shadow-xl hover:scale-102'}`}
              onClick={() => setSelectedMemory(selectedMemory === memory.id ? null : memory.id)}
            >
              <div className="aspect-square bg-romantic-blush">
                <img
                  src={memory.imageUrl}
                  alt="Memory"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent
                flex items-end p-4 transition-opacity duration-300
                ${selectedMemory === memory.id ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-primary-foreground font-body text-sm italic">
                  "{memory.message}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Love Messages */}
      <div className="space-y-6">
        <h3 className="text-2xl font-display text-center text-foreground">
          💝 Messages from the Heart 💝
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {loveMessages.map((message, index) => (
            <div
              key={index}
              className="card-romantic p-6 relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <HeartSticker 
                variant="outline" 
                size={25} 
                className="absolute top-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity" 
              />
              <p className="font-body text-foreground italic leading-relaxed">
                "{message}"
              </p>
              <div className="mt-4 flex justify-end">
                <span className="text-primary text-sm">— With all my love ❤️</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryGallery;
