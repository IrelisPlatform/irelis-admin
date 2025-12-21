// src/compoenets/recruiter/SmartSourcing.tsx

"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  GraduationCap,
  Languages,
  Heart,
  Mail,
  Download,
  SlidersHorizontal,
  Crown,
  Lock,
  AlertCircle,
  Zap,
  Target,
  BarChart3,
  Layers,
  DollarSign,
  Code,
  TrendingUp,
  Building2,
  Palette,
  Plane,
  Plus,
  FileText,
  Users,
  Bell,
  Settings,
  HelpCircle,
  Upload,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  Tag,
  Share2,
  BarChart2,
  Calendar,
  Filter,
  Send,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// ⚠️ Fichier displayConfig non fourni → on utilise une valeur par défaut
const displayConfig = {
  showSalary: true, // ou false selon ton besoin
};

interface SourcedCandidate {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: number;
  education: string;
  skills: string[];
  languages: string[];
  availability: string;
  lastActive: string;
  matchScore: number;
  isFavorite: boolean;
  category: string;
  isPenurious?: boolean;
  expectedSalary?: string;
}

interface JobCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>; // ✅ typage correct pour icônes Lucide
  count: number;
  avgSalary: string;
  demand: "high" | "medium" | "low";
  penuriousCount: number;
}

interface MarketInsight {
  category: string;
  avgSalary: string;
  talentAvailability: number;
  trend: "up" | "down" | "stable";
  topSkills: string[];
  avgExperience: number;
}

// ... (données sourcedCandidates, jobCategories, marketInsights inchangées → trop longues mais valides)

const sourcedCandidates: SourcedCandidate[] = [
  // IT & Tech
  {
    id: "src-1",
    name: "Ibrahim Diallo",
    title: "Développeur Full Stack",
    location: "Yaoundé",
    experience: 5,
    education: "Master Informatique - ENSP",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    languages: ["Français", "Anglais"],
    availability: "Disponible immédiatement",
    lastActive: "Il y a 2 jours",
    matchScore: 95,
    isFavorite: false,
    category: "IT & Tech",
    expectedSalary: "3.2M FCFA/mois",
  },
  {
    id: "src-2",
    name: "Fatou Kamara",
    title: "UX/UI Designer Senior",
    location: "Dakar",
    experience: 7,
    education: "École Supérieure d'Art",
    skills: ["Figma", "Adobe XD", "Prototypage", "Design System"],
    languages: ["Français", "Anglais", "Wolof"],
    availability: "Préavis 1 mois",
    lastActive: "Il y a 1 jour",
    matchScore: 92,
    isFavorite: true,
    category: "Design & Créatif",
    expectedSalary: "2.8M FCFA/mois",
  },
  // Artisanat & Métiers Manuels
  {
    id: "src-9",
    name: "Amadou Sow",
    title: "Maçon Chef d'Équipe",
    location: "Douala",
    experience: 12,
    education: "CAP Maçonnerie",
    skills: ["Maçonnerie", "Coffrage", "Lecture de plans", "Gestion équipe"],
    languages: ["Français", "Duala"],
    availability: "Disponible immédiatement",
    lastActive: "Il y a 1 jour",
    matchScore: 88,
    isFavorite: false,
    category: "Artisanat & BTP",
    expectedSalary: "450K FCFA/mois",
  },
  {
    id: "src-10",
    name: "Marie Etang",
    title: "Couturière Professionnelle",
    location: "Yaoundé",
    experience: 8,
    education: "Formation Couture",
    skills: ["Couture", "Broderie", "Patronage", "Design mode"],
    languages: ["Français", "Anglais"],
    availability: "Disponible immédiatement",
    lastActive: "Il y a 3 jours",
    matchScore: 85,
    isFavorite: false,
    category: "Artisanat & BTP",
    expectedSalary: "300K FCFA/mois",
  },
  // Commerce & Vente
  {
    id: "src-11",
    name: "Jean-Paul Mbarga",
    title: "Responsable Commercial",
    location: "Douala",
    experience: 6,
    education: "Licence Commerce",
    skills: ["Vente", "Négociation", "Prospection", "Gestion clientèle"],
    languages: ["Français", "Anglais"],
    availability: "Préavis 1 mois",
    lastActive: "Il y a 2 jours",
    matchScore: 82,
    isFavorite: false,
    category: "Commerce & Vente",
    expectedSalary: "650K FCFA/mois + commission",
  },
  // Agriculture
  {
    id: "src-12",
    name: "Joseph Nkounga",
    title: "Agronome Spécialiste Cacao",
    location: "Bafoussam",
    experience: 10,
    education: "Ingénieur Agronome",
    skills: ["Culture cacao", "Agriculture bio", "Gestion plantation", "Formation"],
    languages: ["Français", "Anglais"],
    availability: "Disponible dans 2 mois",
    lastActive: "Il y a 1 semaine",
    matchScore: 90,
    isFavorite: true,
    category: "Agriculture & Agro",
    expectedSalary: "800K FCFA/mois",
  },
  // Santé & Social
  {
    id: "src-13",
    name: "Dr. Grace Tchamba",
    title: "Médecin Généraliste",
    location: "Yaoundé",
    experience: 8,
    education: "Doctorat Médecine",
    skills: ["Consultation", "Diagnostic", "Urgences", "Pédiatrie"],
    languages: ["Français", "Anglais"],
    availability: "Préavis 3 mois",
    lastActive: "Il y a 4 jours",
    matchScore: 94,
    isFavorite: true,
    category: "Santé & Social",
    isPenurious: true,
    expectedSalary: "2.5M FCFA/mois",
  },
  {
    id: "src-14",
    name: "Aminata Ba",
    title: "Infirmière Diplômée d'État",
    location: "Dakar",
    experience: 5,
    education: "Diplôme IDE",
    skills: ["Soins", "Urgences", "Pédiatrie", "Administration"],
    languages: ["Français", "Wolof"],
    availability: "Disponible immédiatement",
    lastActive: "Il y a 1 jour",
    matchScore: 87,
    isFavorite: false,
    category: "Santé & Social",
    expectedSalary: "450K FCFA/mois",
  },
  // ONG & Humanitaire
  {
    id: "src-15",
    name: "Patrick Nguema",
    title: "Chef de Projet Humanitaire",
    location: "Libreville",
    experience: 9,
    education: "Master Relations Internationales",
    skills: ["Gestion projet ONG", "Fundraising", "Reporting", "Terrain"],
    languages: ["Français", "Anglais", "Espagnol"],
    availability: "Disponible dans 1 mois",
    lastActive: "Il y a 5 jours",
    matchScore: 92,
    isFavorite: true,
    category: "ONG & Humanitaire",
    isPenurious: true,
    expectedSalary: "1.8M FCFA/mois",
  },
  // Hôtellerie & Restauration
  {
    id: "src-16",
    name: "Chef Emmanuel Kofi",
    title: "Chef Cuisinier",
    location: "Accra",
    experience: 7,
    education: "CAP Cuisine + Formation Hôtelière",
    skills: ["Cuisine africaine", "Cuisine française", "Gestion cuisine", "HACCP"],
    languages: ["Français", "Anglais"],
    availability: "Préavis 1 mois",
    lastActive: "Il y a 2 jours",
    matchScore: 86,
    isFavorite: false,
    category: "Hôtellerie & Restauration",
    expectedSalary: "550K FCFA/mois",
  },
  // Éducation
  {
    id: "src-17",
    name: "Sophie Nana",
    title: "Enseignante Primaire",
    location: "Yaoundé",
    experience: 6,
    education: "Licence Sciences de l'Éducation",
    skills: ["Pédagogie", "Gestion classe", "Évaluation", "Animation"],
    languages: ["Français", "Anglais"],
    availability: "Disponible immédiatement",
    lastActive: "Il y a 3 jours",
    matchScore: 83,
    isFavorite: false,
    category: "Éducation & Formation",
    expectedSalary: "350K FCFA/mois",
  },
  // Diaspora - Profils internationaux
  {
    id: "src-18",
    name: "Kofi Mensah",
    title: "Directeur Financier (Diaspora)",
    location: "Paris → Retour prévu Accra",
    experience: 15,
    education: "Master Finance - HEC Paris",
    skills: ["Finance", "Audit", "Consolidation", "Stratégie"],
    languages: ["Français", "Anglais", "Twi"],
    availability: "Disponible Juin 2025",
    lastActive: "Il y a 1 jour",
    matchScore: 96,
    isFavorite: true,
    category: "Finance & Banque",
    isPenurious: true,
    expectedSalary: "8M FCFA/mois",
  },
  {
    id: "src-4",
    name: "Chioma Okonkwo",
    title: "Data Scientist",
    location: "Lagos",
    experience: 4,
    education: "Université de Lagos - Ingénieur",
    skills: ["Python", "Machine Learning", "SQL", "Data Viz"],
    languages: ["Anglais", "Français"],
    availability: "Préavis 2 mois",
    lastActive: "Il y a 1 semaine",
    matchScore: 85,
    isFavorite: true,
    category: "Data & Analytics",
    isPenurious: true,
    expectedSalary: "3.8M FCFA/mois",
  },
  {
    id: "src-5",
    name: "Samuel Fotso",
    title: "DevOps Engineer",
    location: "Douala",
    experience: 8,
    education: "Ingénieur Systèmes - Polytechnique",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    languages: ["Français", "Anglais"],
    availability: "Préavis 3 mois",
    lastActive: "Il y a 3 jours",
    matchScore: 87,
    isFavorite: false,
    category: "IT & Tech",
    isPenurious: true,
    expectedSalary: "4.5M FCFA/mois",
  },
  {
    id: "src-6",
    name: "Aïcha Touré",
    title: "Blockchain Developer",
    location: "Abidjan",
    experience: 3,
    education: "Master Cryptographie - INPHB",
    skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3"],
    languages: ["Français", "Anglais"],
    availability: "Disponible immédiatement",
    lastActive: "Il y a 1 jour",
    matchScore: 91,
    isFavorite: true,
    category: "IT & Tech",
    isPenurious: true,
    expectedSalary: "5M FCFA/mois",
  },
  {
    id: "src-7",
    name: "Emmanuel Kouassi",
    title: "Expert Cybersécurité",
    location: "Yaoundé",
    experience: 10,
    education: "Doctorat Sécurité Informatique",
    skills: ["Pentest", "SOC", "SIEM", "ISO 27001"],
    languages: ["Français", "Anglais"],
    availability: "Préavis 2 mois",
    lastActive: "Il y a 4 jours",
    matchScore: 94,
    isFavorite: false,
    category: "IT & Tech",
    isPenurious: true,
    expectedSalary: "6M FCFA/mois",
  },
  {
    id: "src-8",
    name: "Marie Nkoulou",
    title: "Responsable Marketing Digital",
    location: "Douala",
    experience: 6,
    education: "MBA Marketing - ESG",
    skills: ["SEO", "SEM", "Social Media", "Analytics"],
    languages: ["Français", "Anglais"],
    availability: "Disponible immédiatement",
    lastActive: "Il y a 2 jours",
    matchScore: 89,
    isFavorite: false,
    category: "Marketing & Com",
    expectedSalary: "3.5M FCFA/mois",
  },
];

const jobCategories: JobCategory[] = [
  {
    id: "it-tech",
    name: "IT & Tech",
    icon: Code,
    count: 2847,
    avgSalary: "3.8M FCFA",
    demand: "high",
    penuriousCount: 4,
  },
  {
    id: "artisanat-btp",
    name: "Artisanat & BTP",
    icon: Briefcase,
    count: 3412,
    avgSalary: "420K FCFA",
    demand: "high",
    penuriousCount: 2,
  },
  {
    id: "agriculture",
    name: "Agriculture & Agro",
    icon: Layers,
    count: 2156,
    avgSalary: "650K FCFA",
    demand: "high",
    penuriousCount: 1,
  },
  {
    id: "commerce-vente",
    name: "Commerce & Vente",
    icon: TrendingUp,
    count: 4234,
    avgSalary: "480K FCFA",
    demand: "medium",
    penuriousCount: 0,
  },
  {
    id: "sante-social",
    name: "Santé & Social",
    icon: Target,
    count: 1823,
    avgSalary: "1.2M FCFA",
    demand: "high",
    penuriousCount: 3,
  },
  {
    id: "ong-humanitaire",
    name: "ONG & Humanitaire",
    icon: Target,
    count: 892,
    avgSalary: "1.5M FCFA",
    demand: "medium",
    penuriousCount: 1,
  },
  {
    id: "education",
    name: "Éducation & Formation",
    icon: GraduationCap,
    count: 2567,
    avgSalary: "420K FCFA",
    demand: "medium",
    penuriousCount: 0,
  },
  {
    id: "hotellerie-restauration",
    name: "Hôtellerie & Restauration",
    icon: Briefcase,
    count: 1945,
    avgSalary: "380K FCFA",
    demand: "medium",
    penuriousCount: 0,
  },
  {
    id: "data-analytics",
    name: "Data & Analytics",
    icon: BarChart3,
    count: 456,
    avgSalary: "4.2M FCFA",
    demand: "high",
    penuriousCount: 1,
  },
  {
    id: "design-creative",
    name: "Design & Créatif",
    icon: Palette,
    count: 892,
    avgSalary: "2.5M FCFA",
    demand: "medium",
    penuriousCount: 0,
  },
  {
    id: "finance",
    name: "Finance & Banque",
    icon: DollarSign,
    count: 1234,
    avgSalary: "3.2M FCFA",
    demand: "medium",
    penuriousCount: 1,
  },
  {
    id: "diaspora",
    name: "Diaspora - Retour Afrique",
    icon: Plane,
    count: 347,
    avgSalary: "6.5M FCFA",
    demand: "high",
    penuriousCount: 2,
  },
];

const marketInsights: MarketInsight[] = [
  {
    category: "IT & Tech",
    avgSalary: "3.8M FCFA/mois",
    talentAvailability: 65,
    trend: "up",
    topSkills: ["React", "Node.js", "Python", "AWS", "Docker"],
    avgExperience: 4.5,
  },
  {
    category: "Data & Analytics",
    avgSalary: "4.2M FCFA/mois",
    talentAvailability: 35,
    trend: "up",
    topSkills: ["Python", "SQL", "Machine Learning", "Power BI", "Tableau"],
    avgExperience: 5.2,
  },
  {
    category: "Design & Créatif",
    avgSalary: "2.5M FCFA/mois",
    talentAvailability: 78,
    trend: "stable",
    topSkills: ["Figma", "Adobe Suite", "UI/UX", "Prototypage", "Branding"],
    avgExperience: 3.8,
  },
  {
    category: "Marketing & Com",
    avgSalary: "3M FCFA/mois",
    talentAvailability: 72,
    trend: "stable",
    topSkills: ["SEO", "Social Media", "Content", "Analytics", "Email Marketing"],
    avgExperience: 4.1,
  },
];


export function SmartSourcing() {
  const [activeSubTab, setActiveSubTab] = useState("search");
  const [sourcedCandidatesList] = useState<SourcedCandidate[]>(sourcedCandidates);

  // Sourcing Filters
  const [sourcingSearchTerm, setSourcingSearchTerm] = useState("");
  const [booleanSearchMode, setBooleanSearchMode] = useState(false);
  const [booleanQuery, setBooleanQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [experienceRange, setExperienceRange] = useState([0, 10]);
  const [favorites, setFavorites] = useState<string[]>(
    sourcedCandidatesList.filter((c) => c.isFavorite).map((c) => c.id)
  );
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showPenuriousOnly, setShowPenuriousOnly] = useState(false);
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  const [showBooleanHelper, setShowBooleanHelper] = useState(false);
  const [selectedMarketInsight, setSelectedMarketInsight] = useState<MarketInsight | null>(null);


  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const getMaskedName = (name: string) => {
    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[1] || "";
    return `${firstName[0]}${"*".repeat(firstName.length - 1)} ${lastName[0]}${"*".repeat(lastName.length - 1)}`;
  };

  const getMaskedInitials = () => "??";

  const parseBooleanSearch = (query: string, candidate: SourcedCandidate): boolean => {
    if (!query.trim()) return true;
    const lowerQuery = query.toLowerCase();
    const candidateText = `${candidate.name} ${candidate.title} ${candidate.skills.join(" ")} ${candidate.education}`.toLowerCase();
    if (lowerQuery.includes(" and ")) {
      const parts = lowerQuery.split(" and ");
      return parts.every(part => candidateText.includes(part.trim()));
    }
    if (lowerQuery.includes(" or ")) {
      const parts = lowerQuery.split(" or ");
      return parts.some(part => candidateText.includes(part.trim()));
    }
    if (lowerQuery.startsWith("not ")) {
      const term = lowerQuery.replace("not ", "").trim();
      return !candidateText.includes(term);
    }
    const quotedMatch = lowerQuery.match(/"([^"]+)"/);
    if (quotedMatch) {
      return candidateText.includes(quotedMatch[1]);
    }
    return candidateText.includes(lowerQuery);
  };

  const filteredSourcedCandidates = sourcedCandidatesList.filter((candidate) => {
    if (booleanSearchMode && booleanQuery) {
      if (!parseBooleanSearch(booleanQuery, candidate)) return false;
    } else {
      const matchesSearch =
        candidate.name.toLowerCase().includes(sourcingSearchTerm.toLowerCase()) ||
        candidate.title.toLowerCase().includes(sourcingSearchTerm.toLowerCase()) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(sourcingSearchTerm.toLowerCase())
        );
      if (!matchesSearch) return false;
    }
    const matchesCategory = categoryFilter === "all" || candidate.category === categoryFilter;
    const matchesLocation = locationFilter === "all" || candidate.location === locationFilter;
    const matchesExperience = candidate.experience >= experienceRange[0] && candidate.experience <= experienceRange[1];
    const matchesFavorites = !showFavoritesOnly || favorites.includes(candidate.id);
    const matchesPenurious = !showPenuriousOnly || candidate.isPenurious;
    return matchesCategory && matchesLocation && matchesExperience && matchesFavorites && matchesPenurious;
  });

  const sortedSourcedCandidates = [...filteredSourcedCandidates].sort((a, b) => b.matchScore - a.matchScore);
  const penuriousCandidates = sourcedCandidatesList.filter(c => c.isPenurious);

  const getDemandBadge = (demand: "high" | "medium" | "low") => {
    const variants = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-green-100 text-green-800 border-green-200",
    };
    const labels = {
      high: "Forte demande",
      medium: "Demande moyenne",
      low: "Faible demande",
    };
    return (
      <Badge variant="outline" className={variants[demand]}>
        {labels[demand]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Sourcing Intelligent / CVthèque</h1>
        <p className="text-muted-foreground">
          Sourcez les meilleurs talents avec des outils puissants
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">CVthèque disponible</p>
            <p className="mt-1">8,423 profils</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Nouveaux cette semaine</p>
            <p className="mt-1">147</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Profils favoris</p>
            <p className="mt-1">{favorites.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <p className="text-sm text-muted-foreground">Profils pénuriques</p>
            </div>
            <p className="mt-1">{penuriousCandidates.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Sourcing Sub-navigation */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="search">
            <Search className="h-4 w-4 mr-2" />
            Recherche
          </TabsTrigger>
          <TabsTrigger value="penurious">
            <AlertCircle className="h-4 w-4 mr-2" />
            Profils pénuriques ({penuriousCandidates.length})
          </TabsTrigger>
          <TabsTrigger value="categories">
            <Layers className="h-4 w-4 mr-2" />
            Catégories
          </TabsTrigger>
          <TabsTrigger value="market">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analyse marché
          </TabsTrigger>
        </TabsList>

        {/* Search Tab */}
        <TabsContent value="search" className="space-y-4">
          {/* Search Mode Toggle */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="boolean-mode"
              checked={booleanSearchMode}
              onCheckedChange={(checked) => setBooleanSearchMode(checked as boolean)}
            />
            <Label htmlFor="boolean-mode" className="cursor-pointer flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-600" />
              Recherche booléenne avancée
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBooleanHelper(true)}
            >
              <AlertCircle className="h-4 w-4" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              {booleanSearchMode ? (
                <Input
                  placeholder='Ex: (React OR Vue) AND (Senior OR "5 ans") NOT Junior'
                  value={booleanQuery}
                  onChange={(e) => setBooleanQuery(e.target.value)}
                  className="pl-10 font-mono text-sm"
                />
              ) : (
                <Input
                  placeholder="Rechercher par nom, poste, compétences..."
                  value={sourcingSearchTerm}
                  onChange={(e) => setSourcingSearchTerm(e.target.value)}
                  className="pl-10"
                />
              )}
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <Layers className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {jobCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-48">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Localisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les villes</SelectItem>
                <SelectItem value="Yaoundé">Yaoundé</SelectItem>
                <SelectItem value="Douala">Douala</SelectItem>
                <SelectItem value="Dakar">Dakar</SelectItem>
                <SelectItem value="Abidjan">Abidjan</SelectItem>
                <SelectItem value="Lagos">Lagos</SelectItem>
                <SelectItem value="Accra">Accra</SelectItem>
                <SelectItem value="Libreville">Libreville</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtres avancés
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtres avancés</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 py-6">
                  <div className="space-y-3">
                    <Label>Expérience (années)</Label>
                    <Slider
                      value={experienceRange}
                      onValueChange={setExperienceRange}
                      max={15}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground">
                      {experienceRange[0]} - {experienceRange[1]} ans
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>Type de formation</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="master" />
                        <Label htmlFor="master" className="cursor-pointer">
                          Master / Ingénieur
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="license" />
                        <Label htmlFor="license" className="cursor-pointer">
                          Licence
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="bts" />
                        <Label htmlFor="bts" className="cursor-pointer">
                          BTS / DUT
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="doctorat" />
                        <Label htmlFor="doctorat" className="cursor-pointer">
                          Doctorat
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Langues</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="french" defaultChecked />
                        <Label htmlFor="french" className="cursor-pointer">
                          Français
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="english" defaultChecked />
                        <Label htmlFor="english" className="cursor-pointer">
                          Anglais
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="wolof" />
                        <Label htmlFor="wolof" className="cursor-pointer">
                          Wolof
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="favorites"
                checked={showFavoritesOnly}
                onCheckedChange={(checked) => setShowFavoritesOnly(checked as boolean)}
              />
              <Label htmlFor="favorites" className="cursor-pointer">
                Favoris uniquement
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="penurious"
                checked={showPenuriousOnly}
                onCheckedChange={(checked) => setShowPenuriousOnly(checked as boolean)}
              />
              <Label htmlFor="penurious" className="cursor-pointer flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                Profils pénuriques uniquement
              </Label>
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {sortedSourcedCandidates.length} profil(s) trouvé(s)
              </p>
              
              <div className="flex gap-2">
                <Button size="sm" className="bg-gradient-to-r from-[#E30613] to-[#c41e3a] hover:from-[#b8050f] hover:to-[#a01829] text-white shadow-md">
                  <Zap className="h-4 w-4 mr-2" />
                  Matching IA
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-[#14548C] to-[#1e40af] hover:from-[#0d3a5f] hover:to-[#1e3a8a] text-white shadow-md"
                  onClick={() => setShowPremiumDialog(true)}
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Passer Premium
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {sortedSourcedCandidates.map((candidate) => (
                <Card key={candidate.id} className="hover:border-primary transition-colors hover:shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex flex-col h-full">
                      {/* Header avec favoris */}
                      <div className="flex items-start justify-end mb-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => toggleFavorite(candidate.id)}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.includes(candidate.id)
                                ? "fill-red-500 text-red-500"
                                : ""
                            }`}
                          />
                        </Button>
                      </div>

                      {/* Titre de poste mis en avant */}
                      <div className="mb-3">
                        <h3 className="text-base font-semibold leading-tight mb-2 line-clamp-2 text-primary">
                          {candidate.title}
                        </h3>
                        <p className="flex items-center gap-1 text-sm text-muted-foreground">
                          {getMaskedName(candidate.name)}
                          <Lock className="h-3 w-3 text-muted-foreground" />
                        </p>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 border-green-200 text-xs"
                        >
                          {candidate.matchScore}%
                        </Badge>
                        {candidate.isPenurious && (
                          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                            <AlertCircle className="h-2 w-2 mr-1" />
                            Rare
                          </Badge>
                        )}
                      </div>

                      {/* Infos compactes */}
                      <div className="space-y-2 mb-3 text-xs">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{candidate.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                          <span>{candidate.experience} ans</span>
                        </div>
                        {/* Salaire attendu - Données conservées mais affichage masqué */}
                        {displayConfig.showSalary && candidate.expectedSalary && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="truncate text-xs">{candidate.expectedSalary}</span>
                          </div>
                        )}
                      </div>

                      {/* Compétences (limitées) */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {candidate.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{candidate.skills.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-auto pt-3 border-t">
                        <Button 
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => setShowPremiumDialog(true)}
                        >
                          <Crown className="h-3 w-3 mr-1" />
                          Actions sur le candidat
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Penurious Profiles Tab */}
        <TabsContent value="penurious" className="space-y-4">
          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Profils Pénuriques & Rares
              </CardTitle>
              <CardDescription>
                Ces profils sont très recherchés en Afrique Centrale et difficiles à trouver. 
                Agissez rapidement pour sécuriser ces talents rares.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {penuriousCandidates.map((candidate) => (
              <Card key={candidate.id} className="hover:border-orange-300 transition-colors border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-orange-100">
                        {getMaskedInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Rare
                    </Badge>
                  </div>

                  <h3 className="flex items-center gap-2 mb-1">
                    {getMaskedName(candidate.name)}
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{candidate.title}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{candidate.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-3 w-3 text-muted-foreground" />
                      <span>{candidate.experience} ans</span>
                    </div>
                    {candidate.expectedSalary && (
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <span>{candidate.expectedSalary}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {candidate.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={() => setShowPremiumDialog(true)}
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    Voir le profil complet
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <div>
            <h2 className="mb-2">Catégories de métiers</h2>
            <p className="text-muted-foreground text-sm">
              Explorez les talents par domaine d'expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={category.id} 
                  className="hover:border-primary transition-colors cursor-pointer"
                  onClick={() => {
                    setCategoryFilter(category.name);
                    setActiveSubTab("search");
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      {getDemandBadge(category.demand)}
                    </div>

                    <h3 className="mb-2">{category.name}</h3>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>Profils disponibles</span>
                        <span className="font-medium text-foreground">{category.count}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Salaire moyen</span>
                        <span className="font-medium text-foreground">{category.avgSalary}</span>
                      </div>
                      {category.penuriousCount > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3 text-orange-600" />
                            Profils pénuriques
                          </span>
                          <span className="font-medium text-orange-600">{category.penuriousCount}</span>
                        </div>
                      )}
                    </div>

                    <Button variant="outline" className="w-full mt-4" size="sm">
                      Explorer cette catégorie
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Market Analysis Tab */}
        <TabsContent value="market" className="space-y-4">
          <div>
            <h2 className="mb-2">Analyse du marché - Afrique Centrale</h2>
            <p className="text-muted-foreground text-sm">
              Insights sur les tendances du marché du recrutement tech en Afrique Centrale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketInsights.map((insight) => (
              <Card 
                key={insight.category} 
                className="hover:border-primary transition-colors cursor-pointer"
                onClick={() => setSelectedMarketInsight(insight)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{insight.category}</CardTitle>
                    <Badge variant="outline" className={
                      insight.trend === "up" 
                        ? "bg-green-100 text-green-800 border-green-200"
                        : insight.trend === "down"
                        ? "bg-red-100 text-red-800 border-red-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    }>
                      {insight.trend === "up" ? "↗ En hausse" : insight.trend === "down" ? "↘ En baisse" : "→ Stable"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Salaire moyen</p>
                      <p className="text-xl font-medium">{insight.avgSalary}</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Disponibilité des talents</p>
                        <p className="text-sm font-medium">{insight.talentAvailability}%</p>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className={`rounded-full h-2 ${
                            insight.talentAvailability > 60 
                              ? "bg-green-500" 
                              : insight.talentAvailability > 40 
                              ? "bg-yellow-500" 
                              : "bg-red-500"
                          }`}
                          style={{ width: `${insight.talentAvailability}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Compétences les plus demandées</p>
                      <div className="flex flex-wrap gap-1">
                        {insight.topSkills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>Expérience moyenne: {insight.avgExperience} ans</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Global Market Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Vue d'ensemble du marché</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Taux de croissance</p>
                  <p className="text-2xl font-semibold text-green-600">+15%</p>
                  <p className="text-xs text-muted-foreground mt-1">par rapport à 2024</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Temps de recrutement moyen</p>
                  <p className="text-2xl font-semibold">28 jours</p>
                  <p className="text-xs text-muted-foreground mt-1">en Afrique Centrale</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Métiers les plus recherchés</p>
                  <p className="text-2xl font-semibold">Tech</p>
                  <p className="text-xs text-muted-foreground mt-1">42% des demandes</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Taux de rétention</p>
                  <p className="text-2xl font-semibold">78%</p>
                  <p className="text-xs text-muted-foreground mt-1">après 1 an</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Boolean Search Helper Dialog */}
      <Dialog open={showBooleanHelper} onOpenChange={setShowBooleanHelper}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-600" />
              Guide de recherche booléenne
            </DialogTitle>
            <DialogDescription>
              Utilisez ces opérateurs pour des recherches ultra précises
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="font-medium mb-2">AND (ET)</p>
              <p className="text-sm text-muted-foreground mb-2">
                Trouve les profils contenant tous les termes
              </p>
              <code className="bg-muted px-2 py-1 rounded text-sm">
                React AND TypeScript AND Senior
              </code>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="font-medium mb-2">OR (OU)</p>
              <p className="text-sm text-muted-foreground mb-2">
                Trouve les profils contenant au moins un des termes
              </p>
              <code className="bg-muted px-2 py-1 rounded text-sm">
                React OR Vue OR Angular
              </code>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="font-medium mb-2">NOT (NON)</p>
              <p className="text-sm text-muted-foreground mb-2">
                Exclut les profils contenant le terme
              </p>
              <code className="bg-muted px-2 py-1 rounded text-sm">
                Développeur NOT Junior
              </code>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="font-medium mb-2">Guillemets "phrase exacte"</p>
              <p className="text-sm text-muted-foreground mb-2">
                Trouve la phrase exacte
              </p>
              <code className="bg-muted px-2 py-1 rounded text-sm">
                "Full Stack Developer"
              </code>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="font-medium mb-2">Parenthèses (groupement)</p>
              <p className="text-sm text-muted-foreground mb-2">
                Combine plusieurs opérateurs
              </p>
              <code className="bg-muted px-2 py-1 rounded text-sm">
                (React OR Vue) AND (Senior OR "5 ans") NOT Junior
              </code>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-medium mb-2 text-blue-900">Exemples pratiques</p>
              <div className="space-y-2 text-sm">
                <p><code className="bg-white px-2 py-1 rounded">Python AND (Django OR Flask) AND "Machine Learning"</code></p>
                <p><code className="bg-white px-2 py-1 rounded">(DevOps OR "Site Reliability") AND AWS AND Kubernetes</code></p>
                <p><code className="bg-white px-2 py-1 rounded">Designer AND (Figma OR "Adobe XD") NOT Junior</code></p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Premium Dialog */}
      <AlertDialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Crown className="h-8 w-8 text-white" />
              </div>
            </div>
            <AlertDialogTitle className="text-center">
              Passez à Premium pour accéder aux meilleurs candidats
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="text-center space-y-4 text-muted-foreground text-sm">
                <p>
                  Débloquez l'accès complet à notre CVthèque et contactez directement les candidats les plus qualifiés d'Afrique Centrale.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <p className="text-sm">Accès complet aux profils et coordonnées</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <p className="text-sm">Recherche booléenne avancée illimitée</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <p className="text-sm">Accès prioritaire aux profils pénuriques</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <p className="text-sm">Analyse de marché détaillée</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <p className="text-sm">Support prioritaire RH</p>
                  </div>
                </div>
                <div className="text-center pt-2">
                  <p className="text-primary">
                    À partir de 250,000 FCFA/mois
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Plus tard</AlertDialogCancel>
            <AlertDialogAction className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
              <Crown className="h-4 w-4 mr-2" />
              Passer à Premium
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}