// 블로그 루트 레이아웃: 동적 세그먼트 [category]/[lng] 아래에 두어 <html lang>이 URL 언어를 따르게 한다
// (계획 문서 '지켜야 할 규칙' — PoC에서 확인할 항목)
import type { Metadata } from 'next'
import '@/styles/globals.css'

export const dynamicParams = false

export const metadata: Metadata = {
  metadataBase: new URL('https://hanpy-blog.com'),
  applicationName: 'hanpy blog',
  robots: { index: false, follow: false }, // PoC 미리보기는 색인 금지
}

export default async function BlogRootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ category: string; lng: string }>
}) {
  const { lng } = await params
  return (
    <html lang={lng === 'en' ? 'en' : 'ko'}>
      <body>
        <div className="shell">
          <header className="topbar">
            <a href="/">hanpy blog</a>
            <span className="badge">PoC · Next 16 · lang={lng}</span>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
