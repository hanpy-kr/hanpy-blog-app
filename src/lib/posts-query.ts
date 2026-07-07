import type { CategoryType } from '@/app/(home)/types'
import {
  allBackendForENGs,
  allBackendForKORs,
  allDesignForENGs,
  allDesignForKORs,
  allFrontendForENGs,
  allFrontendForKORs,
  allInfraForENGs,
  allInfraForKORs,
  allLanguageForENGs,
  allLanguageForKORs,
} from 'contentlayer/generated'

export type PostOrderBy = 'publishedAt'

export function queryPostsMeta({
  category,
  currentLng,
  orderBy = 'publishedAt',
}: {
  category: CategoryType
  currentLng: string
  orderBy?: PostOrderBy
}) {
  if (currentLng?.includes('en')) {
    switch (category) {
      case 'Frontend':
        return [...allFrontendForENGs].sort(sortByPublishedAtDesc(orderBy))
      case 'Backend':
        return [...allBackendForENGs].sort(sortByPublishedAtDesc(orderBy))
      case 'Infra':
        return [...allInfraForENGs].sort(sortByPublishedAtDesc(orderBy))
      case 'Design':
        return [...allDesignForENGs].sort(sortByPublishedAtDesc(orderBy))
      case 'Language':
        return [...allLanguageForENGs].sort(sortByPublishedAtDesc(orderBy))
      case 'All':
      default:
        return [
          ...allDesignForENGs,
          ...allFrontendForENGs,
          ...allBackendForENGs,
          ...allInfraForENGs,
          ...allLanguageForENGs,
        ].sort(sortByPublishedAtDesc(orderBy))
    }
  }

  switch (category) {
    case 'Frontend':
      return [...allFrontendForKORs].sort(sortByPublishedAtDesc(orderBy))
    case 'Backend':
      return [...allBackendForKORs].sort(sortByPublishedAtDesc(orderBy))
    case 'Infra':
      return [...allInfraForKORs].sort(sortByPublishedAtDesc(orderBy))
    case 'Design':
      return [...allDesignForKORs].sort(sortByPublishedAtDesc(orderBy))
    case 'Language':
      return [...allLanguageForKORs].sort(sortByPublishedAtDesc(orderBy))
    case 'All':
    default:
      return [
        ...allDesignForKORs,
        ...allFrontendForKORs,
        ...allBackendForKORs,
        ...allInfraForKORs,
        ...allLanguageForKORs,
      ].sort(sortByPublishedAtDesc(orderBy))
  }
}

function sortByPublishedAtDesc(orderBy: PostOrderBy) {
  return (a: { publishedAt: string }, b: { publishedAt: string }) => {
    if (new Date(a[orderBy]) > new Date(b[orderBy])) return -1
    return 1
  }
}

export function isReleasedPost(p: {
  deployment: boolean
  publishedAt: string
}): boolean {
  if (!p.deployment) return false
  return new Date(p.publishedAt).getTime() <= Date.now()
}

export type PostListItemSerialized = {
  _id: string
  title: string
  summary: string
  category: string
  deployment: boolean
  publishedAt: string
  type: string
  _raw: { flattenedPath: string }
}

export function serializePostListItem(
  doc: PostListItemSerialized | Record<string, unknown>,
): PostListItemSerialized {
  const d = doc as PostListItemSerialized & { _type?: string }
  const typeName = d.type ?? d._type ?? ''
  return {
    _id: d._id,
    title: d.title,
    summary: d.summary,
    category: d.category,
    deployment: d.deployment,
    publishedAt: d.publishedAt,
    type: typeName,
    _raw: { flattenedPath: d._raw.flattenedPath },
  }
}

/** Home: latest published posts for default tab & locale. */
export function getHomeInitialPostsMeta(limit = 10): PostListItemSerialized[] {
  return queryPostsMeta({
    category: 'All',
    currentLng: 'ko',
    orderBy: 'publishedAt',
  })
    .filter(isReleasedPost)
    .slice(0, limit)
    .map(serializePostListItem)
}
