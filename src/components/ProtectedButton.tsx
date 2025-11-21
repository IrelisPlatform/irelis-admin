// /components/ProtectedButton.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

export default function ProtectedButton({
  children,
  onClick,
  className = "",
  returnTo,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  returnTo?: string;
}) {
  const { user } = useAuth();
  const router = useRouter();

  const handle = () => {
    if (!user) {
      // redirect to signin with returnTo
      const url = `/auth/signin${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`;
      router.push(url);
      return;
    }
    onClick && onClick();
  };

  return (
    <button onClick={handle} className={`p-3 rounded-md ${className}`}>
      {children}
    </button>
  );
}
