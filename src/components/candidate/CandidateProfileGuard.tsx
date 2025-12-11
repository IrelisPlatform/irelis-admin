// src/components/candidate/CandidateProfileGuard.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export function CandidateProfileGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState<boolean | null>(null);
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
        if (!token) {
          logout();
          return;
        }

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim() || "http://api-irelis.us-east-2.elasticbeanstalk.com";
        const res = await fetch(`${backendUrl}/api/v1/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          setProfileExists(true);
        } else if (res.status === 404) {
          setProfileExists(false);
        } else if (res.status === 401) {
          logout();
          return;
        } else {
          setProfileExists(false);
        }
      } catch (error) {
        setProfileExists(false);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [logout]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">  
        <p>Chargement de votre profil...</p>
      </div>
    );
  }

  if (profileExists === true) {
    return <>{children}</>;
  }

  // Si profil n'existe pas, on reste sur la même page (onboarding intégré dans ProfilCandidat)
  return <>{children}</>;
}