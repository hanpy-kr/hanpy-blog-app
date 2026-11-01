// PoC: Contentlayer → Content Collections
// 경로가 곧 메타데이터: _content/{category}/{lng}/{sub}/.../{slug}.mdx → URL /{category}/{lng}/{sub}/.../{slug}
// frontmatter는 아직 기존 형식 그대로 읽는다 (category·lng·pageKey·deployment 정리는 세션 4)
import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { z } from 'zod'

const prettyCode: PrettyCodeOptions = {
  theme: 'slack-dark', // 기존 설정 유지
  keepBackground: true,
}

// YAML은 `2024-01-02` 를 Date로 읽으므로 문자열·Date 둘 다 받아 YYYY-MM-DD로 맞춘다
const dateField = z
  .union([z.string(), z.date()])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v.trim()))

const posts = defineCollection({
  name: 'posts',
  directory: '_content',
  include: '**/*.mdx', // .md 14개는 세션 4에서 .mdx로 바꾼 뒤 들어옴
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: dateField,
    deployment: z.boolean(),
    category: z.string(),
    lng: z.string(),
    pageKey: z.string(),
    tags: z.array(z.string()).optional(),
    content: z.string(),
  }),
  transform: async (doc, context) => {
    const parts = doc._meta.path.split('/')
    const [category, lng, ...rest] = parts
    if (parts.length < 4) return context.skip(`경로가 짧음: ${doc._meta.filePath}`)

    const body = await compileMDX(context, doc, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [rehypePrettyCode, prettyCode],
      ],
    })

    const released = doc.deployment && new Date(doc.publishedAt).getTime() <= Date.now()
    return {
      title: doc.title,
      summary: doc.summary,
      publishedAt: doc.publishedAt,
      tags: doc.tags ?? [],
      category,
      lng,
      sub: rest[0],
      segments: rest, // [sub, ...slug] — frontend/ko/nextjs/seo/next-sitemap 처럼 5단도 있음
      url: '/' + doc._meta.path,
      released,
      // 경로와 frontmatter가 어긋나는 글 확인용 (세션 4에서 frontmatter 필드 삭제 전에 점검)
      // (frontmatter는 'Backend'·'KOR' 같은 표기라 소문자·ko/en으로 맞춰 비교)
      frontmatterMismatch:
        doc.category.toLowerCase() !== category || ({ KOR: 'ko', ENG: 'en' } as Record<string, string>)[doc.lng] !== lng
          ? `frontmatter ${doc.category}/${doc.lng} ≠ 경로 ${category}/${lng}`
          : null,
      body,
    }
  },
})

export default defineConfig({
  content: [posts],
})
