
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function CandidateProfileGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkProfile = async () => {
      try {
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
        const res = await fetch(`${backendUrl}/api/v1/profile`, {
         method:'GET',
            credentials: "include",
        });

        if (res.ok) {
          setProfileExists(true);
        } else if (res.status === 404) {
          setProfileExists(false);
        } else if (res.status === 401) {
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
  }, []);

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