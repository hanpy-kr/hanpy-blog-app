import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/components/provider/ToastProvider'
import { AuthContextProvider } from '@/context/AuthContext'
import { ThemeContextProvider } from '@/context/ThemeContext'
import {
  Roboto,
  //  Noto_Sans_KR
} from 'next/font/google' // Roboto와 한글 NotoSans를 사용합니다.
import { ChakraProviders } from '@/context/ChakraContext'
import RecoilRootWrapper from '@/recoil/wrapper/RecoilRootWrapper'

// const notoSansKr = Noto_Sans_KR({
//   // preload: true, 기본값
//   subsets: ['latin'], // 또는 preload: false
//   weight: ['100', '400', '700', '900'], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
// })
const roboto = Roboto({
  subsets: ['latin'], // preload
  weight: ['100', '400', '700'],
  variable: '--roboto',
})

export const metadata: Metadata = {
  title: 'Hanpy Blog',
  description: "Let's play coding",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ToastProvider />
        <ThemeContextProvider>
          <AuthContextProvider>
            <RecoilRootWrapper>
              <ChakraProviders>{children}</ChakraProviders>
            </RecoilRootWrapper>
          </AuthContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  )
}
