export interface PostListProps {
  hasNavigation?: boolean
  defaultTab?: CategoryType
}

export interface PostProps {
  // id?: string
  // title: string
  // email: string
  // summary: string
  // content: string
  // createdAt: string
  // updatedAt?: string
  // uid: string
  // category?: CategoryType
  body: {}
  deployment?: boolean
  category?: string
  publishedAt: string
  summary: string
  title: string
  type: string
  _id: string
  _raw: {
    flattenedPath: string
  }
}

export type CategoryType =
  | 'Frontend'
  | 'Backend'
  | 'Web'
  | 'Infra'
  | 'All'
  | 'my'
