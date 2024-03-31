'use client'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import './PostList.css'
import AuthContext from '@/context/AuthContext'
import {
  // collection,
  deleteDoc,
  doc,
  // getDocs,
  // orderBy,
  // query,
  // where,
} from 'firebase/firestore'
import { db } from '@/utils/firebaseApp.lib'
import { CategoryType, PostListProps, PostProps, TabType } from '../types'
import { toast } from 'react-toastify'
import { CATEGORIES } from '../constants'
import contentlayer from '@/services-client/contentlayer'

export default function PostList({
  hasNavigation = true,
  defaultTab = 'all',
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(defaultTab)
  const [posts, setPosts] = useState<PostProps[]>([])
  const { user } = useContext(AuthContext)

  const getPosts = async () => {
    // const datas = await getDocs(collection(db, "posts"));

    // post 초기화안하면, 아래 로식에서 삭제해도 계속 추가 된다..
    setPosts([])

    // let postsRef = collection(db, 'posts')
    let postsQuery

    if (activeTab === 'my' && user) {
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
    } else if (activeTab === 'all') {
      // 모든 글 보여주기
      // postsQuery = query(postsRef, orderBy('createdAt', 'asc'))
      postsQuery = {
        category: 'all',
        type: 'meta',
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
      orderBy: 'publishedAt',
    }
    const datas = contentlayer.query(
      postsQuery as {
        category: 'all'
        type: 'meta' | 'content'
        orderBy: 'publishedAt'
      },
    )
    console.log('datas')
    console.log(datas)
    setPosts(datas)

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
  }, [activeTab])

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'post__navigation--active' : ''}
          >
            All
          </div>
          {/* <div
            role="presentation"
            onClick={() => setActiveTab('my')}
            className={activeTab === 'my' ? 'post__navigation--active' : ''}
          >
            나의 글
          </div> */}

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
      )}
      <div className="post__list">
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <div key={post?._id} className="post__box">
              <Link href={`/${post._raw.flattenedPath}`}>
                <div className="post__title-container">
                  <div className="post__title">{post?.title}</div>

                  <div className="post__profile-box">
                    {/* <div className="post__profile" /> */}
                    <div className="post__author-name">{post?.type}</div>
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
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  )
}
