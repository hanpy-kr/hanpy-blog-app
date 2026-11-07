'use client'
// 광고 자리 (세션 7b, 계획 문서 '광고 수익'): <AdSlot placement="in-article" | "sidebar" />
// - 높이를 미리 잡아 광고가 늦게 떠도 본문이 밀리지 않게 한다(CLS 방지). 광고 단위는 data-ad-format 없이 CSS 크기로 고정
// - 화면 근처(400px)에 오면 그때 광고를 요청한다(지연 로드)
// - 광고 단위 ID(src/config/site.ts AD_SLOTS)가 없으면 아무것도 그리지 않는다. NEXT_PUBLIC_AD_PREVIEW=1 이면 빈 자리만 보여 준다
// - 글 frontmatter ads: false 는 글 페이지가 처리한다 (본문 중간은 빌드 때 안 넣고, 사이드바는 그리지 않음)
import { useEffect, useRef, useState } from 'react'
import { ADSENSE_CLIENT, AD_SLOTS } from '@/config/site'
import styles from './AdSlot.module.css'

export type AdPlacement = 'in-article' | 'sidebar'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

const PREVIEW = process.env.NEXT_PUBLIC_AD_PREVIEW === '1'

export default function AdSlot({ placement }: { placement: AdPlacement }) {
  const slot = AD_SLOTS[placement]
  const ref = useRef<HTMLDivElement>(null)
  const pushed = useRef(false)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !slot) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [slot])

  useEffect(() => {
    if (!near || pushed.current) return
    pushed.current = true
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // 광고 차단 등: 자리는 비워 둔다
    }
  }, [near])

  if (!slot && !PREVIEW) return null

  return (
    <div ref={ref} className={styles.slot} data-placement={placement} aria-label="광고">
      <span className={styles.label}>광고</span>
      <div className={styles.box}>
        {slot && near ? (
          <ins className={`adsbygoogle ${styles.ins}`} data-ad-client={ADSENSE_CLIENT} data-ad-slot={slot} />
        ) : (
          PREVIEW && <span className={styles.preview}>AdSlot · {placement}</span>
        )}
      </div>
    </div>
  )
}
