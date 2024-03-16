import Link from "next/link";
import "./PostList.css";
import PostListItem from "./PostListItem";

const posts = [
  {
    id: "react-setup", // 유니크한 값 + 상세 페이지 주소
    title: "react optimization 1. font",
    category: "react",
    subCategory: "optimization",
    metaImage: "",
    metaDescription: "How to Use Font Asset",
    createAt: "",
  },
  {
    id: "react-test2", // 유니크한 값 + 상세 페이지 주소
    title: "2번 타이틀",
    category: "react",
    metaImage: "aef",
    metaDescription: "2번 타이틀 내용",
    createAt: "",
  },
  {
    id: "react-test2", // 유니크한 값 + 상세 페이지 주소
    title: "2번 타이틀",
    category: "react",
    metaImage: "",
    metaDescription: "2번 타이틀 내용",
    createAt: "",
  },
  {
    id: "react-test2", // 유니크한 값 + 상세 페이지 주소
    title: "2번 타이틀",
    category: "react",
    metaImage: "",
    metaDescription: "2번 타이틀 내용",
    createAt: "",
  },
  {
    id: "react-test2", // 유니크한 값 + 상세 페이지 주소
    title: "2번 타이틀",
    category: "react",
    metaImage: "",
    metaDescription: "2번 타이틀 내용",
    createAt: "",
  },
];

function PostList({ title }: { title?: React.ReactNode }) {
  return (
    <>
      {/* // 섹션 추가 */}
      {title !== null ? <div className="post__title">{title}</div> : null}
      <div className="post__list">
        {posts?.length > 0 ? (
          posts?.map((post) => <PostListItem post={post} />)
        ) : (
          <div className="post__no-post">There are no posts.</div>
        )}
      </div>
    </>
  );
}

export default PostList;

// ```
// For example, a blog could include the following route app/blog/[slug]/page.js where [slug] is the Dynamic Segment for blog posts.

// app/blog/[slug]/page.tsx

// TypeScript

// export default function Page({ params }: { params: { slug: string } }) {
//   return <div>My Post: {params.slug}</div>
// }
// ```;
