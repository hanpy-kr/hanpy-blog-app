// contentlayer.config.ts
// https://contentlayer.dev/

import type { ComputedFields } from 'contentlayer/source-files'
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
// import readingTime from 'reading-time'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
}

const _fields = {
  title: {
    type: 'string',
    required: true,
  },
  publishedAt: {
    type: 'string',
    required: true,
  },
  summary: {
    type: 'string',
    required: true,
  },
}

export const Frontend = defineDocumentType(() => ({
  name: 'Frontend',
  filePathPattern: `frontend/*.mdx`,
  // filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: _fields as {},
}))

export const Backend = defineDocumentType(() => ({
  name: 'Backend',
  filePathPattern: `backend/*.mdx`,
  // filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: _fields as {},
}))

export const Infra = defineDocumentType(() => ({
  name: 'Infra',
  filePathPattern: `infra/*.mdx`,
  contentType: 'mdx',
  fields: _fields as {},
}))

const rehypeOptions = {
  theme: 'slack-dark',
  keepBackground: true,
}

export default makeSource({
  contentDirPath: '_content',
  documentTypes: [Frontend, Backend, Infra],
  mdx: {
    remarkPlugins: [remarkGfm], // mdx table Plugin
    rehypePlugins: [[rehypePrettyCode as any, rehypeOptions]],
  },
})
