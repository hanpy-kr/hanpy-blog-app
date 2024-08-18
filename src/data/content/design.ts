const subCategory: {
  [key: string]: {
    name: string
    href: string
    icon: string
  }
} = {
  pattern: {
    name: 'Design Pattern',
    href: '/design/ko/pattern/01.Introduction',
    icon: '',
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
  pattern: {
    title: ['Beginner', 'Middle', 'Trouble-Shooting'],
    subTitle: [
      [
        {
          href: '/design/ko/pattern/01.Introduction',
          title: 'Introduction',
        },
        {
          href: '/design/ko/pattern/polymorphism',
          title: 'polymorphism',
        },
      ],
      [
        {
          href: '/design/ko/pattern/builder-pattern',
          title: 'Builder Pattern',
        },
        {
          href: '/design/ko/pattern/observer-pattern',
          title: 'Observer Pattern',
        },
        {
          href: '/design/ko/pattern/strategy-pattern',
          title: 'Strategy Pattern',
        },
      ],
      [
        // {
        //   href: '/infra/ko/kubernetes/01.Introduction',
        //   title: 'Introduction',
        // },
        // {
        //   href: '/infra/ko/kubernetes/01.Introduction',
        //   title: 'Introduction',
        // },
      ],
    ],
  },
}

// Nav 목차
export const CONTENT_DESIGN = {
  mainCategory: 'Design',
  subCategory,
  subCategoryDetail,
}
