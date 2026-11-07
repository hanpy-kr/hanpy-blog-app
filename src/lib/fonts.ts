// 글꼴 (디자인 시안): 본문 IBM Plex Sans KR, 코드·숫자 JetBrains Mono. next/font가 빌드 때 받아 자체 호스팅한다
import { IBM_Plex_Sans_KR, JetBrains_Mono } from 'next/font/google'

export const plex = IBM_Plex_Sans_KR({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'], // 미리 불러오는(preload) 범위. 한글 글리프는 unicode-range로 필요한 조각만 받는다
  // optional: 처음 ~100ms 안에 오면 쓰고, 늦으면 그 화면은 시스템 한글 글꼴로 끝까지 그린다(다음 화면부터 캐시된 글꼴).
  // swap이면 한글 조각(미리 불러올 수 없음)이 늦게 와서 줄바꿈이 바뀌며 화면이 밀렸다 — CI에서 폰 CLS 0.124 (세션 8)
  display: 'optional',
  variable: '--font-plex',
})

export const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jb',
})

export const fontVariables = `${plex.variable} ${jetbrainsMono.variable}`
