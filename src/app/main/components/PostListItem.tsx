"use client";

import Link from "next/link";
// import defaultImage from "../../../assets/hanpy.jpeg";
import defaultImage from "hanpy.jpeg";

import "./PostListItem.css";
import { SyntheticEvent, useRef } from "react";
import Image from "next/image";

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
  const imgRef = useRef<any>();
  return (
    <>
      <div className="post__card">
        {/* <Link href={`/${post?.category}/${post?.id}`}> */}
        <Link href={`#`} className="post_link">
          {/* <div className="post__image"></div> */}
          <img
            ref={imgRef}
            className="post__image"
            src={post.metaImage.length !== 0 ? post.metaImage : "hanpy.jpeg"}
            alt={post.title}
            // onError={() => (this.style.visibility = "hidden")}
            // onError="hanpy.jpeg"
            // onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
            //   e.currentTarget.src = "/hanpy.jpeg";
            // }}
          />
          {/* <Image
            src={post.metaImage.length !== 0 ? post.metaImage : "hanpy.jpeg"}
          /> */}

          <h3 className="post__title">{post.title}</h3>
          <div className="post__description">{post.metaDescription}</div>
        </Link>
      </div>
    </>
  );
}

export default PostListItem;
