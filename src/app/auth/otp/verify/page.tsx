// app/auth/otp/verify/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";

export default function VerifyOtpPage() {
  const params = useSearchParams();
  const email = params.get("email") || "";
  const returnTo = params.get("returnTo") || "/";
  const router = useRouter();
  const { verifyOtp, requestOtp } = useAuth();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    if (typeof window !== "undefined") router.push("/auth/signin");
    return null;
  }

  const handleVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!code) return;
    setLoading(true);
    try {
      const ok = await verifyOtp(email, code);
      if (!ok) {
        // afficher message erreur
        console.error("Code invalide");
      } // verifyOtp redirige vers returnTo si ok (dans ton provider)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      // renvoyer OTP (utilise requestOtp)
      await requestOtp(email, "CANDIDATE"); // ou garder userType si tu stockes
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-xl font-semibold">Saisissez le code</h2>
        <p className="text-sm text-muted-foreground">Un code a été envoyé à <strong>{email}</strong>. Il expire en quelques minutes.</p>

        <form onSubmit={handleVerify} className="space-y-4">
          <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="------" />
          <div className="flex items-center justify-between gap-4">
            <Button type="submit" className="flex-1" disabled={loading}>Vérifier et me connecter</Button>
            <Button variant="ghost" onClick={handleResend} disabled={loading}>Renvoyer</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
