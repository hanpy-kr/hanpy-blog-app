// 사이트 공통 상수와 기본 메타데이터. 루트 레이아웃(홈·블로그·서브 프로젝트)이 함께 쓴다.
import type { Metadata } from 'next'

export const SITE_URL = 'https://hanpy-blog.com'
export const SITE_NAME = 'Hanpy Blog'

/** 블로그 소개 문구 (2026-11-02 확정). 사이트 기본 description으로도 쓴다 */
export const SITE_DESCRIPTION =
  '직접 만들고 운영하며 배운 것을 시리즈로 정리합니다. 처음부터 순서대로 읽으면 한 주제를 끝까지 이해할 수 있게 씁니다.'

export const ADSENSE_CLIENT = 'ca-pub-8185415229814052'

export const AUTHOR = {
  name: 'Hanpy',
  github: 'https://github.com/hanpy-kr',
  tagline: '백엔드·인프라 엔지니어 · AI 트렌드 정리 중',
  intro:
    'Node.js·NestJS 백엔드와 AWS·Kubernetes 인프라를 주로 다룹니다. 요즘은 AI 개발 도구와 LLM 활용 트렌드를 정리하고 있습니다.',
} as const

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
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
    images: [{ url: '/meta/image.jpeg', width: 1600, height: 900, alt: 'Hanpy Blog' }],
    type: 'website',
  },
  manifest: '/manifest.json',
}
