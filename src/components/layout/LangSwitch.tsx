'use client'
// KO/EN 전환 (세션 7b, 계획 문서 '언어 전환 버튼'): 짝이 있는 화면은 그 화면으로, 없으면 해당 언어 홈(/ 또는 /en)으로
// 짝 목록은 머리글(서버)이 넘긴다: 번역 짝이 있는 글, 두 언어에 모두 있는 카테고리·서브카테고리 목록
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

const LANGS = [
  { id: 'ko', label: 'KO', name: '한국어', home: '/' },
  { id: 'en', label: 'EN', name: 'English', home: '/en' },
] as const

export default function LangSwitch({ lng, pairs }: { lng: 'ko' | 'en'; pairs: Record<string, Partial<Record<'ko' | 'en', string>>> }) {
  const raw = usePathname()
  const path = decodeURIComponent(raw)
  return (
    <nav aria-label={lng === 'en' ? 'Language' : '언어'} className={styles.lang}>
      {LANGS.map((l) => {
        const current = l.id === lng
        const href = current ? raw : (pairs[path]?.[l.id] ?? l.home)
        return (
          <Link
            key={l.id}
            href={href}
            hrefLang={l.id}
            lang={l.id}
            className={styles.langLink}
            aria-current={current ? 'true' : undefined}
            aria-label={l.name}
          >
            {l.label}
          </Link>
        )
      })}
    </nav>
  )
}
