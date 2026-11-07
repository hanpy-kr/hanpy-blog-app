// sitemap.xml: 공개 글 전부 + 홈·목록·소개·/spin·RSS
// lastmod = updatedAt(없으면 publishedAt). 목록 화면은 그 안에 든 글 중 가장 최근 날짜 (빌드할 때마다 날짜가 바뀌지 않게)
// 다른 언어 짝이 있는 글은 hreflang(xhtml:link)을 함께 낸다
// 세션 7: 카테고리·서브카테고리 목록, 시리즈 목록·목차, 태그(글 2개 이상만), /about, /en, 앱 등록부(src/config/apps.ts)
import type { MetadataRoute } from 'next'
import { APPS } from '@/config/apps'
import { SITE_URL } from '@/config/site'
import {
  LNGS,
  TAG_INDEX_MIN_POSTS,
  categoryHref,
  categoryLngs,
  getAlternates,
  getPosts,
  getSeriesList,
  getTagPosts,
  getTags,
  releasedPosts,
  seriesLngs,
  subListHref,
  visibleSubs,
  type Post,
} from '@/lib/content'

const abs = (path: string) => SITE_URL + path
const modified = (p: Post) => p.updatedAt ?? p.publishedAt
const latestOf = (posts: Post[]) => posts.map(modified).toSorted().at(-1)

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = latestOf(releasedPosts)
  const enPosts = releasedPosts.filter((p) => p.lng === 'en')

  const posts = releasedPosts.map((p) => {
    const languages = getAlternates(p)
    return {
      url: abs(p.url),
      lastModified: modified(p),
      ...(Object.keys(languages).length
        ? { alternates: { languages: Object.fromEntries(Object.entries(languages).map(([l, u]) => [l, abs(u)])) } }
        : {}),
    }
  })

  const categories = categoryLngs().flatMap(({ category, lng }) => {
    const inCategory = getPosts({ lng, category })
    return [
      { url: abs(categoryHref(category, lng)), lastModified: latestOf(inCategory), priority: 0.7 },
      ...visibleSubs(category, lng).map((s) => ({
        url: abs(subListHref(category, lng, s.id)),
        lastModified: latestOf(inCategory.filter((p) => p.sub === s.id)),
        priority: 0.6,
      })),
    ]
  })

  const series = seriesLngs().flatMap((lng) => {
    const list = getSeriesList(lng)
    return [
      { url: abs(`/series/${lng}`), lastModified: latestOf(list.flatMap((s) => s.posts)), priority: 0.8 },
      ...list.map((s) => ({ url: abs(s.href), lastModified: latestOf(s.posts), priority: 0.7 })),
    ]
  })

  // 글 1개짜리 태그는 noindex라 넣지 않는다
  const tags = LNGS.flatMap((lng) => {
    const list = getTags(lng).filter((t) => t.count >= TAG_INDEX_MIN_POSTS)
    if (list.length === 0) return []
    return [
      { url: abs(`/tags/${lng}`), lastModified: latestOf(releasedPosts.filter((p) => p.lng === lng)), priority: 0.4 },
      ...list.map((t) => ({ url: abs(t.href), lastModified: latestOf(getTagPosts(lng, t.slug)), priority: 0.4 })),
    ]
  })

  return [
    { url: SITE_URL, lastModified: latest, priority: 1 },
    ...posts,
    ...categories,
    ...series,
    ...tags,
    { url: abs('/about'), lastModified: latest, priority: 0.6 },
    ...(enPosts.length ? [{ url: abs('/en'), lastModified: latestOf(enPosts), priority: 0.8 }] : []),
    ...APPS.filter((a) => a.sitemap).map((a) => ({ url: abs(a.href), lastModified: a.sitemap!.lastModified, priority: a.sitemap!.priority })),
    { url: `${SITE_URL}/posts`, lastModified: latest, priority: 0.8 },
    { url: `${SITE_URL}/rss.xml`, lastModified: latest, priority: 0.5 },
    ...(enPosts.length ? [{ url: abs('/en/rss.xml'), lastModified: latestOf(enPosts), priority: 0.5 }] : []),
  ]
}
