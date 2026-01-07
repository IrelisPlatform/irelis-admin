// src/app/_actions/jobs.ts

"use server";

import { cookies } from "next/headers";
import api from "@/services/axiosClient";
import { revalidatePath } from "next/cache";

type AdminJob = {
  id: string;
  [key: string]: any;
};

type PaginatedResponse<T> = {
  content: T[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  first: boolean;
  last: boolean;
};

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function createJobAction(formData: FormData) {
  try {
    const headers = await getAuthHeaders();
    const response = await api.post<AdminJob>("/admin/jobs", formData, {
      headers,
    });
    revalidatePath("/admin");
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error(
      "Error creating job:",
      error?.response?.data || error.message
    );
    console.log(error?.response?.data?.code);
    return {
      success: false,
      error:
        error?.response?.data?.message ||
        error.message ||
        "Erreur lors de la création de l'offre",
    };
  }
}

export async function updateJobAction(id: string, formData: FormData) {
  try {
    const headers = await getAuthHeaders();
    await api.patch(`/admin/jobs/${id}`, formData, {
      headers,
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error(
      "Error updating job:",
      error?.response?.data || error.message
    );
    return {
      success: false,
      error:
        error?.response?.data?.message ||
        error.message ||
        "Erreur lors de la mise à jour de l'offre",
    };
  }
}

export async function deleteJobAction(id: string) {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/admin/jobs/${id}`, {
      headers,
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error(
      "Error deleting job:",
      error?.response?.data || error.message
    );
    return {
      success: false,
      error:
        error?.response?.data?.message ||
        error.message ||
        "Erreur lors de la suppression de l'offre",
    };
  }
}

export async function publishJobAction(id: string) {
  try {
    const headers = await getAuthHeaders();
    await api.patch(`/admin/jobs/${id}/publish`, null, {
      headers,
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error(
      "Error publishing job:",
      error?.response?.data || error.message
    );
    return {
      success: false,
      error:
        error?.response?.data?.message ||
        error.message ||
        "Erreur lors de la publication de l'offre",
    };
  }
}
