// 서브카테고리 글 목록: /{category}/{lng}/{sub} (세션 7)
// 글 라우트 [...segments]가 세그먼트 하나짜리 주소를 여기로 넘긴다 (글은 항상 sub/slug 두 단계 이상)
// 순서는 사이드바와 같다: 그룹 등록 순서 → order. 설명은 taxonomy
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostList from '@/components/list/PostList'
import styles from '@/components/list/List.module.css'
import SeriesCards from '@/components/list/SeriesCards'
import { getSubDef } from '@/config/taxonomy'
import { categoryHref, categoryLabel, getSeriesList, getSubGroups, subLabel, subListHref, visibleSubs } from '@/lib/content'
import { pageMetadata } from '@/lib/page-metadata'

function describe(category: string, lng: string, sub: string, count: number) {
  const def = getSubDef(category, sub)
  return def?.description || `${categoryLabel(category)} · ${subLabel(category, sub)} 글 ${count}개를 순서대로 모았습니다.`
}

export function subListMetadata(category: string, lng: string, sub: string): Metadata {
  const count = visibleSubs(category, lng).find((s) => s.id === sub)?.count ?? 0
  return pageMetadata({
    title: `${subLabel(category, sub)} · ${categoryLabel(category)}`,
    description: describe(category, lng, sub, count),
    path: subListHref(category, lng, sub),
    lng,
  })
}

export default function SubListPage({ category, lng, sub }: { category: string; lng: string; sub: string }) {
  const subs = visibleSubs(category, lng)
  const current = subs.find((s) => s.id === sub)
  if (!current) notFound()
  const groups = getSubGroups(category, lng, sub)
  const series = getSeriesList(lng).filter((s) => s.category === category && s.sub === sub)

  return (
    <main className={`${styles.main} ${styles.wide}`}>
      <nav aria-label="현재 위치" className={styles.breadcrumb}>
        <Link href={categoryHref(category, lng)}>{categoryLabel(category)}</Link>
        <span aria-hidden="true">/</span>
        <span>{current.name}</span>
      </nav>
      <p className={styles.eyebrow}>{subListHref(category, lng, sub)}</p>
      <h1 className={styles.title}>{current.name}</h1>
      <p className={styles.lead}>{describe(category, lng, sub, current.count)}</p>

      {subs.length > 1 && (
        <nav aria-label={`${categoryLabel(category)} 서브카테고리`} className={styles.filters}>
          {subs.map((s) => (
            <Link
              key={s.id}
              href={subListHref(category, lng, s.id)}
              className={styles.filter}
              aria-current={s.id === sub ? 'page' : undefined}
            >
              {s.name} {s.count}
            </Link>
          ))}
        </nav>
      )}

      {series.length > 0 && (
        <section aria-labelledby="sub-series" className={styles.section}>
          <h2 id="sub-series" className={styles.sectionTitle}>
            시리즈<span className={styles.sectionCount}>{series.length}</span>
          </h2>
          <SeriesCards series={series} />
        </section>
      )}

      <section aria-labelledby="sub-posts" className={styles.section}>
        <h2 id="sub-posts" className={styles.sectionTitle}>
          글<span className={styles.sectionCount}>{current.count}</span>
        </h2>
        {groups.map((g) => (
          <div key={g.name}>
            {groups.length > 1 && g.name && <p className={styles.groupTitle}>{g.name}</p>}
            <PostList posts={g.posts} headingLevel={3} showChip={false} />
          </div>
        ))}
      </section>
    </main>
  )
}
