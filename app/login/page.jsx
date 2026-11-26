"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/StoreProvider";

export default function LoginPage() {
  const { login } = useStore();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const submit = e => {
    e.preventDefault();
    const result = login(form);
    if (!result.ok) return setError(result.message);
    router.push("/");
  };
  return <div className="auth-wrap card"><div className="card-body p-4 p-md-5">
    <h1 className="h3 page-heading mb-2">Welcome back</h1><p className="muted mb-4">Log in to your account.</p>
    {error && <div className="alert alert-danger">{error}</div>}
    <form onSubmit={submit}>
      <label className="form-label">Email address</label><input className="form-control mb-3" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
      <label className="form-label">Password</label><input className="form-control mb-4" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
      <button className="btn btn-primary w-100">Login</button>
    </form>
    <p className="text-center mt-4 mb-0 muted">New here? <Link href="/signup">Create an account</Link></p>
  </div></div>;
}
