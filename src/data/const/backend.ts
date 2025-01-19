const subCategory: {
  [key: string]: {
    name: string
    href: string
    icon: string
  }
} = {
  database: { name: 'database', href: '/backend/ko/database/concurrency-optimistic-lock', icon: '/icons/database.svg' },
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
  database: {
    title: ['MongoDB','Database'],
    subTitle: [
    [      
      {
        href: '/backend/ko/database/mongodb-modeling-pattern',
        title: 'Data Modeling',
      },
      {
        href: '/backend/ko/database/mongodb-indexes',
        title: 'Indexes',
      },
      {
        href: '/backend/ko/database/mongodb-compound-indexes',
        title: 'Compound Indexes',
      },
    ],
    [        
      {
        href: '/backend/ko/database/concurrency-optimistic-lock',
        title: 'Optimistic Lock',
      },
      {
        href: '/backend/ko/database/concurrency-pessimistic-lock',
        title: 'Pessimistic Lock',
      },
    ]],
  },
  base: {
    title: [''],
    subTitle: [[]],
  },
  docker: {
    title: [],
    subTitle: [[]],
  },
}

export const CONTENT_BACKEND = {
  mainCategory: 'Backend',
  subCategory,
  subCategoryDetail,
}
