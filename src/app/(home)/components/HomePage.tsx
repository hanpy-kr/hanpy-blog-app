'use client'

import { useContext } from 'react'
import Footer from './Footer'
import Header from './Header'
import PostList from './PostList'
import ThemeContext from '@/context/ThemeContext'
import MainInfo from './_MainInfo'
import CategoryList from './CategoryList'
import type { PostListItemSerialized } from '@/lib/posts-query'

export default function HomePage({
  initialPosts,
}: {
  initialPosts: PostListItemSerialized[]
}) {
  const context = useContext(ThemeContext)

  return (
    <>
      <div className={context.theme === 'light' ? 'white' : 'dark'}>
        <Header />
        <MainInfo />
        <CategoryList />
        <PostList initialPosts={initialPosts} />
        <Footer />
      </div>
    </>
  )
}
