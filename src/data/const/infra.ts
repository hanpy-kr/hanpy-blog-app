import { InfraCategory } from '@/app/(categories)/types'

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
    name: 'Docker',
    description:
      'Explores Docker fundamentals and advanced topics, including containerization concepts, Dockerfile creation, Docker Compose for multi-container apps, optimization strategies, best practices for container security, and practical examples for building and deploying applications using Docker.',
    href: '/infra/ko/docker/docker-1-introduction',
    icon: '/icons/docker.svg',
  },
  cloud: {
    id: InfraCategory.CLOUD,
    name: 'Cloud',
    description:
      'Covers foundational and advanced cloud computing concepts, including cloud service models (IaaS, PaaS, SaaS), core infrastructure components, networking fundamentals with AWS VPC, storage and compute services, deployment strategies, scalability and cost optimization techniques, security best practices, and hands-on examples for building and managing applications in cloud environments.',
    href: '/infra/ko/cloud/aws-vpc-1-introduction',
    icon: '',
  },
  kubernetes: {
    id: InfraCategory.KUBERNETES,
    name: 'Kubernetes',
    description:
      'Focuses on Kubernetes, the industry-leading container orchestration platform. Learn about deployment strategies, pods, services, scalability, monitoring, best practices, troubleshooting, and advanced concepts to efficiently manage containerized applications in production environments.',
    href: '/infra/ko/kubernetes/1-1.Introduction',
    icon: '/icons/kubernetes.svg',
  },
  [InfraCategory.COMPUTE_INFRASTRUCTURE]: {
    id: InfraCategory.COMPUTE_INFRASTRUCTURE,
    name: 'Compute Infra',
    description:
      'Covers the critical foundations of modern compute environments, including GPU clusters, serverless platforms, high-performance computing, and resource orchestration. Learn how to optimize, scale, and manage diverse compute resources efficiently across on-premise and cloud environments for various workloads such as AI, backend services, and scientific applications.',
    href: '/infra/ko/compute-infrastructure/serverless-1-intro',
    icon: '/icons/utils.svg',
  },
  [InfraCategory.TOOLS]: {
    id: InfraCategory.TOOLS,
    name: 'Tools',
    description:
      'Explores essential infrastructure automation and management tools such as Packer, Terraform, and Ansible. Learn how these tools streamline provisioning, configuration, and deployment processes, enabling consistent, repeatable, and scalable infrastructure across multi-cloud and on-premise environments.',
    href: '/infra/ko/tools/packer-1-introduction',
    icon: '/icons/tools.png',
  },
  [InfraCategory.GIT]: {
    id: InfraCategory.GIT,
    name: 'Git',
    description:
      'Focuses on version control fundamentals and collaborative development workflows using Git. Understand how to track code changes, manage branches, resolve conflicts, and maintain a clean commit history. Learn best practices for integrating Git with remote repositories such as GitHub or GitLab to enable efficient, distributed, and reliable software development.',
    href: '/infra/ko/git/git-01-introduction',
    icon: '/icons/git.png',
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
          href: '/infra/ko/base/network-1-introduction',
          title: 'Introduction',
        },
        {
          href: '/infra/ko/base/network-2-performance-command',
          title: 'Performance',
        },
        {
          href: '/infra/ko/base/open-systems-interconnection',
          title: 'OSI 7 Layer',
        },
        {
          href: '/infra/ko/base/tcp-ip-protocol',
          title: 'TCP/IP',
        },
        {
          href: '/infra/ko/base/tcp-time-wait',
          title: 'TCP TIME_WAIT',
        },
        {
          href: '/infra/ko/base/dns',
          title: 'DNS',
        },
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
        {
          href: '/infra/ko/base/how-the-web-works-in-one-line',
          title: 'How The Web Works',
        },
        {
          href: '/infra/ko/base/tcp-3way-handshake',
          title: 'TCP 3-Way Handshake',
        },
        {
          href: '/infra/ko/base/tcp-4way-handshake',
          title: 'TCP 4-Way Handshake',
        },
        {
          href: '/infra/ko/base/quic-handshake',
          title: 'QUIC',
        },
        {
          href: '/infra/ko/base/network-switch',
          title: 'Switch',
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
    title: ['Beginner'],
    subTitle: [
      [
        {
          href: '/infra/ko/docker/docker-1-introduction',
          title: 'Introduction',
        },
        {
          href: '/infra/ko/docker/docker-2-privileged',
          title: 'privileged',
        },
      ]
    ],
  },
  cloud: {
    title: ['AWS', 'VPC'],
    subTitle: [
      [
        {
          href: '/infra/ko/cloud/aws-ec2-eip',
          title: 'Elastic IP',
        },
        {
          href: '/infra/ko/cloud/aws-ec2-lb',
          title: 'Elastic Load Balancer',
        },
        {
          href: '/infra/ko/cloud/aws-efs-1-introduction',
          title: 'EFS',
        },
        {
          href: '/infra/ko/cloud/aws-efs-2-backup',
          title: 'EFS - backup',
        },
        {
          href: '/infra/ko/cloud/aws-efs-3-datasync',
          title: 'EFS - dayasync',
        },
        {
          href: '/infra/ko/cloud/aws-efs-4-transfer',
          title: 'EFS - transfer',
        },
        {
          href: '/infra/ko/cloud/aws-iam-1-identity-provider',
          title: 'IdP(Identity Provider)',
        },
        {
          href: '/infra/ko/cloud/aws-efs-4-transfer',
          title: 'EFS - transfer',
        },
      ],
      [
        {
          href: '/infra/ko/cloud/aws-vpc-1-introduction',
          title: 'Introduction',
        },
        {
          href: '/infra/ko/cloud/aws-vpc-2-subnet',
          title: 'Subnet',
        },
        {
          href: '/infra/ko/cloud/aws-vpc-3-routing-table',
          title: 'Routing Table',
        },
        {
          href: '/infra/ko/cloud/aws-vpc-4-internet-gateway',
          title: 'Internet Gateway(IGW)',
        },
        {
          href: '/infra/ko/cloud/aws-vpc-5-net-gateway',
          title: 'NAT Gateway',
        },
        {
          href: '/infra/ko/cloud/aws-vpc-6-virtual-private-gateway',
          title: 'Virtual Private Gateway(VGW)',
        },
        {
          href: '/infra/ko/cloud/aws-vpc-7-transit-gateway',
          title: 'Transit Gateway',
        },
        {
          href: '/infra/ko/cloud/aws-vpc-8-direct-connect',
          title: 'Direct Connect',
        },
        {
          href: '/infra/ko/cloud/aws-vpc-9-site-to-site',
          title: 'Site-to-Site',
        },
        {
          href: '/infra/ko/cloud/aws-vpc-10-peering',
          title: 'Peering',
        },
        {
          href: '/infra/ko/cloud/aws-vpc-11-acl',
          title: 'ACL',
        },
        {
          href: '/infra/ko/cloud/aws-vpc-12-sg',
          title: 'Security Group',
        },
      ]
    ],
  },
  kubernetes: {
    title: ['Beginner', 'Middle', 'Karpenter', 'Trouble-Shooting'],
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
        {
          href: '/infra/ko/kubernetes/3-01-core-dns',
          title: 'CoreDNS',
        },
        {
          href: '/infra/ko/kubernetes/kube-md-01-kubectl-exec',
          title: 'exec',
        },
      ],
      [
        {
          href: '/infra/ko/kubernetes/karpenter-1-introduction',
          title: 'Introduction',
        },
        {
          href: '/infra/ko/kubernetes/karpenter-2-hello-world',
          title: 'NodeClass & NodePool',
        },
        {
          href: '/infra/ko/kubernetes/karpenter-3-spot_ondemand',
          title: 'Spot & On-Demand',
        },
        {
          href: '/infra/ko/kubernetes/karpenter-4-multiarch',
          title: 'Multi-Architecture',
        },
        {
          href: '/infra/ko/kubernetes/karpenter-5-gpu_limits',
          title: 'GPU',
        },
        {
          href: '/infra/ko/kubernetes/karpenter-6-availability_zone',
          title: 'Constraints & Limits',
        },
        {
          href: '/infra/ko/kubernetes/karpenter-7-practice',
          title: 'Practice',
        },
      ],
      [
        {
          href: '/infra/ko/kubernetes/kube-ts-01-x509.mdx',
          title: 'Introduction',
        },
        {
          href: '/infra/ko/kubernetes/kube-ts-02-132-version',
          title: 'Introduction',
        },
      ],
    ],
  },
  [InfraCategory.COMPUTE_INFRASTRUCTURE]: {
    title: ['Serverless', 'GPU'],
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
      [
        {
          href: '/infra/ko/compute-infrastructure/gpu-1-gpu_models',
          title: 'Models',
        },
        {
          href: '/infra/ko/compute-infrastructure/gpu-2-gpu_server_vs_consumer_server',
          title: 'Sever Guide',
        },
      ],
    ],
  },
  [InfraCategory.TOOLS]: {
    title: ['Packer'],
    subTitle: [
      [
        {
          href: '/infra/ko/tools/packer-1-introduction',
          title: 'Introduction',
        },
        {
          href: '/infra/ko/tools/packer-2-hello-world',
          title: 'Hello World',
        },
        {
          href: '/infra/ko/tools/packer-3-variable',
          title: 'Variable',
        },
        {
          href: '/infra/ko/tools/packer-4-multi-cloud',
          title: 'Multi Cloud',
        },
        {
          href: '/infra/ko/tools/packer-5-eks-node',
          title: 'EKS Node AMI',
        },
        {
          href: '/infra/ko/tools/packer-6-advanced_ecr_tags',
          title: 'AMI Build',
        },
      ],
    ],
  },
  [InfraCategory.GIT]: {
    title: ['Github'],
    subTitle: [
      [
        {
          href: '/infra/ko/git/git-01-introduction',
          title: 'Introduction',
        },
        {
          href: '/infra/ko/git/git-02-install',
          title: 'Install',
        },
        {
          href: '/infra/ko/git/git-03-structure',
          title: 'Structure',
        },
        {
          href: '/infra/ko/git/git-04-command',
          title: 'Command',
        }
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
