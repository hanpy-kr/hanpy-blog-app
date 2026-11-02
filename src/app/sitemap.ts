import type { MetadataRoute } from 'next'
import { releasedPosts } from '@/lib/content'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), priority: 1 },
    ...releasedPosts.map((p) => ({ url: SITE_URL + p.url, lastModified: new Date(p.publishedAt) })),
    { url: `${SITE_URL}/spin`, lastModified: new Date('2025-08-10'), priority: 1 },
    { url: `${SITE_URL}/posts`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/rss.xml`, lastModified: new Date(), priority: 0.5 },
  ]
}
