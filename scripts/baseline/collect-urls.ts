/**
 * URL 기준선 생성기 (세션 1에서 한 번 실행, 이후에는 다시 돌릴 일이 거의 없음)
 *
 * 프로덕션 브랜치(main) 체크아웃의 라우트·콘텐츠·public 파일을 읽어
 * 그 코드가 실제로 응답하는 URL 목록을 urls.before.txt 형식으로 출력한다.
 *
 *   git worktree add ../main-wt main
 *   node scripts/baseline/collect-urls.ts ../main-wt > urls.before.txt
 *
 * main의 라우팅 규칙 (2e301e3 기준):
 *   - src/app/** /page.tsx 가 정적 라우트. (group) 세그먼트는 URL에서 빠짐
 *   - .../{sub}/[slug]/page.tsx 는 `_content/{같은 경로}/{slug}.mdx` 를 찾아 렌더링.
 *     generateStaticParams가 없어서 deployment:false 글도 주소로 들어가면 열림
 *   - contentlayer는 *.mdx 만 읽으므로 .md 파일은 어떤 URL에도 나오지 않음
 *   - src/app/sitemap.ts, src/app/robots.txt, src/app/favicon.ico, public/** 도 URL
 *
 * 출력 형식은 scripts/check-urls.ts 머리말 참고.
 * Node 22.18+ 의 타입 제거 기능으로 바로 실행되도록 지울 수 있는 TS 문법만 쓴다.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const root = process.argv[2]
if (!root || !existsSync(join(root, 'src/app'))) {
  console.error('사용법: node scripts/baseline/collect-urls.ts <main 체크아웃 경로>')
  process.exit(2)
}

/** 의도적으로 삭제하기로 한 페이지 (계획 문서 '결정 사항': 404, 리다이렉트 없음) */
const REMOVED = new Set(['/reactjs', '/nextjs', '/profile'])
/** 개편에서 없어질 수 있지만 아직 정하지 않은 주소: 확인만 하고 실패 처리 안 함 */
const UNDECIDED_PAGES: Record<string, string> = {
  '/login': 'Firebase 인증 제거(세션 3) 시 함께 사라짐',
  '/signup': 'Firebase 인증 제거(세션 3) 시 함께 사라짐',
}
const UNDECIDED_PUBLIC: Record<string, string> = {
  '/next.svg': 'create-next-app 기본 파일, 참조 없음',
  '/vercel.svg': 'create-next-app 기본 파일, 참조 없음',
}

function walk(dir: string): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else out.push(p)
  }
  return out
}

const toPosix = (p: string) => p.split(sep).join('/')

function frontmatter(file: string): Record<string, string> {
  const text = readFileSync(file, 'utf8')
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)
  const fields: Record<string, string> = {}
  if (!m) return fields
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_]+):\s*(.*)$/.exec(line)
    if (kv) fields[kv[1]] = kv[2].trim().replace(/^['"]|['"]$/g, '')
  }
  return fields
}

const required: string[] = []
const assetSet = new Set<string>()
const removed: string[] = []
const undecided: { url: string; why: string }[] = []
const notes: string[] = []

// 1) src/app 라우트
const appDir = join(root, 'src/app')
for (const file of walk(appDir)) {
  const rel = toPosix(relative(appDir, file))
  const parts = rel.split('/')
  const base = parts.pop() as string
  const segs = parts.filter((s) => !(s.startsWith('(') && s.endsWith(')')))

  if (rel === 'sitemap.ts') {
    required.push('/sitemap.xml')
    assetSet.add('/sitemap.xml')
    continue
  }
  if (rel === 'robots.txt' || rel === 'favicon.ico') {
    required.push('/' + rel)
    assetSet.add('/' + rel)
    continue
  }
  if (base === 'route.ts' || base === 'route.js') {
    throw new Error(`main에 route handler가 생겼다면 이 스크립트를 고쳐야 함: ${rel}`)
  }
  if (base !== 'page.tsx' && base !== 'page.jsx' && base !== 'page.js') continue

  const dynamicIdx = segs.findIndex((s) => s.startsWith('['))
  if (dynamicIdx === -1) {
    const url = '/' + segs.join('/')
    if (REMOVED.has(url)) removed.push(url)
    else if (UNDECIDED_PAGES[url]) undecided.push({ url, why: UNDECIDED_PAGES[url] })
    else required.push(url)
    continue
  }
  if (dynamicIdx !== segs.length - 1 || segs[dynamicIdx] !== '[slug]') {
    throw new Error(`예상하지 못한 동적 라우트 형태: ${rel}`)
  }

  // 글 라우트: _content/{prefix}/{slug}.mdx 와 1:1
  const prefix = segs.slice(0, -1).join('/')
  const contentDir = join(root, '_content', prefix)
  if (!existsSync(contentDir)) {
    notes.push(`라우트는 있지만 콘텐츠 폴더가 없음: ${prefix}`)
    continue
  }
  for (const name of readdirSync(contentDir).sort()) {
    const p = join(contentDir, name)
    if (statSync(p).isDirectory()) continue
    if (!name.endsWith('.mdx')) {
      notes.push(`빌드에 잡히지 않는 파일(URL 없음): _content/${prefix}/${name}`)
      continue
    }
    const slug = name.slice(0, -'.mdx'.length)
    if (slug === 'index') throw new Error(`index.mdx 는 flattenedPath가 달라짐: ${p}`)
    const url = `/${prefix}/${slug}`
    if (!/^[\x21-\x7e]+$/.test(url)) throw new Error(`ASCII가 아닌 URL: ${url}`)

    const fm = frontmatter(p)
    const REQUIRED_FIELDS = ['deployment', 'category', 'title', 'publishedAt', 'summary', 'lng', 'pageKey']
    const missingFields = REQUIRED_FIELDS.filter((k) => !(k in fm))
    if (missingFields.length) {
      // contentlayer가 문서로 인정하지 않아 main에서도 '찾을 수 없음' 화면(200)이 뜸
      notes.push(`필수 frontmatter가 없어 빌드에서 빠진 글(URL 없음): _content/${prefix}/${name} (${missingFields.join(', ')})`)
      continue
    }
    const published = fm.publishedAt ? new Date(fm.publishedAt) : null
    if (fm.deployment === 'false') {
      undecided.push({ url, why: 'deployment:false 초안 (main에서는 주소로 열리지만 목록·사이트맵에 없음)' })
    } else if (published && published.getTime() > Date.now()) {
      undecided.push({ url, why: `publishedAt ${fm.publishedAt} (미래 날짜)` })
    } else {
      required.push(url)
    }
  }
}

// 라우트가 없는 콘텐츠 폴더 (main에서는 열리지 않음)
const contentRoot = join(root, '_content')
const routedPrefixes = new Set(
  walk(appDir)
    .map((f) => toPosix(relative(appDir, f)))
    .filter((r) => r.endsWith('/[slug]/page.tsx'))
    .map((r) =>
      r
        .split('/')
        .filter((s) => !(s.startsWith('(') && s.endsWith(')')))
        .slice(0, -2)
        .join('/'),
    ),
)
const contentDirs = new Set(
  walk(contentRoot).map((f) => toPosix(relative(contentRoot, f)).split('/').slice(0, -1).join('/')),
)
for (const d of [...contentDirs].sort()) {
  if (!routedPrefixes.has(d)) notes.push(`라우트가 없는 콘텐츠 폴더(URL 없음): _content/${d}`)
}

// 2) public 파일
const publicDir = join(root, 'public')
for (const file of walk(publicDir)) {
  const url = '/' + toPosix(relative(publicDir, file))
  if (UNDECIDED_PUBLIC[url]) undecided.push({ url, why: UNDECIDED_PUBLIC[url] })
  else {
    required.push(url)
    assetSet.add(url)
  }
}

// 출력
const commit = execFileSync('git', ['-C', root, 'log', '-1', '--format=%h %cs'], { encoding: 'utf8' }).trim()
const branch = execFileSync('git', ['-C', root, 'rev-parse', '--abbrev-ref', 'HEAD'], { encoding: 'utf8' }).trim()
const sortUrls = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)
const isAsset = (u: string) => assetSet.has(u)

const pages = required.filter((u) => !isAsset(u) && u.split('/').length <= 3).sort(sortUrls)
const posts = required.filter((u) => !isAsset(u) && u.split('/').length > 3).sort(sortUrls)
const assets = required.filter(isAsset).sort(sortUrls)

const lines = [
  '# 한피 블로그 URL 기준선',
  `# 생성: ${branch}@${commit} (프로덕션), node scripts/baseline/collect-urls.ts`,
  '# 검사: node scripts/check-urls.ts --base http://127.0.0.1:3000',
  '#',
  '# 형식',
  '#   /path     반드시 200 (리다이렉트도 실패)',
  '#   !/path    반드시 404 (의도적으로 삭제한 주소)',
  '#   ?/path    상태만 기록, 실패 처리 안 함 (개편에서 정할 주소)',
  '',
  `# 페이지 (${pages.length})`,
  ...pages,
  '',
  `# 글 (${posts.length})`,
  ...posts,
  '',
  `# 파일 (${assets.length})`,
  ...assets,
  '',
  `# 삭제 확정 (${removed.length}) — 계획 문서 '결정 사항'`,
  ...removed.sort(sortUrls).map((u) => '!' + u),
  '',
  `# 미정 (${undecided.length})`,
  ...undecided
    .sort((a, b) => sortUrls(a.url, b.url))
    .map((u) => `?${u.url}  # ${u.why}`),
  '',
]
process.stdout.write(lines.join('\n'))
for (const n of notes) console.error('참고: ' + n)
console.error(
  `필수 ${required.length} (페이지 ${pages.length}, 글 ${posts.length}, 파일 ${assets.length}) · 삭제 ${removed.length} · 미정 ${undecided.length}`,
)
