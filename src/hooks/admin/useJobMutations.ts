// src/hooks/admin/useJobMutations.ts

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { BackendPublishedJob, PublishedJob } from "@/types/job";

// Types pour les réponses API
type ApiResponse<T = unknown> = {
    success: boolean;
    data?: T;
    error?: string;
};

type CreateJobResponse = ApiResponse<BackendPublishedJob>;
type UpdateJobResponse = ApiResponse<BackendPublishedJob>;
type DeleteJobResponse = ApiResponse;
type PublishJobResponse = ApiResponse;

// Hook pour créer une offre d'emploi
export function useCreateJob() {
    const queryClient = useQueryClient();

    return useMutation<CreateJobResponse, Error, FormData>({
        mutationFn: async (formData: FormData) => {
            const response = await axios.post<CreateJobResponse>(
                "/api/admin/jobs",
                formData
            );
            console.log(response.data)
            if (response.data.error) throw new Error(response.data.error);
            return response.data;

        },
        onSuccess: async (data) => {
            toast.success("Offre créée avec succès !");
            await queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });

        },
        onError: (error: any) => {
            console.log(error)
            const errorMessage =
                error?.response?.data?.error ||
                error.message ||
                "Erreur lors de la création de l'offre";
            toast.error(errorMessage);
        },
    });
}

// Hook pour mettre à jour une offre d'emploi
export function useUpdateJob() {
    const queryClient = useQueryClient();

    return useMutation<
        UpdateJobResponse,
        Error,
        { id: string; formData: FormData }
    >({
        mutationFn: async ({ id, formData }) => {
            const response = await axios.patch<UpdateJobResponse>(
                `/api/admin/jobs/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        },
        onSuccess: (data) => {

            toast.success("Offre mise à jour avec succès !");
            queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });

        },
        onError: (error: any) => {
            console.log(error)
            /*  const errorMessage =
                 error?.response?.data?.error ||
                 error.message ||
                 "Erreur lors de la création de l'offre"; */
            /*    toast.error(error); */
        },
    });
}

// Hook pour supprimer une offre d'emploi
export function useDeleteJob() {
    const queryClient = useQueryClient();

    return useMutation<DeleteJobResponse, Error, string>({
        mutationFn: async (id: string) => {
            const response = await axios.delete<DeleteJobResponse>(
                `/api/admin/jobs/${id}`
            );
            if (response.data.error) throw new Error(response.data.error)
            return response.data;
        },
        onSuccess: (data) => {
            toast.success("Offre supprimée avec succès !");
            queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });

        },
        onError: (error: any) => {
            console.log(error)
            const errorMessage =
                error?.response?.data?.error ||
                error.message ||
                "Erreur lors de la suppression de l'offre";
            toast.error(errorMessage);
        },
    });
}

// Hook pour publier une offre d'emploi
export function usePublishJob() {
    const queryClient = useQueryClient();

    return useMutation<PublishJobResponse, Error, string>({
        mutationFn: async (id: string) => {
            const response = await axios.patch<PublishJobResponse>(
                `/api/admin/jobs/${id}/publish`
            );
            return response.data;
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Offre publiée avec succès !");
                queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
            } else {
                toast.error(data.error || "Erreur lors de la publication de l'offre");
            }
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.error ||
                error.message ||
                "Erreur lors de la publication de l'offre";
            toast.error(errorMessage);
        },
    });
}
