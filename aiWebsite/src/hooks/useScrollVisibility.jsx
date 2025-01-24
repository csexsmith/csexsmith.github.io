import { useState, useEffect } from 'react';

const useScrollVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Show the navbar if the mouse is near the top of the screen
      if (e.clientY < 50) { // Adjust the threshold (e.g., 50px from the top)
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return isVisible;
};

export default useScrollVisibility;