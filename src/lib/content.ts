// 글 조회. Content Collections가 _content/**/*.mdx 를 읽어 만든 allPosts 위에서 동작한다. 서버 전용
// URL은 파일 경로 그대로: _content/{category}/{lng}/{sub}/.../{slug}.mdx → /{category}/{lng}/{sub}/.../{slug}
// 카테고리·서브카테고리 이름과 순서는 src/config/taxonomy.ts, 사이드바·시리즈 순서는 src/lib/sidebar.ts
import { allPosts } from 'content-collections'
import { CATEGORIES, TAXONOMY, categoryLabel, subLabel, type Category } from '@/config/taxonomy'
import { buildSidebars, seriesPosts, type Sidebar, type SidebarLink } from './sidebar'

export { CATEGORIES, categoryLabel, isCategory, subLabel, type Category } from '@/config/taxonomy'
export { formatDate } from './format'

export type Post = (typeof allPosts)[number]
export type Lng = 'ko' | 'en'

/** 최신순 (publishedAt은 스키마에서 YYYY-MM-DD로 검사됨) */
const byNewest = (a: Post, b: Post) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)

/** 공개 글: draft가 아니고 게시일이 지난 글. 초안·예약 글은 주소로도 열리지 않는다(404) */
export const releasedPosts: Post[] = allPosts.filter((p) => p.released).toSorted(byNewest)

export function getPost(category: string, lng: string, segments: string[]): Post | undefined {
  const url = `/${category}/${lng}/${segments.map(decodeURIComponent).join('/')}`
  return releasedPosts.find((p) => p.url === url)
}

export function getPosts({ lng, category }: { lng?: Lng; category?: Category } = {}): Post[] {
  return releasedPosts.filter((p) => (!lng || p.lng === lng) && (!category || p.category === category))
}

/** 공개 글이 있는 카테고리 (등록 순서). 글 0개인 카테고리(ai 등)는 메뉴·홈·필터에서 숨긴다 */
export function visibleCategories(lng: Lng = 'ko'): { id: Category; name: string; count: number }[] {
  return CATEGORIES.map((id) => ({ id, name: TAXONOMY[id].name, count: getPosts({ lng, category: id }).length })).filter(
    (c) => c.count > 0,
  )
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

// ── 사이드바 ─────────────────────────────────────────────────────────

const sidebars = buildSidebars(TAXONOMY, releasedPosts)

/** 카테고리·언어의 사이드바 (공개 글이 없으면 undefined) */
export const getSidebar = (category: string, lng: string): Sidebar | undefined => sidebars.get(`${category}/${lng}`)

/** 서브카테고리 첫 화면 주소 = 사이드바 순서로 가장 앞의 공개 글 */
export const subHref = (category: string, lng: string, sub: string): string | undefined =>
  getSidebar(category, lng)?.subs.find((s) => s.id === sub)?.href

// ── 시리즈 ───────────────────────────────────────────────────────────

export type SeriesInfo = { id: string; posts: SidebarLink[]; index: number }

/** 글이 속한 시리즈 (공개 글만, 사이드바 순서). 시리즈가 없거나 한 편뿐이면 undefined */
export function getSeries(post: Post): SeriesInfo | undefined {
  const posts = seriesPosts(TAXONOMY, releasedPosts, post)
  if (posts.length < 2 || !post.series) return undefined
  return { id: post.series, posts: posts.map(({ url, title }) => ({ url, title })), index: posts.findIndex((p) => p.url === post.url) }
}

// ── OG 이미지 ───────────────────────────────────────────────────────

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const

/** 글별 OG 이미지 주소 (src/app/og/[category]/[lng]/[...segments]/route.tsx 가 빌드 때 만든다) */
export const ogImagePath = (post: Pick<Post, 'url'>) => `/og${post.url}.png`

// ── 목록 화면용 요약 ─────────────────────────────────────────────────

/** 목록 화면에 넘기는 최소 필드 (클라이언트 컴포넌트로 본문 코드·taxonomy 설명이 넘어가지 않게 이름까지 여기서 붙인다) */
export type PostSummary = Pick<Post, 'url' | 'title' | 'summary' | 'publishedAt' | 'category' | 'lng' | 'sub' | 'tags'> & {
  categoryName: string
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
  categoryName: categoryLabel(category),
  subName: subLabel(category, sub),
  tags,
})
