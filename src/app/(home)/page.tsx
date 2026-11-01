// PoC 상태판: 미리보기에서 확인할 글과 컴파일 결과를 한 화면에 보여 준다
import { allPosts } from 'content-collections'
import { releasedPosts } from '@/lib/content'

const CHECK = [
  { url: '/backend/ko/grpc/03-grpc-service-definition', why: '코드 블록 많음 (shiki 하이라이트)' },
  { url: '/frontend/ko/nextjs/seo/next-sitemap', why: 'sub 아래 한 단계 더 (5단 URL)' },
  { url: '/infra/ko/kubernetes/1-1.Introduction', why: 'slug에 점·대문자' },
  { url: '/infra/en/kubernetes/01.Introduction', why: '영어 글 → <html lang="en">' },
]

export default function Home() {
  const drafts = allPosts.filter((p) => !p.released)
  const mismatches = allPosts.filter((p) => p.frontmatterMismatch)
  const byCategory = new Map<string, number>()
  for (const p of releasedPosts) byCategory.set(`${p.category}/${p.lng}`, (byCategory.get(`${p.category}/${p.lng}`) ?? 0) + 1)

  return (
    <main>
      <h1>hanpy blog · Next 16 PoC</h1>
      <p className="meta">
        Next 16.4 · React 19 · Content Collections · 컴파일 {allPosts.length}개 (공개 {releasedPosts.length}, 비공개 {drafts.length})
      </p>

      <h2>확인할 글</h2>
      <table className="list">
        <tbody>
          {CHECK.map((c) => (
            <tr key={c.url}>
              <td><a href={c.url}>{c.url}</a></td>
              <td>{c.why}</td>
            </tr>
          ))}
          <tr>
            <td><a href="/backend/ko/base/__does-not-exist__">/backend/ko/base/__does-not-exist__</a></td>
            <td>없는 글 → 404</td>
          </tr>
        </tbody>
      </table>

      <h2>영역별 공개 글</h2>
      <table className="list">
        <tbody>
          {[...byCategory].map(([k, n]) => (
            <tr key={k}><td>{k}</td><td>{n}</td></tr>
          ))}
        </tbody>
      </table>

      {mismatches.length > 0 && (
        <>
          <h2>경로와 frontmatter가 다른 글 ({mismatches.length})</h2>
          <ul>{mismatches.map((p) => <li key={p.url}>{p.url} — {p.frontmatterMismatch}</li>)}</ul>
        </>
      )}

      <h2>전체 공개 글</h2>
      <ul>
        {releasedPosts
          .toSorted((a, b) => a.url.localeCompare(b.url))
          .map((p) => <li key={p.url}><a href={p.url}>{p.url}</a></li>)}
      </ul>
    </main>
  )
}
