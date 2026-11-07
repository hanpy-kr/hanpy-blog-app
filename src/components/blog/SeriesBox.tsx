'use client'
// 글 머리 아래 시리즈 상자 (디자인 시안 'Post' 시리즈 상자, 'PostMobile' 접힌 상자)
// 넓은 화면은 펼친 채, 폰(1023px 이하)은 처음에 접어서 보여 준다
// 처음 모양은 CSS(data-mode="auto" + 미디어 쿼리)가 정한다. JS로 접으면 하이드레이션 뒤 아래 본문이 당겨져
// 화면 밀림(CLS 0.12)이 생겨서, 세션 8에서 바꿈. 처음 누를 때부터는 상태(open/closed)로 직접 제어
import Link from 'next/link'
import { useState } from 'react'
import styles from './SeriesBox.module.css'

type Mode = 'auto' | 'open' | 'closed'

export default function SeriesBox({
  name,
  href,
  posts,
  index,
}: {
  name: string
  /** 시리즈 목차 페이지 */
  href: string
  posts: { url: string; title: string }[]
  /** 지금 글의 위치 (0부터) */
  index: number
}) {
  const [mode, setMode] = useState<Mode>('auto')
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault()
    const collapsedNow = mode === 'closed' || (mode === 'auto' && window.matchMedia('(max-width: 1023px)').matches)
    setMode(collapsedNow ? 'open' : 'closed')
  }

  const n = index + 1
  return (
    <details open={mode !== 'closed'} data-mode={mode} className={styles.box}>
      <summary className={styles.summary} onClick={toggle}>
        <span className={styles.head}>
          <span className={styles.eyebrow}>시리즈</span>
          <span className={styles.name}>{name}</span>
          <span className={styles.count}>
            {n} / {posts.length}
          </span>
        </span>
        <span aria-hidden="true" className={styles.chevron} />
        <span aria-hidden="true" className={styles.progress}>
          <span style={{ width: `${(n / posts.length) * 100}%` }} />
        </span>
      </summary>
      <ol className={styles.list}>
        {posts.map((p, i) => (
          <li key={p.url} className={styles.item} aria-current={i === index ? 'page' : undefined}>
            <span className={styles.no}>{String(i + 1).padStart(2, '0')}</span>
            {i === index ? (
              <span className={styles.current}>
                {p.title}
                <span className={styles.here}>지금 읽는 글</span>
              </span>
            ) : (
              <Link href={p.url} className={styles.link}>
                {p.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <Link href={href} className={styles.all}>
        시리즈 목차 보기 →
      </Link>
    </details>
  )
}
