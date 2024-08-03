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

const _fieldsWithCommon = {
  deployment: {
    type: 'boolean',
    required: true,
  },
  category: {
    type: 'string',
    required: true,
  },
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
const _fieldsWithFrontend = {
  deployment: {
    type: 'boolean',
    required: true,
  },
  category: {
    type: 'string',
    required: true,
  },
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

// 한국어 - 프론트 엔드
export const FrontendForKOR = defineDocumentType(() => ({
  name: 'FrontendForKOR',
  filePathPattern: `frontend/ko/**/*.mdx`,
  contentType: 'mdx',
  fields: _fieldsWithFrontend as {},
  // 도메인 위치 변경 필요 시 사용
  // computedFields: {
  //   url: {
  //     type: "string",
  //     resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
  //   },
  // },
}))

// 영어 - 프론트 엔드
export const FrontendForENG = defineDocumentType(() => ({
  name: 'FrontendForENG',
  filePathPattern: `frontend/en/**/*.mdx`,
  contentType: 'mdx',
  fields: _fieldsWithFrontend as {},
  // 도메인 위치 변경 필요 시 사용
  // computedFields: {
  //   url: {
  //     type: "string",
  //     resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
  //   },
  // },
}))

// 한국어 - 인프라
export const InfraForKOR = defineDocumentType(() => ({
  name: 'InfraForKOR',
  filePathPattern: `infra/ko/**/*.mdx`,
  contentType: 'mdx',
  fields: _fieldsWithCommon as {},
}))

// 영어 - 인프라
export const InfraForENG = defineDocumentType(() => ({
  name: 'InfraForENG',
  filePathPattern: `infra/en/**/*.mdx`,
  contentType: 'mdx',
  fields: _fieldsWithCommon as {},
}))

// 한국어 - 디자인 페턴
export const DesignForKOR = defineDocumentType(() => ({
  name: 'DesignForKOR',
  filePathPattern: `design/ko/**/*.mdx`,
  contentType: 'mdx',
  fields: _fieldsWithCommon as {},
}))

// 영어 - 디자인 페턴
export const DesignForENG = defineDocumentType(() => ({
  name: 'DesignForENG',
  filePathPattern: `design/en/**/*.mdx`,
  contentType: 'mdx',
  fields: _fieldsWithCommon as {},
}))

// 한국어 - language
export const LanguageForKOR = defineDocumentType(() => ({
  name: 'LanguageForKOR',
  filePathPattern: `language/ko/**/*.mdx`,
  contentType: 'mdx',
  fields: _fieldsWithCommon as {},
}))

// 영어 - language
export const LanguageForENG = defineDocumentType(() => ({
  name: 'LanguageForENG',
  filePathPattern: `language/en/**/*.mdx`,
  contentType: 'mdx',
  fields: _fieldsWithCommon as {},
}))

export const Backend = defineDocumentType(() => ({
  name: 'Backend',
  filePathPattern: `backend/*.mdx`,
  // filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: _fieldsWithCommon as {},
}))

const rehypeOptions = {
  theme: 'slack-dark',
  keepBackground: true,
}

export default makeSource({
  contentDirPath: '_content',
  documentTypes: [
    FrontendForKOR,
    FrontendForENG,
    Backend,
    InfraForKOR,
    InfraForENG,
    DesignForKOR,
    DesignForENG,
    LanguageForKOR,
    LanguageForENG,
  ],
  disableImportAliasWarning: true,

  mdx: {
    remarkPlugins: [remarkGfm], // mdx table Plugin
    rehypePlugins: [[rehypePrettyCode as any, rehypeOptions]],
  },
})
