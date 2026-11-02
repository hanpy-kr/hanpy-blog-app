// 홈의 카테고리 카드: 영역별 서브카테고리를 카테고리 고유의 파스텔 배경으로 보여 준다
import Link from 'next/link'
import { CONTENT_BACKEND } from '@/data/const/backend'
import { CONTENT_DESIGN } from '@/data/const/design'
import { CONTENT_INFRA } from '@/data/const/infra'
import { CONTENT_LANGUAGE } from '@/data/const/language'
import { BackendCategory, DesignCategory, InfraCategory, LanguageCategory } from '@/types/category'
import styles from './CategoryCards.module.css'

type SubCategory = { id: string; name: string; href: string; description: string }
type Content = { mainCategory: string; subCategory: Record<string, SubCategory> }

// 예전 홈과 같은 순서·같은 배경색
const GROUPS: { content: Content; order: Record<string, string>; tone: string }[] = [
  { content: CONTENT_LANGUAGE, order: LanguageCategory, tone: 'language' },
  { content: CONTENT_BACKEND, order: BackendCategory, tone: 'backend' },
  { content: CONTENT_DESIGN, order: DesignCategory, tone: 'design' },
  { content: CONTENT_INFRA, order: InfraCategory, tone: 'infra' },
]

export default function CategoryCards() {
  return (
    <section aria-label="카테고리" className={styles.list}>
      {GROUPS.flatMap(({ content, order, tone }) =>
        Object.values(order).map((key) => {
          const item = content.subCategory[key]
          if (!item) return null
          return (
            <Link key={item.href} href={item.href} className={styles.card} data-tone={tone}>
              <span className={styles.main}>{content.mainCategory}</span>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.desc}>{item.description}</span>
            </Link>
          )
        }),
      )}
    </section>
  )
}
