// 글 페이지: 기존 23벌 페이지 파일 → 1개. URL은 그대로 /{category}/{lng}/{sub}/.../{slug}
// [...segments]로 받는 이유: frontend/ko/nextjs/seo/next-sitemap 처럼 sub 아래 한 단계가 더 있는 글이 있음
import { MDXContent } from '@content-collections/mdx/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAlternates, getPost, releasedPosts } from '@/lib/content'

type Params = { category: string; lng: string; segments: string[] }

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
  }
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { category, lng, segments } = await params
  const post = getPost(category, lng, segments)
  if (!post) notFound()

  return (
    <article>
      <h1>{post.title}</h1>
      <p className="meta">
        {post.category} / {post.sub} · {post.publishedAt}
        {post.tags.length > 0 && ` · ${post.tags.join(', ')}`}
      </p>
      <MDXContent code={post.body} />
    </article>
  )
}
