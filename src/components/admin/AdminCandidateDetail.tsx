"use client";

import { useAdminCandidateDetail } from "@/hooks/candidates/useAdminCandidates";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  PieChart,
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
import { formatDateRelative } from "@/services/date";
import { Progress } from "../ui/progress";

export function AdminCandidateDetail({ id }: { id: string }) {
  const router = useRouter();
  const { data: candidate, isLoading } = useAdminCandidateDetail(id);
  console.log(candidate);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Spinner className="w-10 h-10 mb-4 text-blue-600" />
        <p className="text-muted-foreground">
          Chargement du profil candidat...
        </p>
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

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  // Mapping des champs manquants
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

  // Fonction qui retourne en francais le champ manquant
  const getMissingFieldLabel = (field: string) => {
    return missingFieldsLabels[field] || field;
  };

  const formattedDate = candidate.createdAt
    ? new Date(candidate.createdAt).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date inconnue";

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
      {/* Header Actions */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Button>
      </div>

      {/* Main Profile Header */}
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
                  {candidate.professionalTitle ||
                    "Aucun titre professionnel renseigné"}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-full shadow-sm">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <a
                    href={`mailto:${candidate.email}`}
                    className="hover:text-blue-700 hover:underline"
                  >
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Status */}
        <div className="space-y-6">
          <Card className="border-none shadow-md">
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
                  <span
                    className={
                      candidate.completionRate >= 80
                        ? "text-emerald-600"
                        : "text-orange-600"
                    }
                  >
                    {/* {Math.round(candidate.completionRate * 100)}% */}
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

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" /> CV Uploadé
                  </span>
                  {candidate.hasCv ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-500" /> Expériences
                  </span>
                  {candidate.hasExperiences ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-gray-500" />{" "}
                    Formations
                  </span>
                  {candidate.hasEducation ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-gray-500" />{" "}
                    Compétences
                  </span>
                  {candidate.hasSkills ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-blue-50/50">
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
                <span className="text-sm font-medium text-blue-800/60 uppercase">
                  Total
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Details & Missing Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Missing Fields Alert */}
          {candidate.missingFields && candidate.missingFields.length > 0 && (
            <Card className="border-orange-200 shadow-sm bg-orange-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-orange-800 text-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Informations Manquantes
                </CardTitle>
                <CardDescription className="text-orange-700/80">
                  Ce candidat doit compléter les éléments suivants pour avoir un
                  profil parfait :
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

          {/* General Information */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Aperçu Professionnel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Niveau d'expérience
                  </p>
                  <p className="text-base font-semibold">
                    {candidate.experienceLevel || "Non spécifié"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" /> Niveau d'études
                  </p>
                  <p className="text-base font-semibold">
                    {candidate.schoolLevel || "Non spécifié"}
                  </p>
                </div>
              </div>

              {candidate.cvUrl && (
                <div className="pt-6 border-t">
                  <h4 className="text-sm font-medium mb-3">Curriculum Vitae</h4>
                  <a
                    href={candidate.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  >
                    <FileText className="w-4 h-4 mr-2 text-blue-500" />{" "}
                    Consulter le CV
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
