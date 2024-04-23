import React, { useState, useEffect } from 'react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Add a scroll event listener to track scrolling
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsVisible(scrollTop > 100); // Show the button when scrolling down 100px or more
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up the scroll event listener when component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // Scroll to the top of the page smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className='fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
          onClick={scrollToTop}
        >
          Scroll to Top
        </button>
      )}
    </>
  );
};
