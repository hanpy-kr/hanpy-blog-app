// PoC용 콘텐츠 조회. 세션 5의 src/lib/content(getPost, getPosts, getAlternates ...)의 씨앗
import { allPosts } from 'content-collections'

export type Post = (typeof allPosts)[number]

export const releasedPosts = allPosts.filter((p) => p.released)

export function getPost(category: string, lng: string, segments: string[]): Post | undefined {
  const url = `/${category}/${lng}/${segments.map(decodeURIComponent).join('/')}`
  return releasedPosts.find((p) => p.url === url)
}

/** 같은 category·sub·slug를 가진 다른 언어 글 (계획: pageKey 대신 sub/slug 기준) */
export function getAlternates(post: Post): Record<string, string> {
  const key = post.segments.join('/')
  const out: Record<string, string> = {}
  for (const p of releasedPosts) {
    if (p.category === post.category && p.segments.join('/') === key) out[p.lng] = p.url
  }
  return Object.keys(out).length > 1 ? out : {}
}
