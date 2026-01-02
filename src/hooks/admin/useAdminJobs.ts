// src/hooks/admin/useAdminJobs.ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { apiRequest } from '@/lib/api/client';
import { PublishedJob } from '@/types/job';
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


    const getAllJobs = async (): Promise<AdminJob[]> => {
        try {
            const response = await api.get<PaginatedResponse<AdminJob>>('/admin/jobs', {
                headers: {
                    Authorization: `Bearer ${Cookies.get("access_token")}`,
                },
            });
            return response.data.content;
        } catch (err: any) {
                toast.error(err.message || 'Échec du chargement des offres.');
            throw err;
        }
    };


    const createJob = async (formData: FormData): Promise<AdminJob> => {
        setLoading(true);
        try {
            const response = await api.post<AdminJob>(
                '/admin/jobs',
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
;

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

     const updateJob = async (id: string, data: FormData) => {
        return api.patch(`/admin/jobs/${id}`, data, {
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
        });
    };


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
        updateJob
  };
}