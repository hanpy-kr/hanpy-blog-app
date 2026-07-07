import Link from 'next/link'
import Footer from '../components/Footer'
import Header from '../components/Header'
import {
  isReleasedPost,
  queryPostsMeta,
} from '@/lib/posts-query'

const PAGE_SIZE = 15

export default function PostsArchivePage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10) || 1)
  const all = queryPostsMeta({
    category: 'All',
    currentLng: 'ko',
    orderBy: 'publishedAt',
  }).filter(isReleasedPost)
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE))
  const current = Math.min(page, totalPages)
  const slice = all.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  return (
    <>
      <Header />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem' }}>
        <h1 style={{ marginBottom: '1.5rem' }}>전체 글</h1>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {slice.map((post) => (
            <li key={post._id} style={{ marginBottom: '1.25rem' }}>
              <Link href={`/${post._raw.flattenedPath}`}>
                <strong>{post.title}</strong>
              </Link>
              <div style={{ fontSize: '0.9rem', opacity: 0.85 }}>
                {post.category} · {post.publishedAt}
              </div>
              <p style={{ margin: '0.35rem 0 0' }}>{post.summary}</p>
            </li>
          ))}
        </ul>
        <nav
          style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem',
            justifyContent: 'center',
          }}
        >
          {current > 1 ? (
            <Link href={`/posts?page=${current - 1}`}>이전</Link>
          ) : null}
          <span>
            {current} / {totalPages}
          </span>
          {current < totalPages ? (
            <Link href={`/posts?page=${current + 1}`}>다음</Link>
          ) : null}
        </nav>
        <p style={{ marginTop: '2rem' }}>
          <Link href="/">홈으로</Link>
        </p>
      </main>
      <Footer />
    </>
  )
}
