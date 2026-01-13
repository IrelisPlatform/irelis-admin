// src/components/recruiter/JobsTable.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Eye,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { JobOffer, PaginatedResponse } from "@/types/job";
import Cookies from "js-cookie";

interface Job {
  id: string;
  title: string;
  status: string;
  location: string;
  type: string;
  candidates: number;
  views: number;
  posted: string;
  salary: string;
  description: string;
  anonymous?: boolean;
}

type SortField = "title" | "candidates" | "views" | "posted";
type SortOrder = "asc" | "desc";

export function JobsTable() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    location: "",
    type: "CDI",
    salary: "",
    description: "",
    anonymous: false,
  });
    const token = Cookies.get("access_token");

  // Charger les offres recruteur
  const loadJobs = async () => {



    setLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
      const res = await fetch(`${backendUrl}/api/v1/jobs/recruiter/my-offers?page=0&size=50`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data: PaginatedResponse<JobOffer> = await res.json();
        const mapped = data.content.map(offer => ({
          id: offer.id,
          title: offer.title,
          status: offer.status || "DRAFT",
          location: `${offer.workCityLocation}, ${offer.workCountryLocation}`.trim(),
          type: offer.contractType,
          candidates: 0, // à remplacer si backend le fournit
          views: 0,
          posted: offer.publishedAt ? new Date(offer.publishedAt).toISOString().split("T")[0] : "",
          salary: offer.salary,
          description: offer.description,
          anonymous: false,
        }));
        setJobs(mapped);
      } else {
        toast.error("Échec du chargement de vos offres");
      }
    } catch (err) {
      console.error("Erreur chargement offres recruteur:", err);
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // Tri
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortedJobs = () => {
    if (!sortField) return filteredJobs;
    
    return [...filteredJobs].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "posted") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Filtres
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedJobs = getSortedJobs();

  // Sélection multiple
  const handleSelectAll = () => {
    if (selectedJobs.length === sortedJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(sortedJobs.map((job) => job.id));
    }
  };

  const handleSelectJob = (jobId: string) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const handleDeleteSelected = () => {
    // ⚠️ Seul l'admin peut supprimer → message info
    toast.info("La suppression est réservée à l'administrateur.");
    setSelectedJobs([]);
  };

  // Création
  const handleCreateJob = async () => {

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim()
      
      const jobPayload = {
        title: newJob.title,
        description: newJob.description,
        workCountryLocation: newJob.location.split(", ")[1] || "Cameroun",
        workCityLocation: newJob.location.split(", ")[0] || newJob.location,
        responsibilities: "",
        requirements: "",
        benefits: "",
        contractType: newJob.type,
        jobType: "FULL_TIME",
        salary: newJob.salary,
        requiredLanguage: "Français",
        sectorName: "Non précisé",
        isUrgent: false,
        isFeatured: false,
        postNumber: 0,
        tagDto: [],
        requiredDocuments: [{ type: "CV" }],
      };

      const res = await fetch(`${backendUrl}/api/v1/jobs/recruiter/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jobPayload)
      });

      if (res.ok) {
        toast.success("Offre créée avec succès");
        loadJobs();
        setIsCreateDialogOpen(false);
        setNewJob({ title: "", location: "", type: "CDI", salary: "", description: "", anonymous: false });
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.message || "Échec de la création");
      }
    } catch (err) {
      toast.error("Erreur réseau");
    }
  };

  // UI helpers
  const getStatusBadge = (status: string) => {
    const variants = {
      PUBLISHED: "bg-green-100 text-green-800 border-green-200",
      PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
      DRAFT: "bg-gray-100 text-gray-800 border-gray-200",
    };
    const labels = {
      PUBLISHED: "Publiée",
      PENDING: "En attente",
      DRAFT: "Brouillon",
    };
    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants] || "bg-gray-100"}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="h-4 w-4 opacity-30" />;
    return sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      {/* Alerte Anti-Arnaque */}
      <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-300">
        <ShieldCheck className="h-5 w-5 text-green-600" />
        <AlertDescription className="ml-2">
          <p className="text-sm text-green-900">
            <span className="font-semibold">Protection anti-arnaque activée : </span>
            Toutes vos offres d'emploi incluent automatiquement un message de sécurité rappelant qu'aucun frais n'est jamais demandé.
          </p>
        </AlertDescription>
      </Alert>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par titre ou localisation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="PUBLISHED">Publiée</SelectItem>
              <SelectItem value="PENDING">En attente</SelectItem>
              <SelectItem value="DRAFT">Brouillon</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="CDI">CDI</SelectItem>
              <SelectItem value="CDD">CDD</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
              <SelectItem value="Stage">Stage</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle offre
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle offre d'emploi</DialogTitle>
                <DialogDescription>
                  Remplissez les informations pour créer une nouvelle offre d'emploi
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre du poste *</Label>
                  <Input
                    id="title"
                    placeholder="ex: Développeur Full Stack"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Localisation *</Label>
                    <Input
                      id="location"
                      placeholder="ex: Paris"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type de contrat *</Label>
                    <Select value={newJob.type} onValueChange={(value) => setNewJob({ ...newJob, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CDI">CDI</SelectItem>
                        <SelectItem value="CDD">CDD</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Stage">Stage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salaire</Label>
                  <Input
                    id="salary"
                    placeholder="ex: 45-55K€"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description du poste</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez les missions, compétences requises..."
                    rows={6}
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  />
                </div>

                {/* Mode anonyme */}
                <div className="border rounded-lg p-4 bg-blue-50 space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="anonymousPosting"
                      checked={newJob.anonymous || false}
                      onCheckedChange={(checked) => setNewJob({ ...newJob, anonymous: checked as boolean })}
                    />
                    <div className="flex-1">
                      <Label htmlFor="anonymousPosting" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                          <EyeOff className="h-4 w-4 text-blue-700" />
                          <span>Publier en mode anonyme</span>
                        </div>
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Masque le nom de votre entreprise sur l'annonce publique. Seuls les candidats qui postulent verront votre identité.
                      </p>
                    </div>
                  </div>
                  {newJob.anonymous && (
                    <div className="bg-white border border-blue-200 rounded-md p-3 space-y-2">
                      <p className="text-sm">
                        <strong className="text-blue-700">Affichage public :</strong>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        • Nom entreprise : <span className="font-mono bg-gray-100 px-1 rounded">Entreprise confidentielle</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        • Logo : Masqué
                      </p>
                      <p className="text-sm text-muted-foreground">
                        • Après candidature : Identité révélée automatiquement
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreateJob} disabled={!newJob.title || !newJob.location}>
                  Créer l'offre
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedJobs.length > 0 && (
        <div className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
          <p>{selectedJobs.length} offre(s) sélectionnée(s)</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Modifier le statut
            </Button>
            <Button variant="outline" size="sm" onClick={handleDeleteSelected}>
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedJobs.length === sortedJobs.length && sortedJobs.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                <div className="flex items-center gap-2">
                  Titre du poste
                  <SortIcon field="title" />
                </div>
              </TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("candidates")}>
                <div className="flex items-center justify-end gap-2">
                  Candidatures
                  <SortIcon field="candidates" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("views")}>
                <div className="flex items-center justify-end gap-2">
                  Vues
                  <SortIcon field="views" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("posted")}>
                <div className="flex items-center gap-2">
                  Date de publication
                  <SortIcon field="posted" />
                </div>
              </TableHead>
              <TableHead>Prétentions salariales</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={10} className="text-center">Chargement...</TableCell></TableRow>
            ) : sortedJobs.length === 0 ? (
              <TableRow><TableCell colSpan={10} className="text-center">Aucune offre trouvée</TableCell></TableRow>
            ) : (
              sortedJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedJobs.includes(job.id)}
                      onCheckedChange={() => handleSelectJob(job.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {job.title}
                      {job.anonymous && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                          <EyeOff className="h-3 w-3 mr-1" />
                          Anonyme
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(job.status)}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{job.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{job.candidates}</TableCell>
                  <TableCell className="text-right">{job.views}</TableCell>
                  <TableCell>{new Date(job.posted).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>{job.salary}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Voir l'offre
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Dupliquer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
