import Link from "next/link";

export default function PostCard({ post }) {
  const date = new Date(post.createdAt).toLocaleDateString();
  return (
    <article className="card post-card mb-3">
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="avatar">{(post.authorName || "U").charAt(0).toUpperCase()}</span>
          <div>
            <div className="fw-semibold">{post.authorName}</div>
            <small className="muted">{date}</small>
          </div>
        </div>
        <h2 className="h5 fw-bold">{post.title}</h2>
        <p className="text-secondary mb-3 post-preview">{post.body}</p>
        <div className="d-flex justify-content-between align-items-center">
          <small className="muted">{post.comments?.length || 0} comments</small>
          <Link href={`/post/${post.id}`} className="btn btn-sm btn-outline-primary">View post</Link>
        </div>
      </div>
    </article>
  );
}
