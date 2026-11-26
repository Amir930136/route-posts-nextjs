"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/components/StoreProvider";
import AuthGuard from "@/components/AuthGuard";

export default function PostDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { posts, currentUser, deletePost, addComment, updateComment, deleteComment } = useStore();
  const post = posts.find(p => p.id === id);
  const [comment, setComment] = useState("");
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");
  if (!post) return <div className="empty-state"><h2 className="h4">Post not found</h2><Link href="/">Back to home</Link></div>;
  const isOwner = currentUser?.id === post.authorId;
  const removePost = () => {
    if (confirm("Delete this post and all its comments?")) { deletePost(post.id); router.push("/"); }
  };
  const submitComment = e => {
    e.preventDefault();
    if (comment.trim()) { addComment(post.id, comment); setComment(""); }
  };
  return <AuthGuard><div className="row justify-content-center"><div className="col-lg-8">
    <Link href="/" className="text-secondary d-inline-block mb-3">← Back to posts</Link>
    <article className="card mb-4"><div className="card-body p-4">
      <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
        <div><div className="fw-semibold">{post.authorName}</div><small className="muted">{new Date(post.createdAt).toLocaleString()}</small></div>
        {isOwner && <div className="d-flex gap-2"><Link className="btn btn-sm btn-outline-primary" href={`/post/${post.id}/edit`}>Edit</Link><button className="btn btn-sm btn-outline-danger" onClick={removePost}>Delete</button></div>}
      </div>
      <h1 className="h3 page-heading">{post.title}</h1><p className="mb-0 text-secondary post-body">{post.body}</p>
    </div></article>
    <section className="card"><div className="card-body p-4">
      <h2 className="h5 fw-bold mb-3">Comments ({post.comments.length})</h2>
      <form onSubmit={submitComment} className="mb-4">
        <textarea className="form-control mb-2" rows="3" placeholder="Write a comment..." value={comment} onChange={e => setComment(e.target.value)} required />
        <button className="btn btn-primary btn-sm">Add comment</button>
      </form>
      {post.comments.length === 0 ? <p className="muted mb-0">No comments yet. Start the conversation.</p> :
        post.comments.map(c => <div className="comment" key={c.id}>
          <div className="d-flex justify-content-between gap-2">
            <div><strong>{c.authorName}</strong><div className="muted small">{new Date(c.createdAt).toLocaleString()}</div></div>
            {currentUser?.id === c.authorId && <div className="d-flex gap-2">
              <button className="btn btn-link btn-sm p-0" onClick={() => { setEditing(c.id); setEditText(c.body); }}>Edit</button>
              <button className="btn btn-link text-danger btn-sm p-0" onClick={() => deleteComment(post.id, c.id)}>Delete</button>
            </div>}
          </div>
          {editing === c.id ? <form className="mt-2" onSubmit={e => { e.preventDefault(); updateComment(post.id, c.id, editText); setEditing(null); }}>
            <textarea className="form-control mb-2" value={editText} onChange={e => setEditText(e.target.value)} required />
            <button className="btn btn-primary btn-sm me-2">Save</button><button type="button" className="btn btn-light btn-sm" onClick={() => setEditing(null)}>Cancel</button>
          </form> : <p className="mt-2 mb-0">{c.body}</p>}
        </div>)}
    </div></section>
  </div></div></AuthGuard>;
}
