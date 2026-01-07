// src/components/admin/AdminJobsTable.tsx

import { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDateLong, formatDateRelative } from "@/services/date";
import { getContractTypeLabel, getStatusBadge } from "@/lib/jobs/job-helpers";
import { AdminJobsTableActions } from "./AdminJobsTableActions";
import { PublishedJob } from "@/types/job";
import { Spinner } from "@/components/ui/spinner";
import { adminJobsParamsCache } from "@/app/admin/job-search-params";
import { JobPage } from "@/types/job";
import { transformJob } from "@/hooks/usePublishedJobs";
import { headers } from "next/headers";

async function getJobs({
  search,
  status,
  type,
}: {
  search: string;
  status: string;
  type: string;
}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (status) params.set("status", status);
  if (type) params.set("type", type);

  // Use the Next.js API route with absolute URL
  const response = await fetch(
    `http://localhost:3000/api/admin/jobs?${params.toString()}`,
    {
      cache: "no-store",
    }
  );
  const result = await response.json();
  if (result.error) {
    console.log(result.error);
    throw new Error(result.error);
  }

  const data = result as JobPage;
  console.log(data);
  const transformedJobs = data.content.map(transformJob);
  return {
    jobs: transformedJobs,
    totalPages: data.total_pages,
    totalElements: data.total_elements,
    first: data.first,
    last: data.last,
  };
}

function AdminJobsTableContent({ jobs }: { jobs: PublishedJob[] }) {
  if (jobs.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={8} className="text-center py-8">
          Aucune offre trouvée
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {jobs.map((job) => (
        <TableRow key={job.id}>
          <TableCell className="font-medium">{job.title}</TableCell>
          <TableCell className="font-medium">{job.companyName}</TableCell>
          <TableCell>
            {job.workCityLocation}, {job.workCountryLocation}
          </TableCell>
          <TableCell>
            <Badge variant="outline">
              {getContractTypeLabel(job.contractType)}
            </Badge>
          </TableCell>
          <TableCell>{getStatusBadge(job.status)}</TableCell>
          <TableCell>
            {job.publishedAt ? formatDateRelative(job.publishedAt) : "—"}
          </TableCell>
          <TableCell className="text-sm">
            {job.expirationDate
              ? formatDateLong(job.expirationDate)
              : job.status === "PUBLISHED"
              ? "Postuler au plus tôt"
              : "Non publiée"}
          </TableCell>
          <TableCell>
            <AdminJobsTableActions job={job} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export async function AdminJobsTable() {
  // Récupérer les paramètres de recherche côté serveur
  const search = adminJobsParamsCache.get("search");
  const status = adminJobsParamsCache.get("status");
  const type = adminJobsParamsCache.get("type");
  const { jobs } = await getJobs({ search, status, type });

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Titre</TableHead>
            <TableHead>Nom de l'entreprise</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Type de contrat</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date de publication</TableHead>
            <TableHead>Date d'expiration</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense
            fallback={
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <Spinner className="h-4 w-4" />
                </TableCell>
              </TableRow>
            }
          >
            <AdminJobsTableContent jobs={jobs} />
          </Suspense>
        </TableBody>
      </Table>
    </div>
  );
}
