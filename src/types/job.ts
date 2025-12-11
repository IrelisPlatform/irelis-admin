// src/types/job.ts
export interface TagDto {
  name: string;
  type: string;
}

export interface RequiredDocument {
  type: 'CV' | 'LETTER' | string; // ajuste selon les valeurs possibles
}

export interface JobOffer {
  id: string;
  title: string;
  description: string;
  workCountryLocation: string;
  workCityLocation: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  contractType: 'CDI' | 'CDD' | 'INTERNSHIP' | 'ALTERNATIVE' | 'FREELANCE' | string; 
  status: 'PENDING' | 'PUBLISHED' | string;
  jobType: string;
  salary: string;
  publishedAt?: string; // ISO 8601
  expirationDate?: string;
  isFeatured: boolean;
  isUrgent: boolean;
  requiredLanguage: string;
  sectorName: string;
  postNumber: number;
  tagDto: TagDto[];
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