'use client'
// 최근 글. 탭을 바꾸면 서버가 미리 넘겨 준 목록 중에서 고른다
import Link from 'next/link'
import { useState } from 'react'
import type { PostSummary } from '@/lib/content'
import { formatDate } from '@/lib/format'
import styles from './RecentPosts.module.css'

/** categories: 공개 글이 있는 카테고리 (서버가 taxonomy 순서로 넘김) */
export default function RecentPosts({
  postsByTab,
  categories,
}: {
  postsByTab: Record<string, PostSummary[]>
  categories: { id: string; name: string }[]
}) {
  const [tab, setTab] = useState('all')
  const posts = postsByTab[tab] ?? []
  const tabs = [{ key: 'all', label: '전체' }, ...categories.map((c) => ({ key: c.id, label: c.name }))]

  return (
    <div className={styles.recent}>
      <div className={styles.head}>
        <h2 id="recent-heading" className={styles.heading}>
          최근 글
        </h2>
        <div role="tablist" aria-label="카테고리 필터" className={styles.tabs}>
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              aria-controls="recent-list"
              className={styles.tab}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div id="recent-list" role="tabpanel">
        {posts.map((post) => (
          <article key={post.url} className={styles.item}>
            <div className={styles.meta}>
              <span className={styles.chip} data-tone={post.category}>
                {post.categoryName} · {post.subName}
              </span>
              <time dateTime={post.publishedAt} className={styles.date}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
            <h3 className={styles.title}>
              <Link href={post.url}>{post.title}</Link>
            </h3>
            <p className={styles.summary}>{post.summary}</p>
            {post.tags.length > 0 && (
              <p className={styles.tags}>{post.tags.slice(0, 4).map((t) => `#${t}`).join(' ')}</p>
            )}
          </article>
        ))}
      </div>

      <div className={styles.more}>
        <Link href={tab === 'all' ? '/posts' : `/posts?category=${tab}`} className={styles.moreLink}>
          {tab === 'all' ? '전체 글 보기' : `${tabs.find((t) => t.key === tab)?.label ?? tab} 글 전체 보기`} →
        </Link>
      </div>
    </div>
  )
}
