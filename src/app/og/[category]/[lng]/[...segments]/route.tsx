// 글별 OG 이미지 (1200×630 PNG): /og/{category}/{lng}/{sub}/.../{slug}.png — 빌드 때 공개 글마다 정적 생성
// 파일 규칙 opengraph-image.tsx를 쓰지 않는 이유: 글 라우트가 [...segments](catch-all)라 그 아래에 둘 수 없음
// ("Catch-all must be the last part of the URL"). 그래서 같은 next/og ImageResponse를 정적 라우트 핸들러로 낸다.
// 글 페이지 generateMetadata가 이 주소를 og:image·twitter:image로 넣는다 (ogImagePath)
// 디자인 시안 색(--fg·--muted·--accent·--line, 카테고리 파스텔)과 글꼴(IBM Plex Sans KR 줄인 판·JetBrains Mono)
// 글꼴은 assets/og/ 의 woff (next/og는 woff2를 못 읽음). 자세한 내용은 assets/og/README.md
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { SITE_NAME, SITE_URL } from '@/config/site'
import { OG_IMAGE_SIZE, categoryLabel, getPost, releasedPosts, subLabel } from '@/lib/content'

type Params = { category: string; lng: string; segments: string[] }

export const dynamic = 'force-static'
export const dynamicParams = false

/** 마지막 조각에 .png를 붙인 글 경로 */
export function generateStaticParams(): Params[] {
  return releasedPosts.map((p) => ({
    category: p.category,
    lng: p.lng,
    segments: [...p.segments.slice(0, -1), `${p.segments.at(-1)}.png`],
  }))
}

// 디자인 토큰 (src/styles/globals.css 라이트 값)
const C = {
  bg: '#ffffff',
  fg: '#0f172a',
  muted: '#475569',
  line: '#e2e8f0',
  accent: '#2563eb',
  accentWeak: '#eff6ff',
}
const TONE: Record<string, string> = {
  backend: '#f1f3fa',
  infra: '#fafaf5',
  design: '#faf3f5',
  language: '#faf6f5',
  frontend: '#f2f8f5',
  ai: '#f4f1fa',
}

let fontsPromise: Promise<{ sans: Buffer; mono: Buffer }> | undefined
const loadFonts = () =>
  (fontsPromise ??= Promise.all([
    readFile(join(process.cwd(), 'assets/og/HanpyOGSansKR-Bold.woff')),
    readFile(join(process.cwd(), 'assets/og/JetBrainsMono-Medium.subset.woff')),
  ]).then(([sans, mono]) => ({ sans, mono })))

/** 제목 길이에 따라 글자 크기를 줄여 3줄 안에 들어가게 한다 (한글은 글자 폭이 넓어 2배로 센다) */
function titleSize(title: string): number {
  const width = [...title].reduce((n, ch) => n + (ch.charCodeAt(0) > 0x2e80 ? 2 : 1), 0)
  if (width <= 24) return 80
  if (width <= 44) return 70
  if (width <= 70) return 62
  return 56
}

export async function GET(_req: Request, { params }: { params: Promise<Params> }) {
  const { category, lng, segments } = await params
  const last = decodeURIComponent(segments.at(-1) ?? '')
  const post = last.endsWith('.png') ? getPost(category, lng, [...segments.slice(0, -1), last.slice(0, -4)]) : undefined
  if (!post) return new Response('Not Found', { status: 404 })
  const { sans, mono } = await loadFonts()
  const title = post.title
  const eyebrow = `${categoryLabel(post.category)} · ${subLabel(post.category, post.sub)}`.toUpperCase()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: TONE[category] ?? C.bg,
          padding: 40,
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: C.bg,
            border: `2px solid ${C.line}`,
            borderRadius: 20,
            padding: '52px 64px 44px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ width: 48, height: 8, borderRadius: 4, background: C.accent }} />
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 26, letterSpacing: 2, color: C.accent }}>{eyebrow}</div>
            </div>
            {/* 단어(띄어쓰기) 단위로 줄을 바꾼다. Satori의 word-break: keep-all은 쉼표 앞에서 줄을 바꾸는 문제가 있어 직접 나눈다 */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                columnGap: Math.round(titleSize(title) * 0.22),
                fontFamily: 'Hanpy OG Sans KR',
                fontSize: titleSize(title),
                lineHeight: 1.28,
                letterSpacing: -1,
                color: C.fg,
              }}
            >
              {title.split(/\s+/).map((word, i) => (
                <span key={i}>{word}</span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: `2px solid ${C.line}`,
              paddingTop: 28,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  background: C.accentWeak,
                  color: C.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Hanpy OG Sans KR',
                  fontSize: 28,
                }}
              >
                H
              </div>
              <div style={{ fontFamily: 'Hanpy OG Sans KR', fontSize: 32, color: C.fg }}>{SITE_NAME}</div>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 24, color: C.muted }}>{new URL(SITE_URL).host}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
      fonts: [
        { name: 'Hanpy OG Sans KR', data: sans, weight: 700, style: 'normal' },
        { name: 'JetBrains Mono', data: mono, weight: 500, style: 'normal' },
      ],
    },
  )
}
