'use client'

import { useMDXComponent } from 'next-contentlayer/hooks'

export default function BlogMdxBody({ code }: { code: string }) {
  const MDXComponent = useMDXComponent(code)
  return <MDXComponent />
}
