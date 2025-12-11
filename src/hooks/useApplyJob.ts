// /src/hooks/useApplyJob.ts

"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useApplyJob = (jobId: string) => {
  const { user, getValidToken } = useAuth();
  const router = useRouter();
  const [isApplying, setIsApplying] = useState(false);

  const apply = async () => {
    const token = await getValidToken();
    if (!token) {
      router.push(`/auth/signin?returnTo=/postuler?offerId=${jobId}`);
      return;
    }

    setIsApplying(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || 'http://api-irelis.us-east-2.elasticbeanstalk.com';
      const res = await fetch(`${backendUrl}/applications/${jobId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success('✅ Candidature envoyée avec succès !');
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.message || 'Échec de la candidature.');
      }
    } catch (err) {
      console.error('Erreur postuler:', err);
      toast.error('Erreur réseau.');
    } finally {
      setIsApplying(false);
    }
  };

  return { apply, isApplying };
};