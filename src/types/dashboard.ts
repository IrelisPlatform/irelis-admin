export interface TopOfferStats {
  jobTitle: string;
  status: string;
  applicationCount: number;
  viewCount: number;
  conversionRate: number;
}

export interface AdminDashboardResponse {
  totalUsers: number;
  totalCandidates: number;
  totalRecruiters: number;
  totalJobOffers: number;
  totalApplications: number;
  
  newCandidatesLastMonth: number;
  newJobOffersLastMonth: number;
  newApplicationsLastMonth: number;
  
  newUsersToday: number;
  newJobOffersToday: number;
  newApplicationsToday: number;
  
  totalViews: number;
  averageConversionRate: number;
  averageProcessingTimeDays: number;
  applicationsPerJobRatio: number;
  
  topOffersByApplications: TopOfferStats[];
  topOffersByViews: TopOfferStats[];
  
  applicationsByStatus: Record<string, number>;
}
