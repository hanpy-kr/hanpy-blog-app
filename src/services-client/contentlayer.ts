import { CategoryType } from '@/app/(home)/types'
import { allFrontends } from 'contentlayer/generated'
import { allBackends } from 'contentlayer/generated'
import { allInfras } from 'contentlayer/generated'

/**
 * blog
 */
class ContentlayerService {
  query({
    category,
    type,
    orderBy,
  }: {
    category: 'all' | CategoryType // 'Frontend' | 'Backend' | 'Web' | 'Infra'
    type: 'meta' | 'content'
    orderBy: 'publishedAt'
  }) {
    switch (category) {
      case 'Frontend':
        return [...allFrontends].sort((a, b) => {
          if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
          return 1
        })
      case 'Backend':
        return [...allBackends].sort((a, b) => {
          if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
          return 1
        })
      case 'Infra':
        return [...allInfras].sort((a, b) => {
          if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
          return 1
        })
      case 'all':
      default:
        return [...allFrontends, ...allBackends, ...allInfras].sort((a, b) => {
          if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
          return 1
        })
    }
  }
}

export default new ContentlayerService()
