// src/components/admin/JobPreviewDialog.tsx

"use client";

import { SerializedEditorState } from "lexical";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReadonlyEditor } from "@/components/ReadonlyEditor";
import {
  Briefcase,
  Banknote,
  MapPin,
  Clock,
  Globe,
  Users,
  AlertCircle,
  Loader2,
  FileText,
  CheckCircle2,
  Handshake,
  Factory,
  UsersRound,
  Building2,
  Mail
} from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { formatDateLong } from "@/services/date";
import { getContractTypeLabel, documentLabels, getJobTypeLabel } from "@/lib/jobs/job-helpers";
import type { TagDto, RequiredDocument } from "@/types/job";
import { Badge } from "@/components/ui/badge";

type JobPreviewData = {
  title: string;
  companyName: string;
  companyLogo?: File | string | null;
  contractType: string;
  salary?: string;
  workCities: string[];
  workCountryLocation: string;
  expirationDate?: string;
  requiredLanguages: string[];
  postNumber: number;
  isUrgent: boolean;
  offerDescription?: SerializedEditorState | null;
  requiredDocuments: RequiredDocument[];
  tagDto: TagDto[];
  jobType: string | null
  companyDescription?: string | null;
  companyEmail?: string | null
  companySize?: string | null
  sectorName?: string | null
};

type JobPreviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobData: JobPreviewData;
  onPublish: () => void;
  isLoading?: boolean;
  texts?: {
    descriptionHeader?: string,
    textBtnAction?: string
  }
};

export function JobPreviewDialog({
  open,
  onOpenChange,
  jobData,
  onPublish,
  texts = {
    descriptionHeader: "Vérifiez le rendu final de votre offre avant de la publier",
    textBtnAction: "Publier l'offre"
  },
  isLoading = false,
}: JobPreviewDialogProps) {
  const logoUrl =
    jobData.companyLogo instanceof File
      ? URL.createObjectURL(jobData.companyLogo)
      : jobData.companyLogo;

  const cityAndCountryLocation = jobData.workCities.length === 0
    ? jobData.workCountryLocation
    : jobData.workCountryLocation + " - " + jobData.workCities.join(", ")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full sm:max-w-xl lg:max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-white">
        <DialogHeader className="py-4 px-6 border-b bg-white/50 sticky top-0 z-10 shrink-0 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold text-[#1e3a8a]">
                Prévisualisation de l'offre
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                {texts.descriptionHeader}
              </p>

            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto sm:p-8 p-4 bg-white">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Top Section: Logo & Titles */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
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
              <div className="space-y-2 flex-1 w-full  items-start flex">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] leading-tight">
                    {jobData.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-lg text-gray-600">
                    <span className="font-medium">{jobData.companyName}</span>
                  </div>
                </div>

                {jobData.isUrgent && (
                  <Badge variant="destructive" className="ml-auto bg-destructive hover:bg-red-600">
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
                  <span className="wrap-break-word">{cityAndCountryLocation}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                    <Briefcase className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  <span>{getContractTypeLabel(jobData.contractType)}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                    <Banknote className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  <span>{jobData.salary || "Non spécifié"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                    <Handshake className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  <span>{getJobTypeLabel(jobData.jobType)}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                    <Clock className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  <span>{jobData.expirationDate ? formatDateLong(jobData.expirationDate) : "Postuler au plus tôt"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                    <Users className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  <span>{jobData.postNumber} poste(s)</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 flex-col">
              <p className="text-[#1e3a8a] font-bold">Outils, compétences, domaines</p>
              {jobData.tagDto.length === 0 ? (
                <>
                  <p className="text-muted-foreground">Aucun tag spécifié</p>
                </>
              ) : (
                jobData.tagDto.map((tag) => (
                  <Badge
                    key={`${tag.type}-${tag.name}`}
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100"
                  >
                    {tag.name}
                  </Badge>
                ))
              )}

            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-[#1e3a8a] text-lg font-bold flex items-center gap-2">
                <FileText className="w-5 h-5" /> Description du poste
              </h3>
              {jobData.offerDescription ? (
                <div className="prose prose-sm max-w-none text-gray-600">
                  <ReadonlyEditor
                    value={jobData.offerDescription}
                    namespace="preview-description"
                  />
                </div>
              ) : (
                <p className="text-gray-500 italic">Aucune description fournie.</p>
              )}
            </div>
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <h3 className="text-[#1e3a8a] text-lg font-bold flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Documents requis
                </h3>

                {jobData.requiredDocuments.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {jobData.requiredDocuments.map((doc) => (
                      <li key={doc.type}>{documentLabels[doc.type] || doc.type}</li>
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

                {(jobData.requiredLanguages || []).length === 0 ? (
                  <p className="text-gray-600">Aucune langue requise</p>
                ) : (jobData.requiredLanguages || []).length === 1 ? (
                  <p className="text-gray-600">{(jobData.requiredLanguages || [])[0]}</p>
                ) : (
                  <ul className="list-disc pl-5 space-y-1">
                    {(jobData.requiredLanguages || []).map((lang, index) => (
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
                <Building2 className="w-5 h-5" /> À propos de {jobData.companyName}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div className="text-sm flex items-center gap-2">
                  <span className="font-semibold text-gray-700 flex items-center"><Factory className="size-4 mr-1" /> Secteur :</span>
                  <span className="text-gray-600">
                    {jobData.sectorName || "Non spécifié"}</span>
                </div>
                <div className="text-sm flex items-center gap-2">
                  <span className="font-semibold text-gray-700 flex items-center"><UsersRound className="size-4 mr-1" /> Taille :</span>{" "}
                  <span className="text-gray-600">{jobData.companySize || "Non spécifié"}</span>
                </div>
                <div className="text-sm sm:col-span-2 flex items-center gap-2">
                  <span className="font-semibold text-gray-700 flex items-center"><Mail className="size-4 mr-1" /> Contact :</span>{" "}
                  <span className="text-gray-600">{jobData.companyEmail || "Non spécifié"}</span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {jobData.companyDescription || "Aucune description de l'entreprise."}
              </p>

            </div>

          </div>
        </div>

        <DialogFooter className="px-6 py-4 bg-white border-t sticky bottom-0 z-10 shrink-0 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="px-6 h-11">
            Revenir aux modifications
          </Button>
          <Button onClick={onPublish} disabled={isLoading} className="px-8 bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 h-11 text-base">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publication...
              </>
            ) : (
              texts.textBtnAction
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
}
