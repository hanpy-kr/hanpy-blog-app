// 글 페이지 (디자인 시안 'Post'·'PostMobile'). URL은 그대로 /{category}/{lng}/{sub}/.../{slug}
// [...segments]로 받는 이유: frontend/ko/nextjs/seo/next-sitemap 처럼 sub 아래 한 단계가 더 있는 글이 있음
// 시리즈 상자·이전/다음 글은 세션 4·5(series 데이터), 함께 읽을 글·광고 자리는 세션 7
import { MDXContent } from '@content-collections/mdx/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AuthorCard from '@/components/common/AuthorCard'
import BlogSidebar from '@/components/blog/BlogSidebar'
import prose from '@/components/blog/Prose.module.css'
import { TocDisclosure, TocRail } from '@/components/blog/Toc'
import { CONTENT_CATEGORY } from '@/data/const'
import { resolveBlogRouteRule } from '@/lib/blog-route-rules'
import { categoryLabel, formatDate, getAlternates, getPost, releasedPosts, subLabel } from '@/lib/content'
import { AUTHOR } from '@/lib/site'
import styles from './page.module.css'

type Params = { category: string; lng: string; segments: string[] }

// 넓은 표가 폰 화면에서 페이지 전체를 늘리지 않도록 가로 스크롤 상자로 감싼다
const mdxComponents = {
  table: (props: React.ComponentProps<'table'>) => (
    <div className={prose.tableWrap}>
      <table {...props} />
    </div>
  ),
}

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return releasedPosts.map((p) => ({ category: p.category, lng: p.lng, segments: p.segments }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category, lng, segments } = await params
  const post = getPost(category, lng, segments)
  if (!post) return {}
  const languages = getAlternates(post)
  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    alternates: { canonical: post.url, ...(Object.keys(languages).length ? { languages } : {}) },
    openGraph: { title: post.title, description: post.summary, url: post.url, type: 'article' },
    twitter: { card: 'summary_large_image', title: post.title, description: post.summary },
  }
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { category, lng, segments } = await params
  const post = getPost(category, lng, segments)
  if (!post) notFound()

  // 사이드바 목록은 아직 라우트 규칙(src/lib/blog-route-rules.ts)에 등록된 폴더에만 있다. 없으면 본문만 보여 준다
  const rule = resolveBlogRouteRule(post.url.slice(1))
  const catName = categoryLabel(post.category)
  const subName = subLabel(post.category, post.sub)
  const subHref: string | undefined = CONTENT_CATEGORY[post.category]?.subCategory?.[post.sub]?.href
  const en = post.lng === 'en'
  // 사이드바 선택 상자에는 공개 글이 있는 서브카테고리만 (글 0개인 utils·mongodb 등은 숨김)
  const availableSubs = [
    ...new Set(releasedPosts.filter((p) => p.category === post.category && p.lng === post.lng).map((p) => p.sub)),
  ]

  return (
    <div className={styles.layout} data-has-sidebar={rule ? '' : undefined}>
      {rule && (
        <aside className={styles.sidebar}>
          <BlogSidebar type={rule.type} subType={rule.subType} availableSubs={availableSubs} />
        </aside>
      )}

      <main className={styles.main}>
        <nav aria-label={en ? 'Breadcrumb' : '현재 위치'} className={styles.breadcrumb}>
          <Link href={`/posts?category=${post.category}`}>{catName}</Link>
          <span aria-hidden="true">/</span>
          {subHref ? <Link href={subHref}>{subName}</Link> : <span>{subName}</span>}
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
              {post.tags.map((t) => (
                <li key={t}>#{t}</li>
              ))}
            </ul>
          )}
        </header>

        {post.toc.length > 1 && (
          <div className={styles.tocMobile}>
            <TocDisclosure items={post.toc} />
          </div>
        )}

        <article className={prose.prose}>
          <MDXContent code={post.body} components={mdxComponents} />
        </article>

        <AuthorCard as="section" />
      </main>

      {post.toc.length > 1 && (
        <aside className={styles.toc}>
          <TocRail items={post.toc} />
        </aside>
      )}
    </div>
  )
}
