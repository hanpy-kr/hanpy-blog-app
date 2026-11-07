// RSS 2.0 피드 (언어별 최신 글 50개): /rss.xml(한국어), /en/rss.xml(영어) — 세션 7b에서 언어 분리
import { SITE_NAME, SITE_URL } from '@/config/site'
import { releasedPosts } from './content'

const LIMIT = 50

const escapeXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function rssResponse({ lng, title, description, home, self }: { lng: string; title: string; description: string; home: string; self: string }) {
  const items = releasedPosts
    .filter((p) => p.lng === lng)
    .slice(0, LIMIT)
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
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${escapeXml(title)}</title>
<link>${SITE_URL}${home}</link>
<description>${escapeXml(description)}</description>
<language>${lng}</language>
<atom:link href="${SITE_URL}${self}" rel="self" type="application/rss+xml"/>
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

export const RSS_TITLE = { ko: SITE_NAME, en: `${SITE_NAME} (English)` }
