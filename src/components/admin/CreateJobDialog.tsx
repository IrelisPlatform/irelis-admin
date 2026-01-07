// src/components/admin/CreateJobDialog.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { SerializedEditorState } from "lexical";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Editor } from "@/components/blocks/editor-00/editor";
import { createJobAction } from "@/app/_actions/jobs";
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
import useSectors, { Sector } from "@/hooks/useSectors";
import { JobPreviewDialog } from "./JobPreviewDialog";
import type { TagDto, RequiredDocument } from "@/types/job";
import { Plus } from "lucide-react";

type CreateJobDialogProps = {
  children?: React.ReactNode;
};

export function CreateJobDialog({ children }: CreateJobDialogProps) {
  const router = useRouter();
  const { sectors, loading: sectorsLoading } = useSectors();
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [newTagType, setNewTagType] = useState<"skill" | "tool" | "domain">(
    "skill"
  );
  const [newTagName, setNewTagName] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      companyDescription: "",
      sectorId: "",
      companyLength: "",
      title: "",
      description: null,
      workCountryLocation: "",
      workCityLocation: [],
      expirationDate: "",
      jobType: "FULL_TIME",
      responsibilities: null,
      requirements: null,
      benefits: null,
      salary: "",
      contractType: "CDI",
      tagDto: [],
      requiredLanguage: "",
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
        "Veuillez remplir tous les champs obligatoires pour passer à l'étape suivante"
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
      currentTags.filter((_, i) => i !== index)
    );
  };

  const handlePreview = async () => {
    const isValid = await validateStep(4);
    if (isValid) {
      setIsPreviewOpen(true);
    } else {
      toast.error(
        "Veuillez remplir tous les champs obligatoires avant la prévisualisation"
      );
    }
  };

  const handleCreateJob = async () => {
    setIsLoading(true);
    try {
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
        companyDescription: values.companyDescription?.trim() || "",
        companyLength: values.companyLength || "",
        sectorId: values.sectorId,
        companyEmail: values.companyEmail?.trim() || undefined,
        title: values.title.trim(),
        description: JSON.stringify(values.description),
        workCountryLocation: values.workCountryLocation,
        workCityLocation: values.workCityLocation.join(", "),
        responsibilities: JSON.stringify(values.responsibilities),
        requirements: JSON.stringify(values.requirements),
        benefits: values.benefits ? JSON.stringify(values.benefits) : undefined,
        contractType: values.contractType,
        jobType: values.jobType,
        salary: values.salary || "",
        isUrgent: values.isUrgent,
        isFeatured: false,
        expirationDate: expirationDateISO,
        requiredLanguage: values.requiredLanguage.trim(),
        postNumber: values.postNumber || 1,
        tagDto: values.tagDto || [],
        requiredDocuments: values.requiredDocuments,
      };

      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );

      if (companyLogo) {
        formData.append("file", companyLogo);
      }

      const result = await createJobAction(formData);
      if (result.success) {
        toast.success("Offre créée avec succès !");
        form.reset();
        setCompanyLogo(null);
        setLogoPreview(null);
        setSelectedCountry("");
        setCurrentStep(1);
        setIsOpen(false);
        setIsPreviewOpen(false);
        router.refresh();
      } else {
        toast.error(result.error || "Erreur lors de la création de l'offre");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la création de l'offre");
    } finally {
      setIsLoading(false);
    }
  };

  const jobPreviewData = {
    title: form.watch("title") || "",
    companyName: form.watch("companyName") || "",
    companyLogo: companyLogo,
    contractType: form.watch("contractType") || "CDI",
    salary: form.watch("salary") || "",
    workCityLocation: form.watch("workCityLocation") || [],
    workCountryLocation: form.watch("workCountryLocation") || "",
    expirationDate: form.watch("expirationDate") || "",
    requiredLanguage: form.watch("requiredLanguage") || "",
    postNumber: form.watch("postNumber") || 1,
    isUrgent: form.watch("isUrgent") || false,
    description: form.watch("description"),
    responsibilities: form.watch("responsibilities"),
    requirements: form.watch("requirements"),
    benefits: form.watch("benefits"),
    requiredDocuments: form.watch("requiredDocuments") || [],
    tagDto: form.watch("tagDto") || [],
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setCurrentStep(1);
            form.reset();
            setCompanyLogo(null);
            setLogoPreview(null);
          }
        }}
      >
        <DialogTrigger asChild>
          {children || (
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Nouvelle offre
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-5xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Créer une offre (Étape {currentStep}/4)</DialogTitle>
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
            <div className="py-4">
              {/* ÉTAPE 1 : ENTREPRISE */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2">Logo de l'entreprise</Label>
                    <Input
                      type="file"
                      ref={fileInputRef}
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const MAX_SIZE = 2 * 1024 * 1024;
                        const allowedTypes = [
                          "image/png",
                          "image/jpeg",
                          "image/jpg",
                          "image/webp",
                        ];

                        if (!allowedTypes.includes(file.type)) {
                          toast.error(
                            "Format non supporté (PNG, JPEG, WEBP uniquement)"
                          );
                          e.target.value = "";
                          return;
                        }

                        if (file.size > MAX_SIZE) {
                          toast.error("Le logo ne doit pas dépasser 2 Mo");
                          e.target.value = "";
                          return;
                        }

                        setCompanyLogo(file);
                        setLogoPreview(URL.createObjectURL(file));
                      }}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Taille maximale : 2 Mo
                    </p>

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
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nom de l'entreprise{" "}
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
                      <FormItem>
                        <FormLabel>Description de l'entreprise</FormLabel>
                        <FormControl>
                          <Textarea
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
                      <FormItem>
                        <FormLabel>Email de l'entreprise</FormLabel>
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
                      <FormItem>
                        <FormLabel>
                          Secteur d'activité{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={sectorsLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un secteur" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60 overflow-y-auto">
                            {sectors
                              .filter((sector) => sector.id.trim() !== "")
                              .map((sector: Sector) => (
                                <SelectItem key={sector.id} value={sector.id}>
                                  {sector.name}
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
                    name="companyLength"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taille de l'entreprise</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner la taille de l'entreprise" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60 overflow-y-auto">
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
                      <FormItem>
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
                      <FormItem>
                        <FormLabel>
                          Description de l'offre{" "}
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

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="workCountryLocation"
                      render={({ field }) => (
                        <FormItem>
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
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Villes <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={(v) => {
                              const currentCities = field.value || [];
                              if (!currentCities.includes(v)) {
                                field.onChange([...currentCities, v]);
                              }
                            }}
                            value=""
                            disabled={!selectedCountry}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une ville" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {selectedCountry &&
                              COUNTRIES_WITH_CITIES[
                                selectedCountry as keyof typeof COUNTRIES_WITH_CITIES
                              ]
                                ? COUNTRIES_WITH_CITIES[
                                    selectedCountry as keyof typeof COUNTRIES_WITH_CITIES
                                  ].map((city) => (
                                    <SelectItem key={city} value={city}>
                                      {city}
                                    </SelectItem>
                                  ))
                                : null}
                            </SelectContent>
                          </Select>
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
                                        (_, i) => i !== index
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
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="expirationDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date d'expiration</FormLabel>
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
                      <FormItem>
                        <FormLabel>
                          Type de poste <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="FULL_TIME">
                              Temps plein
                            </SelectItem>
                            <SelectItem value="PART_TIME">
                              Temps partiel
                            </SelectItem>
                            <SelectItem value="REMOTE">Télétravail</SelectItem>
                            <SelectItem value="HYBRID">Hybride</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="responsibilities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Missions <span className="text-red-500">*</span>
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

                  <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Compétences requises{" "}
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

                  <FormField
                    control={form.control}
                    name="benefits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avantages</FormLabel>
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

                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salaire</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un salaire" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60 overflow-y-auto">
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
                      <FormItem>
                        <FormLabel>
                          Type de contrat{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Langue requise <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez une langue" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Français">Français</SelectItem>
                            <SelectItem value="Anglais">Anglais</SelectItem>
                            <SelectItem value="Bilingue">
                              Bilingue (Français/Anglais)
                            </SelectItem>
                          </SelectContent>
                        </Select>
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

                  <FormField
                    control={form.control}
                    name="postNumber"
                    render={({ field }) => (
                      <FormItem>
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
                      <FormItem>
                        <FormLabel>
                          Documents requis{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {DOCUMENT_TYPES.map((doc) => {
                            const isChecked = (field.value || []).some(
                              (d) => d.type === doc.value
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
                                        (d) => d.type !== doc.value
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
                </div>
              )}
            </div>

            <div className="flex justify-between gap-2 pt-2">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Précédent
                </Button>
              )}
              {currentStep < STEPS.length ? (
                <Button onClick={handleNext}>Suivant</Button>
              ) : (
                <Button onClick={handlePreview} disabled={isLoading}>
                  Visualiser
                </Button>
              )}
            </div>
          </Form>
        </DialogContent>
      </Dialog>
      {/*Modal de prévisualisation*/}
      <JobPreviewDialog
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        jobData={jobPreviewData}
        onPublish={handleCreateJob}
        isLoading={isLoading}
      />
    </>
  );
}
