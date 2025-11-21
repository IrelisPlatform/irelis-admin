"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/* -------------------- TYPES -------------------- */
interface User {
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => void;
  requestOtp: (email: string, userType?: string) => Promise<boolean>;
  verifyOtp: (email: string, code: string) => Promise<boolean>;
  logout: () => void;
}

/* -------------------- CONTEXT -------------------- */
const AuthContext = createContext<AuthContextType | null>(null);

/* -------------------- API WRAPPER -------------------- */
async function api(path: string, options: RequestInit = {}) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return fetch(`${backendUrl}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
}

/* -------------------- PROVIDER -------------------- */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useSearchParams();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---- AUTO-LOGIN via cookie HttpOnly ---- */
  const fetchUser = async () => {
    try {
      const res = await api("/auth/otp/user");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  /* ---------------- GOOGLE OAUTH -------------- */
  const signInWithGoogle = () => {
    const returnTo = params.get("returnTo") || "/";
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    window.location.href = `${backendUrl}/oauth2/authorization/google?returnTo=${encodeURIComponent(
      returnTo
    )}`;
  };

  /* ---------------- OTP REQUEST -------------- */
  const requestOtp = async (
    email: string,
    userType = "CANDIDATE"
  ): Promise<boolean> => {
    const res = await api("/auth/otp/request", {
      method: "POST",
      body: JSON.stringify({ email, userType }),
    });

    return res.status === 204;
  };

  /* ---------------- OTP VERIFY -------------- */
  const verifyOtp = async (email: string, code: string): Promise<boolean> => {
    const res = await api("/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify({ email, code, userType: "CANDIDATE" }),
    });

    if (!res.ok) return false;

    await fetchUser();

    const returnTo = params.get("returnTo") || "/";
    router.push(returnTo);

    return true;
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = async () => {
    await api("/auth/logout", { method: "POST" }).catch(() => {});
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        requestOtp,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* -------------------- HOOK -------------------- */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
}
