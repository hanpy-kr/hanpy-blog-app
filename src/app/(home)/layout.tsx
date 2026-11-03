// 홈·전체 글 목록 루트 레이아웃 (한국어)
import type { Metadata } from 'next'
import SiteDocument from '@/components/layout/SiteDocument'
import { baseMetadata } from '@/lib/site'
import '@/styles/globals.css'

export const metadata: Metadata = baseMetadata

export default function HomeRootLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument lang="ko">{children}</SiteDocument>
}
