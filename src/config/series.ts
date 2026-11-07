// 시리즈 등록부 (세션 7). 글 frontmatter의 series id → 화면에 보이는 이름
//
// - 글 순서는 여기 적지 않는다. 사이드바 순서(서브카테고리 → 그룹 → order)를 따른다 (src/lib/sidebar.ts)
// - 빌드(content-collections.ts)가 frontmatter series가 여기 있는지 검사한다. 새 시리즈는 글을 쓰기 전에 먼저 추가
// - 목록 화면(/series/{lng})은 카테고리 순서 → 편수 많은 순으로 보여 준다. 여기 적은 순서는 쓰지 않는다
//
// 다른 파일을 import 하지 않는다 (content-collections.ts·scripts 가 그대로 읽음)

export type SeriesDef = {
  /** 시리즈 상자·목차 페이지·카드 제목 */
  name: string
}

export const SERIES = {
  kubernetes: { name: 'Kubernetes' },
  'architecture-basics': { name: '아키텍처 기초' },
  'aws-vpc': { name: 'AWS VPC' },
  grpc: { name: 'gRPC' },
  'software-requirements': { name: '요구사항·설계' },
  auth: { name: '인증과 인가' },
  karpenter: { name: 'Karpenter' },
  git: { name: 'Git' },
  packer: { name: 'Packer' },
  solid: { name: 'SOLID' },
  tdd: { name: 'TDD' },
  'concurrency-control': { name: '동시성 제어' },
  'mongodb-concurrency': { name: 'MongoDB 동시성' },
  'aws-efs': { name: 'AWS EFS' },
  serverless: { name: 'Serverless' },
  'typescript-essential': { name: 'TypeScript Essential' },
  'typescript-intermediate': { name: 'TypeScript Intermediate' },
} as const satisfies Record<string, SeriesDef>

export type SeriesId = keyof typeof SERIES

export const isSeriesId = (id: unknown): id is SeriesId => typeof id === 'string' && Object.hasOwn(SERIES, id)

export const seriesName = (id: string): string => (isSeriesId(id) ? SERIES[id].name : id)
