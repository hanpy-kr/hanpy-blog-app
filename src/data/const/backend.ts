const subCategory: {
  [key: string]: {
    name: string
    href: string
    icon: string
  }
} = {
  database: {
    name: 'database',
    href: '/backend/ko/database/concurrency-optimistic-lock',
    icon: '/icons/database.svg',
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
  database: {
    title: ['MongoDB', 'Database'],
    subTitle: [
      [
        {
          href: '/backend/ko/database/mongodb-modeling-pattern',
          title: 'Data Modeling',
        },
        {
          href: '/backend/ko/database/mongodb-b-tree',
          title: 'B-tree',
        },
        {
          href: '/backend/ko/database/mongodb-indexes',
          title: 'Indexes',
        },
        {
          href: '/backend/ko/database/mongodb-compound-indexes',
          title: 'Compound Indexes',
        },
        {
          href: '/backend/ko/database/mongodb-concurrency-control',
          title: 'Concurrency Control',
        },
        // {
        //   href: '/backend/ko/database/mongodb-concurrency-control-Lock-Granularity',
        //   title: 'Lock Granularity',
        // },
      ],
      [
        {
          href: '/backend/ko/database/concurrency-control',
          title: 'Concurrency Control',
        },
        {
          href: '/backend/ko/database/basebase-transaction',
          title: 'Transaction',
        },
        {
          href: '/backend/ko/database/concurrency-optimistic-lock',
          title: 'Optimistic Lock',
        },
        {
          href: '/backend/ko/database/concurrency-pessimistic-lock',
          title: 'Pessimistic Lock',
        },
      ],
    ],
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
