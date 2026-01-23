// src/components/admin/EditJobDialog.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useQueryClient, useQuery } from "@tanstack/react-query";
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
import { Eye, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Editor } from "@/components/blocks/editor-00/editor";
import {
  STEPS,
  DOCUMENT_TYPES,
  companySizeRanges,
  salaryRanges,
} from "@/lib/jobs/job-helpers";
import {
  createJobSchema,
  type CreateJobFormData,
  companyStepSchema,
  generalInfoStepSchema,
  jobDetailsStepSchema,
  advancedOptionsStepSchema,
} from "@/lib/jobs/job-schemas";
import { TAG_NAMES, TagType } from "@/lib/jobTags";
import { COUNTRIES, COUNTRIES_WITH_CITIES } from "@/lib/countries";
import { BasicImageUploader } from "@/components/ui/basic-image-uploader";
import { SelectWithSearch } from "@/components/ui/select-with-search";
import { SelectWithSearchAndButton } from "@/components/ui/select-with-search-and-button";
import { useUpdateJob } from "@/hooks/admin/useJobMutations";
import type { TagDto, RequiredDocument, PublishedJob } from "@/types/job";
import type { Sector } from "@/app/api/sectors/route";
import { JobPreviewDialog } from "./JobPreviewDialog"; // Import Preview Dialog

type EditJobDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: PublishedJob | null;
};

export function EditJobDialog({ open, onOpenChange, job }: EditJobDialogProps) {
  const { data: sectors = [], isLoading: sectorsLoading } = useQuery<Sector[]>({
    queryKey: ["sectors"],
    queryFn: async () => {
      const response = await fetch("/api/sectors");
      if (!response.ok) {
        throw new Error("Failed to fetch sectors");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  const updateJobMutation = useUpdateJob();
  const [currentStep, setCurrentStep] = useState(1);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [newTagType, setNewTagType] = useState<"skill" | "tool" | "domain">(
    "skill",
  );
  const [newTagName, setNewTagName] = useState("");
  const [customCities, setCustomCities] = useState<string[]>([]);
  const [isFormStateOpen, setIsFormStateOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // Add Preview State

  const form = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      companyDescription: "",
      sectorId: null,
      companyLength: "",
      title: "",
      description: null,
      workCountryLocation: "",
      workCityLocation: [],
      expirationDate: "",
      jobType: null,
      salary: "",
      contractType: null,
      tagDto: [],
      requiredLanguage: [],
      isUrgent: false,
      postNumber: 1,
      requiredDocuments: [{ type: "CV" }],
    },
    mode: "onChange",
  });

  const watchedValues = form.watch();

  useEffect(() => {
    if (watchedValues.workCountryLocation) {
      setSelectedCountry(watchedValues.workCountryLocation);
    }
  }, [watchedValues.workCountryLocation]);

  // Pré-remplir le formulaire avec les données du job
  useEffect(() => {
    if (job && open) {
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
        description = null;
      }

      const workCities = Array.isArray(job.workCities) ? job.workCities : [];

      form.reset({
        companyName: job.companyName || "",
        companyEmail: job.companyEmail || "",
        companyDescription: job.companyDescription || "",
        sectorId: job.sectorId || null,
        companyLength: job.companySize || "",
        title: job.title || "",
        description: description,
        workCountryLocation: job.workCountryLocation || "",
        workCityLocation: workCities,
        expirationDate: job.expirationDate
          ? new Date(job.expirationDate).toISOString().split("T")[0]
          : "",
        jobType: (job.jobType as any) || null,
        salary: job.salary || "",
        contractType: (job.contractType as any) || null,
        tagDto: (job.tagDto || []).map((tag) => ({
          name: tag.name,
          type: tag.type as "skill" | "tool" | "domain",
        })),
        requiredLanguage: Array.isArray(job.requiredLanguages)
          ? job.requiredLanguages
          : [],
        isUrgent: job.isUrgent || false,
        postNumber: job.postNumber || 1,
        requiredDocuments: (job.requiredDocuments || [{ type: "CV" }]).map(
          (doc) => ({
            type: (doc.type === "CV" ||
            doc.type === "COVER_LETTER" ||
            doc.type === "PORTFOLIO" ||
            doc.type === "CERTIFICATE" ||
            doc.type === "IDENTITY_DOC"
              ? doc.type
              : "CV") as
              | "CV"
              | "COVER_LETTER"
              | "PORTFOLIO"
              | "CERTIFICATE"
              | "IDENTITY_DOC",
          }),
        ),
      });

      setSelectedCountry(job.workCountryLocation || "");
      setLogoPreview(job.companyLogoUrl || null);
      setCurrentStep(1);
      setCustomCities(
        workCities.filter(
          (city) =>
            !COUNTRIES_WITH_CITIES[
              job.workCountryLocation as keyof typeof COUNTRIES_WITH_CITIES
            ]?.includes(city),
        ),
      );
    }
  }, [job, open, form]);

  const validateStep = async (step: number): Promise<boolean> => {
    let schema;
    switch (step) {
      case 1:
        schema = companyStepSchema;
        break;
      case 2:
        schema = generalInfoStepSchema;
        break;
      case 3:
        schema = jobDetailsStepSchema;
        break;
      case 4:
        schema = advancedOptionsStepSchema;
        break;
      default:
        return false;
    }

    const fields = Object.keys(schema.shape);
    const result = await form.trigger(fields as any);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.error(
        "Veuillez remplir tous les champs obligatoires pour passer à l'étape suivante",
      );
    }
  };

  const handlePreview = async () => {
    const isValid = await validateStep(4);
    if (isValid) {
      setIsPreviewOpen(true);
    } else {
      toast.error(
        "Veuillez remplir tous les champs obligatoires avant la prévisualisation",
      );
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const addTag = () => {
    if (newTagName.trim()) {
      const currentTags = form.getValues("tagDto") || [];
      form.setValue("tagDto", [
        ...currentTags,
        { name: newTagName.trim(), type: newTagType },
      ]);
      setNewTagName("");
    }
  };

  const removeTag = (index: number) => {
    const currentTags = form.getValues("tagDto") || [];
    form.setValue(
      "tagDto",
      currentTags.filter((_, i) => i !== index),
    );
  };

  const handleUpdateJob = async () => {
    if (!job) return;

    const values = form.getValues();

    let expirationDateISO: string | null = null;
    if (values.expirationDate) {
      const expDate = new Date(values.expirationDate);
      if (!isNaN(expDate.getTime())) {
        expDate.setHours(23, 59, 59, 999);
        expirationDateISO = expDate.toISOString();
      }
    }

    const payload = {
      companyName: values.companyName.trim(),
      companyDescription: values.companyDescription?.trim() || null,
      companyLength: values.companyLength || null,
      sectorId: values.sectorId || null,
      companyEmail: values.companyEmail?.trim() || null,
      title: values.title.trim(),
      description: JSON.stringify(values.description),
      workCountryLocation: values.workCountryLocation,
      workCities: values.workCityLocation,
      contractType: values.contractType || null,
      jobType: values.jobType || null,
      salary: values.salary || null,
      isUrgent: values.isUrgent,
      isFeatured: false,
      expirationDate: expirationDateISO,
      requiredLanguages: values.requiredLanguage,
      postNumber: values.postNumber || 1,
      tagDto: values.tagDto || [],
      requiredDocuments: values.requiredDocuments,
    };

    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(payload)], {
        type: "application/json",
      }),
    );
    console.log("formBeforeFile", formData);
    if (companyLogo) {
      formData.append("companyLogo", companyLogo);
    }
    console.log("formDataEditDialog", formData);
    updateJobMutation.mutate(
      { id: job.id, formData },
      {
        onSuccess: (result) => {
          if (result.success) {
            form.reset();
            setCompanyLogo(null);
            setLogoPreview(null);
            setLogoFileName(null);
            setSelectedCountry("");
            setIsPreviewOpen(false);
            setCurrentStep(1);
            onOpenChange(false);
          }
        },
      },
    );
  };

  if (!job) return null;

  const requiredLanguageValue = form.watch("requiredLanguage");
  const requiredLanguageString: string = requiredLanguageValue.join(", ");

  const jobPreviewData = {
    title: form.watch("title") || null,
    companyName: form.watch("companyName") || null,
    companyLogo: companyLogo || job?.companyLogoUrl,
    contractType: form.watch("contractType") || null,
    salary: form.watch("salary") || null,
    workCities: form.watch("workCityLocation") || [],
    workCountryLocation: form.watch("workCountryLocation") || null,
    expirationDate: form.watch("expirationDate") || null,
    requiredLanguages: form.watch("requiredLanguage") || [],
    postNumber: form.watch("postNumber") || 1,
    isUrgent: form.watch("isUrgent") || false,
    offerDescription: form.watch("description"),
    requiredDocuments: form.watch("requiredDocuments") || [],
    tagDto: form.watch("tagDto") || [],
    jobType: form.watch("jobType") || null,
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          onOpenChange(open);
          if (!open) {
            setCurrentStep(1);
            form.reset();
            setCompanyLogo(null);
            setLogoPreview(null);
            setLogoFileName(null);
            setCustomCities([]);
          }
        }}
      >
        <DialogContent className="max-w-full sm:max-w-xl lg:max-w-5xl max-h-[90vh] flex flex-col">
          <DialogHeader className="p-4 sm:px-8">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-primary">
                Modifier l&apos;offre (Étape {currentStep}/4)
              </DialogTitle>
              {/*    <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsFormStateOpen(true)}
              >
                <Eye className="h-4 w-4 mr-2" />
                État du formulaire
              </Button> */}
            </div>
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

          <Form {...form}>
            <div className="py-2 px-8 overflow-y-auto flex-1 min-h-0">
              {/* ÉTAPE 1 : ENTREPRISE */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="*:not-first:mt-2">
                    <Label className="mb-2">Logo de l&apos;entreprise</Label>
                    <div>
                      <BasicImageUploader
                        accept="image/png,image/jpeg,image/webp"
                        maxSize={2 * 1024 * 1024}
                        onFileChange={(file) => {
                          if (file) {
                            setCompanyLogo(file);
                            setLogoPreview(URL.createObjectURL(file));
                            setLogoFileName(file.name);
                          } else {
                            setCompanyLogo(null);
                            setLogoPreview(null);
                            setLogoFileName(null);
                          }
                        }}
                        value={companyLogo || logoPreview}
                        uploadButtonLabel="Ajouter un logo"
                        changeButtonLabel="Changer le logo"
                        removeButtonLabel="Supprimer"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Taille maximale : 2 Mo
                      </p>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel>
                          Nom de l&apos;entreprise{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Irelis SARL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyDescription"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel>Description de l&apos;entreprise</FormLabel>
                        <FormControl>
                          <Textarea
                            className=""
                            placeholder="Décrivez votre entreprise en quelques lignes..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyEmail"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel>Email de l&apos;entreprise</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="contact@entreprise.com"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sectorId"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel>Secteur d&apos;activité</FormLabel>
                        <FormControl>
                          <SelectWithSearch
                            options={sectors
                              .filter((sector) => sector.id.trim() !== "")
                              .map((sector) => ({
                                label: sector.name,
                                value: sector.id,
                              }))}
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                            placeholder="Sélectionnez un secteur"
                            searchPlaceholder="Rechercher un secteur..."
                            hasNotSpecified={true}
                            notSpecifiedLabel="Pas spécifié"
                            disabled={sectorsLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyLength"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel>Taille de l&apos;entreprise</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(
                              value === "not-specified" ? "" : value,
                            )
                          }
                          value={field.value || "not-specified"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner la taille de l'entreprise" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="not-specified">
                              Pas spécifié
                            </SelectItem>
                            {companySizeRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* ÉTAPE 2 : INFOS GÉNÉRALES */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel>
                          Titre du poste <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Directeur de Production"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel>
                          Description de l&apos;offre{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Editor
                            editorSerializedState={field.value ?? undefined}
                            onSerializedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="workCountryLocation"
                      render={({ field }) => (
                        <FormItem className="*:not-first:mt-2">
                          <FormLabel>
                            Pays <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={(v) => {
                              field.onChange(v);
                              setSelectedCountry(v);
                              form.setValue("workCityLocation", []);
                            }}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez un pays" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {COUNTRIES.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="workCityLocation"
                      render={({ field }) => {
                        const availableCities =
                          selectedCountry &&
                          COUNTRIES_WITH_CITIES[
                            selectedCountry as keyof typeof COUNTRIES_WITH_CITIES
                          ]
                            ? [
                                ...COUNTRIES_WITH_CITIES[
                                  selectedCountry as keyof typeof COUNTRIES_WITH_CITIES
                                ].filter((city) => city !== "Autre"),
                                ...customCities.filter(
                                  (city) =>
                                    !COUNTRIES_WITH_CITIES[
                                      selectedCountry as keyof typeof COUNTRIES_WITH_CITIES
                                    ]?.includes(city),
                                ),
                              ]
                            : [];

                        return (
                          <FormItem className="*:not-first:mt-2">
                            <FormLabel>
                              Villes <span className="text-red-500">*</span>
                            </FormLabel>
                            <SelectWithSearchAndButton
                              options={availableCities.map((city) => ({
                                label: city,
                                value: city,
                              }))}
                              value=""
                              onValueChange={(v) => {
                                const currentCities = field.value || [];
                                if (!currentCities.includes(v)) {
                                  field.onChange([...currentCities, v]);
                                }
                              }}
                              onAddItem={(newCity) => {
                                if (!customCities.includes(newCity)) {
                                  setCustomCities([...customCities, newCity]);
                                }
                                const currentCities = field.value || [];
                                if (!currentCities.includes(newCity)) {
                                  field.onChange([...currentCities, newCity]);
                                }
                              }}
                              placeholder="Sélectionnez une ville"
                              searchPlaceholder="Rechercher une ville..."
                              addItemPlaceholder="Entrer une ville..."
                              buttonLabel="Ajouter une ville"
                              disabled={!selectedCountry}
                            />
                            {field.value && field.value.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {field.value.map((city, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                  >
                                    {city}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = field.value.filter(
                                          (_, i) => i !== index,
                                        );
                                        field.onChange(updated);
                                      }}
                                      className="ml-1 text-xs text-muted-foreground hover:text-foreground"
                                    >
                                      ✕
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                            )}
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="expirationDate"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel>Date d&apos;expiration</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* ÉTAPE 3 : DÉTAILS DU POSTE */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="jobType"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel>Conditions de travail</FormLabel>
                        <FormControl>
                          <SelectWithSearch
                            options={[
                              { label: "Temps plein", value: "FULL_TIME" },
                              { label: "Temps partiel", value: "PART_TIME" },
                              { label: "Télétravail", value: "REMOTE" },
                              { label: "Hybride", value: "HYBRID" },
                            ]}
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                            placeholder="Sélectionnez les conditions de travail"
                            searchPlaceholder="Rechercher..."
                            hasNotSpecified={true}
                            notSpecifiedLabel="Pas spécifié"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel>Salaire</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(
                              value === "not-specified" ? "" : value,
                            )
                          }
                          value={field.value || "not-specified"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                className="text-muted-foreground"
                                placeholder="Sélectionner un salaire"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60 overflow-y-auto">
                            <SelectItem
                              className="text-muted-foreground"
                              value="not-specified"
                            >
                              Non spécifié
                            </SelectItem>
                            {salaryRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3">
                    <Label className="mb-4">
                      Tags (utile pour le référencement mais pas obligatoire)
                    </Label>
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
                            <SelectItem
                              key={`${newTagType}-${name}`}
                              value={name}
                            >
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button type="button" onClick={addTag} size="sm">
                        + Ajouter
                      </Button>
                    </div>

                    {form.watch("tagDto") &&
                      form.watch("tagDto").length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {form.watch("tagDto").map((tag, index) => (
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
                      )}

                    {(!form.watch("tagDto") ||
                      form.watch("tagDto").length === 0) && (
                      <p className="text-sm text-muted-foreground">
                        Aucun mot-clé ajouté.
                      </p>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="contractType"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel>Type de contrat</FormLabel>
                        <FormControl>
                          <SelectWithSearch
                            options={[
                              { label: "CDI", value: "CDI" },
                              {
                                label: "CDI (Temps partiel)",
                                value: "CDI_PART_TIME",
                              },
                              { label: "CDD", value: "CDD" },
                              {
                                label: "CDD (Temps partiel)",
                                value: "CDD_PART_TIME",
                              },
                              { label: "Intérim", value: "INTERIM" },
                              { label: "Freelance", value: "FREELANCE" },
                              { label: "Stage", value: "INTERNSHIP" },
                            ]}
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                            placeholder="Sélectionnez un type de contrat"
                            searchPlaceholder="Rechercher..."
                            hasNotSpecified={true}
                            notSpecifiedLabel="Pas spécifié"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* ÉTAPE 4 : OPTIONS AVANCÉES */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="requiredLanguage"
                    render={({ field }) => {
                      const currentLanguages = field.value || [];
                      const hasBilingue = currentLanguages.includes("Bilingue");

                      return (
                        <FormItem className="*:not-first:mt-2">
                          <FormLabel>Langue requise</FormLabel>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { value: "Français", label: "Français" },
                              { value: "Anglais", label: "Anglais" },
                              {
                                value: "Bilingue",
                                label: "Bilingue (Français/Anglais)",
                              },
                            ].map((lang) => {
                              const isChecked = currentLanguages.includes(
                                lang.value,
                              );
                              const isDisabled =
                                lang.value !== "Bilingue" && hasBilingue;

                              return (
                                <div
                                  key={lang.value}
                                  className="flex items-center gap-1"
                                >
                                  <Checkbox
                                    id={`lang-${lang.value}`}
                                    checked={isChecked}
                                    disabled={isDisabled}
                                    onCheckedChange={(checked) => {
                                      let updated: string[] = [
                                        ...currentLanguages,
                                      ];
                                      if (checked) {
                                        if (lang.value === "Bilingue") {
                                          // Si on sélectionne Bilingue, on supprime les autres
                                          updated = ["Bilingue"];
                                        } else {
                                          // Si on sélectionne une autre langue, on ajoute si Bilingue n'est pas sélectionné
                                          if (!hasBilingue) {
                                            updated.push(lang.value);
                                          }
                                        }
                                      } else {
                                        updated = updated.filter(
                                          (l) => l !== lang.value,
                                        );
                                      }
                                      field.onChange(updated);
                                    }}
                                  />
                                  <Label
                                    htmlFor={`lang-${lang.value}`}
                                    className={`text-sm cursor-pointer ${
                                      isDisabled ? "opacity-50" : ""
                                    }`}
                                  >
                                    {lang.label}
                                  </Label>
                                </div>
                              );
                            })}
                          </div>
                          {hasBilingue && currentLanguages.length > 1 && (
                            <p className="text-sm text-destructive mt-1">
                              Bilingue ne peut pas être combiné avec
                              d&apos;autres langues
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="postNumber"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel>Nombre de postes</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            value={field.value || 1}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value) || 1)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requiredDocuments"
                    render={({ field }) => (
                      <FormItem className="*:not-first:mt-2">
                        <FormLabel>
                          Documents requis{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {DOCUMENT_TYPES.map((doc) => {
                            const isChecked = (field.value || []).some(
                              (d) => d.type === doc.value,
                            );
                            return (
                              <div
                                key={doc.value}
                                className="flex items-center gap-1"
                              >
                                <Checkbox
                                  id={`doc-${doc.value}`}
                                  checked={isChecked}
                                  onCheckedChange={(checked) => {
                                    let updated = [...(field.value || [])];
                                    if (checked) {
                                      updated.push({ type: doc.value });
                                    } else {
                                      updated = updated.filter(
                                        (d) => d.type !== doc.value,
                                      );
                                    }
                                    if (updated.length === 0) return;
                                    field.onChange(updated);
                                  }}
                                />
                                <Label
                                  htmlFor={`doc-${doc.value}`}
                                  className="text-sm"
                                >
                                  {doc.label}
                                </Label>
                              </div>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isUrgent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Offre urgente</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <div className="px-8 flex justify-between gap-2 pt-2">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Précédent
                </Button>
              )}
              {currentStep < STEPS.length ? (
                <Button onClick={handleNext}>Suivant</Button>
              ) : (
                <Button
                  onClick={handlePreview}
                  className="bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]/90"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Prévisualiser
                </Button>
              )}
            </div>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal d'état du formulaire */}
      <Dialog open={isFormStateOpen} onOpenChange={setIsFormStateOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>État du formulaire</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">
              {JSON.stringify(form.getValues(), null, 2)}
            </pre>
          </div>
        </DialogContent>
      </Dialog>
      <JobPreviewDialog
        open={isPreviewOpen}
        onPublish={handleUpdateJob}
        isLoading={updateJobMutation.isPending}
        onOpenChange={setIsPreviewOpen}
        jobData={jobPreviewData}
        texts={{
          descriptionHeader:
            "Vérifiez le rendu final de votre offre avant de la modifier",
          textBtnAction: "Modifier l'offre",
        }}
      />
    </>
  );
}
