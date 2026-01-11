// src/lib/jobs/job-helpers.ts

import React from "react";

// Options pour les filtres
export const statusOptions = ["all", "PUBLISHED", "PENDING", "DRAFT"] as const;
export const typeOptions = [
  "all",
  "CDI",
  "CDD",
  "CDI_PART_TIME",
  "CDD_PART_TIME",
  "INTERNSHIP",
  "ALTERNATIVE",
  "FREELANCE",
  "INTERIM",
] as const;

export const STEPS = [
  { id: 1, name: "Création de l'entreprise" },
  { id: 2, name: "Informations générales" },
  { id: 3, name: "Détails du poste" },
  { id: 4, name: "Options avancées" },
];

export const DOCUMENT_TYPES = [
  { value: "CV", label: "CV" },
  { value: "COVER_LETTER", label: "Lettre de motivation" },
  { value: "PORTFOLIO", label: "Portfolio" },
  { value: "CERTIFICATE", label: "Certificat" },
  { value: "IDENTITY_DOC", label: "Pièce d'identité" },
] as const;

export const companySizeRanges = [
  "1 - 10 employés",
  "11 - 50 employés",
  "51 - 200 employés",
  "201 - 500 employés",
  "501 - 1000 employés",
  "1001 - 5000 employés",
  "5001 - 10 000 employés",
  "Plus de 10 000 employés",
];

export const salaryRanges: string[] = (() => {
  const ranges: string[] = [];
  for (let start = 0; start < 1000000; start += 50000) {
    const end = start + 50000;
    ranges.push(`${start.toLocaleString()} - ${end.toLocaleString()} FCFA`);
  }
  ranges.push("+1.000.000 FCFA");
  return ranges;
})();

export const documentLabels: Record<string, string> = {
  CV: "Curriculum Vitae",
  COVER_LETTER: "Lettre de motivation",
  PORTFOLIO: "Portfolio",
  IDENTITY_DOC: "Carte d'identite",
  CERTIFICATE: "Certificat",
};

export const ContractTypeLabels: Record<string, string> = {
  CDI: "CDI",
  CDD: "CDD",
  CDI_PART_TIME: "CDI (Temps partiel)",
  CDD_PART_TIME: "CDD (Temps partiel)",
  INTERNSHIP: "Stage",
  ALTERNATIVE: "Alternance",
  FREELANCE: "Freelance",
  INTERIM: "Intérim",
};

export const getContractTypeLabel = (type?: string) =>
  type && ContractTypeLabels[type] ? ContractTypeLabels[type] : "Non spécifié";

export const getStatusBadge = (status: string) => {
  const variants = {
    PUBLISHED: "bg-green-100 text-green-800 border-green-200",
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    DRAFT: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const labels = {
    PUBLISHED: "Publiée",
    PENDING: "En attente",
    DRAFT: "Brouillon",
  };

  const variant = variants[status as keyof typeof variants] || variants.DRAFT;
  const label = labels[status as keyof typeof labels] || status;

  return React.createElement(
    "span",
    {
      className: `px-2 py-1 text-xs font-medium rounded-full border ${variant}`,
    },
    label
  );
};
