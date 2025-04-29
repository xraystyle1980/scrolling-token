'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register the plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const smootherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !smootherRef.current) return;

    const smoother = ScrollSmoother.create({
      wrapper: smootherRef.current,
      content: smootherRef.current.querySelector('[data-scroll-content]'),
      smooth: 1.5, // Controls the smoothness (higher value = slower)
      effects: true, // Enables ScrollTrigger animations inside ScrollSmoother
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <div ref={smootherRef} style={{ overflow: 'hidden' }}>
      <div data-scroll-content>{children}</div>
    </div>
  );
}