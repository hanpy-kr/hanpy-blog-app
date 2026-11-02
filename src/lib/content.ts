// 글 조회. Content Collections가 _content/**/*.mdx 를 읽어 만든 allPosts 위에서 동작한다.
// URL은 파일 경로 그대로: _content/{category}/{lng}/{sub}/.../{slug}.mdx → /{category}/{lng}/{sub}/.../{slug}
// (세션 5에서 taxonomy.ts·사이드바 자동 생성과 함께 확장)
import { allPosts } from 'content-collections'
import { CONTENT_CATEGORY } from '@/data/const'
import type { Category } from './categories'

export { CATEGORIES, CATEGORY_LABEL, categoryLabel, formatDate, type Category } from './categories'

export type Post = (typeof allPosts)[number]
export type Lng = 'ko' | 'en'

/** 최신순. publishedAt이 `2025-5-20`처럼 0이 빠진 글이 있어 문자열이 아니라 날짜로 비교한다 */
const byNewest = (a: Post, b: Post) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)

/** 공개 글: deployment가 true이고 게시일이 지난 글. 초안은 주소로도 열리지 않는다(404) */
export const releasedPosts: Post[] = allPosts.filter((p) => p.released).toSorted(byNewest)

export function getPost(category: string, lng: string, segments: string[]): Post | undefined {
  const url = `/${category}/${lng}/${segments.map(decodeURIComponent).join('/')}`
  return releasedPosts.find((p) => p.url === url)
}

export function getPosts({ lng, category }: { lng?: Lng; category?: Category } = {}): Post[] {
  return releasedPosts.filter((p) => (!lng || p.lng === lng) && (!category || p.category === category))
}

/** 같은 category·sub·slug를 가진 다른 언어 글. 2개 언어 이상일 때만 hreflang을 낸다 */
export function getAlternates(post: Post): Record<string, string> {
  const key = post.segments.join('/')
  const out: Record<string, string> = {}
  for (const p of releasedPosts) {
    if (p.category === post.category && p.segments.join('/') === key) out[p.lng] = p.url
  }
  return Object.keys(out).length > 1 ? out : {}
}

/** 목록 화면에 넘기는 최소 필드 (클라이언트 컴포넌트로 본문 코드가 넘어가지 않게) */
export type PostSummary = Pick<Post, 'url' | 'title' | 'summary' | 'publishedAt' | 'category' | 'lng' | 'sub' | 'tags'> & {
  subName: string
}

export const toSummary = ({ url, title, summary, publishedAt, category, lng, sub, tags }: Post): PostSummary => ({
  url,
  title,
  summary,
  publishedAt,
  category,
  lng,
  sub,
  subName: subLabel(category, sub),
  tags,
})

/** 서브카테고리 표시 이름 (사이드바 데이터의 이름, 없으면 폴더 이름) */
export function subLabel(category: string, sub: string): string {
  const name = (CONTENT_CATEGORY[category]?.subCategory as Record<string, { name: string }> | undefined)?.[sub]?.name
  return name ?? sub
}
