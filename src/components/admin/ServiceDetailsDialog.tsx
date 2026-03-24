// src/components/admin/ServiceDetailsDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Tag,
  CircleDollarSign,
  CheckCircle2,
  ListChecks,
  Package,
  Users,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import { Accompaniment } from "@/types/accompaniment";
import {
  useAccompaniment,
  useCategories,
} from "@/hooks/admin/useAccompaniments";
import { Spinner } from "@/components/ui/spinner";

interface ServiceDetailsDialogProps {
  service: Accompaniment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SectionTitle({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <Icon className="h-4 w-4 text-[#14548C]" />
      <h4 className="font-semibold text-sm text-[#14548C] uppercase tracking-wide">
        {label}
      </h4>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ServiceDetailsDialog({
  service,
  open,
  onOpenChange,
}: ServiceDetailsDialogProps) {
  const targetId = service.accompanimentId || service.id;
  const { data: fullService, isLoading } = useAccompaniment(
    open ? targetId : null,
  );
  const displayService = fullService || service;

  // Fetch API
  const { data: categoriesData } = useCategories();

  const categories = categoriesData || [];

  // Helpers
  const getCategoryName = (id: string) => {
    return (
      categories.find((c) => c.categoryId === id)?.name || "Aucune catégorie."
    );
  };

  const serviceInitials = displayService.title
    ?.split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join(" ");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        {isLoading && !fullService ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Spinner className="h-8 w-8 text-[#14548C] mb-4" />
            <p className="text-gray-500 text-sm">Chargement des détails...</p>
          </div>
        ) : (
          <>
            <DialogHeader className="shrink-0 border-b bg-white/50">
              <DialogTitle className="text-[#1e3a8a] pb-4 flex items-center gap-2">
                Détails du service
              </DialogTitle>
            </DialogHeader>

            {/* le design */}
            <div className="space-y-8 text-sm flex-1 overflow-y-auto pr-3">
              <div className="flex flex-col pt-2 sm:flex-row gap-6 items-start sm:items-center">
                {/* IMAGE OU INITIALS */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl border bg-white shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
                  {displayService.imageUrl ? (
                    <img
                      src={displayService.imageUrl}
                      alt="Image service"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-semibold text-[#14548C]">
                      {serviceInitials}
                    </span>
                  )}
                </div>

                {/* TITRE + DESC */}
                <div className="space-y-2 flex-1 w-full">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] leading-tight">
                    {displayService.title}
                  </h2>

                  <p className="text-gray-600">
                    {displayService.shortDescription}
                  </p>

                  {/* TAGS */}
                  {displayService.tagNames?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {displayService.tagNames.map((tag) => (
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
              {/* <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl border bg-white shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
                {displayService.imageUrl ? (
                  <img
                    src={displayService.imageUrl}
                    alt="Image service"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Briefcase className="w-8 h-8 text-gray-300" />
                )}
              </div> */}
              <div className="bg-linear-to-br from-blue-50/80 to-indigo-50/50 p-4 sm:p-6 rounded-xl border border-blue-100/50 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Tag className="w-4 h-4 text-[#1e3a8a]" />
                    </div>
                    <span>{getCategoryName(displayService.categoryId)}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Clock className="w-4 h-4 text-[#1e3a8a]" />
                    </div>
                    <span>{displayService.duration || "Non spécifié"}</span>
                  </div>

                  {/* <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <CircleDollarSign className="w-4 h-4 text-[#1e3a8a]" />
                    </div>
                    <span>
                      {displayService.price === 0
                        ? "Gratuit"
                        : `${displayService.price.toLocaleString()} FCFA`}
                    </span>
                  </div> */}
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <CircleDollarSign className="w-4 h-4 text-[#1e3a8a]" />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {/* PRIX ACTUEL */}
                      <span className="font-semibold text-gray-900">
                        {displayService.price === 0
                          ? "Gratuit"
                          : `${displayService.price.toLocaleString()} FCFA`}
                      </span>

                      {/* PRIX ORIGINAL */}
                      {displayService.originalPrice &&
                        displayService.originalPrice > displayService.price && (
                          <span className="line-through text-gray-400 text-sm">
                            {displayService.originalPrice.toLocaleString()} FCFA
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="mt-2 border border-blue-100 bg-blue-50/50 p-4 rounded-lg">
                <h3 className="text-xl font-bold tracking-tight text-[#14548C] mb-2">
                  {displayService.title || "Titre du service"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {displayService.shortDescription || "Description..."}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-[#14548C]/10 text-[#14548C] border-0">
                    <Tag className="h-4 w-4 text-[#14548C]" />
                    {getCategoryName(displayService.categoryId)}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-gray-600 border-gray-200"
                  >
                    <Clock className="h-4 w-4 text-[#14548C]" />
                    {displayService.duration || "Non défini"}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 border-0 text-sm font-medium">
                    <CircleDollarSign className="h-4 w-4 text-green-600" />
                    {displayService.price.toLocaleString()} FCFA
                  </Badge>
                  {displayService.originalPrice ? (
                    <span className="text-red-400 line-through text-xs self-center">
                      {displayService.originalPrice.toLocaleString()} FCFA
                    </span>
                  ) : null}
                </div>

                {displayService.tagNames.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {displayService.tagNames.map((tag) => (
                      <Badge
                        key={tag.name}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div> */}

              <div className="mt-10 grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-[#1e3a8a] text-lg font-bold flex items-center gap-2">
                    <ListChecks className="w-5 h-5" /> Contenu
                  </h3>

                  {displayService.contents?.length > 0 ? (
                    <ul className="space-y-2">
                      {displayService.contents.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">Aucun contenu</p>
                  )}
                </div>
                {/* <div>
                  <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">
                    Contenu
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {displayService.contents.length > 0 ? (
                      displayService.contents.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))
                    ) : (
                      <span className="text-gray-400 italic">Vide</span>
                    )}
                  </ul>
                </div> */}
                <div className="space-y-4">
                  <h3 className="text-[#1e3a8a] text-lg font-bold flex items-center gap-2">
                    <Package className="w-5 h-5" /> Détails
                  </h3>

                  {displayService.details?.length > 0 ? (
                    <ul className="space-y-2">
                      {displayService.details.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">Aucun détail</p>
                  )}
                </div>
                {/* <div>
                  <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">
                    Détails
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {displayService.details.length > 0 ? (
                      displayService.details.map((c, i) => <li key={i}>{c}</li>)
                    ) : (
                      <span className="text-gray-400 italic">Vide</span>
                    )}
                  </ul>
                </div> */}
                <div className="space-y-4">
                  <h3 className="text-[#1e3a8a] text-lg font-bold flex items-center gap-2">
                    <Users className="w-5 h-5" /> Cibles
                  </h3>

                  {displayService.targets?.length > 0 ? (
                    <ul className="space-y-2">
                      {displayService.targets.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">Aucune cible</p>
                  )}
                </div>
                {/* <div>
                  <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">
                    Cibles
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {displayService.targets.length > 0 ? (
                      displayService.targets.map((c, i) => <li key={i}>{c}</li>)
                    ) : (
                      <span className="text-gray-400 italic">Vide</span>
                    )}
                  </ul>
                </div> */}
                <div className="space-y-4">
                  <h3 className="text-[#1e3a8a] text-lg font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Bénéfices
                  </h3>

                  {displayService.rewards?.length > 0 ? (
                    <ul className="space-y-2">
                      {displayService.rewards.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">Aucun bénéfice</p>
                  )}
                </div>
                {/* <div>
                  <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">
                    Bénéfices
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {displayService.rewards.length > 0 ? (
                      displayService.rewards.map((c, i) => <li key={i}>{c}</li>)
                    ) : (
                      <span className="text-gray-400 italic">Vide</span>
                    )}
                  </ul>
                </div> */}
                <div className="space-y-4">
                  <h3 className="text-[#1e3a8a] text-lg font-bold flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> Garanties
                  </h3>

                  {displayService.guarantees?.length > 0 ? (
                    <ul className="space-y-2">
                      {displayService.guarantees.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">Aucune garantie</p>
                  )}
                </div>
                {/* <div>
                  <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">
                    Garanties
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {displayService.guarantees.length > 0 ? (
                      displayService.guarantees.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))
                    ) : (
                      <span className="text-gray-400 italic">Vide</span>
                    )}
                  </ul>
                </div> */}
              </div>
            </div>
            {/* le design */}

            {/* <div className="space-y-5">
              {displayService.contents &&
                displayService.contents.length > 0 && (
                  <div>
                    <SectionTitle icon={ListChecks} label="Contenu" />
                    <BulletList items={displayService.contents} />
                  </div>
                )}

              {displayService.details && displayService.details.length > 0 && (
                <div>
                  <SectionTitle icon={Package} label="Détails" />
                  <BulletList items={displayService.details} />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {displayService.targets &&
                  displayService.targets.length > 0 && (
                    <div>
                      <SectionTitle icon={Users} label="Cibles" />
                      <BulletList items={displayService.targets} />
                    </div>
                  )}

                {displayService.rewards &&
                  displayService.rewards.length > 0 && (
                    <div>
                      <SectionTitle
                        icon={CheckCircle2}
                        label="Bénéfices / Récompenses"
                      />
                      <BulletList items={displayService.rewards} />
                    </div>
                  )}
              </div>

              {displayService.guarantees &&
                displayService.guarantees.length > 0 && (
                  <div>
                    <SectionTitle icon={ShieldCheck} label="Garanties" />
                    <BulletList items={displayService.guarantees} />
                  </div>
                )}
            </div> */}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
