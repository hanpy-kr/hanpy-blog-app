import Header from '@/app/(home)/components/Header'
import './BlogLayout.css'
import BlogLNBTitle from './BlogLNBTitle'

const BlogLayout = ({
  children,
  type,
  subType, // kubernetes / docker
}: {
  children: React.ReactNode
  type: 'frontend' | 'backend' | 'infra' | 'design'
  subType: 'kubernetes' | 'docker' | 'utils' | 'pattern'
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
    </>
  )
}

export default BlogLayout
