'use client'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import './PostList.css'
// import AuthContext from '@/context/AuthContext'
// import {
//   // collection,
//   deleteDoc,
//   doc,
//   // getDocs,
//   // orderBy,
//   // query,
//   // where,
// } from 'firebase/firestore'
// import { db } from '@/utils/firebaseApp.lib'
import { CategoryType, PostListProps, PostProps } from '../types'
// import { toast } from 'react-toastify'
import { CATEGORIES } from '../constants'
import contentlayer from '@/services-client/contentlayer'
import { useRecoilValue } from 'recoil'
import { withChanged } from '@/recoil/i18n'
import useI18N from '@/hooks/useI18N'

export default function PostList({
  hasNavigation = true,
  defaultTab = 'All',
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<CategoryType>(defaultTab)
  const [activeLng, setActiveLng] = useState('ko')
  const [posts, setPosts] = useState<PostProps[]>([])
  // const { user } = useContext(AuthContext)
  const currentLng = useRecoilValue(withChanged)

  const { changeI18N } = useI18N()
  // if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  const getPosts = async () => {
    // const datas = await getDocs(collection(db, "posts"));

    // post 초기화안하면, 아래 로식에서 삭제해도 계속 추가 된다..
    setPosts([])

    // let postsRef = collection(db, 'posts')
    let postsQuery: {
      category: CategoryType
      type: 'meta' | 'content'
      currentLng: string
      orderBy: 'publishedAt'
    }

    if (activeTab === 'my' && false) {
      // 나의 글만 필터링
      /**
       * 아래와 같이 복합 인덱스(uid와 createdAt)를 쓰게 되면, 색인추가를 해줘야한다. 이는 console에 경고창따라 들어가면 설정 가능하다.
       * 아래와 같은 경우는 uid와 createAt 관련 되서 색인추가하라고 뜬다.
       */
      // postsQuery = query(
      //   postsRef,
      //   where('uid', '==', user.uid),
      //   orderBy('createdAt', 'asc'),
      // )
    } else if (activeTab === 'All') {
      // 모든 글 보여주기
      // postsQuery = query(postsRef, orderBy('createdAt', 'asc'))
      postsQuery = {
        category: 'All',
        type: 'meta',
        currentLng: currentLng.lng,
        orderBy: 'publishedAt',
      }
    } else {
      // 카테고리 글 보여주기
      // postsQuery = query(
      //   postsRef,
      //   where('category', '==', activeTab),
      //   orderBy('createdAt', 'asc'),
      // )
    }
    postsQuery = {
      category: activeTab,
      type: 'meta',
      currentLng: currentLng.lng,
      orderBy: 'publishedAt',
    }
    const datas = contentlayer.query(postsQuery)

    // datas 에서 우선 10개 필터를 한다.
    // 10개중에 deployment가 false인 부분은 ui 부분에서 필터 된다.
    setPosts(datas.slice(0, 10))

    // datas?.forEach((doc) => {
    //   const dataObj = { ...doc.data(), id: doc.id } // data를 모드 가져오고, id는 id로 합쳐준다.
    //   setPosts((prev) => [...prev, dataObj as PostProps]) // 이전 데이터를 추가하고, 마지막에 추가된 데이터도 같이 넣어준다.
    // })
  }

  const handleDelete = async (id: string) => {
    // const confirm = window.confirm('해당 게시글을 삭제하시겠습니까?')
    // if (confirm && id) {
    //   await deleteDoc(doc(db, 'posts', id))
    //   toast.success('게시글을 삭제했습니다.')
    //   getPosts() // 변경된 post 리스트를 다시 가져옴
    // }
  }

  /**
   * mount 시 마다 데이터를 새롭게 가져온다.
   */
  useEffect(() => {
    getPosts()
    setActiveLng(currentLng.lng)
  }, [activeTab, currentLng.lng])

  return (
    <>
      {hasNavigation && (
        <section className="post__Navigation__container">
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
          <div className="post__lng">
            <div
              className={activeLng === 'en' ? 'post__lng--active' : ''}
              onClick={() => changeI18N('en')}
            >
              en
            </div>
            <div
              className={activeLng === 'ko' ? 'post__lng--active' : ''}
              onClick={() => changeI18N('ko')}
            >
              ko
            </div>
          </div>
        </section>
      )}
      <div className="post__list">
        {posts?.length > 0 ? (
          posts?.map((post) => {
            if (!post.deployment) return
            return (
              <div key={post?._id} className="post__box">
                <Link href={`/${post._raw.flattenedPath}`}>
                  <div className="post__title-container">
                    <div className="post__title">{post?.title}</div>

                    <div className="post__profile-box">
                      {/* <div className="post__profile" /> */}
                      <div className="post__author-name">{post?.category}</div>
                      <div className="post__date">{post?.publishedAt}</div>
                    </div>
                  </div>
                  <div className="post__text">{post?.summary}</div>
                </Link>
                {/* {post?.email === user?.email && (
                <div className="post__utils-box">
                  <div
                    className="post__delete"
                    role="presentation"
                    onClick={() => handleDelete(post.id as string)}
                  >
                    삭제
                  </div>
                  <Link href={`/posts/edit/${post?.id}`} className="post__edit">
                    수정
                  </Link>
                </div>
              )} */}
              </div>
            )
          })
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  )
}
