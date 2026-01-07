// src/components/admin/AdminJobsFilters.tsx

"use client";

import { useQueryState } from "nuqs";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AdminJobsFilters() {
  const [searchTerm, setSearchTerm] = useQueryState("search");
  const [statusFilter, setStatusFilter] = useQueryState("status");
  const [typeFilter, setTypeFilter] = useQueryState("type");

  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par titre ou localisation..."
            value={searchTerm || ""}
            onChange={(e) => setSearchTerm(e.target.value || null)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Select value={statusFilter || "all"} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" /> Statut
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="PUBLISHED">Publiée</SelectItem>
            <SelectItem value="PENDING">En attente</SelectItem>
            <SelectItem value="DRAFT">Brouillon</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter || "all"} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" /> Type
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="CDI">CDI</SelectItem>
            <SelectItem value="CDD">CDD</SelectItem>
            <SelectItem value="CDI_PART_TIME">CDI (Temps partiel)</SelectItem>
            <SelectItem value="CDD_PART_TIME">CDD (Temps partiel)</SelectItem>
            <SelectItem value="FREELANCE">Freelance</SelectItem>
            <SelectItem value="INTERNSHIP">Stage</SelectItem>
            <SelectItem value="ALTERNATIVE">Alternance</SelectItem>
            <SelectItem value="INTERIM">Intérim</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
