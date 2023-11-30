import Footer from "../(home)/components/Footer";
import Header from "../(home)/components/Header";
import PostList from "../(home)/components/PostList";
import Profile from "../(home)/components/Profile";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <Profile />
      <PostList hasNavigation={false} defaultTab="my" />
      <Footer />
    </>
  );
}
