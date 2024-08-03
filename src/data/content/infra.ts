const subCategory: {
  [key: string]: {
    name: string
    href: string
    icon: string
  }
} = {
  docker: {
    name: 'docker',
    href: '/infra/ko/docker/1-1.Introduction',
    icon: '/docker.svg',
  },
  kubernetes: {
    name: 'kubernetes',
    href: '/infra/ko/kubernetes/1-1.Introduction',
    icon: '/kubernetes.svg',
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
}

// Nav 목차
export const CONTENT_INFRA = {
  mainCategory: 'Infra',
  subCategory,
  subCategoryDetail,
}
