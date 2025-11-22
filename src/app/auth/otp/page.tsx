"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { useAuth } from "@/context/AuthProvider";

export default function OtpPage() {
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const role = params.get("role") ?? "CANDIDATE";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { verifyOtp, requestOtp } = useAuth();

  const handleVerify = async () => {
    setLoading(true);
    await verifyOtp(email, code);
    setLoading(false);
  };

  const resend = async () => {
    await requestOtp(email, role);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb]">

      <AuthHeader />

      <main className="flex justify-center flex-1">
        <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md border">
          <h1 className="text-lg font-semibold mb-2">Saisissez le code</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Un code a été envoyé à <strong>{email}</strong>.  
            Il expire dans quelques minutes.
          </p>

          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="------"
            className="tracking-widest text-center"
          />

          <Button className="w-full mt-4" onClick={handleVerify}>
            {loading ? "Connexion..." : "Vérifier et me connecter"}
          </Button>

          <button
            className="text-sm text-blue-600 mt-3 mx-auto block"
            onClick={resend}
          >
            Renvoyer
          </button>
        </div>
      </main>

      <AuthFooter className="mt-10" />
    </div>
  );
}
