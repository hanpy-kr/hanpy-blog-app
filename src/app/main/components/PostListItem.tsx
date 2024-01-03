import Link from "next/link";

import "./PostListItem.css";

interface PostListItemProps {
  post: {
    id: string;
    title: string;
    category: string;
    metaImage: string;
    metaDescription: string;
    createAt: string;
  };
}

function PostListItem({ post }: PostListItemProps) {
  return (
    <>
      <div className="post__card">
        {/* <Link href={`/${post?.category}/${post?.id}`}> */}
        <Link href={`#`}>
          <div className="post__image">
            {/* <img src={post.metaImage} alt={post.title} /> */}
          </div>
          <div className="post__title">{post.title}</div>
          <div className="post__description">{post.metaDescription}</div>
        </Link>
      </div>
    </>
  );
}

export default PostListItem;
