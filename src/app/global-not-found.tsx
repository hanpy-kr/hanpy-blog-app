// 루트 레이아웃이 여러 개라 어느 라우트에도 맞지 않는 주소는 여기서 404를 낸다
import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: '404 · hanpy blog',
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="ko">
      <body>
        <div className="shell">
          <h1>페이지를 찾을 수 없습니다</h1>
          <p><a href="/">홈으로</a></p>
        </div>
      </body>
    </html>
  )
}
