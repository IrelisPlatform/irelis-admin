"use client";

import { SerializedEditorState } from "lexical";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ReadonlyEditor } from "@/components/ReadonlyEditor";
import { Badge } from "@/components/ui/badge";
import { formatDateLong } from "@/services/date";
import {
    getContractTypeLabel,
    getJobTypeLabel,
    documentLabels,
    getStatusBadge,
} from "@/lib/jobs/job-helpers";
import type { PublishedJob } from "@/types/job";
import {
    Building2,
    FileText,
    Briefcase,
    Settings,
    MapPin,
    Mail,
    Globe,
    Users,
    Handshake,
} from "lucide-react";

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
    console.log(job)
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden bg-white/95 backdrop-blur-xl">
                <DialogHeader className="px-6 py-3 pb-2 border-b bg-white/50 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        {job.companyLogoUrl ? (
                            <img
                                src={job.companyLogoUrl}
                                alt={job.companyName}
                                className="w-12 h-12 rounded-lg border object-cover bg-white"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-lg border bg-gray-100 flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-muted-foreground" />
                            </div>
                        )}
                        <div>
                            <DialogTitle className="text-xl font-bold text-[#1e3a8a]">
                                {job.title}
                            </DialogTitle>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-medium">
                                    {job.companyName}
                                </span>
                                <span className="text-gray-300">•</span>
                                <span className="text-xs font-medium text-foreground flex gap-1 items-center">
                                    <Briefcase className="size-4" />
                                    {getContractTypeLabel(job.contractType)}
                                </span>
                                <span className="text-gray-300">•</span>
                                <span className="text-xs font-medium text- flex gap-1 items-center">
                                    <Handshake className="size-4" />
                                    {getJobTypeLabel(job.jobType)}
                                </span>
                                <span className="text-gray-300">•</span>
                                {getStatusBadge(job.status)}
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-hidden p-6">
                    <Tabs
                        defaultValue="general"
                        orientation="vertical"
                        className="flex h-full flex-row gap-4"
                    >
                        {/**Tablist */}
                        <div className="w-64 shrink-0">
                            <TabsList className="flex flex-col h-auto w-full gap-1 bg-transparent p-0">
                                <TabsTrigger
                                    value="company"
                                    className="w-full justify-start gap-2 px-3 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#1e3a8a]"
                                >
                                    <Building2 className="w-4 h-4" />
                                    Entreprise
                                </TabsTrigger>
                                <TabsTrigger
                                    value="general"
                                    className="w-full justify-start gap-2 px-3 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#1e3a8a]"
                                >
                                    <FileText className="w-4 h-4" />
                                    Infos générales
                                </TabsTrigger>
                                <TabsTrigger
                                    value="details"
                                    className="w-full justify-start gap-2 px-3 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#1e3a8a]"
                                >
                                    <Briefcase className="w-4 h-4" />
                                    Détails du poste
                                </TabsTrigger>
                                <TabsTrigger
                                    value="other"
                                    className="w-full justify-start gap-2 px-3 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#1e3a8a]"
                                >
                                    <Settings className="w-4 h-4" />
                                    Autres informations
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        {/**TabContent */}
                        <div className="flex-1 min-h-0 rounded-md border text-start overflow-y-auto px-8 max-h-[50vh] p-6">
                            <TabsContent value="company" className="mt-0 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold  mb-4">
                                        Informations de l'entreprise
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InfoItem
                                            icon={Building2}
                                            label="Nom"
                                            value={job.companyName}
                                        />
                                        <InfoItem
                                            icon={Mail}
                                            label="Email"
                                            value={job.companyEmail || "Non spécifié"}
                                        />

                                        <InfoItem
                                            icon={Briefcase}
                                            label="Secteur"
                                            value={job.sector || "Non spécifié"}
                                        />
                                        <InfoItem
                                            icon={Users}
                                            label="Taille"
                                            value={job.companySize || "Non spécifiée"}
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                            Description de l'entreprise
                                        </h4>
                                        <div className="bg-gray-50 rounded-lg p-4 text-sm text-[#1e3a8a] leading-relaxed">
                                            {job.companyDescription || "Aucune description"}
                                        </div>
                                    </div>
                                </div>

                            </TabsContent>

                            <TabsContent value="general" className="mt-0 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold  mb-4">
                                        Informations générales
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <InfoItem
                                            icon={FileText}
                                            label="Titre du poste"
                                            value={job.title}
                                        />
                                        <InfoItem
                                            icon={MapPin}
                                            label="Localisation"
                                            value={
                                                job.workCities && job.workCities.length > 0
                                                    ? `${job.workCountryLocation} - ${job.workCities.join(
                                                        ", "
                                                    )}`
                                                    : job.workCountryLocation
                                            }
                                        />
                                        <InfoItem
                                            icon={Users}
                                            label="Nombre de postes"
                                            value={job.postNumber?.toString() || "1"}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                            Description de l'offre
                                        </h4>
                                        {description ? (
                                            <div className="border rounded-lg p-4">
                                                <ReadonlyEditor
                                                    value={description}
                                                    namespace="job-description-details"
                                                />
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground italic">
                                                Aucune description de l'offre spécifiée
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="details" className="mt-0 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold  mb-4">
                                        Détails du poste
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InfoItem
                                            icon={Briefcase}
                                            label="Type de contrat"
                                            value={getContractTypeLabel(job.contractType)}
                                        />
                                        <InfoItem
                                            icon={Briefcase}
                                            label="Conditions de travail"
                                            value={getJobTypeLabel(job.jobType)}
                                        />
                                        <InfoItem
                                            icon={FileText}
                                            label="Salaire"
                                            value={job.salary || "Non spécifié"}
                                        />
                                        <InfoItem
                                            icon={Globe}
                                            label="Langues requises"
                                            value={
                                                job.requiredLanguages && job.requiredLanguages.length > 0
                                                    ? job.requiredLanguages.join(", ")
                                                    : "Aucune langue requise"
                                            }
                                        />
                                    </div>

                                    {job.tagDto && job.tagDto.length > 0 && (
                                        <div className="mt-6">
                                            <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                                Outils, compétences, domaines
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {job.tagDto.map((tag, i) => (
                                                    <Badge
                                                        key={i}
                                                        variant="secondary"
                                                        className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                                                    >
                                                        {tag.name}
                                                        <span className="ml-1 opacity-60 text-[10px] uppercase">
                                                            {tag.type}
                                                        </span>
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="other" className="mt-0 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold  mb-4">
                                        Autres informations
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InfoItem
                                            icon={FileText}
                                            label="Date de publication"
                                            value={
                                                job.publishedAt
                                                    ? formatDateLong(job.publishedAt)
                                                    : "Non publiée"
                                            }
                                        />
                                        <InfoItem
                                            icon={FileText}
                                            label="Date d'expiration"
                                            value={
                                                job.expirationDate
                                                    ? formatDateLong(job.expirationDate)
                                                    : "Non définie"
                                            }
                                        />
                                        <InfoItem
                                            icon={Settings}
                                            label="Urgent"
                                            value={job.isUrgent ? "Oui" : "Non"}
                                        />
                                    </div>

                                    {job.requiredDocuments && job.requiredDocuments.length > 0 && (
                                        <div className="mt-6">
                                            <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                                Documents demandés
                                            </h4>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                                {job.requiredDocuments.map((doc, i) => (
                                                    <li key={i}>
                                                        {documentLabels[doc.type] || doc.type}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function InfoItem({
    icon: Icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string | React.ReactNode;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-md shrink-0">
                <Icon className="w-4 h-4 text-[#1e3a8a]" />
            </div>
            <div>
                <p className={`${label === "Urgent" ? "text-destructive" : "text-muted-foreground"} text-sm font-medium`}>{label}</p>
                <div className="text-sm font-medium  mt-0.5 text-[#1e3a8a]">{value}</div>
            </div>
        </div>
    );
}
