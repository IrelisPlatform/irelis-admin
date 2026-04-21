"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Briefcase,
  AlertCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { useQueryState } from "nuqs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAdminCandidates } from "@/hooks/candidates/useAdminCandidates";
import { CandidateResponse } from "@/types/candidate";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { formatDateRelative } from "@/services/date";
import { Alert, AlertDescription } from "../ui/alert";

export function AdminCandidates() {
  const router = useRouter();
  const [pageQuery, setPageQuery] = useQueryState("page", {
    defaultValue: "0",
  });
  const page = parseInt(pageQuery, 10) || 0;
  const [size, setSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [profileFilter, setProfileFilter] = useState("all");

  const { data, isLoading } = useAdminCandidates(page, size);

  const candidates = data?.content || [];

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      (c.firstName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (c.lastName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (c.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (c.professionalTitle?.toLowerCase() || "").includes(
        searchTerm.toLowerCase(),
      );

    const matchesExp =
      experienceFilter === "all" || c.experienceLevel === experienceFilter;

    const matchesProfile =
      profileFilter === "all" ||
      (profileFilter === "complete" && c.completionRate >= 80) ||
      (profileFilter === "medium" &&
        c.completionRate >= 50 &&
        c.completionRate < 80) ||
      (profileFilter === "incomplete" && c.completionRate < 50);

    return matchesSearch && matchesExp && matchesProfile;
  });

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  const getCompletionBadge = (rate: number, missing: string[]) => {
    if (rate >= 80) {
      return (
        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 rounded-full">
          Excellent
        </Badge>
      );
    }
    if (rate >= 50) {
      return (
        <Badge className="bg-orange-100 text-orange-800 border-orange-200 rounded-full">
          Moyen
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 text-red-800 border-red-200 rounded-full">
        Incomplet
      </Badge>
    );
  };

  const totalPages = data?.total_pages ?? 1;

  const onPageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPageQuery(newPage.toString());
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const displayPage = page + 1;
    const showEllipsisStart = displayPage > 3;
    const showEllipsisEnd = displayPage < totalPages - 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (showEllipsisStart) pages.push("...");
      const start = Math.max(2, displayPage - 1);
      const end = Math.min(totalPages - 1, displayPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (showEllipsisEnd) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const displayCurrentPage = page + 1;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Alert className="bg-linear-to-r from-blue-50 to-indigo-50 border-blue-300">
        <UsersIcon className="h-5 w-5 text-blue-600" />
        <AlertDescription className="ml-2">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Base de Candidats :</span> Consultez
            et analysez les profils candidats centralisés sur la plateforme
            Irelis.
          </p>
        </AlertDescription>
      </Alert>
      <div>
        <h1 className="text-3xl font-bold text-[#1e3a8a] flex items-center gap-2">
          Base de Candidats
        </h1>
        <p className="text-muted-foreground mt-2">
          Accédez à l’ensemble des profils candidats, explorez leurs
          compétences, formations et d'autres informations.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, email ou titre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* <Select value={experienceFilter} onValueChange={setExperienceFilter}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Expérience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes expériences</SelectItem>
            <SelectItem value="BEGINNER">Débutant</SelectItem>
            <SelectItem value="JUNIOR">Junior</SelectItem>
            <SelectItem value="INTERMEDIATE">Intermédiaire</SelectItem>
            <SelectItem value="ADVANCED">Avancé</SelectItem>
            <SelectItem value="SENIOR">Sénior</SelectItem>
            <SelectItem value="EXPERT">Expert</SelectItem>
          </SelectContent>
        </Select> */}

        <Select value={profileFilter} onValueChange={setProfileFilter}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Profil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous profils</SelectItem>
            <SelectItem value="incomplete">Incomplet</SelectItem>
            <SelectItem value="medium">Moyen</SelectItem>
            <SelectItem value="complete">Excellent</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          className="bg-[#14548C] text-white hover:bg-[#0d3a5f] hover:text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Exporter (CSV)
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">
                Candidat
              </TableHead>
              <TableHead className="font-semibold text-gray-700 w-[220px] max-w-[220px]">
                Titre Professionnel
              </TableHead>
              {/* <TableHead className="font-semibold text-gray-700">
                Expérience
              </TableHead> */}
              <TableHead className="font-semibold text-gray-700">
                Profil
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Candidatures
              </TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Spinner className="w-8 h-8 mb-4 text-blue-600" />
                    Chargement des candidats...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredCandidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <UsersIcon className="w-12 h-12 mb-4 text-muted-foreground/50" />
                    Aucun candidat trouvé
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCandidates.map((candidate) => (
                <TableRow
                  key={candidate.id}
                  className="bg-gray-50 hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border shadow-sm">
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                          {getInitials(candidate.firstName, candidate.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">
                          {candidate.firstName} {candidate.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {candidate.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[220px]">
                    <div className="font-medium text-sm text-foreground/80 leading-tight truncate">
                      {candidate.professionalTitle || (
                        <span className="text-muted-foreground italic ">
                          Non renseigné
                        </span>
                      )}
                    </div>
                  </TableCell>
                  {/* <TableCell>
                    {candidate.experienceLevel ? (
                      <Badge variant="secondary" className="capitalize">
                        {candidate.experienceLevel.toLowerCase()}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </TableCell> */}
                  <TableCell>
                    <div className="flex flex-col gap-1 items-start">
                      {getCompletionBadge(
                        candidate.completionRate,
                        candidate.missingFields,
                      )}
                      <div className="flex gap-1 mt-1">
                        {candidate.hasCv && (
                          <FileText className="w-3 h-3 text-blue-500" />
                        )}
                        {candidate.hasExperiences && (
                          <Briefcase className="w-3 h-3 text-blue-500" />
                        )}
                        {candidate.hasEducation && (
                          <GraduationCap className="w-3 h-3 text-blue-500" />
                        )}
                        {candidate.hasSkills && (
                          <AlertCircle className="w-3 h-3 text-blue-500" />
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium text-sm text-foreground/80">
                    {candidate.applicationCount}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        router.push(`/admin/candidates/${candidate.id}`)
                      }
                      className="text-blue-600 cursor-pointer hover:text-blue-800 hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t p-4">
          <Pagination>
            <PaginationContent className="gap-1">
              {/* Bouton Précédent */}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 0) onPageChange(page - 1);
                  }}
                  aria-disabled={page === 0}
                  className={`gap-1 pl-2.5 rounded-full ${
                    page === 0
                      ? "pointer-events-none opacity-50 border border-input"
                      : "border border-input hover:border-[#1e3a8a] text-gray-700 hover:text-[#1e3a8a] bg-background"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Précédent</span>
                </PaginationLink>
              </PaginationItem>

              {/* Numéros de pages */}
              {getPageNumbers().map((pageNum, index) => (
                <PaginationItem key={index}>
                  {pageNum === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      size="sm"
                      isActive={displayCurrentPage === pageNum}
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange((pageNum as number) - 1);
                      }}
                      className={`rounded-full min-w-10 ${
                        displayCurrentPage === pageNum
                          ? "bg-[#1e3a8a] hover:bg-[#1e40af] text-white hover:text-white border-0"
                          : "border border-input text-gray-700 hover:border-[#1e3a8a] hover:text-[#1e3a8a] bg-background"
                      }`}
                    >
                      {pageNum}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              {/* Bouton Suivant */}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < totalPages - 1) onPageChange(page + 1);
                  }}
                  aria-disabled={page >= totalPages - 1}
                  className={`gap-1 pr-2.5 rounded-full ${
                    page >= totalPages - 1
                      ? "pointer-events-none opacity-50 border border-input"
                      : "border border-input hover:border-[#1e3a8a] text-gray-700 hover:text-[#1e3a8a] bg-background"
                  }`}
                >
                  <span className="hidden sm:inline">Suivant</span>
                  <ChevronRight className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
