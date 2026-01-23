"use client";

import { SerializedEditorState } from "lexical";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  X,
  Building2,
  FileText,
  Briefcase,
  MapPin,
  Mail,
  Globe,
  Users,
  Handshake,
  AlertCircle,
  Banknote,
  Clock,
  Factory,
  UsersRound,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  documentLabels,
  getContractTypeLabel,
  getJobTypeLabel,
  getStatusBadge,
} from "@/lib/jobs/job-helpers";
import { Badge } from "@/components/ui/badge";
import { formatDateLong } from "@/services/date";
import { ReadonlyEditor } from "../ReadonlyEditor";
import { PublishedJob } from "@/types/job";

type JobDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: PublishedJob | null;
};

export function JobDetailsDialog({
  open,
  onOpenChange,
  job,
}: JobDetailsDialogProps) {
  if (!job) return null;

  let description: SerializedEditorState | null = null;
  try {
    if (job.offerDescription) {
      description =
        typeof job.offerDescription === "string"
          ? JSON.parse(job.offerDescription)
          : job.offerDescription;
    }
  } catch (e) {
    console.error("Error parsing description:", e);
  }

  const logoUrl = job.companyLogoUrl;

  const cityAndCountryLocation =
    !job.workCities || job.workCities.length === 0
      ? job.workCountryLocation
      : job.workCountryLocation + " - " + job.workCities.join(", ");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full sm:max-w-xl lg:max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-white">
        <DialogHeader className="py-4 sm:px-8 p-4 border-b bg-white/50 sticky top-0 z-10 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold text-[#1e3a8a]">
                Détails de l'offre
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto sm:p-8 p-4 bg-white">
          <div className="mx-auto space-y-8">
            {/* Top Section: Logo & Titles */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl border bg-white shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Logo entreprise"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Briefcase className="w-8 h-8 text-gray-300" />
                )}
              </div>
              <div className="space-y-2 flex-1 w-full items-start flex">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] leading-tight">
                    {job.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-lg text-gray-600">
                    <span className="font-medium">{job.companyName}</span>
                  </div>
                  <div className="mt-1">{getStatusBadge(job.status)}</div>
                </div>

                {job.isUrgent && (
                  <Badge
                    variant="destructive"
                    className="ml-auto bg-destructive hover:bg-red-600"
                  >
                    <AlertCircle className="w-3 h-3 mr-1" /> Urgent
                  </Badge>
                )}
              </div>
            </div>

            {/* Gradient Info Box */}
            <div className="bg-linear-to-br from-blue-50/80 to-indigo-50/50 p-4 sm:p-6 rounded-xl border border-blue-100/50 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                    <MapPin className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  <span className="wrap-break-word">
                    {cityAndCountryLocation}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                    <Briefcase className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  <span>{getContractTypeLabel(job.contractType)}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                    <Banknote className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  <span>{job.salary || "Non spécifié"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                    <Handshake className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  <span>{getJobTypeLabel(job.jobType)}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                    <Clock className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  <span>
                    {job.expirationDate
                      ? formatDateLong(job.expirationDate)
                      : "Postuler au plus tôt"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                    <Users className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  <span>{job.postNumber} poste(s)</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 flex-col">
              <p className="text-[#1e3a8a] font-bold">
                Outils, compétences, domaines
              </p>
              {!job.tagDto || job.tagDto.length === 0 ? (
                <>
                  <p className="text-muted-foreground">Aucun tag spécifié</p>
                </>
              ) : (
                <div className="flex space-x-2 flex-wrap">
                  {job.tagDto.map((tag) => (
                    <Badge
                      key={`${tag.type}-${tag.name}`}
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-[#1e3a8a] text-lg font-bold flex items-center gap-2">
                <FileText className="w-5 h-5" /> Description du poste
              </h3>
              {description ? (
                <div className="prose prose-sm max-w-none text-gray-600">
                  <ReadonlyEditor
                    value={description}
                    namespace="preview-description"
                  />
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Aucune description fournie.
                </p>
              )}
            </div>

            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <h3 className="text-[#1e3a8a] text-lg font-bold flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Documents requis
                </h3>

                {job.requiredDocuments && job.requiredDocuments.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {job.requiredDocuments.map((doc) => (
                      <li key={doc.type}>
                        {documentLabels[doc.type] || doc.type}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">Aucun document requis.</p>
                )}
              </div>

              <div>
                {/* Languages Section */}
                <h3 className="text-[#1e3a8a] text-lg font-bold flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Langues requises
                </h3>

                {(job.requiredLanguages || []).length === 0 ? (
                  <p className="text-gray-600">Aucune langue requise</p>
                ) : (job.requiredLanguages || []).length === 1 ? (
                  <p className="text-gray-600">
                    {(job.requiredLanguages || [])[0]}
                  </p>
                ) : (
                  <ul className="list-disc pl-5 space-y-1">
                    {(job.requiredLanguages || []).map((lang, index) => (
                      <li key={index}>{lang}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <Separator />

            {/* Company Section */}
            <div className="bg-linear-to-br from-gray-50 to-blue-50/30 p-6 rounded-xl space-y-4">
              <h3 className="text-[#1e3a8a] text-lg font-bold flex items-center gap-2">
                <Building2 className="w-5 h-5" /> À propos de {job.companyName}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div className="text-sm flex items-center gap-2">
                  <span className="font-semibold text-gray-700 flex items-center">
                    <Factory className="size-4 mr-1" /> Secteur :
                  </span>
                  <span className="text-gray-600">
                    {job.sector || "Non spécifié"}
                  </span>
                </div>
                <div className="text-sm flex items-center gap-2">
                  <span className="font-semibold text-gray-700 flex items-center">
                    <UsersRound className="size-4 mr-1" /> Taille :
                  </span>{" "}
                  <span className="text-gray-600">
                    {job.companySize || "Non spécifié"}
                  </span>
                </div>
                <div className="text-sm sm:col-span-2 flex items-center gap-2">
                  <span className="font-semibold text-gray-700 flex items-center">
                    <Mail className="size-4 mr-1" /> Contact :
                  </span>{" "}
                  <span className="text-gray-600">
                    {job.companyEmail || "Non spécifié"}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {job.companyDescription ||
                  "Aucune description de l'entreprise."}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
