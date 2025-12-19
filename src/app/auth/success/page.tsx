// src/app/auth/success/page.tsx

"use client";

import {useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useLanguage} from "@/context/LanguageContext";
import Cookies from "js-cookie";

export default function AuthSuccessPage() {
  const { t } = useLanguage();
  const params = useSearchParams();
  const router = useRouter();
  const code = params.get("code");
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  useEffect(() => {
    if (!code) {
      router.replace("/");
      return;
    }

    const exchangeAndFetchUser = async () => {
      try {
        const tokenRes = await fetch(`${backendUrl}/auth/otp/oauth2/exchange?code=${encodeURIComponent(code)}`, {
          method: "POST",
            credentials:"include",
          headers: { "Content-Type": "application/json" },
        });

        const tokenData = await tokenRes.json();

        if (!tokenRes.ok || !tokenData.accessToken || !tokenData.refreshToken) {
          console.error("Échec de l'échange OAuth:", tokenData);
          router.replace("/auth/signin?error=oauth_failed");
          return;
        }

        if (typeof window !== "undefined") {
            Cookies.set("access_token", tokenData.accessToken);
            Cookies.set("refresh_token", tokenData.refreshToken);
          window.location.href = localStorage.getItem("auth_returnTo") || "/";
        }
      } catch (err) {
        console.error("Erreur réseau dans /auth/success:", err);
        router.replace("/auth/signin?error=network");
      }
    };

    exchangeAndFetchUser();
  }, [code, router, backendUrl]);

  return (
    <div className="flex items-center justify-center h-screen text-lg font-semibold">
      {t.auth.success.connecting}
    </div>
  );
}