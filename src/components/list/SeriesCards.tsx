// 시리즈 카드 격자 (디자인 시안 'Series'·홈 '시리즈로 읽기'). 서버 컴포넌트
import Link from 'next/link'
import { categoryLabel, subLabel, type SeriesSummary } from '@/lib/content'
import styles from './List.module.css'

export default function SeriesCards({ series, headingLevel = 3 }: { series: SeriesSummary[]; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const
  return (
    <ul className={styles.cards}>
      {series.map((s) => (
        <li key={s.id}>
          <Link href={s.href} className={styles.card} data-tone={s.category}>
            <span className={styles.cardWhere}>
              {categoryLabel(s.category)} · {subLabel(s.category, s.sub)}
            </span>
            <H className={styles.cardTitle}>
              {s.name}
            </H>
            <span className={styles.cardMeta}>
              {s.posts.length}편 · {s.posts[0].title}부터
            </span>
            <span className={styles.cardCta}>목차 보기 →</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
