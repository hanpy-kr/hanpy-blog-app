import type { NextConfig } from 'next'
import { withContentCollections } from '@content-collections/next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 루트 레이아웃이 그룹마다 따로 있어서(블로그는 [category]/[lng] 아래) 전역 404는 global-not-found.tsx로 처리
  experimental: {
    globalNotFound: true,
  },
  // 기존 next.config.js의 i18n(Pages Router 전용) 설정은 App Router에서 의미가 없어 뺌
}

// withContentCollections는 가장 바깥에 둔다
export default withContentCollections(nextConfig)
