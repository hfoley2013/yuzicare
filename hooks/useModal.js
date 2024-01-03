// Create a file named useModal.js
import { useState, useEffect } from 'react';

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      // Prevent scrolling when the modal is visible
      document.body.style.overflow = 'hidden';
    } else {
      // Reset the body's overflow property
      document.body.style.overflow = 'auto';
    }

    // Clean up the effect when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  return { isVisible, openModal, closeModal };
};

export default useModal;
