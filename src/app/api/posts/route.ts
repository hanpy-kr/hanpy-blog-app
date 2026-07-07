import type { CategoryType } from '@/app/(home)/types'
import {
  isReleasedPost,
  queryPostsMeta,
  serializePostListItem,
} from '@/lib/posts-query'
import { NextResponse } from 'next/server'

const ALLOWED: CategoryType[] = [
  'All',
  'Frontend',
  'Backend',
  'Infra',
  'Design',
  'Language',
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rawCat = searchParams.get('category') || 'All'
  const category = (
    ALLOWED.includes(rawCat as CategoryType) ? rawCat : 'All'
  ) as CategoryType
  const lng = searchParams.get('lng') || 'ko'
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get('limit') || '10', 10) || 10),
  )

  const items = queryPostsMeta({
    category,
    currentLng: lng,
    orderBy: 'publishedAt',
  })
    .filter(isReleasedPost)
    .slice(0, limit)

  return NextResponse.json({ posts: items.map(serializePostListItem) })
}
