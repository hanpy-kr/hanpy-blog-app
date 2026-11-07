// 구조화 데이터(schema.org JSON-LD) 만들기. 서버 전용 (글 페이지·홈에서 <JsonLd>로 출력)
// - 글: BlogPosting(작성일·수정일·작성자) + BreadcrumbList(홈 > 카테고리 > 서브카테고리 > 글)
// - 홈: WebSite + Person (외부 계정 sameAs는 넣지 않음 — GitHub 주소 비노출, 2026-11-05)
// - /about: ProfilePage(mainEntity = Person) (세션 7)
// 작성자·사이트는 @id로 서로 가리킨다 (같은 사람·사이트로 묶이게)
import { AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/config/site'
import { categoryHref, categoryLabel, ogImagePath, subLabel, subListHref, type Post } from './content'

const abs = (path: string) => new URL(path, SITE_URL).toString()

export const PERSON_ID = `${SITE_URL}/#author`
export const WEBSITE_ID = `${SITE_URL}/#website`

/** 날짜만 있는 값은 한국 시간 자정으로 (글은 날짜 단위로 관리) */
const isoDate = (date: string) => `${date}T00:00:00+09:00`

export function personLd() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: AUTHOR.name,
    url: AUTHOR.url,
    description: AUTHOR.intro,
  }
}

export function websiteLd() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: 'ko',
    publisher: { '@id': PERSON_ID },
  }
}

/** /about: ProfilePage + WebSite */
export function aboutLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [{ '@type': 'ProfilePage', url: AUTHOR.url, name: `${AUTHOR.name} 소개`, mainEntity: personLd() }, websiteLd()],
  }
}

/** 홈: WebSite + Person */
export function homeLd() {
  return { '@context': 'https://schema.org', '@graph': [websiteLd(), personLd()] }
}

/** 글: BlogPosting + BreadcrumbList */
export function postLd(post: Post) {
  const url = abs(post.url)
  const crumbs: { name: string; item: string }[] = [
    { name: SITE_NAME, item: SITE_URL },
    { name: categoryLabel(post.category), item: abs(categoryHref(post.category, post.lng)) },
    { name: subLabel(post.category, post.sub), item: abs(subListHref(post.category, post.lng, post.sub)) },
  ]
  crumbs.push({ name: post.title, item: url })

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: url,
        url,
        headline: post.title,
        description: post.summary,
        image: [abs(ogImagePath(post))],
        datePublished: isoDate(post.publishedAt),
        dateModified: isoDate(post.updatedAt ?? post.publishedAt),
        author: { '@type': 'Person', '@id': PERSON_ID, name: AUTHOR.name, url: AUTHOR.url },
        publisher: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID },
        inLanguage: post.lng,
        articleSection: categoryLabel(post.category),
        ...(post.tags.length ? { keywords: post.tags.join(', ') } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })),
      },
    ],
  }
}
