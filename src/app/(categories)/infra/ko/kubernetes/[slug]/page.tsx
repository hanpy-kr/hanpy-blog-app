import { useMDXComponent } from 'next-contentlayer/hooks'

import { allInfraForKORs } from 'contentlayer/generated'

import { Roboto_Flex } from 'next/font/google'

import './page.css'
import BlogLayout from '@/app/(categories)/_components/BlogLayout'
import useI18N from '@/hooks/useI18N'
import Link from 'next/link'

const PREFIX_PATH = 'infra/ko/kubernetes'
const SUB_TITLE = 'kubernetes'

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
})

export default function Page({ params }: { params: { slug: string } }) {
  const post = allInfraForKORs.find((p) => {
    console.log(p)
    return p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`
  })

  if (!post)
    return (
      <div>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    )

  const MDXComponent = useMDXComponent(post.body.code)
  return (
    <div className={robotoFlex.className}>
      <BlogLayout type="infra" subType={SUB_TITLE}>
        <div className="infra__content">
          <p className="infra__header">Kubernetes</p>
          {/* My Post: {params.slug} */}
          <MDXComponent />
        </div>
        {/* </section> */}
      </BlogLayout>
    </div>
  )
}
