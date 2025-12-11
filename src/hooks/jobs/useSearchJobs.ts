// src/hooks/jobs/useSearchJobs.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

export interface JobSearchParams {
  title?: string;
  location?: string;
  contractType?: string;
  page?: number;
  size?: number;
}

export interface JobSearchResult {
  content: any[]; // à adapter avec ton type Job
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://api-irelis.us-east-2.elasticbeanstalk.com";

export function useSearchJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalJobs, setTotalJobs] = useState(0);

  const searchJobs = useCallback(async (params: JobSearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      if (params.title) searchParams.append('title', params.title);
      if (params.location) searchParams.append('location', params.location);
      if (params.contractType) searchParams.append('contractType', params.contractType);
      searchParams.append('page', String(params.page ?? 0));
      searchParams.append('size', String(params.size ?? 10));

      const url = `${API_BASE_URL}/api/v1/jobs/search?${searchParams.toString()}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Erreur ${res.status}`);
      }

      const data: JobSearchResult = await res.json();
      setJobs(data.content);
      setTotalJobs(data.totalElements);
      return data;
    } catch (err: any) {
      setError(err.message || "Erreur lors de la recherche");
      console.error("Erreur search:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { jobs, loading, error, totalJobs, searchJobs };
}