// src/app/admin/page.tsx

"use client"

import { AdminJobsTable } from "@/components/admin/AdminJobsTable";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  // Optionnel : redirection si pas de token (double sécurité)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        window.location.href = "/admin/login";
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a8a]">Tableau de bord administrateur</h1>
        <p className="text-muted-foreground">Gérez toutes les offres d’emploi de la plateforme.</p>
      </div>
      <AdminJobsTable />
    </div>
  );
}