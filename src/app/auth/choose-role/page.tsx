"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthFooter } from "@/components/auth/AuthFooter";

export default function ChooseRolePage() {
  const email = useSearchParams().get("email") ?? "";
  const router = useRouter();

  const choose = (role: string) => {
    router.push(`/auth/otp?email=${encodeURIComponent(email)}&role=${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb]">

      <AuthHeader />

      <main className="flex flex-1 justify-center mt-4">
        <div className="flex gap-8">
          
          {/* CANDIDAT */}
          <div className="p-6 rounded-xl border bg-white shadow-sm text-center w-80">
            <Image src="/icons/jobseeker.jpg" width={70} height={70} alt="Candidat" className="mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Je suis candidat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Postuler aux offres, recevoir des alertes, gérer mon profil.
            </p>

            <Button className="w-full" onClick={() => choose("CANDIDATE")}>
              Continuer en tant que candidat
            </Button>
          </div>

          {/* RECRUTEUR */}
          <div className="p-6 rounded-xl border bg-white shadow-sm text-center w-80">
            <Image src="/icons/recruiter.jpg" width={70} height={70} alt="Recruteur" className="mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Je suis recruteur</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Publier des offres et contacter des candidats.
            </p>

            <Button className="w-full" onClick={() => choose("RECRUITER")}>
              Continuer en tant que recruteur
            </Button>
          </div>

        </div>
      </main>

      <AuthFooter className="mt-10" />
    </div>
  );
}
