"use client";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignupForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // const auth = getAuth(app)
      // await createUserWithEmailAndPassword(auth, email, password);

      toast.success("회원가입에 성공했습니다.");
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <form onSubmit={onSubmit} className="form form--lg">
      <h1 className="form__title">회원가입</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={onChange}
        />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={onChange}
        />
      </div>
      <div className="form__block">
        <label htmlFor="password_confirm">비밀번호 확인</label>
        <input
          type="password"
          name="password_confirm"
          id="password_confirm"
          required
          onChange={onChange}
        />
      </div>
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        계정이 이미 있으신가요?
        <Link href="/login" className="form__link">
          로그인하기
        </Link>
      </div>
      <div className="form__block">
        <input
          type="submit"
          value="회원가입"
          className="form__btn--submit"
          disabled={error?.length > 0}
        />
      </div>
    </form>
  );
}
