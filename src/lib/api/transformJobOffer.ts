// src/lib/api/transformJobOffer.ts
import { JobOffer } from '@/types/job';
import { Job } from '@/lib/mockJobs';
import jobDetails, { JobDetail } from '@/lib/mockJobDetails';

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
    company: offer.sectorName || 'Entreprise',
    location: [offer.workCityLocation, offer.workCountryLocation]
      .filter(Boolean)
      .join(', '),
    type: offer.contractType || 'CDI',
    salary: offer.salary || '',
    posted: offer.publishedAt
      ? `Publié le ${new Date(offer.publishedAt).toLocaleDateString('fr-FR')}`
      : '',
    description: offer.description || '',
    tags: offer.tagDto?.map(t => t.name) || [],
    isNew: false,
    isUrgent: offer.isUrgent || false,
    responsibilities: offer.responsibilities ? [offer.responsibilities] : [],
    qualifications: offer.requirements ? [offer.requirements] : [],
    benefits: offer.benefits ? [offer.benefits] : [],
    about: offer.sectorName || '',
    companySize: '', // non fourni → à laisser vide ou gérer plus tard
    sector: offer.sectorName || '',
  };
};