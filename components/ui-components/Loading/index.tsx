'use client'

import React from 'react';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingText}>
        {'Loading...'.split('').map((char, i) => (
          <span 
            key={i} 
            className={styles.letter} 
            style={{ 
              animationDelay: `${i * 0.15}s`,
              opacity: 0,
              display: 'inline-block',
              animation: `${styles.fadeInUp} 0.5s ease forwards ${i * 0.15}s`,
              ['--travel-distance' as string]: `${20 + (i * 4)}px`
            } as React.CSSProperties}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}