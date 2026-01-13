// src/app/_actions/jobs.ts

"use server";

import { cookies } from "next/headers";
import api from "@/services/axiosServerClient";
import { revalidatePath } from "next/cache";

export type AdminJob = {
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
  console.log("ccokieStore", cookieStore.get("access_token")?.value);
  const token = cookieStore.get("access_token")?.value;

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function createJobAction(formData: FormData) {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/jobs`,
      {
        method: "POST",
        headers: {
          ...headers,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error creating job:", errorData);
      console.log(errorData?.code);
      return {
        success: false,
        error:
          errorData?.message || "Erreur lors de la création de l'offre",
      };
    }

    const data: AdminJob = await response.json();
    revalidatePath("/admin");
    return { success: true, data };
  } catch (error: any) {
    console.error("Error creating job:", error.message);
    return {
      success: false,
      error: error.message || "Erreur lors de la création de l'offre",
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
