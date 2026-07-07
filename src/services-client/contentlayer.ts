import {
  queryPostsMeta,
  serializePostListItem,
  type PostListItemSerialized,
} from '@/lib/posts-query'
import type { CategoryType } from '@/app/(home)/types'

class ContentlayerService {
  query({
    category,
    currentLng,
    orderBy,
  }: {
    category: CategoryType
    type: 'meta' | 'content'
    currentLng: string
    orderBy: 'publishedAt'
  }) {
    return queryPostsMeta({ category, currentLng, orderBy })
  }
}

export default new ContentlayerService()

export function serializePostsForClient(
  docs: ReturnType<typeof queryPostsMeta>,
): PostListItemSerialized[] {
  return docs.map(serializePostListItem)
}

// reference
// // app/page.tsx
// import Link from 'next/link'
// import { compareDesc, format, parseISO } from 'date-fns'
// import { allDocuments, Post } from 'contentlayer/generated'

// function PostCard(post: Post) {
//   return (
//     <div>
//       <h2>
//         <Link href={post.url}>{post.title}</Link>
//       </h2>
//       <time dateTime={post.date}>
//         {format(parseISO(post.date), 'LLLL d, yyyy')}
//       </time>
//       <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
//     </div>
//   )
// }

// export default function Home() {
//   const posts = allDocuments.sort((a, b) =>
//     compareDesc(new Date(a.date), new Date(b.date)),
//   )

//   return (
//     <div>
//       <h1>Next.js + Contentlayer Example</h1>
//       {posts.map((post, idx) => (
//         <PostCard key={idx} {...post} />
//       ))}
//     </div>
//   )
// }
