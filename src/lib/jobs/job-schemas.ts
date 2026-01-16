// src/lib/jobs/job-schemas.ts

import { z } from "zod";
import { SerializedEditorState } from "lexical";

// Schema pour l'étape 1 : Entreprise
export const companyStepSchema = z.object({
  companyName: z.string().min(1, {
    message: "Le nom de l'entreprise est obligatoire",
  }),
  companyEmail: z
    .string()
    .email({
      message: "Email invalide",
    })
    .optional()
    .or(z.literal("")),
  companyDescription: z.string().optional(),
  sectorId: z.string().optional().nullable(),
  companyLength: z.string().optional(),
});

// Schema pour l'étape 2 : Informations générales
export const generalInfoStepSchema = z.object({
  title: z.string().min(1, {
    message: "Le titre du poste est obligatoire",
  }),
  description: z.custom<SerializedEditorState>(
    (val) => val !== null && val !== undefined,
    {
      message: "La description de l'offre est obligatoire",
    }
  ),
  workCountryLocation: z.string().min(1, {
    message: "Le pays est obligatoire",
  }),
  workCityLocation: z.array(z.string()).min(1, {
    message: "Au moins une ville est requise",
  }),
  expirationDate: z.string().optional(),
});

// Schema pour l'étape 3 : Détails du poste
export const jobDetailsStepSchema = z.object({
  jobType: z
    .enum(["FULL_TIME", "PART_TIME", "REMOTE", "HYBRID"])
    .optional()
    .nullable(),

  salary: z.string().optional(),
  contractType: z
    .enum([
      "CDI",
      "CDD",
      "CDI_PART_TIME",
      "CDD_PART_TIME",
      "INTERNSHIP",
      "ALTERNATIVE",
      "FREELANCE",
      "INTERIM",
    ])
    .optional()
    .nullable(),
  tagDto: z
    .array(
      z.object({
        name: z.string(),
        type: z.enum(["skill", "tool", "domain", "SKILL"]),
      })
    )
    .default([]),
});

// Schema pour l'étape 4 : Options avancées
export const advancedOptionsStepSchema = z.object({
  requiredLanguage: z
    .array(z.string())
    .default([])
    .refine(
      (langs) => {
        if (!langs || langs.length === 0) return true;
        // Si "Bilingue" est sélectionné, il ne peut pas être combiné avec d'autres langues
        const hasBilingue = langs.includes("Bilingue");
        if (hasBilingue && langs.length > 1) return false;
        return true;
      },
      {
        message: "Bilingue ne peut pas être combiné avec d'autres langues",
      }
    ),
  isUrgent: z.boolean().default(false),
  postNumber: z.number().int().positive().default(1),
  requiredDocuments: z
    .array(
      z.object({
        type: z.enum([
          "CV",
          "COVER_LETTER",
          "PORTFOLIO",
          "CERTIFICATE",
          "IDENTITY_DOC",
        ]),
      })
    )
    .min(1, {
      message: "Au moins un document requis est nécessaire",
    }),
});

// Schema global combinant les 4 étapes
export const createJobSchema = companyStepSchema
  .merge(generalInfoStepSchema)
  .merge(jobDetailsStepSchema)
  .merge(advancedOptionsStepSchema);

// Type explicite pour éviter les problèmes d'inférence avec react-hook-form
// Utiliser z.input pour obtenir le type d'entrée (avant transformation)
export type CreateJobFormData = z.input<typeof createJobSchema>;
export type CompanyStepData = z.infer<typeof companyStepSchema>;
export type GeneralInfoStepData = z.infer<typeof generalInfoStepSchema>;
export type JobDetailsStepData = z.infer<typeof jobDetailsStepSchema>;
export type AdvancedOptionsStepData = z.infer<typeof advancedOptionsStepSchema>;
