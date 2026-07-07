import type { CATEGORY_TYPE, SUB_CATEGORY_TYPE } from '@/app/(categories)/types'
import {
  BackendCategory,
  DesignCategory,
  FrontendCategory,
  InfraCategory,
  LanguageCategory,
} from '@/app/(categories)/types'

export type BlogContentSkin = 'infra' | 'default'

export interface BlogRouteRule {
  prefix: string
  type: CATEGORY_TYPE
  subType: SUB_CATEGORY_TYPE
  contentSkin: BlogContentSkin
}

/** Longest prefix wins (e.g. frontend/ko/nextjs/seo before frontend/ko). */
export const BLOG_ROUTE_RULES: BlogRouteRule[] = [
  {
    prefix: 'frontend/ko/nextjs/seo',
    type: 'frontend',
    subType: FrontendCategory.NEXTJS,
    contentSkin: 'default',
  },
  {
    prefix: 'infra/ko/compute-infrastructure',
    type: 'infra',
    subType: InfraCategory.COMPUTE_INFRASTRUCTURE,
    contentSkin: 'infra',
  },
  {
    prefix: 'design/ko/software-development',
    type: 'design',
    subType: DesignCategory.SOFTWARE_DEV,
    contentSkin: 'default',
  },
  {
    prefix: 'design/ko/software-design',
    type: 'design',
    subType: DesignCategory.SOFTWARE_DESIGN,
    contentSkin: 'default',
  },
  {
    prefix: 'backend/ko/security',
    type: 'backend',
    subType: BackendCategory.SECURITY,
    contentSkin: 'default',
  },
  {
    prefix: 'backend/ko/database',
    type: 'backend',
    subType: BackendCategory.DATABASE,
    contentSkin: 'default',
  },
  {
    prefix: 'language/ko/typescript',
    type: 'language',
    subType: LanguageCategory.TYPESCRIPT,
    contentSkin: 'infra',
  },
  {
    prefix: 'language/ko/nodejs',
    type: 'language',
    subType: LanguageCategory.NODEJS,
    contentSkin: 'infra',
  },
  {
    prefix: 'language/ko/python',
    type: 'language',
    subType: LanguageCategory.PYTHON,
    contentSkin: 'infra',
  },
  {
    prefix: 'frontend/ko/utils',
    type: 'frontend',
    subType: FrontendCategory.UTILS,
    contentSkin: 'default',
  },
  {
    prefix: 'frontend/ko/react',
    type: 'frontend',
    subType: FrontendCategory.REACT,
    contentSkin: 'default',
  },
  {
    prefix: 'frontend/ko/web',
    type: 'frontend',
    subType: FrontendCategory.WEB,
    contentSkin: 'default',
  },
  {
    prefix: 'infra/ko/kubernetes',
    type: 'infra',
    subType: InfraCategory.KUBERNETES,
    contentSkin: 'infra',
  },
  {
    prefix: 'infra/en/kubernetes',
    type: 'infra',
    subType: InfraCategory.KUBERNETES,
    contentSkin: 'infra',
  },
  {
    prefix: 'backend/ko/nestjs',
    type: 'backend',
    subType: BackendCategory.NESTJS,
    contentSkin: 'default',
  },
  {
    prefix: 'backend/ko/grpc',
    type: 'backend',
    subType: BackendCategory.GRPC,
    contentSkin: 'default',
  },
  {
    prefix: 'backend/ko/test',
    type: 'backend',
    subType: BackendCategory.TEST,
    contentSkin: 'default',
  },
  {
    prefix: 'backend/ko/base',
    type: 'backend',
    subType: BackendCategory.BASE,
    contentSkin: 'default',
  },
  {
    prefix: 'design/ko/pattern',
    type: 'design',
    subType: DesignCategory.PATTERN,
    contentSkin: 'default',
  },
  {
    prefix: 'infra/ko/docker',
    type: 'infra',
    subType: InfraCategory.DOCKER,
    contentSkin: 'infra',
  },
  {
    prefix: 'infra/ko/git',
    type: 'infra',
    subType: InfraCategory.GIT,
    contentSkin: 'infra',
  },
  {
    prefix: 'infra/ko/cloud',
    type: 'infra',
    subType: InfraCategory.CLOUD,
    contentSkin: 'infra',
  },
  {
    prefix: 'infra/ko/tools',
    type: 'infra',
    subType: InfraCategory.TOOLS,
    contentSkin: 'infra',
  },
  {
    prefix: 'infra/ko/base',
    type: 'infra',
    subType: InfraCategory.BASE,
    contentSkin: 'infra',
  },
]

export const SORTED_BLOG_ROUTE_RULES = [...BLOG_ROUTE_RULES].sort(
  (a, b) => b.prefix.length - a.prefix.length,
)

export function resolveBlogRouteRule(
  flattenedPath: string,
): BlogRouteRule | null {
  for (const rule of SORTED_BLOG_ROUTE_RULES) {
    if (
      flattenedPath === rule.prefix ||
      flattenedPath.startsWith(`${rule.prefix}/`)
    ) {
      return rule
    }
  }
  return null
}
