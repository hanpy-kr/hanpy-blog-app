// 사이트 전역 설정: 사이트명·주소·작성자·외부 링크·분석 ID·AdSense·기본 메타데이터 (계획 문서 '유입·브랜딩·수익화 설계')
// 루트 레이아웃(홈·블로그·서브 프로젝트)이 함께 쓴다. 세션 6에서 src/lib/site.ts 에서 옮김
import type { Metadata } from 'next'

export const SITE_URL = 'https://hanpy-blog.com'
export const SITE_NAME = 'Hanpy Blog'

/** 블로그 소개 문구 (2026-11-02 확정). 사이트 기본 description으로도 쓴다 */
export const SITE_DESCRIPTION =
  '직접 만들고 운영하며 배운 것을 시리즈로 정리합니다. 처음부터 순서대로 읽으면 한 주제를 끝까지 이해할 수 있게 씁니다.'

export const ADSENSE_CLIENT = 'ca-pub-8185415229814052'

/** GA4 측정 ID. 코드에 적지 않고 빌드 환경변수로만 받는다 (Amplify 환경 변수 NEXT_PUBLIC_GA_ID). 없으면 GA 스크립트를 내지 않는다 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || undefined

/** 기본 OG 이미지 (홈·목록). 글은 글마다 opengraph-image로 만든 이미지를 쓴다 */
export const DEFAULT_OG_IMAGE = { url: '/meta/image.jpeg', width: 1600, height: 900, alt: 'Hanpy Blog' } as const

export const OG_LOCALE = { ko: 'ko_KR', en: 'en_US' } as const

/** RSS 자동 발견 링크. 페이지가 alternates를 따로 정하면 레이아웃 값이 통째로 바뀌므로 그때도 이것을 함께 넣는다 */
export const RSS_ALTERNATE = { 'application/rss+xml': [{ url: '/rss.xml', title: SITE_NAME }] }

// GitHub 등 외부 계정 주소는 사이트에 노출하지 않는다 (2026-11-05 결정)
export const AUTHOR = {
  name: 'Hanpy',
  /** 작성자 URL (메타데이터 authors·article:author·JSON-LD Person). /about이 생기면(세션 7) 그 주소로 */
  url: SITE_URL,
  tagline: '백엔드·인프라 엔지니어 · AI 트렌드 정리 중',
  intro:
    'Node.js·NestJS 백엔드와 AWS·Kubernetes 인프라를 주로 다룹니다. 요즘은 AI 개발 도구와 LLM 활용 트렌드를 정리하고 있습니다.',
} as const

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // 하위 페이지의 title은 '제목 | Hanpy Blog'가 된다 (홈은 default)
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  alternates: { types: RSS_ALTERNATE },
  applicationName: 'hanpy blog',
  verification: {
    other: {
      'naver-site-verification': '9cd2d8ecd2c271066df07e901055b7f7736a7061',
    },
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
    locale: OG_LOCALE.ko,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  manifest: '/manifest.json',
}
