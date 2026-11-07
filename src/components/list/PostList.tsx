// 글 목록 (칩 · 날짜 · 제목 · 요약). /posts, 카테고리·서브카테고리·태그 목록이 함께 쓴다. 서버 컴포넌트
import Link from 'next/link'
import { categoryLabel, formatDate, subLabel, type Post } from '@/lib/content'
import styles from './List.module.css'

type Item = Pick<Post, 'url' | 'title' | 'summary' | 'publishedAt' | 'category' | 'sub'>

export default function PostList({
  posts,
  headingLevel = 2,
  showChip = true,
}: {
  posts: Item[]
  /** 목록 안 제목의 단계 (섹션 아래 목록이면 3) */
  headingLevel?: 2 | 3
  showChip?: boolean
}) {
  const H = `h${headingLevel}` as const
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.url} className={styles.item}>
          <div className={styles.meta}>
            {showChip && (
              <span className={styles.chip} data-tone={post.category}>
                {categoryLabel(post.category)} · {subLabel(post.category, post.sub)}
              </span>
            )}
            <time dateTime={post.publishedAt} className={styles.date}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
          <H className={styles.postTitle}>
            <Link href={post.url}>{post.title}</Link>
          </H>
          <p className={styles.summary}>{post.summary}</p>
        </li>
      ))}
    </ul>
  )
}
