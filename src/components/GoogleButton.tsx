// /components/GoogleButton.tsx
"use client";
import React from "react";

export default function GoogleButton({ className = "" }: { className?: string }) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  const handle = () => {
    // redirect to backend oauth2 start endpoint
    window.location.href = `${backend}/oauth2/authorization/google`;
  };
  return (
    <button onClick={handle} className={`w-full p-3 rounded-lg border flex items-center justify-center gap-3 ${className}`}>
      <img src="/icons/google-logo.jpg" alt="Google" style={{ width: 20, height: 20 }} />
      <span>Se connecter avec Google</span>
    </button>
  );
}
