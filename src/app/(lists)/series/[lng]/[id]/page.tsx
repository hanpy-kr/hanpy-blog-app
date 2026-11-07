// 시리즈 목차: /series/{lng}/{id} (세션 7). 순서 = 사이드바 순서, 공개 글만
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import styles from '@/components/list/List.module.css'
import JsonLd from '@/components/seo/JsonLd'
import { SITE_NAME, SITE_URL } from '@/config/site'
import { categoryHref, categoryLabel, formatDate, getSeriesById, getSeriesList, seriesLngs, subLabel, subListHref } from '@/lib/content'
import { pageMetadata } from '@/lib/page-metadata'

type Params = { lng: string; id: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return seriesLngs().flatMap((lng) => getSeriesList(lng).map((s) => ({ lng, id: s.id })))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lng, id } = await params
  const s = getSeriesById(lng, id)
  if (!s) return {}
  return pageMetadata({
    title: `${s.name} 시리즈`,
    description: `${categoryLabel(s.category)} · ${subLabel(s.category, s.sub)} ${s.name} 시리즈 ${s.posts.length}편. 1편 '${s.posts[0].title}'부터 순서대로 읽습니다.`,
    path: s.href,
    lng,
  })
}

export default async function SeriesPage({ params }: { params: Promise<Params> }) {
  const { lng, id } = await params
  const s = getSeriesById(lng, id)
  if (!s) notFound()
  const updated = s.posts.map((p) => p.updatedAt ?? p.publishedAt).toSorted().at(-1)!

  // 검색 결과에 목록으로 보이도록 ItemList 구조화 데이터
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${s.name} 시리즈 | ${SITE_NAME}`,
    url: SITE_URL + s.href,
    numberOfItems: s.posts.length,
    itemListElement: s.posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE_URL + p.url, name: p.title })),
  }

  return (
    <main className={styles.main}>
      <JsonLd data={ld} />
      <nav aria-label="현재 위치" className={styles.breadcrumb}>
        <Link href={`/series/${lng}`}>시리즈</Link>
        <span aria-hidden="true">/</span>
        <Link href={categoryHref(s.category, lng)}>{categoryLabel(s.category)}</Link>
        <span aria-hidden="true">/</span>
        <Link href={subListHref(s.category, lng, s.sub)}>{subLabel(s.category, s.sub)}</Link>
      </nav>
      <p className={styles.eyebrow}>{s.href}</p>
      <h1 className={styles.title}>{s.name}</h1>
      <p className={styles.lead}>
        {s.posts.length}편 · 마지막 업데이트 {formatDate(updated)}
      </p>
      <div className={styles.filters}>
        <Link href={s.posts[0].url} className={styles.cta}>
          1편부터 읽기 →
        </Link>
      </div>

      <ol className={styles.toc}>
        {s.posts.map((p, i) => (
          <li key={p.url} className={styles.tocItem}>
            <span className={styles.tocNo} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h2 className={styles.postTitle}>
              <Link href={p.url}>{p.title}</Link>
            </h2>
            <p className={styles.summary}>{p.summary}</p>
          </li>
        ))}
      </ol>
    </main>
  )
}
