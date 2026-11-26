"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useStore } from "@/components/StoreProvider";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const { posts, currentUser, ready } = useStore();
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => posts.filter(p =>
    `${p.title} ${p.body} ${p.authorName}`.toLowerCase().includes(search.toLowerCase())
  ), [posts, search]);

  if (!ready) return <p className="text-center py-5 muted">Loading posts...</p>;
  return <div className="row justify-content-center">
    <div className="col-lg-8">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div><h1 className="page-heading h2 mb-1">Community posts</h1><p className="muted mb-0">Discover what everyone is sharing.</p></div>
        {currentUser && <Link href="/post/new" className="btn btn-primary">+ Create post</Link>}
      </div>
      <input className="form-control mb-4" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} />
      {filtered.length ? filtered.map(post => <PostCard key={post.id} post={post} />) :
        <div className="card empty-state"><h3 className="h5">No posts found</h3><p className="mb-0">Try another search or create the first post.</p></div>}
    </div>
  </div>;
}
