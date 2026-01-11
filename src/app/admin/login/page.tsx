"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { appCookies } from "@/lib/cookies";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || "Erreur de connexion");
        return;
      }

      const data = await res.json();

      appCookies.set("access_token", data.accessToken);
      appCookies.set("refresh_token", data.refreshToken);
      appCookies.set("admin_session", "true");

      router.push("/admin");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erreur réseau");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb]">
      <AuthHeader />

      <main className="flex justify-center flex-1">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md border transition-shadow hover:shadow-lg">
          <h1 className="text-2xl font-bold text-[#1e3a8a] text-center mb-1">
            Connexion administrateur
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Accès réservé à l’espace d’administration
          </p>

          <form onSubmit={login} className="space-y-5">
            <div>
              <label htmlFor="email" className="text-sm mb-1 block">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 focus-visible:ring-2 focus-visible:ring-offset-2"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm mb-1 block">
                Mot de passe
              </label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 focus-visible:ring-2 focus-visible:ring-offset-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white transition-transform active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Spinner className="h-4 w-4 text-white" />{" "}
                  <span className="ml-2">Connexion</span>
                </>
              ) : (
                "Se Connecter"
              )}
            </Button>
          </form>
        </div>
      </main>

      <AuthFooter className="mt-10" />
    </div>
  );
}
