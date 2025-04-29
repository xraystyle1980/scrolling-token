'use client';

import { useRef, useEffect, Suspense, useState } from 'react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import TokenFace from '../3d/TokenFace';
import styles from './HeroAbout.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { Group } from 'three';
import { Icon } from '@/components/icons/Icon';

// Register plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function RotatingToken({ groupRef, onFloatAnimCreated, initialScale }: { 
  groupRef: React.RefObject<Group>;
  onFloatAnimCreated: (anim: gsap.core.Tween) => void;
  initialScale: number;
}) {
  const [xPosition, setXPosition] = useState(0);
  const [scale, setScale] = useState(initialScale);
  const floatAnimRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const updatePositionAndScale = () => {
      const width = window.innerWidth;
      let newPosition;
      let newScale;
      
      if (width > 1200) {
        newPosition = 2.5;      // Slightly outside viewport on large screens
        newScale = 4.125;       // Default scale for large screens
      } else if (width > 1000) {
        newPosition = 2;        // Aligned with text on medium-large screens
        newScale = 3.8;         // Slightly smaller for medium-large screens
      } else if (width > 768) {
        newPosition = 1.5;      // Closer in on tablets
        newScale = 3.5;         // Smaller for tablets
      } else if (width > 400) {
        newPosition = 1;        // Even closer on small devices
        newScale = 3.2;         // Even smaller for mobile
      } else if (width > 320) {
        newPosition = 0.75;     // Closer for mobile
        newScale = 2.8;         // Much smaller for small mobile
      } else {
        newPosition = 0.5;      // Closest position for very small screens
        newScale = 2.5;         // Smallest scale for very small screens
      }
      
      setXPosition(newPosition);
      setScale(newScale);
    };

    // Set initial position and scale
    updatePositionAndScale();

    // Add resize listener
    window.addEventListener('resize', updatePositionAndScale);
    return () => window.removeEventListener('resize', updatePositionAndScale);
  }, []);

  useEffect(() => {
    if (!groupRef.current) return;
    
    const group = groupRef.current;

    // Reset position and kill any existing animations
    if (floatAnimRef.current) {
      floatAnimRef.current.kill();
    }

    // Create and store the bounce animation
    const bounceAnim = gsap.to(group.position, {
      y: 0.35,  // Final resting position
      duration: 1.2,
      ease: "bounce.out",
      delay: 0.5,  // Delay to sync with text
      paused: true, // Start paused
      onComplete: startFloating
    });

    // Start the bounce animation
    bounceAnim.play();

    // Start floating animation
    function startFloating() {
      // Kill any existing floating animation
      if (floatAnimRef.current) {
        floatAnimRef.current.kill();
      }

      // Create new floating animation that continues throughout
      floatAnimRef.current = gsap.to(group.position, {
        y: "+=0.3",  // Float up by 0.3 units
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,  // Go back and forth
        repeat: -1   // Repeat indefinitely
      });

      // Pass the animation reference up
      if (floatAnimRef.current) {
        onFloatAnimCreated(floatAnimRef.current);
      }
    }

    // Cleanup
    return () => {
      if (floatAnimRef.current) {
        floatAnimRef.current.kill();
      }
      bounceAnim.kill();
    };
  }, [onFloatAnimCreated]);

  return (
    <group ref={groupRef} position={[xPosition, 12, 0]} scale={[scale, scale, scale]}>
      <TokenFace />
    </group>
  );
}

export default function HeroAbout() {
  const groupRef = useRef<Group | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const tokenContainerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const floatAnimRef = useRef<gsap.core.Tween | null>(null);
  const [initialScale, setInitialScale] = useState(4.125);

  const handleFloatAnimCreated = (anim: gsap.core.Tween) => {
    floatAnimRef.current = anim;
  };

  // Add responsive scale calculation
  useEffect(() => {
    const updateInitialScale = () => {
      const width = window.innerWidth;
      let newScale;
      
      if (width > 1200) {
        newScale = 4.125;
      } else if (width > 1000) {
        newScale = 3.8;
      } else if (width > 768) {
        newScale = 3.5;
      } else if (width > 400) {
        newScale = 3.2;
      } else if (width > 320) {
        newScale = 2.8;
      } else {
        newScale = 2.5;
      }
      
      setInitialScale(newScale);
    };

    updateInitialScale();
    window.addEventListener('resize', updateInitialScale);
    return () => window.removeEventListener('resize', updateInitialScale);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Get the headline text
      const headline = heroTextRef.current?.querySelector('h1');
      if (!headline) return;

      // Get the pre-split words
      const words = headline.querySelectorAll(`.${styles.splitWord}`);

      // Set initial state
      gsap.set(words, {
        opacity: 0,
        visibility: "hidden"
      });

      // Calculate angle-based movement
      const distance = 200; // Distance to travel
      const angle = 15; // Angle in degrees
      const radians = angle * (Math.PI / 180);
      const xDistance = Math.cos(radians) * distance;
      const yDistance = Math.sin(radians) * distance;

      // Define the motion path
      const path = [
        { x: -xDistance, y: yDistance },  // Start point
        { x: 0, y: 0 }                    // End point
      ];
      
      // Initial Load Animation with Motion Path
      const tl = gsap.timeline({
        delay: 0.2
      });
      
      // Animate each word along the motion path
      words.forEach((word, index) => {
        // Set initial position
        gsap.set(word, {
          x: -xDistance,
          y: yDistance
        });

        tl.to(word, {
          motionPath: {
            path: path,
            autoRotate: false
          },
          opacity: 1,
          visibility: "visible",
          duration: 0.48,
          ease: "power2.out",
          onStart: () => {
            if (headline && index === 0) {
              headline.style.opacity = "1";
            }
          }
        }, index * 0.2);
      });

      // Token Scroll Animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        markers: false,
        scrub: 6,
        pin: tokenContainerRef.current,
        anticipatePin: 1,
        onUpdate: (self: ScrollTrigger) => {
          if (groupRef.current) {
            const progress = self.progress;
            const easedProgress = gsap.parseEase("power3.inOut")(progress);
            
            // Move the container down to align with back to top button
            if (tokenContainerRef.current) {
              const startContainerY = 0;
              const endContainerY = window.innerHeight * 2.15;
              const currentContainerY = gsap.utils.interpolate(startContainerY, endContainerY, easedProgress);
              
              // Continuous horizontal movement
              const startX = 0;
              const endX = -window.innerWidth * 0.5;
              const currentX = gsap.utils.interpolate(startX, endX, easedProgress);
              
              tokenContainerRef.current.style.transform = `translate(${currentX}px, ${currentContainerY}px)`;
            }
            
            // Scale animation with eased progress
            const startScale = initialScale;
            const endScale = initialScale * 0.75;
            const currentScale = gsap.utils.interpolate(startScale, endScale, easedProgress);
            groupRef.current.scale.set(currentScale, currentScale, currentScale);

            // Enhanced rotations with eased progress
            const startRotationX = 0;
            const endRotationX = Math.PI * 2.1;
            const currentRotationX = gsap.utils.interpolate(startRotationX, endRotationX, easedProgress);

            const startRotationY = 0;
            const endRotationY = Math.PI * 2.1;
            const currentRotationY = gsap.utils.interpolate(startRotationY, endRotationY, easedProgress);
            
            const startRotationZ = 0;
            const endRotationZ = Math.PI * 2.1;
            const currentRotationZ = gsap.utils.interpolate(startRotationZ, endRotationZ, easedProgress);

            // Apply all rotations
            groupRef.current.rotation.x = currentRotationX;
            groupRef.current.rotation.y = currentRotationY;
            groupRef.current.rotation.z = currentRotationZ;
          }
        }
      });
    });

    return () => ctx.revert();
  }, [initialScale]);

  return (
    <section ref={sectionRef} id="heroAbout" className={clsx(styles.heroAbout200vh, sharedStyles.gradientBottomTop)}> 
      <div id="hero" className={clsx(sharedStyles.container, styles.heroContent)}>
        <div ref={heroTextRef} className={styles.contentWrapper}>
          <h1 className={clsx(sharedStyles.displayText, styles.heroHeadline, sharedStyles.skew)}>
            <span className={styles.splitWord}>Build</span>
            <span className={styles.splitWord}>Cool</span>
            <span className={styles.splitWord}>Sh*t!</span>
          </h1>
        </div>
      </div>
      <div ref={tokenContainerRef} className={styles.tokenContainer}>
        <Canvas
          camera={{ 
            position: [0, 0, 12],  // Moved camera back
            fov: 45,  // Wider field of view
            near: 0.1,
            far: 100 
          }}
          style={{ 
            width: '100%', 
            height: '100%',
            overflow: 'visible',
            pointerEvents: 'auto',
            transformStyle: 'preserve-3d',
            contain: 'none'
          }}
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="city" />
            <RotatingToken groupRef={groupRef} onFloatAnimCreated={handleFloatAnimCreated} initialScale={initialScale} />
          </Suspense>
        </Canvas>
      </div>
      <div id="about" ref={aboutTextRef} className={clsx(sharedStyles.containerSmall, styles.aboutContent)}>
        <div className={styles.bioContent}>
         
        </div>
      </div>
    </section>
  );
}