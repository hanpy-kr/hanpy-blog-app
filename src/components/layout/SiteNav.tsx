'use client'
// 주 메뉴. 넓은 화면은 가로 메뉴, 폰은 ☰ 버튼(<details>)으로 펼친다
// 링크 목록은 머리글(서버)이 언어에 맞춰 넘긴다: 카테고리(→ /{category}/{lng}) · 시리즈 · About
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import styles from './Header.module.css'

export type NavLink = { href: string; label: string; match: string }

export default function SiteNav({ links: items, label, openMenu }: { links: NavLink[]; label: string; openMenu: string }) {
  const pathname = usePathname()
  const menuRef = useRef<HTMLDetailsElement>(null)

  // 다른 화면으로 가면 폰 메뉴를 닫는다
  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false
  }, [pathname])

  const links = items.map((l) => (
    <Link
      key={l.href}
      href={l.href}
      className={styles.navLink}
      aria-current={(pathname + '/').startsWith(l.match) ? 'page' : undefined}
    >
      {l.label}
    </Link>
  ))

  return (
    <>
      <nav aria-label={label} className={styles.nav}>
        {links}
      </nav>
      <details ref={menuRef} className={styles.menu}>
        <summary className={styles.iconButton} aria-label={openMenu}>
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </summary>
        <nav aria-label={label} className={styles.menuPanel}>
          {links}
        </nav>
      </details>
    </>
  )
}
