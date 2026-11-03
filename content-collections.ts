// Content Collections 설정 (세션 2 PoC에서 검증, 세션 3에서 이식)
// 경로가 곧 메타데이터: _content/{category}/{lng}/{sub}/.../{slug}.mdx → URL /{category}/{lng}/{sub}/.../{slug}
// frontmatter는 아직 기존 형식 그대로 읽는다 (category·lng·pageKey 정리, 날짜 형식 통일은 세션 4)
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
      body,
    }
  },
})

export default defineConfig({
  content: [posts],
})
