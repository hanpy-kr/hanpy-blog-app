// /edu 루트 레이아웃 (비즈니스 영어 카드)
import type { Metadata, Viewport } from 'next'
import AdSenseScript from '@/components/layout/AdSenseScript'
import { SITE_URL } from '@/lib/site'
import './edu.css'

const title = 'Hanpy Education Center - Interactive Learning Platform'
const shortDescription =
  'Master business English, technical concepts, and more with our interactive learning platform.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description:
    'Master business English, technical concepts, and more with our interactive learning platform. Perfect for professionals and students.',
  keywords: [
    'education',
    'learning',
    'business english',
    'interactive',
    'e-learning',
    'professional development',
    'study tools',
    'language learning',
  ],
  authors: [{ name: 'Hanpy', url: SITE_URL }],
  creator: 'Hanpy',
  publisher: 'Hanpy Blog',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ko_KR'],
    siteName: 'Hanpy Blog',
    title,
    description: shortDescription,
    url: '/edu',
    images: [{ url: '/meta/image.jpeg', width: 1600, height: 900, alt: 'Hanpy Education Center' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: shortDescription,
    images: ['/meta/image.jpeg'],
  },
  alternates: { canonical: '/edu' },
  category: 'Education',
  manifest: '/manifests/edu.json',
  appleWebApp: { capable: true, title: 'Hanpy Edu', statusBarStyle: 'default' },
  applicationName: 'Hanpy Education Center',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#2563eb',
}

export default function EduLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <AdSenseScript />
        {children}
      </body>
    </html>
  )
}
