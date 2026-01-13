// src/components/recruiter/UnifiedCandidate.tsx

"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Mail,
  Phone,
  Eye,
  Star,
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
  GraduationCap,
  Languages,
  Clock,
  Briefcase,
  DollarSign,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
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

interface ATSCandidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  status: "new" | "screening" | "shortlisted" | "interview-scheduled" | "interview-done" | "offer-sent" | "hired" | "rejected" | "withdrawn" | "on-hold";
  experience: string;
  location: string;
  appliedDate: string;
  salaryRange: string;
  source: "application";
}

const atsCandidates: ATSCandidate[] = [
  {
    id: "ats-1",
    name: "Aminata Ndiaye",
    email: "aminata.ndiaye@email.com",
    phone: "+237 6 91 23 45 67",
    jobTitle: "Développeur Full Stack Senior",
    status: "interview-scheduled",
    experience: "5 ans",
    location: "Douala",
    appliedDate: "2024-10-28",
    salaryRange: "3.2M - 3.8M FCFA",
    source: "application",
  },
  {
    id: "ats-2",
    name: "Jean-Paul Mbarga",
    email: "jp.mbarga@email.com",
    phone: "+237 6 77 88 99 00",
    jobTitle: "Développeur Full Stack Senior",
    status: "new",
    experience: "3 ans",
    location: "Yaoundé",
    appliedDate: "2024-10-30",
    salaryRange: "2.5M - 3M FCFA",
    source: "application",
  },
  {
    id: "ats-3",
    name: "Grace Tchamba",
    email: "grace.tchamba@email.com",
    phone: "+237 6 55 44 33 22",
    jobTitle: "Chef de Projet Digital",
    status: "shortlisted",
    experience: "7 ans",
    location: "Douala",
    appliedDate: "2024-10-25",
    salaryRange: "4M - 4.5M FCFA",
    source: "application",
  },
  {
    id: "ats-4",
    name: "Kofi Mensah",
    email: "k.mensah@email.com",
    phone: "+233 24 567 8901",
    jobTitle: "UX/UI Designer",
    status: "offer-sent",
    experience: "4 ans",
    location: "Accra",
    appliedDate: "2024-10-20",
    salaryRange: "200K - 280K FCFA/j",
    source: "application",
  },
  {
    id: "ats-5",
    name: "Ibrahim Diallo",
    email: "ibrahim.diallo@email.com",
    phone: "+237 6 22 33 44 55",
    jobTitle: "Chef de Projet Digital",
    status: "new",
    experience: "4 ans",
    location: "Yaoundé",
    appliedDate: "2024-10-31",
    salaryRange: "2.8M - 3.5M FCFA",
    source: "application",
  },
  {
    id: "ats-6",
    name: "Fatou Kamara",
    email: "fatou.kamara@email.com",
    phone: "+221 77 123 45 67",
    jobTitle: "Data Analyst",
    status: "screening",
    experience: "6 ans",
    location: "Dakar",
    appliedDate: "2024-10-27",
    salaryRange: "3.5M - 4.2M FCFA",
    source: "application",
  },
];

type SortField = "name" | "appliedDate";
type SortOrder = "asc" | "desc";

export function UnifiedCandidates() {
  const [atsCandidatesList, setAtsCandidatesList] = useState<ATSCandidate[]>(atsCandidates);
  
  // ATS Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  
  // Advanced Filters - Africa-specific
  const [educationFilter, setEducationFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [contractTypeFilter, setContractTypeFilter] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Interactive candidate panel
  const [selectedCandidate, setSelectedCandidate] = useState<ATSCandidate | null>(null);
  const [quickMessage, setQuickMessage] = useState("");

  // ATS Functions
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortedATSCandidates = () => {
    if (!sortField) return filteredATSCandidates;
    
    return [...filteredATSCandidates].sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

      if (sortField === "appliedDate") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filteredATSCandidates = atsCandidatesList.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter;
    const matchesJob = jobFilter === "all" || candidate.jobTitle === jobFilter;
    return matchesSearch && matchesStatus && matchesJob;
  });

  const sortedATSCandidates = getSortedATSCandidates();

  const handleSelectAll = () => {
    if (selectedCandidates.length === sortedATSCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(sortedATSCandidates.map((candidate) => candidate.id));
    }
  };

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const getStatusBadge = (status: ATSCandidate["status"]) => {
    const variants = {
      new: "bg-blue-100 text-blue-800 border-blue-200",
      screening: "bg-indigo-100 text-indigo-800 border-indigo-200",
      shortlisted: "bg-purple-100 text-purple-800 border-purple-200",
      "interview-scheduled": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "interview-done": "bg-amber-100 text-amber-800 border-amber-200",
      "offer-sent": "bg-green-100 text-green-800 border-green-200",
      hired: "bg-emerald-100 text-emerald-800 border-emerald-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
      withdrawn: "bg-gray-100 text-gray-800 border-gray-200",
      "on-hold": "bg-orange-100 text-orange-800 border-orange-200",
    };
    const labels = {
      new: "Nouveau",
      screening: "En examen",
      shortlisted: "Pré-sélectionné",
      "interview-scheduled": "Entretien programmé",
      "interview-done": "Entretien réalisé",
      "offer-sent": "Offre envoyée",
      hired: "Embauché",
      rejected: "Refusé",
      withdrawn: "Désisté",
      "on-hold": "En attente",
    };
    return (
      <Badge variant="outline" className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="h-4 w-4 opacity-30" />;
    return sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const uniqueJobs = Array.from(new Set(atsCandidatesList.map((c) => c.jobTitle)));

  // Quick message templates
  const messageTemplates = [
    "Votre profil nous intéresse ! Êtes-vous disponible pour un entretien la semaine prochaine ?",
    "Merci pour votre candidature. Nous revenons vers vous sous 48h.",
    "Félicitations ! Nous souhaitons vous proposer un entretien. Quand êtes-vous disponible ?",
    "Nous avons bien reçu votre candidature et l'étudions actuellement.",
    "Malheureusement, votre profil ne correspond pas au poste pour le moment. Nous gardons votre CV en base.",
  ];

  const handleSendQuickMessage = () => {
    if (!quickMessage.trim() || !selectedCandidate) return;
    
    toast.success(`Message envoyé à ${selectedCandidate.name}`, {
      description: "Le candidat recevra votre message par email et SMS.",
    });
    setQuickMessage("");
  };

  const handleUpdateStatus = (status: ATSCandidate["status"]) => {
    if (!selectedCandidate) return;
    
    setAtsCandidatesList((prev) =>
      prev.map((c) =>
        c.id === selectedCandidate.id ? { ...c, status } : c
      )
    );
    setSelectedCandidate({ ...selectedCandidate, status });
    toast.success("Statut mis à jour");
  };

  const handleOpenCandidate = (candidate: ATSCandidate) => {
    setSelectedCandidate(candidate);
    setQuickMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Gestion des candidatures</h1>
        <p className="text-muted-foreground">
          Gérez toutes vos candidatures reçues et suivez leur progression
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Candidatures actives</p>
            <p className="mt-1">{atsCandidatesList.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Nouvelles</p>
            <p className="mt-1">
              {atsCandidatesList.filter((c) => c.status === "new").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">En entretien</p>
            <p className="mt-1">
              {atsCandidatesList.filter(c =>
                c.status === "interview-scheduled" || c.status === "interview-done"
              ).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Offres envoyées</p>
            <p className="mt-1">
              {atsCandidatesList.filter((c) => c.status === "offer-sent").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Filters Bar - Africa Specific */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Filtres avancés</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              {showAdvancedFilters ? "Masquer" : "Afficher"}
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
          
          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {/* Education Level */}
              <Select value={educationFilter} onValueChange={setEducationFilter}>
                <SelectTrigger className="w-full">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Niveau d'études" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous niveaux</SelectItem>
                  <SelectItem value="cap">CAP / BEP</SelectItem>
                  <SelectItem value="bac">Baccalauréat</SelectItem>
                  <SelectItem value="bts">BTS / DUT</SelectItem>
                  <SelectItem value="licence">Licence</SelectItem>
                  <SelectItem value="master">Master / Ingénieur</SelectItem>
                  <SelectItem value="doctorat">Doctorat</SelectItem>
                </SelectContent>
              </Select>

              {/* Languages */}
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-full">
                  <Languages className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Langues" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes langues</SelectItem>
                  <SelectItem value="french">Français</SelectItem>
                  <SelectItem value="english">Anglais</SelectItem>
                  <SelectItem value="bilingual">Bilingue FR/EN</SelectItem>
                  <SelectItem value="arabic">Arabe</SelectItem>
                  <SelectItem value="portuguese">Portugais</SelectItem>
                  <SelectItem value="local">Langues locales</SelectItem>
                </SelectContent>
              </Select>

              {/* Availability */}
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Disponibilité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toute disponibilité</SelectItem>
                  <SelectItem value="immediate">Immédiate</SelectItem>
                  <SelectItem value="1month">Préavis 1 mois</SelectItem>
                  <SelectItem value="2months">Préavis 2 mois</SelectItem>
                  <SelectItem value="3months">Préavis 3 mois</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>

              {/* Experience Range */}
              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger className="w-full">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Expérience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toute expérience</SelectItem>
                  <SelectItem value="junior">Junior (0-2 ans)</SelectItem>
                  <SelectItem value="confirmed">Confirmé (3-5 ans)</SelectItem>
                  <SelectItem value="senior">Senior (6-10 ans)</SelectItem>
                  <SelectItem value="expert">Expert (10+ ans)</SelectItem>
                </SelectContent>
              </Select>

              {/* Contract Type */}
              <Select value={contractTypeFilter} onValueChange={setContractTypeFilter}>
                <SelectTrigger className="w-full">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type de contrat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="cdi">CDI</SelectItem>
                  <SelectItem value="cdd">CDD</SelectItem>
                  <SelectItem value="freelance">Freelance / Consultant</SelectItem>
                  <SelectItem value="stage">Stage</SelectItem>
                  <SelectItem value="apprentissage">Apprentissage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {/* Active Filters Display */}
          {(educationFilter !== "all" || languageFilter !== "all" || availabilityFilter !== "all" || 
            experienceFilter !== "all" || contractTypeFilter !== "all") && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
              <span className="text-sm text-muted-foreground">Filtres actifs:</span>
              {educationFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  <GraduationCap className="h-3 w-3" />
                  {educationFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setEducationFilter("all")} />
                </Badge>
              )}
              {languageFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  <Languages className="h-3 w-3" />
                  {languageFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setLanguageFilter("all")} />
                </Badge>
              )}
              {availabilityFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {availabilityFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setAvailabilityFilter("all")} />
                </Badge>
              )}
              {experienceFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  <Briefcase className="h-3 w-3" />
                  {experienceFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setExperienceFilter("all")} />
                </Badge>
              )}
              {contractTypeFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  <DollarSign className="h-3 w-3" />
                  {contractTypeFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setContractTypeFilter("all")} />
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setEducationFilter("all");
                  setLanguageFilter("all");
                  setAvailabilityFilter("all");
                  setExperienceFilter("all");
                  setContractTypeFilter("all");
                }}
              >
                Réinitialiser tous
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, email ou poste..."
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
              <SelectItem value="new">Nouveau</SelectItem>
              <SelectItem value="screening">En examen</SelectItem>
              <SelectItem value="shortlisted">Pré-sélectionné</SelectItem>
              <SelectItem value="interview-scheduled">Entretien programmé</SelectItem>
              <SelectItem value="interview-done">Entretien réalisé</SelectItem>
              <SelectItem value="offer-sent">Offre envoyée</SelectItem>
              <SelectItem value="hired">Embauché</SelectItem>
              <SelectItem value="rejected">Refusé</SelectItem>
              <SelectItem value="withdrawn">Désisté</SelectItem>
              <SelectItem value="on-hold">En attente</SelectItem>
            </SelectContent>
          </Select>

          <Select value={jobFilter} onValueChange={setJobFilter}>
            <SelectTrigger className="w-52">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Poste" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les postes</SelectItem>
              {uniqueJobs.map((job) => (
                <SelectItem key={job} value={job}>
                  {job}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCandidates.length > 0 && (
        <div className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
          <p>{selectedCandidates.length} candidat(s) sélectionné(s)</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Changer le statut
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Envoyer un email
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
                  checked={
                    selectedCandidates.length === sortedATSCandidates.length &&
                    sortedATSCandidates.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center gap-2">
                  Candidat
                  <SortIcon field="name" />
                </div>
              </TableHead>
              <TableHead>Poste</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Expérience</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("appliedDate")}>
                <div className="flex items-center gap-2">
                  Date de candidature
                  <SortIcon field="appliedDate" />
                </div>
              </TableHead>
              <TableHead>Salaire souhaité</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedATSCandidates.map((candidate) => (
              <TableRow 
                key={candidate.id} 
                className="hover:bg-muted/50 cursor-pointer"
                onClick={() => handleOpenCandidate(candidate)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedCandidates.includes(candidate.id)}
                    onCheckedChange={() => handleSelectCandidate(candidate.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">{candidate.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{candidate.jobTitle}</TableCell>
                <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                <TableCell>{candidate.experience}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    {candidate.location}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(candidate.appliedDate).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{candidate.salaryRange}</span>
                  </div>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenCandidate(candidate)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Voir le profil
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenCandidate(candidate)}>
                        <Mail className="h-4 w-4 mr-2" />
                        Envoyer un message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="h-4 w-4 mr-2" />
                        Appeler
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="h-4 w-4 mr-2" />
                        Planifier entretien
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Changer le statut</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {sortedATSCandidates.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Aucune candidature trouvée
        </div>
      )}

      {/* Interactive Candidate Panel */}
      <Sheet open={!!selectedCandidate} onOpenChange={(open) => !open && setSelectedCandidate(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedCandidate && (
            <>
              <SheetHeader>
                <SheetTitle>Profil du candidat</SheetTitle>
                <SheetDescription>
                  Consultez les informations du candidat, envoyez des messages rapides et mettez à jour son statut.
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 py-6">
                {/* Candidate Info */}
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">
                      {getInitials(selectedCandidate.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{selectedCandidate.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedCandidate.jobTitle}</p>
                    <div className="flex gap-3 mt-2">
                      {getStatusBadge(selectedCandidate.status)}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCandidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCandidate.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCandidate.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCandidate.experience} d'expérience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCandidate.salaryRange}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Status Update */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Changer le statut</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCandidate.status === "new" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateStatus("new")}
                    >
                      Nouveau
                    </Button>
                    <Button
                      variant={selectedCandidate.status === "screening" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateStatus("screening")}
                    >
                      En examen
                    </Button>
                    <Button
                      variant={selectedCandidate.status === "shortlisted" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateStatus("shortlisted")}
                    >
                      Pré-sélectionné
                    </Button>
                    <Button
                      variant={selectedCandidate.status === "interview-scheduled" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateStatus("interview-scheduled")}
                    >
                      Entretien programmé
                    </Button>
                    <Button
                      variant={selectedCandidate.status === "interview-done" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateStatus("interview-done")}
                    >
                      Entretien réalisé
                    </Button>
                    <Button
                      variant={selectedCandidate.status === "offer-sent" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateStatus("offer-sent")}
                    >
                      Offre envoyée
                    </Button>
                    <Button
                      variant={selectedCandidate.status === "hired" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateStatus("hired")}
                    >
                      Embauché
                    </Button>
                    <Button
                      variant={selectedCandidate.status === "on-hold" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateStatus("on-hold")}
                    >
                      En attente
                    </Button>
                    <Button
                      variant={selectedCandidate.status === "withdrawn" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateStatus("withdrawn")}
                    >
                      Désisté
                    </Button>
                    <Button
                      variant={selectedCandidate.status === "rejected" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateStatus("rejected")}
                    >
                      Refusé
                    </Button>
                  </div>
                </div>

                {/* Quick Message Templates */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Messages rapides</label>
                  <div className="space-y-2">
                    {messageTemplates.map((template, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto py-2 px-3"
                        onClick={() => setQuickMessage(template)}
                      >
                        <span className="text-xs line-clamp-2">{template}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Message */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Message personnalisé</label>
                  <Textarea
                    placeholder="Écrivez votre message..."
                    value={quickMessage}
                    onChange={(e) => setQuickMessage(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      onClick={handleSendQuickMessage}
                      disabled={!quickMessage.trim()}
                      className="flex-1"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Envoyer
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setQuickMessage("")}
                      disabled={!quickMessage}
                    >
                      Effacer
                    </Button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Entretien
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
