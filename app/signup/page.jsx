"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/StoreProvider";

export default function SignupPage() {
  const { signUp } = useStore();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => {
    e.preventDefault(); setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    const result = signUp(form);
    if (!result.ok) return setError(result.message);
    router.push("/");
  };
  return <div className="auth-wrap card"><div className="card-body p-4 p-md-5">
    <h1 className="h3 page-heading mb-2">Create account</h1><p className="muted mb-4">Join the Route Posts community.</p>
    {error && <div className="alert alert-danger">{error}</div>}
    <form onSubmit={submit}>
      <label className="form-label">Full name</label><input className="form-control mb-3" name="name" value={form.name} onChange={change} required />
      <label className="form-label">Email address</label><input className="form-control mb-3" type="email" name="email" value={form.email} onChange={change} required />
      <label className="form-label">Password</label><input className="form-control mb-3" type="password" name="password" value={form.password} onChange={change} minLength="6" required />
      <label className="form-label">Confirm password</label><input className="form-control mb-4" type="password" name="confirm" value={form.confirm} onChange={change} required />
      <button className="btn btn-primary w-100">Sign up</button>
    </form>
    <p className="text-center mt-4 mb-0 muted">Already have an account? <Link href="/login">Login</Link></p>
  </div></div>;
}
