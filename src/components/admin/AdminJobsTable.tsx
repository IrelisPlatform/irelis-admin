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
import { JobDetailsDialog } from "./JobDetailsDialog";
import { useState } from "react";

type AdminJobsFilters = {
  search: string | null;
  status: string | null;
  type: string | null;
  page: number;
};

async function fetchAdminJobs(filters: AdminJobsFilters) {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!API_URL) {
    throw new Error("Backend URL not configured");
  }

  // Récupérer la page (0-indexed pour l'API)
  const page = filters.page;

  // Appel direct au backend avec pagination
  const response = await fetch(
    `${API_URL}/api/v1/jobs/published?page=${page}&size=10`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      response.statusText || `Failed to fetch jobs: ${response.status}`,
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
        job.workCities?.some((city) =>
          city.toLowerCase().includes(searchLower),
        ),
    );
  }

  if (statusFilter !== "all") {
    filteredJobs = filteredJobs.filter((job) => job.status === statusFilter);
  }

  if (typeFilter !== "all") {
    filteredJobs = filteredJobs.filter(
      (job) => job.contractType === typeFilter,
    );
  }

  // Transformer les jobs
  const transformedJobs = filteredJobs.map(transformJob);

  return {
    jobs: transformedJobs,
    totalPages: data.total_pages,
    totalElements: data.total_elements,
    currentPage: data.page,
    first: data.first,
    last: data.last,
  };
}

function AdminJobsTableContent(props: { jobs: PublishedJob[] }) {
  const [selectedJob, setSelectedJob] = useState<PublishedJob | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleRowClick = (job: PublishedJob) => {
    setSelectedJob(job);
    setIsDetailsOpen(true);
  };

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
        <TableRow
          key={job.id}
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          /*  onClick={() => handleRowClick(job)} */
        >
          <TableCell className="font-medium wrap-break-word truncate">
            <span className="truncate block" title={job.title}>
              {job.title}
            </span>
          </TableCell>
          <TableCell className="font-medium">
            <span className="truncate block" title={job.companyName}>
              {job.companyName}
            </span>
          </TableCell>
          <TableCell
            className="truncate"
            title={`${job.title} - ${job.workCountryLocation} - ${job.workCities.join(", ")}`}
          >
            {job.workCities.length === 0 ? (
              <>{job.workCountryLocation}</>
            ) : (
              <span
                title={`${job.title} - ${
                  job.workCountryLocation
                } - ${job.workCities.join(", ")}`}
              >
                {job.workCountryLocation} - {job.workCities.join(", ")}
              </span>
            )}
          </TableCell>
          <TableCell>
            <Badge variant="outline" className=" h-auto py-1">
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
            <AdminJobsTableActions
              job={job}
              onViewDetails={() => handleRowClick(job)}
            />
          </TableCell>
        </TableRow>
      ))}
      <JobDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        job={selectedJob}
      />
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
  const [page] = useQueryState("page", { defaultValue: "0" });

  // Convertir page en nombre (0-indexed)
  const pageNumber = parseInt(page, 10) || 0;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-jobs", { search, status, type, page: pageNumber }],
    queryFn: () => fetchAdminJobs({ search, status, type, page: pageNumber }),
    staleTime: 30 * 1000, // Les données restent "fresh" pendant 30 secondes
    refetchOnMount: false, // Ne pas refetch au montage si les données sont fresh
    refetchOnWindowFocus: false, // Ne pas refetch lors du focus de la fenêtre
    refetchOnReconnect: false, // Ne pas refetch lors de la reconnexion réseau
  });
  console.log("totalPages", data?.totalPages);

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[200px]">Titre</TableHead>
            <TableHead className="w-[150px]">
              Nom de l&apos;entreprise
            </TableHead>
            <TableHead className="w-[200px]">Localisation</TableHead>
            <TableHead className="w-[135px]">Type de contrat</TableHead>
            <TableHead className="w-[100px]">Statut</TableHead>
            <TableHead className="w-[150px]">Date de publication</TableHead>
            <TableHead className="w-[150px]">Date d&apos;expiration</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
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
