const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  i18n: {
    locales: ['ko', 'en-US'],
    defaultLocale: 'en-US', // prefix 안붙음
    localeDetection: false, // accept-language 무시
  },
}

module.exports = withContentlayer(nextConfig)
