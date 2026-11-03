'use client'
// 다크 모드: <html class="dark">. 처음엔 시스템 설정을 따르고, 고른 값은 localStorage('theme')에 남는다
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  )
}
