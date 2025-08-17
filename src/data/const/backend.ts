import { BackendCategory } from '@/app/(categories)/types'

// Record<BackendCategory, { name: string; href: string; icon: string }>
const subCategory: Record<
  BackendCategory,
  {
    id: BackendCategory
    name: string
    href: string
    icon: string
    description: string
  }
> = {
  [BackendCategory.BASE]: {
    id: BackendCategory.BASE,
    name: 'Core Concepts',
    description:
      'This category covers foundational concepts, theories, and practices essential for backend development, such as architecture patterns, server concepts, authentication & authorization, API design, and general best practices.',
    href: '/backend/ko/base/architecture-basics-solid-01-srp',
    icon: 'https://resource.han-py.com/blog/logs/hash.svg',
  },
  database: {
    id: BackendCategory.DATABASE,
    name: 'Database',
    description:
      'Explore database technologies, data modeling, indexing strategies, query optimization, schema design, and both relational (SQL) and NoSQL databases. It includes practical insights into effective database management and best practices.',
    href: '/backend/ko/database/concurrency-optimistic-lock',
    icon: '/icons/database.svg',
  },
  nestjs: {
    id: BackendCategory.NESTJS,
    name: 'NestJS',
    description:
      'Focused on the NestJS framework, this category provides tutorials, guides, best practices, and advanced concepts for building scalable, maintainable, and testable Node.js backend applications with NestJS.',
    href: '/backend/ko/nestjs/nestjs-overview',
    icon: '/icons/nestjs.svg',
  },
  grpc: {
    id: BackendCategory.GRPC,
    name: 'gRPC',
    description:
      'A dedicated category covering gRPC concepts, implementation, best practices, performance optimization, real-world use cases, and integration within microservice architectures.',
    href: '/backend/ko/grpc/01-grpc-introduction',
    icon: '/icons/grpc.svg',
  },
  utils: {
    id: BackendCategory.UTILS,
    name: 'Utils',
    description:
      'Useful utilities, helper functions, libraries, tools, and patterns that help backend developers write cleaner, more efficient, maintainable, and reusable code.',
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
    subTitle: [
      [
        {
          href: '/backend/ko/base/architecture-basics-solid-01-srp',
          title: '[solid] Single Responsibility',
        },
        {
          href: '/backend/ko/base/architecture-basics-solid-02-ocp',
          title: '[solid] Open Closed',
        },
        {
          href: '/backend/ko/base/architecture-basics-solid-03-lsp',
          title: '[solid] Liskov Substitution',
        },
        {
          href: '/backend/ko/base/architecture-basics-solid-04-isp',
          title: '[solid] Interface Segregation',
        },
        {
          href: '/backend/ko/base/architecture-basics-solid-05-dip',
          title: '[solid] Dependency Inversion',
        },
        {
          href: '/backend/ko/base/message-queue',
          title: 'Message Queue',
        },
      ],
      [
        {
          href: '/backend/ko/base/api-management-api-rate-limiting',
          title: 'API Rate Limiting',
        },
        {
          href: '/backend/ko/base/performance-measurement-performance_k6',
          title: 'K6',
        },
      ],
      [],
    ],
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
          title: 'Aggregation Match',
        },
        {
          href: '/backend/ko/database/mongodb-aggregation-count',
          title: 'Aggregation Count',
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
        {
          href: '/backend/ko/database/redis-BullMQ-01-overview',
          title: 'BullMQ Overview',
        },
        {
          href: '/backend/ko/database/redis-BullMQ-02-queue',
          title: 'BullMQ Queue',
        },
        {
          href: '/backend/ko/database/redis-atomic-lock',
          title: 'Atomic Lock (SET NX)',
        },
      ],
      [
        {
          href: '/backend/ko/database/redis-troubleshooting-1',
          title: 'Redis Trouble-Shooting 1',
        },
        {
          href: '/backend/ko/database/mongodb-troubleshooting-1-nfc-nfd',
          title: 'MongoDB Trouble-Shooting 1',
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
      [
        {
          href: '/backend/ko/nestjs/nestjs-security-01-authentication',
          title: 'Authentication',
        },
        {
          href: '/backend/ko/nestjs/nestjs-config-service',
          title: 'VSCode Debugging',
        },
      ],
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
