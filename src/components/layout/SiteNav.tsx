'use client'
// 주 메뉴. 넓은 화면은 가로 메뉴, 폰은 ☰ 버튼(<details>)으로 펼친다
// 시리즈·About·검색·언어 전환은 해당 화면이 생기는 세션 7에서 추가
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { CATEGORIES, CATEGORY_LABEL } from '@/lib/categories'
import styles from './Header.module.css'

const LINKS = [
  ...CATEGORIES.map((c) => ({ href: `/posts?category=${c}`, label: CATEGORY_LABEL[c], match: `/${c}/` })),
  { href: '/posts', label: '전체 글', match: '/posts' },
]

export default function SiteNav() {
  const pathname = usePathname()
  const menuRef = useRef<HTMLDetailsElement>(null)

  // 다른 화면으로 가면 폰 메뉴를 닫는다
  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false
  }, [pathname])

  const links = LINKS.map((l) => (
    <Link
      key={l.href}
      href={l.href}
      className={styles.navLink}
      aria-current={pathname.startsWith(l.match) ? 'page' : undefined}
    >
      {l.label}
    </Link>
  ))

  return (
    <>
      <nav aria-label="주 메뉴" className={styles.nav}>
        {links}
      </nav>
      <details ref={menuRef} className={styles.menu}>
        <summary className={styles.iconButton} aria-label="메뉴 열기">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </summary>
        <nav aria-label="주 메뉴" className={styles.menuPanel}>
          {links}
        </nav>
      </details>
    </>
  )
}
