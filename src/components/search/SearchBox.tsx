'use client'
// 홈 첫 화면 검색 상자 (디자인 시안 'Main'): 누르면 머리글 검색 창을 연다
import { OPEN_SEARCH_EVENT } from './SearchDialog'
import styles from './SearchBox.module.css'

export default function SearchBox({ label }: { label: string }) {
  return (
    <button type="button" className={styles.box} onClick={() => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT))} aria-haspopup="dialog">
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <span className={styles.text}>{label}</span>
      <kbd className={styles.kbd} aria-hidden="true">
        /
      </kbd>
    </button>
  )
}
