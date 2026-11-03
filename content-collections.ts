// Content Collections 설정 (세션 2 PoC에서 검증, 세션 3에서 이식)
// 경로가 곧 메타데이터: _content/{category}/{lng}/{sub}/.../{slug}.mdx → URL /{category}/{lng}/{sub}/.../{slug}
// frontmatter는 아직 기존 형식 그대로 읽는다 (category·lng·pageKey 정리, 날짜 형식 통일은 세션 4)
import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import GithubSlugger from 'github-slugger'
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

type TocItem = { depth: 2 | 3; text: string; id: string }

/**
 * 마크다운 제목 줄의 텍스트 (링크·코드·강조 기호·JSX 태그 제거).
 * 슬러그용 텍스트는 rehype-slug가 보는 텍스트와 같아야 목차 링크가 맞는다
 */
const ESCAPED_LT = '\u0000'
const headingText = (md: string) =>
  md
    .replace(/\\</g, ESCAPED_LT) // 이스케이프한 \<type> 은 태그가 아니라 글자
    .replace(/\\>/g, '>')
    .replace(/<[^>]+>/g, '')
    .replace(/!?\[((?:[^[\]]|\[[^\]]*\])*)\]\([^)]*\)/g, '$1') // [텍스트](url), [[Link]](url)
    .replace(/`([^`]*)`/g, '$1')
    .replace(/(\*\*|__|\*|_|~~)(?=\S)(.+?)(?<=\S)\1/g, '$2') // 기호 바로 뒤가 공백이면 강조가 아님
const slugText = (md: string) => headingText(md).replaceAll(ESCAPED_LT, '')
const displayText = (md: string) =>
  headingText(md)
    .replaceAll(ESCAPED_LT, '<')
    .replace(/\*\*|__/g, '')
    .trim()

/**
 * 본문을 한 번 훑어
 * - 맨 앞의 `# 제목` 줄을 떼어 낸다 (글 머리는 페이지가 그리므로 제목이 두 번 나오지 않게)
 * - h2·h3 목차를 만든다. id는 rehype-slug와 같은 github-slugger 규칙으로 계산한다
 * - 코드 블록을 뺀 글자 수로 읽는 시간(분)을 어림한다 (한국어 기준 분당 약 500자)
 */
function analyze(content: string) {
  const lines = content.split('\n')
  let heading: string | null = null
  const first = lines.findIndex((l) => l.trim() !== '')
  if (first !== -1 && /^#\s+\S/.test(lines[first])) {
    heading = displayText(lines[first].replace(/^#\s+/, ''))
    lines.splice(first, 1)
  }

  const slugger = new GithubSlugger()
  const toc: TocItem[] = []
  let fence: string | null = null
  let textLength = 0
  for (const line of lines) {
    const f = /^\s*(```|~~~)/.exec(line)
    if (f) {
      fence = fence === null ? f[1] : fence === f[1] ? null : fence
      continue
    }
    if (fence) continue
    textLength += line.replace(/\s+/g, '').length
    const h = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line)
    if (!h) continue
    const id = slugger.slug(slugText(h[2]))
    const depth = h[1].length
    if (depth === 2 || depth === 3) toc.push({ depth, text: displayText(h[2]), id })
  }

  return { content: lines.join('\n'), heading, toc, readingMinutes: Math.max(1, Math.round(textLength / 500)) }
}

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

    const { content, heading, toc, readingMinutes } = analyze(doc.content)
    const body = await compileMDX(context, { ...doc, content }, {
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
      /** 본문 첫 줄의 `# 제목` (없으면 frontmatter title). 글 페이지의 h1 */
      heading: heading || doc.title,
      summary: doc.summary,
      publishedAt: doc.publishedAt,
      tags: doc.tags ?? [],
      category,
      lng,
      sub: rest[0],
      segments: rest, // [sub, ...slug] — frontend/ko/nextjs/seo/next-sitemap 처럼 5단도 있음
      url: '/' + doc._meta.path,
      released,
      toc,
      readingMinutes,
      body,
    }
  },
})

export default defineConfig({
  content: [posts],
})
