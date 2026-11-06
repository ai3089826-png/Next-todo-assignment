"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function regist() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/lists/new");
    } catch {
      alert("登録に失敗しました。");
    }
  }
  return (
    <div>
      <h1 className="text-center mt-16 p-4 text-6xl">
        メールアドレスと<br></br>新しいパスワードを入力してください。
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          regist();
        }}
      >
        <div className="flex flex-col mx-auto px-4 max-w-md">
          <input
            type="email"
            placeholder="メールアドレス"
            className="mt-2 border border-gray-600 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="パスワード"
            className="mt-2 border border-gray-600 rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 px-3 py-2 bg-blue-600 rounded px-4 hover:bg-blue-700 text-white"
          >
            登録
          </button>
        </div>
      </form>
    </div>
  );
}
