/**
 * 콘텐츠 마이그레이션 (세션 4). _content/ 아래 글을 새 frontmatter·본문 규칙으로 한 번에 바꾼다.
 *
 *   node scripts/migrate-content.ts            # 바꾸고 보고서를 표준 출력으로
 *   node scripts/migrate-content.ts --dry      # 파일은 그대로 두고 보고서만
 *   node scripts/migrate-content.ts --report <파일>   # 보고서를 파일로
 *
 * 하는 일
 *   1. 파일 이름: .md → .mdx, 확장자가 깨진 이름(foundation-3-mdx 등)·URL에 못 쓰는 문자(class:fnc 분리가이드) 정리
 *   2. frontmatter
 *      - category·lng·pageKey 삭제 (경로가 기준), deployment → draft (공개 글은 생략)
 *      - publishedAt 을 YYYY-MM-DD 로 (2025-5-20 → 2025-05-20)
 *      - group·order: sidebar.before.json (main 의 src/data/const/*.ts 스냅샷) 기준 + 아래 SIDEBAR_FIXES
 *      - series: 계획 문서의 확정 시리즈 17묶음 (SERIES)
 *      - 다른 글의 frontmatter 를 그대로 복사해 둔 초안은 본문 첫 제목을 title 로, 복사된 summary·tags 는 비움
 *   3. 본문
 *      - 첫 줄의 `# 제목` 삭제 (글 제목은 frontmatter title 하나만 씀). title 과 다르면 보고서 표에 남김
 *        첫 줄이 title 과 똑같은 `## 제목` 이어도 삭제
 *      - 남은 h1(여분 h1)을 h2 로. 그 h1 단락 안에 h2 가 있으면 단락 전체 제목을 한 단계씩 내려 구조를 유지
 *
 * 여러 번 돌려도 결과가 같다 (이미 바뀐 글은 그대로 둠). 의존성: yaml (Content Collections 와 같은 파서)
 */
import { existsSync, readdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { isDeepStrictEqual } from 'node:util'
import YAML from 'yaml'

const ROOT = '_content'
const TODAY = '2026-11-03' // frontmatter 가 아예 없던 초안의 publishedAt (발행할 때 작성자가 고침)
const dry = process.argv.includes('--dry')
const reportPath = (() => {
  const i = process.argv.indexOf('--report')
  return i !== -1 ? process.argv[i + 1] : undefined
})()

// ─── 1. 이름 정리 ───────────────────────────────────────────────
const RENAMES: Record<string, string> = {
  'backend/ko/mongodb/foundation-1-.mdx': 'backend/ko/mongodb/foundation-1.mdx',
  'backend/ko/mongodb/foundation-2-.mdx': 'backend/ko/mongodb/foundation-2.mdx',
  'backend/ko/mongodb/foundation-3-mdx': 'backend/ko/mongodb/foundation-3.mdx',
  'backend/ko/test/class:fnc 분리가이드.md': 'backend/ko/test/class-fnc-separation-guide.mdx',
}

// ─── 2. 사이드바 보정 (기준선의 잘못된 링크·사이드바에 없던 공개 글) ──────────
// key = 글 URL, value = [group, order]. 기준선보다 먼저 적용된다
const SIDEBAR_FIXES: Record<string, [string, number]> = {
  // 기준선의 깨진 링크(.mdx 확장자 포함) 자리
  '/infra/ko/kubernetes/kube-ts-01-x509': ['Trouble-Shooting', 1],
  // 기준선에서 "VSCode Debugging" 링크가 nestjs-config-service 를 잘못 가리키던 자리
  '/backend/ko/nestjs/nestjs-debug': ['Middle', 2],
  // 기준선 이후 공개된 글·사이드바에 없던 공개 글: 같은 서브카테고리의 알맞은 그룹 끝에 붙임
  '/backend/ko/base/architecture-basics-00-hexagonal-architecture': ['Middle', 3],
  '/backend/ko/database/redis-redlock': ['Redis', 5],
  '/infra/ko/base/nfs': ['Beginner', 16],
  '/infra/ko/docker/_command': ['Beginner', 3],
  '/infra/ko/kubernetes/_statefulset': ['Beginner', 18],
  '/language/ko/typescript/type-casting': ['TypeScript Essentials', 5],
  // 시리즈 목차 글은 첫 그룹 맨 앞(0)
  '/language/ko/nodejs/contents': ['Introduction & Fundamentals', 0],
  '/language/ko/typescript/contents': ['TypeScript Essentials', 0],
  // 영어 글 (영어 사이드바는 아직 없음, ko 1-1 과 같은 자리)
  '/infra/en/kubernetes/01.Introduction': ['Beginner', 1],
  // 초안: 시리즈 순서를 위해 자리만 잡아 둠
  '/infra/ko/kubernetes/3-0.command': ['Middle', 0],
}
// 기준선에서 같은 글이 두 번 나오는 링크 중 버릴 쪽 (href → 버릴 [group, order])
const SIDEBAR_DROP: Array<[string, string, number]> = [
  ['/backend/ko/nestjs/nestjs-config-service', 'Middle', 2], // 위 nestjs-debug 로 바로잡음
  ['/infra/ko/cloud/aws-efs-4-transfer', 'AWS', 8], // AWS 6번과 중복
]

// ─── 3. 시리즈 17묶음 (계획 문서 '확정된 시리즈 17묶음') ───────────────────
const SERIES: Array<{ id: string; dir: string; match: RegExp; count: number }> = [
  { id: 'kubernetes', dir: 'infra/ko/kubernetes', match: /^([12]-\d+\.|3-0\.|3-01-)/, count: 19 },
  { id: 'architecture-basics', dir: 'design/ko/software-design', match: /^architecture-basics-\d/, count: 12 },
  { id: 'aws-vpc', dir: 'infra/ko/cloud', match: /^aws-vpc-/, count: 12 },
  { id: 'grpc', dir: 'backend/ko/grpc', match: /^0\d-grpc-/, count: 9 },
  { id: 'software-requirements', dir: 'design/ko/software-design', match: /^req-\d+-/, count: 9 },
  { id: 'auth', dir: 'backend/ko/security', match: /^auth-0\d-/, count: 8 },
  { id: 'karpenter', dir: 'infra/ko/kubernetes', match: /^karpenter-\d-/, count: 7 },
  { id: 'git', dir: 'infra/ko/git', match: /^git-0\d-/, count: 7 },
  { id: 'packer', dir: 'infra/ko/tools', match: /^packer-\d-/, count: 6 },
  { id: 'solid', dir: 'backend/ko/base', match: /^architecture-basics-solid-0\d-/, count: 5 },
  { id: 'tdd', dir: 'backend/ko/test', match: /^tdd-0\d-/, count: 5 },
  { id: 'concurrency-control', dir: 'backend/ko/database', match: /^concurrency-/, count: 5 },
  { id: 'mongodb-concurrency', dir: 'backend/ko/database', match: /^mongodb-concurrency-control-\d/, count: 4 },
  { id: 'aws-efs', dir: 'infra/ko/cloud', match: /^aws-efs-\d-/, count: 4 },
  { id: 'serverless', dir: 'infra/ko/compute-infrastructure', match: /^serverless-\d-/, count: 3 },
  { id: 'typescript-essential', dir: 'language/ko/typescript', match: /^typescript-essential-0\d-/, count: 3 },
  { id: 'typescript-intermediate', dir: 'language/ko/typescript', match: /^typescript-intermediate-0\d-/, count: 3 },
]

// ─── 유틸 ──────────────────────────────────────────────────────
type Fm = Record<string, unknown>
const FM_RE = /^---\n([\s\S]*?)\n---\n/

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })

const urlOf = (rel: string) => '/' + rel.replace(/\.mdx?$/, '')

/** 제목 줄의 표시 텍스트 (링크·태그·코드·강조 기호 제거) */
const headingText = (md: string) =>
  md
    .replace(/<[^>]+>/g, '')
    .replace(/!?\[((?:[^[\]]|\[[^\]]*\])*)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*|__/g, '')
    .replace(/\\([<>])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()

const toDate = (v: unknown): string => {
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(v ?? '').trim())
  if (!m) throw new Error(`날짜 형식을 알 수 없음: ${String(v)}`)
  return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`
}

const q = (s: string) => `'${s.replace(/'/g, "''")}'`
/** flow 목록 항목: YAML 이 다르게 읽을 수 있는 값만 따옴표 */
const tagItem = (s: string) => (/[,[\]{}:#'"]|^\s|\s$/.test(s) || YAML.parse(s) !== s ? q(s) : s)

/** 정해진 순서로 frontmatter 를 쓰고, 다시 읽어 값이 같은지 확인한다 */
function writeFm(fm: Fm): string {
  const lines: string[] = []
  lines.push(`title: ${q(String(fm.title))}`)
  lines.push(`summary: ${q(String(fm.summary ?? ''))}`)
  lines.push(`publishedAt: ${fm.publishedAt}`)
  if (fm.updatedAt) lines.push(`updatedAt: ${fm.updatedAt}`)
  if (fm.draft) lines.push('draft: true')
  if (fm.group !== undefined) lines.push(`group: ${q(String(fm.group))}`)
  if (fm.order !== undefined) lines.push(`order: ${fm.order}`)
  if (fm.series) lines.push(`series: ${fm.series}`)
  const tags = (fm.tags as string[] | undefined) ?? []
  if (tags.length) lines.push(`tags: [${tags.map(tagItem).join(', ')}]`)
  for (const k of ['translationOf', 'ads']) if (fm[k] !== undefined) lines.push(`${k}: ${JSON.stringify(fm[k])}`)
  const text = lines.join('\n')

  const back = YAML.parse(text)
  const expect: Fm = { ...fm, summary: fm.summary ?? '' }
  if (!tags.length) delete expect.tags
  if (!fm.draft) delete expect.draft
  for (const k of Object.keys(expect)) if (expect[k] === undefined) delete expect[k]
  const norm = (o: Fm) =>
    Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v instanceof Date ? v.toISOString().slice(0, 10) : v]))
  if (!isDeepStrictEqual(norm(back), norm(expect))) {
    throw new Error(`frontmatter 왕복 검사 실패\n${text}\n${JSON.stringify(back)}\n${JSON.stringify(expect)}`)
  }
  return `---\n${text}\n---\n`
}

const FENCE = /^\s*(```|~~~)/
const HEADING = /^(#{1,6})(\s+.*)$/

/** 코드 블록 밖의 제목 줄 번호와 단계 */
function headings(lines: string[]) {
  const out: Array<{ i: number; level: number }> = []
  let fence: string | null = null
  lines.forEach((line, i) => {
    const f = FENCE.exec(line)
    if (f) {
      fence = fence === null ? f[1] : fence === f[1] ? null : fence
      return
    }
    if (fence) return
    const h = HEADING.exec(line)
    if (h) out.push({ i, level: h[1].length })
  })
  return out
}

// ─── 본 처리 ─────────────────────────────────────────────────
type TitleDiff = { url: string; draft: boolean; title: string; heading: string }
const report = {
  renamed: [] as Array<[string, string]>,
  titleDiffs: [] as TitleDiff[],
  titleSameRemoved: 0,
  noHeading: [] as string[],
  junkFixed: [] as Array<{ url: string; was: string; now: string }>,
  demoted: [] as Array<{ url: string; extraH1: number; shifted: number }>,
  dateFixed: [] as Array<[string, string, string]>,
  sidebarFixed: [] as Array<[string, string, number]>,
  noGroup: [] as string[],
  noFrontmatter: [] as string[],
  series: {} as Record<string, string[]>,
  changed: 0,
}

// 1) 이름
for (const [from, to] of Object.entries(RENAMES)) {
  if (existsSync(join(ROOT, from))) {
    report.renamed.push([from, to])
    if (!dry) renameSync(join(ROOT, from), join(ROOT, to))
  }
}
for (const p of walk(ROOT).filter((p) => p.endsWith('.md'))) {
  const rel = relative(ROOT, p)
  if (RENAMES[rel]) continue // 위에서 이미 옮김 (--dry 에서만 여기까지 옴)
  report.renamed.push([rel, rel + 'x'])
  if (!dry) renameSync(p, p + 'x')
}
const files = dry
  ? walk(ROOT).map((p) => {
      const rel = relative(ROOT, p)
      return RENAMES[rel] ?? (rel.endsWith('.md') ? rel + 'x' : rel)
    })
  : walk(ROOT).map((p) => relative(ROOT, p))
const realPath = (rel: string) => {
  if (!dry) return join(ROOT, rel)
  const from = Object.entries(RENAMES).find(([, to]) => to === rel)?.[0]
  return join(ROOT, from ?? (existsSync(join(ROOT, rel)) ? rel : rel.slice(0, -1)))
}
for (const f of files) if (!f.endsWith('.mdx')) throw new Error(`.mdx 가 아닌 파일이 남음: ${f}`)

// 2) 사이드바 기준선 → url → [group, order]
type Baseline = {
  categories: Record<string, { sidebars: Record<string, Array<{ group: string; links: Array<{ href: string }> }>> }>
}
const baseline = JSON.parse(readFileSync('sidebar.before.json', 'utf8')) as Baseline
const place = new Map<string, [string, number]>()
for (const c of Object.values(baseline.categories)) {
  for (const groups of Object.values(c.sidebars)) {
    for (const g of groups) {
      g.links.forEach((l, i) => {
        const href = l.href.replace(/\.mdx?$/, '')
        if (SIDEBAR_DROP.some(([h, grp, o]) => h === href && grp === g.group && o === i + 1)) return
        if (SIDEBAR_FIXES[href]) return
        if (place.has(href)) throw new Error(`기준선에 같은 링크가 두 번: ${href}`)
        place.set(href, [g.group, i + 1])
      })
    }
  }
}
for (const [url, v] of Object.entries(SIDEBAR_FIXES)) place.set(url, v)
// 버린 중복 링크 뒤의 순서를 당겨 빈 번호가 없게 한다 (같은 서브카테고리·그룹 안에서 순서만 다시 매김)
{
  const byGroup = new Map<string, Array<[string, number]>>()
  for (const [url, [group, order]] of place) {
    const key = url.split('/').slice(1, 4).join('/') + '#' + group
    byGroup.set(key, [...(byGroup.get(key) ?? []), [url, order]])
  }
  for (const list of byGroup.values()) {
    list.sort((a, b) => a[1] - b[1])
    const start = list[0][1] === 0 ? 0 : 1
    list.forEach(([url, order], i) => {
      const next = start + i
      if (order !== next) place.set(url, [place.get(url)![0], next])
    })
  }
}

// 3) 시리즈
const seriesOf = new Map<string, string>()
for (const s of SERIES) {
  const members = files.filter((f) => f.startsWith(s.dir + '/') && s.match.test(f.slice(s.dir.length + 1)))
  if (members.length !== s.count) throw new Error(`시리즈 ${s.id}: ${s.count}편이어야 하는데 ${members.length}편 (${members.join(', ')})`)
  report.series[s.id] = members.map(urlOf)
  for (const m of members) seriesOf.set(urlOf(m), s.id)
}

// 4) 다른 글의 frontmatter 를 복사한 초안 찾기: 같은 (title, summary) 를 공개 글이 이미 쓰고 있음
const raw = new Map(files.map((f) => [f, readFileSync(realPath(f), 'utf8')]))
const fmOf = (s: string): Fm | null => {
  const m = FM_RE.exec(s)
  return m ? (YAML.parse(m[1]) as Fm) : null
}
const isDraft = (fm: Fm) => (fm.draft !== undefined ? fm.draft === true : String(fm.deployment).toLowerCase() !== 'true')
const ownerOf = new Map<string, string>()
for (const [f, s] of raw) {
  const fm = fmOf(s)
  if (fm && !isDraft(fm)) ownerOf.set(`${fm.title}\u0000${fm.summary}`, f)
}

for (const f of files) {
  const url = urlOf(f)
  const src = raw.get(f)!
  const m = FM_RE.exec(src)
  const old: Fm = m ? (YAML.parse(m[1]) as Fm) : {}
  let body = m ? src.slice(m[0].length) : src
  if (!m) report.noFrontmatter.push(url)

  const draft = isDraft(old) || !m
  let lines = body.split('\n')

  // 본문 첫 제목 (첫 줄 h1, 또는 title 과 똑같은 첫 줄 h2)
  const firstIdx = lines.findIndex((l) => l.trim() !== '')
  const firstLine = firstIdx === -1 ? '' : lines[firstIdx]
  const h1 = /^#\s+(.+)$/.exec(firstLine)
  const h2 = /^##\s+(.+)$/.exec(firstLine)
  let removedHeading: string | null = null
  const titleNow = old.title === undefined ? undefined : String(old.title).trim()
  if (h1) removedHeading = headingText(h1[1])
  else if (h2 && titleNow !== undefined && headingText(h2[1]) === headingText(titleNow)) removedHeading = headingText(h2[1])
  if (removedHeading !== null) {
    let end = firstIdx + 1
    while (end < lines.length && lines[end].trim() === '') end++
    lines.splice(0, end)
  }

  // title 정하기
  const copied = m && draft && ownerOf.has(`${old.title}\u0000${old.summary}`) && ownerOf.get(`${old.title}\u0000${old.summary}`) !== f
  let title: string
  if (!m || copied) {
    // 제목 후보: 지운 첫 줄 h1 → 첫 줄이 짧은 문장이면 그 줄 → 본문 첫 제목 → 파일 이름
    const plain =
      removedHeading === null && firstLine && !FENCE.test(firstLine) && !HEADING.test(firstLine) && firstLine.length <= 80
        ? headingText(firstLine)
        : null
    const anyHeading = headings(lines)[0]
    title =
      removedHeading ??
      plain ??
      (anyHeading ? headingText(lines[anyHeading.i].replace(/^#+\s+/, '')) : f.split('/').pop()!.replace(/\.mdx$/, ''))
    if (plain) {
      lines.splice(lines.indexOf(firstLine), 1)
      while (lines.length && lines[0].trim() === '') lines.shift()
    }
    report.junkFixed.push({ url, was: titleNow ?? '(frontmatter 없음)', now: title })
  } else {
    title = titleNow!
    if (removedHeading !== null) {
      if (removedHeading === headingText(title)) report.titleSameRemoved++
      else report.titleDiffs.push({ url, draft, title, heading: removedHeading })
    } else if (!old.group && !draft) report.noHeading.push(url)
  }

  // 여분 h1 → h2 (단락 안에 h2 가 있으면 단락 전체를 한 단계씩)
  const hs = headings(lines)
  const extra = hs.filter((h) => h.level === 1)
  let shifted = 0
  if (extra.length) {
    extra.forEach((h, k) => {
      const endLine = k + 1 < extra.length ? extra[k + 1].i : lines.length
      const inSection = hs.filter((x) => x.i > h.i && x.i < endLine)
      const shiftAll = inSection.some((x) => x.level === 2)
      for (const x of [h, ...(shiftAll ? inSection : [])]) {
        if (x.level >= 6) continue
        lines[x.i] = '#' + lines[x.i]
        if (x !== h) shifted++
      }
    })
    report.demoted.push({ url, extraH1: extra.length, shifted })
  }
  body = lines.join('\n')

  // frontmatter
  const publishedAt = old.publishedAt === undefined ? TODAY : toDate(old.publishedAt)
  if (old.publishedAt !== undefined && !(old.publishedAt instanceof Date) && String(old.publishedAt) !== publishedAt) {
    report.dateFixed.push([url, String(old.publishedAt), publishedAt])
  }
  const spot = place.get(url)
  if (SIDEBAR_FIXES[url]) report.sidebarFixed.push([url, ...SIDEBAR_FIXES[url]])
  if (!spot && !draft) report.noGroup.push(url)
  const fm: Fm = {
    title,
    summary: copied || !m ? '' : String(old.summary ?? ''),
    publishedAt,
    updatedAt: old.updatedAt === undefined ? undefined : toDate(old.updatedAt),
    draft: draft || undefined,
    group: spot?.[0],
    order: spot?.[1],
    series: seriesOf.get(url),
    tags: copied ? undefined : (old.tags as unknown[] | undefined)?.map((t) => String(t).trim()).filter(Boolean),
    translationOf: old.translationOf,
    ads: old.ads,
  }
  const next = writeFm(fm) + '\n' + body.replace(/^\n+/, '')
  if (next !== src) {
    report.changed++
    if (!dry) writeFileSync(join(ROOT, f), next)
  }
}

if (report.noGroup.length) {
  throw new Error(`group 을 정하지 못한 공개 글: ${report.noGroup.join(', ')} → SIDEBAR_FIXES 에 추가`)
}

// ─── 보고서 ─────────────────────────────────────────────────
const md: string[] = []
md.push(`# 콘텐츠 마이그레이션 보고서`, '', `글 ${files.length}개 중 ${report.changed}개 변경${dry ? ' (--dry: 파일은 그대로)' : ''}`, '')
md.push(`## 이름 변경 (${report.renamed.length})`, '', ...report.renamed.map(([a, b]) => `- \`${a}\` → \`${b}\``), '')
md.push(`## 날짜 형식 (${report.dateFixed.length})`, '', ...report.dateFixed.map(([u, a, b]) => `- ${u}: \`${a}\` → \`${b}\``), '')
md.push(
  `## 본문 첫 제목 삭제`,
  '',
  `title 과 같아서 지운 글 ${report.titleSameRemoved}개, title 과 달라서 표에 남긴 글 ${report.titleDiffs.length}개 (공개 ${report.titleDiffs.filter((d) => !d.draft).length} · 초안 ${report.titleDiffs.filter((d) => d.draft).length})`,
  '',
  '| # | 글 | 상태 | title (지금 쓰는 제목) | 본문 첫 줄 제목 (삭제됨) |',
  '| --- | --- | --- | --- | --- |',
  ...report.titleDiffs.map(
    (d, i) => `| ${i + 1} | \`${d.url}\` | ${d.draft ? '초안' : '공개'} | ${d.title.replace(/\|/g, '\\|')} | ${d.heading.replace(/\|/g, '\\|')} |`,
  ),
  '',
)
if (report.noHeading.length) md.push(`첫 줄에 제목이 없던 공개 글: ${report.noHeading.map((u) => `\`${u}\``).join(', ')}`, '')
md.push(
  `## 다른 글의 frontmatter 를 복사해 둔 초안 (${report.junkFixed.length})`,
  '',
  '| 글 | 원래 title | 새 title |',
  '| --- | --- | --- |',
  ...report.junkFixed.map((j) => `| \`${j.url}\` | ${j.was} | ${j.now} |`),
  '',
)
md.push(
  `## 여분 h1 → h2 (${report.demoted.length})`,
  '',
  ...report.demoted.map((d) => `- \`${d.url}\`: h1 ${d.extraH1}개${d.shifted ? `, 그 단락의 하위 제목 ${d.shifted}개도 한 단계 내림` : ''}`),
  '',
)
md.push(`## 사이드바 보정 (${report.sidebarFixed.length})`, '', ...report.sidebarFixed.map(([u, g, o]) => `- \`${u}\` → ${g} · ${o}`), '')
md.push(`## 시리즈 (${Object.keys(report.series).length}묶음)`, '', ...Object.entries(report.series).map(([id, urls]) => `- \`${id}\` ${urls.length}편`), '')

const text = md.join('\n')
if (reportPath) writeFileSync(reportPath, text)
else console.log(text)
