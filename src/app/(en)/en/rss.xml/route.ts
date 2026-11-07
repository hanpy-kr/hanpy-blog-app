// 영어 피드 /en/rss.xml (세션 7b)
import { SITE_DESCRIPTION_EN } from '@/config/site'
import { RSS_TITLE, rssResponse } from '@/lib/rss'

export const dynamic = 'force-static'

export function GET() {
  return rssResponse({ lng: 'en', title: RSS_TITLE.en, description: SITE_DESCRIPTION_EN, home: '/en', self: '/en/rss.xml' })
}
