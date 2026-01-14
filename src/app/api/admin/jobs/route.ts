// src/app/api/admin/jobs/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AdminJob } from "@/types/job";
import api from "@/services/axiosServerClient";


const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Helper pour obtenir les headers d'authentification
async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  return {
    Authorization: `Bearer ${token}`,
  };
}

// POST - Créer une nouvelle offre d'emploi
export async function POST(request: NextRequest) {
  try {
    if (!API_URL) {
      return NextResponse.json(
        { error: "Backend URL not configured" },
        { status: 500 }
      );
    }

    const authHeaders = await getAuthHeaders();
    const formData = await request.formData();

    // Reconstruire le FormData pour l'envoi au backend
    const backendFormData = new FormData();

    // Copier toutes les entrées du FormData
    for (const [key, value] of formData.entries()) {
      backendFormData.append(key, value);
    }

    const response = await api.post<AdminJob>(
      `${API_URL}/admin/jobs`,
      backendFormData,
      {
        headers: {
          ...authHeaders,
        },
      }
    );

    return NextResponse.json(
      { success: true, data: response.data },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(
      "Error creating job:",
      error?.response?.data?.message || error.message
    );
    return NextResponse.json(
      {
        success: false,
        error:
          error?.response?.data?.message ||
          error.message ||
          "Erreur lors de la création de l'offre",
      },
      { status: error?.response?.status || 500 }
    );
  }
}
