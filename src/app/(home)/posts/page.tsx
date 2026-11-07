// 전체 글 목록 (한국어, 최신순, 15개씩). ?category=backend 로 카테고리만 볼 수 있다
import type { Metadata } from 'next'
import Link from 'next/link'
import { RSS_ALTERNATE, SITE_NAME, baseMetadata } from '@/config/site'
import { TAXONOMY } from '@/config/taxonomy'
import { categoryLabel, getPosts, visibleCategories, type Category } from '@/lib/content'
import PostList from '@/components/list/PostList'
import styles from '@/components/list/List.module.css'

const PAGE_SIZE = 15

type Search = { page?: string; category?: string }

// 공개 글이 있는 카테고리만 필터로 받는다 (글 0개인 ai 등은 ?category= 로 와도 전체 글을 보여 줌)
const isCategory = (c: string | undefined): c is Category => visibleCategories('ko').some((v) => v.id === c)

export async function generateMetadata({ searchParams }: { searchParams: Promise<Search> }): Promise<Metadata> {
  const { category } = await searchParams
  const title = isCategory(category) ? `${categoryLabel(category)} 글` : '전체 글'
  // 카테고리 설명은 taxonomy에서
  const description = isCategory(category) ? TAXONOMY[category].description : `${SITE_NAME}의 모든 글을 최신순으로 봅니다.`
  const url = isCategory(category) ? `/posts?category=${category}` : '/posts'
  return {
    title,
    description,
    alternates: { canonical: url, types: RSS_ALTERNATE },
    // openGraph·twitter는 레이아웃 값을 통째로 바꾸므로 기본값(이미지·사이트명)을 펼쳐 넣는다
    openGraph: { ...baseMetadata.openGraph, title: `${title} | ${SITE_NAME}`, description, url },
    twitter: { ...baseMetadata.twitter, title: `${title} | ${SITE_NAME}`, description },
  }
}

export default async function PostsArchivePage({ searchParams }: { searchParams: Promise<Search> }) {
  const { page: pageParam, category: categoryParam } = await searchParams
  const category = isCategory(categoryParam) ? categoryParam : undefined
  const all = getPosts({ lng: 'ko', category })
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE))
  const current = Math.min(Math.max(1, parseInt(pageParam ?? '1', 10) || 1), totalPages)
  const slice = all.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const href = (page: number) =>
    `/posts?${new URLSearchParams({ ...(category ? { category } : {}), ...(page > 1 ? { page: String(page) } : {}) })}`.replace(/\?$/, '')

  const filters = [{ id: undefined, label: '전체', count: getPosts({ lng: 'ko' }).length }, ...visibleCategories('ko').map((c) => ({ id: c.id, label: c.name, count: c.count }))]

  return (
    <main className={styles.main}>
      <p className={styles.eyebrow}>/posts{category ? `?category=${category}` : ''}</p>
      <h1 className={styles.title}>{category ? `${categoryLabel(category)} 글` : '전체 글'}</h1>
      <p className={styles.lead}>최신 글부터 {all.length}개</p>

      <nav aria-label="카테고리 필터" className={styles.filters}>
        {filters.map((f) => (
          <Link
            key={f.label}
            href={f.id ? `/posts?category=${f.id}` : '/posts'}
            className={styles.filter}
            aria-current={f.id === category ? 'page' : undefined}
          >
            {f.label} {f.count}
          </Link>
        ))}
      </nav>

      <PostList posts={slice} />

      {totalPages > 1 && (
        <nav aria-label="페이지" className={styles.pager}>
          {current > 1 ? (
            <Link href={href(current - 1)} className={styles.pageLink}>
              ← 이전
            </Link>
          ) : (
            <span />
          )}
          <span className={styles.pageInfo}>
            {current} / {totalPages}
          </span>
          {current < totalPages ? (
            <Link href={href(current + 1)} className={styles.pageLink}>
              다음 →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </main>
  )
}
