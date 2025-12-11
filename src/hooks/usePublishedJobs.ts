// src/hooks/usePublishedJobs.ts
'use client';

import { useState, useEffect } from 'react';

export interface Job {
  id: string;
  title: string;
  description: string;
  workCityLocation: string;
  workCountryLocation: string;
  contractType: string;
  salary: string;
  publishedAt: string;
  isUrgent: boolean;
  isFeatured: boolean;
  tagDto: Array<{ name: string; type: string }>;
}

interface JobPage {
  content: Job[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  first: boolean;
  last: boolean;
}

export default function usePublishedJobs(page: number = 0, size: number = 10) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total_Pages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL?.trim() || 'http://api-irelis.us-east-2.elasticbeanstalk.com';
        const url = `${API_URL}/api/v1/jobs/published?page=${page}&size=${size}`;
        
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        
        const  JobPage = await res.json();
        setJobs(data.content);
        setTotalPages(data.total_pages);
      } catch (err: any) {
        console.error('Erreur chargement jobs:', err);
        setError('Impossible de charger les offres.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, size]);

  return { jobs, totalPages, loading, error };
}