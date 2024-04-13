import { useMDXComponent } from 'next-contentlayer/hooks'

import { allFrontends } from 'contentlayer/generated'

import './page.css'
import BlogLayout from '@/app/(categories)/_components/BlogLayout'

const PREFIX_PATH = 'frontend/ko/nextjs/seo'

export default function Page({ params }: { params: { slug: string } }) {
  const post = allFrontends.find(
    (p) => p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`,
  )
  if (!post) return <>안들어옴</>

  const MDXComponent = useMDXComponent(post.body.code)
  return (
    <BlogLayout type="frontend" subType="docker">
      <div className="frontend__content">
        <p className="frontend__header">nextjs</p>

        <MDXComponent />
      </div>
      {/* </section> */}
    </BlogLayout>
  )
}
