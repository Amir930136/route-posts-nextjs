"use client";
import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import { useStore } from "@/components/StoreProvider";

export default function ProfilePage() {
  const { currentUser, posts, updateProfile, changePassword } = useStore();
  const [name, setName] = useState(currentUser?.name || "");
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [passwordMessage, setPasswordMessage] = useState("");
  const myPosts = posts.filter(p => p.authorId === currentUser?.id).length;
  const saveProfile = e => { e.preventDefault(); updateProfile({ name }); setProfileMessage("Profile updated successfully."); };
  const savePassword = e => {
    e.preventDefault(); setPasswordMessage("");
    if (passwordForm.newPassword.length < 6) return setPasswordMessage("New password must be at least 6 characters.");
    if (passwordForm.newPassword !== passwordForm.confirm) return setPasswordMessage("New passwords do not match.");
    const result = changePassword(passwordForm);
    if (!result.ok) return setPasswordMessage(result.message);
    setPasswordMessage("Password changed successfully.");
    setPasswordForm({ currentPassword: "", newPassword: "", confirm: "" });
  };
  return <AuthGuard><div className="row justify-content-center"><div className="col-lg-8">
    <h1 className="page-heading h2 mb-4">My profile</h1>
    <div className="card mb-4"><div className="card-body p-4">
      <div className="d-flex align-items-center gap-3 mb-4"><span className="avatar">{currentUser?.name?.[0]?.toUpperCase()}</span><div><h2 className="h5 mb-1">{currentUser?.name}</h2><div className="muted">{currentUser?.email}</div></div></div>
      <div className="row text-center mb-4"><div className="col"><strong className="d-block fs-4">{myPosts}</strong><span className="muted small">Posts published</span></div><div className="col"><strong className="d-block fs-4">{posts.reduce((n,p) => n + p.comments.filter(c => c.authorId === currentUser?.id).length, 0)}</strong><span className="muted small">Comments written</span></div></div>
      <h3 className="h6 fw-bold">Update profile</h3>{profileMessage && <div className="alert alert-success py-2">{profileMessage}</div>}
      <form onSubmit={saveProfile}><label className="form-label">Full name</label><input className="form-control mb-3" value={name} onChange={e => setName(e.target.value)} required /><button className="btn btn-primary">Save profile</button></form>
    </div></div>
    <div className="card"><div className="card-body p-4">
      <h3 className="h5 fw-bold mb-3">Change password</h3>{passwordMessage && <div className={`alert ${passwordMessage.includes("successfully") ? "alert-success" : "alert-danger"} py-2`}>{passwordMessage}</div>}
      <form onSubmit={savePassword}>
        <label className="form-label">Current password</label><input className="form-control mb-3" type="password" value={passwordForm.currentPassword} onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} required />
        <label className="form-label">New password</label><input className="form-control mb-3" type="password" minLength="6" value={passwordForm.newPassword} onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} required />
        <label className="form-label">Confirm new password</label><input className="form-control mb-3" type="password" value={passwordForm.confirm} onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })} required />
        <button className="btn btn-outline-primary">Change password</button>
      </form>
    </div></div>
  </div></div></AuthGuard>;
}
