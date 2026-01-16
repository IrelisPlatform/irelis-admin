// src/components/admin/AdminJobsPagination.tsx

"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { JobPage } from "@/types/job";

/**
 * Fonction pour récupérer le nombre total de pages depuis l'API
 */
async function fetchTotalPages(): Promise<{ totalPages: number; currentPage: number }> {
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!API_URL) {
        throw new Error("Backend URL not configured");
    }

    const response = await fetch(
        `${API_URL}/api/v1/jobs/published`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch pagination info: ${response.status}`);
    }

    const data = (await response.json()) as JobPage;
    return {
        totalPages: data.total_pages,
        currentPage: data.page,
    };
}

/**
 * Composant de pagination pour la table des offres d'emploi admin.
 * 
 * Affiche une navigation de pagination avec :
 * - Un bouton "Précédent"
 * - Des numéros de pages avec ellipses (...) pour les grandes listes
 * - Un bouton "Suivant"
 */
export function AdminJobsPagination() {
    // Récupérer la page actuelle depuis l'URL (0-indexed)
    const [page, setPage] = useQueryState("page", { defaultValue: "0" });
    const currentPage = parseInt(page, 10) || 0;

    // Récupérer le nombre total de pages
    const { data: paginationData } = useQuery({
        queryKey: ["admin-jobs", "admin-jobs-pagination"],
        queryFn: fetchTotalPages,
        staleTime: 30 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const totalPages = paginationData?.totalPages ?? 1;

    console.log("totlaPages", totalPages)
    // Ne pas afficher la pagination s'il n'y a qu'une seule page
    /*    if (totalPages <= 1) {
           return null;
       } */

    // Fonction pour changer de page (mise à jour de l'URL)
    const onPageChange = (newPage: number) => {
        // S'assurer que la page est dans les limites valides
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage.toString());
        }
    };

    // Générer les numéros de pages à afficher (affichage 1-indexed pour l'utilisateur)
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const displayPage = currentPage + 1 // Convertir en 1-indexed pour l'affichage
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

    // Page actuelle pour l'affichage (1-indexed)
    const displayCurrentPage = currentPage + 1;

    return (
        <Pagination className="py-8">
            <PaginationContent className="gap-1">
                {/* Bouton Précédent */}
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
                                    // Convertir de 1-indexed (affichage) vers 0-indexed (API)
                                    onPageChange((pageNum as number) - 1);
                                }}
                                className={`rounded-full min-w-[40px] ${displayCurrentPage === pageNum
                                    ? "bg-[#1e3a8a] text-white hover:bg-[#1e40af] hover:text-white border-0"
                                    : "border border-input hover:border-[#1e3a8a] hover:text-[#1e3a8a] bg-background"
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
