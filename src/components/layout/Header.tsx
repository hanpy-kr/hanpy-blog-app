// 머리글 (디자인 시안): 로고 · 카테고리 · 시리즈 · About · 검색 · KO/EN · 테마 · RSS
// 언어(lng)는 루트 레이아웃이 주소에서 정해 넘긴다. 영어 화면은 영어 글이 있는 카테고리만 보인다
import Link from 'next/link'
import { dict } from '@/i18n'
import { langPairs, seriesLngs, visibleCategories } from '@/lib/content'
import SearchDialog from '../search/SearchDialog'
import LangSwitch from './LangSwitch'
import SiteNav from './SiteNav'
import ThemeToggle from './ThemeToggle'
import styles from './Header.module.css'

export default function Header({ lng }: { lng: 'ko' | 'en' }) {
  const t = dict(lng)
  const links = [
    ...visibleCategories(lng).map((c) => ({ href: `/${c.id}/${lng}`, label: c.name, match: `/${c.id}/` })),
    ...(seriesLngs().includes(lng) ? [{ href: `/series/${lng}`, label: t.nav.series, match: '/series/' }] : []),
    { href: '/about', label: t.nav.about, match: '/about' },
  ]
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href={t.home} className={styles.logo}>
          Hanpy&apos;s Blog
        </Link>
        <SiteNav links={links} label={t.nav.label} openMenu={t.nav.openMenu} />
        <div className={styles.actions}>
          <SearchDialog lng={lng} />
          <LangSwitch lng={lng} pairs={langPairs()} />
          <ThemeToggle label={lng === 'en' ? 'Toggle light and dark mode' : '라이트·다크 모드 전환'} />
          <a href={t.rss} className={`${styles.iconButton} ${styles.rssIcon}`} aria-label={t.rssLabel}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
