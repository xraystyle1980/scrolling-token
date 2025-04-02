// App Home Page
'use client';

import dynamic from 'next/dynamic';
import sharedStyles from '@/styles/shared.module.css';
import HeroAbout from '@/components/sections/HeroAbout';
import { useEffect } from 'react';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import Scene3D from './Scene3D';
import { gsap } from 'gsap-trial';
import { ScrollToPlugin } from 'gsap-trial/ScrollToPlugin';
import ContactMe from '@/components/sections/ContactMe';

// Register plugins
gsap.registerPlugin(ScrollToPlugin);

// Define interface for Scene3D props
interface Scene3DProps {
  scroll: number;
  currentSection: number;
}

// Dynamically import Three.js components with no SSR
const Scene3DComponent = dynamic<Scene3DProps>(() => import('./Scene3D'), {
  ssr: false,
});

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        // Use GSAP for smooth scrolling
        gsap.to(window, { duration: 1, scrollTo: hash, ease: 'power2.out' });
      }
    }
  }, []);

  return (
    <main className={sharedStyles.main}>
      {/* Hero Section */}
      <HeroAbout />
     
    </main>
  );
}