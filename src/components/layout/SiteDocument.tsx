// 블로그 쪽 루트 레이아웃(홈·글·404)이 함께 쓰는 <html>·<body> 뼈대
import { fontVariables } from '@/lib/fonts'
import AdSenseScript from './AdSenseScript'
import Footer from './Footer'
import Header from './Header'
import ThemeProvider from './ThemeProvider'

export default function SiteDocument({ lang, children }: { lang: 'ko' | 'en'; children: React.ReactNode }) {
  return (
    // next-themes가 hydration 전에 class="dark"를 붙이므로 경고를 끈다
    <html lang={lang} className={fontVariables} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AdSenseScript />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
