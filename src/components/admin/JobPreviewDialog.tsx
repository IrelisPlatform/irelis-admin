// src/components/admin/JobPreviewDialog.tsx

"use client";

import { SerializedEditorState } from "lexical";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
} from "lucide-react";
import { formatDateLong } from "@/services/date";
import { getContractTypeLabel, documentLabels } from "@/lib/jobs/job-helpers";
import type { TagDto, RequiredDocument } from "@/types/job";

type JobPreviewData = {
  title: string;
  companyName: string;
  companyLogo?: File | string | null;
  contractType: string;
  salary?: string;
  workCityLocation: string | string[];
  workCountryLocation: string;
  expirationDate?: string;
  requiredLanguage: string;
  postNumber: number;
  isUrgent: boolean;
  description?: SerializedEditorState | null;
  responsibilities?: SerializedEditorState | null;
  requirements?: SerializedEditorState | null;
  benefits?: SerializedEditorState | null;
  requiredDocuments: RequiredDocument[];
  tagDto: TagDto[];
};

type JobPreviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobData: JobPreviewData;
  onPublish: () => void;
  isLoading?: boolean;
};

export function JobPreviewDialog({
  open,
  onOpenChange,
  jobData,
  onPublish,
  isLoading = false,
}: JobPreviewDialogProps) {
  const logoUrl =
    jobData.companyLogo instanceof File
      ? URL.createObjectURL(jobData.companyLogo)
      : jobData.companyLogo;

  const cityLocation = Array.isArray(jobData.workCityLocation)
    ? jobData.workCityLocation.join(", ")
    : jobData.workCityLocation;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-6 rounded-xl bg-white">
        <DialogHeader className="pl-2">
          <DialogTitle className="text-2xl font-bold mb-2 text-[#1e3a8a]">
            Prévisualisation de l'offre
          </DialogTitle>
          <p className="text-sm text-gray-500 mb-4">
            Vérifiez toutes les informations avant de publier votre offre.
          </p>
        </DialogHeader>

        <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-10 rounded-xl border border-blue-100/50 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            {logoUrl && (
              <img
                src={logoUrl}
                alt="Logo entreprise"
                className="w-16 h-16 rounded-lg border object-contain"
              />
            )}
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-[#1e3a8a]">
                {jobData.title}
              </h3>
              <p className="text-gray-700">{jobData.companyName}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            {[
              {
                label: "Type de contrat",
                value: getContractTypeLabel(jobData.contractType),
                icon: Briefcase,
              },
              {
                label: "Salaire",
                value: jobData.salary || "Non spécifié",
                icon: Banknote,
              },
              {
                label: "Lieu",
                value: `${cityLocation}, ${jobData.workCountryLocation}`,
                icon: MapPin,
              },
              {
                label: "Date d'expiration",
                value: jobData.expirationDate
                  ? formatDateLong(jobData.expirationDate)
                  : "Non définie",
                icon: Clock,
              },
              {
                label: "Langue requise",
                value: jobData.requiredLanguage || "-",
                icon: Globe,
              },
              {
                label: "Nombre de postes",
                value: jobData.postNumber ?? 1,
                icon: Users,
              },
              {
                label: "Offre urgente",
                value: jobData.isUrgent ? "Oui" : "Non",
                icon: AlertCircle,
              },
            ].map((item, i) => (
              <div key={i} className="flex p-2 items-start gap-4 text-base">
                <item.icon className="w-4 h-4 text-[#1e3a8a]/70 flex-shrink-0 mt-1" />
                <div className="flex-1 flex gap-2">
                  <span className="font-medium text-gray-800">
                    {item.label}
                  </span>
                  <span className="text-gray-700 break-words">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {jobData.description && (
              <div>
                <h4 className="text-[#1e3a8a] font-semibold mb-1">
                  Description de l'offre
                </h4>
                <ReadonlyEditor
                  value={jobData.description}
                  namespace="job-description"
                />
              </div>
            )}

            {jobData.responsibilities && (
              <div>
                <h4 className="text-[#1e3a8a] font-semibold mb-1">Missions</h4>
                <ReadonlyEditor
                  value={jobData.responsibilities}
                  namespace="job-responsibilities"
                />
              </div>
            )}

            {jobData.requirements && (
              <div>
                <h4 className="text-[#1e3a8a] font-semibold mb-1">
                  Compétences requises
                </h4>
                <ReadonlyEditor
                  value={jobData.requirements}
                  namespace="job-requirements"
                />
              </div>
            )}

            {jobData.requiredDocuments.length > 0 && (
              <div>
                <h4 className="text-[#1e3a8a] font-semibold mb-1">
                  Documents requis
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {jobData.requiredDocuments.map((d) => (
                    <li key={d.type}>{documentLabels[d.type]}</li>
                  ))}
                </ul>
              </div>
            )}

            {jobData.tagDto.length > 0 && (
              <div>
                <h4 className="text-[#1e3a8a] font-semibold mb-1">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {jobData.tagDto.map((tag) => (
                    <span
                      key={tag.name}
                      className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Revenir
          </Button>
          <Button onClick={onPublish} disabled={isLoading}>
            {isLoading ? <Loader2 /> : "Publier l'offre"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
