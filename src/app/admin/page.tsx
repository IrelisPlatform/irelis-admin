// src/app/admin/page.tsx

import { Suspense } from "react";
import { AdminJobsTable } from "@/components/admin/AdminJobsTable";
import { AdminJobsFilters } from "@/components/admin/AdminJobsFilters";
import { CreateJobDialog } from "@/components/admin/CreateJobDialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageProps } from "@/lib/pageParams";
import { adminJobsParamsCache } from "./job-search-params";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";

export default async function AdminDashboardPage({ searchParams }: PageProps) {
  await adminJobsParamsCache.parse(searchParams);

  return (
    <div className="space-y-8">
      <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-300">
        <ShieldCheck className="h-5 w-5 text-green-600" />
        <AlertDescription className="ml-2">
          <p className="text-sm text-green-900">
            <span className="font-semibold">Espace administration :</span> Vous
            gérez toutes les offres de la plateforme.
          </p>
        </AlertDescription>
      </Alert>
      <div className="flex max-sm:items-start items-center justify-between max-sm:flex-col gap-y-4 mb-12">
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

      {/*   <Suspense
        fallback={<div className="text-center py-8">Chargement...</div>}
      > */}
      <AdminJobsTable />
      {/*  </Suspense> */}
    </div>
  );
}
