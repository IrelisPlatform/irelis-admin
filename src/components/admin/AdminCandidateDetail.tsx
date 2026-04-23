"use client";

import { useAdminCandidateDetail } from "@/hooks/candidates/useAdminCandidates";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  PieChart,
  MapPin,
  Star,
  Award,
  Building2,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { Progress } from "../ui/progress";
import { CandidateExperience, CandidateEducation, CandidateSkill } from "@/types/candidate";

// Mapping du niveau de compétence vers un badge coloré
const skillLevelConfig: Record<string, { label: string; class: string }> = {
  BEGINNER: { label: "Débutant", class: "bg-slate-100 text-slate-700 border-slate-200" },
  ELEMENTARY: { label: "Élémentaire", class: "bg-blue-50 text-blue-700 border-blue-200" },
  INTERMEDIATE: { label: "Intermédiaire", class: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  ADVANCED: { label: "Avancé", class: "bg-violet-50 text-violet-700 border-violet-200" },
  EXPERT: { label: "Expert", class: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

function formatDateRange(startDate: string, endDate: string | null, isCurrent: boolean) {
  const start = new Date(startDate).toLocaleDateString("fr-FR", {
    month: "short",
    year: "numeric",
  });
  if (isCurrent) return `${start} – Actuellement`;
  if (!endDate) return start;
  const end = new Date(endDate).toLocaleDateString("fr-FR", {
    month: "short",
    year: "numeric",
  });
  return `${start} – ${end}`;
}

// Expériences Section
function ExperiencesSection({ experiences }: { experiences: CandidateExperience[] }) {
  if (!experiences || experiences.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-2">
        <Briefcase className="w-8 h-8 opacity-30" />
        <p className="text-sm">Aucune expérience renseignée</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {experiences.map((exp, idx) => (
        <div
          key={exp.id}
          className="flex gap-4 group"
        >
          {/* Timeline indicator */}
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center shrink-0 group-hover:border-blue-400 transition-colors">
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>
            {idx < experiences.length - 1 && (
              <div className="w-0.5 flex-1 mt-2 bg-border min-h-6" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-6">
            <div className="bg-muted/40 hover:bg-muted/60 transition-colors rounded-xl p-4 border border-border">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <div>
                  <h4 className="font-semibold text-base text-foreground">{exp.position}</h4>
                  <p className="text-sm text-blue-600 font-medium">{exp.companyName}</p>
                </div>
                {exp.isCurrent && (
                  <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs shrink-0">
                    Poste actuel
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                {exp.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {exp.city}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                </span>
              </div>

              {exp.description && (
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed border-t border-border pt-3">
                  {exp.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Formations Section 
function EducationsSection({ educations }: { educations: CandidateEducation[] }) {
  if (!educations || educations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-2">
        <GraduationCap className="w-8 h-8 opacity-30" />
        <p className="text-sm">Aucune formation renseignée</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {educations.map((edu, idx) => (
        <div key={edu.id} className="flex gap-4 group">
          {/* Timeline indicator */}
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center shrink-0 group-hover:border-indigo-400 transition-colors">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
            </div>
            {idx < educations.length - 1 && (
              <div className="w-0.5 flex-1 mt-2 bg-border min-h-6" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-6">
            <div className="bg-muted/40 hover:bg-muted/60 transition-colors rounded-xl p-4 border border-border">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h4 className="font-semibold text-base text-foreground">{edu.degree}</h4>
                  <p className="text-sm text-indigo-600 font-medium">{edu.institution}</p>
                </div>
                <Badge variant="outline" className="text-xs border-indigo-200 text-indigo-700 shrink-0">
                  Promo {edu.graduationYear}
                </Badge>
              </div>
              {edu.city && (
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {edu.city}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Skills Section
function SkillsSection({ skills }: { skills: CandidateSkill[] }) {
  if (!skills || skills.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-muted-foreground gap-2">
        <Star className="w-8 h-8 opacity-30" />
        <p className="text-sm">Aucune compétence renseignée</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => {
        const cfg = skillLevelConfig[skill.level] ?? skillLevelConfig["BEGINNER"];
        return (
          <div
            key={skill.id}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${cfg.class}`}
          >
            <span>{skill.name}</span>
            <span className="opacity-60">·</span>
            <span className="opacity-80">{cfg.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// Main Component 
export function AdminCandidateDetail({ id }: { id: string }) {
  const router = useRouter();
  const { data: candidate, isLoading } = useAdminCandidateDetail(id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Spinner className="w-10 h-10 mb-4 text-blue-600" />
        <p className="text-muted-foreground">Chargement du profil candidat...</p>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h2 className="text-2xl font-bold">Candidat introuvable</h2>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour
        </Button>
      </div>
    );
  }

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

  const missingFieldsLabels: Record<string, string> = {
    firstName: "Prénom",
    lastName: "Nom",
    phoneNumber: "Numéro de téléphone",
    city: "Ville",
    professionalTitle: "Titre professionnel",
    cv: "CV",
    experiences: "Expériences professionnelles",
    educations: "Formations",
    skills: "Compétences",
  };

  const getMissingFieldLabel = (field: string) =>
    missingFieldsLabels[field] || field;

  const formattedDate = candidate.createdAt
    ? new Date(candidate.createdAt).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    : "Date inconnue";

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()} className="hover:bg-muted">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="border-none shadow-lg bg-linear-to-br from-blue-50/50 via-white to-indigo-50/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl ring-2 ring-blue-100">
              <AvatarFallback className="bg-linear-to-br from-blue-600 to-indigo-600 text-white text-4xl font-bold">
                {getInitials(candidate.firstName, candidate.lastName)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                  {candidate.firstName} {candidate.lastName}
                </h1>
                <p className="text-xl text-blue-600 font-medium mt-1">
                  {candidate.professionalTitle || "Aucun titre professionnel renseigné"}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-full shadow-sm">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <a href={`mailto:${candidate.email}`} className="hover:text-blue-700 hover:underline">
                    {candidate.email}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-full shadow-sm">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span>{candidate.phoneNumber || "Non renseigné"}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-full shadow-sm">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>Inscrit le {formattedDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {candidate.experienceLevel && (
                  <Badge variant="secondary" className="px-3 py-1 text-xs">
                    Exp: {candidate.experienceLevel}
                  </Badge>
                )}
                {candidate.schoolLevel && (
                  <Badge variant="secondary" className="px-3 py-1 text-xs">
                    Études: {candidate.schoolLevel}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Completion */}
          <Card className="border-none shadow-md gap-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChart className="w-5 h-5 text-indigo-500" />
                Complétion du Profil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Score global</span>
                  <span className={candidate.completionRate >= 80 ? "text-emerald-600" : "text-orange-600"}>
                    {candidate.completionRate}%
                  </span>
                </div>
                <Progress
                  value={candidate.completionRate}
                  className={`h-2 ${candidate.completionRate >= 80 ? "[&>div]:bg-emerald-500" : "[&>div]:bg-orange-500"}`}
                />
              </div>

              <div className="space-y-3 pt-4 border-t">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Checklist Profil
                </p>

                {[
                  { label: "CV", icon: FileText, checked: candidate.hasCv },
                  { label: "Expériences", icon: Briefcase, checked: candidate.hasExperiences },
                  { label: "Formations", icon: GraduationCap, checked: candidate.hasEducation },
                  { label: "Compétences", icon: Award, checked: candidate.hasSkills },
                ].map(({ label, icon: Icon, checked }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-500" /> {label}
                    </span>
                    {checked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Candidatures */}
          <Card className="border-none shadow-md bg-blue-50/50 gap-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
                <FileText className="w-5 h-5 text-blue-500" />
                Candidatures Soumises
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-blue-600">
                  {candidate.applicationCount || 0}
                </span>
                <span className="text-sm font-medium text-blue-800/60 uppercase">Total</span>
              </div>
            </CardContent>
          </Card>

          {/* CV Link */}
          {candidate.cvUrl && (
            <Card className="border-none shadow-md gap-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={candidate.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start justify-start whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 py-2 w-full"
                >
                  <FileText className="w-4 h-4 mr-2 text-blue-500" />
                  Consulter le CV
                </a>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Missing Fields */}
          {candidate.missingFields && candidate.missingFields.length > 0 && (
            <Card className="border-orange-200 shadow-sm bg-orange-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-orange-800 text-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Informations Manquantes
                </CardTitle>
                <CardDescription className="text-orange-700/80">
                  Ce candidat doit compléter les éléments suivants pour avoir un profil parfait :
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.missingFields.map((field, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-white border-orange-200 text-orange-700 px-3 py-1"
                    >
                      {getMissingFieldLabel(field)}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Expériences Professionnelles */}
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-xl">Expériences Professionnelles</CardTitle>
              </div>
              {candidate.experiences && candidate.experiences.length > 0 && (
                <CardDescription>
                  {candidate.experiences.length} expérience{candidate.experiences.length > 1 ? "s" : ""} renseignée{candidate.experiences.length > 1 ? "s" : ""}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              <ExperiencesSection experiences={candidate.experiences ?? []} />
            </CardContent>
          </Card>

          {/* Formations */}
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-500" />
                <CardTitle className="text-xl">Formations & Diplômes</CardTitle>
              </div>
              {candidate.educations && candidate.educations.length > 0 && (
                <CardDescription>
                  {candidate.educations.length} formation{candidate.educations.length > 1 ? "s" : ""} renseignée{candidate.educations.length > 1 ? "s" : ""}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              <EducationsSection educations={candidate.educations ?? []} />
            </CardContent>
          </Card>

          {/* Compétences */}
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <CardTitle className="text-xl">Compétences</CardTitle>
              </div>
              {candidate.skills && candidate.skills.length > 0 && (
                <CardDescription>
                  {candidate.skills.length} compétence{candidate.skills.length > 1 ? "s" : ""} renseignée{candidate.skills.length > 1 ? "s" : ""}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              <SkillsSection skills={candidate.skills ?? []} />
            </CardContent>
          </Card>

          {/* Préférences */}
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-xl">Préférences</CardTitle>
              </div>

              {candidate.preference && (
                  <CardDescription>
                    Informations sur les attentes professionnelles
                  </CardDescription>
              )}
            </CardHeader>

            <CardContent className="pt-4 space-y-3">
              {candidate.preference ? (
                  <>
                    {/* Poste recherché */}
                    <div>
                      <span className="font-medium">Poste souhaité : </span>
                      {candidate.preference.desiredPosition || "Non renseigné"}
                    </div>

                    {/* Types de contrat */}
                    <div>
                      <span className="font-medium">Contrat : </span>
                      {candidate.preference.contractTypes?.length > 0
                          ? candidate.preference.contractTypes.join(", ")
                          : "Non renseigné"}
                    </div>

                    {/* Disponibilité */}
                    <div>
                      <span className="font-medium">Disponibilité : </span>
                      {candidate.preference.availability || "Non renseigné"}
                    </div>

                    {/* Salaire */}
                    <div>
                      <span className="font-medium">Prétentions salariales : </span>
                      {candidate.preference.pretentionsSalarial || "Non renseigné"}
                    </div>

                    {/* Pays */}
                    <div>
                      <span className="font-medium">Pays : </span>
                      {candidate.preference.country || "Non renseigné"}
                    </div>

                    {/* Secteurs */}
                    <div>
                      <span className="font-medium">Secteurs : </span>
                      {candidate.preference.sectors?.length > 0
                          ? candidate.preference.sectors.join(", ")
                          : "Non renseigné"}
                    </div>
                  </>
              ) : (
                  <div className="text-gray-500">Aucune préférence renseignée</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
