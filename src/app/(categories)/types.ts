export type CATEGORY_TYPE =
  | 'frontend'
  | 'backend'
  | 'infra'
  | 'design'
  | 'language'

export type SUB_CATEGORY_TYPE =
  | InfraCategory
  | FrontendCategory
  | BackendCategory
  | LanguageCategory
  | DesignCategory

export enum DesignCategory {
  PATTERN = 'pattern',
}

export enum FrontendCategory {
  REACT = 'react',
  UTILS = 'utils',
  NEXTJS = 'nextjs',
  WEB = 'web',
}

export enum LanguageCategory {
  NODEJS = 'nodejs',
  TYPESCRIPT = 'typescript',
  PYTHON = 'python',
}

export enum BackendCategory {
  BASE = 'base',
  DATABASE = 'database',
  NESTJS = 'nestjs',
  GRPC = 'grpc',
  UTILS = 'utils',
}

export enum InfraCategory {
  BASE = 'base',
  KUBERNETES = 'kubernetes',
  DOCKER = 'docker',
  COMPUTE_INFRASTRUCTURE = 'compute-infrastructure',
}
