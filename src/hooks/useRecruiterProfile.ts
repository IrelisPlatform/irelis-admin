// src/hooks/useRecruiterProfile.ts
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://api-irelis.us-east-2.elasticbeanstalk.com";

// ❗ Adapter au schéma exact du backend (cf. ta spec)
export interface RecruiterProfile {
  sectorId: string;
  sectorName: string;
  firstName: string;
  lastName: string;
  function: string;
  companyName: string;
  companyLogoUrl: string;
  companyEmail: string;
  companyPhone: string;
  companyDescription: string;
  companyWebsite: string;
  companyLinkedInUrl: string;
  companyLength: number;
  country: string;
  region: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

export function useRecruiterProfile() {
  const [profile, setProfile] = useState<RecruiterProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getValidToken } = useAuth();

  // Charger le profil
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getValidToken();
      if (!token) throw new Error("Non authentifié");

      const res = await fetch(`${API_BASE_URL}/api/v1/recruiters/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      } else if (res.status === 404) {
        setError("Profil non trouvé");
      } else {
        throw new Error("Erreur lors du chargement");
      }
    } catch (err: any) {
      setError(err.message || "Erreur réseau");
      console.error("Erreur useRecruiterProfile:", err);
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour le profil (PATCH)
  const updateProfile = async (updatedData: Partial<RecruiterProfile>, file?: File) => {
    try {
      const token = await getValidToken();
      if (!token) throw new Error("Non authentifié");

      const formData = new FormData();
      formData.append("data", JSON.stringify(updatedData));

      if (file) {
        formData.append("file", file);
      }

      const res = await fetch(`${API_BASE_URL}/api/v1/recruiters/profile`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        return data;
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Échec de la mise à jour");
      }
    } catch (err: any) {
      setError(err.message || "Erreur réseau");
      throw err;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, error, refetch: fetchProfile, updateProfile };
}