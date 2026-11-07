// 머리글·바닥글·검색 등 화면 문구 사전 (세션 7b, 계획 문서 '영어 글 확대 > UI 문구')
// 글·카테고리 이름은 여기 두지 않는다 (글은 frontmatter, 카테고리는 taxonomy)

const ko = {
  home: '/',
  nav: { label: '주 메뉴', series: '시리즈', about: 'About', openMenu: '메뉴 열기' },
  search: {
    button: '검색',
    open: '블로그 검색',
    placeholder: '제목·요약·태그·소제목으로 찾기',
    close: '닫기',
    loading: '검색 준비 중…',
    empty: '맞는 글이 없습니다.',
    hint: '두 글자 이상 입력하세요.',
    results: (n: number) => `글 ${n}개`,
    shortcut: '/ 키로 열기',
  },
  lang: { label: '언어', ko: '한국어', en: 'English' },
  footer: { label: '바닥글', about: 'About', rss: 'RSS', sitemap: 'Sitemap' },
  rss: '/rss.xml',
  theme: { toDark: '다크 모드로 전환', toLight: '라이트 모드로 전환' },
  rssLabel: 'RSS 피드',
}

export type Dict = typeof ko

const en: Dict = {
  home: '/en',
  nav: { label: 'Main menu', series: 'Series', about: 'About', openMenu: 'Open menu' },
  search: {
    button: 'Search',
    open: 'Search the blog',
    placeholder: 'Search titles, summaries, tags and headings',
    close: 'Close',
    loading: 'Loading search…',
    empty: 'No matching posts.',
    hint: 'Type at least two characters.',
    results: (n: number) => `${n} post${n === 1 ? '' : 's'}`,
    shortcut: 'Press / to open',
  },
  lang: { label: 'Language', ko: '한국어', en: 'English' },
  footer: { label: 'Footer', about: 'About', rss: 'RSS', sitemap: 'Sitemap' },
  rss: '/en/rss.xml',
  theme: { toDark: 'Switch to dark mode', toLight: 'Switch to light mode' },
  rssLabel: 'RSS feed',
}

export const DICTS = { ko, en } as const

export const dict = (lng: string): Dict => (lng === 'en' ? en : ko)
