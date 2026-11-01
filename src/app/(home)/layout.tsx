import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://hanpy-blog.com'),
  title: 'Hanpy Blog (PoC)',
  robots: { index: false, follow: false },
}

export default function HomeRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="shell">{children}</div>
      </body>
    </html>
  )
}
