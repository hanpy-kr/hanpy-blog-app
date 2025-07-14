import type { Metadata } from 'next'
import Script from 'next/script'
// import { Inter } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/components/provider/ToastProvider'
// import { AuthContextProvider } from '@/context/AuthContext'
import { ThemeContextProvider } from '@/context/ThemeContext'
import {
  Roboto,
  //  Noto_Sans_KR
} from 'next/font/google' // Roboto와 한글 NotoSans를 사용합니다.
import { ChakraProviders } from '@/context/ChakraContext'
import RecoilRootWrapper from '@/recoil/wrapper/RecoilRootWrapper'
import ClientInitSetup from '@/components/provider/ClientInitSetup'

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
  description:
    "Welcome to my web development blog! Dive into expert tips on frontend frameworks, backend technologies, and cutting-edge infrastructure. Whether you're a seasoned developer or a newbie, explore tutorials and insights to enhance your coding skills and optimize your projects. Stay updated with the latest trends in web development, DevOps, and more. Join our community of developers to learn, grow, and innovate together.",
  metadataBase: new URL('https://hanpy-blog.com'),
  openGraph: {
    title: 'Hanpy Blog',
    description: 'Welcome to my web development blog',
    url: 'https://hanpy-blog.com',
    siteName: 'Hanpy Blog',
    images: [
      {
        url: 'https://hanpy-blog.com/meta/image.jpeg', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://hanpy-blog.com/meta/image.jpeg', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'Hanpy Logo',
      },
    ],
    type: 'article',
  },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8185415229814052"
        crossOrigin="anonymous"
      />

      {/* Naver Search Advisor */}
      <meta name="naver-site-verification" content="9cd2d8ecd2c271066df07e901055b7f7736a7061" />

      {/* <body> */}
      <body className={roboto.className}>
        <ToastProvider />
        <ThemeContextProvider>
          {/* <AuthContextProvider> */}
          <RecoilRootWrapper>
            <ClientInitSetup />
            <ChakraProviders>{children}</ChakraProviders>
          </RecoilRootWrapper>
          {/* </AuthContextProvider> */}
        </ThemeContextProvider>
      </body>
    </html>
  )
}
