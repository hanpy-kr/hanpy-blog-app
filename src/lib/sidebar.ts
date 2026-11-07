// 사이드바·시리즈 순서 계산 (세션 5). 글 frontmatter의 group·order와 taxonomy의 등록 순서만으로 만든다
//
// 순서 규칙 (사이드바와 시리즈가 같은 규칙을 쓴다):
//   서브카테고리 등록 순서 → 그룹 등록 순서(taxonomy groups) → order → URL
// 링크 문구는 글 title. 링크가 없는 그룹·서브카테고리는 만들지 않는다
//
// 값 import 없이 타입만 가져온다. taxonomy는 인자로 받는다
// (scripts/check-sidebar.ts 가 Node 타입 제거로 이 파일을 그대로 실행하기 때문)
import type { CategoryDef } from '../config/taxonomy'

type Taxonomy = Readonly<Record<string, CategoryDef>>

/** 계산에 필요한 글 필드 (Content Collections의 Post가 이 모양을 포함한다) */
export type SidebarPost = {
  url: string
  title: string
  category: string
  lng: string
  sub: string
  group?: string
  order?: number
  series?: string
}

export type SidebarLink = { url: string; title: string }
export type SidebarGroup = { name: string; links: SidebarLink[] }
export type SidebarSub = {
  id: string
  name: string
  /** 사이드바 순서로 가장 앞에 오는 글 (서브카테고리 첫 화면) */
  href: string
  count: number
}
/** 한 카테고리·언어의 사이드바 */
export type Sidebar = {
  category: string
  lng: string
  /** 공개 글이 있는 서브카테고리만, 등록 순서 */
  subs: SidebarSub[]
  /** 서브카테고리 id → 그룹 목록 (링크가 있는 그룹만, 등록 순서) */
  groups: Record<string, SidebarGroup[]>
}

const indexOrEnd = (list: readonly string[], value: string | undefined) => {
  const i = value === undefined ? -1 : list.indexOf(value)
  return i === -1 ? Number.MAX_SAFE_INTEGER : i
}

/** 사이드바 정렬 키: [서브카테고리 순서, 그룹 순서, order] */
export function sidebarRank(taxonomy: Taxonomy, post: SidebarPost): [number, number, number] {
  const cat = Object.hasOwn(taxonomy, post.category) ? taxonomy[post.category] : undefined
  const subs = cat ? Object.keys(cat.subs) : []
  const sub = cat && Object.hasOwn(cat.subs, post.sub) ? cat.subs[post.sub] : undefined
  return [indexOrEnd(subs, post.sub), indexOrEnd(sub?.groups ?? [], post.group), post.order ?? Number.MAX_SAFE_INTEGER]
}

export function compareSidebar(taxonomy: Taxonomy) {
  return (a: SidebarPost, b: SidebarPost): number => {
    const ra = sidebarRank(taxonomy, a)
    const rb = sidebarRank(taxonomy, b)
    for (let i = 0; i < ra.length; i++) if (ra[i] !== rb[i]) return ra[i] - rb[i]
    return a.url < b.url ? -1 : a.url > b.url ? 1 : 0
  }
}

/** 공개 글 목록 → 카테고리·언어별 사이드바. 키는 `${category}/${lng}` */
export function buildSidebars(taxonomy: Taxonomy, posts: readonly SidebarPost[]): Map<string, Sidebar> {
  const sorted = posts.toSorted(compareSidebar(taxonomy))
  const out = new Map<string, Sidebar>()
  for (const p of sorted) {
    const key = `${p.category}/${p.lng}`
    let sidebar = out.get(key)
    if (!sidebar) {
      sidebar = { category: p.category, lng: p.lng, subs: [], groups: {} }
      out.set(key, sidebar)
    }
    let sub = sidebar.subs.find((s) => s.id === p.sub)
    if (!sub) {
      const def = taxonomy[p.category]?.subs[p.sub]
      // 정렬했으므로 서브카테고리의 첫 글이 곧 첫 화면
      sub = { id: p.sub, name: def?.name ?? p.sub, href: p.url, count: 0 }
      sidebar.subs.push(sub)
      sidebar.groups[p.sub] = []
    }
    sub.count++
    const groups = sidebar.groups[p.sub]
    const name = p.group ?? ''
    let group = groups.at(-1)
    if (!group || group.name !== name) {
      group = { name, links: [] }
      groups.push(group)
    }
    group.links.push({ url: p.url, title: p.title })
  }
  return out
}

/** 같은 카테고리·언어·시리즈 id의 글을 사이드바 순서로 */
export function seriesPosts<T extends SidebarPost>(taxonomy: Taxonomy, posts: readonly T[], post: SidebarPost): T[] {
  if (!post.series) return []
  return posts
    .filter((p) => p.series === post.series && p.category === post.category && p.lng === post.lng)
    .toSorted(compareSidebar(taxonomy))
}
