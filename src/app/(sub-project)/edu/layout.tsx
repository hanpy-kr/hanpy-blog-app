import { Metadata } from 'next';
import { getManifestForMetadata } from '../../../utils/manifest';

export const metadata: Metadata = {
  title: 'Hanpy Education Center - Interactive Learning Platform',
  description: 'Master business English, technical concepts, and more with our interactive learning platform. Perfect for professionals and students.',
  keywords: 'education, learning, business english, interactive, e-learning, professional development, study tools, language learning',
  authors: [{ name: 'Hanpy', url: 'https://hanpy-blog.com' }],
  creator: 'Hanpy',
  publisher: 'Hanpy Blog',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ko_KR'],
    siteName: 'Hanpy Blog',
    title: 'Hanpy Education Center - Interactive Learning Platform',
    description: 'Master business English, technical concepts, and more with our interactive learning platform.',
    url: '/edu',
    images: [
      {
        url: '/meta/edu-og.jpeg',
        width: 1200,
        height: 630,
        alt: 'Hanpy Education Center',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@hanpy_dev',
    creator: '@hanpy_dev',
    title: 'Hanpy Education Center - Interactive Learning Platform',
    description: 'Master business English, technical concepts, and more with our interactive learning platform.',
    images: ['/meta/edu-og.jpeg'],
  },
  
  // 아이콘
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  
  // 대체 링크
  alternates: {
    canonical: '/edu',
    languages: {
      'en-US': '/edu',
      'ko-KR': '/edu'
    },
  },
  
  // 카테고리
  category: 'Education',
  
  // 매니페스트
  manifest: getManifestForMetadata('edu'),
  
  // 기타 메타 태그
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Hanpy Edu',
    'application-name': 'Hanpy Education Center',
    'mobile-web-app-capable': 'yes',
    'theme-color': '#2563eb',
  },
  
  // 검증
  verification: {
    google: 'google-site-verification-token',
    other: {
      'naver-site-verification': 'naver-verification-token',
    },
  },
};

export default function EduLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
