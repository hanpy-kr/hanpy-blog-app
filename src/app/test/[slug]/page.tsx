import { Mdx } from "./components/mdx";
import { allPosts } from "contentlayer/generated";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}
const Post = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) {
    return false;
  }
  return (
    <section>
      <div className="mb-6">
        <h1 className="mb-1 text-3xl font-semibold">
          <Balancer>{post.title}</Balancer>
        </h1>
        <h4 className="font-light text-gray-700 dark:text-gray-400">
          {post.summary}
        </h4>
        <p>
          <small>{post.publishedAt}</small>{" "}
          <small>{post.readingTime.text}</small>
        </p>
      </div>
      <Mdx code={post.body.code} />
    </section>
  );
};
export default Post;
