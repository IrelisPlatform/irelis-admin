// src/hooks/candidate/useMatchingScore.ts
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCandidateProfile } from "@/hooks/candidate/useCandidateProfile";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.trim();

interface MatchingScoreResponse {
  score: number; // entre 0 et 1 (ex: 0.85)
  matched_skills: string[];
}

export interface MatchingResult {
  overallScore: number; // 0–100
  level: 'high' | 'medium' | 'low';
  criteria: Array<{
    name: string;
    score: number;
    weight: number;
    details: string;
  }>;
  recommendation: string;
}

export function useMatchingScore(offerId: string) {
  const { getValidToken } = useAuth();
  const [result, setResult] = useState<MatchingResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useCandidateProfile();

  useEffect(() => {
    const fetchMatching = async () => {
      if (!offerId || !profile?.id) {
        setLoading(false);
        return;
      }

      const token = await getValidToken();
      if (!token) {
        setError("Non authentifié");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/matching/score`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            candidate_id: profile.id,
            offer_id: offerId
          })
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || "Échec du calcul du matching");
        }

        const data: MatchingScoreResponse = await res.json();

        // Backend renvoie score entre 0 et 1 → on le convertit en %
        const scorePercent = Math.min(100, Math.max(0, Math.round(data.score * 100)));
        let level: 'high' | 'medium' | 'low';
        let recommendation: string;

        if (scorePercent >= 75) {
          level = 'high';
          recommendation = "Profil hautement compatible. Nous recommandons fortement de postuler.";
        } else if (scorePercent >= 50) {
          level = 'medium';
          recommendation = "Profil intéressant avec quelques écarts. Une candidature reste pertinente.";
        } else {
          level = 'low';
          recommendation = "Profil partiellement compatible. Certains critères importants ne sont pas remplis.";
        }

        const criteria = [
          {
            name: "Compétences techniques",
            score: scorePercent,
            weight: 100,
            details: `Compétences correspondantes : ${data.matched_skills.length > 0 ? data.matched_skills.join(', ') : 'aucune'}`
          }
        ];

        setResult({ overallScore: scorePercent, level, criteria, recommendation });
      } catch (err: any) {
        setError(err.message);
        console.error("Erreur matching", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatching();
  }, [offerId, profile?.id, getValidToken]);

  return { result, loading, error };
}