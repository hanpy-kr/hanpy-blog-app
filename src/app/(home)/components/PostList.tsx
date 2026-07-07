'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import './PostList.css'
import { CategoryType, PostListProps } from '../types'
import { CATEGORIES } from '../constants'
import type { PostListItemSerialized } from '@/lib/posts-query'
import { useRecoilValue } from 'recoil'
import { withChanged } from '@/recoil/i18n'
import { Tag } from '@chakra-ui/react'

export default function PostList({
  hasNavigation = true,
  defaultTab = 'All',
  initialPosts = [],
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<CategoryType>(defaultTab)
  const [posts, setPosts] = useState<PostListItemSerialized[]>(initialPosts)
  const currentLng = useRecoilValue(withChanged)

  const loadPosts = useCallback(async () => {
    const qs = new URLSearchParams({
      category: activeTab,
      lng: currentLng.lng,
      limit: '10',
    })
    const res = await fetch(`/api/posts?${qs.toString()}`)
    if (!res.ok) return
    const data = (await res.json()) as { posts: PostListItemSerialized[] }
    setPosts(data.posts)
  }, [activeTab, currentLng.lng])

  useEffect(() => {
    void loadPosts()
  }, [loadPosts])

  return (
    <>
      {hasNavigation && (
        <section className="post__Navigation__container">
          <Tag size={'lg'} key={'lg'} variant="outline" colorScheme="gray">
            Recently Published Blogs
          </Tag>
          <div className="post__navigation">
            {CATEGORIES?.map((category) => (
              <div
                key={category}
                role="presentation"
                onClick={() => setActiveTab(category)}
                className={
                  activeTab === category ? 'post__navigation--active' : ''
                }
              >
                {category}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="post__list">
        {posts?.length > 0 ? (
          <>
            {posts.map((post) => {
              if (!post.deployment) return null
              return (
                <div key={post._id} className="post__box">
                  <Link href={`/${post._raw.flattenedPath}`}>
                    <div className="post__title-container">
                      <div className="post__title">{post.title}</div>
                      <div className="post__profile-box">
                        <div className="post__author-name">{post.category}</div>
                      </div>
                    </div>
                    <div className="post__text">{post.summary}</div>
                  </Link>
                </div>
              )
            })}
            <div className="post__more-wrap" style={{ marginTop: '1rem' }}>
              <Link href="/posts" className="post__more-link">
                더 보기 (전체 목록)
              </Link>
            </div>
          </>
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  )
}
