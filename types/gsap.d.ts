declare module 'gsap' {
  export const gsap: any;
  export default gsap;
}

declare module 'gsap/ScrollTrigger' {
  interface ScrollTriggerStatic {
    create(config: any): any;
    getAll(): any[];
    kill(): void;
    refresh(): void;
  }
  const ScrollTrigger: ScrollTriggerStatic;
  export default ScrollTrigger;
}

declare module 'gsap/ScrollSmoother' {
  interface ScrollSmootherStatic {
    create(config: any): any;
    get(): any;
    kill(): void;
  }
  const ScrollSmoother: ScrollSmootherStatic;
  export default ScrollSmoother;
}

declare module 'gsap/MotionPathPlugin' {
  const MotionPathPlugin: any;
  export default MotionPathPlugin;
}

declare module 'gsap/ScrollToPlugin' {
  const ScrollToPlugin: any;
  export default ScrollToPlugin;
}

// Keep the Club GSAP declarations for reference
declare module '@gsap/shockingly/ScrollTrigger' {
  const ScrollTrigger: any;
  export default ScrollTrigger;
}

declare module '@gsap/shockingly/ScrollSmoother' {
  const ScrollSmoother: any;
  export default ScrollSmoother;
}

declare module '@gsap/shockingly/SplitText' {
  const SplitText: any;
  export default SplitText;
} 