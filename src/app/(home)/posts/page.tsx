// 전체 글 목록 (한국어, 최신순, 15개씩)
import type { Metadata } from 'next'
import Link from 'next/link'
import { categoryLabel, getPosts } from '@/lib/content'
import styles from './page.module.css'

const PAGE_SIZE = 15

export const metadata: Metadata = {
  title: '전체 글',
  alternates: { canonical: '/posts' },
}

export default async function PostsArchivePage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams
  const all = getPosts({ lng: 'ko' })
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE))
  const current = Math.min(Math.max(1, parseInt(pageParam ?? '1', 10) || 1), totalPages)
  const slice = all.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>전체 글</h1>
      <ul className={styles.list}>
        {slice.map((post) => (
          <li key={post.url} className={styles.item}>
            <Link href={post.url} className={styles.link}>
              {post.title}
            </Link>
            <div className={styles.meta}>
              {categoryLabel(post.category)} · {post.publishedAt}
            </div>
            <p className={styles.summary}>{post.summary}</p>
          </li>
        ))}
      </ul>
      <nav aria-label="페이지" className={styles.pager}>
        {current > 1 && <Link href={`/posts?page=${current - 1}`}>이전</Link>}
        <span>
          {current} / {totalPages}
        </span>
        {current < totalPages && <Link href={`/posts?page=${current + 1}`}>다음</Link>}
      </nav>
      <p>
        <Link href="/">홈으로</Link>
      </p>
    </main>
  )
}
