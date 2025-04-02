// styles/fonts.ts
import { Space_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const forceMajeure = localFont({
  src: '../public/fonts/forcemajeure-omj0-webfont.woff2',
  variable: '--font-force',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});