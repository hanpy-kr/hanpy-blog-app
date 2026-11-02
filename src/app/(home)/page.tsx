// 홈 (디자인 시안 'Main'). 시리즈 묶음·태그·검색·광고 자리는 데이터·화면이 생기는 세션 4·7에서 채운다
import Link from 'next/link'
import AuthorCard from '@/components/common/AuthorCard'
import RecentPosts from '@/components/home/RecentPosts'
import { CATEGORIES, CATEGORY_LABEL, getPosts, subLabel, toSummary, type PostSummary } from '@/lib/content'
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/site'
import styles from './page.module.css'

const RECENT_LIMIT = 6

export default function HomePage() {
  const koPosts = getPosts({ lng: 'ko' })

  // 탭마다 최신 글을 서버에서 미리 골라 넘긴다
  const recent: Record<string, PostSummary[]> = { all: koPosts.slice(0, RECENT_LIMIT).map(toSummary) }
  for (const c of CATEGORIES) {
    recent[c] = koPosts.filter((p) => p.category === c).slice(0, RECENT_LIMIT).map(toSummary)
  }

  // 카테고리별 글 수와 서브카테고리 내역 (글 많은 순)
  const categories = CATEGORIES.map((c) => {
    const posts = koPosts.filter((p) => p.category === c)
    const subs = new Map<string, number>()
    for (const p of posts) subs.set(p.sub, (subs.get(p.sub) ?? 0) + 1)
    return {
      id: c,
      count: posts.length,
      subs: [...subs].sort((a, b) => b[1] - a[1]).map(([sub, n]) => `${subLabel(c, sub)} ${n}`),
    }
  })
    .filter((c) => c.count > 0) // 글 0개인 카테고리는 숨김 (AI 카테고리 대비)
    .sort((a, b) => b.count - a.count)

  return (
    <main>
      <section className={`${styles.wrap} ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>{new URL(SITE_URL).host}</p>
          <h1 className={styles.title}>
            Backend · Infra · Design
            <br />
            개발 기록
          </h1>
          <p className={styles.lead}>{SITE_DESCRIPTION}</p>
          <dl className={styles.stats}>
            <div>
              <dt>글</dt>
              <dd>{koPosts.length}</dd>
            </div>
            <div>
              <dt>카테고리</dt>
              <dd>{categories.length}</dd>
            </div>
          </dl>
        </div>
        <div className={styles.heroAside}>
          <AuthorCard withIntro />
        </div>
      </section>

      <section aria-labelledby="recent-heading" className={`${styles.wrap} ${styles.recent}`}>
        <RecentPosts postsByTab={recent} />
        <aside aria-label="새 글 받아보기" className={styles.recentAside}>
          <div className={styles.rss}>
            <h2 className={styles.asideTitle}>새 글 받아보기</h2>
            <p className={styles.asideText}>RSS 리더에 등록하면 새 글이 올라올 때 바로 받아볼 수 있습니다.</p>
            <a href="/rss.xml" className={styles.rssLink}>
              {new URL(SITE_URL).host}/rss.xml
            </a>
          </div>
        </aside>
      </section>

      <section aria-labelledby="cat-heading" className={styles.categoryBand}>
        <div className={styles.wrap}>
          <h2 id="cat-heading" className={styles.sectionTitle}>
            카테고리
          </h2>
          <div className={styles.categoryGrid}>
            {categories.map((c) => (
              <Link key={c.id} href={`/posts?category=${c.id}`} className={styles.categoryCard} data-tone={c.id}>
                <span className={styles.categoryHead}>
                  <span className={styles.categoryName}>{CATEGORY_LABEL[c.id]}</span>
                  <span className={styles.categoryCount}>{c.count}편</span>
                </span>
                <span className={styles.categorySubs}>{c.subs.join(' · ')}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
