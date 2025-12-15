// src/app/auth/oauth2/callback/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const returnTo = urlParams.get("returnTo") || "/";

    if (!code) {
      console.error("Code OAuth2 manquant");
      router.push("/auth/signin");
      return;
    }

    // Échanger le code contre des tokens
    const exchangeCode = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://api-irelis.us-east-2.elasticbeanstalk.com";
        const res = await fetch(`${backendUrl}/auth/otp/oauth2/exchange?code=${code}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (res.ok && data.accessToken && data.refreshToken) {
          localStorage.setItem("accessToken", data.accessToken);

          // Redirige vers la page demandée
          window.location.href = returnTo;
        } else {
          console.error("Échec de l'échange du code OAuth2");
          router.push("/auth/signin");
        }
      } catch (err) {
        console.error("Erreur échange OAuth2:", err);
        router.push("/auth/signin");
      }
    };

    exchangeCode();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
      <p>Connexion en cours...</p>
    </div>
  );
}