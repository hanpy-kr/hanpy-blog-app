const subCategory: {
  [key: string]: {
    name: string
    href: string
    icon: string
  }
} = {
  react: { name: 'docker', href: '/', icon: '/icons/docker.svg' },
  kubernetes: {
    name: 'kubernetes',
    href: '/infra/ko/kubernetes/01.Introduction',
    icon: '/icons/kubernetes.svg',
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
  docker: {
    title: [],
    subTitle: [],
  },
}

export const CONTENT_BACKEND = {
  mainCategory: 'Infra',
  subCategory,
  subCategoryDetail,
}
