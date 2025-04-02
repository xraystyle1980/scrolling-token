'use client';

import styles from './Footer.module.css';
import sharedStyles from '@/styles/shared.module.css';
import SocialLinks from '../SocialLinks';
import clsx from 'clsx';

export default function Footer() {
  return (
    <footer className={clsx(styles.footer, sharedStyles.darkSection)}>
      <SocialLinks />
    </footer>
  );
} 