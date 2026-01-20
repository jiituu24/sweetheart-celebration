// src/lib/image-loader.ts

const memoryMessages: { [key: number]: string } = {
  1: "Your smile is my favorite thing to see.",
  2: "Lost in the beauty of your eyes.",
  3: "Every moment with you feels like a dream.",
  4: "You have a way of making everything better.",
  5: "A picture-perfect moment with my perfect girl.",
  6: "Your grace and elegance are unmatched.",
  7: "The way you look at the world is so inspiring.",
  8: "You shine brighter than any star.",
  9: "Your laughter is music to my ears.",
  10: "So effortlessly beautiful.",
  11: "You carry yourself with such poise.",
  12: "A quiet moment, a beautiful soul.",
  13: "Your playful spirit is so captivating.",
  14: "The definition of grace.",
  15: "You make every day an adventure.",
  16: "Your strength and beauty go hand in hand.",
  17: "A thoughtful pose from a beautiful mind.",
  18: "You have a heart of gold.",
  19: "Simply stunning, inside and out.",
  20: "Your happiness is my happiness.",
  21: "You light up every room you enter.",
  22: "A pose that speaks a thousand words.",
  23: "Your kindness radiates from you.",
  24: "So much beauty in one person.",
  25: "You are a work of art.",
  26: "Your confidence is so attractive.",
  27: "A moment of pure elegance.",
  28: "You have the most beautiful soul.",
  29: "Every angle is your best angle.",
  30: "You make my world so much more beautiful.",
  31: "A classic beauty.",
  32: "Your charm is irresistible.",
  33: "You are my sunshine on a cloudy day.",
  34: "The epitome of style and grace.",
  35: "You have a timeless beauty.",
  36: "Your spirit is as beautiful as you are.",
  37: "A captivating glance.",
  38: "You are more than I ever dreamed of.",
  39: "Your beauty is both fierce and gentle.",
  40: "A pose that captures your wonderful personality.",
  41: "You are my greatest inspiration.",
  42: "My love for you grows more each day."
};

export const loadMemories = () => {
  const modules = import.meta.glob('/src/assets/*.jpg', { eager: true });
  const memories = Object.entries(modules).map(([path, module]) => {
    const filename = path.split('/').pop();
    const match = filename?.match(/^(\d+)\.jpg$/);
    
    if (!match) return null;

    const id = parseInt(match[1], 10);
    if (id < 1 || id > 42) return null;

    return {
      id,
      imageUrl: (module as any).default,
      message: memoryMessages[id] || "You make every moment special.",
    };
  })
  .filter((memory): memory is { id: number; imageUrl: string; message: string } => memory !== null)
  .sort((a, b) => a.id - b.id);
  
  return memories;
};
