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
    icon: '/icons/react.svg',
  },
  nextjs: {
    name: 'Nextjs',
    href: '/frontend/ko/nextjs/seo/next-sitemap',
    icon: '/icons/nextjs.svg',
  },
  utils: {
    name: 'Utils',
    href: '/frontend/ko/utils/Monorepo',
    icon: '/icons/utils.svg',
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
    title: ['Administration', 'library'],
    subTitle: [
      [
        {
          href: '/frontend/ko/utils/Monorepo',
          title: 'Monorepo',
        },
        {
          href: '/frontend/ko/utils/monorepo-pm',
          title: 'Package Manager',
        },
      ],
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
