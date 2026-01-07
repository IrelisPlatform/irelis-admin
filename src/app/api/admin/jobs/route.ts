// src/app/api/admin/jobs/route.ts

import { NextRequest, NextResponse } from "next/server";

import { BackendPublishedJob, PublishedJob, JobPage } from "@/types/job";

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

const transformJob = (job: BackendPublishedJob): PublishedJob => {
  const now = new Date();
  const publishedAt = job.publishedAt ? new Date(job.publishedAt) : null;
  const isNew = publishedAt
    ? (now.getTime() - publishedAt.getTime()) / (1000 * 3600 * 24) <= 7
    : false;

  return {
    id: job.id,
    title: job.title,
    offerDescription: job.description,
    companyName: job.companyName || "Entreprise confidentielle",
    companyDescription: job.companyDescription,
    location: `${job.workCityLocation}, ${job.workCountryLocation}`,
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
    tags: job.tagDto?.map((t) => t.name) || [],
    responsibilities: parseListFromString(job.responsibilities),
    qualifications: parseListFromString(job.requirements),
    benefits: parseListFromString(job.benefits),
    requiredDocuments: job.requiredDocuments,
    companyLogoUrl: job.companyLogoUrl,
    sectorId: job.sectorId,
    postNumber: job.postNumber,
    companyLength: job.companyLength,
    workCountryLocation: job.workCountryLocation,
    workCityLocation: job.workCityLocation,
    jobType: job.jobType,
    companyEmail: job.companyEmail,
    status: job.status,
    tagDto: job.tagDto,
    contractType: job.contractType,
  };
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("search") || "";
    const statusFilter = searchParams.get("status") || "all";
    const typeFilter = searchParams.get("type") || "all";

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!API_URL) {
      return NextResponse.json(
        { error: "Backend URL not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${API_URL}/api/v1/jobs/published?page=0&size=5`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: response.statusText ?? "Falide to fetch jobs" },
        { status: response.status }
      );
    }

    const rawData = await response.text();
    if (!rawData.trim()) {
      throw new Error("Réponse vide du serveur");
    }

    const data = JSON.parse(rawData) as JobPage;
    console.log(data);
    let filteredJobs = data.content;

    // Apply filters
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.workCityLocation.toLowerCase().includes(searchLower) ||
          job.companyName.toLowerCase().includes(searchLower)
      );
    }

    if (statusFilter !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.status === statusFilter);
    }

    if (typeFilter !== "all") {
      filteredJobs = filteredJobs.filter(
        (job) => job.contractType === typeFilter
      );
    }

    const transformedJobs = filteredJobs.map(transformJob);

    return NextResponse.json({
      content: transformedJobs,
      page: data.page,
      size: data.size,
      total_elements: transformedJobs.length,
      total_pages: Math.ceil(transformedJobs.length / data.size),
      first: data.first,
      last: data.last,
    });
  } catch (error: any) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
