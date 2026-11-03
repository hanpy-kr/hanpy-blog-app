// 작성자 카드 (홈 첫 화면 오른쪽, 글 끝). 문구는 2026-11-02 확정본
import { AUTHOR } from '@/lib/site'
import styles from './AuthorCard.module.css'

export default function AuthorCard({ withIntro = false, as: Tag = 'aside' }: { withIntro?: boolean; as?: 'aside' | 'section' }) {
  return (
    <Tag aria-label="작성자" className={styles.card}>
      <div className={styles.who}>
        <div aria-hidden="true" className={styles.avatar}>
          H
        </div>
        <div className={styles.names}>
          <span className={styles.name}>{AUTHOR.name}</span>
          <span className={styles.tagline}>{AUTHOR.tagline}</span>
        </div>
      </div>
      {withIntro && <p className={styles.intro}>{AUTHOR.intro}</p>}
      <div className={styles.links}>
        <a href={AUTHOR.github} className={styles.button}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
          </svg>
          GitHub
        </a>
      </div>
    </Tag>
  )
}
