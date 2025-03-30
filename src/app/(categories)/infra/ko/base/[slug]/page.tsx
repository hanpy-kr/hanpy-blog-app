import { useMDXComponent } from 'next-contentlayer/hooks'

import { allInfraForKORs } from 'contentlayer/generated'

import { Roboto_Flex } from 'next/font/google'

import './page.css'
import BlogLayout from '@/app/(categories)/_components/BlogLayout'
import useI18N from '@/hooks/useI18N'
import Link from 'next/link'
import NotFoundContainer from '@/components/common/NotFoundContainer'
import { InfraCategory } from '@/data/const/infra'

const SUB_TITLE = InfraCategory.BASE
const PREFIX_PATH = `infra/ko/${SUB_TITLE}`

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
})

export default function Page({ params }: { params: { slug: string } }) {
  const post = allInfraForKORs.find((p) => {
    return p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`
  })

  if (!post) return <NotFoundContainer />

  const MDXComponent = useMDXComponent(post.body.code)
  return (
    <div className={robotoFlex.className}>
      <BlogLayout type="infra" subType={SUB_TITLE}>
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
