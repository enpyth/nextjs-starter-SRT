import { useEffect, useState } from 'react';

export function useMediaQuery() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Ensure we're in the browser before accessing window
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsOpen(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsOpen(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return { isOpen };
}
