// src/hooks/useJobDetails.ts
'use client';

import { useState, useEffect } from 'react';
import { JobDetail } from '@/lib/mockJobDetails';

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
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
        const res = await fetch(`${backendUrl}/api/v1/jobs/${jobId}/published`);

        if (!res.ok) {
          throw new Error('Offre non trouvée');
        }

        const offer: JobDetail = await res.json();
        setJobDetail(offer);
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