/**
 * 화면 점검 (세션 8, docs/release-checklist.md): Playwright(Chromium)
 *
 *   node scripts/check-ui.mjs --base http://127.0.0.1:3000 [--report 파일.md] [--shots 폴더]
 *
 * 1. 폰 390px: 사이트맵의 모든 주소에서 가로 스크롤 없음 (document.documentElement.scrollWidth <= 390)
 * 2. 다크 모드: 시스템 다크 설정이면 html.dark, 배경·본문 글자색 대비 4.5:1 이상 (화면 종류별 표본)
 * 3. 테마 버튼: 누르면 바뀌고 새로 고침 뒤에도 유지
 * 4. 광고 자리(AdSlot): 처음엔 요청 없음, 스크롤하면 <ins data-ad-slot> 생성, 높이 고정, 끝까지 스크롤 CLS < 0.1
 *
 * Playwright는 저장소 의존성이 아니다. CI는 실행 전에 설치하고, 로컬은 전역 설치를 쓴다(createRequire → NODE_PATH)
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const args = process.argv.slice(2)
const arg = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined)
const BASE = (arg('--base') ?? 'http://127.0.0.1:3000').replace(/\/$/, '')
const REPORT = arg('--report')
const SHOTS = arg('--shots')
if (SHOTS) mkdirSync(SHOTS, { recursive: true })

const results = []
const check = (group, name, ok, detail = '') => results.push({ group, name, ok, detail })

const sm = await (await fetch(BASE + '/sitemap.xml')).text()
const paths = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1])
  .filter((l) => !l.endsWith('.xml'))
  .map((l) => new URL(l).pathname)

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})

// ── 1. 폰 390px 가로 스크롤 ───────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
  const wide = []
  let i = 0
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      const page = await ctx.newPage()
      while (i < paths.length) {
        const p = paths[i++]
        await page.goto(BASE + p, { waitUntil: 'load' })
        const w = await page.evaluate(() => document.documentElement.scrollWidth)
        if (w > 390) wide.push(`${p} (${w}px)`)
      }
      await page.close()
    }),
  )
  check('mobile', `390px 가로 스크롤 없음 (${paths.length}개 화면)`, wide.length === 0, wide.slice(0, 5).join(', '))
  await ctx.close()
}

// ── 2. 다크 모드 ──────────────────────────────────────────────────
const SAMPLE = [
  '/',
  '/backend/ko/security/auth-05-jwt',
  '/backend/ko',
  '/backend/ko/security',
  '/series/ko',
  '/series/ko/kubernetes',
  '/tags/ko',
  '/about',
  '/en',
  '/posts',
  '/spin',
].filter((p) => p === '/spin' || paths.includes(p) || p === '/')

const lum = (rgb) => {
  const [r, g, b] = rgb.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number).map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

for (const scheme of ['dark', 'light']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme })
  const page = await ctx.newPage()
  for (const p of SAMPLE.filter((x) => x !== '/spin')) {
    await page.goto(BASE + p, { waitUntil: 'load' })
    const s = await page.evaluate(() => {
      const bg = getComputedStyle(document.body).backgroundColor
      const main = document.querySelector('main') ?? document.body
      const el = main.querySelector('p') ?? main
      return { dark: document.documentElement.classList.contains('dark'), bg, fg: getComputedStyle(el).color, h1: getComputedStyle(document.querySelector('h1') ?? main).color }
    })
    const ok = s.dark === (scheme === 'dark') && contrast(s.bg, s.fg) >= 4.5 && contrast(s.bg, s.h1) >= 4.5
    check(`${scheme} mode`, p, ok, `class.dark=${s.dark} 배경 ${s.bg} 본문 ${contrast(s.bg, s.fg).toFixed(1)}:1 h1 ${contrast(s.bg, s.h1).toFixed(1)}:1`)
    if (SHOTS && scheme === 'dark' && (p === '/' || p.startsWith('/backend/ko/security/'))) {
      await page.screenshot({ path: `${SHOTS}/dark${p.replace(/\//g, '_') || '_home'}.png` })
    }
  }
  await ctx.close()
}

// ── 3. 테마 버튼 ──────────────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' })
  const page = await ctx.newPage()
  await page.goto(BASE + '/backend/ko/security/auth-05-jwt', { waitUntil: 'load' })
  const before = await page.evaluate(() => document.documentElement.classList.contains('dark'))
  await page.click('header button[aria-label*="모드"]')
  const after = await page.evaluate(() => document.documentElement.classList.contains('dark'))
  await page.reload({ waitUntil: 'load' })
  const kept = await page.evaluate(() => document.documentElement.classList.contains('dark'))
  check('theme toggle', '라이트 → 다크 전환, 새로 고침 뒤 유지', before === false && after === true && kept === true, `${before} → ${after} → ${kept}`)
  if (SHOTS) {
    const m = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'dark' })
    const mp = await m.newPage()
    await mp.goto(BASE + '/backend/ko/security/auth-05-jwt', { waitUntil: 'load' })
    await mp.screenshot({ path: `${SHOTS}/dark_mobile_post.png` })
    await m.close()
  }
  await ctx.close()
}

// ── 3b. 시리즈 상자: 폰은 처음 접힘(CSS) → 누르면 펼침, 데스크톱은 처음 펼침 → 누르면 접힘 ─────
for (const [label, viewport, first] of [
  ['폰 390', { width: 390, height: 844 }, false],
  ['데스크톱 1440', { width: 1440, height: 900 }, true],
]) {
  const ctx = await browser.newContext({ viewport })
  const page = await ctx.newPage()
  await page.goto(BASE + '/backend/ko/security/auth-05-jwt', { waitUntil: 'load' })
  await page.waitForTimeout(1000) // 하이드레이션 대기
  // 닫힌 <details> 내용은 크기 값이 남아 있으므로 실제 표시 여부로 본다
  const listShown = () => page.isVisible('details[data-mode] ol')
  const a = await listShown()
  await page.click('details[data-mode] summary')
  await page.waitForTimeout(200)
  const b = await listShown()
  await page.click('details[data-mode] summary')
  await page.waitForTimeout(200)
  const c = await listShown()
  check('series box', `${label}: 처음 ${first ? '펼침' : '접힘'} → 누르면 바뀌고 → 다시 누르면 돌아옴`, a === first && b === !first && c === first, `${a} → ${b} → ${c}`)
  await ctx.close()
}

// ── 4. 광고 자리: 화면 근처에서 <ins> 생성, 높이 고정, 밀림(CLS) 없음 ─────
{
  const POST = '/backend/ko/security/auth-05-jwt'
  for (const [label, viewport, placements] of [
    ['데스크톱 1440', { width: 1440, height: 900 }, { 'in-article': ['5145013792', 280], sidebar: ['7928069746', 250] }],
    ['폰 390', { width: 390, height: 844 }, { 'in-article': ['5145013792', 280] }],
  ]) {
    const ctx = await browser.newContext({ viewport })
    const page = await ctx.newPage()
    await page.addInitScript(() => {
      window.__cls = 0
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value
      }).observe({ type: 'layout-shift', buffered: true })
    })
    await page.goto(BASE + POST, { waitUntil: 'load' })
    const before = await page.evaluate(() => document.querySelectorAll('ins.adsbygoogle').length)
    // 끝까지 천천히 내리며 지연 로드를 일으킨다
    const height = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < height; y += 400) {
      await page.mouse.wheel(0, 400)
      await page.waitForTimeout(80)
    }
    await page.waitForTimeout(2500)
    for (const [placement, [slot, h]] of Object.entries(placements)) {
      const r = await page.evaluate((pl) => {
        const el = document.querySelector(`[data-placement="${pl}"]`)
        if (!el) return null
        const ins = el.querySelector('ins.adsbygoogle')
        const box = ins?.parentElement ?? el.lastElementChild
        return { slot: ins?.getAttribute('data-ad-slot'), client: ins?.getAttribute('data-ad-client'), h: Math.round(box.getBoundingClientRect().height), status: ins?.getAttribute('data-ad-status') ?? '' }
      }, placement)
      check(`ads ${label}`, `${placement}: <ins data-ad-slot=${slot}> 생성`, !!r && r.slot === slot && r.client === 'ca-pub-8185415229814052', JSON.stringify(r))
      check(`ads ${label}`, `${placement}: 높이 ${h}px 고정`, !!r && r.h === h, `${r?.h}px ${r?.status}`)
    }
    check(`ads ${label}`, '처음엔 광고 요청 없음(지연 로드)', before === 0, `처음 ins ${before}개`)
    const cls = await page.evaluate(() => window.__cls)
    check(`ads ${label}`, 'CLS 0.1 미만 (끝까지 스크롤)', cls < 0.1, cls.toFixed(4))
    if (SHOTS) {
      await page.evaluate(() => document.querySelector('[data-placement="in-article"]')?.scrollIntoView({ block: 'center' }))
      await page.screenshot({ path: `${SHOTS}/ad_in-article_${viewport.width}.png` })
    }
    await ctx.close()
  }
}

await browser.close()

const failed = results.filter((r) => !r.ok)
const lines = [
  `## 화면 점검 ${failed.length === 0 ? '통과' : `실패 ${failed.length}건`} (${BASE}, 항목 ${results.length}개)`,
  '',
  '| 묶음 | 항목 | 결과 | 내용 |',
  '| --- | --- | --- | --- |',
  ...results.map((r) => `| ${r.group} | ${r.name} | ${r.ok ? '✅' : '❌'} | ${String(r.detail).replace(/\|/g, '\\|').slice(0, 160)} |`),
]
console.log(lines.join('\n'))
if (REPORT) writeFileSync(REPORT, lines.join('\n') + '\n')
if (failed.length) process.exit(1)
