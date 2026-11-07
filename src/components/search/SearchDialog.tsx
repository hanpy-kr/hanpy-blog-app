'use client'
// 검색 (세션 7b): 머리글 버튼 · '/' 키 · 'hanpy:search' 이벤트(홈 검색 상자)로 연다
// 처음 열 때 MiniSearch와 /search-index/{lng}.json 을 받아 브라우저에서 찾는다. 서버 없이 동작
import type MiniSearchType from 'minisearch'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { dict } from '@/i18n'
import { formatDate } from '@/lib/format'
import { SEARCH_BOOST, SEARCH_FIELDS, SEARCH_STORE, type SearchDoc } from '@/lib/search'
import styles from './SearchDialog.module.css'

type Hit = Pick<SearchDoc, 'id' | 'title' | 'summary' | 'where' | 'date'>

export const OPEN_SEARCH_EVENT = 'hanpy:search'

const LIMIT = 20

export default function SearchDialog({ lng }: { lng: 'ko' | 'en' }) {
  const t = dict(lng).search
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const indexRef = useRef<Promise<MiniSearchType<SearchDoc>> | null>(null)
  const [query, setQuery] = useState('')
  const [hits, setHits] = useState<Hit[]>([])
  const [ready, setReady] = useState(false)

  const load = useCallback(() => {
    indexRef.current ??= Promise.all([
      import('minisearch'),
      fetch(`/search-index/${lng}.json`).then((r) => r.json() as Promise<SearchDoc[]>),
    ]).then(([{ default: MiniSearch }, docs]) => {
      const ms = new MiniSearch<SearchDoc>({ fields: [...SEARCH_FIELDS], storeFields: [...SEARCH_STORE] })
      ms.addAll(docs)
      setReady(true)
      return ms
    })
    return indexRef.current
  }, [lng])

  const open = useCallback(() => {
    const d = dialogRef.current
    if (!d || d.open) return
    d.showModal()
    inputRef.current?.focus()
    void load()
  }, [load])

  // '/' 키로 열기 (입력 중이 아닐 때), 홈 검색 상자 등에서 보내는 이벤트
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      const el = e.target as HTMLElement
      if (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return
      e.preventDefault()
      open()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_SEARCH_EVENT, open)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_SEARCH_EVENT, open)
    }
  }, [open])

  useEffect(() => {
    const q = query.trim()
    if ([...q].length < 2) {
      setHits([])
      return
    }
    let alive = true
    void load().then((ms) => {
      if (!alive) return
      const found = ms.search(q, {
        prefix: true,
        fuzzy: (term) => (/^[a-z0-9]{5,}$/i.test(term) ? 0.2 : false),
        combineWith: 'AND',
        boost: SEARCH_BOOST,
      })
      setHits(found.slice(0, LIMIT).map((r) => ({ id: r.id, title: r.title, summary: r.summary, where: r.where, date: r.date })))
    })
    return () => {
      alive = false
    }
  }, [query, load])

  const close = () => dialogRef.current?.close()

  // 위·아래 화살표로 입력칸과 결과 사이를 오간다
  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    const links = [...(listRef.current?.querySelectorAll('a') ?? [])]
    if (links.length === 0) return
    e.preventDefault()
    const i = links.indexOf(document.activeElement as HTMLAnchorElement)
    if (e.key === 'ArrowDown') links[Math.min(i + 1, links.length - 1)].focus()
    else if (i <= 0) inputRef.current?.focus()
    else links[i - 1].focus()
  }

  const q = query.trim()
  const status = !q || [...q].length < 2 ? t.hint : !ready ? t.loading : hits.length === 0 ? t.empty : t.results(hits.length)

  return (
    <>
      <button type="button" className={styles.trigger} onClick={open} aria-haspopup="dialog" aria-keyshortcuts="/">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <span className={styles.triggerLabel}>{t.button}</span>
        <kbd className={styles.kbd} aria-hidden="true">
          /
        </kbd>
      </button>

      <dialog ref={dialogRef} className={styles.dialog} aria-label={t.open} onClick={(e) => e.target === dialogRef.current && close()}>
        <div className={styles.panel} onKeyDown={onListKey}>
          <div className={styles.bar}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              className={styles.input}
              placeholder={t.placeholder}
              aria-label={t.open}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              enterKeyHint="search"
            />
            <button type="button" className={styles.close} onClick={close}>
              {t.close}
            </button>
          </div>
          <p className={styles.status} role="status">
            {status}
          </p>
          {hits.length > 0 && (
            <ul ref={listRef} className={styles.results}>
              {hits.map((h) => (
                <li key={h.id}>
                  <Link href={h.id} className={styles.hit} onClick={close}>
                    <span className={styles.hitMeta}>
                      {h.where} · {formatDate(h.date)}
                    </span>
                    <span className={styles.hitTitle}>{h.title}</span>
                    <span className={styles.hitSummary}>{h.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </dialog>
    </>
  )
}
