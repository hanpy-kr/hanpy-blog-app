// robots.txt (세션 6에서 public 규칙 파일 src/app/robots.txt 를 옮김, 규칙은 그대로)
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next/', '/exclude/', '/404.html', '/admin', '/error/404', '/api/', '/frontend/ko/utils/token'],
    },
    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
