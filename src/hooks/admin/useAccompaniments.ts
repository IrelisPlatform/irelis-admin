// src/hooks/admin/useAccompaniments.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/services/axiosClient";
import { Accompaniment, AccompanimentPage } from "@/types/accompaniment";
import { Category } from "@/types/category";
import Cookies from "js-cookie";

type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Récupérer les catégories
export function useCategories() {
  return useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const response = await api.get<Category[]>("/api/v1/categories");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

// Récupérer les accompagnements
export function useAccompaniments(page: number = 0, size: number = 10) {
  return useQuery({
    queryKey: ["admin-accompaniments", page, size],
    queryFn: async () => {
      const response = await api.get<AccompanimentPage>(
        `/api/v1/accompaniments?page=${page}&size=${size}`,
      );
      return response.data;
    },
    staleTime: 30 * 1000,
  });
}

// Récupérer un accompagnement
export function useAccompaniment(id: string | undefined | null) {
  return useQuery({
    queryKey: ["admin-accompaniment", id],
    queryFn: async () => {
      if (!id) throw new Error("ID manquant");
      const response = await api.get<Accompaniment>(
        `/api/v1/accompaniments/${id}`,
      );
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// Créer un accompagnement
type CreateAccompanimentData = Omit<Accompaniment, "id" | "accompanimentId"> & {
  file?: File | null;
};

export function useCreateAccompaniment() {
  const queryClient = useQueryClient();

  return useMutation<Accompaniment, Error, CreateAccompanimentData>({
    mutationFn: async (data: CreateAccompanimentData) => {
      const token = Cookies.get("access_token");

      const payload = { ...data } as any;
      delete payload.file;
      delete payload.imageUrl;

      if (!payload.originalPrice || payload.originalPrice <= 0) {
        delete payload.originalPrice;
      }

      if (!payload.categoryId) {
        delete payload.categoryId;
      }

      ["contents", "details", "targets", "rewards", "guarantees"].forEach(
        (key) => {
          if (Array.isArray(payload[key])) {
            payload[key] = payload[key].filter(
              (val: string) =>
                val && typeof val === "string" && val.trim() !== "",
            );
          }
        },
      );
      if (Array.isArray(payload.tagNames)) {
        payload.tagNames = payload.tagNames
          .map((t: any) => (typeof t === "string" ? t : t.name))
          .filter(
            (val: string) =>
              val && typeof val === "string" && val.trim() !== "",
          );
      }

      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(payload)], { type: "application/json" }),
      );

      if (data.file) {
        formData.append("file", data.file);
      }

      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      const response = await api.post<Accompaniment>(
        "/api/v1/accompaniments",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Créé avec succès !");
      queryClient.invalidateQueries({ queryKey: ["admin-accompaniments"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Erreur lors de la création du service";

      toast.error(errorMessage);
    },
  });
}

// Modifier un accompagnement
export function useUpdateAccompaniment() {
  const queryClient = useQueryClient();

  return useMutation<
    Accompaniment,
    Error,
    { id: string; data: Partial<CreateAccompanimentData> }
  >({
    mutationFn: async ({ id, data }) => {
      const token = Cookies.get("access_token");

      const payload = { ...data } as any;
      delete payload.file;
      delete payload.imageUrl;

      if (!payload.categoryId) {
        delete payload.categoryId;
      }

      if (!payload.originalPrice || payload.originalPrice <= 0) {
        delete payload.originalPrice;
      }

      ["contents", "details", "targets", "rewards", "guarantees"].forEach(
        (key) => {
          if (Array.isArray(payload[key])) {
            payload[key] = payload[key].filter(
              (val: string) =>
                val && typeof val === "string" && val.trim() !== "",
            );
          }
        },
      );
      if (Array.isArray(payload.tagNames)) {
        payload.tagNames = payload.tagNames
          .map((t: any) => (typeof t === "string" ? t : t.name))
          .filter(
            (val: string) =>
              val && typeof val === "string" && val.trim() !== "",
          );
      }

      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(payload)], { type: "application/json" }),
      );

      if (data.file) {
        formData.append("file", data.file);
      }

      const response = await api.patch<Accompaniment>(
        `/api/v1/accompaniments/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: (_, { id }) => {
      toast.success("Mis à jour avec succès !");
      queryClient.invalidateQueries({ queryKey: ["admin-accompaniments"] });
      queryClient.invalidateQueries({ queryKey: ["admin-accompaniment", id] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Erreur lors de la mise à jour du service";
      toast.error(errorMessage);
    },
  });
}

// Supprimer un accompagnement
export function useDeleteAccompaniment() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, string>({
    mutationFn: async (id: string) => {
      const token = Cookies.get("access_token");
      const response = await api.delete<ApiResponse>(
        `/api/v1/accompaniments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Supprimé avec succès !");
      queryClient.invalidateQueries({ queryKey: ["admin-accompaniments"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Erreur lors de la suppression du service";
      toast.error(errorMessage);
    },
  });
}
