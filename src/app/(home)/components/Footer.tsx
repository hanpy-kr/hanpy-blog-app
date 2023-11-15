import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <Link href="/posts/new">글쓰기</Link>
      <Link href="/posts">게시글</Link>
      <Link href="/profile">프로필</Link>
    </footer>
  );
}
