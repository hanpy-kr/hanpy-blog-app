// 블로그 루트 레이아웃: 동적 세그먼트 [category]/[lng] 아래에 두어 <html lang>이 URL 언어를 따르게 한다
// (루트 레이아웃이 여러 개라 어느 라우트에도 맞지 않는 주소는 app/global-not-found.tsx 가 받는다)
import type { Metadata } from 'next'
import SiteDocument from '@/components/layout/SiteDocument'
import { baseMetadata } from '@/config/site'
import '@/styles/globals.css'

export const dynamicParams = false

export const metadata: Metadata = baseMetadata

export default async function BlogRootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ category: string; lng: string }>
}) {
  const { lng } = await params
  return <SiteDocument lang={lng === 'en' ? 'en' : 'ko'}>{children}</SiteDocument>
}
