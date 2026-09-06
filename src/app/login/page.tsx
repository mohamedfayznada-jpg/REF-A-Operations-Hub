"use client";

import { FormEvent, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/");
    });
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!auth) {
      setMessage("Firebase غير مُهيأ. راجع إعدادات البيئة.");
      return;
    }
    setMessage("جاري تسجيل الدخول…");
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/");
    } catch {
      setMessage("بيانات الدخول غير صحيحة أو الحساب غير متاح.");
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-mark">REF-A</div>
        <p className="eyebrow">OPERATIONS HUB</p>
        <h1>تسجيل الدخول</h1>
        <p>ادخل بحسابك للوصول إلى بيانات التشغيل والصلاحيات المخصصة لك.</p>
        <form onSubmit={submit} className="auth-form">
          <label>البريد الإلكتروني<input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label>كلمة المرور<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          <button type="submit">دخول</button>
          <span className="form-message">{message}</span>
        </form>
      </section>
    </main>
  );
}
