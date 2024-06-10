const subCategory: {
  [key: string]: {
    name: string
    href: string
    icon: string
  }
} = {
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
  utils: {
    title: ['library'],
    subTitle: [[
      {
        href: '/frontend/ko/utils/axios',
        title: 'Axios',
      }
    ]],
  },
}

export const CONTENT_FRONTEND = {
  mainCategory: 'Infra',
  subCategory,
  subCategoryDetail,
}
