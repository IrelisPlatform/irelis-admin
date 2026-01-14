// src/app/api/admin/jobs/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Helper pour obtenir les headers d'authentification
async function getAuthHeaders() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    return {
        Authorization: `Bearer ${token}`,
    };
}

type RouteContext = {
    params: Promise<{ id: string }>;
};

// PATCH - Mettre à jour une offre d'emploi
export async function PATCH(request: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;

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

        const response = await axios.patch(
            `${API_URL}/admin/jobs/${id}`,
            backendFormData,
            {
                headers: {
                    ...authHeaders,
                },
            }
        );

        return NextResponse.json(
            { success: true, data: response.data },
            { status: 200 }
        );
    } catch (error: any) {
        console.error(
            "Error updating job:",
            error?.response?.data || error.message
        );
        return NextResponse.json(
            {
                success: false,
                error:
                    error?.response?.data?.message ||
                    error.message ||
                    "Erreur lors de la mise à jour de l'offre",
            },
            { status: error?.response?.status || 500 }
        );
    }
}

// DELETE - Supprimer une offre d'emploi
export async function DELETE(request: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;

        if (!API_URL) {
            return NextResponse.json(
                { error: "Backend URL not configured" },
                { status: 500 }
            );
        }

        const authHeaders = await getAuthHeaders();

        await axios.delete(`${API_URL}/admin/jobs/${id}`, {
            headers: authHeaders,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        console.error(
            "Error deleting job:",
            error?.response?.data || error.message
        );
        return NextResponse.json(
            {
                success: false,
                error:
                    error?.response?.data?.message ||
                    error.message ||
                    "Erreur lors de la suppression de l'offre",
            },
            { status: error?.response?.status || 500 }
        );
    }
}
