// 전체 글 목록 (한국어, 최신순, 15개씩). ?category=backend 로 카테고리만 볼 수 있다
import type { Metadata } from 'next'
import Link from 'next/link'
import { CATEGORIES, CATEGORY_LABEL, formatDate, getPosts, subLabel, type Category } from '@/lib/content'
import styles from './page.module.css'

const PAGE_SIZE = 15

type Search = { page?: string; category?: string }

const isCategory = (c: string | undefined): c is Category => CATEGORIES.includes(c as Category)

export async function generateMetadata({ searchParams }: { searchParams: Promise<Search> }): Promise<Metadata> {
  const { category } = await searchParams
  return {
    title: isCategory(category) ? `${CATEGORY_LABEL[category]} 글` : '전체 글',
    alternates: { canonical: isCategory(category) ? `/posts?category=${category}` : '/posts' },
  }
}

export default async function PostsArchivePage({ searchParams }: { searchParams: Promise<Search> }) {
  const { page: pageParam, category: categoryParam } = await searchParams
  const category = isCategory(categoryParam) ? categoryParam : undefined
  const all = getPosts({ lng: 'ko', category })
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE))
  const current = Math.min(Math.max(1, parseInt(pageParam ?? '1', 10) || 1), totalPages)
  const slice = all.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const href = (page: number) =>
    `/posts?${new URLSearchParams({ ...(category ? { category } : {}), ...(page > 1 ? { page: String(page) } : {}) })}`.replace(/\?$/, '')

  const filters = [{ id: undefined, label: '전체', count: getPosts({ lng: 'ko' }).length }, ...CATEGORIES.map((c) => ({ id: c, label: CATEGORY_LABEL[c], count: getPosts({ lng: 'ko', category: c }).length }))].filter((f) => f.count > 0)

  return (
    <main className={styles.main}>
      <p className={styles.eyebrow}>/posts{category ? `?category=${category}` : ''}</p>
      <h1 className={styles.title}>{category ? `${CATEGORY_LABEL[category]} 글` : '전체 글'}</h1>
      <p className={styles.lead}>최신 글부터 {all.length}개</p>

      <nav aria-label="카테고리 필터" className={styles.filters}>
        {filters.map((f) => (
          <Link
            key={f.label}
            href={f.id ? `/posts?category=${f.id}` : '/posts'}
            className={styles.filter}
            aria-current={f.id === category ? 'page' : undefined}
          >
            {f.label} {f.count}
          </Link>
        ))}
      </nav>

      <ul className={styles.list}>
        {slice.map((post) => (
          <li key={post.url} className={styles.item}>
            <div className={styles.meta}>
              <span className={styles.chip} data-tone={post.category}>
                {CATEGORY_LABEL[post.category as Category] ?? post.category} · {subLabel(post.category, post.sub)}
              </span>
              <time dateTime={post.publishedAt} className={styles.date}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
            <h2 className={styles.postTitle}>
              <Link href={post.url}>{post.title}</Link>
            </h2>
            <p className={styles.summary}>{post.summary}</p>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <nav aria-label="페이지" className={styles.pager}>
          {current > 1 ? (
            <Link href={href(current - 1)} className={styles.pageLink}>
              ← 이전
            </Link>
          ) : (
            <span />
          )}
          <span className={styles.pageInfo}>
            {current} / {totalPages}
          </span>
          {current < totalPages ? (
            <Link href={href(current + 1)} className={styles.pageLink}>
              다음 →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </main>
  )
}
