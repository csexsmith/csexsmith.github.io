import { useState, useEffect } from 'react';

const useScrollVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(true); // Hide when scrolling down
      } else {
        setIsVisible(false); // Show when scrolling up
      }
      setLastScrollY(window.scrollY); // Update last scroll position
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
    };
  }, [lastScrollY]);

  return isVisible;
};

export default useScrollVisibility;