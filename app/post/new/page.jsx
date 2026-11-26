"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { useStore } from "@/components/StoreProvider";

export default function NewPostPage() {
  const { createPost } = useStore();
  const router = useRouter();
  const [form, setForm] = useState({ title: "", body: "" });
  const [error, setError] = useState("");
  const submit = e => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return setError("Please complete both fields.");
    router.push(`/post/${createPost(form)}`);
  };
  return <AuthGuard><div className="row justify-content-center"><div className="col-lg-8">
    <h1 className="page-heading h2 mb-4">Create a post</h1>
    <div className="card"><div className="card-body p-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit}>
        <label className="form-label">Post title</label><input className="form-control mb-3" maxLength="100" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <label className="form-label">What would you like to share?</label><textarea className="form-control mb-3" rows="7" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} required />
        <button className="btn btn-primary">Publish post</button>
      </form>
    </div></div>
  </div></div></AuthGuard>;
}
