// src/components/candidate/ProfilCandidat.tsx
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Calendar,
  DollarSign,
  FileText,
  Upload,
  Save,
  Eye,
  EyeOff,
  Linkedin,
  Plus,
  X,
  TrendingUp,
  Target,
  Languages,
  Sparkles,
  Trash2,
  AlertTriangle,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { useCandidateProfile } from "@/hooks/candidate/useCandidateProfile";
import { monthStringToIsoDate } from "@/utils/date";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Spinner } from "@/components/ui/spinner";

interface Competence {
  id: string;
  nom: string;
  niveau: "débutant" | "intermédiaire" | "avancé" | "expert";
}

interface Experience {
  id: string;
  poste: string;
  entreprise: string;
  ville: string;
  dateDebut: string;
  dateFin: string;
  actuel: boolean;
  description: string;
}

interface Formation {
  id: string;
  diplome: string;
  etablissement: string;
  ville: string;
  annee: string;
}

interface Langue {
  id: string;
  langue: string;
  niveau:
    | "débutant"
    | "intermédiaire"
    | "avancé"
    | "bilingue"
    | "langue maternelle";
}

// --- Mappings pour les COMPÉTENCES ---
const backendSkillLevelToUI = (level: string): string => {
  const map: Record<string, string> = {
    BEGINNER: "débutant",
    INTERMEDIATE: "intermédiaire",
    ADVANCED: "avancé",
    EXPERT: "expert",
  };
  return map[level] || "débutant";
};

const uiSkillLevelToBackend = (
  level: string,
): "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT" => {
  const map: Record<
    string,
    "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT"
  > = {
    débutant: "BEGINNER",
    intermédiaire: "INTERMEDIATE",
    avancé: "ADVANCED",
    expert: "EXPERT",
  };
  return map[level] || "BEGINNER";
};

// --- Mappings pour les LANGUES ---
const backendLanguageLevelToUI = (level: string): string => {
  const map: Record<string, string> = {
    BEGINNER: "débutant",
    INTERMEDIATE: "intermédiaire",
    ADVANCED: "avancé",
    BILINGUAL: "bilingue",
    NATIVE_LANGUAGE: "langue maternelle",
  };
  return map[level] || "débutant";
};

const uiLanguageLevelToBackend = (
  level: string,
):
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED"
  | "BILINGUAL"
  | "NATIVE_LANGUAGE" => {
  const map: Record<
    string,
    "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "BILINGUAL" | "NATIVE_LANGUAGE"
  > = {
    débutant: "BEGINNER",
    intermédiaire: "INTERMEDIATE",
    avancé: "ADVANCED",
    bilingue: "BILINGUAL",
    "langue maternelle": "NATIVE_LANGUAGE",
  };
  return map[level] || "BEGINNER";
};

export function ProfilCandidat() {
  const {
    profile,
    loading,
    saveProfile,
    uploadCV,
    deleteCV,
    saveLetterAndPitch,
    deleteLetter,
    toggleVisibility,
    deleteSkill,
    // deleteExperience,
    // deleteEducation,
    // deleteLanguage
  } = useCandidateProfile();

  // UI state
  const [profilVisible, setProfilVisible] = useState<boolean>(false);
  const [alertesActives, setAlertesActives] = useState(true);

  useEffect(() => {
    if (profile) {
      setProfilVisible(Boolean(profile.isVisible));
    }
  }, []);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Informations personnelles
  const [nom, setNom] = useState("");
  const [emailName, setEmailName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [ville, setVille] = useState("");
  const [pays, setPays] = useState("");
  const [titreProfessionnel, setTitreProfessionnel] = useState("");
  const [presentation, setPresentation] = useState("");

  // Réseaux sociaux
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [pitchMail, setPitchMail] = useState("");

  // Préférences de recherche
  const [posteRecherche, setPosteRecherche] = useState("");
  const [typeContrat, setTypeContrat] = useState<string[]>([]);
  const [disponibilite, setDisponibilite] = useState("Immédiate");
  const [mobilite, setMobilite] = useState("");
  const [pretentionsSalariales, setPretentionsSalariales] = useState("");
  const [secteursActivite, setSecteursActivite] = useState<string[]>([]);
  const [cvUrl, setCVUrl] = useState("");

  // Compétences
  const [competences, setCompetences] = useState<Competence[]>([]);

  // Expériences
  const [experiences, setExperiences] = useState<Experience[]>([]);

  // Formations
  const [formations, setFormations] = useState<Formation[]>([]);

  // Langues
  const [langues, setLangues] = useState<Langue[]>([]);

  // Stats
  const [vuesProfil] = useState(47);
  const [candidaturesEnvoyees] = useState(12);

  useEffect(() => {
    if (profile) {
      setPrenom(profile.firstName || "");
      setNom(profile.lastName || "");
      setTitreProfessionnel(profile.professionalTitle || "");
      setPresentation(profile.presentation || "");
      setTelephone(profile.phoneNumber || "");
      setVille(profile.city || "");
      setPays(profile.country || "Cameroun");
      setLinkedin(profile.linkedInUrl || "");
      setPortfolio(profile.portfolioUrl || "");
      setPitchMail(profile.pitchMail || "");
      setCVUrl(profile.cvUrl || "");
      setEmailName(profile.email || "");
      setTitreProfessionnel(profile.professionalTitle || "");

      // Compétences
      setCompetences(
        profile.skills.map((s) => ({
          id: s.id,
          nom: s.name,
          niveau: backendSkillLevelToUI(s.level),
        })),
      );

      // Expériences
      setExperiences(
        profile.experiences.map((e) => ({
          id: e.id,
          poste: e.position,
          entreprise: e.companyName,
          ville: e.city,
          dateDebut: e.startDate.split("T")[0],
          dateFin: e.endDate ? e.endDate.split("T")[0] : "",
          actuel: e.isCurrent,
          description: e.description,
        })),
      );

      // Formations
      setFormations(
        profile.educations.map((ed) => ({
          id: ed.id,
          diplome: ed.degree,
          etablissement: ed.institution,
          ville: ed.city,
          annee: ed.graduationYear.toString(),
        })),
      );

      // Langues
      setLangues(
        profile.languages.map((l) => ({
          id: l.id,
          langue: l.language,
          niveau: backendLanguageLevelToUI(l.level),
        })),
      );
    }
  }, [profile]);

  const handleUpload = async (file: File) => {
    setLoadingUpload(true);
    try {
      await uploadCV(file);
      toast.success("CV téléchargé avec succès !");
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de l'upload");
    } finally {
      setLoadingUpload(false);
    }
  };

  const getFileName = (url: string) => {
    try {
      const decoded = decodeURIComponent(url.split("/").pop() || "");
      return decoded.split("?")[0];
    } catch {
      return "CV";
    }
  };
  const ajouterCompetence = () => {
    setCompetences((prev) => [
      ...prev,
      { id: Date.now().toString(), nom: "", niveau: "débutant" },
    ]);
  };

  const supprimerCompetence = (id: string) => {
    setCompetences((prev) => prev.filter((c) => c.id !== id));
  };

  const ajouterExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        poste: "",
        entreprise: "",
        ville: "",
        dateDebut: "",
        dateFin: "",
        actuel: false,
        description: "",
      },
    ]);
  };

  const supprimerExperience = (id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  const ajouterFormation = () => {
    setFormations((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        diplome: "",
        etablissement: "",
        ville: "",
        annee: "",
      },
    ]);
  };

  const confirmDelete = async () => {
    setLoadingDelete(true);
    try {
      await deleteCV();
      toast.success("CV supprimé");
      setDeleteModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de la suppression");
    } finally {
      setLoadingDelete(false);
    }
  };

  const supprimerFormation = (id: string) => {
    setFormations((prev) => prev.filter((f) => f.id !== id));
  };

  const ajouterLangue = () => {
    setLangues((prev) => [
      ...prev,
      { id: Date.now().toString(), langue: "", niveau: "débutant" },
    ]);
  };

  const supprimerLangue = (id: string) => {
    setLangues((prev) => prev.filter((l) => l.id !== id));
  };

  const sauvegarderProfil = async () => {
    if (!profile) return;
    try {
      const updates = {
        firstName: prenom,
        lastName: nom,
        professionalTitle: titreProfessionnel,
        presentation: presentation,
        phoneNumber: telephone,
        country: pays,
        city: ville,
        linkedInUrl: linkedin,
        portfolioUrl: portfolio,
        pitchMail: pitchMail,
        preference: {
          desiredPosition: posteRecherche,
          contractTypes: typeContrat,
          availability: disponibilite,
          pretentionsSalarial: pretentionsSalariales,
          country: pays,
          region: "",
          city: ville,
          sectorIds: [],
          sectors: secteursActivite,
        },
        skills: competences.map((c) => ({
          id: c.id,
          name: c.nom,
          level: uiSkillLevelToBackend(c.niveau),
        })),

        experiences: experiences.map((e) => {
          const startDateIso = e.dateDebut
            ? monthStringToIsoDate(e.dateDebut)
            : null;
          let endDateIso: string | null = null;

          if (e.actuel) {
            endDateIso = null;
          } else if (e.dateFin) {
            endDateIso = monthStringToIsoDate(e.dateFin);
          }
          if (!startDateIso) {
            throw new Error(
              `La date de début de l'expérience "${e.poste}" est invalide.`,
            );
          }

          return {
            id: e.id,
            position: e.poste,
            companyName: e.entreprise,
            city: e.ville,
            startDate: startDateIso,
            endDate: endDateIso,
            isCurrent: e.actuel,
            description: e.description,
          };
        }),

        educations: formations.map((f) => ({
          id: f.id,
          degree: f.diplome,
          institution: f.etablissement,
          city: f.ville,
          graduationYear: parseInt(f.annee) || 0,
        })),

        languages: langues.map((l) => ({
          id: l.id,
          language: l.langue,
          level: uiLanguageLevelToBackend(l.niveau),
        })),
      };

      const invalidFormation = formations.find(
        (f) => !f.annee || parseInt(f.annee) < 4,
      );
      if (invalidFormation) {
        toast.error(
          "Veuillez renseigner une année valide pour chaque formation.",
        );
        return;
      }

      await saveProfile(updates);
      toast.success("Profil enregistré avec succès");
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de l’enregistrement");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Chargement du profil...
      </div>
    );
  }

  if (!profile) {
    return <div>Erreur de chargement du profil.</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Mon profil candidat
          </h1>
          <p className="text-muted-foreground mt-1">
            Complétez votre profil pour maximiser vos chances
          </p>
        </div>
        <Button
          onClick={sauvegarderProfil}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 flex items-center"
        >
          <Save className="h-4 w-4" />
          {loading ? "En cours..." : "Enregistrer"}
        </Button>
      </div>

      {/* Grille principale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations personnelles */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">
                Informations personnelles
              </h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="titre">Titre professionnel</Label>
                <Input
                  id="titre"
                  value={titreProfessionnel}
                  onChange={(e) => setTitreProfessionnel(e.target.value)}
                  placeholder="Ex: Développeur Full Stack Junior"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={emailName}
                    onChange={(e) => setEmailName(e.target.value)}
                    readOnly={true}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ville">Ville</Label>
                  <Input
                    id="ville"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="pays">Pays</Label>
                  <Select value={pays} onValueChange={setPays}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Côte d'Ivoire">
                        Côte d'Ivoire
                      </SelectItem>
                      <SelectItem value="Sénégal">Sénégal</SelectItem>
                      <SelectItem value="Bénin">Bénin</SelectItem>
                      <SelectItem value="Togo">Togo</SelectItem>
                      <SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
                      <SelectItem value="Mali">Mali</SelectItem>
                      <SelectItem value="Cameroun">Cameroun</SelectItem>
                      <SelectItem value="Gabon">Gabon</SelectItem>
                      <SelectItem value="Congo">Congo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="presentation">Présentation</Label>
                <Textarea
                  id="presentation"
                  value={presentation}
                  onChange={(e) => setPresentation(e.target.value)}
                  rows={4}
                  placeholder="Présentez-vous en quelques lignes..."
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {presentation.length} / 500 caractères
                </p>
              </div>
            </div>
          </Card>

          {/* Documents */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Documents</h2>
            </div>
            <div className="space-y-4">
              {/* CV */}
              <div>
                <Label>CV</Label>
                {!profile.cvUrl ? (
                  <div
                    className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer mt-1"
                    onClick={() =>
                      document.getElementById("cv-upload")?.click()
                    }
                  >
                    {loadingUpload ? (
                      <Spinner className="mx-auto h-8 w-8 text-muted-foreground" />
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    )}
                    <p className="text-sm text-foreground">
                      {loadingUpload
                        ? "Upload en cours..."
                        : "Cliquez pour télécharger votre CV"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOCX max 5 Mo
                    </p>
                    <input
                      id="cv-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUpload(file);
                      }}
                    />
                  </div>
                ) : (
                  <div className="mt-2 flex flex-col gap-2 border rounded-lg p-4 bg-gray-50">
                    <p className="text-sm font-medium truncate">
                      {getFileName(profile.cvUrl)}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(profile.cvUrl, "_blank")}
                      >
                        <Eye className="w-4 h-4 mr-1" /> Voir
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = profile.cvUrl;
                          link.download = getFileName(profile.cvUrl);
                          link.click();
                        }}
                      >
                        <Download className="w-4 h-4 mr-1" /> Télécharger
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteModalOpen(true)}
                      >
                        <Trash2 className="h-4 w-4" /> Supprimer
                      </Button>
                    </div>

                    {/* Modal suppression */}
                    <Dialog
                      open={deleteModalOpen}
                      onOpenChange={setDeleteModalOpen}
                    >
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Supprimer le CV</DialogTitle>
                          <DialogDescription>
                            Cette action est irréversible. Êtes-vous sûr ?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setDeleteModalOpen(false)}
                          >
                            Annuler
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={loadingDelete}
                          >
                            {loadingDelete ? "Suppression..." : "Supprimer"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>

              {/* Lettre */}
              <div>
                <Label>Lettre de motivation type</Label>
                <div
                  className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer mt-1"
                  onClick={() =>
                    document.getElementById("letter-upload")?.click()
                  }
                >
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-foreground">
                    {profile?.motivationLetterUrl
                      ? "Lettre téléchargée"
                      : "Cliquez pour télécharger votre lettre"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, DOCX max 5 Mo
                  </p>
                  <input
                    id="letter-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file)
                        saveLetterAndPitch(file, pitchMail).catch((err) =>
                          toast.error(err.message),
                        );
                    }}
                  />
                </div>
                {profile?.motivationLetterUrl && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="mt-2"
                    onClick={async () => {
                      if (confirm("Supprimer votre lettre de motivation ?")) {
                        try {
                          await deleteLetter();
                          toast.success("Lettre supprimée");
                        } catch (err: any) {
                          toast.error(err.message);
                        }
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" /> Supprimer la lettre
                  </Button>
                )}
              </div>

              {/* Pitch */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="pitch-mail">
                    Pitch mail type (recommandé)
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const template = `Madame, Monsieur,
Vivement intéressé(e) par le poste de [POSTE] au sein de [ENTREPRISE], je me permets de vous adresser ma candidature.
Avec mon parcours et mes compétences en [VOTRE DOMAINE], je suis convaincu(e) de pouvoir contribuer efficacement à vos objectifs. Mon expérience m'a permis de développer [VOS ATOUTS PRINCIPAUX] et je suis particulièrement motivé(e) par [CE QUI VOUS ATTIRE].
Disponible immédiatement et mobile sur toute l'Afrique Centrale, je reste à votre disposition pour un échange et vous prie d'agréer mes salutations distinguées.`;
                      setPitchMail(template);
                      toast.success(
                        "Modèle chargé ! Personnalisez-le selon votre profil",
                      );
                    }}
                    className="text-xs"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Charger le modèle
                  </Button>
                </div>
                <Textarea
                  id="pitch-mail"
                  placeholder="Votre pitch mail professionnel..."
                  value={pitchMail}
                  onChange={(e) => setPitchMail(e.target.value)}
                  rows={8}
                  className="font-mono text-sm mt-1"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  💡 Ce pitch sera pré-rempli dans vos candidatures.
                  Personnalisez les sections entre crochets.
                </p>
                <Button
                  type="button"
                  className="mt-3"
                  onClick={() => {
                    saveLetterAndPitch(null, pitchMail)
                      .then(() => toast.success("Pitch mis à jour"))
                      .catch((err) => toast.error(err.message));
                  }}
                >
                  Sauvegarder le pitch
                </Button>
              </div>
            </div>
          </Card>

          {/* Préférences de recherche */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">
                Préférences de recherche
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="poste-recherche">Poste recherché</Label>
                <Input
                  id="poste-recherche"
                  value={posteRecherche}
                  onChange={(e) => setPosteRecherche(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Type de contrat souhaité</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["CDI", "CDD", "Stage", "Freelance", "Alternance"].map(
                    (type) => (
                      <Badge
                        key={type}
                        variant={
                          typeContrat.includes(type) ? "default" : "outline"
                        }
                        className={`cursor-pointer ${
                          typeContrat.includes(type)
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => {
                          if (typeContrat.includes(type)) {
                            setTypeContrat(
                              typeContrat.filter((t) => t !== type),
                            );
                          } else {
                            setTypeContrat([...typeContrat, type]);
                          }
                        }}
                      >
                        {type}
                      </Badge>
                    ),
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="disponibilite">Disponibilité</Label>
                  <Select
                    value={disponibilite}
                    onValueChange={setDisponibilite}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Immédiate">Immédiate</SelectItem>
                      <SelectItem value="1 mois">1 mois</SelectItem>
                      <SelectItem value="2 mois">2 mois</SelectItem>
                      <SelectItem value="3 mois">3 mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="mobilite">Mobilité géographique</Label>
                  <Input
                    id="mobilite"
                    value={mobilite}
                    onChange={(e) => setMobilite(e.target.value)}
                    placeholder="Ex: Côte d'Ivoire, Afrique de l'Ouest"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="salaire">Prétentions salariales</Label>
                <Input
                  id="salaire"
                  value={pretentionsSalariales}
                  onChange={(e) => setPretentionsSalariales(e.target.value)}
                  placeholder="Ex: 300 000 - 500 000 FCFA"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Secteurs d'activité</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    "Technologie",
                    "Services",
                    "Finance",
                    "Commerce",
                    "Santé",
                    "Éducation",
                    "BTP",
                    "Industrie",
                  ].map((secteur) => (
                    <Badge
                      key={secteur}
                      variant={
                        secteursActivite.includes(secteur)
                          ? "default"
                          : "outline"
                      }
                      className={`cursor-pointer ${
                        secteursActivite.includes(secteur)
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => {
                        if (secteursActivite.includes(secteur)) {
                          setSecteursActivite(
                            secteursActivite.filter((s) => s !== secteur),
                          );
                        } else {
                          setSecteursActivite([...secteursActivite, secteur]);
                        }
                      }}
                    >
                      {secteur}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Compétences */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium text-foreground">
                  Compétences
                </h2>
              </div>
              <Button
                onClick={ajouterCompetence}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </div>
            <div className="space-y-3">
              {competences.map((comp, index) => (
                <div key={comp.id} className="flex gap-2">
                  <Input
                    value={comp.nom}
                    onChange={(e) => {
                      const updated = [...competences];
                      updated[index].nom = e.target.value;
                      setCompetences(updated);
                    }}
                    placeholder="Nom de la compétence"
                    className="flex-1"
                  />
                  <Select
                    value={comp.niveau}
                    onValueChange={(value) => {
                      const updated = [...competences];
                      updated[index].niveau = value as any;
                      setCompetences(updated);
                    }}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="débutant">Débutant</SelectItem>
                      <SelectItem value="intermédiaire">
                        Intermédiaire
                      </SelectItem>
                      <SelectItem value="avancé">Avancé</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={async () => {
                      if (confirm("Supprimer cette compétence ?")) {
                        try {
                          await deleteSkill(comp.id);
                          toast.success("Compétence supprimée");
                        } catch (err: any) {
                          toast.error(err.message);
                        }
                      }
                    }}
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Expériences professionnelles */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium text-foreground">
                  Expériences professionnelles
                </h2>
              </div>
              <Button
                onClick={ajouterExperience}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </div>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className="border border-border rounded-lg p-4"
                >
                  <div className="flex justify-end mb-2">
                    <Button
                      onClick={async () => {
                        if (confirm("Supprimer cette expérience ?")) {
                          try {
                            await deleteExperience(exp.id);
                            toast.success("Expérience supprimée");
                          } catch (err: any) {
                            toast.error(err.message);
                          }
                        }
                      }}
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <Input
                      value={exp.poste}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[index].poste = e.target.value;
                        setExperiences(updated);
                      }}
                      placeholder="Intitulé du poste"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        value={exp.entreprise}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[index].entreprise = e.target.value;
                          setExperiences(updated);
                        }}
                        placeholder="Entreprise"
                      />
                      <Input
                        value={exp.ville}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[index].ville = e.target.value;
                          setExperiences(updated);
                        }}
                        placeholder="Ville"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Date de début</Label>
                        <Input
                          type="month"
                          value={exp.dateDebut}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[index].dateDebut = e.target.value;
                            setExperiences(updated);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Date de fin</Label>
                        <Input
                          type="month"
                          value={exp.dateFin}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[index].dateFin = e.target.value;
                            setExperiences(updated);
                          }}
                          disabled={exp.actuel}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={exp.actuel}
                        onCheckedChange={(checked) => {
                          const updated = [...experiences];
                          updated[index].actuel = checked;
                          if (checked) updated[index].dateFin = "";
                          setExperiences(updated);
                        }}
                      />
                      <Label>Poste actuel</Label>
                    </div>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[index].description = e.target.value;
                        setExperiences(updated);
                      }}
                      placeholder="Description de vos missions..."
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Formations */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium text-foreground">
                  Formations et diplômes
                </h2>
              </div>
              <Button
                onClick={ajouterFormation}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </div>
            <div className="space-y-4">
              {formations.map((form, index) => (
                <div
                  key={form.id}
                  className="border border-border rounded-lg p-4"
                >
                  <div className="flex justify-end mb-2">
                    <Button
                      onClick={async () => {
                        if (confirm("Supprimer cette formation ?")) {
                          try {
                            await deleteEducation(form.id);
                            toast.success("Formation supprimée");
                          } catch (err: any) {
                            toast.error(err.message);
                          }
                        }
                      }}
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <Input
                      value={form.diplome}
                      onChange={(e) => {
                        const updated = [...formations];
                        updated[index].diplome = e.target.value;
                        setFormations(updated);
                      }}
                      placeholder="Diplôme ou certification"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        value={form.etablissement}
                        onChange={(e) => {
                          const updated = [...formations];
                          updated[index].etablissement = e.target.value;
                          setFormations(updated);
                        }}
                        placeholder="Établissement"
                      />
                      <Input
                        value={form.ville}
                        onChange={(e) => {
                          const updated = [...formations];
                          updated[index].ville = e.target.value;
                          setFormations(updated);
                        }}
                        placeholder="Ville"
                      />
                    </div>
                    <Input
                      value={form.annee}
                      onChange={(e) => {
                        const updated = [...formations];
                        updated[index].annee = e.target.value;
                        setFormations(updated);
                      }}
                      placeholder="Année d'obtention"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Langues */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium text-foreground">Langues</h2>
              </div>
              <Button
                onClick={ajouterLangue}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </div>
            <div className="space-y-3">
              {langues.map((lang, index) => (
                <div key={lang.id} className="flex gap-2">
                  <Input
                    value={lang.langue}
                    onChange={(e) => {
                      const updated = [...langues];
                      updated[index].langue = e.target.value;
                      setLangues(updated);
                    }}
                    placeholder="Langue"
                    className="flex-1"
                  />
                  <Select
                    value={lang.niveau}
                    onValueChange={(value) => {
                      const updated = [...langues];
                      updated[index].niveau = value as any;
                      setLangues(updated);
                    }}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="débutant">Débutant</SelectItem>
                      <SelectItem value="intermédiaire">
                        Intermédiaire
                      </SelectItem>
                      <SelectItem value="avancé">Avancé</SelectItem>
                      <SelectItem value="bilingue">Bilingue</SelectItem>
                      <SelectItem value="langue maternelle">
                        Langue maternelle
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={async () => {
                      if (confirm("Supprimer cette langue ?")) {
                        try {
                          await deleteLanguage(lang.id);
                          toast.success("Langue supprimée");
                        } catch (err: any) {
                          toast.error(err.message);
                        }
                      }
                    }}
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Réseaux sociaux */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">
                Réseaux sociaux et liens
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <div className="flex gap-2">
                  {/*<Linkedin className="h-10 w-10 text-[#0077B5] mt-1" />*/}
                  <Input
                    id="linkedin"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="linkedin.com/in/votre-profil"
                    className="flex-1 mt-2"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="portfolio">Portfolio / Site web</Label>
                <Input
                  id="portfolio"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://votre-site.com"
                  className="flex-1 mt-2"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          {/* Statistiques */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">
                Statistiques
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Vues du profil
                </div>
                <div className="text-2xl text-foreground">{vuesProfil}</div>
                <p className="text-xs text-muted-foreground mt-1">Ce mois-ci</p>
              </div>
              <Separator className="bg-border" />
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Candidatures envoyées
                </div>
                <div className="text-2xl text-foreground">
                  {candidaturesEnvoyees}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Total</p>
              </div>
            </div>
          </Card>

          {/* Visibilité */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">
                Visibilité
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground mb-1">
                    Profil visible
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Les recruteurs peuvent voir votre profil
                  </p>
                </div>
                <Switch
                  checked={profilVisible}
                  onCheckedChange={async (checked) => {
                    setProfilVisible(checked);
                    await toggleVisibility();
                    toast.success(`Profil ${checked ? "visible" : "masqué"}`);
                  }}
                />
              </div>
              <Separator className="bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground mb-1">
                    Alertes emploi
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recevoir les nouvelles offres par email
                  </p>
                </div>
                <Switch
                  checked={alertesActives}
                  onCheckedChange={setAlertesActives}
                />
              </div>
            </div>
          </Card>

          {/* Suppression de compte RGPD */}
          {/*   <Card className="p-6 border-destructive/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <h3 className="font-medium text-destructive">Supprimer mon compte</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Supprimez définitivement toutes vos données (profil, CV, candidatures, etc.).
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-3"
                  onClick={async () => {
                    const confirmed = confirm("⚠️ Action irréversible.\nToutes vos données seront supprimées.\nConfirmer la suppression ?");
                    if (confirmed) {
                      await deleteAccount();
                    }
                  }}
                >
                  Supprimer mon compte (RGPD)
                </Button>
              </div>
            </div>
          </Card> */}

          {/* Complétion du profil */}
          <Card className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-medium text-foreground mb-2">
                Complétion du profil
              </h2>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: profile
                      ? ([
                          profile.firstName,
                          profile.lastName,
                          profile.professionalTitle,
                          profile.phoneNumber,
                          profile.country,
                          profile.city,
                        ].filter(Boolean).length /
                          6) *
                          100 +
                        "%"
                      : "0%",
                  }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {profile
                  ? (
                      ([
                        profile.firstName,
                        profile.lastName,
                        profile.professionalTitle,
                        profile.phoneNumber,
                        profile.country,
                        profile.city,
                      ].filter(Boolean).length /
                        6) *
                      100
                    ).toFixed(0)
                  : "0"}
                % complété
              </p>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Informations personnelles</span>
              </li>
              <li className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Expériences professionnelles</span>
              </li>
              <li className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Formations</span>
              </li>
              <li className="flex items-center gap-2 text-orange-500">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Télécharger votre CV</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <span>Ajouter un portfolio</span>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4 p-3 bg-blue-50/50 rounded-lg border border-primary/20">
              Un profil complet multiplie vos chances par 3
            </p>
          </Card>

          {/* Conseils */}
          <Card className="p-6 bg-blue-50/50 border border-primary/20">
            <h2 className="text-lg font-medium text-foreground mb-3">
              Conseils
            </h2>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Mettez à jour régulièrement votre profil</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Utilisez des mots-clés pertinents</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Soyez précis dans vos compétences</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Relancez vos candidatures après 1 semaine</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
