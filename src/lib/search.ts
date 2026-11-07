// 검색 인덱스 문서 (세션 7b, 계획 문서 '검색·RSS'): 제목·요약·태그·소제목(h2·h3)
// 빌드 때 /search-index/{lng}.json 으로 내보내고(src/app/search-index), 브라우저에서 MiniSearch로 찾는다
// 본문 전체 검색이 필요해지면 Pagefind로 바꾼다
export type SearchDoc = {
  /** 글 주소 (MiniSearch id) */
  id: string
  title: string
  summary: string
  /** 공백으로 이은 태그 */
  tags: string
  /** 공백으로 이은 소제목 */
  headings: string
  /** '카테고리 · 서브카테고리' */
  where: string
  /** YYYY-MM-DD */
  date: string
}

/** MiniSearch 옵션: 인덱스를 만드는 쪽(브라우저)과 문서 모양을 맞추는 한 곳 */
export const SEARCH_FIELDS = ['title', 'tags', 'headings', 'summary'] as const
export const SEARCH_STORE = ['title', 'summary', 'where', 'date'] as const
export const SEARCH_BOOST = { title: 4, tags: 3, headings: 2, summary: 1 }
