// 카테고리 상수. 클라이언트 컴포넌트에서도 쓰므로 content-collections(글 본문 전체)를 import하지 않는 파일에 둔다
export const CATEGORIES = ['backend', 'infra', 'design', 'language', 'frontend'] as const
export type Category = (typeof CATEGORIES)[number]

export const CATEGORY_LABEL: Record<Category, string> = {
  backend: 'Backend',
  infra: 'Infra',
  design: 'Design',
  language: 'Language',
  frontend: 'Frontend',
}

export const categoryLabel = (c: string) => CATEGORY_LABEL[c as Category] ?? c
