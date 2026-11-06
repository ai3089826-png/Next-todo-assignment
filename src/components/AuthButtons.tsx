"use client";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Authbutton() {
  const [user, setUser] = useState<User | undefined | null>(undefined);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  async function tohome() {
    try {
      await signOut(auth);

      router.push("/");
    } catch {
      alert("ログアウトできません");
    }
  }

  if (user === undefined) return null;
  if (user === null) {
    return (
      <div className="flex gap-2">
        <Link href="/login" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          ログイン
        </Link>
        <Link href="/signup" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          新規登録
        </Link>
      </div>
    );
  }
  return (
    <div>
      <button
        onClick={tohome}
        type="button"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        ログアウト
      </button>
    </div>
  );
}
