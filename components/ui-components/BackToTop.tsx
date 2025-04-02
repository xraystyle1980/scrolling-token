'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components/icons/Icon';
import styles from './BackToTop.module.css';
import sharedStyles from '@/styles/shared.module.css';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled more than 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={clsx(
        styles.backToTop,
        sharedStyles.buttonBase,
        sharedStyles.primaryButton,
        isVisible ? styles.visible : ''
      )}
      aria-label="Back to top"
    >
      <span>Back to Top</span>
      <span><Icon name="arrow-up" className={sharedStyles.buttonIcon} /></span>
    </button>
  );
} 