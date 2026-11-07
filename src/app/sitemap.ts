// sitemap.xml: 공개 글 전부 + 홈·목록·/spin·RSS
// lastmod = updatedAt(없으면 publishedAt). 다른 언어 짝이 있는 글은 hreflang(xhtml:link)을 함께 낸다
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/config/site'
import { getAlternates, releasedPosts } from '@/lib/content'

const abs = (path: string) => SITE_URL + path

export default function sitemap(): MetadataRoute.Sitemap {
  const modified = (p: (typeof releasedPosts)[number]) => p.updatedAt ?? p.publishedAt
  // 홈·목록·RSS는 가장 최근에 바뀐 글 날짜 (빌드할 때마다 날짜가 바뀌지 않게)
  const latest = releasedPosts.map(modified).toSorted().at(-1)

  return [
    { url: SITE_URL, lastModified: latest, priority: 1 },
    ...releasedPosts.map((p) => {
      const languages = getAlternates(p)
      return {
        url: abs(p.url),
        lastModified: modified(p),
        ...(Object.keys(languages).length
          ? { alternates: { languages: Object.fromEntries(Object.entries(languages).map(([l, u]) => [l, abs(u)])) } }
          : {}),
      }
    }),
    { url: `${SITE_URL}/spin`, lastModified: '2025-08-10', priority: 1 },
    { url: `${SITE_URL}/posts`, lastModified: latest, priority: 0.8 },
    { url: `${SITE_URL}/rss.xml`, lastModified: latest, priority: 0.5 },
  ]
}
