const subCategory: {
  [key: string]: {
    name: string
    href: string
    icon: string
  }
} = {
  base: {
    name: 'base',
    href: '/',
    icon: '/icons/document.svg',
  },
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
  grpc: {
    name: 'gRPC',
    href: '/backend/ko/grpc/01-grpc-introduction',
    icon: '/icons/grpc.svg',
  },
  utils: {
    name: 'Utils',
    href: '/',
    icon: '/icons/utils.svg',
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
    title: ['Beginner', 'Middle', 'Trouble-Shooting'],
    subTitle: [[], [
      {
        href: '/backend/ko/base/performance_k6',
        title: 'K6',
      },
    ], []],
  },
  grpc: {
    title: ['Beginner', 'Middle', 'Trouble-Shooting'],
    subTitle: [
      [
        {
          href: '/backend/ko/grpc/01-grpc-introduction',
          title: 'Overview',
        },
        {
          href: '/backend/ko/grpc/02-grpc-architecture',
          title: 'Architecture',
        },
        {
          href: '/backend/ko/grpc/03-grpc-service-definition',
          title: 'Definition',
        },
        {
          href: '/backend/ko/grpc/04-grpc-communication-types',
          title: 'Communication Type',
        },
      ],
      [
        {
          href: '/backend/ko/grpc/05-grpc-performance-and-security',
          title: 'Performance',
        },
        {
          href: '/backend/ko/grpc/06-grpc-and-microservices',
          title: 'Microservices',
        },
        {
          href: '/backend/ko/grpc/07-grpc-scaling-and-architecture',
          title: 'Kubernetes',
        },
        {
          href: '/backend/ko/grpc/08-grpc-vs-other-protocols',
          title: 'vs. Other Protocols',
        },
        {
          href: '/backend/ko/grpc/09-grpc-real-world-use-cases',
          title: 'usecase',
        },
      ],
      [],
    ],
  },
  database: {
    title: ['MongoDB', 'Database', 'Redis', 'Trouble-Shooting'],
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
        {
          href: '/backend/ko/database/mongodb-aggregation-match',
          title: 'Aggregation Match Query',
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
      [
        {
          href: '/backend/ko/database/redis-cli',
          title: 'Redis CLI',
        },
      ],
      [
        {
          href: '/backend/ko/database/redis-troubleshooting-1',
          title: 'Redis Trouble-Shooting 1',
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
  utils: {
    title: ['Beginner', 'Middle', 'Trouble-Shooting'],
    subTitle: [[], [], []],
  },
}

export const CONTENT_BACKEND = {
  mainCategory: 'Backend',
  subCategory,
  subCategoryDetail,
}
