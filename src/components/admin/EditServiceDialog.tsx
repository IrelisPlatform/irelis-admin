// src/components/admin/EditServiceDialog.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Save, Eye, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accompaniment } from "@/types/accompaniment";
import { useCategories, useUpdateAccompaniment, useAccompaniment } from "@/hooks/admin/useAccompaniments";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { ServicePreview } from "./ServicePreview";

interface EditServiceDialogProps {
  service: Accompaniment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type EditFormState = Accompaniment & {
  file?: File | null;
};

function EditableList({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const handleChange = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    onChange([...items, ""]);
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </Label>
      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              value={item}
              onChange={(e) => handleChange(i, e.target.value)}
              className="h-8 text-sm"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0 text-red-400 hover:text-red-600 hover:bg-red-50"
              onClick={() => handleRemove(i)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-7 text-xs"
        onClick={handleAdd}
      >
        <Plus className="h-3.5 w-3.5 mr-1" /> Ajouter
      </Button>
    </div>
  );
}

export function EditServiceDialog({
  service,
  open,
  onOpenChange,
}: EditServiceDialogProps) {
  const [form, setForm] = useState<EditFormState>(service);
  const [step, setStep] = useState<"form" | "preview">("form");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const { data: categories = [] } = useCategories();
  const updateMutation = useUpdateAccompaniment();

  const targetId = service.accompanimentId || service.id;
  const { data: fullService, isLoading } = useAccompaniment(open ? targetId : null);

  // Reset form when fullService prop changes
  useEffect(() => {
    if (open) {
      if (fullService) {
        setForm(fullService);
        setImagePreview(fullService.imageUrl || null);
      }
      else {
        setForm(service);
        setImagePreview(service.imageUrl || null);
      }
      setStep("form");
    }
  }, [service, fullService, open]);

  const set = <K extends keyof EditFormState>(key: K, value: EditFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const targetId = form.accompanimentId || form.id;
    // On extrait seulement les champs modifiables par le backend
    const {
      title,
      shortDescription,
      duration,
      price,
      originalPrice,
      contents,
      details,
      targets,
      rewards,
      guarantees,
      tagNames,
      categoryId,
      file,
    } = form;

    updateMutation.mutate(
      {
        id: targetId,
        data: {
          title,
          shortDescription,
          duration,
          price,
          originalPrice,
          contents,
          details,
          targets,
          rewards,
          guarantees,
          tagNames,
          categoryId,
          file,
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      set("file", file);

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    set("file", null);
    setImagePreview(form.imageUrl || null);
  };

  const isValid =
    form.title.trim().length > 0 &&
    form.price >= 1 &&
    form.shortDescription.trim().length > 0;

  const selectedCategoryName =
    categories.find((c) => c.categoryId === form.categoryId)?.name ||
    "Non défini";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[88vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-[#1e3a8a] flex items-center gap-2">
            Modifier le service
            {step === "preview" && (
              <Badge variant="secondary" className="font-normal text-xs ml-2">
                Étape 2/2 : Prévisualisation
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {isLoading && !fullService ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Spinner className="h-8 w-8 text-[#14548C] mb-4" />
            <p className="text-gray-500 text-sm">Chargement du formulaire...</p>
          </div>
        ) : (
          <>
            <div className="py-2 px-2 flex-1 overflow-y-auto pr-3">
              {step === "form" ? (
                <div className="space-y-5">
                  {/* Informations principales */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-1">
                      <Label htmlFor="e-title">Titre</Label>
                      <Input
                        id="e-title"
                        value={form.title}
                        onChange={(e) => set("title", e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="e-logo">Image du service</Label>
                      <Input
                        id="e-logo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                      />

                      {imagePreview && (
                        <div className="flex items-center gap-3 mt-2">
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                            <img
                              src={imagePreview}
                              alt="preview"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {form.file && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleRemoveImage}
                              className="text-red-500"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Annuler nouvelle image
                            </Button>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <Label htmlFor="e-description">Description courte</Label>
                      <Textarea
                        id="e-description"
                        value={form.shortDescription}
                        onChange={(e) => set("shortDescription", e.target.value)}
                        rows={2}
                        className="resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="e-category">Catégorie</Label>
                      <Select
                        value={form.categoryId}
                        onValueChange={(val) => set("categoryId", val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner..." />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.categoryId} value={cat.categoryId}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="e-duration">Durée</Label>
                      <Input
                        id="e-duration"
                        value={form.duration}
                        onChange={(e) => set("duration", e.target.value)}
                        placeholder="ex: 24 heures, 2-3 jours..."
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="e-price">Prix</Label>
                      <Input
                        id="e-price"
                        type="number"
                        value={form.price || ""}
                        onChange={(e) => set("price", Number(e.target.value))}
                        placeholder="ex: 25000"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="e-originalPrice">Prix original</Label>
                      <Input
                        id="e-originalPrice"
                        type="number"
                        value={form.originalPrice || ""}
                        onChange={(e) =>
                          set("originalPrice", Number(e.target.value))
                        }
                        placeholder="ex: 40000"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Listes dynamiques */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <EditableList
                      label="Contenu"
                      items={form.contents || []}
                      onChange={(v) => set("contents", v)}
                    />
                    <EditableList
                      label="Détails"
                      items={form.details || []}
                      onChange={(v) => set("details", v)}
                    />
                    <EditableList
                      label="Cibles"
                      items={form.targets || []}
                      onChange={(v) => set("targets", v)}
                    />
                    <EditableList
                      label="Bénéfices"
                      items={form.rewards || []}
                      onChange={(v) => set("rewards", v)}
                    />
                    <EditableList
                      label="Garanties"
                      items={form.guarantees || []}
                      onChange={(v) => set("guarantees", v)}
                    />
                    <EditableList
                      label="Tags"
                      items={form.tagNames?.map(tag => tag.name) || []}
                      onChange={(v) => set("tagNames", v.map(name => ({ name })))}
                    />
                  </div>
                </div>
              ) : (
                <ServicePreview form={form} categoryName={selectedCategoryName} />
              )}
            </div>

            <DialogFooter className="gap-2 mt-4 pt-4 border-t">
              {step === "form" ? (
                <>
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Annuler
                  </Button>
                  <Button
                    onClick={() => setStep("preview")}
                    disabled={!isValid}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Prévisualiser
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setStep("form")}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={!isValid || updateMutation.isPending}
                    className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
                  >
                    {updateMutation.isPending ? "Modification..." : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer
                      </>
                    )}
                  </Button>
                </>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
