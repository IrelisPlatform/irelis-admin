// src/components/recruiter/RecruiterProfileGuard.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface RecruiterProfileGuardProps {
  children: React.ReactNode;
}

export function RecruiterProfileGuard({ children }: RecruiterProfileGuardProps) {
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const token = Cookies.get("access_token");
  useEffect(() => {
    const checkProfile = async () => {
      try {


        const res = await fetch("/api/v1/recruiters/profile", {
          method: "GET",
          credentials: "include",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          // 200 → profil existe → complet
          setIsProfileComplete(true);
        } else if (res.status === 404) {
          // 404 → profil non créé → incomplet
          setIsProfileComplete(false);
        } else if (res.status === 401) {
          return;
        } else {
          // Autre erreur → considérer comme incomplet
          setIsProfileComplete(false);
        }
      } catch (error) {
        console.error("Erreur vérification profil recruteur", error);
        setIsProfileComplete(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Vérification de votre profil...</p>
      </div>
    );
  }

  if (isProfileComplete === true) {
    return <>{children}</>;
  }

  if (isProfileComplete === false) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-300">
          <div className="p-4 flex gap-3">
            <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-900">Offres sécurisées</h3>
              <p className="text-sm text-green-800">
                Toutes vos offres incluent automatiquement un message anti-arnaque.
              </p>
            </div>
          </div>
        </Card>

        <Card className="border border-yellow-200 bg-yellow-50">
          <div className="p-6 flex gap-4">
            <AlertCircle className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">
                Complétez votre profil recruteur
              </h3>
              <p className="text-yellow-800 mb-4">
                Pour publier une offre d’emploi, vous devez d’abord renseigner les informations
                de votre entreprise.
              </p>
              <Button asChild>
                <a href="/espace-recruteur?tab=settings">
                  Compléter mon profil
                </a>
              </Button>
            </div>
          </div>
        </Card>

        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}