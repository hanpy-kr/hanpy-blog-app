'use client'
// 이 글의 목차. 넓은 화면은 오른쪽에 고정, 폰은 본문 위에서 펼쳐 본다. 지금 읽는 제목을 강조한다
import { useEffect, useState } from 'react'
import styles from './Toc.module.css'

export type TocItem = { depth: 2 | 3; text: string; id: string }

function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => e !== null)
    if (els.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px' },
    )
    els.forEach((e) => observer.observe(e))
    return () => observer.disconnect()
  }, [ids])
  return active
}

function TocLinks({ items, active }: { items: TocItem[]; active: string | null }) {
  return (
    <ol className={styles.list}>
      {items.map((item) => (
        <li key={item.id} data-depth={item.depth}>
          <a href={`#${item.id}`} className={styles.link} aria-current={active === item.id ? 'location' : undefined}>
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  )
}

export function TocRail({ items }: { items: TocItem[] }) {
  const active = useActiveHeading(items.map((i) => i.id))
  return (
    <nav aria-labelledby="toc-heading" className={styles.rail}>
      <h2 id="toc-heading" className={styles.heading}>
        이 글의 목차
      </h2>
      <TocLinks items={items} active={active} />
    </nav>
  )
}

export function TocDisclosure({ items }: { items: TocItem[] }) {
  return (
    <details className={styles.disclosure}>
      <summary className={styles.summary}>
        이 글의 목차
        <span className={styles.count}>{items.length}개</span>
      </summary>
      <nav aria-label="이 글의 목차" className={styles.panel}>
        <TocLinks items={items} active={null} />
      </nav>
    </details>
  )
}
