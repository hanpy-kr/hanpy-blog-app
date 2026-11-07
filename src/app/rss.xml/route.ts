// 한국어 피드 (세션 7b부터 한국어 글만. 영어는 /en/rss.xml)
import { SITE_DESCRIPTION } from '@/config/site'
import { RSS_TITLE, rssResponse } from '@/lib/rss'

export const dynamic = 'force-static'

export function GET() {
  return rssResponse({ lng: 'ko', title: RSS_TITLE.ko, description: SITE_DESCRIPTION, home: '', self: '/rss.xml' })
}
