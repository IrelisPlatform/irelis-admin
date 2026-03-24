// src/components/admin/AdminServicesTable.tsx
"use client";

import { useState } from "react";
import { useQueryState } from "nuqs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle } from "lucide-react";
import {
  Search,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useAccompaniments, useCategories } from "@/hooks/admin/useAccompaniments";
import { Accompaniment } from "@/types/accompaniment";
import { Category } from "@/types/category";

import { ServiceDetailsDialog } from "./ServiceDetailsDialog";
import { EditServiceDialog } from "./EditServiceDialog";
import { DeleteServiceDialog } from "./DeleteServiceDialog";
import { CreateServiceDialog } from "./CreateServiceDialog";

const PAGE_SIZE = 10;

// Sous-composant Actions (dropdown 3 points)
function ServiceRowActions({ service }: { service: Accompaniment }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-gray-800"
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[160px]">
          <DropdownMenuItem onClick={() => setDetailsOpen(true)}>
            <Eye className="h-4 w-4 mr-2 text-gray-600" />
            Voir les détails
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil className="h-4 w-4 mr-2 text-gray-600" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="text-red-600 focus:text-red-700 focus:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2 text-red-600" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ServiceDetailsDialog
        service={service}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
      <EditServiceDialog
        service={service}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <DeleteServiceDialog
        service={service}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}

// Pagination 
function ServicesPagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const displayPage = currentPage + 1;
    const showEllipsisStart = displayPage > 3;
    const showEllipsisEnd = displayPage < totalPages - 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
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

  if (totalPages <= 1) return null;

  const displayCurrent = currentPage + 1;

  return (
    <Pagination className="py-6">
      <PaginationContent className="gap-1">
        <PaginationItem>
          <PaginationLink
            href="#"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 0) onPageChange(currentPage - 1);
            }}
            aria-disabled={currentPage === 0}
            className={`gap-1 pl-2.5 rounded-full ${currentPage === 0
              ? "pointer-events-none opacity-50 border border-input"
              : "border border-input hover:border-[#1e3a8a] hover:text-[#1e3a8a] bg-background"
              }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Précédent</span>
          </PaginationLink>
        </PaginationItem>

        {getPageNumbers().map((pageNum, index) => (
          <PaginationItem key={index}>
            {pageNum === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                size="sm"
                isActive={displayCurrent === pageNum}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange((pageNum as number) - 1);
                }}
                className={`rounded-full min-w-[36px] ${displayCurrent === pageNum
                  ? "bg-[#1e3a8a] text-white hover:bg-[#1e40af] hover:text-white border-0"
                  : "border border-input hover:border-[#1e3a8a] hover:text-[#1e3a8a] bg-background"
                  }`}
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            href="#"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
            }}
            aria-disabled={currentPage >= totalPages - 1}
            className={`gap-1 pr-2.5 rounded-full ${currentPage >= totalPages - 1
              ? "pointer-events-none opacity-50 border border-input"
              : "border border-input hover:border-[#1e3a8a] hover:text-[#1e3a8a] bg-background"
              }`}
          >
            <span>Suivant</span>
            <ChevronRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

// Loading & Error 
function TableLoading() {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-6">
        <div className="flex items-center justify-center gap-2">
          <Spinner className="h-5 w-5" />
          <span className="text-muted-foreground">Chargement des services...</span>
        </div>
      </TableCell>
    </TableRow>
  );
}

function TableError({ message }: { message: string }) {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-12">
        <div className="flex flex-col items-center justify-center gap-2 text-red-500">
          <AlertCircle className="h-6 w-6" />
          <span className="font-medium text-red-700">{message}</span>
        </div>
      </TableCell>
    </TableRow>
  );
}

// Composant principal
export function AdminServicesTable() {
  const [pageParam, setPageParam] = useQueryState("page", { defaultValue: "0" });
  const currentPage = parseInt(pageParam, 10) || 0;

  // Optionnel: filtrage par nom ou catégorie côté client
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Fetch API
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
  } = useCategories();

  const {
    data: accompanimentsData,
    isLoading: isLoadingAcc,
    isError,
    error,
  } = useAccompaniments(currentPage, PAGE_SIZE);

  const categories = categoriesData || [];

  // Helpers
  const getCategoryName = (id: string) => {
    return categories.find((c) => c.categoryId === id)?.name || "Aucune catégorie.";
  };

  const displayedServices = (accompanimentsData?.content || []).filter((s) => {
    const matchSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      categoryFilter === "all" || s.categoryId === categoryFilter;
    return matchSearch && matchCat;
  });

  const handlePageChange = (pageIndex: number) => {
    setPageParam(pageIndex.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = accompanimentsData?.total_pages || 0;
  const isLoading = isLoadingAcc || isLoadingCategories;

  return (
    <div className="space-y-4">
      {/* Barre de filtres + bouton créer */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
          disabled={isLoadingCategories}
        >
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Toutes les catégories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.categoryId} value={cat.categoryId}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <CreateServiceDialog categories={categories}>
          <Button className="bg-[#14548C] hover:bg-[#0d3a5f] shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau service
          </Button>
        </CreateServiceDialog>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700 w-[220px] max-w-[220px]">
                Titre
              </TableHead>
              <TableHead className="font-semibold text-gray-700 w-[200px] max-w-[200px]">
                Description
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Catégorie
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Durée
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Prix d'origine
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Prix
              </TableHead>
              <TableHead className="font-semibold text-gray-700 text-right pr-4 w-[60px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoading />
            ) : isError ? (
              <TableError message={error?.message || "Erreur de chargement des services"} />
            ) : displayedServices.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-12 text-muted-foreground"
                >
                  Aucun service trouvé.
                </TableCell>
              </TableRow>
            ) : (
              displayedServices.map((service) => {
                return (
                  <TableRow
                    key={service.title || service.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Titre */}
                    <TableCell className="max-w-[220px]">
                      <p
                        className="font-medium text-gray-900 leading-tight truncate"
                        title={service.title}
                      >
                        {service.title}
                      </p>
                    </TableCell>

                    {/* Description */}
                    <TableCell className="max-w-[200px]">
                      <span
                        className="text-sm text-gray-600 truncate block"
                        title={service.shortDescription}
                      >
                        {service.shortDescription}
                      </span>
                    </TableCell>

                    {/* Catégorie */}
                    <TableCell>
                      <Badge variant="secondary" className="text-xs whitespace-nowrap">
                        {getCategoryName(service.categoryId)}
                      </Badge>
                    </TableCell>

                    {/* Durée */}
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {service.duration}
                      </span>
                    </TableCell>

                    {/* Prix Original */}
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {service.originalPrice.toLocaleString()} FCFA
                      </span>
                    </TableCell>

                    {/* Prix */}
                    <TableCell>
                      <span className="text-sm font-semibold text-gray-900">
                        {service.price.toLocaleString()} FCFA
                      </span>
                    </TableCell>

                    {/* Actions — 3 points verticaux */}
                    <TableCell className="text-center pr-2">
                      <ServiceRowActions service={service} />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Serveur */}
      {!isLoading && !isError && totalPages > 1 && (
        <ServicesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
