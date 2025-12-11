// src/hooks/useJobDetails.ts
'use client';

import { useState, useEffect } from 'react';
import { JobOffer } from '@/types/job';
import { JobDetail } from '@/lib/mockJobDetails';
import { transformJobOfferToJobDetail } from '@/lib/api/transformJobOffer';

export const useJobDetails = (jobId: string | undefined) => {
  const [jobDetail, setJobDetail] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) {
      setJobDetail(null);
      setLoading(false);
      return;
    }

    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim() || 'http://api-irelis.us-east-2.elasticbeanstalk.com';
        const res = await fetch(`${backendUrl}/api/v1/jobs/${jobId}/published`);

        if (!res.ok) {
          throw new Error('Offre non trouvée');
        }

        const offer: JobOffer = await res.json();
        const transformed = transformJobOfferToJobDetail(offer);
        setJobDetail(transformed);
      } catch (err) {
        console.error('Erreur chargement détail:', err);
        setError('Impossible de charger les détails.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  return { jobDetail, loading, error };
};