'use client'
// 주 메뉴. 넓은 화면은 가로 메뉴, 폰은 ☰ 버튼(<details>)으로 펼친다
// 카테고리(→ /{category}/ko 목록) · 시리즈 · About (디자인 시안 머리글, 세션 7). 검색·언어 전환은 세션 7b
// 카테고리 목록은 머리글(서버)이 넘겨 준다: 공개 글이 있는 카테고리만, taxonomy 등록 순서
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import styles from './Header.module.css'

export default function SiteNav({ categories }: { categories: { id: string; name: string }[] }) {
  const pathname = usePathname()
  const menuRef = useRef<HTMLDetailsElement>(null)

  // 다른 화면으로 가면 폰 메뉴를 닫는다
  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false
  }, [pathname])

  const LINKS = [
    ...categories.map((c) => ({ href: `/${c.id}/ko`, label: c.name, match: `/${c.id}/` })),
    { href: '/series/ko', label: '시리즈', match: '/series/' },
    { href: '/about', label: 'About', match: '/about' },
  ]
  const links = LINKS.map((l) => (
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
