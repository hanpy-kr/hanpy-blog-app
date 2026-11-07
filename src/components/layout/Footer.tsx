import { dict } from '@/i18n'
import styles from './Footer.module.css'

export default function Footer({ lng }: { lng: 'ko' | 'en' }) {
  const t = dict(lng).footer
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.name}>Hanpy&apos;s Blog</span>
          <span className={styles.copy}>© Hanpy. All rights reserved.</span>
        </div>
        <nav aria-label={t.label} className={styles.nav}>
          <a href="/about" className={styles.link}>
            {t.about}
          </a>
          <a href={dict(lng).rss} className={styles.link}>
            {t.rss}
          </a>
          <a href="/sitemap.xml" className={styles.link}>
            {t.sitemap}
          </a>
        </nav>
      </div>
    </footer>
  )
}
