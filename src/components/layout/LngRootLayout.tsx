// /series/{lng}·/tags/{lng} 루트 레이아웃이 함께 쓰는 본체 (세션 7)
// 루트 레이아웃을 [lng] 세그먼트 아래에 두어 <html lang>이 주소 언어를 따르게 한다 (글 라우트와 같은 방식)
import SiteDocument from './SiteDocument'

export default async function LngRootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lng: string }> }) {
  const { lng } = await params
  return <SiteDocument lang={lng === 'en' ? 'en' : 'ko'}>{children}</SiteDocument>
}
