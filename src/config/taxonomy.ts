// 카테고리·서브카테고리 등록부 (세션 5). 예전 src/types/category.ts(enum)·src/lib/blog-route-rules.ts·src/data/const/*.ts 를 대신한다
//
// - 객체에 적은 순서가 화면 순서다: 카테고리 → 메뉴·홈·필터, 서브카테고리 → 사이드바 선택 상자, groups → 사이드바 그룹
// - 사이드바 링크는 여기 적지 않는다. 글 frontmatter의 group·order로 자동으로 만든다 (src/lib/sidebar.ts)
// - 서브카테고리 첫 화면 주소(href)도 적지 않는다. 사이드바 순서로 가장 앞에 오는 공개 글이 자동으로 쓰인다
// - 공개 글이 0개인 카테고리·서브카테고리는 메뉴·홈·사이드바에서 자동으로 숨는다 (ai, backend/utils 등)
// - 빌드(content-collections.ts)가 글 경로의 category·sub와 frontmatter group이 여기 등록돼 있는지 검사한다.
//   새 서브카테고리나 그룹은 글을 쓰기 전에 여기에 먼저 추가한다
//
// 다른 파일을 import 하지 않는다 (content-collections.ts·scripts/check-sidebar.ts 가 그대로 읽음).
// 화면 컴포넌트 중 클라이언트 컴포넌트는 이 파일을 직접 import 하지 말고 서버에서 이름만 넘겨받는다 (설명 문구까지 번들에 들어가지 않게)

export type SubCategoryDef = {
  /** 사이드바 선택 상자·위치 표시·목록 칩에 쓰는 이름 */
  name: string
  description: string
  /** /public 아래 경로 또는 resource.han-py.com 주소. 없으면 생략 */
  icon?: string
  /** 사이드바 그룹 이름과 순서. 글 frontmatter의 group은 이 중 하나여야 한다 */
  groups: readonly string[]
}

export type CategoryDef = {
  name: string
  description: string
  icon?: string
  subs: Readonly<Record<string, SubCategoryDef>>
}

const BASIC_GROUPS = ['Beginner', 'Middle', 'Trouble-Shooting'] as const

export const TAXONOMY = {
  backend: {
    name: 'Backend',
    description: '서버 아키텍처, 데이터베이스, 인증, API, 테스트 등 백엔드 개발 기록',
    subs: {
      base: {
        name: 'Core Concepts',
        description:
          'This category covers foundational concepts, theories, and practices essential for backend development, such as architecture patterns, server concepts, authentication & authorization, API design, and general best practices.',
        icon: 'https://resource.han-py.com/blog/logs/hash.svg',
        groups: BASIC_GROUPS,
      },
      database: {
        name: 'Database',
        description:
          'Explore database technologies, data modeling, indexing strategies, query optimization, schema design, and both relational (SQL) and NoSQL databases. It includes practical insights into effective database management and best practices.',
        icon: '/icons/database.svg',
        groups: ['MongoDB', 'Database', 'Redis', 'Trouble-Shooting'],
      },
      nestjs: {
        name: 'NestJS',
        description:
          'Focused on the NestJS framework, this category provides tutorials, guides, best practices, and advanced concepts for building scalable, maintainable, and testable Node.js backend applications with NestJS.',
        icon: '/icons/nestjs.svg',
        groups: BASIC_GROUPS,
      },
      security: {
        name: 'Security',
        description:
          'Covers essential backend security concepts including authentication, authorization, encryption, and identity federation standards like OAuth, OIDC, and SAML. Learn how to design secure APIs and implement robust enterprise-grade access control systems.',
        icon: '/icons/security.svg',
        groups: ['Auth'],
      },
      test: {
        name: 'Test',
        description:
          'Explains the core types of testing in backend and frontend development, including static, unit, integration, and end-to-end (E2E) testing. Learn how to design efficient test strategies to ensure code quality, maintainability, and system reliability.',
        icon: '/icons/security.svg',
        groups: ['TDD'],
      },
      grpc: {
        name: 'gRPC',
        description:
          'A dedicated category covering gRPC concepts, implementation, best practices, performance optimization, real-world use cases, and integration within microservice architectures.',
        icon: '/icons/grpc.svg',
        groups: BASIC_GROUPS,
      },
      utils: {
        name: 'Utils',
        description:
          'Useful utilities, helper functions, libraries, tools, and patterns that help backend developers write cleaner, more efficient, maintainable, and reusable code.',
        icon: '/icons/utils.svg',
        groups: BASIC_GROUPS,
      },
      // 글은 아직 모두 초안(foundation-1~3). 공개할 때 group: 'Foundation', order: 1~3 을 넣는다
      mongodb: {
        name: 'MongoDB',
        description:
          'Covers MongoDB fundamentals: moving from the relational model to documents, schema design patterns and anti-patterns, and indexing for performance.',
        icon: '/icons/database.svg',
        groups: ['Foundation', 'Middle', 'Trouble-Shooting'],
      },
    },
  },
  infra: {
    name: 'Infra',
    description: '네트워크, 클라우드(AWS), 컨테이너, Kubernetes, 인프라 도구 운영 기록',
    subs: {
      base: {
        name: 'Core Concepts',
        description:
          'Covers foundational infrastructure concepts every developer or engineer should understand, including networking basics, servers, operating systems, virtualization, cloud computing fundamentals, and essential best practices to build and maintain robust, scalable, and reliable infrastructure.',
        icon: 'https://resource.han-py.com/blog/logs/hash.svg',
        groups: BASIC_GROUPS,
      },
      docker: {
        name: 'Docker',
        description:
          'Explores Docker fundamentals and advanced topics, including containerization concepts, Dockerfile creation, Docker Compose for multi-container apps, optimization strategies, best practices for container security, and practical examples for building and deploying applications using Docker.',
        icon: '/icons/docker.svg',
        groups: ['Beginner'],
      },
      cloud: {
        name: 'Cloud',
        description:
          'Covers foundational and advanced cloud computing concepts, including cloud service models (IaaS, PaaS, SaaS), core infrastructure components, networking fundamentals with AWS VPC, storage and compute services, deployment strategies, scalability and cost optimization techniques, security best practices, and hands-on examples for building and managing applications in cloud environments.',
        groups: ['AWS', 'VPC'],
      },
      kubernetes: {
        name: 'Kubernetes',
        description:
          'Focuses on Kubernetes, the industry-leading container orchestration platform. Learn about deployment strategies, pods, services, scalability, monitoring, best practices, troubleshooting, and advanced concepts to efficiently manage containerized applications in production environments.',
        icon: '/icons/kubernetes.svg',
        groups: ['Beginner', 'Middle', 'Karpenter', 'Trouble-Shooting'],
      },
      'compute-infrastructure': {
        name: 'Compute Infra',
        description:
          'Covers the critical foundations of modern compute environments, including GPU clusters, serverless platforms, high-performance computing, and resource orchestration. Learn how to optimize, scale, and manage diverse compute resources efficiently across on-premise and cloud environments for various workloads such as AI, backend services, and scientific applications.',
        icon: '/icons/utils.svg',
        groups: ['Serverless', 'GPU'],
      },
      tools: {
        name: 'Tools',
        description:
          'Explores essential infrastructure automation and management tools such as Packer, Terraform, and Ansible. Learn how these tools streamline provisioning, configuration, and deployment processes, enabling consistent, repeatable, and scalable infrastructure across multi-cloud and on-premise environments.',
        icon: '/icons/tools.png',
        groups: ['Packer'],
      },
      git: {
        name: 'Git',
        description:
          'Focuses on version control fundamentals and collaborative development workflows using Git. Understand how to track code changes, manage branches, resolve conflicts, and maintain a clean commit history. Learn best practices for integrating Git with remote repositories such as GitHub or GitLab to enable efficient, distributed, and reliable software development.',
        icon: '/icons/git.png',
        groups: ['Github'],
      },
    },
  },
  design: {
    name: 'Design',
    description: '디자인 패턴, 소프트웨어 설계·아키텍처 패턴, 요구사항 분석 기록',
    subs: {
      pattern: {
        name: 'Design Pattern',
        description:
          'This category explores common software design patterns, including creational, structural, and behavioral patterns. Learn about patterns such as Singleton, Factory, Observer, and more, along with practical examples, implementation strategies, and best practices to write robust, maintainable, and reusable code.',
        groups: BASIC_GROUPS,
      },
      'software-design': {
        name: 'Software Design',
        description:
          'This category delves into the principles and methodologies behind structuring software systems. Explore topics such as modularity, separation of concerns, SOLID principles, and architectural patterns like MVC and layered architecture. Gain insight into how thoughtful design choices contribute to scalability, maintainability, and long-term success in software projects.',
        groups: ['Beginner', 'Architecture Pattern', 'Trouble-Shooting'],
      },
      'software-development': {
        name: 'Software Development',
        description:
          'This category covers the end-to-end process of building software—from requirements gathering and planning to coding, testing, and deployment. Learn about development methodologies like Agile and DevOps, tools for version control and CI/CD, as well as strategies for team collaboration, code quality, and iterative improvement. Build reliable and efficient software through well-managed development workflows.',
        groups: BASIC_GROUPS,
      },
    },
  },
  language: {
    name: 'Language',
    description: 'TypeScript, Node.js, Python 언어와 런타임 정리',
    subs: {
      typescript: {
        name: 'TypeScript',
        description:
          'TypeScript is a strongly typed programming language built on JavaScript, providing static typing, modern language features, and enhanced tooling. This category covers in-depth concepts, best practices, practical examples, and guides to help developers leverage TypeScript for more robust, maintainable, and scalable applications.',
        icon: 'https://resource.han-py.com/blog/logs/typescript_logo.svg',
        groups: ['TypeScript Essentials', 'Classes & Types', 'Advanced Patterns', 'Trouble-Shooting'],
      },
      nodejs: {
        name: 'Nodejs',
        description:
          "Node.js is a JavaScript runtime environment that enables developers to run JavaScript on servers and build scalable, event-driven applications. In this category, you'll find tutorials, guides, practical examples, and advanced techniques focused on Node.js development, performance optimization, and backend solutions.",
        icon: 'https://resource.han-py.com/blog/logs/nodejs_logo.svg',
        groups: ['Introduction & Fundamentals', 'Built-in Modules', 'External Libraries', 'Error & Performance'],
      },
      python: {
        name: 'Python',
        description:
          "Python is a versatile, high-level programming language widely used in web development, data science, automation, artificial intelligence, and more. In this category, you'll find detailed tutorials, practical examples, best practices, and advanced concepts to help you master Python programming and build efficient, robust applications.",
        icon: 'https://resource.han-py.com/blog/logs/python_logo.svg',
        groups: ['utils'],
      },
    },
  },
  frontend: {
    name: 'Frontend',
    description: '웹 브라우저, React, Next.js, 프론트엔드 도구 정리',
    subs: {
      web: { name: 'Web', description: '', icon: '/icons/web.svg', groups: ['Core'] },
      react: { name: 'React', description: '', icon: '/icons/react.svg', groups: ['react'] },
      nextjs: { name: 'Nextjs', description: '', icon: '/icons/nextjs.svg', groups: ['nextjs'] },
      utils: { name: 'Utils', description: '', icon: '/icons/utils.svg', groups: ['Administration', 'library'] },
    },
  },
  // 2026-11-02 결정. 글 주소는 /ai/{lng}/{sub}/{slug}. 서브카테고리는 첫 글을 쓸 때 여기에 추가한다
  ai: {
    name: 'AI',
    description: 'AI 개발 도구와 LLM 활용 트렌드 정리',
    subs: {},
  },
} as const satisfies Record<string, CategoryDef>

export type Category = keyof typeof TAXONOMY

/** 등록 순서 = 화면 순서 */
export const CATEGORIES = Object.keys(TAXONOMY) as Category[]

export const isCategory = (c: unknown): c is Category => typeof c === 'string' && Object.hasOwn(TAXONOMY, c)

export const categoryLabel = (c: string): string => (isCategory(c) ? TAXONOMY[c].name : c)

export function getSubDef(category: string, sub: string): SubCategoryDef | undefined {
  if (!isCategory(category)) return undefined
  const subs: Readonly<Record<string, SubCategoryDef>> = TAXONOMY[category].subs
  return Object.hasOwn(subs, sub) ? subs[sub] : undefined
}

/** 서브카테고리 표시 이름 (등록되지 않았으면 폴더 이름) */
export const subLabel = (category: string, sub: string): string => getSubDef(category, sub)?.name ?? sub

/** 서브카테고리 id 목록 (등록 순서) */
export const subIds = (category: string): string[] => (isCategory(category) ? Object.keys(TAXONOMY[category].subs) : [])
