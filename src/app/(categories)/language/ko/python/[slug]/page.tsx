import { useMDXComponent } from 'next-contentlayer/hooks'

import { allLanguageForKORs } from 'contentlayer/generated'

import { Roboto_Flex } from 'next/font/google'

import './page.css'
import BlogLayout from '@/app/(categories)/_components/BlogLayout'
import Link from 'next/link'
import NotFoundContainer from '@/components/common/NotFoundContainer'
import { LanguageCategory } from '@/app/(categories)/types'
import { Metadata } from 'next'

const SUB_TITLE = LanguageCategory.PYTHON
const PREFIX_PATH = `language/ko/${SUB_TITLE}`

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
})

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const slug = (await params).slug

  const post = allLanguageForKORs.find((p) => {
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
  const post = allLanguageForKORs.find((p) => {
    return p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`
  })

  if (!post) return <NotFoundContainer />

  const MDXComponent = useMDXComponent(post.body.code)

  return (
    <div className={robotoFlex.className}>
      <BlogLayout type="language" subType={SUB_TITLE}>
        <div className="infra__content">
          <p className="infra__header">{SUB_TITLE}</p>
          {/* My Post: {params.slug} */}
          <MDXComponent />
        </div>
        {/* </section> */}
      </BlogLayout>
    </div>
  )
}
