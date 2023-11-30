"use client";
// import styles from "./page.module.css";

import { useContext } from "react";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PostList from "./components/PostList";
import ThemeContext from "@/context/ThemeContext";

export default function Home() {
  const context = useContext(ThemeContext);

  return (
    <>
      <div className={context.theme === "light" ? "white" : "dark"}>
        <Header />
        <Carousel />
        <PostList />
        <Footer />
      </div>
    </>
  );
}
