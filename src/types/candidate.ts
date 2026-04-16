export interface CandidateResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  professionalTitle: string;
  experienceLevel: "BEGINNER" | "JUNIOR" | "INTERMEDIATE" | "ADVANCED" | "SENIOR" | "EXPERT";
  schoolLevel: "BAC" | "DEUG" | "BTS" | "DUT" | "LICENCE" | "MASTER" | "DOCTORAL" | "UNKNOWN";
  cvUrl?: string; // Optional since they might not have uploaded one
  completionRate: number; // 0 to 1
  createdAt: string; // ISO DateTime
  missingFields: string[];
  
  hasCv: boolean;
  hasExperiences: boolean;
  hasEducation: boolean;
  hasSkills: boolean;
  
  applicationCount: number;
}

export interface CandidatePageResponse {
  content: CandidateResponse[];
  page: number;
  size: number;
  total_elements: number; // Snake case is used in DTO
  total_pages: number;
  first: boolean;
  last: boolean;
}
