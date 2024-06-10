import { useMDXComponent } from 'next-contentlayer/hooks'

import { allFrontendForKORs } from 'contentlayer/generated'

import { Roboto_Flex } from 'next/font/google'

import './page.css'
import BlogLayout from '@/app/(categories)/_components/BlogLayout'

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
})

const PREFIX_PATH = 'frontend/ko/utils'

export default function Page({ params }: { params: { slug: string } }) {
  const post = allFrontendForKORs.find(
    (p) => p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`,
  )

  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  const MDXComponent = useMDXComponent(post.body.code)
  return (
    <div className={robotoFlex.className}>
      <BlogLayout type="frontend" subType="docker">
        <div className="frontend__content">
          <p className="frontend__header">nextjs</p>

          <MDXComponent />
        </div>
        {/* </section> */}
      </BlogLayout>
    </div>
  )
}
