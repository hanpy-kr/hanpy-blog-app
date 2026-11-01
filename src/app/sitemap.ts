import type { MetadataRoute } from 'next'
import { releasedPosts } from '@/lib/content'

const BASE_URL = 'https://hanpy-blog.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, priority: 1 },
    ...releasedPosts.map((p) => ({ url: BASE_URL + p.url, lastModified: new Date(p.publishedAt) })),
  ]
}
