import { getAllDocumentsFlat } from '@/lib/blog-documents'
import { isReleasedPost } from '@/lib/posts-query'

const SITE = 'https://hanpy-blog.com'

function escapeXml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function GET() {
  const items = getAllDocumentsFlat()
    .filter(isReleasedPost)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime(),
    )
    .slice(0, 50)

  const channelItems = items
    .map((item) => {
      const link = `${SITE}/${item._raw.flattenedPath}`
      return `<item>
<title>${escapeXml(item.title)}</title>
<link>${link}</link>
<guid>${link}</guid>
<pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>
<description>${escapeXml(item.summary)}</description>
</item>`
    })
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>Hanpy Blog</title>
<link>${SITE}</link>
<description>Hanpy development blog</description>
${channelItems}
</channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
