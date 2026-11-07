// 글 페이지 (디자인 시안 'Post'·'PostMobile'). URL은 그대로 /{category}/{lng}/{sub}/.../{slug}
// [...segments]로 받는 이유: frontend/ko/nextjs/seo/next-sitemap 처럼 sub 아래 한 단계가 더 있는 글이 있음
// 왼쪽 사이드바는 frontmatter group·order로 자동 생성(세션 5). 시리즈 상자·이전/다음 글·함께 읽을 글·태그 링크는 세션 7
// 세그먼트가 하나뿐인 주소(/{category}/{lng}/{sub})는 서브카테고리 글 목록 (세션 7, SubListPage)
import { MDXContent } from '@content-collections/mdx/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AdSlot from '@/components/ads/AdSlot'
import AuthorCard from '@/components/common/AuthorCard'
import BlogSidebar from '@/components/blog/BlogSidebar'
import prose from '@/components/blog/Prose.module.css'
import { RelatedPosts, SeriesPager } from '@/components/blog/PostFooterNav'
import SeriesBox from '@/components/blog/SeriesBox'
import { TocDisclosure, TocRail } from '@/components/blog/Toc'
import JsonLd from '@/components/seo/JsonLd'
import { AUTHOR, OG_LOCALE, SITE_NAME, rssAlternate } from '@/config/site'
import {
  OG_IMAGE_SIZE,
  categoryLabel,
  categoryHref,
  formatDate,
  getAlternates,
  getPost,
  getRelated,
  getSeries,
  getSidebar,
  ogImagePath,
  releasedPosts,
  subLabel,
  subListHref,
  tagHref,
  tagSlug,
  visibleSubs,
} from '@/lib/content'
import { postLd } from '@/lib/structured-data'
import SubListPage, { subListMetadata } from './SubListPage'
import styles from './page.module.css'

type Params = { category: string; lng: string; segments: string[] }

// 넓은 표가 폰 화면에서 페이지 전체를 늘리지 않도록 가로 스크롤 상자로 감싼다
// AdSlot: 빌드 때 본문 가운데 ## 앞에 들어간 광고 자리 (src/lib/remark-ad-slot.ts). ads: false 글은 비운다
const tableWrap = (props: React.ComponentProps<'table'>) => (
  <div className={prose.tableWrap}>
    <table {...props} />
  </div>
)
const mdxComponents = { table: tableWrap, AdSlot }
const mdxComponentsNoAds = { table: tableWrap, AdSlot: () => null }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  const posts = releasedPosts.map((p) => ({ category: p.category, lng: p.lng, segments: p.segments }))
  // 서브카테고리 목록 (공개 글이 있는 것만)
  const subs = [...new Set(releasedPosts.map((p) => `${p.category}/${p.lng}`))].flatMap((key) => {
    const [category, lng] = key.split('/')
    return visibleSubs(category, lng).map((s) => ({ category, lng, segments: [s.id] }))
  })
  return [...posts, ...subs]
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category, lng, segments } = await params
  if (segments.length === 1) return subListMetadata(category, lng, segments[0])
  const post = getPost(category, lng, segments)
  if (!post) return {}
  const languages = getAlternates(post)
  // 글마다 빌드 때 만든 OG 이미지 (src/app/og/…/route.tsx)
  const image = { url: ogImagePath(post), ...OG_IMAGE_SIZE, alt: post.title }
  return {
    title: post.title, // 레이아웃 템플릿으로 '제목 | Hanpy Blog'
    description: post.summary,
    keywords: post.tags,
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    alternates: {
      canonical: post.url,
      ...(Object.keys(languages).length ? { languages } : {}),
      types: rssAlternate(post.lng),
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary,
      url: post.url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[post.lng === 'en' ? 'en' : 'ko'],
      images: [image],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [AUTHOR.url],
      section: categoryLabel(post.category),
      tags: post.tags,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.summary, images: [image.url] },
  }
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { category, lng, segments } = await params
  if (segments.length === 1) return <SubListPage category={category} lng={lng} sub={segments[0]} />
  const post = getPost(category, lng, segments)
  if (!post) notFound()

  const catName = categoryLabel(post.category)
  const subName = subLabel(post.category, post.sub)
  const en = post.lng === 'en'
  // 같은 카테고리·언어의 공개 글로 만든 사이드바. 공개 글은 모두 group·order가 있으므로(빌드 검사) 항상 있다
  const sidebar = getSidebar(post.category, post.lng)
  const groups = sidebar?.groups[post.sub] ?? []
  const series = getSeries(post)
  const related = getRelated(post)

  return (
    <div className={styles.layout} data-has-sidebar={sidebar ? '' : undefined}>
      {sidebar && (
        <aside className={styles.sidebar}>
          <BlogSidebar
            category={post.category}
            categoryName={catName}
            subs={sidebar.subs.map(({ id, name, href }) => ({ id, name, href }))}
            current={post.sub}
            groups={groups}
          />
        </aside>
      )}

      <main className={styles.main}>
        <JsonLd data={postLd(post)} />
        <nav aria-label={en ? 'Breadcrumb' : '현재 위치'} className={styles.breadcrumb}>
          <Link href={categoryHref(post.category, post.lng)}>{catName}</Link>
          <span aria-hidden="true">/</span>
          <Link href={subListHref(post.category, post.lng, post.sub)}>{subName}</Link>
        </nav>

        <header className={styles.header}>
          <p className={styles.eyebrow}>
            {catName} · {subName}
          </p>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.summary}>{post.summary}</p>
          <div className={styles.meta}>
            <span className={styles.author}>
              <span aria-hidden="true" className={styles.avatar}>
                H
              </span>
              {AUTHOR.name}
            </span>
            <time dateTime={post.publishedAt} className={styles.date}>
              {formatDate(post.publishedAt)}
            </time>
            <span>{en ? `${post.readingMinutes} min read` : `약 ${post.readingMinutes}분`}</span>
          </div>
          {post.tags.length > 0 && (
            <ul aria-label={en ? 'Tags' : '태그'} className={styles.tags}>
              {post.tags.map((t) =>
                tagSlug(t) ? (
                  <li key={t}>
                    <Link href={tagHref(post.lng, tagSlug(t))}>#{t}</Link>
                  </li>
                ) : null,
              )}
            </ul>
          )}
        </header>

        {series && (
          <SeriesBox name={series.name} href={`/series/${series.lng}/${series.id}`} posts={series.posts} index={series.index} />
        )}

        {post.toc.length > 1 && (
          <div className={styles.tocMobile}>
            <TocDisclosure items={post.toc} />
          </div>
        )}

        <article className={prose.prose}>
          <MDXContent code={post.body} components={post.ads ? mdxComponents : mdxComponentsNoAds} />
        </article>

        <div className={styles.after}>
          {series && <SeriesPager series={series} />}
          <AuthorCard as="section" />
          <RelatedPosts posts={related} />
        </div>
      </main>

      {post.toc.length > 1 && (
        <aside className={styles.toc}>
          <TocRail items={post.toc} />
          {post.ads && <AdSlot placement="sidebar" />}
        </aside>
      )}
    </div>
  )
}
