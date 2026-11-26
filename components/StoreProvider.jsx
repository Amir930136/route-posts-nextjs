"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(null);
const STORAGE_KEY = "route-posts-data-v1";

const starterPosts = [
  {
    id: "welcome-1",
    title: "Welcome to Route Posts",
    body: "This is your community feed. Create an account, publish a post, and start a conversation. You can edit or delete your own posts and comments.",
    authorId: "demo",
    authorName: "Route Posts Team",
    createdAt: new Date().toISOString(),
    comments: [
      { id: "comment-1", body: "Glad to be here!", authorId: "demo", authorName: "Route Posts Team", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "tips-2",
    title: "Share what you are learning",
    body: "Use this space to share useful resources, ask questions, and help other members learn something new.",
    authorId: "demo",
    authorName: "Route Posts Team",
    createdAt: new Date().toISOString(),
    comments: []
  }
];

export function StoreProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState(starterPosts);
  const [currentUser, setCurrentUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved) {
        setUsers(saved.users || []);
        setPosts(saved.posts?.length ? saved.posts : starterPosts);
        const active = (saved.users || []).find(u => u.id === saved.currentUserId);
        setCurrentUser(active || null);
      }
    } catch (error) {
      console.error("Could not load saved app data", error);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      users, posts, currentUserId: currentUser?.id || null
    }));
  }, [users, posts, currentUser, ready]);

  const signUp = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some(user => user.email === normalizedEmail)) {
      return { ok: false, message: "This email is already registered." };
    }
    const user = { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail, password };
    setUsers(old => [...old, user]);
    setCurrentUser(user);
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const user = users.find(u => u.email === email.trim().toLowerCase() && u.password === password);
    if (!user) return { ok: false, message: "Email or password is incorrect." };
    setCurrentUser(user);
    return { ok: true };
  };

  const logout = () => setCurrentUser(null);

  const createPost = ({ title, body }) => {
    const post = {
      id: crypto.randomUUID(), title: title.trim(), body: body.trim(),
      authorId: currentUser.id, authorName: currentUser.name,
      createdAt: new Date().toISOString(), comments: []
    };
    setPosts(old => [post, ...old]);
    return post.id;
  };

  const updatePost = (postId, values) => {
    setPosts(old => old.map(p => p.id === postId && p.authorId === currentUser?.id
      ? { ...p, title: values.title.trim(), body: values.body.trim() } : p));
  };

  const deletePost = postId => setPosts(old => old.filter(p => !(p.id === postId && p.authorId === currentUser?.id)));

  const addComment = (postId, body) => {
    const comment = {
      id: crypto.randomUUID(), body: body.trim(), authorId: currentUser.id,
      authorName: currentUser.name, createdAt: new Date().toISOString()
    };
    setPosts(old => old.map(p => p.id === postId ? { ...p, comments: [...p.comments, comment] } : p));
  };

  const updateComment = (postId, commentId, body) => {
    setPosts(old => old.map(p => p.id !== postId ? p : ({
      ...p, comments: p.comments.map(c => c.id === commentId && c.authorId === currentUser?.id
        ? { ...c, body: body.trim() } : c)
    })));
  };

  const deleteComment = (postId, commentId) => {
    setPosts(old => old.map(p => p.id !== postId ? p : ({
      ...p, comments: p.comments.filter(c => !(c.id === commentId && c.authorId === currentUser?.id))
    })));
  };

  const updateProfile = ({ name }) => {
    const updated = { ...currentUser, name: name.trim() };
    setUsers(old => old.map(u => u.id === updated.id ? updated : u));
    setCurrentUser(updated);
    setPosts(old => old.map(p => ({
      ...p,
      authorName: p.authorId === updated.id ? updated.name : p.authorName,
      comments: p.comments.map(c => c.authorId === updated.id ? { ...c, authorName: updated.name } : c)
    })));
  };

  const changePassword = ({ currentPassword, newPassword }) => {
    if (currentUser.password !== currentPassword) return { ok: false, message: "Current password is incorrect." };
    const updated = { ...currentUser, password: newPassword };
    setUsers(old => old.map(u => u.id === updated.id ? updated : u));
    setCurrentUser(updated);
    return { ok: true };
  };

  const value = useMemo(() => ({
    users, posts, currentUser, ready, signUp, login, logout, createPost,
    updatePost, deletePost, addComment, updateComment, deleteComment,
    updateProfile, changePassword
  }), [users, posts, currentUser, ready]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
