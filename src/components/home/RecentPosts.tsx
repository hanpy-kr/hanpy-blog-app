'use client'
// 최근 글 목록. 탭을 바꾸면 서버가 미리 넘겨 준 목록 중에서 고른다
import Link from 'next/link'
import { useState } from 'react'
import { CATEGORIES, CATEGORY_LABEL, categoryLabel } from '@/lib/categories'
import type { PostSummary } from '@/lib/content'
import styles from './RecentPosts.module.css'

const TABS = [{ key: 'all', label: 'All' }, ...CATEGORIES.map((c) => ({ key: c, label: CATEGORY_LABEL[c] }))]

export default function RecentPosts({ postsByTab }: { postsByTab: Record<string, PostSummary[]> }) {
  const [tab, setTab] = useState('all')
  const posts = postsByTab[tab] ?? []

  return (
    <section aria-labelledby="recent-heading" className={styles.section}>
      <div className={styles.head}>
        <h2 id="recent-heading" className={styles.heading}>
          Recently Published
        </h2>
        <div role="tablist" aria-label="카테고리" className={styles.tabs}>
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              className={styles.tab}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {posts.length > 0 ? (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.url}>
              <Link href={post.url} className={styles.item}>
                <span className={styles.titleRow}>
                  <span className={styles.title}>{post.title}</span>
                  <span className={styles.meta}>{categoryLabel(post.category)}</span>
                </span>
                <span className={styles.summary}>{post.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>게시글이 없습니다.</p>
      )}
      <p className={styles.more}>
        <Link href="/posts">더 보기 (전체 목록)</Link>
      </p>
    </section>
  )
}
