// src/hooks/candidate/useCandidateProfile.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import {toast} from "sonner";
import api from "@/services/axiosClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined. Check your .env.local file.");
}

// ========================
// TYPES EXACTS DE LA SWAGGER
// ========================

export interface JobPreference {
  desiredPosition: string;
  contractTypes: string[];
  availability: string;
  pretentionsSalarial: string;
  country: string;
  region: string;
  city: string;
  sectorIds: string[];
  sectors: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  city: string;
  graduationYear: number;
}

export interface Language {
  id: string;
  language: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "FLUENT" | "NATIVE";
}

export interface Experience {
  id: string;
  position: string;
  companyName: string;
  city: string;
  startDate: string; // ISO 8601
  endDate: string | null;
  isCurrent: boolean;
  description: string;
}

export interface CandidateProfile {
  id: string;
  professionalTitle: string;
  firstName: string;
  lastName: string;
  presentation: string;
  email: string;
  phoneNumber: string;
  schoolLevel: string;
  experienceLevel: string;
  avatarUrl: string | null;
  birthDate: string;
  linkedInUrl: string;
  portfolioUrl: string;
  country: string;
  region: string;
  city: string;
  cvUrl: string | null;
  motivationLetterUrl: string | null;
  pitchMail: string;
  skills: Skill[];
  educations: Education[];
  languages: Language[];
  experiences: Experience[];
  createdAt: string;
  updatedAt: string;
  isVisible?: string; // champ local pour la visibilité
  preference?: JobPreference;
}

// ========================
// HOOK PRINCIPAL
// ========================

export function useCandidateProfile() {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("access_token");

  // ------------------------
  // CHARGER LE PROFIL COMPLET
  // ------------------------
    const loadProfile = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.get<CandidateProfile>("/api/v1/profile");
            console.log(res.data);
            setProfile(res.data);
        } catch (err: any) {
            if (err.response?.status === 404) {
                setProfile({
                    id: "",
                    professionalTitle: "",
                    firstName: "",
                    lastName: "",
                    presentation: "",
                    email:"",
                    phoneNumber: "",
                    schoolLevel: "",
                    experienceLevel: "",
                    avatarUrl: null,
                    birthDate: new Date().toISOString(),
                    linkedInUrl: "",
                    portfolioUrl: "",
                    country: "",
                    region: "",
                    city: "",
                    cvUrl: null,
                    motivationLetterUrl: null,
                    pitchMail: "",
                    skills: [],
                    educations: [],
                    languages: [],
                    experiences: [],
                    createdAt: "",
                    updatedAt: ""
                });
            } else if (err.response?.status === 401) {
                setError("Session expirée");
            } else {
                setError("Échec du chargement du profil");
            }
            console.error("Erreur chargement profil", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const saveProfile = async (updates: Partial<CandidateProfile>) => {
        try {
            setLoading(true);
            const res = await api.patch<CandidateProfile>("/api/v1/profile", updates);
            setProfile(res.data);
            return res.data;
        } catch (err: any) {
            console.error("Erreur sauvegarde profil :", err);
            const message = err.response?.data?.message || "Échec de la sauvegarde";
            throw new Error(message);
        }
        finally {
            setLoading(false);
        }
    };


    const saveJobPreferences = async (preferences: {
    desiredPosition: string;
    contractTypes: string[];
    availability: string;
    pretentionsSalarial: string;
    country: string;
    region: string;
    city: string;
    sectorIds: string[];
    sectors: string[];
  }) => {

    const res = await fetch(`${API_BASE_URL}/api/v1/job-preferences`, {
      method: "POST",
     credentials:"include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      body: JSON.stringify(preferences)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Échec de la sauvegarde des préférences");
    }

    return res.json();
  };

  // ------------------------
  // BASCULER VISIBILITÉ
  // ------------------------
  const toggleVisibility = async () => {

    const res = await fetch(`${API_BASE_URL}/api/v1/profile/visibility`, {
      method: "PATCH",
      credentials:"include",
        headers: {
          Authorization: `Bearer ${token}`,
        }
    });

    if (!res.ok) {
      throw new Error("Échec du changement de visibilité");
    }

    const isVisible = await res.json(); // boolean
    if (profile) {
      setProfile({ ...profile, isVisible: isVisible ? "true" : "false" as any });
    }
  };

  // ------------------------
  // UPLOAD CV
  // ------------------------
  const uploadCV = async (file: File) => {

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData.get('file'));

    const res = await fetch(`${API_BASE_URL}/api/v1/cv`, {
      method: "POST",
      credentials: "include",
        headers:{
          Authorization: `Bearer ${token}`,
        },
      body: formData
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Échec upload CV");
    }

    toast.success("Cv uploade avec succes");

    const data = await res.json();
    if (profile) {
      setProfile({ ...profile, cvUrl: data.cvUrl });
    }
    return data.cvUrl;
  };


  const deleteCV = async () => {

    const res = await fetch(`${API_BASE_URL}/api/v1/cv`, {
      method: "DELETE",
      credentials:"include",
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
      throw new Error("Échec de la suppression du CV");
    }

    if (profile) {
      setProfile({ ...profile, cvUrl: null });
    }

  };

  // ------------------------
  // UPLOAD LETTRE + PITCH
  // ------------------------
  const saveLetterAndPitch = async (file: File | null, pitchMail: string) => {
    const url = `${API_BASE_URL}/api/v1/letters?pitchMail=${encodeURIComponent(
      pitchMail || ""
    )}`;

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    const res = await fetch(url, {
      method: "POST",
     credentials: "include",
        headers:{
            Authorization: `Bearer ${token}`,
        },
      body: formData
    });
 
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.message || "Échec sauvegarde lettre");
    }

    // Mise à jour du store local
    if (profile) {
      setProfile({
        ...profile,
        motivationLetterUrl: data.motivationLetterUrl,
        pitchMail: data.pitchMail,
      });
    }
 
    return data;
  };
 

  const deleteLetter = async () => {

    const res = await fetch(`${API_BASE_URL}/api/v1/letters`, {
      method: "DELETE",
     credentials: "include",
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
      throw new Error("Échec de la suppression de la lettre");
    }

    if (profile) {
      setProfile({ ...profile, motivationLetterUrl: null });
    }
  };

  // ------------------------
  // SUPPRESSIONS GRANULAIRES
  // ------------------------

  const deleteSkill = async (skillId: string) => {

    const res = await fetch(`${API_BASE_URL}/api/v1/skills/${skillId}`, {
      method: "DELETE",
     credentials:"include",
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Échec de la suppression de la compétence");
    loadProfile();
  };

  // const deleteExperience = async (experienceId: string) => {
  //   const token = await getValidToken();
  //   if (!token) throw new Error("Non authentifié");
  //   const res = await fetch(`${API_BASE_URL}/api/v1/experiences/${experienceId}`, {
  //     method: "DELETE",
  //     headers: { Authorization: `Bearer ${token}` }
  //   });
  //   if (!res.ok) throw new Error("Échec de la suppression de l'expérience");
  //   loadProfile();
  // };

  // const deleteEducation = async (educationId: string) => {
  //   const token = await getValidToken();
  //   if (!token) throw new Error("Non authentifié");
  //   const res = await fetch(`${API_BASE_URL}/api/v1/educations/${educationId}`, {
  //     method: "DELETE",
  //     headers: { Authorization: `Bearer ${token}` }
  //   });
  //   if (!res.ok) throw new Error("Échec de la suppression de la formation");
  //   loadProfile();
  // };
  //
  // const deleteLanguage = async (languageId: string) => {
  //   const token = await getValidToken();
  //   if (!token) throw new Error("Non authentifié");
  //   const res = await fetch(`${API_BASE_URL}/api/v1/languages/${languageId}`, {
  //     method: "DELETE",
  //     headers: { Authorization: `Bearer ${token}` }
  //   });
  //   if (!res.ok) throw new Error("Échec de la suppression de la langue");
  //   loadProfile();
  // };

  // ------------------------
  // INITIALISATION
  // ------------------------
  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    loadProfile,
    saveProfile,
    uploadCV,
    deleteCV,
    saveLetterAndPitch,
    deleteLetter,
    toggleVisibility,
    deleteSkill,
    // deleteExperience,
    // deleteEducation,
    // deleteLanguage,
    saveJobPreferences
  };
}