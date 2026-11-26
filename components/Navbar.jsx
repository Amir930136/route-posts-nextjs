"use client";
import Link from "next/link";
import { useStore } from "./StoreProvider";

export default function Navbar() {
  const { currentUser, logout, ready } = useStore();
  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <Link className="navbar-brand fs-4" href="/">Route Posts</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <Link className="nav-link" href="/">Home</Link>
            {ready && currentUser ? <>
              <Link className="nav-link" href="/post/new">Create post</Link>
              <Link className="nav-link" href="/profile">Profile</Link>
              <button className="btn btn-outline-secondary btn-sm ms-lg-2" onClick={logout}>Log out</button>
            </> : <>
              <Link className="nav-link" href="/login">Login</Link>
              <Link className="btn btn-primary btn-sm ms-lg-2 px-3" href="/signup">Sign up</Link>
            </>}
          </div>
        </div>
      </div>
    </nav>
  );
}
