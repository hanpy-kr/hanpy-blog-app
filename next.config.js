const { withContentlayer } = require('next-contentlayer')

// Upgrade path: 라우트·메타 통합 안정화 후 Next.js 14/15 일괄 업그레이드 권장.
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['ko', 'en-US'],
    defaultLocale: 'en-US', // prefix 안붙음
    localeDetection: false, // accept-language 무시
  },
}

module.exports = withContentlayer(nextConfig)
