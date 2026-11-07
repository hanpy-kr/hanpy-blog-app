'use client'
// 글 페이지 왼쪽 목록. 서버(src/lib/content.ts getSidebar)가 frontmatter group·order로 만든 목록을 받아 그린다
// 선택 상자: 공개 글이 있는 서브카테고리만 (바꾸면 그 서브카테고리의 첫 글로 이동)
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { SidebarGroup, SidebarSub } from '@/lib/sidebar'
import styles from './BlogSidebar.module.css'

export default function BlogSidebar({
  category,
  categoryName,
  subs,
  current,
  groups,
}: {
  category: string
  categoryName: string
  subs: Pick<SidebarSub, 'id' | 'name' | 'href'>[]
  /** 지금 글의 서브카테고리 id */
  current: string
  /** 지금 서브카테고리의 그룹 (링크가 있는 그룹만) */
  groups: SidebarGroup[]
}) {
  const router = useRouter()
  const path = decodeURIComponent(usePathname())
  const selectId = `sub-select-${category}`

  return (
    <nav aria-label={`${categoryName} 글 목록`} className={styles.sidebar}>
      <div className={styles.field}>
        <label htmlFor={selectId} className={styles.label}>
          {categoryName}
        </label>
        <select
          id={selectId}
          className={styles.select}
          value={current}
          onChange={(e) => {
            const next = subs.find((s) => s.id === e.target.value)
            if (next) router.push(next.href)
          }}
        >
          {subs.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <ul className={styles.sections}>
        {groups.map((group) => (
          <li key={group.name}>
            <h2 className={styles.sectionTitle}>{group.name}</h2>
            <ul className={styles.links}>
              {group.links.map((link) => (
                <li key={link.url}>
                  <Link href={link.url} className={styles.link} aria-current={path === link.url ? 'page' : undefined}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}
