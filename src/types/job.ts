// src/types/job.ts

export interface TagDto {
  name: string;
  type: string; // ex: "skill", "tool"
}

export interface RequiredDocument {
  type: 'CV' | 'COVER_LETTER' | 'PORTFOLIO' | 'CERTIFICATE' | 'IDENTITY_DOC' | string;
}

// 🔹 Offre telle que renvoyée par le backend (lecture)
export interface PublishedJob {
  id: string;
  title: string;
  description: string;
  workCountryLocation: string;
  workCityLocation: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  contractType: 'CDI' | 'CDD' | 'INTERNSHIP' | 'ALTERNATIVE' | 'FREELANCE' | string;
  status: 'PENDING' | 'PUBLISHED' | 'DRAFT' | string;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'REMOTE' | 'HYBRID' | string;
  salary: string;
  publishedAt: string | null; // ISO 8601
  expirationDate: string; // obligatoire selon Swagger
  isFeatured: boolean;
  isUrgent: boolean;
  requiredLanguage: string;
  sectorName: string;
  postNumber: number;
  tagDto: { name: string; type: string }[];
  requiredDocuments: RequiredDocument[];
}

// 🔹 Offre telle qu'envoyée au backend (création)
export interface AdminJobOfferRequest {
  // Champs entreprise
  companyName: string;
  companyDescription: string;
  sectorId: string;
  companyEmail?: string;

  // Champs offre (identiques à PublishedJob, mais sans id/publishedAt)
  title: string;
  description: string;
  workCountryLocation: string;
  workCityLocation: string;
  responsibilities: string;
  requirements: string;
  benefits?: string;
  contractType: 'CDI' | 'CDD' | 'INTERNSHIP' | 'ALTERNATIVE' | 'FREELANCE';
  jobType: 'FULL_TIME' | 'PART_TIME' | 'REMOTE' | 'HYBRID';
  salary?: string;
  expirationDate: string;
  isFeatured?: boolean;
  isUrgent?: boolean;
  requiredLanguage: string;
  postNumber?: number;
  tagDto: { name: string; type?: string }[];
  requiredDocuments: RequiredDocument[];
}

// Pour les réponses paginées
export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  first: boolean;
  last: boolean;
}