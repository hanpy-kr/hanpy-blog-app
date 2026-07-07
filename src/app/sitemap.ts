import { MetadataRoute } from 'next'
import { resolveBlogRouteRule } from '@/lib/blog-route-rules'
import { isReleasedPost, queryPostsMeta } from '@/lib/posts-query'

const BASE_URL = 'https://hanpy-blog.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const koDatas = queryPostsMeta({
    category: 'All',
    currentLng: 'ko',
    orderBy: 'publishedAt',
  })

  const enDatas = queryPostsMeta({
    category: 'All',
    currentLng: 'en',
    orderBy: 'publishedAt',
  })

  const sitemapDatas = [...koDatas, ...enDatas]
    .filter(isReleasedPost)
    .filter((data) => resolveBlogRouteRule(data._raw.flattenedPath) !== null)
    .map((data) => ({
      url: `${BASE_URL}/${data._raw.flattenedPath}`,
      lastModified: new Date(data.publishedAt),
    }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      priority: 1,
    },
    ...sitemapDatas,
    {
      url: `${BASE_URL}/spin`,
      lastModified: new Date('2025-08-10'),
      priority: 1,
    },
    {
      url: `${BASE_URL}/posts`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/rss.xml`,
      lastModified: new Date(),
      priority: 0.5,
    },
  ]
}
