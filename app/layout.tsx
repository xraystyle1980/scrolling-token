import "./globals.css";
import { spaceGrotesk, forceMajeure } from '@/styles/fonts';
import { AppProvider } from '@/contexts/AppContext';
import ClientLayout from './ClientLayout';
import Scene3DWrapper from './Scene3DWrapper';
import SmoothScroll from '@/components/ui-components/Scroll/SmoothScroll';
import LoadingWrapper from '@/components/ui-components/LoadingWrapper';
import BackToTop from '@/components/ui-components/BackToTop';
import styles from './ClientLayout.module.css';
import { metadata } from './metadata';

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${forceMajeure.variable}`}
      style={{ fontFamily: 'var(--font-space)' }}
    >
      <body>
        <AppProvider>
          <LoadingWrapper>
            <Scene3DWrapper />
            <SmoothScroll>
              <ClientLayout>
                {children}
              </ClientLayout>
            </SmoothScroll>
            <div className={styles.fixedContainer}>
              <BackToTop />
            </div>
          </LoadingWrapper>
        </AppProvider>
      </body>
    </html>
  );
}