import { getHomeInitialPostsMeta } from '@/lib/posts-query'
import HomePage from './components/HomePage'

export default async function Page() {
  const initialPosts = getHomeInitialPostsMeta(10)
  return <HomePage initialPosts={initialPosts} />
}
