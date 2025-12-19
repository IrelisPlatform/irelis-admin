// src/app/admin/page.tsx

"use client"

import { AdminJobsTable } from "@/components/admin/AdminJobsTable";

export default function AdminDashboardPage() {

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