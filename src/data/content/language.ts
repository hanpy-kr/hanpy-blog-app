const subCategory: {
  [key: string]: {
    name: string
    href: string
    icon: string
  }
} = {
  nodejs: {
    name: 'Nodejs',
    href: '/language/ko/nodejs/introduction',
    icon: 'https://resource.han-py.com/blog/logs/nodejs_logo.svg',
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
  nodejs: {
    title: ['Beginner'],
    subTitle: [
      [
        {
          href: '/language/ko/nodejs/introduction',
          title: 'Introduction',
        },
      ],
    ],
  },
}

// Nav 목차
export const CONTENT_LANGUAGE = {
  mainCategory: 'Language',
  subCategory,
  subCategoryDetail,
}
