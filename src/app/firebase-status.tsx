"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function FirebaseStatus() {
  const [state, setState] = useState("جاري الاتصال…");

  useEffect(() => onAuthStateChanged(auth, (user) => {
    setState(user ? `متصل · ${user.email ?? "مستخدم"}` : "Firebase متصل · لا يوجد مستخدم مسجل");
  }, () => setState("تعذر الاتصال بـ Firebase")), []);

  return <span className="firebase-status">● {state}</span>;
}
