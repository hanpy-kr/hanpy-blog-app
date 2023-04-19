import { useMDXComponent } from 'next-contentlayer/hooks'

import { allBackends } from 'contentlayer/generated'

const PREFIX_PATH = 'backend'

export default function Page({ params }: { params: { slug: string } }) {
  const post = allBackends.find(
    (p) => p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`,
  )

  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  const MDXComponent = useMDXComponent(post.body.code)
  return (
    <div>
      My Post: {params.slug}
      <MDXComponent />
    </div>
  )
}
