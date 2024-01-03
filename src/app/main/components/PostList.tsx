import Link from "next/link";
import "./PostList.css";
import PostListItem from "./PostListItem";

const posts = [
  {
    id: "react-test", // 유니크한 값 + 상세 페이지 주소
    title: "1번 타이틀",
    category: "react",
    metaImage: "test",
    metaDescription: "1번 타이틀 내용",
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
