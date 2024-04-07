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

const _fieldsWithInfra = {
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
  lng: {
    type: 'string',
    required: true,
  },
  pageKey: {
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
  // 도메인 위치 변경 필요 시 사용
  // computedFields: {
  //   url: {
  //     type: "string",
  //     resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
  //   },
  // },
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
  filePathPattern: `infra/**/*.mdx`,
  contentType: 'mdx',
  fields: _fieldsWithInfra as {},
}))

const rehypeOptions = {
  theme: 'slack-dark',
  keepBackground: true,
}

export default makeSource({
  contentDirPath: '_content',
  documentTypes: [Frontend, Backend, Infra],
  disableImportAliasWarning: true,

  mdx: {
    remarkPlugins: [remarkGfm], // mdx table Plugin
    rehypePlugins: [[rehypePrettyCode as any, rehypeOptions]],
  },
})
