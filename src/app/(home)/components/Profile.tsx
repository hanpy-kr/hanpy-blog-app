import Link from "next/link";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image" />
        <div>
          <div className="profile__email">hanpy@hanpy.com</div>
          <div className="profile__name">pypy</div>
        </div>
      </div>
      <Link href="/" className="profile__logout">
        로그아웃
      </Link>
    </div>
  );
}
