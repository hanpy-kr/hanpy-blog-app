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
  nestjs: {
    name: 'NestJS',
    href: '/backend/ko/nestjs/nestjs-overview',
    icon: '/icons/nestjs.svg',
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
  base: {
    title: [''],
    subTitle: [[]],
  },
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
          href: '/backend/ko/database/mongodb-concurrency-control-1',
          title: 'Concurrency Control',
        },
        {
          href: '/backend/ko/database/mongodb-concurrency-control-2-Lock-Granularity',
          title: 'Lock Granularity',
        },
        {
          href: '/backend/ko/database/mongodb-concurrency-control-3-transaction',
          title: 'Transaction',
        },
        {
          href: '/backend/ko/database/mongodb-concurrency-control-4-sharding',
          title: 'Sharding',
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
          href: '/backend/ko/database/concurrency-shared-lock',
          title: 'Shared Lock',
        },
        {
          href: '/backend/ko/database/concurrency-exclusive-lock',
          title: 'Exclusive Lock',
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
  nestjs: {
    title: ['Beginner', 'Middle', 'Trouble-Shooting'],
    subTitle: [
      [
        {
          href: '/backend/ko/nestjs/nestjs-overview',
          title: 'Overview',
        },
        {
          href: '/backend/ko/nestjs/nestjs-quick-start',
          title: 'QuickStart',
        },
        {
          href: '/backend/ko/nestjs/nestjs-dynamic-modules',
          title: 'Dynamic Module',
        },
        {
          href: '/backend/ko/nestjs/nestjs-config-service',
          title: 'ConfigService',
        },
      ],
      [],
      [],
    ],
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
