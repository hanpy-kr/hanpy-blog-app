import { Metadata } from 'next';
import { getManifestForMetadata } from '../../../utils/manifest';

export const metadata: Metadata = {
  title: 'Lucky Wheel - Free Online Spinning Wheel for Games & Prizes',
  description: 'Spin the wheel of fortune and win amazing prizes! Perfect for games, giveaways, raffles, and decision making. Free online spinning wheel with customizable options and fair random selection.',
  keywords: 'spinning wheel, wheel of fortune, lucky wheel, spin wheel, random picker, prize wheel, roulette, decision maker, raffle wheel, game wheel, prize generator, random selector, spin game, online wheel, giveaway wheel',
  authors: [{ name: 'Hanpy', url: 'https://hanpy-blog.com' }],
  creator: 'Hanpy',
  publisher: 'Hanpy Blog',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'es_ES', 'fr_FR', 'de_DE', 'ja_JP', 'zh_CN'],
    siteName: 'Hanpy Blog',
    title: 'Lucky Wheel - Free Online Spinning Wheel for Games & Prizes',
    description: 'Spin the wheel of fortune and win amazing prizes! Perfect for games, giveaways, raffles, and decision making.',
    url: '/spin',
    images: [
      {
        url: '/meta/image.jpeg',
        width: 1200,
        height: 630,
        alt: '가벼운 돌림판 게임 이미지',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@hanpy_dev',
    creator: '@hanpy_dev',
    title: 'Lucky Wheel - Free Online Spinning Wheel for Games & Prizes',
    description: 'Spin the wheel of fortune and win amazing prizes! Perfect for games, giveaways, raffles, and decision making.',
    images: ['/meta/image.jpeg'],
  },
  
  // 추가 메타 태그
  other: {
    'theme-color': '#4f46e5',
    'color-scheme': 'light dark',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Lucky Wheel',
    'application-name': 'Lucky Wheel',
    'msapplication-TileColor': '#4f46e5',
    'msapplication-config': '/browserconfig.xml',
  },
  
  // 대체 언어
  alternates: {
    languages: {
      'ko': '/spin',
      'en': '/en/spin',
    },
  },
  
  // 카테고리
  category: 'Games',
  
  // 매니페스트
  manifest: getManifestForMetadata('spin'),
  

  
  // 검증
  verification: {
    google: 'google-site-verification-token',
    other: {
      'naver-site-verification': 'naver-verification-token',
    },
  },
};

export default function SpinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
