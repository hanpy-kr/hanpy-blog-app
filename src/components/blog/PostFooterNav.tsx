// 글 아래: 시리즈 이전·다음 글, 함께 읽으면 좋은 글 (디자인 시안 'Post'·'PostMobile'). 서버 컴포넌트
import Link from 'next/link'
import { categoryLabel, subLabel, type Post, type SeriesInfo } from '@/lib/content'
import styles from './PostFooterNav.module.css'

export function SeriesPager({ series }: { series: SeriesInfo }) {
  const prev = series.posts[series.index - 1]
  const next = series.posts[series.index + 1]
  if (!prev && !next) return null
  return (
    <nav aria-label="시리즈 이전·다음 글" className={styles.pager}>
      {prev ? (
        <Link href={prev.url} className={styles.pageLink} rel="prev">
          <span className={styles.pageLabel}>← 이전 글 · {series.index}편</span>
          <span className={styles.pageTitle}>{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.url} className={`${styles.pageLink} ${styles.next}`} rel="next">
          <span className={styles.pageLabel}>다음 글 · {series.index + 2}편 →</span>
          <span className={styles.pageTitle}>{next.title}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}

export function RelatedPosts({ posts }: { posts: Pick<Post, 'url' | 'title' | 'category' | 'sub'>[] }) {
  if (posts.length === 0) return null
  return (
    <section aria-labelledby="related-heading" className={styles.related}>
      <h2 id="related-heading" className={styles.relatedTitle}>
        함께 읽으면 좋은 글
      </h2>
      <ul className={styles.relatedList}>
        {posts.map((p) => (
          <li key={p.url}>
            <Link href={p.url} className={styles.relatedCard} data-tone={p.category}>
              <span className={styles.where}>
                {categoryLabel(p.category)} · {subLabel(p.category, p.sub)}
              </span>
              <span className={styles.relatedPostTitle}>{p.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
