/**
 * 출시 점검 (세션 8). docs/release-checklist.md 의 자동 항목을 실행 중인 사이트에 대고 확인한다
 *
 *   node scripts/check-release.ts --base http://127.0.0.1:3000 [--expect-ga none|G-XXXX] [--live] [--report 파일.md]
 *
 * --base       요청을 보낼 주소. 사이트맵·RSS·canonical 안의 주소는 https://hanpy-blog.com 이어야 하고, 경로만 떼어 --base로 요청한다
 * --expect-ga  none: GA 스크립트가 없어야 함 / G-XXXX: 그 ID로 들어가야 함 (NEXT_PUBLIC_GA_ID). 생략하면 있는지만 기록
 * --live       운영 주소 전용 항목(http→https, www) 도 확인
 *
 * 실패가 하나라도 있으면 종료 코드 1. URL 기준선(261개)은 scripts/check-urls.ts 가 따로 확인한다
 */
import { writeFileSync } from 'node:fs'

const SITE = 'https://hanpy-blog.com'
const args = process.argv.slice(2)
const arg = (name: string) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined)
const BASE = (arg('--base') ?? 'http://127.0.0.1:3000').replace(/\/$/, '')
const EXPECT_GA = arg('--expect-ga')
const LIVE = args.includes('--live')
const REPORT = arg('--report')

type Result = { group: string; name: string; ok: boolean; detail: string; warn?: boolean }
const results: Result[] = []
const check = (group: string, name: string, ok: boolean, detail = '') => {
  results.push({ group, name, ok, detail })
}
/** 실패로 치지 않는 경고 (글 내용 문제 등 사람이 판단할 것) */
const warn = (group: string, name: string, ok: boolean, detail = '') => {
  results.push({ group, name, ok: true, detail, warn: !ok })
}

const pathOf = (url: string) => {
  const u = new URL(url)
  return u.pathname + u.search
}

async function get(path: string, init: RequestInit = {}) {
  const res = await fetch(BASE + path, { redirect: 'manual', ...init })
  const type = res.headers.get('content-type') ?? ''
  const body = /text|xml|json|javascript/.test(type) ? await res.text() : ''
  if (!body) await res.arrayBuffer().catch(() => undefined)
  return { status: res.status, type, body, location: res.headers.get('location') ?? '' }
}

/** 동시 요청 수를 묶어서 */
async function pool<T, R>(items: T[], n: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = []
  let i = 0
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) {
        const k = i++
        out[k] = await fn(items[k])
      }
    }),
  )
  return out
}

const attr = (html: string, re: RegExp) => html.match(re)?.[1]
const meta = (html: string, key: string) =>
  attr(html, new RegExp(`<meta[^>]+(?:name|property)="${key.replace(/[:]/g, '\\:')}"[^>]+content="([^"]*)"`)) ??
  attr(html, new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:name|property)="${key.replace(/[:]/g, '\\:')}"`))
const decode = (s = '') => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')

// ── 1. robots.txt ───────────────────────────────────────────────────
async function robots() {
  const r = await get('/robots.txt')
  check('robots', 'robots.txt 200 text/plain', r.status === 200 && r.type.includes('text/plain'), `${r.status} ${r.type}`)
  const disallow = [...r.body.matchAll(/^Disallow: (.+)$/gm)].map((m) => m[1].trim()).sort()
  const expected = ['/_next/', '/exclude/', '/404.html', '/admin', '/error/404', '/api/', '/frontend/ko/utils/token'].sort()
  check('robots', '기존 Disallow 규칙 7개 유지', JSON.stringify(disallow) === JSON.stringify(expected), disallow.join(' '))
  check('robots', `Sitemap: ${SITE}/sitemap.xml`, r.body.includes(`Sitemap: ${SITE}/sitemap.xml`))
  check('robots', 'Allow: / (전체 허용)', /^Allow: \/$/m.test(r.body))
}

// ── 2. sitemap.xml ──────────────────────────────────────────────────
async function sitemap(): Promise<string[]> {
  const r = await get('/sitemap.xml')
  check('sitemap', 'sitemap.xml 200 XML', r.status === 200 && r.type.includes('xml'), `${r.status} ${r.type}`)
  const locs = [...r.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  const lastmods = [...r.body.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1])
  check('sitemap', '주소 300개 이상', locs.length >= 300, `${locs.length}개`)
  const foreign = locs.filter((l) => !l.startsWith(SITE + '/') && l !== SITE)
  check('sitemap', `모든 주소가 ${SITE}`, foreign.length === 0, foreign.slice(0, 3).join(' '))
  check('sitemap', '중복 주소 없음', new Set(locs).size === locs.length, `${locs.length - new Set(locs).size}개 중복`)
  check(
    'sitemap',
    'lastmod가 날짜 형식',
    lastmods.length > 0 && lastmods.every((d) => /^\d{4}-\d{2}-\d{2}/.test(d)),
    `${lastmods.length}개`,
  )
  const pages = await pool(locs, 12, async (l) => ({ l, ...(await get(pathOf(l))) }))
  const bad = pages.filter((x) => x.status !== 200)
  check('sitemap', '모든 주소 200 (리다이렉트 없음)', bad.length === 0, bad.slice(0, 5).map((b) => `${b.status} ${b.l}`).join(', '))

  // 사이트맵의 모든 HTML 화면: 제목 템플릿·canonical·설명·h1·noindex (앱 화면은 자기 레이아웃이라 제외)
  const html = pages.filter((p) => p.type.includes('text/html') && !/\/(spin|edu)(\/|$)/.test(new URL(p.l).pathname))
  const issues: Record<string, string[]> = { title: [], canonical: [], description: [], h1: [], noindex: [] }
  for (const p of html) {
    const path = pathOf(p.l)
    const title = decode(attr(p.body, /<title>([^<]*)<\/title>/))
    if (!(path === '/' ? title === 'Hanpy Blog' : / \| Hanpy Blog$| — English$/.test(title))) issues.title.push(`${path} '${title}'`)
    const canonical = attr(p.body, /<link rel="canonical" href="([^"]+)"/) ?? ''
    if (decodeURI(canonical) !== decodeURI(p.l === SITE + '/' ? SITE : p.l)) issues.canonical.push(`${path} → ${canonical || '없음'}`)
    if ((decode(meta(p.body, 'description')) ?? '').length < 20) issues.description.push(path)
    if ((p.body.match(/<h1[\s>]/g) ?? []).length !== 1) issues.h1.push(path)
    if (/noindex/.test(meta(p.body, 'robots') ?? '')) issues.noindex.push(path)
  }
  const label: Record<string, string> = {
    title: "제목 '… | Hanpy Blog'",
    canonical: 'canonical = 사이트맵 주소',
    description: 'description 20자 이상',
    h1: 'h1 정확히 1개',
    noindex: 'noindex 아님',
  }
  for (const k of Object.keys(issues)) {
    // 짧은 설명은 글 summary 문제라 경고로만 (코드가 아니라 글을 고쳐야 함)
    const fn = k === 'description' ? warn : check
    fn('sitemap 화면 전체', `${label[k]} (${html.length}개)`, issues[k].length === 0, `${issues[k].length}건 ${issues[k].slice(0, 3).join(' · ')}`)
  }
  return locs
}

// ── 3. RSS ─────────────────────────────────────────────────────────
async function rss() {
  for (const [path, lng, min] of [
    ['/rss.xml', 'ko', 20],
    ['/en/rss.xml', 'en', 1],
  ] as const) {
    const r = await get(path)
    check('rss', `${path} 200 application/rss+xml`, r.status === 200 && r.type.includes('application/rss+xml'), `${r.status} ${r.type}`)
    const items = [...r.body.matchAll(/<item>[\s\S]*?<link>([^<]+)<\/link>[\s\S]*?<\/item>/g)].map((m) => m[1])
    check('rss', `${path} 글 ${min}개 이상`, items.length >= min, `${items.length}개`)
    check('rss', `${path} <language>${lng}`, r.body.includes(`<language>${lng}</language>`))
    check('rss', `${path} atom:link self`, r.body.includes(`href="${SITE}${path}" rel="self"`))
    const wrongLng = items.filter((l) => new URL(l).pathname.split('/')[2] !== lng)
    check('rss', `${path} 글 언어가 모두 ${lng}`, wrongLng.length === 0, wrongLng.slice(0, 2).join(' '))
    const statuses = await pool(items, 12, async (l) => (await get(pathOf(l))).status)
    check('rss', `${path} 글 링크 모두 200`, statuses.every((s) => s === 200), statuses.filter((s) => s !== 200).join(','))
  }
}

// ── 4. 메타태그·구조화 데이터 ───────────────────────────────────────
type PageSpec = { path: string; ld: string[]; title?: RegExp; noindex?: boolean; lang?: string; ogType?: string }

async function pages(locs: string[]) {
  const paths = locs.map(pathOf)
  const pick = (re: RegExp) => paths.find((p) => re.test(p))
  const post = '/backend/ko/security/auth-05-jwt'
  const specs: PageSpec[] = [
    { path: '/', ld: ['WebSite', 'Person'], title: /^Hanpy Blog$/ },
    { path: post, ld: ['BlogPosting', 'BreadcrumbList'], ogType: 'article' },
    { path: pick(/^\/infra\/en\/kubernetes\/[^/]+$/) ?? '/infra/en/kubernetes/01.Introduction', ld: ['BlogPosting', 'BreadcrumbList'], lang: 'en', ogType: 'article' },
    { path: '/backend/ko', ld: [] },
    { path: '/backend/ko/security', ld: [] },
    { path: '/series/ko', ld: [] },
    { path: '/series/ko/kubernetes', ld: ['ItemList'] },
    { path: '/tags/ko', ld: [] },
    { path: pick(/^\/tags\/ko\/[^/]+$/) ?? '/tags/ko/aws', ld: [] },
    { path: '/about', ld: ['ProfilePage', 'WebSite'] },
    { path: '/en', ld: [], lang: 'en' },
    { path: '/posts', ld: [] },
  ]
  // 글 1개짜리 태그: 사이트맵에 없고 noindex
  const tags = JSON.parse((await get('/search-index/ko.json')).body || '[]') as unknown[]
  check('search', '/search-index/ko.json 글 200개 이상', tags.length >= 200, `${tags.length}개`)
  const en = JSON.parse((await get('/search-index/en.json')).body || '[]') as unknown[]
  check('search', '/search-index/en.json 글 1개 이상', en.length >= 1, `${en.length}개`)

  for (const s of specs) {
    const r = await get(s.path)
    const h = r.body
    const where = `meta ${s.path}`
    if (r.status !== 200) {
      check(where, '200', false, String(r.status))
      continue
    }
    const title = decode(attr(h, /<title>([^<]*)<\/title>/))
    check(where, 'title 템플릿', s.title ? s.title.test(title) : /\S \| Hanpy Blog$|^Hanpy Blog — English$/.test(title), title)
    const desc = decode(meta(h, 'description'))
    check(where, 'description 20자 이상', desc.length >= 20, `${desc.length}자`)
    const canonical = attr(h, /<link rel="canonical" href="([^"]+)"/)
    const expectedCanonical = s.path === '/' ? SITE : SITE + s.path
    check(where, 'canonical = 자기 주소(절대)', decodeURI(canonical ?? '') === decodeURI(expectedCanonical), canonical ?? '없음')
    check(where, `html lang=${s.lang ?? 'ko'}`, attr(h, /<html[^>]* lang="([^"]+)"/) === (s.lang ?? 'ko'))
    check(where, 'h1 정확히 1개', (h.match(/<h1[\s>]/g) ?? []).length === 1, `${(h.match(/<h1[\s>]/g) ?? []).length}개`)
    for (const k of ['og:title', 'og:description', 'og:url', 'og:image', 'og:site_name', 'twitter:card', 'twitter:title', 'twitter:image']) {
      check(where, k, !!meta(h, k), meta(h, k)?.slice(0, 80) ?? '없음')
    }
    check(where, 'twitter:card = summary_large_image', meta(h, 'twitter:card') === 'summary_large_image')
    if (s.ogType) check(where, `og:type = ${s.ogType}`, meta(h, 'og:type') === s.ogType)
    const ogImage = meta(h, 'og:image')
    if (ogImage) {
      const img = await get(pathOf(decode(ogImage)))
      check(where, 'og:image 200 이미지', ogImage.startsWith(SITE) && img.status === 200 && img.type.startsWith('image/'), `${img.status} ${img.type} ${ogImage}`)
    }
    const robots = meta(h, 'robots') ?? ''
    check(where, 'noindex 없음', !/noindex/.test(robots), robots)
    check(where, 'RSS 자동 발견 링크', /<link rel="alternate" type="application\/rss\+xml"/.test(h))
    check(where, 'github.com 없음', !h.includes('github.com'))
    // JSON-LD
    const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1])
    const types: string[] = []
    let parsed = true
    for (const b of blocks) {
      try {
        const d = JSON.parse(b) as { '@graph'?: { '@type': string }[]; '@type'?: string }
        for (const g of d['@graph'] ?? [d]) if (g['@type']) types.push(g['@type'])
      } catch {
        parsed = false
      }
    }
    check(where, 'JSON-LD 파싱', parsed, `${blocks.length}개`)
    const missing = s.ld.filter((t) => !types.includes(t))
    check(where, `JSON-LD ${s.ld.join('·') || '(없어도 됨)'}`, missing.length === 0, types.join(',') || '없음')
    if (s.ld.includes('BlogPosting')) {
      const bp = JSON.parse(blocks[0])['@graph'].find((g: { '@type': string }) => g['@type'] === 'BlogPosting')
      const ok = bp.headline && bp.datePublished && bp.dateModified && bp.author?.name && bp.image?.[0]?.startsWith(SITE) && !bp.author?.sameAs
      check(where, 'BlogPosting 필드(headline·작성일·수정일·author·image, sameAs 없음)', !!ok, JSON.stringify({ d: bp.datePublished, m: bp.dateModified, a: bp.author?.url }))
    }
  }

  // 글 1개짜리 태그 noindex
  const tagIndex = (await get('/tags/ko')).body
  const onceSection = tagIndex.split('id="tags-once"')[1] ?? ''
  const once = attr(onceSection, /href="(\/tags\/ko\/[^"]+)"/)
  if (once) {
    const t = await get(once)
    check('meta 글 1개 태그', 'noindex, follow', /noindex/.test(meta(t.body, 'robots') ?? '') && /follow/.test(meta(t.body, 'robots') ?? ''), once)
    check('meta 글 1개 태그', '사이트맵에 없음', !locs.some((l) => decodeURI(pathOf(l)) === decodeURI(once)), once)
  }
}

// ── 5. GA ──────────────────────────────────────────────────────────
async function ga() {
  for (const path of ['/', '/backend/ko/security/auth-05-jwt', '/en']) {
    const h = (await get(path)).body
    const ids = [...h.matchAll(/googletagmanager\.com\/gtag\/js\?id=([A-Z0-9-]+)/g)].map((m) => m[1])
    if (EXPECT_GA === 'none') check('ga', `${path} GA 스크립트 없음`, ids.length === 0, ids.join(','))
    else if (EXPECT_GA) check('ga', `${path} GA = ${EXPECT_GA}`, ids.length > 0 && ids.every((i) => i === EXPECT_GA), ids.join(',') || '없음')
    else check('ga', `${path} GA 상태 기록`, true, ids.join(',') || '없음')
  }
}

// ── 5b. 광고 자리 (서버 HTML) ─────────────────────────────────────
// AdSlot은 높이를 잡은 빈 자리만 서버에서 그리고, 광고 요청(<ins>)은 화면 근처에서 브라우저가 넣는다(check-ui가 확인)
const AD_CLIENT = 'ca-pub-8185415229814052'
async function ads(locs: string[]) {
  const home = (await get('/')).body
  check('ads', '자동 광고 스크립트(adsbygoogle.js, 기존 그대로)', home.includes(`adsbygoogle.js?client=${AD_CLIENT}`))
  check('ads', '홈 사이드 광고 자리', home.includes('data-placement="sidebar"'))
  const post = (await get('/backend/ko/security/auth-05-jwt')).body
  check('ads', '글 본문 중간 광고 자리', (post.match(/data-placement="in-article"/g) ?? []).length === 1)
  check('ads', '글 오른쪽 사이드 광고 자리', (post.match(/data-placement="sidebar"/g) ?? []).length === 1)
  // 모든 글: 본문 중간 자리는 0~1개 (## 3개 이상인 글만)
  const posts = locs.map(pathOf).filter((p) => p.split('/').length >= 5 && !p.startsWith('/series/') && !p.startsWith('/tags/') && !p.startsWith('/og/'))
  const counts = await pool(posts, 12, async (p) => ((await get(p)).body.match(/data-placement="in-article"/g) ?? []).length)
  check('ads', `글마다 본문 중간 자리 0~1개 (${posts.length}개 글)`, counts.every((n) => n <= 1), `있는 글 ${counts.filter((n) => n === 1).length}개`)
}

// ── 6. 404·리다이렉트 ──────────────────────────────────────────────
async function errors() {
  for (const path of ['/no-such-page', '/backend/ko/security/no-such-post', '/series/ko/no-such-series', '/tags/ko/no-such-tag-xyz', '/og/backend/ko/x.png', '/series', '/nextjs']) {
    const r = await get(path)
    check('404', `${path} → 404`, r.status === 404, String(r.status))
  }
  const nf = await get('/no-such-page')
  check('404', '404 화면에 noindex·홈 링크', /noindex/.test(nf.body) && /href="\/"/.test(nf.body))
  // 끝 슬래시는 슬래시 없는 주소로 영구 이동 (Next 기본)
  const slash = await get('/about/')
  check('redirect', '/about/ → /about (308)', slash.status === 308 && slash.location.endsWith('/about'), `${slash.status} ${slash.location}`)
  const q = await get('/posts?category=infra')
  check('redirect', '/posts?category=infra 200 (옛 메뉴 주소 유지)', q.status === 200, String(q.status))
}

async function live() {
  for (const [from, want] of [
    ['http://hanpy-blog.com/', 'https://hanpy-blog.com/'],
    ['https://www.hanpy-blog.com/', 'https://hanpy-blog.com'],
  ]) {
    try {
      const r = await fetch(from, { redirect: 'manual' })
      const loc = r.headers.get('location') ?? ''
      check('live', `${from} → ${want}`, [301, 302, 307, 308].includes(r.status) && loc.startsWith(want), `${r.status} ${loc}`)
    } catch (e) {
      check('live', `${from} → ${want}`, false, String(e))
    }
  }
  const r = await fetch(SITE + '/', { redirect: 'manual' })
  check('live', 'HSTS 또는 https 응답', r.status === 200, `${r.status} ${r.headers.get('strict-transport-security') ?? ''}`)
}

const locs = await sitemap()
await robots()
await rss()
await pages(locs)
await ga()
await ads(locs)
await errors()
if (LIVE) await live()

const failed = results.filter((r) => !r.ok)
const warned = results.filter((r) => r.warn)
const lines = [
  `## 출시 점검 ${failed.length === 0 ? '통과' : `실패 ${failed.length}건`}${warned.length ? ` · 경고 ${warned.length}건` : ''} (${BASE}, 항목 ${results.length}개)`,
  '',
  '| 묶음 | 항목 | 결과 | 내용 |',
  '| --- | --- | --- | --- |',
  ...results.map((r) => `| ${r.group} | ${r.name} | ${r.warn ? '⚠️' : r.ok ? '✅' : '❌'} | ${r.detail.replace(/\|/g, '\\|').slice(0, 140)} |`),
]
const text = lines.join('\n')
console.log(lines.filter((l, i) => i < 4 || l.includes('❌') || l.includes('⚠️')).join('\n'))
if (REPORT) writeFileSync(REPORT, text + '\n')
if (failed.length) process.exit(1)
