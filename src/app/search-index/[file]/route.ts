// 검색 인덱스: /search-index/ko.json, /search-index/en.json (세션 7b). 빌드 때 정적 생성
// 검색 창(src/components/search/SearchDialog.tsx)이 처음 열릴 때 한 번 받는다
import { LNGS, categoryLabel, releasedPosts, subLabel } from '@/lib/content'
import type { SearchDoc } from '@/lib/search'

type Params = { file: string }

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return LNGS.filter((lng) => releasedPosts.some((p) => p.lng === lng)).map((lng) => ({ file: `${lng}.json` }))
}

export async function GET(_req: Request, { params }: { params: Promise<Params> }) {
  const { file } = await params
  const lng = file.replace(/\.json$/, '')
  const docs: SearchDoc[] = releasedPosts
    .filter((p) => p.lng === lng)
    .map((p) => ({
      id: p.url,
      title: p.title,
      summary: p.summary,
      tags: p.tags.join(' '),
      headings: p.toc.map((t) => t.text).join(' '),
      where: `${categoryLabel(p.category)} · ${subLabel(p.category, p.sub)}`,
      date: p.publishedAt,
    }))
  return Response.json(docs, { headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' } })
}
