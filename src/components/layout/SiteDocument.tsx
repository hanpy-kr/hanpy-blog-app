// 블로그 쪽 루트 레이아웃(홈·글·404)이 함께 쓰는 <html>·<body> 뼈대
// GA4는 빌드 환경변수 NEXT_PUBLIC_GA_ID가 있을 때만 넣는다 (로컬·미리보기에서 측정이 섞이지 않게, ID는 코드에 두지 않음)
import { GoogleAnalytics } from '@next/third-parties/google'
import { GA_ID } from '@/config/site'
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
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  )
}
