// src/hooks/admin/useAdminJobs.ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { apiRequest } from '@/lib/api/client';
import { PublishedJob, JobCreatePayload } from '@/types/job';
import Cookies from "js-cookie";

export type AdminJob = PublishedJob & {
  recruiterName?: string;
};

export type PaginatedResponse<T> = {
  content: T[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  first: boolean;
  last: boolean;
};

export function useAdminJobs() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token = Cookies.get('access_token');

  // const getAuthToken = () => {
  //   if (typeof window === 'undefined') return null;
  //   return localStorage.getItem('accessToken');
  // };
  //
  // const handleAuthError = () => {
  //   localStorage.removeItem('accessToken');
  //   toast.error('Votre session a expiré. Veuillez vous reconnecter.');
  //   router.push('/admin/login');
  // };
  //
  // const ensureAuth = () => {
  //   const token = getAuthToken();
  //   if (!token) {
  //     handleAuthError();
  //     return null;
  //   }
  //   return token;
  // };

  // Fonction utilitaire pour gérer les erreurs 401
  // const handleApiError = (err: any) => {
  //   if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
  //     handleAuthError();
  //     return true; // erreur gérée
  //   }
  //   return false; // erreur non gérée ici
  // };

  const getAllJobs = async (): Promise<AdminJob[]> => {

    try {
      const data = await apiRequest<PaginatedResponse<AdminJob>>('/admin/jobs', {
        method : 'GET',
          credentials:'include',
          headers: {
            Authorization: `Bearer ${token}`,
          }
      });
      console.log(data);
      return data.content;
    } catch (err: any) {
      if (!handleApiError(err)) {
        toast.error(err.message || 'Échec du chargement des offres.');
      }
      throw err;
    }
  };

  const createJob = async (payload: JobCreatePayload): Promise<AdminJob> => {
    // const token = ensureAuth();
    // if (!token) throw new Error('Non authentifié');

    setLoading(true);
    try {
        console.log(payload);
      const createdJob = await apiRequest<AdminJob>('/admin/jobs/create', {
        method: 'POST',
        credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        body: JSON.stringify(payload),
      });

      toast.success('Offre créée avec succès !');
      return createdJob;
    } catch (err: any) {
        console.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const publishJob = async (id: string) => {

    try {
      await apiRequest<void>(`/admin/jobs/${id}/publish`, {
        method: 'PATCH',
        credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          }
      });
      toast.success('Offre publiée !');
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      await apiRequest<void>(`/admin/jobs/${id}`, {
        method: 'DELETE',
        credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          }
      });
      toast.success('Offre supprimée.');
    } catch (err: any) {
         console.log(err);
    }
  };

  return {
    getAllJobs,
    createJob,
    publishJob,
    deleteJob,
    loading,
  };
}