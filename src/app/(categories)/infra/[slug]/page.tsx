import { useMDXComponent } from 'next-contentlayer/hooks'

import { allInfras } from 'contentlayer/generated'

const PREFIX_PATH = 'infra'

export default function Page({ params }: { params: { slug: string } }) {
  const post = allInfras.find(
    (p) => p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`,
  )

  const MDXComponent = useMDXComponent(post.body.code)
  return (
    <div>
      My Post: {params.slug}
      <MDXComponent />
    </div>
  )
}
