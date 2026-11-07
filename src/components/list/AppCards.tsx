// 서브프로젝트 카드 (세션 7b): 앱 등록부(src/config/apps.ts)의 showOnHome 앱. 홈 'Projects'·/about
import { homeApps } from '@/config/apps'
import styles from './List.module.css'

export default function AppCards({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const apps = homeApps()
  if (apps.length === 0) return null
  const H = `h${headingLevel}` as const
  return (
    <ul className={styles.cards}>
      {apps.map((a) => (
        // 앱은 블로그와 다른 루트 레이아웃이라 일반 링크로 간다
        <li key={a.slug}>
          <a href={a.href} className={styles.card} hrefLang={a.lang}>
            <span className={styles.cardWhere}>{a.href}</span>
            <H className={styles.cardTitle} lang={a.lang}>
              {a.name}
            </H>
            <span className={styles.cardMeta} lang={a.lang}>
              {a.description}
            </span>
            <span className={styles.cardCta}>열기 →</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
