export enum FrontendCategory {
  WEB = 'web',
  REACT = 'react',
  NEXTJS = 'nextjs',
  UTILS = 'utils',
}

const subCategory: Record<
  FrontendCategory,
  {
    id: FrontendCategory
    name: string
    href: string
    icon: string
    description: string
  }
> = {
  [FrontendCategory.WEB]: {
    id: FrontendCategory.WEB,
    name: 'Web',
    href: '/frontend/ko/web/worker',
    icon: '/icons/web.svg',
    description: '',
  },
  [FrontendCategory.REACT]: {
    id: FrontendCategory.REACT,
    name: 'React',
    href: '/frontend/ko/react/react-data-crud',
    icon: '/icons/react.svg',
    description: '',
  },
  [FrontendCategory.NEXTJS]: {
    id: FrontendCategory.NEXTJS,
    name: 'Nextjs',
    href: '/frontend/ko/nextjs/seo/next-sitemap',
    icon: '/icons/nextjs.svg',
    description: '',
  },
  [FrontendCategory.UTILS]: {
    id: FrontendCategory.UTILS,
    name: 'Utils',
    href: '/frontend/ko/utils/Monorepo',
    icon: '/icons/utils.svg',
    description: '',
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
          href: '/frontend/ko/react/env-setup',
          title: 'Environment Variables Settings',
        },
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
  web: {
    title: ['Core'],
    subTitle: [
      [
        {
          href: '/frontend/ko/web/web-browser-definition-and-features',
          title: 'Browser',
        },
        {
          href: '/frontend/ko/web/web-browser-network',
          title: 'Network',
        },
        {
          href: '/frontend/ko/web/worker',
          title: 'Worker API',
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
