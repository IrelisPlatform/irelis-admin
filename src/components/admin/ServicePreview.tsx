// src/components/admin/ServicePreview.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { SerializedEditorState } from "lexical";
import { Tag, Clock, CircleDollarSign } from "lucide-react";
import ReadonlyEditor from "../ReadonlyEditor";

interface ServicePreviewProps {
  form: {
    title: string;
    shortDescription: string;
    duration: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string;
    file?: File | null;
    contents?: SerializedEditorState | null;
    details?: SerializedEditorState | null;
    targets?: SerializedEditorState | null;
    rewards?: SerializedEditorState | null;
    guarantees?: SerializedEditorState | null;
    tagNames?: { name: string }[];
  };
  categoryName: string;
}

export function ServicePreview({ form, categoryName }: ServicePreviewProps) {
  const imageSrc = form.file ? URL.createObjectURL(form.file) : form.imageUrl;

  return (
    <div className="space-y-6 text-sm">
      {/* Image du service  */}
      <div className="flex flex-col pt-2 sm:flex-row gap-6 items-start sm:items-center">
        {/* IMAGE OU INITIALS */}
        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl border bg-white shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Image service"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-semibold text-[#14548C]">
              {form.title
                ? form.title
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()
                : "NA"}
            </span>
          )}
        </div>

        {/* TITRE + DESC */}
        <div className="space-y-2 flex-1 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] leading-tight">
            {form.title}
          </h2>

          <p className="text-gray-600">{form.shortDescription}</p>

          {/* TAGS */}
          {form.tagNames && form.tagNames.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {form.tagNames.map((tag) => (
                <Badge
                  key={tag.name}
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 border-blue-100"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Infos rapides */}
      <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-4 sm:p-6 rounded-xl border border-blue-100/50 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <Tag className="w-4 h-4 text-[#1e3a8a]" />
            </div>
            <span>{categoryName}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <Clock className="w-4 h-4 text-[#1e3a8a]" />
            </div>
            <span>{form.duration || "Non spécifié"}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <CircleDollarSign className="w-4 h-4 text-[#1e3a8a]" />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* PRIX ACTUEL */}
              <span className="font-semibold text-gray-900">
                {form.price === 0
                  ? "Gratuit"
                  : `${form.price.toLocaleString()} FCFA`}
              </span>

              {/* PRIX ORIGINAL */}
              {form.originalPrice && form.originalPrice > form.price && (
                <span className="line-through text-gray-400 text-sm">
                  {form.originalPrice.toLocaleString()} FCFA
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Listes */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">
            Contenu
          </h4>
          {form.contents ? (
            <div className="prose prose-sm max-w-none text-gray-600">
              <ReadonlyEditor
                value={form.contents}
                namespace="preview-contents"
              />
            </div>
          ) : (
            <p className="text-gray-500 italic">Aucun contenu fourni.</p>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">
            Détails
          </h4>
          {form.details ? (
            <div className="prose prose-sm max-w-none text-gray-600">
              <ReadonlyEditor
                value={form.details}
                namespace="preview-details"
              />
            </div>
          ) : (
            <p className="text-gray-500 italic">Aucun détail fourni.</p>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">
            Cibles
          </h4>
          {form.targets ? (
            <div className="prose prose-sm max-w-none text-gray-600">
              <ReadonlyEditor
                value={form.targets}
                namespace="preview-targets"
              />
            </div>
          ) : (
            <p className="text-gray-500 italic">Aucune cible fournie.</p>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">
            Bénéfices
          </h4>
          {form.rewards ? (
            <div className="prose prose-sm max-w-none text-gray-600">
              <ReadonlyEditor
                value={form.rewards}
                namespace="preview-rewards"
              />
            </div>
          ) : (
            <p className="text-gray-500 italic">Aucun bénéfice fourni.</p>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">
            Garanties
          </h4>
          {form.guarantees ? (
            <div className="prose prose-sm max-w-none text-gray-600">
              <ReadonlyEditor
                value={form.guarantees}
                namespace="preview-guarantees"
              />
            </div>
          ) : (
            <p className="text-gray-500 italic">Aucune garantie fournie.</p>
          )}
        </div>
    </div>
  );
}
