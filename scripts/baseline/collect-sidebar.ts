/**
 * 사이드바 기준선 생성기 (세션 1에서 한 번 실행)
 *
 * main의 사이드바는 src/data/const/*.ts 에 손으로 적혀 있다. 이 데이터를
 * 그대로 읽어 서브카테고리별 그룹·링크 순서를 sidebar.before.json 으로 저장한다.
 * 세션 4(group·order 이관)와 세션 5(사이드바 자동 생성)에서 결과를 이 파일과 비교한다.
 *
 *   git worktree add ../main-wt main && (cd ../main-wt && npm ci)
 *   node scripts/baseline/collect-sidebar.ts ../main-wt [urls.before.txt] > sidebar.before.json
 *
 * main 체크아웃의 node_modules/typescript 로 TS를 CommonJS로 바꿔 실행한다
 * (enum과 '@/...' 경로 별칭 때문에 그냥 import 할 수 없음).
 * urls.before.txt 를 넘기면 각 링크에 기준선 상태(ok / draft / missing)를 붙인다.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'

const root = process.argv[2] ? resolve(process.argv[2]) : ''
const urlsFile = process.argv[3]
if (!root || !existsSync(join(root, 'src/data/const/index.ts'))) {
  console.error('사용법: node scripts/baseline/collect-sidebar.ts <main 체크아웃 경로> [urls.before.txt]')
  process.exit(2)
}

const requireFromRoot = createRequire(join(root, 'package.json'))
const ts = requireFromRoot('typescript')

// '@/x' → src/x 로 풀어 주는 작은 CommonJS 로더
const cache = new Map<string, { exports: unknown }>()
function load(file: string): any {
  const cached = cache.get(file)
  if (cached) return cached.exports
  const mod = { exports: {} as Record<string, unknown> }
  cache.set(file, mod)
  const out = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: file,
  }).outputText
  const localRequire = (spec: string) => {
    let base: string | null = null
    if (spec.startsWith('@/')) base = join(root, 'src', spec.slice(2))
    else if (spec.startsWith('.')) base = join(dirname(file), spec)
    if (!base) return requireFromRoot(spec)
    for (const ext of ['.ts', '.tsx', '/index.ts']) {
      if (existsSync(base + ext)) return load(base + ext)
    }
    throw new Error(`해석 실패: ${spec} (${file})`)
  }
  new Function('exports', 'require', 'module', out)(mod.exports, localRequire, mod)
  return mod.exports
}

const { CONTENT_CATEGORY } = load(join(root, 'src/data/const/index.ts'))

// 기준선 URL 상태
const status = new Map<string, string>()
if (urlsFile) {
  for (const raw of readFileSync(urlsFile, 'utf8').split('\n')) {
    const line = raw.replace(/\s+#.*$/, '').trim()
    if (!line || line.startsWith('#')) continue
    if (line.startsWith('?')) status.set(line.slice(1), 'draft')
    else if (line.startsWith('!')) status.set(line.slice(1), 'removed')
    else status.set(line, 'ok')
  }
}
const stateOf = (href: string) => {
  if (!urlsFile) return undefined
  if (!href.startsWith('/')) return 'external'
  return status.get(href.replace(/[?#].*$/, '')) ?? 'missing'
}

type Link = { title: string; href: string; state?: string }
const categories: Record<string, unknown> = {}
const counts = { subCategories: 0, groups: 0, links: 0, missing: 0, draft: 0 }
const problems: string[] = []

for (const [category, def] of Object.entries<any>(CONTENT_CATEGORY)) {
  const subCategories = Object.values<any>(def.subCategory).map((s) => {
    const state = stateOf(s.href)
    if (state === 'missing') problems.push(`${category} 드롭다운 '${s.name}' → ${s.href}`)
    return { id: s.id, name: s.name, href: s.href, icon: s.icon, ...(state ? { state } : {}) }
  })
  counts.subCategories += subCategories.length

  const sidebars: Record<string, { group: string; links: Link[] }[]> = {}
  for (const [sub, detail] of Object.entries<any>(def.subCategoryDetail ?? {})) {
    sidebars[sub] = detail.title.map((group: string, i: number) => {
      const links: Link[] = (detail.subTitle[i] ?? []).map((l: any) => {
        const state = stateOf(l.href)
        if (state === 'missing') {
          counts.missing++
          problems.push(`${category}/${sub} '${group}' → ${l.href}`)
        }
        if (state === 'draft') counts.draft++
        return { title: l.title, href: l.href, ...(state ? { state } : {}) }
      })
      counts.groups++
      counts.links += links.length
      return { group, links }
    })
    if (detail.subTitle.length > detail.title.length) {
      problems.push(`${category}/${sub}: 그룹 제목 ${detail.title.length}개, 링크 묶음 ${detail.subTitle.length}개 (제목 없는 묶음은 렌더링되지 않음)`)
    }
  }
  categories[category] = { subCategories, sidebars }
}

const commit = execFileSync('git', ['-C', root, 'log', '-1', '--format=%h %cs'], { encoding: 'utf8' }).trim()
const branch = execFileSync('git', ['-C', root, 'rev-parse', '--abbrev-ref', 'HEAD'], { encoding: 'utf8' }).trim()

process.stdout.write(
  JSON.stringify(
    {
      source: `${branch}@${commit} src/data/const/*.ts`,
      note: '배열 순서 = 화면 순서. state: ok(기준선 200) · draft(미정 주소) · missing(기준선에 없는 주소, main에서도 깨진 링크)',
      counts,
      categories,
    },
    null,
    2,
  ) + '\n',
)
for (const p of problems) console.error('참고: ' + p)
console.error(JSON.stringify(counts))
