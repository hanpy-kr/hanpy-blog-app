// Content Collections 설정 (세션 2 PoC에서 검증, 세션 3에서 이식, 세션 4에서 frontmatter 정리)
// 경로가 곧 메타데이터: _content/{category}/{lng}/{sub}/.../{slug}.mdx → URL /{category}/{lng}/{sub}/.../{slug}
// 카테고리·언어는 경로에서 읽는다. frontmatter 형식은 계획 문서 'frontmatter 스키마' 표 그대로
// 경로의 category·sub와 frontmatter group은 src/config/taxonomy.ts 에 등록된 것만 받는다 (세션 5)
import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import GithubSlugger from 'github-slugger'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { z } from 'zod'
import remarkAdSlot from './src/lib/remark-ad-slot'
import { isSeriesId, SERIES } from './src/config/series'
import { getSubDef, isCategory, subIds, TAXONOMY } from './src/config/taxonomy'

const LNGS = ['ko', 'en']

const prettyCode: PrettyCodeOptions = {
  theme: 'slack-dark', // 기존 설정 유지
  keepBackground: true,
}

// 날짜는 YYYY-MM-DD 만 받는다. YAML은 `2024-01-02` 를 Date로 읽고 `2025-5-20` 같은 값은 문자열로 남기므로
// 문자열이면 형식을 검사한다 (따옴표로 감싼 '2024-01-02' 도 통과)
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const dateField = z
  .union([z.date(), z.string().regex(DATE_RE, '날짜는 YYYY-MM-DD 형식이어야 합니다 (예: 2025-05-20)')])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v))
  .refine((v) => !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0, 10) === v, '없는 날짜입니다')

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
 * - h2·h3 목차를 만든다. id는 rehype-slug와 같은 github-slugger 규칙으로 계산한다
 * - 코드 블록을 뺀 글자 수로 읽는 시간(분)을 어림한다 (한국어 기준 분당 약 500자)
 * - 본문에 h1(`# `)이 있으면 그 줄 번호를 돌려준다. 글 제목은 frontmatter title 하나만 쓰므로 h1은 금지
 */
function analyze(content: string) {
  const lines = content.split('\n')
  const slugger = new GithubSlugger()
  const toc: TocItem[] = []
  let fence: string | null = null
  let textLength = 0
  const h1Lines: number[] = []
  for (const [i, line] of lines.entries()) {
    const f = /^\s*(```|~~~)/.exec(line)
    if (f) {
      fence = fence === null ? f[1] : fence === f[1] ? null : fence
      continue
    }
    if (fence) continue
    textLength += line.replace(/\s+/g, '').length
    const h = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line)
    if (!h) continue
    if (h[1].length === 1) h1Lines.push(i + 1)
    const id = slugger.slug(slugText(h[2]))
    const depth = h[1].length
    if (depth === 2 || depth === 3) toc.push({ depth, text: displayText(h[2]), id })
  }

  return { toc, h1Lines, readingMinutes: Math.max(1, Math.round(textLength / 500)) }
}

const posts = defineCollection({
  name: 'posts',
  directory: '_content',
  include: '**/*.mdx', // .md는 받지 않는다 (세션 4에서 모두 .mdx로 바꿈)
  schema: z.object({
    title: z.string().trim().min(1),
    /** 목록·메타 description·OG. 초안은 비워 둘 수 있다 */
    summary: z.string().trim(),
    /** 미래 날짜면 그날까지 비공개 (예약 발행) */
    publishedAt: dateField,
    updatedAt: dateField.optional(),
    draft: z.boolean().default(false),
    /** 사이드바 그룹과 그룹 안 순서. 공개 글은 필수 */
    group: z.string().trim().min(1).optional(),
    order: z.number().int().min(0).optional(),
    /** 시리즈 id. 시리즈 안 순서는 사이드바 순서(그룹 순서 → order)를 따른다 */
    series: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, '시리즈 id는 소문자·숫자·하이픈').optional(),
    tags: z.array(z.coerce.string()).optional(),
    /** 다른 언어 글과 slug가 다를 때만 그 글의 경로 (기본은 같은 sub/slug끼리 자동 연결) */
    translationOf: z.string().optional(),
    /** 광고를 뺄 글에만 false */
    ads: z.boolean().default(true),
    content: z.string(),
  }),
  transform: async (doc, context) => {
    const parts = doc._meta.path.split('/')
    const [category, lng, ...rest] = parts
    if (parts.length < 4) return context.skip(`경로가 짧음: ${doc._meta.filePath}`)

    const where = doc._meta.filePath
    const sub = rest[0]
    // 폴더 이름 오타·미등록 서브카테고리는 배포 전에 빌드를 멈춘다 (초안 포함)
    if (!isCategory(category)) {
      throw new Error(`${where}: 카테고리 '${category}'가 src/config/taxonomy.ts 에 없습니다 (${Object.keys(TAXONOMY).join(', ')})`)
    }
    if (!LNGS.includes(lng)) throw new Error(`${where}: 언어 '${lng}'는 ${LNGS.join('·')}만 받습니다`)
    const subDef = getSubDef(category, sub)
    if (!subDef) {
      throw new Error(`${where}: 서브카테고리 '${category}/${sub}'가 src/config/taxonomy.ts 에 없습니다 (등록된 것: ${subIds(category).join(', ') || '없음'})`)
    }
    if (doc.group !== undefined && !subDef.groups.includes(doc.group)) {
      throw new Error(`${where}: group '${doc.group}'는 '${category}/${sub}'의 그룹이 아닙니다 (taxonomy groups: ${subDef.groups.join(', ')})`)
    }
    // 시리즈 id는 src/config/series.ts 에 등록된 것만 (세션 7)
    if (doc.series !== undefined && !isSeriesId(doc.series)) {
      throw new Error(`${where}: 시리즈 '${doc.series}'가 src/config/series.ts 에 없습니다 (${Object.keys(SERIES).join(', ')})`)
    }
    const { toc, h1Lines, readingMinutes } = analyze(doc.content)
    // 규칙 위반은 빌드를 멈춘다 (초안도 마찬가지: 공개하는 순간 깨지지 않게)
    if (h1Lines.length) {
      throw new Error(`${where}: 본문에 h1(# )이 있습니다 (본문 ${h1Lines.join(', ')}번째 줄). 글 제목은 frontmatter title만 쓰고 본문 제목은 ## 부터`)
    }
    if (!doc.draft) {
      const missing: string[] = []
      if (!doc.summary) missing.push('summary')
      if (doc.group === undefined) missing.push('group')
      if (doc.order === undefined) missing.push('order')
      if (missing.length) throw new Error(`${where}: 공개 글에 ${missing.join('·')}가 없습니다`)
    }

    const body = await compileMDX(context, doc, {
      // 본문 중간 광고 자리 표시를 넣는다 (세션 7b). ads: false 는 글 페이지가 이 표시를 비워서 처리한다
      // (compileMDX 캐시가 본문 기준이라 frontmatter만 바꾸면 다시 컴파일되지 않으므로 여기서 분기하지 않음)
      remarkPlugins: [remarkGfm, remarkAdSlot],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [rehypePrettyCode, prettyCode],
      ],
    })

    const released = !doc.draft && new Date(doc.publishedAt).getTime() <= Date.now()
    return {
      title: doc.title,
      summary: doc.summary,
      publishedAt: doc.publishedAt,
      updatedAt: doc.updatedAt,
      draft: doc.draft,
      group: doc.group,
      order: doc.order,
      series: doc.series,
      tags: doc.tags ?? [],
      translationOf: doc.translationOf,
      ads: doc.ads,
      category,
      lng,
      sub,
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
