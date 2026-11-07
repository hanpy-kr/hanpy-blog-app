// 서브프로젝트(앱) 등록부 (세션 7b, 계획 문서 '확장 포인트 > 서브프로젝트')
// 홈 'Projects'·/about·sitemap이 이 목록을 읽는다. 앱 코드는 src/app/(sub-project)/<slug>/ 에 있고 블로그 머리글 없이 자기 레이아웃을 쓴다
//
// 새 앱: 라우트를 만든 뒤 여기에 한 줄. showOnHome·sitemap을 켜야 홈과 사이트맵에 나온다

export type AppDef = {
  slug: string
  /** 카드 제목 */
  name: string
  /** 카드 한 줄 설명 */
  description: string
  /** 앱 첫 화면 */
  href: string
  /** PWA manifest (public/manifests/) */
  manifest?: string
  /** 앱 화면 언어 */
  lang: 'ko' | 'en'
  /** 홈 Projects·/about에 보일지 */
  showOnHome: boolean
  /** sitemap.xml에 넣을지. lastModified는 앱을 크게 바꿨을 때 고친다 */
  sitemap?: { lastModified: string; priority?: number }
}

export const APPS: readonly AppDef[] = [
  {
    slug: 'spin',
    name: 'Lucky Wheel',
    description: 'Free online spinning wheel for games, prizes, and decision making',
    href: '/spin',
    manifest: '/manifests/spin.json',
    lang: 'en',
    showOnHome: true,
    sitemap: { lastModified: '2025-08-10', priority: 1 },
  },
  {
    // 홈·사이트맵 비노출 유지 (2026-11-07 사용자 결정)
    slug: 'edu',
    name: 'Hanpy Education Center',
    description: 'Interactive learning platform for business English and educational content',
    href: '/edu',
    manifest: '/manifests/edu.json',
    lang: 'en',
    showOnHome: false,
  },
]

export const homeApps = () => APPS.filter((a) => a.showOnHome)
