// src/components/admin/EditJobDialog.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SerializedEditorState } from "lexical";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Editor } from "@/components/blocks/editor-00/editor";
import { updateJobAction } from "@/app/_actions/jobs";
import {
  STEPS,
  DOCUMENT_TYPES,
  companySizeRanges,
  salaryRanges,
} from "@/lib/jobs/job-helpers";
import { TAG_NAMES, TagType } from "@/lib/jobTags";
import { COUNTRIES, COUNTRIES_WITH_CITIES } from "@/lib/countries";
import { formatDateLong } from "@/services/date";
import useSectors, { Sector } from "@/hooks/useSectors";
import type { TagDto, RequiredDocument, PublishedJob } from "@/types/job";

type EditJobDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: PublishedJob | null;
};

const INITIAL_EDIT_JOB_STATE = {
  id: "",
  companyName: "",
  companyEmail: "",
  companyDescription: "",
  companyLength: "",
  sectorId: "",
  title: "",
  description: null as SerializedEditorState | null,
  workCountryLocation: "",
  workCityLocation: [] as string[],
  responsibilities: null as SerializedEditorState | null,
  requirements: null as SerializedEditorState | null,
  benefits: null as SerializedEditorState | null,
  contractType: "CDI" as const,
  status: "PENDING" as const,
  jobType: "FULL_TIME" as const,
  salary: "",
  expirationDate: "",
  isUrgent: false,
  requiredLanguage: "",
  postNumber: 1,
  tagDto: [] as TagDto[],
  requiredDocuments: [{ type: "CV" }] as RequiredDocument[],
};

export function EditJobDialog({ open, onOpenChange, job }: EditJobDialogProps) {
  const router = useRouter();
  const { sectors, loading: sectorsLoading } = useSectors();
  const [currentStep, setCurrentStep] = useState(1);
  const [editJob, setEditJob] = useState(INITIAL_EDIT_JOB_STATE);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [newTagType, setNewTagType] = useState<"skill" | "tool" | "domain">(
    "skill"
  );
  const [newTagName, setNewTagName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (job && open) {
      setEditJob({
        id: job.id,
        companyName: job.companyName || "",
        companyEmail: job.companyEmail || "",
        companyDescription: job.companyDescription || "",
        companyLength: job.companyLength || "",
        sectorId: job.sectorId || "",
        title: job.title || "",
        description: job.description
          ? typeof job.description === "string"
            ? JSON.parse(job.description)
            : job.description
          : null,
        workCountryLocation: job.workCountryLocation || "",
        workCityLocation: Array.isArray(job.workCityLocation)
          ? job.workCityLocation
          : job.workCityLocation
          ? [job.workCityLocation]
          : [],
        responsibilities: job.responsibilities
          ? typeof job.responsibilities === "string"
            ? JSON.parse(job.responsibilities)
            : job.responsibilities
          : null,
        requirements: job.requirements
          ? typeof job.requirements === "string"
            ? JSON.parse(job.requirements)
            : job.requirements
          : null,
        benefits: job.benefits
          ? typeof job.benefits === "string"
            ? JSON.parse(job.benefits)
            : job.benefits
          : null,
        contractType: (job.contractType as any) || "CDI",
        status: job.status || "PENDING",
        jobType: (job.jobType as any) || "FULL_TIME",
        salary: job.salary || "",
        expirationDate: job.expirationDate || "",
        isUrgent: job.isUrgent || false,
        requiredLanguage: job.requiredLanguage || "",
        postNumber: job.postNumber || 1,
        tagDto: job.tagDto || [],
        requiredDocuments: job.requiredDocuments || [{ type: "CV" }],
      });
      setSelectedCountry(job.workCountryLocation || "");
      setLogoPreview(job.companyLogoUrl || null);
      setCurrentStep(1);
    }
  }, [job, open]);

  const setEditJobField = <K extends keyof typeof INITIAL_EDIT_JOB_STATE>(
    field: K,
    value: (typeof INITIAL_EDIT_JOB_STATE)[K]
  ) => {
    setEditJob((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTag = () => {
    if (newTagName.trim()) {
      setEditJob((prev) => ({
        ...prev,
        tagDto: [...prev.tagDto, { name: newTagName.trim(), type: newTagType }],
      }));
      setNewTagName("");
    }
  };

  const removeTag = (index: number) => {
    setEditJob((prev) => ({
      ...prev,
      tagDto: prev.tagDto.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateJob = async () => {
    if (!editJob.id) return;

    setIsLoading(true);
    try {
      const payload = {
        companyName: editJob.companyName?.trim() || "",
        companyDescription: editJob.companyDescription?.trim() || "",
        companyLength: editJob.companyLength,
        sectorId: editJob.sectorId,
        companyEmail: editJob.companyEmail?.trim() || undefined,
        title: editJob.title?.trim() || "",
        description: JSON.stringify(editJob.description),
        workCountryLocation: editJob.workCountryLocation || "",
        workCityLocation: Array.isArray(editJob.workCityLocation)
          ? editJob.workCityLocation.join(", ")
          : editJob.workCityLocation || "",
        responsibilities: JSON.stringify(editJob.responsibilities),
        requirements: JSON.stringify(editJob.requirements),
        benefits: JSON.stringify(editJob.benefits),
        contractType: editJob.contractType,
        jobType: editJob.jobType,
        salary: editJob.salary,
        isUrgent: editJob.isUrgent,
        isFeatured: false,
        expirationDate: editJob.expirationDate || "",
        requiredLanguage: editJob.requiredLanguage?.trim() || "",
        postNumber: editJob.postNumber || 1,
        tagDto: editJob.tagDto,
        requiredDocuments: editJob.requiredDocuments,
      };

      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );

      if (companyLogo) {
        formData.append("companyLogo", companyLogo);
      }

      const result = await updateJobAction(editJob.id, formData);
      if (result.success) {
        toast.success("Offre mise à jour !");
        onOpenChange(false);
        router.refresh();
      } else {
        toast.error(result.error || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la mise à jour de l'offre");
    } finally {
      setIsLoading(false);
    }
  };

  if (!job) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) setCurrentStep(1);
      }}
    >
      <DialogContent className="max-w-5xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Modifier l'offre (Étape {currentStep}/4)</DialogTitle>
          <div className="flex mt-2 space-x-1">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`h-1 flex-1 rounded-full ${
                  currentStep >= step.id ? "bg-[#1e3a88]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </DialogHeader>

        <div className="py-4">
          {/* ÉTAPE 1 : ENTREPRISE */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label className="mb-2">Logo de l'entreprise</Label>
                <Input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setCompanyLogo(file);
                      setLogoPreview(URL.createObjectURL(file));
                    }
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">Taille max : 2 Mo</p>
                {logoPreview && (
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={logoPreview}
                      alt="Logo entreprise"
                      className="w-16 h-16 rounded-lg object-contain border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCompanyLogo(null);
                        setLogoPreview(null);
                      }}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>

              <div>
                <Label className="mb-2">
                  Nom de l'entreprise <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={editJob.companyName}
                  onChange={(e) =>
                    setEditJob({ ...editJob, companyName: e.target.value })
                  }
                  placeholder="Ex: Irelis SARL"
                />
              </div>

              <div>
                <Label className="mb-2">Description de l'entreprise</Label>
                <Textarea
                  rows={3}
                  value={editJob.companyDescription}
                  onChange={(e) =>
                    setEditJob({
                      ...editJob,
                      companyDescription: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label className="mb-2">Email de l'entreprise</Label>
                <Input
                  type="email"
                  value={editJob.companyEmail}
                  onChange={(e) =>
                    setEditJob({ ...editJob, companyEmail: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="mb-2">
                  Secteur d'activité <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={editJob.sectorId}
                  onValueChange={(v) => setEditJob({ ...editJob, sectorId: v })}
                  disabled={sectorsLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un secteur" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {sectors.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2">Taille de l'entreprise</Label>
                <Select
                  value={editJob.companyLength}
                  onValueChange={(v) =>
                    setEditJob({ ...editJob, companyLength: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner la taille de l'entreprise" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {companySizeRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* ÉTAPE 2 : INFOS GÉNÉRALES */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label className="mb-2">
                  Titre de l'offre <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={editJob.title}
                  placeholder="Ex: Directeur de Production"
                  onChange={(e) =>
                    setEditJob({ ...editJob, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="mb-2">
                  Description de l'offre <span className="text-red-500">*</span>
                </Label>
                <Editor
                  editorSerializedState={editJob.description}
                  onSerializedChange={(value) =>
                    setEditJobField("description", value)
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="mb-2">
                    Pays <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={editJob.workCountryLocation}
                    onValueChange={(v) => {
                      setEditJob({ ...editJob, workCountryLocation: v });
                      setSelectedCountry(v);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un pays" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="mb-2">
                    Ville <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={
                      Array.isArray(editJob.workCityLocation)
                        ? editJob.workCityLocation[0] || ""
                        : editJob.workCityLocation
                    }
                    onValueChange={(v) =>
                      setEditJob({
                        ...editJob,
                        workCityLocation: [v],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une ville" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCountry &&
                      COUNTRIES_WITH_CITIES[
                        selectedCountry as keyof typeof COUNTRIES_WITH_CITIES
                      ] ? (
                        COUNTRIES_WITH_CITIES[
                          selectedCountry as keyof typeof COUNTRIES_WITH_CITIES
                        ].map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="__placeholder__" disabled>
                          Sélectionnez d'abord un pays
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="mb-2">Date d'expiration</Label>
                <Input
                  type="date"
                  value={editJob.expirationDate || ""}
                  onChange={(e) =>
                    setEditJob({ ...editJob, expirationDate: e.target.value })
                  }
                />
                <p className="text-sm text-gray-500 mt-1">
                  Date actuelle :{" "}
                  {editJob.expirationDate
                    ? formatDateLong(editJob.expirationDate)
                    : "non spécifié"}
                </p>
              </div>
            </div>
          )}

          {/* ÉTAPE 3 : DÉTAILS DU POSTE */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="mb-2">
                  Type de poste <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={editJob.jobType}
                  onValueChange={(v) =>
                    setEditJob({ ...editJob, jobType: v as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FULL_TIME">Temps plein</SelectItem>
                    <SelectItem value="PART_TIME">Temps partiel</SelectItem>
                    <SelectItem value="REMOTE">Télétravail</SelectItem>
                    <SelectItem value="HYBRID">Hybride</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="mb-2">
                  Missions <span className="text-red-500">*</span>
                </Label>
                <Editor
                  editorSerializedState={editJob.responsibilities}
                  onSerializedChange={(value) =>
                    setEditJobField("responsibilities", value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="mb-2">
                  Compétences requises <span className="text-red-500">*</span>
                </Label>
                <Editor
                  editorSerializedState={editJob.requirements}
                  onSerializedChange={(value) =>
                    setEditJobField("requirements", value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="mb-2">Avantages</Label>
                <Editor
                  editorSerializedState={editJob.benefits}
                  onSerializedChange={(value) =>
                    setEditJobField("benefits", value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="mb-2">Salaire</Label>
                <Select
                  value={editJob.salary}
                  onValueChange={(v) => setEditJob({ ...editJob, salary: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un salaire" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {salaryRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <Label className="mb-4">Tags (facultatif)</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Select
                    value={newTagType}
                    onValueChange={(v) => setNewTagType(v as TagType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="skill">Compétence</SelectItem>
                      <SelectItem value="tool">Outil</SelectItem>
                      <SelectItem value="domain">Domaine</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={newTagName} onValueChange={setNewTagName}>
                    <SelectTrigger>
                      <SelectValue placeholder="Nom" />
                    </SelectTrigger>
                    <SelectContent>
                      {TAG_NAMES[newTagType].map((name) => (
                        <SelectItem key={`${newTagType}-${name}`} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button type="button" onClick={addTag} size="sm">
                    + Ajouter
                  </Button>
                </div>

                {editJob.tagDto.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editJob.tagDto.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag.name} ({tag.type})
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="ml-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                          ✕
                        </button>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Aucun mot-clé ajouté.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="mb-2">
                  Type de contrat <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={editJob.contractType}
                  onValueChange={(v) =>
                    setEditJob({ ...editJob, contractType: v as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    <SelectItem value="CDI">CDI</SelectItem>
                    <SelectItem value="CDI_PART_TIME">
                      CDI (Temps partiel)
                    </SelectItem>
                    <SelectItem value="CDD">CDD</SelectItem>
                    <SelectItem value="CDD_PART_TIME">
                      CDD (Temps partiel)
                    </SelectItem>
                    <SelectItem value="INTERIM">Intérim</SelectItem>
                    <SelectItem value="FREELANCE">Freelance</SelectItem>
                    <SelectItem value="INTERNSHIP">Stage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* ÉTAPE 4 : OPTIONS AVANCÉES */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2">
                    Langue requise <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={editJob.requiredLanguage}
                    onValueChange={(v) =>
                      setEditJob({ ...editJob, requiredLanguage: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Français">Français</SelectItem>
                      <SelectItem value="Anglais">Anglais</SelectItem>
                      <SelectItem value="Bilingue">
                        Bilingue (Français/Anglais)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <Checkbox
                  id="urgent"
                  checked={editJob.isUrgent}
                  onCheckedChange={(checked) =>
                    setEditJob({
                      ...editJob,
                      isUrgent: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="urgent">Offre urgente</Label>
              </div>

              <div>
                <Label className="mb-2">Nombre de postes</Label>
                <Input
                  type="number"
                  min="1"
                  value={editJob.postNumber || 1}
                  onChange={(e) =>
                    setEditJob({
                      ...editJob,
                      postNumber: Number(e.target.value) || 1,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="mb-2">
                  Documents requis <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {DOCUMENT_TYPES.map((doc) => {
                    const isChecked = editJob.requiredDocuments.some(
                      (d) => d.type === doc.value
                    );
                    return (
                      <div key={doc.value} className="flex items-center gap-1">
                        <Checkbox
                          id={`doc-${doc.value}`}
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            let updated = [...editJob.requiredDocuments];
                            if (checked) updated.push({ type: doc.value });
                            else
                              updated = updated.filter(
                                (d) => d.type !== doc.value
                              );
                            if (updated.length === 0) return;
                            setEditJob({
                              ...editJob,
                              requiredDocuments: updated,
                            });
                          }}
                        />
                        <Label htmlFor={`doc-${doc.value}`} className="text-sm">
                          {doc.label}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOUTONS PRÉCÉDENT / SUIVANT / ENREGISTRER */}
        <div className="flex justify-between gap-2 pt-2">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Précédent
            </Button>
          )}
          {currentStep < STEPS.length ? (
            <Button onClick={() => setCurrentStep(currentStep + 1)}>
              Suivant
            </Button>
          ) : (
            <Button onClick={handleUpdateJob} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="h-4 w-4 text-white" />{" "}
                  <span className="ml-2">En cours</span>
                </>
              ) : (
                "Modifier"
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
