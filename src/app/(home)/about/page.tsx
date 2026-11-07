// 소개: /about (세션 7). 작성자 문구는 src/config/site.ts (2026-11-02 확정본)
// 외부 계정(GitHub 등) 링크는 넣지 않는다 (2026-11-05 결정). 서브프로젝트는 앱 등록부(src/config/apps.ts)에서
import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/components/list/List.module.css'
import AppCards from '@/components/list/AppCards'
import SeriesCards from '@/components/list/SeriesCards'
import { homeApps } from '@/config/apps'
import JsonLd from '@/components/seo/JsonLd'
import { AUTHOR, SITE_DESCRIPTION, SITE_URL } from '@/config/site'
import { categoryHref, getPosts, getSeriesList, visibleCategories } from '@/lib/content'
import { pageMetadata } from '@/lib/page-metadata'
import { aboutLd } from '@/lib/structured-data'
import about from './page.module.css'

const TOP_SERIES = 4

export const metadata: Metadata = pageMetadata({
  title: '소개',
  description: `${AUTHOR.tagline}. ${AUTHOR.intro}`,
  path: '/about',
})

export default function AboutPage() {
  const series = getSeriesList('ko')
  const top = series.toSorted((a, b) => b.posts.length - a.posts.length).slice(0, TOP_SERIES)
  const categories = visibleCategories('ko')

  return (
    <main className={`${styles.main} ${styles.wide}`}>
      <JsonLd data={aboutLd()} />
      <p className={styles.eyebrow}>/about</p>
      <div className={about.profile}>
        <div aria-hidden="true" className={about.avatar}>
          H
        </div>
        <div className={about.who}>
          <h1 className={styles.title}>{AUTHOR.name}</h1>
          <p className={about.tagline}>{AUTHOR.tagline}</p>
        </div>
      </div>
      <p className={styles.lead}>{AUTHOR.intro}</p>

      <section aria-labelledby="about-blog" className={styles.section}>
        <h2 id="about-blog" className={styles.sectionTitle}>
          이 블로그
        </h2>
        <p className={about.text}>{SITE_DESCRIPTION}</p>
        <dl className={about.stats}>
          <div>
            <dt>글</dt>
            <dd>{getPosts({ lng: 'ko' }).length}</dd>
          </div>
          <div>
            <dt>시리즈</dt>
            <dd>{series.length}</dd>
          </div>
          <div>
            <dt>카테고리</dt>
            <dd>{categories.length}</dd>
          </div>
        </dl>
        <ul className={styles.tagCloud}>
          {categories.map((c) => (
            <li key={c.id}>
              <Link href={categoryHref(c.id, 'ko')} className={styles.tagLink}>
                {c.name} <span className={styles.tagCount}>{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="about-series" className={styles.section}>
        <h2 id="about-series" className={styles.sectionTitle}>
          대표 시리즈
        </h2>
        <SeriesCards series={top} />
        <Link href="/series/ko" className={styles.more}>
          시리즈 {series.length}개 전체 보기 →
        </Link>
      </section>

      {homeApps().length > 0 && (
        <section aria-labelledby="about-projects" className={styles.section}>
          <h2 id="about-projects" className={styles.sectionTitle}>
            서브프로젝트
          </h2>
          <AppCards />
        </section>
      )}

      <section aria-labelledby="about-follow" className={styles.section}>
        <h2 id="about-follow" className={styles.sectionTitle}>
          새 글 받아보기
        </h2>
        <p className={about.text}>RSS 리더에 등록하면 새 글이 올라올 때 바로 받아볼 수 있습니다.</p>
        <a href="/rss.xml" className={styles.more}>
          {new URL(SITE_URL).host}/rss.xml
        </a>
      </section>
    </main>
  )
}
