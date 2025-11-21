// /app/auth/oauth2/callback/page.tsx
"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

/**
 * Si ton backend gère l'échange OAuth et renvoie une session (cookies),
 * Google redirige vers ce callback (ex: /auth/oauth2/callback?state=...&code=...).
 * Dans notre setup le backend devrait prendre le code et rediriger à son tour vers frontend
 * en plantant éventuellement un cookie HttpOnly (refresh) et donner accès.
 *
 * Donc ici on fait une simple tentative pour refresh le user via backend.
 */
export default function OAuthCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const { refresh } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        // Optionnel: si backend redirige vers ici avec accessToken in query param, handle it
        const accessToken = params.get("accessToken");
        const returnTo = params.get("returnTo") || "/";
        if (accessToken) {
          // store in cookie via setLocalAccessToken in provider - but we can't access it directly here
          // We'll simply reload user via provider which will call refresh endpoint (uses HttpOnly refresh cookie)
          // If your backend includes accessToken in query, consider saving it to cookie via window.opener postMessage flow.
          // Simpler: call provider.refresh to fetch user
        }
        await refresh();
      } catch (e) {
        // ignore
      } finally {
        router.replace("/");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="p-8">Connexion en cours...</div>;
}
