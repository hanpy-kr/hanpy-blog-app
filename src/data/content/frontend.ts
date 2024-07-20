const subCategory: {
  [key: string]: {
    name: string
    href: string
    icon: string
  }
} = {
  react: {
    name: 'React',
    href: '/frontend/ko/react/react-data-crud',
    icon: '/react.svg',
  },
  nextjs: {
    name: 'Nextjs',
    href: '/frontend/ko/nextjs/seo/next-sitemap',
    icon: '/nextjs.svg',
  },
  utils: {
    name: 'Utils',
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
  react: {
    title: ['react'],
    subTitle: [
      [
        {
          href: '/frontend/ko/react/react-data-crud',
          title: 'React Data Management',
        },
      ],
    ],
  },
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
  mainCategory: 'Frontend',
  subCategory,
  subCategoryDetail,
}
