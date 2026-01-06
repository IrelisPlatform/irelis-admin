// src/types/job.ts

export interface TagDto {
  name: string;
  type: string; // ex: "skill", "tool"
}

export interface RequiredDocument {
  type:
    | "CV"
    | "COVER_LETTER"
    | "PORTFOLIO"
    | "CERTIFICATE"
    | "IDENTITY_DOC"
    | string;
}

// 🔹 Réponse brute du backend (lecture seule)
export interface BackendPublishedJob {
  id: string;
  title: string;
  description: string;
  workCountryLocation: string;
  workCityLocation: string;
  responsibilities: string;
  // Qualifications
  requirements: string;
  // Avantages
  benefits: string;
  contractType: string;
  status: string;
  jobType: string;
  salary: string;
  publishedAt: string | null;
  expirationDate: string;
  isFeatured: boolean;
  isUrgent: boolean;
  // Langues requises
  requiredLanguage: string;
  sectorName: string;
  // Nombre de posts
  postNumber: number;
  companyLength: string;
  companyLogoUrl: string;
  tagDto?: Array<{ name: string; type: string }>;
  requiredDocuments: RequiredDocument[];
  companyName: string;
  companyDescription: string;
  companyEmail: string;
}

// 🔹 Version transformée pour le frontend
export interface PublishedJob {
  id: string;
  title: string;
  offerDescription: string;
  companyLogoUrl: string;
  companyName: string;
  companyDescription: string;
  /* sectorId: string; */
  postNumber: number;
  companyLength: string;
  workCountryLocation: string;
  workCityLocation: string;
  jobType: string;
  // Documents requis
  requirements: string;
  location: string;
  type: string;
  salary: string;
  publishedAt: string | null;
  expirationDate: string;
  isFeatured: boolean;
  isUrgent: boolean;
  isNew: boolean;
  sector: string;
  companySize?: string;
  companyLogo?: string;
  companyEmail: string;
  tags: string[];
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  requiredLanguage: string;
  requiredDocuments: RequiredDocument[];
  tagDto: Array<{ name: string; type: string }>;
  contractType: string;
  status: string;
}

// 🔹 Pour les réponses paginées (réutilisable partout)
export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  first: boolean;
  last: boolean;
}

export interface AdminJobOfferRequest {
  id: string;
  companyName: string;
  companyDescription: string;
  sectorId: string;
  companyEmail?: string;
  title: string;
  description: string;
  workCountryLocation: string;
  workCityLocation: string;
  responsibilities: string;
  requirements: string;
  benefits?: string;
  status: string;
  contractType: "CDI" | "CDD" | "INTERNSHIP" | "ALTERNATIVE" | "FREELANCE";
  jobType: "FULL_TIME" | "PART_TIME" | "REMOTE" | "HYBRID";
  salary?: string;
  expirationDate: string;
  isFeatured?: boolean;
  isUrgent?: boolean;
  requiredLanguage: string;
  postNumber?: number;
  tagDto: { name: string; type?: string }[];
  requiredDocuments: RequiredDocument[];
}

export type AdminJob = BackendPublishedJob;
