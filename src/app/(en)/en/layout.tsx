// /en 루트 레이아웃 (세션 7b): <html lang="en">
import type { Metadata } from 'next'
import SiteDocument from '@/components/layout/SiteDocument'
import { OG_LOCALE, SITE_DESCRIPTION_EN, baseMetadata } from '@/config/site'
import '@/styles/globals.css'

export const metadata: Metadata = {
  ...baseMetadata,
  description: SITE_DESCRIPTION_EN,
  openGraph: { ...baseMetadata.openGraph, description: SITE_DESCRIPTION_EN, locale: OG_LOCALE.en },
  twitter: { ...baseMetadata.twitter, description: SITE_DESCRIPTION_EN },
}

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument lang="en">{children}</SiteDocument>
}
