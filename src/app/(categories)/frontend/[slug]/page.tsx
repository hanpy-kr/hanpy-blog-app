import { useMDXComponent } from 'next-contentlayer/hooks'

import { allFrontends } from 'contentlayer/generated'

import './page.css'
import BlogLayout from '../../_components/BlogLayout'

const PREFIX_PATH = 'frontend'

export default function Page({ params }: { params: { slug: string } }) {
  const post = allFrontends.find(
    (p) => p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`,
  )

  const MDXComponent = useMDXComponent(post.body.code)
  return (
    <BlogLayout type="frontend" subType="docker">
      <div className="frontend__content">
        <h1
        // style={{
        //   fontWeight: 200,
        // }}
        >
          Singleton Pattern
        </h1>
        My Post: {params.slug}
        <MDXComponent />
      </div>
      {/* </section> */}
    </BlogLayout>
  )
}
