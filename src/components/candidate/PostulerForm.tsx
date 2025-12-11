// src/components/candidate/PostulerForm.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, UserCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCandidateProfile } from '@/hooks/useCandidateProfile';
import { useApplyJob } from '@/hooks/useApplyJob';

export function PostulerForm() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const offerId = searchParams.get('offerId');
  const { apply } = useApplyJob();
  const { profile, loading } = useCandidateProfile();
  
  const [profilComplet, setProfilComplet] = useState<boolean | null>(null);

  const { apply, isApplying } = useApplyJob(offerId!);

  const handleApply = async () => {
    if (!offerId) return;
    try {
      await apply();
      router.push("/"); // ✅ pas /offre/...
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handlePostuler1Clic = () => {
    // 🔜 Appel API : POST /api/v1/applications { offerId, withProfile: true }
    alert("Candidature envoyée avec votre profil !");
    router.push(`/offre/${offerId}?candidature=success`);
  };

  const handlePostulerAvecCV = () => {
    // 🔜 Ouvrir un modal d'upload ou rediriger vers upload
    alert("Fonctionnalité d'upload à implémenter");
  };

  if (profilComplet === null) {
    return <div className="text-center py-12">Vérification de votre profil...</div>;
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {profilComplet ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Votre profil est complet !</h2>
            <p className="text-gray-600 mb-6">
              Postulez en un clic. Vos informations seront automatiquement transmises.
            </p>
            <Button 
              onClick={handlePostuler1Clic}
              className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white w-full py-6 text-lg"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Postuler en 1 clic
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-amber-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Complétez votre candidature</h2>
            <p className="text-gray-600 mb-6">
              Téléchargez votre CV pour postuler à cette offre.
            </p>
            <Button 
              onClick={handlePostulerAvecCV}
              variant="outline"
              className="border-[#1e3a8a] text-[#1e3a8a] w-full py-6 text-lg"
            >
              <Upload className="h-5 w-5 mr-2" />
              Postuler avec CV
            </Button>
          </div>
        )}

        <div className="text-xs text-gray-500 text-center pt-6 border-t">
          Vos données sont protégées. Les recruteurs ne voient que ce que vous partagez.
        </div>
      </div>
    </Card>
  );
}