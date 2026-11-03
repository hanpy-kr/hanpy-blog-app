import { AUTHOR } from '@/lib/site'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.name}>Hanpy&apos;s Blog</span>
          <span className={styles.copy}>© Hanpy. All rights reserved.</span>
        </div>
        <nav aria-label="바닥글" className={styles.nav}>
          <a href="/rss.xml" className={styles.link}>
            RSS
          </a>
          <a href={AUTHOR.github} className={styles.link}>
            GitHub
          </a>
          <a href="/sitemap.xml" className={styles.link}>
            Sitemap
          </a>
        </nav>
      </div>
    </footer>
  )
}
