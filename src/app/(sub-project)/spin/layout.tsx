// /spin 루트 레이아웃. 블로그 스타일과 섞이지 않게 자기 CSS(page.css)만 쓴다
import type { Metadata, Viewport } from 'next'
import AdSenseScript from '@/components/layout/AdSenseScript'
import { SITE_URL } from '@/config/site'

const title = 'Lucky Wheel - Free Online Spinning Wheel for Games & Prizes'
const description =
  'Spin the wheel of fortune and win amazing prizes! Perfect for games, giveaways, raffles, and decision making. Free online spinning wheel with customizable options and fair random selection.'
const shortDescription =
  'Spin the wheel of fortune and win amazing prizes! Perfect for games, giveaways, raffles, and decision making.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  robots: { index: true, follow: true },
  manifest: '/manifests/spin.json',
  openGraph: {
    type: 'website',
    title,
    description: shortDescription,
    url: '/spin',
    images: [{ url: '/meta/image.jpeg', width: 1600, height: 900, alt: 'Lucky Wheel Game' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: shortDescription,
    images: ['/meta/image.jpeg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function SpinLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdSenseScript />
        {children}
      </body>
    </html>
  )
}
