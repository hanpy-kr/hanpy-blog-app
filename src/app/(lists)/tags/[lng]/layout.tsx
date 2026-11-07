// /tags/{lng} 루트 레이아웃 (세션 7). <html lang> = 주소 언어
import type { Metadata } from 'next'
import LngRootLayout from '@/components/layout/LngRootLayout'
import { baseMetadata } from '@/config/site'
import '@/styles/globals.css'

export const dynamicParams = false

export const metadata: Metadata = baseMetadata

export default LngRootLayout
