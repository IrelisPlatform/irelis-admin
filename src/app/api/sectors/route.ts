// src/app/api/sectors/route.ts

import { NextResponse } from "next/server";
import { apiRequest } from "@/lib/api/client";

export interface Sector {
  id: string;
  name: string;
}

export async function GET() {
  try {
    const sectors = await apiRequest<Sector[]>("/api/v1/sectors");
    return NextResponse.json(sectors);
  } catch (error: any) {
    console.error("Error fetching sectors:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors du chargement des secteurs" },
      { status: 500 }
    );
  }
}
