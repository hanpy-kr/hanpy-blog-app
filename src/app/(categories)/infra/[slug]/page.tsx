import { useMDXComponent } from 'next-contentlayer/hooks'

import { allInfras } from 'contentlayer/generated'
import BlogLayout from '../../_components/BlogLayout'

import { Roboto_Flex } from 'next/font/google'

import './page.css'

const PREFIX_PATH = 'infra'

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
})

export default function Page({ params }: { params: { slug: string } }) {
  const post = allInfras.find(
    (p) => p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`,
  )

  const MDXComponent = useMDXComponent(post.body.code)
  return (
    <div className={robotoFlex.className}>
      <BlogLayout type="infra" subType="docker">
        <div className="infra__content">
          <p className="infra__header">Infra</p>
          My Post: {params.slug}
          <MDXComponent />
        </div>
        {/* </section> */}
      </BlogLayout>
    </div>
  )
}
