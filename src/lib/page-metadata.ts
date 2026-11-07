// 목록·소개 화면의 메타데이터 (세션 7)
// Next 메타데이터는 최상위 키 단위로 합쳐져서, 페이지가 openGraph·twitter·alternates를 정하면 레이아웃 값이 통째로 바뀐다.
// 그래서 새 화면은 이 함수로 기본값(사이트명·기본 OG 이미지·RSS 링크)을 펼쳐 넣는다
import type { Metadata } from 'next'
import { OG_LOCALE, SITE_NAME, baseMetadata, rssAlternate } from '@/config/site'

export function pageMetadata({
  title,
  description,
  path,
  lng = 'ko',
  noindex = false,
}: {
  title: string
  description: string
  /** canonical 경로 (예: /series/ko) */
  path: string
  lng?: string
  /** 검색에 내보내지 않음 (글 1개짜리 태그 등). 링크는 따라가게 둔다 */
  noindex?: boolean
}): Metadata {
  const full = `${title} | ${SITE_NAME}`
  return {
    // 레이아웃의 title 템플릿은 하위 세그먼트에만 적용된다. /backend/ko·/series/ko·/tags/ko처럼
    // 루트 레이아웃과 같은 세그먼트의 페이지는 템플릿이 빠지므로 완성된 제목을 직접 넣는다 (세션 8)
    title: { absolute: full },
    description,
    alternates: { canonical: path, types: rssAlternate(lng) },
    openGraph: {
      ...baseMetadata.openGraph,
      title: full,
      description,
      url: path,
      locale: OG_LOCALE[lng === 'en' ? 'en' : 'ko'],
    },
    twitter: { ...baseMetadata.twitter, title: full, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
