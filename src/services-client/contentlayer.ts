import { CategoryType } from '@/app/(home)/types'
import {
  allFrontendForKORs,
  allFrontendForENGs,
  allBackends,
  allInfraForKORs,
  allInfraForENGs,
  allDesignForKORs,
  allDesignForENGs,
  allLanguageForKORs,
  allLanguageForENGs,
} from 'contentlayer/generated'

/**
 * blog
 */
class ContentlayerService {
  query({
    category,
    type,
    currentLng,
    orderBy,
  }: {
    category: CategoryType
    type: 'meta' | 'content'
    currentLng: string
    orderBy: 'publishedAt'
  }) {
    // en-US
    if (currentLng?.includes('en')) {
      switch (category) {
        case 'Frontend':
          return [...allFrontendForENGs].sort((a, b) => {
            if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
            return 1
          })
        case 'Backend':
          return [...allBackends].sort((a, b) => {
            if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
            return 1
          })
        case 'Infra':
          return [...allInfraForENGs].sort((a, b) => {
            if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
            return 1
          })
        case 'Design':
          return [...allDesignForENGs].sort((a, b) => {
            if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
            return 1
          })
        case 'Language':
          return [...allLanguageForENGs].sort((a, b) => {
            if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
            return 1
          })
        case 'All':
        default:
          return [
            ...allDesignForENGs,
            ...allFrontendForENGs,
            ...allBackends,
            ...allInfraForENGs,
            ...allLanguageForENGs,
          ].sort((a, b) => {
            if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
            return 1
          })
      }
    } else {
      // (currentLng.includes('ko'))
      switch (category) {
        case 'Frontend':
          return [...allFrontendForKORs].sort((a, b) => {
            if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
            return 1
          })
        case 'Backend':
          return [...allBackends].sort((a, b) => {
            if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
            return 1
          })
        case 'Infra':
          return [...allInfraForKORs].sort((a, b) => {
            if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
            return 1
          })
        case 'Design':
          return [...allDesignForKORs].sort((a, b) => {
            if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
            return 1
          })
        case 'Language':
          return [...allLanguageForKORs].sort((a, b) => {
            if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
            return 1
          })
        case 'All':
        default:
          return [
            ...allDesignForKORs,
            ...allFrontendForKORs,
            ...allBackends,
            ...allInfraForKORs,
            ...allLanguageForKORs,
          ].sort((a, b) => {
            if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
            return 1
          })
      }
    }
  }
}

export default new ContentlayerService()

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
