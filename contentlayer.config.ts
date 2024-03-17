// contentlayer.config.ts
// https://contentlayer.dev/

// https://www.yujiseok.blog/post/create-blog-with-nextjs

// import { defineDocumentType, makeSource } from "contentlayer/source-files";

// export const Post = defineDocumentType(() => ({
//   name: "Post",
//   //   filePathPattern: `**/*.md`,
//   filePathPattern: `**/*.mdx`,
//   contentType: "mdx",

//   fields: {
//     title: { type: "string", required: true },
//     date: { type: "date", required: true },
//   },
//   computedFields: {
//     url: {
//       type: "string",
//       resolve: (post) => `/test/${post._raw.flattenedPath}`,
//     },
//   },
// }));

// export default makeSource({ contentDirPath: "posts", documentTypes: [Post] });

import type { ComputedFields } from 'contentlayer/source-files'
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'

import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields: ComputedFields = {
  // readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/*.mdx`,
  // filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    // title: { type: "string", required: true },
    // date: { type: "date", required: true },
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
    image: {
      type: 'string',
    },
  },
  // computedFields,
}))

const rehypeOptions = {
  theme: 'slack-dark',
  // theme: "one-dark-pro",
  // theme: "github-dark-dimmed",
  keepBackground: true,
}

export default makeSource({
  contentDirPath: '_content',
  // contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm], // mdx table Plugin
    rehypePlugins: [[rehypePrettyCode as any, rehypeOptions]],
  },
  // mdx: {
  //   remarkPlugins: [remarkGfm],
  //   rehypePlugins: [
  //     rehypeSlug,
  //     [
  //       rehypePrettyCode,
  //       {
  //         theme: "material-theme-palenight",
  //       },
  //     ],
  //     [
  //       rehypeAutolinkHeadings,
  //       {
  //         properties: {
  //           className: ["anchor"],
  //         },
  //       },
  //     ],
  //   ],
  // },
})
