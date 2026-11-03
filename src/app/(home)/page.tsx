import CategoryCards from '@/components/home/CategoryCards'
import RecentPosts from '@/components/home/RecentPosts'
import { CATEGORIES, getPosts, toSummary, type PostSummary } from '@/lib/content'
import styles from './page.module.css'

const RECENT_LIMIT = 10

export default function HomePage() {
  // 탭마다 최신 글 10개를 서버에서 미리 골라 넘긴다 (예전처럼 /api/posts를 다시 부르지 않음)
  const recent: Record<string, PostSummary[]> = {
    all: getPosts({ lng: 'ko' }).slice(0, RECENT_LIMIT).map(toSummary),
  }
  for (const c of CATEGORIES) {
    recent[c] = getPosts({ lng: 'ko', category: c }).slice(0, RECENT_LIMIT).map(toSummary)
  }

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Backend · Infra · Design
          <br />
          개발 기록
        </h1>
      </section>
      <CategoryCards />
      <RecentPosts postsByTab={recent} />
    </main>
  )
}
