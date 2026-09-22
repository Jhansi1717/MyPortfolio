import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[], offset: number = 200): string {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop - offset;
          if (scrollY >= top) {
            setActiveId(id);
            return;
          }
        }
      }

      if (scrollY < 100) {
        setActiveId('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}
