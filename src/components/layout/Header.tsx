import Link from 'next/link'
import SiteNav from './SiteNav'
import ThemeToggle from './ThemeToggle'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Hanpy&apos;s Blog
        </Link>
        <SiteNav />
        <div className={styles.actions}>
          <ThemeToggle />
          <a href="/rss.xml" className={styles.iconButton} aria-label="RSS 피드">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
