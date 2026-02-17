import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    window.matchMedia(query).addEventListener('change', listener);
    return () =>
      window.matchMedia(query).removeEventListener('change', listener);
  }, [query]);

  return matches;
};

export const useBreakpoint = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const isLargeDesktop = useMediaQuery('(min-width: 1440px)');

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isSmallScreen: isMobile || isTablet,
  };
};
