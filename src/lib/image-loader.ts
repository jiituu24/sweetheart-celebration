// src/lib/image-loader.ts

export const loadMemories = () => {
  const modules = import.meta.glob('/src/assets/{1..100}.jpg', { eager: true });
  const memories = Object.entries(modules).map(([path, module]) => {
    const id = parseInt(path.match(/(\d+)\.jpg$/)?.[1] || '0', 10);
    return {
      id,
      imageUrl: (module as any).default,
      message: 'Creating magic every day',
    };
  }).sort((a, b) => a.id - b.id);
  
  return memories;
};
