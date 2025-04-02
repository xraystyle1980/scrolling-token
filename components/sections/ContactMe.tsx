import sharedStyles from '@/styles/shared.module.css'
import styles from './ContactMe.module.css'
import clsx from 'clsx'
import { Icon } from '@/components/icons/Icon';

interface ContactMeProps {
  id?: string;
}

export default function ContactMe({ id = 'connect' }: ContactMeProps) {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = 'mailto:matt@trice.design';
  };

  return (        
    <section id={id} className={clsx(sharedStyles.darkSection, styles.contactMe)}>
      <div className={sharedStyles.container}>
        {/* Connect */}       
        <div className={sharedStyles.contentContainer} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

          <h4 className={clsx(sharedStyles.displayText, sharedStyles.colorPrimary)}>Let's Connect</h4>
          <h5 className={clsx(styles.subsectionSubTitle, sharedStyles.colorWhite)}>Working on a project?</h5>
          <p className={clsx(sharedStyles.textBase, sharedStyles.large, sharedStyles.colorWhite)}>Drop me a line and let's build cool shit.</p>

          <a onClick={handleEmailClick} href="mailto:matt@trice.design" className={clsx(sharedStyles.primaryButton, sharedStyles.buttonBase, sharedStyles.half)}>
            <span>matt@trice.design</span>
            <span><Icon name="mail-arrow-right" className={sharedStyles.buttonIcon} /></span>
          </a>

        </div>
      </div>
    </section>
  )
} 