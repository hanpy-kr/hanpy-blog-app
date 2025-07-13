// https://nextjs.org/docs/app/getting-started/metadata-and-og-images#memoizing-data-requests

import { useMDXComponent } from 'next-contentlayer/hooks'

import { allDesignForKORs } from 'contentlayer/generated'

import { Roboto_Flex } from 'next/font/google'

import './page.css'
import BlogLayout from '@/app/(categories)/_components/BlogLayout'
import Link from 'next/link'
import NotFoundContainer from '@/components/common/NotFoundContainer'
import { DesignCategory } from '@/app/(categories)/types'
import { Metadata } from 'next'

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
})

const SUB_TITLE = DesignCategory.PATTERN
const PREFIX_PATH = `design/ko/${SUB_TITLE}`

export async function generateMetadata(
  { params }: {
    params: Promise<{ slug: string }>
  },
): Promise<Metadata> {
  const slug = (await params).slug

  const post = allDesignForKORs.find((p) => {
    console.log(p.summary)
    return p._raw.flattenedPath === `${PREFIX_PATH}/${slug}`
  })
 
  return {
    title: post?.title,
    description: post?.summary,
    applicationName: 'hanpy blog'
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = allDesignForKORs.find(
    (p) => p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`,
  )

  // if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  if (!post) return <NotFoundContainer />

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
