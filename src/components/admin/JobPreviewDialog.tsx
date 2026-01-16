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
  UsersRound
} from "lucide-react";
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
  requiredLanguage: string;
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
      <DialogContent className="max-w-full sm:max-w-xl lg:max-w-5xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-white/95 backdrop-blur-xl">
        <DialogHeader className="py-3 px-12 border-b bg-white/50 sticky top-0 z-10 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-[#1e3a8a]">
                Prévisualisation de l'offre
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                {texts.descriptionHeader}
              </p>
            </div>

          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Card */}
            <div className="bg-white rounded-xl border shadow-sm p-6 relative overflow-hidden">
              <div className="flex flex-col md:flex-row gap-6 items-start relative z-0">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Logo entreprise"
                    className="w-24 h-24 rounded-2xl border bg-white object-cover shadow-sm shrink-0"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl border bg-gray-50 flex items-center justify-center shrink-0">
                    <Briefcase className="w-10 h-10 text-gray-300" />
                  </div>
                )}

                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold tracking-tight mr-auto">
                      Titre du poste : <span className="text-[#1e3a8a]">{jobData.title}</span>
                    </h3>
                    {jobData.isUrgent && (
                      <Badge variant="destructive" className="animate-pulse rounded-full">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Urgent
                      </Badge>
                    )}
                  </div>

                  <div className="text-lg flex items-center gap-x-4 flex-wrap">
                    <div className="flex items-center space-x-4">
                      Nom de l'entreprise : <span className="text-[#1e3a8a]">{jobData.companyName}</span>
                    </div>


                  </div>
                  <div className="text-lg flex items-center gap-x-4 flex-wrap">


                    <div className="flex items-center space-x-4 text-sm">
                      Email de l'entreprise :  <span className={`${jobData.companyEmail ? "text-[#1e3a8a]" : "text-muted-foreground"}`}>   {jobData.companyEmail || " Pas spécifié"}</span>
                    </div>
                    <div className="text-sm">
                      Date d'expiration du poste : <span className={`${jobData.expirationDate ? "text-[#1e3a8a]" : "text-muted-foreground"}`}>{jobData.expirationDate ? formatDateLong(jobData.expirationDate) : "Non définie"}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      <MapPin className="w-3 h-3 mr-1" />
                      {cityAndCountryLocation}
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      <Briefcase className="w-3 h-3 mr-1" />
                      {getContractTypeLabel(jobData.contractType)}
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      <Handshake className="w-3 h-3 mr-1" />
                      {getJobTypeLabel(jobData.jobType)}
                    </Badge>

                    <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">
                      <Banknote className="w-3 h-3 mr-1" />
                      {jobData.salary || "Pas spécifié"}
                    </Badge>

                  </div>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Langue requise", value: jobData.requiredLanguage || "Non spécifié", icon: Globe },
                { label: "Nombre de postes", value: jobData.postNumber, icon: Users },
                { label: "Taille de l'entreprise", value: jobData.companySize || "Non spécifié", icon: UsersRound },
                { label: "Secteur d'activité", value: jobData.sectorName || "Non spécifié", icon: Factory },

              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {jobData.offerDescription && (
                  <section className="bg-white rounded-xl border shadow-sm p-6">
                    <h4 className="flex items-center gap-2 text-lg font-bold text-[#1e3a8a] mb-4 pb-2 border-b">
                      <FileText className="w-5 h-5" />
                      Description de l'offre
                    </h4>
                    <ReadonlyEditor
                      value={jobData.offerDescription}
                      namespace="job-description-preview"
                    />
                  </section>
                )}

                <section className="bg-white rounded-xl border shadow-sm p-6">
                  <h4 className="flex items-center gap-2 text-lg font-bold text-[#1e3a8a] mb-4 pb-2 border-b">
                    <FileText className="w-5 h-5" />
                    Description de l'entreprise
                  </h4>
                  <p>{jobData.companyDescription || "Pas spécifié"}</p>
                </section>

              </div>

              <div className="space-y-6">
                {/* Documents Widget */}
                {jobData.requiredDocuments.length > 0 && (
                  <div className="bg-white rounded-xl border shadow-sm p-6">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                      Documents requis
                    </h4>
                    <div className="space-y-2">
                      {jobData.requiredDocuments.map((d) => (
                        <div key={d.type} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 text-sm font-medium text-gray-700">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          {documentLabels[d.type]}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags Widget */}

                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h4 className="font-bold mb-4">Outils, compétences, domaines</h4>
                  <div className="flex flex-wrap gap-2">
                    {jobData.tagDto.length > 0 ? (
                      <>
                        {jobData.tagDto.map((tag) => (
                          <div
                            key={`${tag.type}-${tag.name}`}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border"
                          >
                            {tag.name}
                          </div>
                        ))}
                      </>
                    ) : (

                      "Aucun tag défini"
                    )}

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-12 py-3 bg-white sticky bottom-0 z-10 shrink-0 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="px-6">
            Revenir aux modifications
          </Button>
          <Button onClick={onPublish} disabled={isLoading} className="px-8 bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">
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
