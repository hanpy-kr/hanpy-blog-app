const subCategory: {
  [key: string]: {
    name: string
    href: string
    icon: string
  }
} = {
  nodejs: {
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
  nodejs: {
    title: [],
    subTitle: [],
  },
}

// Nav 목차
export const CONTENT_LANGUAGE = {
  mainCategory: 'Language',
  subCategory,
  subCategoryDetail,
}
