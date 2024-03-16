import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";

function PostPage() {
  console.log("allPosts");
  console.log(allPosts);
  // console.log(Post);
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Post</h1>
      {allPosts
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) return -1;
          return 1;
        })
        .map((post) => {
          const MDXComponent = useMDXComponent(post.body.code);

          return (
            <article key={"post.slug"} className="mb-6">
              <Link href={`/post/${"post.slug"}`}>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <h6 className="font-light text-gray-500">{post.summary}</h6>
                <p>
                  <small className="mr-2">{post.publishedAt}</small>
                </p>
              </Link>
              {/* {post.body.raw} */}
              {/* {post.body.code} */}
              <MDXComponent />
            </article>
          );
        })}
    </section>
  );
}
export default PostPage;
