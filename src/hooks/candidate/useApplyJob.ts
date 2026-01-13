"use client";

import { useCallback, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL?.trim();

export function useApplyJob(offerId?: string | null) {
  const { getValidToken } = useAuth();
  const [isApplying, setIsApplying] = useState(false);

  const apply = useCallback(
    async (overrideOfferId?: string) => {
      const targetId = overrideOfferId ?? offerId;
      if (!targetId) {
        throw new Error("Offre invalide.");
      }

      const token = await getValidToken();
      if (!token) {
        throw new Error("Non authentifié");
      }

      setIsApplying(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/applications`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            offerId: targetId,
            withProfile: true,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Échec de la candidature");
        }
      } finally {
        setIsApplying(false);
      }
    },
    [getValidToken, offerId]
  );

  return { apply, isApplying };
}
