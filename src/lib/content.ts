// 글 조회. Content Collections가 _content/**/*.mdx 를 읽어 만든 allPosts 위에서 동작한다. 서버 전용
// URL은 파일 경로 그대로: _content/{category}/{lng}/{sub}/.../{slug}.mdx → /{category}/{lng}/{sub}/.../{slug}
// 카테고리·서브카테고리 이름과 순서는 src/config/taxonomy.ts, 사이드바·시리즈 순서는 src/lib/sidebar.ts
import { allPosts } from 'content-collections'
import { seriesName } from '@/config/series'
import { CATEGORIES, TAXONOMY, categoryLabel, subIds, subLabel, type Category } from '@/config/taxonomy'
import { buildSidebars, seriesPosts, type Sidebar, type SidebarLink } from './sidebar'

export { CATEGORIES, categoryLabel, isCategory, subLabel, type Category } from '@/config/taxonomy'
export { seriesName } from '@/config/series'
export { formatDate } from './format'

export type Post = (typeof allPosts)[number]
export type Lng = 'ko' | 'en'
export const LNGS: Lng[] = ['ko', 'en']

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

export type SeriesInfo = { id: string; name: string; lng: string; posts: SidebarLink[]; index: number }

/** 글이 속한 시리즈 (공개 글만, 사이드바 순서). 시리즈가 없거나 한 편뿐이면 undefined */
export function getSeries(post: Post): SeriesInfo | undefined {
  const posts = seriesPosts(TAXONOMY, releasedPosts, post)
  if (posts.length < 2 || !post.series) return undefined
  return {
    id: post.series,
    name: seriesName(post.series),
    lng: post.lng,
    posts: posts.map(({ url, title }) => ({ url, title })),
    index: posts.findIndex((p) => p.url === post.url),
  }
}

/** 시리즈 목차·목록 화면용 */
export type SeriesSummary = {
  id: string
  name: string
  lng: string
  category: Category
  sub: string
  /** 공개 글, 사이드바 순서 */
  posts: Post[]
  /** 시리즈 목차 주소 */
  href: string
}

/** 언어별 시리즈 (공개 글이 2편 이상인 것). 카테고리 등록 순서 → 편수 많은 순 */
export function getSeriesList(lng: string): SeriesSummary[] {
  const ids = [...new Set(releasedPosts.filter((p) => p.lng === lng && p.series).map((p) => p.series as string))]
  return ids
    .map((id) => {
      const first = releasedPosts.find((p) => p.lng === lng && p.series === id)!
      const posts = seriesPosts(TAXONOMY, releasedPosts, first)
      return {
        id,
        name: seriesName(id),
        lng,
        category: posts[0].category as Category,
        sub: posts[0].sub,
        posts,
        href: `/series/${lng}/${id}`,
      }
    })
    .filter((s) => s.posts.length >= 2)
    .toSorted((a, b) => CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category) || b.posts.length - a.posts.length)
}

export const getSeriesById = (lng: string, id: string) => getSeriesList(lng).find((s) => s.id === id)

/** 시리즈가 있는 언어 */
export const seriesLngs = () => LNGS.filter((l) => getSeriesList(l).length > 0)

// ── 태그 ─────────────────────────────────────────────────────────────

/**
 * 태그 주소 조각: 소문자, 공백 → '-', 주소에 쓰기 곤란한 문자(. / ? # % & 등)도 '-'
 * 예) 'Node.js' → 'node-js', 'React' ≡ 'react', 'ECR/Docker Hub' → 'ecr-docker-hub'
 */
export function tagSlug(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}_-]+/gu, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
}

export type TagSummary = { slug: string; label: string; count: number; href: string }

const tagCache = new Map<string, TagSummary[]>()

/** 언어별 태그 (글 많은 순 → 이름순). 표시 이름은 가장 많이 쓴 표기 */
export function getTags(lng: string): TagSummary[] {
  const cached = tagCache.get(lng)
  if (cached) return cached
  const map = new Map<string, { count: number; forms: Map<string, number> }>()
  for (const p of releasedPosts) {
    if (p.lng !== lng) continue
    for (const slug of new Set(p.tags.map(tagSlug).filter(Boolean))) {
      const e = map.get(slug) ?? { count: 0, forms: new Map() }
      e.count++
      map.set(slug, e)
    }
    for (const t of p.tags) {
      const e = map.get(tagSlug(t))
      if (e) e.forms.set(t.trim(), (e.forms.get(t.trim()) ?? 0) + 1)
    }
  }
  const out = [...map]
    .map(([slug, e]) => ({
      slug,
      label: [...e.forms].toSorted((a, b) => b[1] - a[1])[0][0],
      count: e.count,
      href: tagHref(lng, slug),
    }))
    .toSorted((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'ko'))
  tagCache.set(lng, out)
  return out
}

export const tagHref = (lng: string, slug: string) => `/tags/${lng}/${encodeURIComponent(slug)}`

export const getTag = (lng: string, slug: string) => getTags(lng).find((t) => t.slug === slug)

/** 태그가 붙은 공개 글 (최신순) */
export const getTagPosts = (lng: string, slug: string) =>
  releasedPosts.filter((p) => p.lng === lng && p.tags.some((t) => tagSlug(t) === slug))

/** 이 태그 페이지를 검색에 내보낼지: 글이 2개 이상일 때만 (1개짜리 태그 282개는 noindex·사이트맵 제외) */
export const TAG_INDEX_MIN_POSTS = 2

/**
 * 함께 읽을 글: 같은 언어에서 태그가 많이 겹치는 순 (겹침 0은 제외)
 * 같은 시리즈 글은 이전·다음 글·시리즈 상자가 이미 보여 주므로 뺀다
 * 겹침 수가 같으면 같은 카테고리 → 최신순
 */
export function getRelated(post: Post, limit = 3): Post[] {
  const mine = new Set(post.tags.map(tagSlug).filter(Boolean))
  if (mine.size === 0) return []
  return releasedPosts
    .filter((p) => p.lng === post.lng && p.url !== post.url && !(post.series && p.series === post.series))
    .map((p) => ({ p, score: new Set(p.tags.map(tagSlug).filter((t) => mine.has(t))).size }))
    .filter((x) => x.score > 0)
    .toSorted(
      (a, b) =>
        b.score - a.score ||
        Number(b.p.category === post.category) - Number(a.p.category === post.category) ||
        Date.parse(b.p.publishedAt) - Date.parse(a.p.publishedAt),
    )
    .slice(0, limit)
    .map((x) => x.p)
}

// ── 카테고리·서브카테고리 목록 ───────────────────────────────────────

export const categoryHref = (category: string, lng: string) => `/${category}/${lng}`
export const subListHref = (category: string, lng: string, sub: string) => `/${category}/${lng}/${sub}`

/** 공개 글이 있는 카테고리·언어 쌍 */
export function categoryLngs(): { category: Category; lng: Lng }[] {
  return CATEGORIES.flatMap((category) =>
    LNGS.filter((lng) => getPosts({ lng, category }).length > 0).map((lng) => ({ category, lng })),
  )
}

/** 공개 글이 있는 서브카테고리 (taxonomy 등록 순서) */
export function visibleSubs(category: string, lng: string): { id: string; name: string; count: number }[] {
  const posts = releasedPosts.filter((p) => p.category === category && p.lng === lng)
  return subIds(category)
    .map((id) => ({ id, name: subLabel(category, id), count: posts.filter((p) => p.sub === id).length }))
    .filter((s) => s.count > 0)
}

/** 서브카테고리 글을 사이드바 그룹 순서대로 */
export function getSubGroups(category: string, lng: string, sub: string): { name: string; posts: Post[] }[] {
  const groups = getSidebar(category, lng)?.groups[sub] ?? []
  const byUrl = new Map(releasedPosts.map((p) => [p.url, p]))
  return groups.map((g) => ({ name: g.name, posts: g.links.map((l) => byUrl.get(l.url)!).filter(Boolean) }))
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
