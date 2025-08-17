import { DesignCategory } from '@/app/(categories)/types'

const subCategory: Record<
  DesignCategory,
  {
    id: DesignCategory
    name: string
    href: string
    icon: string
    description: string
  }
> = {
  [DesignCategory.PATTERN]: {
    id: DesignCategory.PATTERN,
    name: 'Design Pattern',
    description:
      'This category explores common software design patterns, including creational, structural, and behavioral patterns. Learn about patterns such as Singleton, Factory, Observer, and more, along with practical examples, implementation strategies, and best practices to write robust, maintainable, and reusable code.',
    href: '/design/ko/pattern/01.Introduction',
    icon: '',
  },
  [DesignCategory.SOFTWARE_DESIGN]: {
    id: DesignCategory.SOFTWARE_DESIGN,
    name: 'Software Design',
    description:
      'This category delves into the principles and methodologies behind structuring software systems. Explore topics such as modularity, separation of concerns, SOLID principles, and architectural patterns like MVC and layered architecture. Gain insight into how thoughtful design choices contribute to scalability, maintainability, and long-term success in software projects.',
    href: '/design/ko/software-design/req-1-base',
    icon: '',
  },
  [DesignCategory.SOFTWARE_DEV]: {
    id: DesignCategory.SOFTWARE_DEV,
    name: 'Software Development',
    description:
      'This category covers the end-to-end process of building software—from requirements gathering and planning to coding, testing, and deployment. Learn about development methodologies like Agile and DevOps, tools for version control and CI/CD, as well as strategies for team collaboration, code quality, and iterative improvement. Build reliable and efficient software through well-managed development workflows.',
    href: '/design/ko/software-design/req-1-base',
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
  [DesignCategory.SOFTWARE_DESIGN]: {
    title: ['Beginner', 'Architecture Pattern', 'Trouble-Shooting'],
    subTitle: [[
      {
        href: '/design/ko/software-design/req-1-base',
        title: 'Requirement',
      },
      {
        href: '/design/ko/software-design/req-2-agile',
        title: 'Agile',
      },
      {
        href: '/design/ko/software-design/req-3-xp',
        title: 'XP(Extreme Programming)',
      },
      {
        href: '/design/ko/software-design/req-4-ui',
        title: 'UI',
      },
      {
        href: '/design/ko/software-design/req-5-computer-aided-software-engineering',
        title: 'CASE',
      },
      {
        href: '/design/ko/software-design/req-7-data-flow-diagram',
        title: 'DFD',
      },
      {
        href: '/design/ko/software-design/req-8-software-lifecycle',
        title: 'Software Lifecycle',
      },
      {
        href: '/design/ko/software-design/req-9-software-diagram',
        title: 'Software Diagram',
      },
      {
        href: '/design/ko/software-design/req-10-topdown-bottomup-design',
        title: 'Topdown/Bottomup Design',
      },
      {
        href: '/design/ko/software-design/100-oop',
        title: 'OOP',
      },
      {
        href: '/design/ko/software-design/101-rumbaugh',
        title: 'Rumbaugh',
      },
     
    ], [
      {
        href: '/design/ko/software-design/architecture-basics-00-introduction',
        title: 'Introduction',
      },
      {
        href: '/design/ko/software-design/architecture-basics-01-layered-architecture',
        title: 'Layered',
      },
      {
        href: '/design/ko/software-design/architecture-basics-02-client-server-pattern',
        title: 'Client-Server',
      },
      {
        href: '/design/ko/software-design/architecture-basics-03-pipe-filter-pattern',
        title: 'Pipe-Filter',
      },
      {
        href: '/design/ko/software-design/architecture-basics-04-model-view-controller-pattern',
        title: 'MVC',
      },
      {
        href: '/design/ko/software-design/architecture-basics-05-model-view-viewmodel-pattern',
        title: 'MVVM',
      },
      {
        href: '/design/ko/software-design/architecture-basics-06-model-view-presenter-pattern',
        title: 'MVP',
      },
      {
        href: '/design/ko/software-design/architecture-basics-07-peer-to-peer-pattern',
        title: 'Peer-to-Peer',
      },
      {
        href: '/design/ko/software-design/architecture-basics-08-event-bus-pattern',
        title: 'Event-Bus',
      },
      {
        href: '/design/ko/software-design/architecture-basics-09-blackboard-pattern',
        title: 'Blackboard',
      },
      {
        href: '/design/ko/software-design/architecture-basics-10-master-slave-pattern',
        title: 'Master-Slave',
      },
      {
        href: '/design/ko/software-design/architecture-basics-11-broker-pattern',
        title: 'Broker',
      },
    ], []],
  },
  [DesignCategory.SOFTWARE_DEV]: {
    title: ['Beginner', 'Middle', 'Trouble-Shooting'],
    subTitle: [[], [], []],
  },
}

// Nav 목차
export const CONTENT_DESIGN = {
  mainCategory: 'Design',
  subCategory,
  subCategoryDetail,
}
