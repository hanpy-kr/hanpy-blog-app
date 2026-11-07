// 태그별 글: /tags/{lng}/{tag} (세션 7). {tag}는 tagSlug로 정규화한 값 (소문자, 공백·특수문자 → '-')
// 글이 1개뿐인 태그는 링크가 끊기지 않게 페이지는 만들되 noindex·사이트맵 제외 (TAG_INDEX_MIN_POSTS)
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostList from '@/components/list/PostList'
import styles from '@/components/list/List.module.css'
import { LNGS, TAG_INDEX_MIN_POSTS, getTag, getTagPosts, getTags } from '@/lib/content'
import { pageMetadata } from '@/lib/page-metadata'

type Params = { lng: string; tag: string }

export function generateStaticParams(): Params[] {
  return LNGS.flatMap((lng) => getTags(lng).map((t) => ({ lng, tag: t.slug })))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lng, tag } = await params
  const t = getTag(lng, decodeURIComponent(tag))
  if (!t) return {}
  return pageMetadata({
    title: `#${t.label}`,
    description: `'${t.label}' 태그가 붙은 글 ${t.count}개를 최신순으로 모았습니다.`,
    path: t.href,
    lng,
    noindex: t.count < TAG_INDEX_MIN_POSTS,
  })
}

export default async function TagPage({ params }: { params: Promise<Params> }) {
  const { lng, tag } = await params
  const t = getTag(lng, decodeURIComponent(tag))
  if (!t) notFound()
  const posts = getTagPosts(lng, t.slug)

  return (
    <main className={styles.main}>
      <nav aria-label="현재 위치" className={styles.breadcrumb}>
        <Link href={`/tags/${lng}`}>태그</Link>
      </nav>
      <p className={styles.eyebrow}>/tags/{lng}</p>
      <h1 className={styles.title}>#{t.label}</h1>
      <p className={styles.lead}>글 {posts.length}개 · 최신순</p>
      <section aria-label="글" className={styles.section}>
        <PostList posts={posts} />
      </section>
    </main>
  )
}
