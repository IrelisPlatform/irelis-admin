// src/app/api/admin/jobs/[id]/publish/route.ts

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

// PATCH - Publier une offre d'emploi
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

        await axios.patch(
            `${API_URL}/api/v1/admin/jobs/${id}/publish`,
            null,
            {
                headers: authHeaders,
            }
        );

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        console.error(
            "Error publishing job:",
            error?.response?.data || error.message
        );
        return NextResponse.json(
            {
                success: false,
                error:
                    error?.response?.data?.message ||
                    error.message ||
                    "Erreur lors de la publication de l'offre",
            },
            { status: error?.response?.status || 500 }
        );
    }
}
