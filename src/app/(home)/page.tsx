// import styles from "./page.module.css";

import Carousel from "./components/Carousel";
import Header from "./components/Header";
import PostList from "./components/PostList";

export default function Home() {
  return (
    <>
      <Header />
      <Carousel />
      <PostList />
      <div>Footer</div>
    </>
  );
}
