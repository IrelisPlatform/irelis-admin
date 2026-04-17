// src/types/job.ts
/* export type AdminJob = {
  id: string;
  [key: string]: any;
}; */

export interface TagDto {
  name: string;
  type: string; // ex: "skill", "tool"
}
export type JobPage = {
  content: BackendPublishedJob[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  first: boolean;
  last: boolean;
};
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
  contractType: string;
  status: string;
  jobType: string;
  salary: string;
  publishedAt: string | null;
  expirationDate: string;
  isFeatured: boolean;
  isUrgent: boolean;
  requiredLanguages: string[];
  sectorName: string;
  postNumber: number;
  companyLength: string;
  companyLogoUrl: string;
  tagDto?: Array<{ name: string; type: "skill" | "tool" | "domain" | "SKILL" }>;
  requiredDocuments: RequiredDocument[];
  companyName: string;
  companyDescription: string;
  companyEmail: string;
  sectorId: string;
  workCities: string[];
  viewCount?: number;
}

// 🔹 Version transformée pour le frontend
export interface PublishedJob {
  id: string;
  title: string;
  offerDescription: string;
  companyLogoUrl: string;
  companyName: string;
  companyDescription: string;
  sectorId: string;
  postNumber: number;
  workCountryLocation: string;
  workCities: string[];
  /* workCityLocation: string; */
  jobType: string;
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
  status: string;
  // competences (requirements) (à revoir)
  /* qualifications: string[]; */
  requiredLanguages: string[];
  requiredDocuments: RequiredDocument[];
  tagDto: Array<{ name: string; type: "skill" | "tool" | "domain" | "SKILL" }>;
  contractType: string;
  viewCount?: number;
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
  requirements: string;
  status: string;
  contractType: "CDI" | "CDD" | "INTERNSHIP" | "ALTERNATIVE" | "FREELANCE";
  jobType: "FULL_TIME" | "PART_TIME" | "REMOTE" | "HYBRID";
  salary?: string;
  expirationDate: string;
  isFeatured?: boolean;
  isUrgent?: boolean;
  requiredLanguage: string;
  postNumber?: number;
  tagDto: { name: string; type?: "skill" | "tool" | "domain" | "SKILL" }[];
  requiredDocuments: RequiredDocument[];
}

export type AdminJob = BackendPublishedJob;
