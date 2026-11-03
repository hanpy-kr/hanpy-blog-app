import Link from 'next/link'
import styles from './page.module.css'

export default function EnglishHome() {
  return (
    <main className={styles.main}>
      <Link href="/edu/business-english" className={styles.button}>
        Business English
      </Link>
    </main>
  )
}
