// 작성자 카드 (홈 첫 화면 오른쪽, 글 끝). 문구는 2026-11-02 확정본. GitHub 버튼은 2026-11-05 삭제(주소 비노출)
import { AUTHOR } from '@/config/site'
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
    </Tag>
  )
}
