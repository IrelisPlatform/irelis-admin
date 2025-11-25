"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function OAuth2Callback() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = params.get('code');
    const returnTo = params.get("returnTo") || "/";

    if (!code) {
      console.error("Aucun code OAuth2 trouvé dans l’URL.");
      router.push("/auth/signin");
      return;
    }

    async function exchange() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/otp/oauth2/exchange`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }), // 👉 le backend attend le code dans le body
          }
        );

        if (!res.ok) {
          console.error("Erreur backend OAuth2 exchange :", await res.text());
          router.push("/auth/signin");
          return;
        }

        const data = await res.json();

        // 👉 Stockage des tokens
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        // 👉 Redirection vers ton Dashboard ou Home
        router.push("/");
      } catch (err) {
        console.error("Erreur d’échange OAuth2 :", err);
      }
    }

    exchange();
  }, [params, router]);

  return <p className="p-4">Connexion en cours...</p>;
}
