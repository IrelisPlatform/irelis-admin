export interface CandidateSkill {
  id: string;
  name: string;
  level: "BEGINNER" | "ELEMENTARY" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
}

export interface CandidateEducation {
  id: string;
  degree: string;
  institution: string;
  city: string;
  graduationYear: number;
}

export interface CandidateExperience {
  id: string;
  position: string;
  companyName: string;
  city: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
}

export interface JobPreference{
  desiredPosition:string;
  contractTypes: string[];
  availability:string;
  pretentionsSalarial:string;
  country: string;
  sectors:string[];

}

export interface CandidateResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  professionalTitle: string;
  experienceLevel?: "BEGINNER" | "JUNIOR" | "INTERMEDIATE" | "ADVANCED" | "SENIOR" | "EXPERT";
  schoolLevel?: "BAC" | "DEUG" | "BTS" | "DUT" | "LICENCE" | "MASTER" | "DOCTORAL" | "UNKNOWN";
  cvUrl?: string;
  completionRate: number;
  createdAt: string;
  missingFields: string[];

  hasCv: boolean;
  hasExperiences: boolean;
  hasEducation: boolean;
  hasSkills: boolean;

  skills?: CandidateSkill[];
  educations?: CandidateEducation[];
  experiences?: CandidateExperience[];
  preference?:JobPreference;
  applicationCount: number;
}

export interface CandidatePageResponse {
  content: CandidateResponse[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  first: boolean;
  last: boolean;
}
