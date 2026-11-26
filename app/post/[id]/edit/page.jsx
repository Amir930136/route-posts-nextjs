"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { useStore } from "@/components/StoreProvider";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const { posts, currentUser, updatePost } = useStore();
  const post = posts.find(p => p.id === id);
  const [form, setForm] = useState({ title: "", body: "" });
  useEffect(() => { if (post) setForm({ title: post.title, body: post.body }); }, [post]);
  if (!post) return <p className="muted">Post not found.</p>;
  if (post.authorId !== currentUser?.id) return <p className="alert alert-warning">You can only edit your own posts.</p>;
  const submit = e => { e.preventDefault(); updatePost(id, form); router.push(`/post/${id}`); };
  return <AuthGuard><div className="row justify-content-center"><div className="col-lg-8">
    <h1 className="page-heading h2 mb-4">Edit post</h1><div className="card"><div className="card-body p-4">
      <form onSubmit={submit}>
        <label className="form-label">Title</label><input className="form-control mb-3" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <label className="form-label">Content</label><textarea className="form-control mb-3" rows="7" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} required />
        <button className="btn btn-primary me-2">Save changes</button><Link href={`/post/${id}`} className="btn btn-light">Cancel</Link>
      </form>
    </div></div>
  </div></div></AuthGuard>;
}
