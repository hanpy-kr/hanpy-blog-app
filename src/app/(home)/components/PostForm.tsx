'use client'

import { useContext, useEffect, useState } from 'react'
import './PostForm.css'
import AuthContext from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

// import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
// import { db } from '@/utils/firebaseApp.lib'
import { toast } from 'react-toastify'
import { CategoryType, PostProps } from '../types'
import { CATEGORIES } from '../constants'

export default function PostForm() {
  const params: { id: string } = useParams()
  const [post, setPost] = useState<any | null>(null)

  // 현재 user 가 안들어와서 추가가 안되는거다!!!
  // const { user } = useContext(AuthContext)
  const [title, setTitle] = useState<string>('')
  const [summary, setSummary] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [category, setCategory] = useState<CategoryType>('Frontend')
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // firestore 저장
      if (post && post?.id) {
        // 만약 post 데이터가 있다면, firestore로 데이터 수정
        // const postRef = doc(db, 'posts', post?.id)
        // await updateDoc(postRef, {
        //   title: title,
        //   summary: summary,
        //   content: content,
        //   // 한국 기준으로 시간 분 초까지 추가한다.
        //   updatedAt: new Date()?.toLocaleDateString('ko', {
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     second: '2-digit',
        //   }),
        //   category: category,
        // })

        toast?.success('게시글을 수정했습니다.')
        router.push(`/posts/${post.id}`)
      } else {
        console.log({
          title: title,
          summary: summary,
          content: content,
          // 한국 기준으로 시간 분 초까지 추가한다.
          createdAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          // email: user?.email,
          // uid: user?.uid, // firebase의 고유한 부분을 추가로 넣어준다.
          category: category,
        })

        // firestore로 데이터 생성
        // await addDoc(collection(db, 'posts'), {
        //   title: title,
        //   summary: summary,
        //   content: content,
        //   // 한국 기준으로 시간 분 초까지 추가한다.
        //   createdAt: new Date()?.toLocaleDateString('ko', {
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     second: '2-digit',
        //   }),
        //   email: user?.email,
        //   uid: user?.uid, // firebase의 고유한 부분을 추가로 넣어준다.
        //   category: category,
        // })

        toast?.success('게시글을 생성했습니다.')
        router.push('/')
      }
    } catch (e: any) {
      console.log(e)
      toast.error(e?.code)
    }
  }

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const {
      target: { name, value },
    } = e

    if (name === 'title') {
      setTitle(value)
    }

    if (name === 'summary') {
      setSummary(value)
    }

    if (name === 'content') {
      setContent(value)
    }

    if (name === 'category') {
      setCategory(value as CategoryType)
    }
  }

  const getPost = async (id: string) => {
    // if (id) {
    //   const docRef = doc(db, 'posts', id)
    //   const docSnap = await getDoc(docRef)
    //   setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) })
    // }
  }

  useEffect(() => {
    if (params?.id) getPost(params?.id)
  }, [params?.id])

  // 수정할 데이터가 있다면 아래와 같이 넣어주는 것이다
  useEffect(() => {
    if (post) {
      setTitle(post?.title)
      setSummary(post?.summary)
      setContent(post?.content)
      setCategory(post?.category as CategoryType)
    }
  }, [post])

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="category">카테고리</label>
        <select
          name="category"
          id="category"
          onChange={onChange}
          defaultValue={category}
        >
          <option value="">카테고리를 선택해주세요</option>
          {CATEGORIES?.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={onChange}
          value={title}
        />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          required
          onChange={onChange}
          value={summary}
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          required
          onChange={onChange}
          value={content}
        />
      </div>
      <div className="form__block">
        <input
          type="submit"
          value={post ? '수정' : '제출'}
          className="form__btn--submit"
        />{' '}
      </div>
    </form>
  )
}
