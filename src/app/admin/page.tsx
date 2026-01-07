// src/app/admin/page.tsx

import { Suspense } from "react";
import { AdminJobsTable } from "@/components/admin/AdminJobsTable";
import { AdminJobsFilters } from "@/components/admin/AdminJobsFilters";
import { CreateJobDialog } from "@/components/admin/CreateJobDialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageProps } from "@/lib/pageParams";
import { adminJobsParamsCache } from "./job-search-params";

export default async function AdminDashboardPage({ searchParams }: PageProps) {
  await adminJobsParamsCache.parse(searchParams);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a8a]">
            Tableau de bord administrateur
          </h1>
          <p className="text-muted-foreground">
            Gérez toutes les offres d'emploi de la plateforme.
          </p>
        </div>
        <CreateJobDialog>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Nouvelle offre
          </Button>
        </CreateJobDialog>
      </div>

      <AdminJobsFilters />

      <Suspense
        fallback={<div className="text-center py-8">Chargement...</div>}
      >
        <AdminJobsTable />
      </Suspense>
    </div>
  );
}
