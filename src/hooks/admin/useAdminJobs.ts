// src/hooks/admin/useAdminJobs.ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { apiRequest } from '@/lib/api/client';
import { PublishedJob, JobCreatePayload } from '@/types/job';
import Cookies from "js-cookie";
import api from "@/services/axiosClient";

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
  const [error, setError] = useState(null);

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

  // const getAllJobs = async (): Promise<AdminJob[]> => {
  //
  //   try {
  //     const data = await apiRequest<PaginatedResponse<AdminJob>>('/admin/jobs', {
  //       method : 'GET',
  //         credentials:'include',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         }
  //     });
  //     console.log(data);
  //     return data.content;
  //   } catch (err: any) {
  //     if (!handleApiError(err)) {
  //       toast.error(err.message || 'Échec du chargement des offres.');
  //     }
  //     throw err;
  //   }
  // };

    const getAllJobs = async (): Promise<AdminJob[]> => {
        try {
            const response = await api.get<PaginatedResponse<AdminJob>>('/admin/jobs', {
                headers: {
                    Authorization: `Bearer ${Cookies.get("access_token")}`,
                },
            });

            console.log(response.data);
            return response.data.content;
        } catch (err: any) {
                toast.error(err.message || 'Échec du chargement des offres.');
            throw err;
        }
    };


    // const createJob = async (formData: FormData): Promise<AdminJob> => {
  //   setLoading(true);
  //   try {
  //     const createdJob = await apiRequest<AdminJob>('/admin/jobs/create', {
  //       method: 'POST',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       body: formData,
  //     });
  //
  //     toast.success('Offre créée avec succès !');
  //     return createdJob;
  //   } catch (err: any) {
  //       console.error(err.message);
  //       setError(err);
  //     throw err;
  //   } finally {
  //     setLoading(false);
  //   }
  // };
    const createJob = async (formData: FormData): Promise<AdminJob> => {
        setLoading(true);
        try {
            const response = await api.post<AdminJob>(
                '/admin/jobs/create',
                formData,
                {
                    headers: {

                        Authorization: `Bearer ${Cookies.get("access_token")}`,
                    },
                }
            );

            toast.success('Offre créée avec succès !');
            return response.data;
        } catch (err: any) {
            console.error(err?.response?.data || err.message);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };



  //   const publishJob = async (id: string) => {
  //
  //   try {
  //     await apiRequest<void>(`/admin/jobs/${id}/publish`, {
  //       method: 'PATCH',
  //       credentials: 'include',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         }
  //     });
  //     toast.success('Offre publiée !');
  //   } catch (err: any) {
  //     console.error(err.message);
  //   }
  // };

    const publishJob = async (id: string) => {
        try {
            await api.patch<void>(`/admin/jobs/${id}/publish`, null, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("access_token")}`,
                },
            });

            toast.success('Offre publiée !');
        } catch (err: any) {
            console.error(err?.response?.data || err.message);
        }
    };

  // const deleteJob = async (id: string) => {
  //   try {
  //     await apiRequest<void>(`/admin/jobs/${id}`, {
  //       method: 'DELETE',
  //       credentials: 'include',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         }
  //     });
  //     toast.success('Offre supprimée.');
  //   } catch (err: any) {
  //        console.log(err);
  //   }
  // };

    const deleteJob = async (id: string) => {
        try {
            await api.delete<void>(`/admin/jobs/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("access_token")}`,
                },
            });

            toast.success('Offre supprimée.');
        } catch (err: any) {
            console.error(err?.response?.data || err.message);
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