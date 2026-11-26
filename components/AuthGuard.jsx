"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "./StoreProvider";

export default function AuthGuard({ children }) {
  const { currentUser, ready } = useStore();
  const router = useRouter();
  useEffect(() => {
    if (ready && !currentUser) router.replace("/login");
  }, [ready, currentUser, router]);
  if (!ready || !currentUser) return <div className="text-center py-5 muted">Loading...</div>;
  return children;
}
