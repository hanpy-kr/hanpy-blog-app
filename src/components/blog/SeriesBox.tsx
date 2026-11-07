'use client'
// 글 머리 아래 시리즈 상자 (디자인 시안 'Post' 시리즈 상자, 'PostMobile' 접힌 상자)
// <details>라서 JS 없이도 펼치고 접힌다. 넓은 화면은 펼친 채, 폰(1023px 이하)은 처음에 접어서 보여 준다
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import styles from './SeriesBox.module.css'

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
  const ref = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    if (ref.current && window.matchMedia('(max-width: 1023px)').matches) ref.current.open = false
  }, [])

  const n = index + 1
  return (
    <details ref={ref} open className={styles.box}>
      <summary className={styles.summary}>
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
