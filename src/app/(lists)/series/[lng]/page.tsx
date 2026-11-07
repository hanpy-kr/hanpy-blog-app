// 시리즈 목록: /series/{lng} (디자인 시안 'Series', 세션 7)
// 카테고리별 묶음 → 편수 많은 순. 위쪽 칩은 같은 화면 안의 카테고리 묶음으로 이동한다
import type { Metadata } from 'next'
import styles from '@/components/list/List.module.css'
import SeriesCards from '@/components/list/SeriesCards'
import { CATEGORIES, categoryLabel, getSeriesList, seriesLngs } from '@/lib/content'
import { pageMetadata } from '@/lib/page-metadata'

type Params = { lng: string }

export function generateStaticParams(): Params[] {
  return seriesLngs().map((lng) => ({ lng }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lng } = await params
  const n = getSeriesList(lng).length
  return pageMetadata({
    title: '시리즈',
    description: `순서대로 이어 읽을 수 있는 글 묶음 ${n}개입니다. 처음부터 읽으면 한 주제를 끝까지 이해할 수 있습니다.`,
    path: `/series/${lng}`,
    lng,
  })
}

export default async function SeriesListPage({ params }: { params: Promise<Params> }) {
  const { lng } = await params
  const all = getSeriesList(lng)
  const groups = CATEGORIES.map((c) => ({ id: c, name: categoryLabel(c), series: all.filter((s) => s.category === c) })).filter(
    (g) => g.series.length > 0,
  )

  return (
    <main className={`${styles.main} ${styles.wide}`}>
      <p className={styles.eyebrow}>/series/{lng}</p>
      <h1 className={styles.title}>시리즈</h1>
      <p className={styles.lead}>순서대로 이어 읽을 수 있는 글 묶음 {all.length}개입니다.</p>

      <nav aria-label="카테고리" className={styles.filters}>
        {groups.map((g) => (
          <a key={g.id} href={`#series-${g.id}`} className={styles.filter}>
            {g.name} {g.series.length}
          </a>
        ))}
      </nav>

      {groups.map((g) => (
        <section key={g.id} id={`series-${g.id}`} aria-labelledby={`series-${g.id}-title`} className={styles.section}>
          <h2 id={`series-${g.id}-title`} className={styles.sectionTitle}>
            {g.name}
            <span className={styles.sectionCount}>{g.series.length}</span>
          </h2>
          <SeriesCards series={g.series} />
        </section>
      ))}
    </main>
  )
}
