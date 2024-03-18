export interface PostListProps {
  hasNavigation?: boolean
  defaultTab?: TabType | CategoryType
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
  publishedAt: string
  summary: string
  title: string
  type: string
  _id: string
  _raw: {
    flattenedPath: string
  }
}

export type CategoryType = 'Frontend' | 'Backend' | 'Web' | 'Infra'

export type TabType = 'all' | 'my'
