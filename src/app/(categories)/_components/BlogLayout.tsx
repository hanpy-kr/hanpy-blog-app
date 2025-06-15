import Header from '@/app/(home)/components/Header'
import Footer from '@/app/(home)/components/Footer'
import './BlogLayout.css'
import BlogLNBTitle from './BlogLNBTitle'
import { CATEGORY_TYPE, SUB_CATEGORY_TYPE } from '../types'

const BlogLayout = ({
  children,
  type,
  subType, // kubernetes / docker
}: {
  children: React.ReactNode
  type: CATEGORY_TYPE
  subType: SUB_CATEGORY_TYPE
}) => {
  return (
    <>
      <Header />
      <section className="blog__container">
        <section className="blog__NLB__container">
          <BlogLNBTitle type={type} subType={subType} />
        </section>
        <section className="blog__content__container">{children}</section>
      </section>
      <Footer />
    </>
  )
}

export default BlogLayout
