// src/lib/api/transformJobOffer.ts
import { JobOffer } from '@/types/job';
import { Job } from '@/lib/mockJobs';
import { JobDetail } from '@/lib/mockJobDetails';

export const transformJobOfferToJob = (offer: JobOffer): Job => {
  return {
    id: offer.id,
    title: offer.title,
    company: offer.sectorName || 'Entreprise non précisée', // ou à récupérer côté backend plus tard
    location: [offer.workCityLocation, offer.workCountryLocation]
      .filter(Boolean)
      .join(', '),
    type: offer.contractType || 'Non spécifié',
    salary: offer.salary || 'Non communiqué',
    posted: offer.publishedAt
      ? `Publié le ${new Date(offer.publishedAt).toLocaleDateString('fr-FR')}`
      : 'Non daté',
    description: offer.description || '',
    tags: offer.tagDto?.map(t => t.name) || [],
    isNew: false, // ou calcule si publishedAt < 7 jours
    isUrgent: offer.isUrgent || false,
  };
};

export const transformJobOfferToJobDetail = (offer: JobOffer): JobDetail => {
  return {
    id: offer.id,
    title: offer.title,
    description: offer.description || "",
    workCountryLocation: offer.workCountryLocation,
    workCityLocation: offer.workCityLocation,
    responsibilities: offer.responsibilities || "",
    requirements: offer.requirements || "",
    benefits: offer.benefits || "",
    contractType: offer.contractType || "CDI",
    status: offer.status || "DRAFT",
    jobType: offer.jobType || "FULL_TIME",
    salary: offer.salary || "",
    publishedAt: offer.publishedAt || "",
    expirationDate: offer.expirationDate || "",
    isFeatured: offer.isFeatured ?? false,
    isUrgent: offer.isUrgent ?? false,
    requiredLanguage:
      offer.requiredLanguage || offer.requiredLanguages?.[0] || "",
    sectorName: offer.sectorName || "",
    companyName: offer.companyName || "Entreprise",
    companyDescription: offer.companyDescription || "",
    companyLength: offer.companyLength || "",
    postNumber: offer.postNumber || 0,
    tags: offer.tagDto || [],
    requiredDocuments: offer.requiredDocuments || [],
  };
};
