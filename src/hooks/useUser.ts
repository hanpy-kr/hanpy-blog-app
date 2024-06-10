// import { app } from "@/utils/firebaseApp.lib";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react'
import Router from 'next/router'

/**
 * 로그인 되었을 때, login/signup 페이지 들어가면, 자연스럽게 root페이지로 이동하는 부분 추가를 하자.
 */

export default function useUser({ redirectTo = '', redirectIfFound = false }) {
  // const { data: user, mutate: mutateUser } = useSWR<User>('/api/user')
  // const auth = getAuth(app)

  // auth를 체크하기 전에 (initialize 전)에는 loader를 띄워주는 용도
  // 아래 쓴 이유는 로그인 체크 전에 로그인 화면이 초기에 잠깐 뜬다.
  const [init, setInit] = useState<boolean>(false)
  // auth의 currentUser가 있으면 authenticated로 변경
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
  //   !!auth?.currentUser,
  // )

  /**
   * firebase onAuthStateChanged
   * auth 가 처음에는 undefined 이고, onAuthStateChanged를 관찰자로 auth 변경시 업데이트를 하자.
   */
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setIsAuthenticated(true)
  //     } else {
  //       setIsAuthenticated(false)
  //       Router.push(redirectTo)
  //     }
  //     setInit(true)
  //   })
  // }, [auth, redirectIfFound, redirectTo])

  // useEffect(() => {
  //   // if no redirect needed, just return (example: already on /dashboard)
  //   // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
  //   if (!redirectTo || !user) return;

  //   if (
  //     // If redirectTo is set, redirect if the user was not found.
  //     (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
  //     // If redirectIfFound is also set, redirect if the user was found
  //     (redirectIfFound && user?.isLoggedIn)
  //   ) {
  //     Router.push(redirectTo);
  //   }
  // }, [user, redirectIfFound, redirectTo]);

  // return { user, mutateUser };
}
