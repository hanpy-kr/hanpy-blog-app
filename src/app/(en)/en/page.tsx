// 영어 홈 /en (세션 7b): 영어 글 최신순 · 영어 글이 있는 카테고리 · 영어 피드
// 영어 글이 늘면(계획 문서 '영어 글 확대') 이 화면이 그대로 커진다. 짝이 있는 글은 KO/EN 버튼으로 오간다
import type { Metadata } from 'next'
import Link from 'next/link'
import PostList from '@/components/list/PostList'
import styles from '@/components/list/List.module.css'
import { SITE_DESCRIPTION_EN, SITE_NAME, SITE_URL, rssAlternate } from '@/config/site'
import { categoryHref, getPosts, visibleCategories } from '@/lib/content'
import { pageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = {
  ...pageMetadata({ title: 'English', description: SITE_DESCRIPTION_EN, path: '/en', lng: 'en' }),
  title: { absolute: `${SITE_NAME} — English` },
  alternates: { canonical: '/en', languages: { ko: '/', en: '/en' }, types: rssAlternate('en') },
}

export default function EnglishHomePage() {
  const posts = getPosts({ lng: 'en' })
  const categories = visibleCategories('en')
  return (
    <main className={`${styles.main} ${styles.wide}`}>
      <p className={styles.eyebrow}>{new URL(SITE_URL).host}/en</p>
      <h1 className={styles.title}>Backend · Infra · Design notes</h1>
      <p className={styles.lead}>{SITE_DESCRIPTION_EN}</p>

      <nav aria-label="Categories" className={styles.filters}>
        {categories.map((c) => (
          <Link key={c.id} href={categoryHref(c.id, 'en')} className={styles.filter}>
            {c.name} {c.count}
          </Link>
        ))}
      </nav>

      <section aria-labelledby="en-posts" className={styles.section}>
        <h2 id="en-posts" className={styles.sectionTitle}>
          Posts<span className={styles.sectionCount}>{posts.length}</span>
        </h2>
        <PostList posts={posts} headingLevel={3} />
      </section>

      <section aria-labelledby="en-more" className={styles.section}>
        <h2 id="en-more" className={styles.sectionTitle}>
          More
        </h2>
        <p className={styles.summary}>
          Most posts are in Korean for now. Follow new English posts with the{' '}
          <a href="/en/rss.xml">English RSS feed</a>, or browse the <Link href="/" hrefLang="ko">Korean home</Link>.
        </p>
      </section>
    </main>
  )
}
