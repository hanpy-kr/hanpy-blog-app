import { useMDXComponent } from 'next-contentlayer/hooks'

import { allDesignForKORs } from 'contentlayer/generated'

import { Roboto_Flex } from 'next/font/google'

import './page.css'
import BlogLayout from '@/app/(categories)/_components/BlogLayout'

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
})

const SUB_TITLE = 'pattern'
const PREFIX_PATH = `design/ko/${SUB_TITLE}`

export default function Page({ params }: { params: { slug: string } }) {
  const post = allDesignForKORs.find(
    (p) => p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`,
  )

  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  const MDXComponent = useMDXComponent(post.body.code)
  return (
    <div className={robotoFlex.className}>
      <BlogLayout type="design" subType={SUB_TITLE}>
        <div className="frontend__content">
          <p className="frontend__header">{SUB_TITLE}</p>

          <MDXComponent />
        </div>
        {/* </section> */}
      </BlogLayout>
    </div>
  )
}
