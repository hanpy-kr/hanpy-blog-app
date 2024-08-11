import { useMDXComponent } from 'next-contentlayer/hooks'

import { allBackends } from 'contentlayer/generated'

import Link from 'next/link'
const PREFIX_PATH = 'backend'

export default function Page({ params }: { params: { slug: string } }) {
  const post = allBackends.find(
    (p) => p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`,
  )

  if (!post)
    return (
      <div>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    )

  const MDXComponent = useMDXComponent(post.body.code)
  return (
    <div>
      My Post: {params.slug}
      <MDXComponent />
    </div>
  )
}
