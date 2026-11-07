// 태그 전체: /tags/{lng} (세션 7). 글 많은 순
import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/components/list/List.module.css'
import { LNGS, TAG_INDEX_MIN_POSTS, getTags } from '@/lib/content'
import { pageMetadata } from '@/lib/page-metadata'

type Params = { lng: string }

export function generateStaticParams(): Params[] {
  return LNGS.filter((lng) => getTags(lng).length > 0).map((lng) => ({ lng }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lng } = await params
  return pageMetadata({
    title: '태그',
    description: `글에 붙은 태그 ${getTags(lng).length}개를 글이 많은 순으로 모았습니다.`,
    path: `/tags/${lng}`,
    lng,
  })
}

export default async function TagsPage({ params }: { params: Promise<Params> }) {
  const { lng } = await params
  const tags = getTags(lng)
  const often = tags.filter((t) => t.count >= TAG_INDEX_MIN_POSTS)
  const once = tags.filter((t) => t.count < TAG_INDEX_MIN_POSTS)

  return (
    <main className={`${styles.main} ${styles.wide}`}>
      <p className={styles.eyebrow}>/tags/{lng}</p>
      <h1 className={styles.title}>태그</h1>
      <p className={styles.lead}>태그 {tags.length}개 · 글이 많은 순</p>

      <section aria-labelledby="tags-often" className={styles.section}>
        <h2 id="tags-often" className={styles.sectionTitle}>
          글 2개 이상<span className={styles.sectionCount}>{often.length}</span>
        </h2>
        <ul className={styles.tagCloud}>
          {often.map((t) => (
            <li key={t.slug}>
              <Link href={t.href} className={styles.tagLink}>
                #{t.label} <span className={styles.tagCount}>{t.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {once.length > 0 && (
        <section aria-labelledby="tags-once" className={styles.section}>
          <h2 id="tags-once" className={styles.sectionTitle}>
            글 1개<span className={styles.sectionCount}>{once.length}</span>
          </h2>
          <ul className={styles.tagCloud}>
            {once.map((t) => (
              <li key={t.slug}>
                <Link href={t.href} className={styles.tagLink}>
                  #{t.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
