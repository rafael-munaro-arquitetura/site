import { useEffect, useState } from 'react';

/**
 * Hook para detectar media queries de forma reativa
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Suporte para navegadores antigos
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      // @ts-ignore
      mediaQuery.addListener(handler);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        // @ts-ignore
        mediaQuery.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
};

// Hooks pré-configurados para breakpoints comuns
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)');
export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
export const useDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)');
