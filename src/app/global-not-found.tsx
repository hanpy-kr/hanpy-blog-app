// 루트 레이아웃이 여러 개(홈·블로그·서브 프로젝트)라 어느 라우트에도 맞지 않는 주소와 notFound()는 여기서 404를 낸다
import type { Metadata } from 'next'
import Link from 'next/link'
import SiteDocument from '@/components/layout/SiteDocument'
import '@/styles/globals.css'
import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: '404 · hanpy blog',
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <SiteDocument lang="ko">
      <main className={styles.main}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>페이지를 찾을 수 없습니다</h1>
        <p className={styles.text}>주소가 바뀌었거나 삭제된 글입니다. 주소를 확인하거나 홈에서 다시 찾아 주세요.</p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>
            홈으로
          </Link>
          <Link href="/posts" className={styles.secondary}>
            전체 글 보기
          </Link>
        </div>
      </main>
    </SiteDocument>
  )
}
