// src/components/admin/AdminJobsTable.tsx

"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
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
import { PublishedJob, JobPage, BackendPublishedJob } from "@/types/job";
import { Spinner } from "@/components/ui/spinner";
import { transformJob } from "@/hooks/usePublishedJobs";
import { AlertCircle } from "lucide-react";

type AdminJobsFilters = {
  search: string | null;
  status: string | null;
  type: string | null;
};

async function fetchAdminJobs(filters: AdminJobsFilters) {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!API_URL) {
    throw new Error("Backend URL not configured");
  }

  // Appel direct au backend
  const response = await fetch(
    `${API_URL}/api/v1/jobs/published?page=0&size=100`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      response.statusText || `Failed to fetch jobs: ${response.status}`
    );
  }

  const rawData = await response.text();
  if (!rawData.trim()) {
    throw new Error("Réponse vide du serveur");
  }

  const data = JSON.parse(rawData) as JobPage;
  let filteredJobs: BackendPublishedJob[] = data.content;

  // Appliquer les filtres côté client
  const searchTerm = filters.search || "";
  const statusFilter = filters.status || "all";
  const typeFilter = filters.type || "all";

  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchLower) ||
        job.workCityLocation?.toLowerCase().includes(searchLower) ||
        job.companyName?.toLowerCase().includes(searchLower)
    );
  }

  if (statusFilter !== "all") {
    filteredJobs = filteredJobs.filter((job) => job.status === statusFilter);
  }

  if (typeFilter !== "all") {
    filteredJobs = filteredJobs.filter(
      (job) => job.contractType === typeFilter
    );
  }

  // Transformer les jobs
  const transformedJobs = filteredJobs.map(transformJob);

  return {
    jobs: transformedJobs,
    totalPages: Math.ceil(transformedJobs.length / data.size),
    totalElements: transformedJobs.length,
    first: data.first,
    last: data.last,
  };
}

function AdminJobsTableContent(props: { jobs: PublishedJob[] }) {
  if (props.jobs.length === 0) {
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
      {props.jobs.map((job) => (
        <TableRow key={job.id}>
          <TableCell className="font-medium">{job.title}</TableCell>
          <TableCell className="font-medium">{job.companyName}</TableCell>
          {/*   {<TableCell>
            {job.workCityLocation}, {job.workCountryLocation}
          </TableCell>} */}
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

function AdminJobsTableLoading() {
  return (
    <TableRow>
      <TableCell colSpan={8} className="text-center py-8">
        <div className="flex items-center justify-center gap-2">
          <Spinner className="h-4 w-4" />
          <span className="text-muted-foreground">
            Chargement des offres...
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
}

function AdminJobsTableError(props: { message: string }) {
  return (
    <TableRow>
      <TableCell colSpan={8} className="text-center py-8">
        <div className="flex items-center justify-center gap-2 text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{props.message}</span>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function AdminJobsTable() {
  const [search] = useQueryState("search");
  const [status] = useQueryState("status");
  const [type] = useQueryState("type");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-jobs", { search, status, type }],
    queryFn: () => fetchAdminJobs({ search, status, type }),
  });

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Titre</TableHead>
            <TableHead>Nom de l&apos;entreprise</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Type de contrat</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date de publication</TableHead>
            <TableHead>Date d&apos;expiration</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <AdminJobsTableLoading />
          ) : isError ? (
            <AdminJobsTableError
              message={error?.message || "Une erreur est survenue"}
            />
          ) : (
            <AdminJobsTableContent jobs={data?.jobs ?? []} />
          )}
        </TableBody>
      </Table>
    </div>
  );
}
