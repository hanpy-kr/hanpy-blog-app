import { useMDXComponent } from 'next-contentlayer/hooks'

import { allBackendForKORs } from 'contentlayer/generated'

import { Roboto_Flex } from 'next/font/google'

import './page.css'
import BlogLayout from '@/app/(categories)/_components/BlogLayout'
import Link from 'next/link'
import NotFoundContainer from '@/components/common/NotFoundContainer'
import { BackendCategory } from '@/app/(categories)/types'

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
})

const SUB_TITLE = BackendCategory.DATABASE
const PREFIX_PATH = `backend/ko/${SUB_TITLE}`

export default function Page({ params }: { params: { slug: string } }) {
  const post = allBackendForKORs.find(
    (p) => p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`,
  )

  if (!post) return <NotFoundContainer />

  const MDXComponent = useMDXComponent(post.body.code)
  return (
    <div className={robotoFlex.className}>
      <BlogLayout type="backend" subType={SUB_TITLE}>
        <div className="frontend__content">
          <p className="frontend__header">{SUB_TITLE}</p>

          <MDXComponent />
        </div>
        {/* </section> */}
      </BlogLayout>
    </div>
  )
}
