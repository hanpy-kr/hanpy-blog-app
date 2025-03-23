export enum DesignCategory {
  PATTERN = 'pattern',
}

const subCategory: Record<
  DesignCategory,
  { name: string; href: string; icon: string; description: string }
> = {
  [DesignCategory.PATTERN]: {
    name: 'Design Pattern',
    description:
      'This category explores common software design patterns, including creational, structural, and behavioral patterns. Learn about patterns such as Singleton, Factory, Observer, and more, along with practical examples, implementation strategies, and best practices to write robust, maintainable, and reusable code.',
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
