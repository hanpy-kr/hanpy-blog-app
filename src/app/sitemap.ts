import { MetadataRoute } from 'next'
import contentlayer from '@/services-client/contentlayer'

const BASE_URL = 'https://hanpy-blog.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const postsQuery = {
    category: 'All',
    type: 'meta',
    currentLng: 'ko',
    orderBy: 'publishedAt',
  }
  const datas = contentlayer.query(postsQuery as any)

  const sitmapDatas = datas
    .filter((item) => {
      if (
        item &&
        item?.deployment &&
        new Date(item['publishedAt']).getTime() < new Date().getTime()
      ) {
        return true
      } else {
        return false
      }
    })
    .map((data) => {
      return {
        url: `${BASE_URL}/${data['_raw']['flattenedPath']}`,
        lastModified: new Date(data['publishedAt']),
      }
    })

  return [
    {
      url: BASE_URL,
      // lastModified: new Date().toISOString(),
      lastModified: new Date(),
      // changeFrequency: 'yearly',
      priority: 1,
    },
    ...sitmapDatas,
    {
      url: `${BASE_URL}/spin`,
      // lastModified: new Date().toISOString(),
      lastModified: new Date('2025-08-10'),
      // changeFrequency: 'yearly',
      priority: 1,
    },
  ]
}
// {
//   url: 'https://hanpy-blog.com',
//   lastModified: new Date(),
//   changeFrequency: 'yearly',
//   priority: 1,
// },
