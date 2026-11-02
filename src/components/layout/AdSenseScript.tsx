import Script from 'next/script'
import { ADSENSE_CLIENT } from '@/lib/site'

/** AdSense 계정 연결용 스크립트. 광고 자리(AdSlot)는 세션 7 */
export default function AdSenseScript() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}
