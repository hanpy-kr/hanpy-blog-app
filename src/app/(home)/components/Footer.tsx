"use client";
import Link from "next/link";
import { BsSun, BsMoonFill } from "react-icons/bs";
import { useContext } from "react";
import "./Footer.css";
import ThemeContext from "@/context/ThemeContext";

export default function Footer() {
  const context = useContext(ThemeContext);

  return (
    <footer>
      <Link href="/posts/new">글쓰기</Link>
      <Link href="/posts">게시글</Link>
      <Link href="/profile">프로필</Link>
      <>
        {context.theme === "light" ? (
          <BsSun onClick={context.toggleMode} className="footer__theme-btn" />
        ) : (
          <BsMoonFill
            onClick={context.toggleMode}
            className="footer__theme-btn"
          />
        )}
      </>
    </footer>
  );
}
