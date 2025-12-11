// src/app/auth/choose-role/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { useLanguage } from "@/context/LanguageContext";

export default function ChooseRolePage() {
  const { t } = useLanguage();
  const router = useRouter();
  let email = "";

  if (typeof window !== "undefined") {
    email = localStorage.getItem("auth_email") || "";
  }

  useEffect(() => {
    if (!email) {
      router.push("/auth/signin");
    }
  }, [email, router]);

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChooseRole = async (role: "CANDIDATE" | "RECRUITER") => {
    if (!email) return;

    setLoading(true);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim() || "http://api-irelis.us-east-2.elasticbeanstalk.com";

    try {
      // Étape 1 : Demander l'OTP avec userType (obligatoire pour les nouveaux)
      const res = await fetch(`${backendUrl}/auth/otp/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userType: role }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.message || "Erreur lors de l’envoi du code."); // ou toast si tu préfères
        return;
      }

      // Étape 2 : Stocker le rôle + la redirection souhaitée
      localStorage.setItem("auth_role", role);
      localStorage.setItem(
        "auth_preferred_redirect",
        role === "RECRUITER" ? "/espace-recruteur" : "/espace-candidat"
      );

      // Étape 3 : Rediriger vers la page OTP
      router.push("/auth/otp");
    } catch (err) {
      console.error("Erreur réseau :", err);
      alert("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb]">
      <AuthHeader />
      <main className="flex flex-1 justify-center mt-4">
        <div className="flex flex-col gap-6 w-full max-w-md">
          <div className="text-center">
            <h1 className="mt-6 w-full text-muted-foreground mb-8">{t.auth.chooseRole.title}</h1>
            <h2 className="text-lg font-semibold mb-4">
              {t.auth.chooseRole.subtitle}
            </h2>
          </div>

          <div 
            className={`p-6 rounded-xl border cursor-pointer ${selectedRole === "CANDIDATE" ? "border-[#1e3a8a] bg-blue-50" : "border-gray-200"}`}
            onClick={() => setSelectedRole("CANDIDATE")}
          >
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full border-2 border-[#1e3a8a] flex items-center justify-center">
                {selectedRole === "CANDIDATE" && <div className="w-3 h-3 rounded-full bg-[#1e3a8a]" />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1e3a8a] mb-2">{t.auth.chooseRole.candidate.title}</h3>
                <p className="text-sm text-gray-600">{t.auth.chooseRole.candidate.description}</p>
              </div>
            </div>
          </div>

          <div 
            className={`p-6 rounded-xl border cursor-pointer ${selectedRole === "RECRUITER" ? "border-[#1e3a8a] bg-blue-50" : "border-gray-200"}`}
            onClick={() => setSelectedRole("RECRUITER")}
          >
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full border-2 border-[#1e3a8a] flex items-center justify-center">
                {selectedRole === "RECRUITER" && <div className="w-3 h-3 rounded-full bg-[#1e3a8a]" />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1e3a8a] mb-2">{t.auth.chooseRole.recruiter.title}</h3>
                <p className="text-sm text-gray-600">{t.auth.chooseRole.recruiter.description}</p>
              </div>
            </div>
          </div>

          <Button
            className="w-full mt-6 bg-[#1e3a8a] hover:bg-[#1e40af] text-white shadow-md"
            disabled={!selectedRole || loading}
            onClick={() => selectedRole && handleChooseRole(selectedRole as "CANDIDATE" | "RECRUITER")}
          >
            {loading ? "Envoi du code..." : t.auth.chooseRole.continue}
          </Button>
        </div>
      </main>
      <AuthFooter className="mt-10" />
    </div>
  );
}