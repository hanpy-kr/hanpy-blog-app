import { useMDXComponent } from 'next-contentlayer/hooks'

import { allInfras } from 'contentlayer/generated'

import { Roboto_Flex } from 'next/font/google'

import './page.css'
import BlogLayout from '@/app/(categories)/_components/BlogLayout'

const PREFIX_PATH = 'infra/ko/kubernetes'

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
})

export default function Page({ params }: { params: { slug: string } }) {
  const post = allInfras.find((p) => {
    console.log(p)
    return p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`
  })

  console.log(params.slug)
  console.log(post)
  if (!post) return <>안들어옴</>

  const MDXComponent = useMDXComponent(post.body.code)
  return (
    <div className={robotoFlex.className}>
      <BlogLayout type="infra" subType="docker">
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