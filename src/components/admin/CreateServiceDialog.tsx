// src/components/admin/CreateServiceDialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  X,
  Save,
  Eye,
  ArrowLeft,
} from "lucide-react";
import { Accompaniment } from "@/types/accompaniment";
import { Category } from "@/types/category";
import { useCreateAccompaniment } from "@/hooks/admin/useAccompaniments";
import { Badge } from "@/components/ui/badge";
import { ServicePreview } from "./ServicePreview";

interface CreateServiceDialogProps {
  categories: Category[];
  children?: React.ReactNode;
}

type CreateFormState = Omit<Accompaniment, "id" | "accompanimentId"> & {
  file: File | null;
};

const emptyService = (): CreateFormState => ({
  title: "",
  shortDescription: "",
  categoryId: "",
  duration: "",
  imageUrl: "",
  price: 0,
  originalPrice: 0,
  contents: [],
  details: [],
  targets: [],
  rewards: [],
  guarantees: [],
  tagNames: [],
  file: null,
});

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
      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
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

export function CreateServiceDialog({
  categories,
  children,
}: CreateServiceDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "preview">("form");
  const [form, setForm] = useState<CreateFormState>(emptyService());
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const createMutation = useCreateAccompaniment();

  const set = <K extends keyof CreateFormState>(
    key: K,
    value: CreateFormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetState = () => {
    setForm(emptyService());
    setStep("form");
    setOpen(false);
  };

  const handleCreate = () => {
    createMutation.mutate(form, {
      onSuccess: () => {
        resetState();
      },
    });
  };

  const isValid =
    form.title.trim().length > 0 &&
    form.duration.trim().length > 0 &&
    form.price >= 1 &&
    form.shortDescription.trim().length > 0;

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
    setImagePreview(null);
  };

  const selectedCategoryName =
    categories.find((c) => c.categoryId === form.categoryId)?.name ||
    "Non défini";

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) resetState();
        else setOpen(true);
      }}
    >
      <DialogTrigger asChild>
        {children ?? (
          <Button className="bg-[#14548C] hover:bg-[#0d3a5f]">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau service
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-[#1e3a8a] flex items-center gap-2">
            Créer un nouveau service
            {step === "preview" && (
              <Badge variant="secondary" className="font-normal text-xs ml-2">
                Étape 2/2 : Prévisualisation
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="py-2 px-2 flex-1 overflow-y-auto pr-3">
          {step === "form" ? (
            // --- ETAPE 1 : FORMULAIRE ---
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-1">
                  <Label htmlFor="c-title">
                    Titre <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="c-title"
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    placeholder="Ex: CV Optimisé ATS Professionnel"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="c-logo">Image du service</Label>

                  <Input
                    id="c-logo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />

                  {/* PREVIEW */}
                  {imagePreview && (
                    <div className="flex items-center gap-3 mt-2">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={imagePreview}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveImage}
                        className="text-red-500"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  )}
                </div>


                <div className="md:col-span-2 space-y-1">
                  <Label htmlFor="c-description">
                    Description courte <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="c-description"
                    value={form.shortDescription}
                    onChange={(e) => set("shortDescription", e.target.value)}
                    rows={2}
                    className="resize-none"
                    placeholder="Description courte du service..."
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="c-category">Catégorie</Label>
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
                  <Label htmlFor="c-duration">
                    Durée <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="c-duration"
                    value={form.duration}
                    onChange={(e) => set("duration", e.target.value)}
                    placeholder="Ex: 2-3 jours, 24 heures..."
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="c-price">
                    Prix (FCFA) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="c-price"
                    type="number"
                    min="1"
                    value={form.price || ""}
                    onChange={(e) => set("price", Number(e.target.value))}
                    placeholder="Ex: 25000"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="c-originalPrice">Prix original</Label>
                  <Input
                    id="c-originalPrice"
                    type="number"
                    value={form.originalPrice || ""}
                    onChange={(e) =>
                      set("originalPrice", Number(e.target.value))
                    }
                    placeholder="Ex: 40000"
                  />
                </div>
              </div>

              <Separator />

              {/* Listes dynamiques */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EditableList
                  label="Contenu"
                  items={form.contents}
                  onChange={(v) => set("contents", v)}
                />
                <EditableList
                  label="Détails"
                  items={form.details}
                  onChange={(v) => set("details", v)}
                />
                <EditableList
                  label="Cibles"
                  items={form.targets}
                  onChange={(v) => set("targets", v)}
                />
                <EditableList
                  label="Bénéfices"
                  items={form.rewards}
                  onChange={(v) => set("rewards", v)}
                />
                <EditableList
                  label="Garanties"
                  items={form.guarantees}
                  onChange={(v) => set("guarantees", v)}
                />
                <EditableList
                  label="Tags"
                  items={form.tagNames.map((tag) => tag.name)}
                  onChange={(v) =>
                    set(
                      "tagNames",
                      v.map((name) => ({ name })),
                    )
                  }
                />
              </div>
            </div>
          ) : (
            // --- ETAPE 2 : PREVISUALISATION ---
            <ServicePreview form={form} categoryName={selectedCategoryName} />
          )}
        </div>

        <DialogFooter className="gap-2 mt-4 pt-4 border-t">
          {step === "form" ? (
            <>
              <Button variant="outline" onClick={resetState}>
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
                onClick={handleCreate}
                disabled={createMutation.isPending}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                {createMutation.isPending ? (
                  "Création..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Créer
                  </>
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
