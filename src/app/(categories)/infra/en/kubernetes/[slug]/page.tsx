import { useMDXComponent } from 'next-contentlayer/hooks'

import { allInfraForENGs } from 'contentlayer/generated'

import { Roboto_Flex } from 'next/font/google'

import './page.css'
import BlogLayout from '@/app/(categories)/_components/BlogLayout'
import Link from 'next/link'
import NotFoundContainer from '@/components/common/NotFoundContainer'
import { InfraCategory } from '@/data/const/infra'

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
})

const SUB_TITLE = InfraCategory.KUBERNETES
const PREFIX_PATH = 'infra/en/kubernetes'

export default function Page({ params }: { params: { slug: string } }) {
  const post = allInfraForENGs.find((p) => {
    return p._raw.flattenedPath === `${PREFIX_PATH}/${params.slug}`
  })

  if (!post) return <NotFoundContainer />

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

// TODO : 최적화 비교 필요
// TODO : func. 분리 > co-locate
// https://www.yujiseok.blog/post/create-blog-with-nextjs

// app/posts/[slug]/page.tsx
// import { format, parseISO } from "date-fns";
// import { allPosts } from "contentlayer/generated";
// import { useMDXComponent } from "next-contentlayer/hooks";

// export const generateStaticParams = async () =>
//   allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

// export const generateMetadata = ({ params }: { params: { slug: string } }) => {
//   const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
//   if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
//   return { title: post.title };
// };

// const PostLayout = ({ params }: { params: { slug: string } }) => {
//   const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
//   if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

//   return (
//     <article className="mx-auto max-w-xl py-8">
//       <div className="mb-8 text-center">
//         <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
//           {format(parseISO(post.date), "LLLL d, yyyy")}
//         </time>
//         <h1 className="text-3xl font-bold">{post.title}</h1>
//       </div>
//       <div
//         className="[&>*]:mb-3 [&>*:last-child]:mb-0"
//         dangerouslySetInnerHTML={{ __html: post.body.html }}
//       />
//     </article>
//   );
// };

// export default PostLayout;
