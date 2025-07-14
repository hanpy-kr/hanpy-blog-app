import { useMDXComponent } from 'next-contentlayer/hooks'

import { allFrontendForKORs } from 'contentlayer/generated'

import { Roboto_Flex } from 'next/font/google'

import './page.css'
import BlogLayout from '@/app/(categories)/_components/BlogLayout'
import Link from 'next/link'
import NotFoundContainer from '@/components/common/NotFoundContainer'
import { FrontendCategory } from '@/app/(categories)/types'
import { Metadata } from 'next'

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
})

const SUB_TITLE = FrontendCategory.NEXTJS
const PREFIX_PATH = `frontend/ko/${SUB_TITLE}/seo`

export async function generateMetadata(
  { params }: {
    params: Promise<{ slug: string }>
  },
): Promise<Metadata> {
  const slug = (await params).slug

  const post = allFrontendForKORs.find((p) => {
    console.log(p.summary)
    return p._raw.flattenedPath === `${PREFIX_PATH}/${slug}`
  })
 
  return {
    title: post?.title,
    description: post?.summary,
    applicationName: 'hanpy blog',
    keywords: post?.tags,
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = allFrontendForKORs.find(
    (p) => p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`,
  )

  if (!post) return <NotFoundContainer />

  const MDXComponent = useMDXComponent(post.body.code)
  return (
    <div className={robotoFlex.className}>
      <BlogLayout type="frontend" subType={SUB_TITLE}>
        <div className="frontend__content">
          <p className="frontend__header">{SUB_TITLE}</p>

          <MDXComponent />
        </div>
        {/* </section> */}
      </BlogLayout>
    </div>
  )
}
