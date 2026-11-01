/**
 * URL 비교 검사: 실행 중인 서버에 urls.before.txt 의 모든 주소를 요청해
 * 개편 전후 URL이 그대로인지 확인한다. 하나라도 어긋나면 종료 코드 1.
 *
 *   next build && next start -p 3000 &
 *   node scripts/check-urls.ts --base http://127.0.0.1:3000
 *
 * urls.before.txt 형식 (한 줄에 한 주소, `#` 뒤는 주석)
 *   /path     반드시 200. 리다이렉트(3xx)도 실패
 *   !/path    반드시 404. 의도적으로 삭제한 주소
 *   ?/path    상태만 기록, 실패 처리 안 함
 *
 * 추가 검사
 *   - 가짜 404: 없는 글 주소를 먼저 찔러 404 화면의 <title>을 알아낸 뒤,
 *     글 주소가 200이어도 같은 <title>이면 실패로 본다 (main은 없는 글도 200을 줌).
 *   - 사이트맵: /sitemap.xml 에 기준선 글이 빠졌거나 기준선에 없는 주소가 있으면 경고만 한다.
 *
 * 옵션
 *   --base <url>         서버 주소 (기본 http://127.0.0.1:3000)
 *   --file <path>        기준선 파일 (기본 urls.before.txt)
 *   --concurrency <n>    동시 요청 수 (기본 8)
 *   --baseline           기준선 브랜치(main) 자체를 검사할 때: `!` 주소도 200이어야 통과
 *
 * 의존성 없이 Node 22.18+ 에서 바로 실행된다 (지울 수 있는 TS 문법만 사용).
 */
import { appendFileSync, readFileSync } from 'node:fs'

type Expect = 'ok' | 'gone' | 'info'
type Entry = { path: string; expect: Expect; note?: string }
type Result = Entry & { status: number | 'error'; detail?: string; pass: boolean; title?: string }

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(`--${name}`)
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}
const base = arg('base', 'http://127.0.0.1:3000').replace(/\/$/, '')
const file = arg('file', 'urls.before.txt')
const concurrency = Number(arg('concurrency', '8'))
const baselineMode = process.argv.includes('--baseline')

function parse(text: string): Entry[] {
  const entries: Entry[] = []
  const seen = new Set<string>()
  for (const raw of text.split('\n')) {
    const [body, ...comment] = raw.split(/\s+#\s?/)
    const line = body.trim()
    if (!line || line.startsWith('#')) continue
    const prefix = line[0] === '!' || line[0] === '?' ? line[0] : ''
    const path = prefix ? line.slice(1) : line
    if (!path.startsWith('/')) throw new Error(`잘못된 줄: ${raw}`)
    if (seen.has(path)) throw new Error(`중복 주소: ${path}`)
    seen.add(path)
    entries.push({
      path,
      expect: prefix === '!' ? 'gone' : prefix === '?' ? 'info' : 'ok',
      note: comment.join(' # ') || undefined,
    })
  }
  return entries
}

const titleOf = (html: string) => /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1].trim()

/** 확장자 없는 3단 이상 주소 = 글 (가짜 404 검사 대상) */
const isPostPath = (p: string) => p.split('/').length > 3 && !/\.(xml|txt|json|ico|png|jpe?g|svg|webp)$/i.test(p)

async function request(path: string): Promise<{ status: number; location?: string; type: string; body: string }> {
  let lastError: unknown
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(base + path, {
        redirect: 'manual',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'hanpy-check-urls' },
      })
      const type = res.headers.get('content-type') ?? ''
      const body = type.includes('text/html') ? await res.text() : (await res.arrayBuffer(), '')
      return { status: res.status, location: res.headers.get('location') ?? undefined, type, body }
    } catch (e) {
      lastError = e
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)))
    }
  }
  throw lastError
}

async function pool<T, R>(items: T[], n: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length)
  let next = 0
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (next < items.length) {
        const i = next++
        out[i] = await fn(items[i])
      }
    }),
  )
  return out
}

async function main() {
  const entries = parse(readFileSync(file, 'utf8'))

  // 1) 404 화면이 어떻게 생겼는지 먼저 확인 (가짜 404 탐지용)
  const samplePost = entries.find((e) => e.expect === 'ok' && isPostPath(e.path))?.path
  const probePath = samplePost
    ? samplePost.replace(/[^/]+$/, '__check-urls-missing__')
    : '/__check-urls-missing__/x/y/z'
  const probe = await request(probePath)
  // <title>이 아예 없는 404 화면도 있어서 '없음'은 빈 문자열로 맞춰 비교한다
  const softNotFoundTitle = probe.status === 200 ? (titleOf(probe.body) ?? '') : undefined
  if (softNotFoundTitle !== undefined) {
    console.log(`경고: 없는 글 주소(${probePath})가 200을 돌려줌 (가짜 404). <title>이 ${softNotFoundTitle ? `"${softNotFoundTitle}"` : '없는'} 글 주소는 실패로 처리`)
  }

  // 2) 기준선 전체 요청
  const results: Result[] = await pool(entries, concurrency, async (e): Promise<Result> => {
    try {
      const r = await request(e.path)
      const title = r.body ? titleOf(r.body) : undefined
      let pass = true
      let detail: string | undefined
      const mustBeOk = e.expect === 'ok' || (baselineMode && e.expect === 'gone')
      if (mustBeOk) {
        if (r.status !== 200) {
          pass = false
          detail = r.location ? `→ ${r.location}` : undefined
        } else if (softNotFoundTitle !== undefined && isPostPath(e.path) && (title ?? '') === softNotFoundTitle) {
          pass = false
          detail = `200이지만 404 화면 (<title> ${title ?? '없음'})`
        }
      } else if (e.expect === 'gone') {
        pass = r.status === 404
        if (!pass) detail = r.location ? `→ ${r.location} (리다이렉트 없이 404여야 함)` : '404여야 함'
      }
      return { ...e, status: r.status, pass, detail, title }
    } catch (err) {
      return { ...e, status: 'error', pass: e.expect === 'info', detail: String((err as Error)?.message ?? err) }
    }
  })

  // 3) 사이트맵 비교 (경고만)
  const warnings: string[] = []
  try {
    const sm = await fetch(base + '/sitemap.xml', { signal: AbortSignal.timeout(30_000) })
    const xml = sm.ok ? await sm.text() : ''
    const locs = new Set(
      [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => {
        try {
          const u = new URL(m[1])
          return u.pathname === '/' ? '/' : u.pathname.replace(/\/$/, '')
        } catch {
          return m[1]
        }
      }),
    )
    const known = new Set(entries.map((e) => e.path))
    const missingFromSitemap = entries.filter((e) => e.expect === 'ok' && isPostPath(e.path) && !locs.has(e.path))
    const notInBaseline = [...locs].filter((p) => !known.has(p))
    if (missingFromSitemap.length)
      warnings.push(`사이트맵에 없는 기준선 글 ${missingFromSitemap.length}개: ${missingFromSitemap.map((e) => e.path).slice(0, 10).join(', ')}${missingFromSitemap.length > 10 ? ' …' : ''}`)
    if (notInBaseline.length)
      warnings.push(`기준선에 없는 사이트맵 주소 ${notInBaseline.length}개 (신규 URL이면 정상): ${notInBaseline.slice(0, 10).join(', ')}${notInBaseline.length > 10 ? ' …' : ''}`)
  } catch (err) {
    warnings.push(`사이트맵 확인 실패: ${String(err)}`)
  }

  // 4) 보고
  const failed = results.filter((r) => !r.pass)
  const info = results.filter((r) => r.expect === 'info')
  const count = (x: Expect) => results.filter((r) => r.expect === x).length
  const lines: string[] = []
  lines.push(`## URL 비교 ${failed.length ? '실패' : '통과'}`)
  lines.push('')
  lines.push(`서버 ${base} · 기준선 ${file}${baselineMode ? ' · 기준선 모드' : ''}`)
  lines.push('')
  lines.push(`| 구분 | 주소 수 | 실패 |`)
  lines.push(`| --- | --- | --- |`)
  lines.push(`| 유지 (200) | ${count('ok')} | ${failed.filter((r) => r.expect === 'ok').length} |`)
  lines.push(`| 삭제 (${baselineMode ? '기준선 모드: 200' : '404'}) | ${count('gone')} | ${failed.filter((r) => r.expect === 'gone').length} |`)
  lines.push(`| 미정 (기록만) | ${count('info')} | - |`)
  if (failed.length) {
    lines.push('', '### 실패', '', '| 주소 | 기대 | 결과 |', '| --- | --- | --- |')
    for (const r of failed) {
      const want = r.expect === 'gone' && !baselineMode ? '404' : '200'
      lines.push(`| \`${r.path}\` | ${want} | ${r.status}${r.detail ? ' ' + r.detail : ''} |`)
    }
  }
  if (info.length) {
    lines.push('', '### 미정 주소 상태', '', '| 주소 | 결과 | 메모 |', '| --- | --- | --- |')
    for (const r of info) lines.push(`| \`${r.path}\` | ${r.status} | ${r.note ?? ''} |`)
  }
  if (warnings.length) {
    lines.push('', '### 경고', '')
    for (const w of warnings) lines.push(`- ${w}`)
  }
  const report = lines.join('\n') + '\n'
  console.log(report)
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, report)
  process.exit(failed.length ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(2)
})
