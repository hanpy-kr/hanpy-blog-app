import { MetadataRoute } from 'next'
import contentlayer from '@/services-client/contentlayer'

const BASE_URL = 'https://blog.han-py.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const postsQuery = {
    category: 'All',
    type: 'meta',
    currentLng: 'ko',
    orderBy: 'publishedAt',
  }
  const datas = contentlayer.query(postsQuery as any)

  const sitmapDatas = datas.map((data) => {
    return {
      url: `${BASE_URL}/${data['_raw']['flattenedPath']}`,
      lastModified: new Date(data['publishedAt']),
    }
  })

  return [
    {
      url: 'https://blog.han-py.com',
      // lastModified: new Date().toISOString(),
      lastModified: new Date(),
      // changeFrequency: 'yearly',
      priority: 1,
    },
    ...sitmapDatas,
  ]
}
// {
//   url: 'https://blog.han-py.com',
//   lastModified: new Date(),
//   changeFrequency: 'yearly',
//   priority: 1,
// },
