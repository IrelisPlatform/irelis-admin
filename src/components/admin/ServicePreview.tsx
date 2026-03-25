// src/components/admin/ServicePreview.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Tag, Clock, CircleDollarSign } from "lucide-react";

interface ServicePreviewProps {
  form: {
    title: string;
    shortDescription: string;
    duration: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string;
    file?: File | null;
    tagNames?: { name: string }[];
    contents: string[];
    details: string[];
    targets: string[];
    rewards: string[];
    guarantees?: string[];
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
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">
            Contenu
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {form.contents && form.contents.length > 0 ? (
              form.contents.map((c, i) => <li key={i}>{c}</li>)
            ) : (
              <span className="text-gray-400 italic">Vide</span>
            )}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">
            Détails
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {form.details && form.details.length > 0 ? (
              form.details.map((c, i) => <li key={i}>{c}</li>)
            ) : (
              <span className="text-gray-400 italic">Vide</span>
            )}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">
            Cibles
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {form.targets && form.targets.length > 0 ? (
              form.targets.map((c, i) => <li key={i}>{c}</li>)
            ) : (
              <span className="text-gray-400 italic">Vide</span>
            )}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">
            Bénéfices
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {form.rewards && form.rewards.length > 0 ? (
              form.rewards.map((c, i) => <li key={i}>{c}</li>)
            ) : (
              <span className="text-gray-400 italic">Vide</span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
