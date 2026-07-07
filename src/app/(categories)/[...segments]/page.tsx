import BlogLayout from '@/app/(categories)/_components/BlogLayout'
import BlogMdxBody from '@/app/(categories)/_components/BlogMdxBody'
import {
  getAlternateLanguagePaths,
  findPostByFlattenedPath,
} from '@/lib/blog-documents'
import { resolveBlogRouteRule } from '@/lib/blog-route-rules'
import { isReleasedPost } from '@/lib/posts-query'
import { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'
import { notFound } from 'next/navigation'
import './page.css'

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
})

type PageParams = { segments: string[] }

export async function generateStaticParams(): Promise<PageParams[]> {
  const { getAllDocumentsFlat } = await import('@/lib/blog-documents')
  return getAllDocumentsFlat()
    .filter(isReleasedPost)
    .filter((d) => resolveBlogRouteRule(d._raw.flattenedPath))
    .map((d) => ({
      segments: d._raw.flattenedPath.split('/'),
    }))
}

export async function generateMetadata({
  params,
}: {
  params: PageParams
}): Promise<Metadata> {
  const flat = params.segments.join('/')
  const post = findPostByFlattenedPath(flat)
  if (!post)
    return {
      title: 'Not found',
    }

  const canonicalPath = `/${flat}`
  const languages = getAlternateLanguagePaths(post.pageKey, flat)

  return {
    title: post.title,
    description: post.summary,
    applicationName: 'hanpy blog',
    keywords: post.tags,
    alternates: {
      canonical: canonicalPath,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: canonicalPath,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  }
}

export default function BlogPostPage({ params }: { params: PageParams }) {
  const flat = params.segments.join('/')
  const post = findPostByFlattenedPath(flat)
  const rule = resolveBlogRouteRule(flat)

  if (!post || !rule) notFound()

  const headerLabel = String(rule.subType)
  const useInfraSkin = rule.contentSkin === 'infra'

  return (
    <div className={robotoFlex.className}>
      <BlogLayout type={rule.type} subType={rule.subType}>
        {useInfraSkin ? (
          <div className="infra__content">
            <p className="infra__header">{headerLabel}</p>
            <BlogMdxBody code={post.body.code} />
          </div>
        ) : (
          <div className="frontend__content">
            <p className="frontend__header">{headerLabel}</p>
            <BlogMdxBody code={post.body.code} />
          </div>
        )}
      </BlogLayout>
    </div>
  )
}
