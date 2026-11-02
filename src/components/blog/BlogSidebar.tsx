'use client'
// 글 페이지 왼쪽 목록. 아직 src/data/const/*.ts 의 손으로 쓴 목록을 읽는다 (세션 5에서 frontmatter group·order로 자동 생성)
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { CONTENT_CATEGORY } from '@/data/const'
import type { CATEGORY_TYPE, SUB_CATEGORY_TYPE } from '@/types/category'
import styles from './BlogSidebar.module.css'

type SubCategoryItem = { id: string; name: string; href: string }
type SubCategoryDetail = { title: string[]; subTitle: { title: string; href: string }[][] }

export default function BlogSidebar({ type, subType }: { type: CATEGORY_TYPE; subType: SUB_CATEGORY_TYPE }) {
  const router = useRouter()
  const path = usePathname()

  const subCategories = Object.values(CONTENT_CATEGORY[type].subCategory as Record<string, SubCategoryItem>)
  const detail = CONTENT_CATEGORY[type].subCategoryDetail[subType] as SubCategoryDetail | undefined
  const current = subCategories.find((s) => s.id === String(subType)) ?? subCategories[0]
  const selectId = `sub-select-${type}`

  return (
    <nav aria-label={`${CONTENT_CATEGORY[type].mainCategory ?? type} 글 목록`} className={styles.sidebar}>
      <div className={styles.field}>
        <label htmlFor={selectId} className={styles.label}>
          {CONTENT_CATEGORY[type].mainCategory ?? type}
        </label>
        <select
          id={selectId}
          className={styles.select}
          value={current?.id}
          onChange={(e) => {
            const next = subCategories.find((s) => s.id === e.target.value)
            if (next) router.push(next.href)
          }}
        >
          {subCategories.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {detail && (
        <ul className={styles.sections}>
          {detail.title.map((sectionTitle, i) => (
            <li key={`${sectionTitle}_${i}`}>
              <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
              <ul className={styles.links}>
                {detail.subTitle[i]?.map((link, j) => (
                  <li key={`${link.href}_${j}`}>
                    <Link
                      href={link.href}
                      className={styles.link}
                      aria-current={decodeURIComponent(path) === link.href ? 'page' : undefined}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
