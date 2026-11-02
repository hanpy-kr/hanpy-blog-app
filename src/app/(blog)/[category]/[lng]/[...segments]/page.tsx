// 글 페이지: URL은 그대로 /{category}/{lng}/{sub}/.../{slug}
// [...segments]로 받는 이유: frontend/ko/nextjs/seo/next-sitemap 처럼 sub 아래 한 단계가 더 있는 글이 있음
import { MDXContent } from '@content-collections/mdx/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogSidebar from '@/components/blog/BlogSidebar'
import { resolveBlogRouteRule } from '@/lib/blog-route-rules'
import { getAlternates, getPost, releasedPosts } from '@/lib/content'
import styles from './page.module.css'

type Params = { category: string; lng: string; segments: string[] }

// 넓은 표가 폰 화면에서 페이지 전체를 늘리지 않도록 가로 스크롤 상자로 감싼다
const mdxComponents = {
  table: (props: React.ComponentProps<'table'>) => (
    <div className={styles.tableWrap}>
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

  return (
    <div className={styles.container}>
      {rule && (
        <aside className={styles.sidebar}>
          <BlogSidebar type={rule.type} subType={rule.subType} />
        </aside>
      )}
      <article className={styles.content}>
        <p className={styles.label}>{rule ? String(rule.subType) : post.sub}</p>
        <MDXContent code={post.body} components={mdxComponents} />
      </article>
    </div>
  )
}
