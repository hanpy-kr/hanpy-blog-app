// 글꼴 (디자인 시안): 본문 IBM Plex Sans KR, 코드·숫자 JetBrains Mono. next/font가 빌드 때 받아 자체 호스팅한다
import { IBM_Plex_Sans_KR, JetBrains_Mono } from 'next/font/google'

export const plex = IBM_Plex_Sans_KR({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'], // 미리 불러오는(preload) 범위. 한글 글리프는 unicode-range로 필요한 조각만 받는다
  display: 'swap',
  variable: '--font-plex',
})

export const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jb',
})

export const fontVariables = `${plex.variable} ${jetbrainsMono.variable}`
