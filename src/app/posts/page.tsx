import Footer from "../(home)/components/Footer";
import Header from "../(home)/components/Header";
import PostList from "../(home)/components/PostList";

export default function PostsPage() {
  return (
    <>
      <Header />
      <PostList hasNavigation={false} />
      <Footer />
    </>
  );
}
