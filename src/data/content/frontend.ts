const subCategory: {
  [key: string]: {
    name: string
    href: string
    icon: string
  }
} = {
  nextjs: {
    name: 'nextjs',
    href: '/frontend/ko/nextjs/seo/next-sitemap',
    icon: '/nextjs.svg',
  },
  utils: {
    name: 'utils',
    href: '/frontend/ko/utils/axios',
    icon: '/utils.svg',
  },
}

const subCategoryDetail: {
  [key: string]: {
    title: string[]
    subTitle: {
      href: string
      title: string
    }[][]
  }
} = {
  nextjs: {
    title: ['nextjs'],
    subTitle: [
      [
        {
          href: '/frontend/ko/nextjs/seo/next-sitemap',
          title: 'sitemap',
        },
      ],
    ],
  },
  utils: {
    title: ['library'],
    subTitle: [
      [
        {
          href: '/frontend/ko/utils/axios',
          title: 'Axios',
        },
      ],
    ],
  },
}

export const CONTENT_FRONTEND = {
  mainCategory: 'Infra',
  subCategory,
  subCategoryDetail,
}
