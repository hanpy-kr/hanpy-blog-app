/**
 * 사이드바 비교 검사 (세션 5)
 *
 * 빌드가 만든 글 데이터(.content-collections/generated)로 사이드바를 앱과 같은 코드(src/lib/sidebar.ts)로 만들어
 * sidebar.before.json (main 의 손으로 쓴 사이드바)과 비교한다.
 *
 *   pnpm build && pnpm check:sidebar [--report <파일.md>] [--series]
 *
 * 실패(종료 코드 1):
 *   - 예전 사이드바 링크가 새 사이드바의 같은 카테고리·언어·서브카테고리에 없음
 *   - 시리즈 편수가 계획 문서의 확정 17묶음과 다름
 * 정보: 그룹이 바뀐 링크, 그룹 안 순서가 바뀐 곳, 새로 들어온 링크, 숨겨진·새 서브카테고리, 시리즈 순서(--series)
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { TAXONOMY } from '../src/config/taxonomy.ts'
import { buildSidebars, seriesPosts, type SidebarPost } from '../src/lib/sidebar.ts'

const root = resolve(import.meta.dirname, '..')
const args = process.argv.slice(2)
const reportFile = args.includes('--report') ? args[args.indexOf('--report') + 1] : undefined
const showSeries = args.includes('--series')

/** 계획 문서 '확정된 시리즈 17묶음'의 편수 (초안 포함) */
const EXPECTED_SERIES: Record<string, number> = {
  kubernetes: 19,
  'architecture-basics': 12,
  'aws-vpc': 12,
  grpc: 9,
  'software-requirements': 9,
  auth: 8,
  karpenter: 7,
  git: 7,
  packer: 6,
  solid: 5,
  tdd: 5,
  'concurrency-control': 5,
  'mongodb-concurrency': 4,
  'aws-efs': 4,
  serverless: 3,
  'typescript-essential': 3,
  'typescript-intermediate': 3,
}

const generated = join(root, '.content-collections/generated/index.js')
if (!existsSync(generated)) {
  console.error('글 데이터가 없습니다. 먼저 pnpm build (또는 next build)를 실행하세요')
  process.exit(2)
}
type Post = SidebarPost & { released: boolean; draft: boolean }
const { allPosts } = (await import(pathToFileURL(generated).href)) as { allPosts: Post[] }
const released = allPosts.filter((p) => p.released)
const sidebars = buildSidebars(TAXONOMY, released)

// 새 사이드바: url → 위치
type Place = { key: string; sub: string; group: string; index: number; title: string }
const placeOf = new Map<string, Place>()
for (const [key, sb] of sidebars) {
  for (const sub of sb.subs) {
    for (const g of sb.groups[sub.id]) {
      g.links.forEach((l, index) => placeOf.set(l.url, { key, sub: sub.id, group: g.name, index, title: l.title }))
    }
  }
}

// 예전 사이드바
type BeforeLink = { title: string; href: string; state?: string }
type Before = {
  counts: Record<string, number>
  categories: Record<
    string,
    { subCategories: { id: string; name: string; href: string }[]; sidebars: Record<string, { group: string; links: BeforeLink[] }[]> }
  >
}
const before = JSON.parse(readFileSync(join(root, 'sidebar.before.json'), 'utf8')) as Before
/** 예전 링크 주소 정리: `.mdx`가 붙은 깨진 링크(x509)도 글 주소로 본다 */
const norm = (href: string) => decodeURIComponent(href.replace(/[?#].*$/, '').replace(/\.mdx$/, ''))

const missing: string[] = []
const fixed: string[] = []
const moved: string[] = []
const reordered: string[] = []
const seen = new Set<string>()
let beforeLinks = 0
let renamed = 0

for (const [category, def] of Object.entries(before.categories)) {
  for (const [sub, groups] of Object.entries(def.sidebars)) {
    for (const { group, links } of groups) {
      const placed: { url: string; place: Place }[] = []
      for (const link of links) {
        beforeLinks++
        const url = norm(link.href)
        const lng = url.split('/')[2]
        const dup = seen.has(url)
        seen.add(url)
        const place = placeOf.get(url)
        if (!place || place.key !== `${category}/${lng}` || place.sub !== sub) {
          missing.push(`${category}/${sub} '${group}' '${link.title}' → ${link.href}${place ? ` (지금 ${place.key}/${place.sub} 에 있음)` : ''}`)
          continue
        }
        if (dup) {
          fixed.push(`중복 링크 정리: ${url} (예전 '${group}'에 한 번 더 있었음)`)
          continue
        }
        if (link.state === 'missing') fixed.push(`깨진 링크 복구: '${link.title}' ${link.href} → ${url}`)
        if (place.title !== link.title) renamed++
        if (place.group !== group) moved.push(`${url}: '${group}' → '${place.group}'`)
        else placed.push({ url, place })
      }
      // 같은 그룹에 남은 링크끼리 순서가 유지됐는지
      for (let i = 1; i < placed.length; i++) {
        if (placed[i].place.index < placed[i - 1].place.index) {
          reordered.push(`${category}/${sub} '${group}': ${placed[i - 1].url} 가 ${placed[i].url} 보다 뒤로`)
        }
      }
    }
  }
}

const newLinks = [...placeOf]
  .filter(([url]) => !seen.has(url))
  .map(([url, p]) => `${url} — '${p.title}' (${p.key}/${p.sub} '${p.group}' ${p.index + 1}번째)`)
  .sort()

// 서브카테고리 선택 상자
const subNotes: string[] = []
for (const [category, def] of Object.entries(before.categories)) {
  for (const s of def.subCategories) {
    const visible = [...sidebars.values()].some((sb) => sb.category === category && sb.subs.some((x) => x.id === s.id))
    if (!visible) subNotes.push(`숨김(공개 글 0개): ${category}/${s.id} '${s.name}'`)
  }
}
for (const sb of sidebars.values()) {
  for (const s of sb.subs) {
    const known = before.categories[sb.category]?.subCategories.some((x) => x.id === s.id)
    if (!known) subNotes.push(`새로 보임: ${sb.category}/${s.id} '${s.name}' (${sb.lng}, ${s.count}개)`)
    if (sb.lng !== 'ko') subNotes.push(`${sb.lng} 사이드바: ${sb.category}/${s.id} — 같은 언어 글만 보임 (예전에는 ko 목록을 그대로 보여 줌), ${s.count}개`)
  }
}

// 시리즈
const seriesErrors: string[] = []
const seriesLines: string[] = []
const ids = [...new Set(allPosts.map((p) => p.series).filter((s): s is string => !!s))].sort()
for (const id of ids) {
  const all = allPosts.filter((p) => p.series === id)
  const first = all[0]
  const ordered = seriesPosts(TAXONOMY, all, first)
  if (ordered.length !== all.length) seriesErrors.push(`${id}: 카테고리·언어가 섞여 있음`)
  const expected = EXPECTED_SERIES[id]
  if (expected === undefined) seriesErrors.push(`${id}: 계획 문서에 없는 시리즈 (${all.length}편)`)
  else if (expected !== all.length) seriesErrors.push(`${id}: ${all.length}편 (계획 ${expected}편)`)
  seriesLines.push(`- ${id} (${all.filter((p) => p.released).length}/${all.length}편): ${ordered.map((p) => `${p.url.split('/').pop()}${p.released ? '' : '(초안)'}`).join(' → ')}`)
}
for (const id of Object.keys(EXPECTED_SERIES)) if (!ids.includes(id)) seriesErrors.push(`${id}: 글이 없음`)

const linkCount = placeOf.size
const lines = [
  `## 사이드바 비교 (sidebar.before.json ↔ frontmatter group·order)`,
  ``,
  `- 예전 링크 ${beforeLinks}개(고유 ${seen.size}개) 중 빠진 링크 **${missing.length}개**`,
  `- 새 사이드바 링크 ${linkCount}개 = 예전 고유 ${seen.size - missing.length}개 + 새로 들어온 ${newLinks.length}개 (공개 글 ${released.length}개)`,
  `- 링크 문구가 title로 바뀐 링크 ${renamed}개 · 그룹이 바뀐 링크 ${moved.length}개 · 그룹 안 순서가 바뀐 곳 ${reordered.length}곳`,
  `- 시리즈 ${ids.length}묶음, 편수 불일치 ${seriesErrors.length}건`,
  ...section('빠진 링크', missing),
  ...section('보정', fixed),
  ...section('그룹이 바뀐 링크', moved),
  ...section('그룹 안 순서가 바뀐 곳', reordered),
  ...section('새로 들어온 링크 (예전 사이드바에 없던 공개 글)', newLinks),
  ...section('서브카테고리 선택 상자', subNotes),
  ...section('시리즈 편수 문제', seriesErrors),
  ...(showSeries || reportFile ? ['', '### 시리즈 순서 (사이드바 순서: 서브카테고리 → 그룹 → order)', '', ...seriesLines] : []),
]

function section(title: string, items: string[]): string[] {
  return items.length ? ['', `### ${title} (${items.length})`, '', ...items.map((i) => (i.startsWith('- ') ? i : `- ${i}`))] : []
}

const text = lines.join('\n')
console.log(text)
if (reportFile) writeFileSync(reportFile, text + '\n')
if (missing.length || seriesErrors.length) process.exit(1)
