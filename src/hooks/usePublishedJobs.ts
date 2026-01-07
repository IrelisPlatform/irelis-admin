// src/hooks/usePublishedJobs.ts
"use client";

import { useState, useEffect } from "react";
import { BackendPublishedJob, PublishedJob } from "@/types/job";

// export interface Job {
//     id: string;
//     title: string;
//     description: string;
//     workCountryLocation: string;
//     workCityLocation: string;
//     responsibilities: string;
//     requirements: string;
//     benefits: string;
//     contractType: string;
//     status: string;
//     jobType: string;
//     salary: string;
//     publishedAt: string;
//     expirationDate:  string;
//     isFeatured: boolean;
//     isUrgent: boolean;
//     requiredLanguage: string;
//     sectorName: string;
//     companyName: string;
//     companyDescription: string;
//     companyLength: string;
//     postNumber: number;
//     tagDto: [
//         {
//             name: string;
//             type: string;
//         }
//     ],
//     requiredDocuments: [
//         {
//             type: string;
//         }
//     ]
// }

interface JobPage {
  content: BackendPublishedJob[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  first: boolean;
  last: boolean;
}

const parseListFromString = (input: string): string[] => {
  if (!input) return [];
  return input
    .split(/[\n•*—\-–]+/)
    .map((s) => s.trim())
    .filter(
      (s) =>
        s.length > 0 &&
        !/^(responsibilités?|qualifications?|avantages?)$/i.test(s)
    );
};

export const transformJob = (job: BackendPublishedJob): PublishedJob => {
  const now = new Date();
  const publishedAt = job.publishedAt ? new Date(job.publishedAt) : null;
  const isNew = publishedAt
    ? (now.getTime() - publishedAt.getTime()) / (1000 * 3600 * 24) <= 7
    : false;

  return {
    id: job.id,
    title: job.title,
    // description de l'offre
    offerDescription: job.description,
    companyName: job.companyName || "Entreprise confidentielle",
    companyDescription: job.companyDescription,
    type: job.contractType,
    salary: job.salary,
    publishedAt: job.publishedAt,
    expirationDate: job.expirationDate,
    isFeatured: job.isFeatured,
    isUrgent: job.isUrgent,
    isNew,
    sector: job.sectorName,
    companySize: job.companyLength,
    companyLogo: job.companyLogoUrl,
    requiredLanguage: job.requiredLanguage,
    tags: job.tagDto.map((t) => t.name),

    requiredDocuments: job.requiredDocuments,
    companyLogoUrl: job.companyLogoUrl,
    sectorId: job.sectorId,
    postNumber: job.postNumber,
    companyLength: job.companyLength,
    workCountryLocation: job.workCountryLocation,
    workCities: job.workCities,
    jobType: job.jobType,
    companyEmail: job.companyEmail,
    status: job.status,
    tagDto: job.tagDto,
    contractType: job.contractType,
  };
};

export default function usePublishedJobs(page: number = 0, size: number = 5) {
  const [jobs, setJobs] = useState<PublishedJob[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
        const url = `${API_URL}/api/v1/jobs/published?page=${page}&size=${size}`;

        const res = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const rawData = await res.text();
        if (!rawData.trim()) {
          throw new Error("Réponse vide du serveur");
        }

        const data = JSON.parse(rawData) as JobPage;
        const transformedJobs = data.content.map(transformJob);
        setJobs(transformedJobs);
        setTotalPages(data.total_pages);
        setTotalElements(data.total_elements);
      } catch (err: any) {
        console.error("Erreur lors du chargement des offres :", err);
        setError(
          "Impossible de charger les offres. Veuillez réessayer plus tard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, size]);

  return { jobs, totalPages, totalElements, loading, error };
}
