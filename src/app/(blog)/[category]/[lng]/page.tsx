// 카테고리 목록: /{category}/{lng} (세션 7)
// 서브카테고리 카드(공개 글이 있는 것만, taxonomy 순서) → 시리즈 → 최근 글. 설명은 taxonomy
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostList from '@/components/list/PostList'
import styles from '@/components/list/List.module.css'
import SeriesCards from '@/components/list/SeriesCards'
import { TAXONOMY, getSubDef } from '@/config/taxonomy'
import {
  categoryHref,
  categoryLabel,
  categoryLngs,
  getPosts,
  getSeriesList,
  isCategory,
  subListHref,
  visibleSubs,
  type Lng,
} from '@/lib/content'
import { pageMetadata } from '@/lib/page-metadata'

type Params = { category: string; lng: string }

const RECENT_LIMIT = 10

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return categoryLngs()
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category, lng } = await params
  if (!isCategory(category)) return {}
  return pageMetadata({
    title: categoryLabel(category),
    description: TAXONOMY[category].description,
    path: categoryHref(category, lng),
    lng,
  })
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category, lng } = await params
  if (!isCategory(category)) notFound()
  const posts = getPosts({ lng: lng as Lng, category })
  if (posts.length === 0) notFound()
  const subs = visibleSubs(category, lng)
  const series = getSeriesList(lng).filter((s) => s.category === category)

  return (
    <main className={`${styles.main} ${styles.wide}`}>
      <p className={styles.eyebrow}>{categoryHref(category, lng)}</p>
      <h1 className={styles.title}>{categoryLabel(category)}</h1>
      <p className={styles.lead}>
        {TAXONOMY[category].description} · 글 {posts.length}개
      </p>

      <section aria-labelledby="cat-subs" className={styles.section}>
        <h2 id="cat-subs" className={styles.sectionTitle}>
          서브카테고리<span className={styles.sectionCount}>{subs.length}</span>
        </h2>
        <ul className={styles.cards}>
          {subs.map((s) => (
            <li key={s.id}>
              <Link href={subListHref(category, lng, s.id)} className={styles.card} data-tone={category}>
                <span className={styles.cardTitle}>{s.name}</span>
                <span className={styles.cardMeta}>{s.count}편</span>
                {getSubDef(category, s.id)?.description && (
                  <span className={styles.cardDesc}>
                    {getSubDef(category, s.id)?.description}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {series.length > 0 && (
        <section aria-labelledby="cat-series" className={styles.section}>
          <h2 id="cat-series" className={styles.sectionTitle}>
            시리즈<span className={styles.sectionCount}>{series.length}</span>
          </h2>
          <SeriesCards series={series} />
        </section>
      )}

      <section aria-labelledby="cat-recent" className={styles.section}>
        <h2 id="cat-recent" className={styles.sectionTitle}>
          최근 글
        </h2>
        <PostList posts={posts.slice(0, RECENT_LIMIT)} headingLevel={3} />
        {lng === 'ko' && posts.length > RECENT_LIMIT && (
          <Link href={`/posts?category=${category}`} className={styles.more}>
            {categoryLabel(category)} 글 {posts.length}개 모두 보기 →
          </Link>
        )}
      </section>
    </main>
  )
}
