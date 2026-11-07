import { releasedPosts } from '@/lib/content'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/config/site'

export const dynamic = 'force-static'

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export function GET() {
  // 지금은 예전처럼 모든 언어의 최신 글 50개. 한국어·영어 분리(/rss.xml, /en/rss.xml)는 세션 7
  const items = releasedPosts
    .slice(0, 50)
    .map((p) => {
      const link = SITE_URL + p.url
      return `<item>
<title>${escapeXml(p.title)}</title>
<link>${link}</link>
<guid>${link}</guid>
<pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
<description>${escapeXml(p.summary)}</description>
</item>`
    })
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${SITE_NAME}</title>
<link>${SITE_URL}</link>
<description>${escapeXml(SITE_DESCRIPTION)}</description>
${items}
</channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
