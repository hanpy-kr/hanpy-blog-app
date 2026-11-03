// 홈·전체 글 목록 루트 레이아웃 (한국어)
import type { Metadata } from 'next'
import AdSenseScript from '@/components/layout/AdSenseScript'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { baseMetadata } from '@/lib/site'
import '@/styles/globals.css'

export const metadata: Metadata = baseMetadata

export default function HomeRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <AdSenseScript />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
