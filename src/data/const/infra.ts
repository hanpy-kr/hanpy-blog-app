export enum InfraCategory {
  BASE = 'base',
  KUBERNETES = 'kubernetes',
  DOCKER = 'docker',
  COMPUTE_INFRASTRUCTURE = 'compute-infrastructure',
}

const subCategory: Record<
  InfraCategory,
  {
    id: InfraCategory
    name: string
    href: string
    icon: string
    description: string
  }
> = {
  [InfraCategory.BASE]: {
    id: InfraCategory.BASE,
    name: 'Core Concepts',
    description:
      'Covers foundational infrastructure concepts every developer or engineer should understand, including networking basics, servers, operating systems, virtualization, cloud computing fundamentals, and essential best practices to build and maintain robust, scalable, and reliable infrastructure.',
    href: '/infra/ko/base/tls',
    icon: 'https://resource.han-py.com/blog/logs/hash.svg',
  },
  docker: {
    id: InfraCategory.DOCKER,
    name: 'docker',
    description:
      'Explores Docker fundamentals and advanced topics, including containerization concepts, Dockerfile creation, Docker Compose for multi-container apps, optimization strategies, best practices for container security, and practical examples for building and deploying applications using Docker.',
    href: '/infra/ko/docker/1-1.Introduction',
    icon: '/icons/docker.svg',
  },
  kubernetes: {
    id: InfraCategory.KUBERNETES,
    name: 'kubernetes',
    description:
      'Focuses on Kubernetes, the industry-leading container orchestration platform. Learn about deployment strategies, pods, services, scalability, monitoring, best practices, troubleshooting, and advanced concepts to efficiently manage containerized applications in production environments.',
    href: '/infra/ko/kubernetes/1-1.Introduction',
    icon: '/icons/kubernetes.svg',
  },
  [InfraCategory.COMPUTE_INFRASTRUCTURE]: {
    id: InfraCategory.COMPUTE_INFRASTRUCTURE,
    name: 'compute infrastructure',
    description:
      'Covers the critical foundations of modern compute environments, including GPU clusters, serverless platforms, high-performance computing, and resource orchestration. Learn how to optimize, scale, and manage diverse compute resources efficiently across on-premise and cloud environments for various workloads such as AI, backend services, and scientific applications.',
    href: '/infra/ko/compute-infrastructure/serverless-1-intro',
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
          href: '/infra/ko/base/tls',
          title: 'TLS',
        },
        {
          href: '/infra/ko/base/tls-handshake',
          title: 'TLS Handshake',
        },
        {
          href: '/infra/ko/base/csrf',
          title: 'CSRF',
        },
      ],
      [
        {
          href: '/infra/ko/base/internal-network-to-saas-communication',
          title: 'Internal Network to SaaS',
        },
        {
          href: '/infra/ko/base/firewall-network-policy-management',
          title: 'firewall & Network Policy',
        },
      ],
      [
        {
          href: '/infra/ko/base/git-trouble-shoot-not_fast_forward_abort_fix',
          title: '[git] Not possible to fast-forward',
        },
        {
          href: '/infra/ko/base/git-trouble-shoot-could_not_detach_head',
          title: '[git] could not detach HEAD',
        },
      ],
    ],
  },
  docker: {
    title: [],
    subTitle: [],
  },
  kubernetes: {
    title: ['Beginner', 'Middle', 'Trouble-Shooting'],
    subTitle: [
      [
        {
          href: '/infra/ko/kubernetes/1-1.Introduction',
          title: 'Introduction',
        },
        {
          href: '/infra/ko/kubernetes/1-2.container',
          title: 'Container',
        },
        {
          href: '/infra/ko/kubernetes/1-3.container-orchestration',
          title: 'Orchestration',
        },
        {
          href: '/infra/ko/kubernetes/1-4.kubernetes-components',
          title: 'Components',
        },
        {
          href: '/infra/ko/kubernetes/1-5.reconciliation',
          title: 'Reconciliation',
        },
        {
          href: '/infra/ko/kubernetes/1-6.selector-and-label',
          title: 'Selector and Label',
        },
        {
          href: '/infra/ko/kubernetes/1-7.network',
          title: 'Network',
        },
        {
          href: '/infra/ko/kubernetes/1-8.storage-volume',
          title: 'Storage',
        },
        {
          href: '/infra/ko/kubernetes/1-9.custom-resource-and-api-aggregation',
          title: 'Custom Resource',
        },
        {
          href: '/infra/ko/kubernetes/1-10.plugin',
          title: 'Plugin',
        },
      ],
      [
        {
          href: '/infra/ko/kubernetes/2-0.yaml-command',
          title: 'yaml & command',
        },
        {
          href: '/infra/ko/kubernetes/2-1.pod',
          title: 'Pod',
        },
        {
          href: '/infra/ko/kubernetes/2-2.multi-container-pod',
          title: 'Multi Container Pod',
        },
        {
          href: '/infra/ko/kubernetes/2-3.init-container',
          title: 'Init Container',
        },
        {
          href: '/infra/ko/kubernetes/2-4.probe',
          title: 'Probe',
        },
        {
          href: '/infra/ko/kubernetes/2-5.gracefull-shutdown',
          title: 'Gracefull Shutdown',
        },
        {
          href: '/infra/ko/kubernetes/2-6.pod-scheduling',
          title: 'Pod Scheduling',
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
  [InfraCategory.COMPUTE_INFRASTRUCTURE]: {
    title: ['Serverless'],
    subTitle: [
      [
        {
          href: '/infra/ko/compute-infrastructure/serverless-1-intro',
          title: 'Introduction',
        },
        {
          href: '/infra/ko/compute-infrastructure/serverless-2-compare',
          title: 'Services',
        },
        {
          href: '/infra/ko/compute-infrastructure/serverless-3-architecture',
          title: 'Architecture',
        },
      ],
    ],
  },
}

// Nav 목차
export const CONTENT_INFRA = {
  mainCategory: 'Infra',
  subCategory,
  subCategoryDetail,
}
