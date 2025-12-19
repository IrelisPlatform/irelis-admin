// src/hooks/useSectors.ts
// BUT : Charger la liste des secteurs depuis le backend
// POURQUOI : Centralise l’appel via apiRequest, évite la duplication de la logique réseau

'use client';

import { useState, useEffect } from 'react';


import { apiRequest } from '@/lib/api/client';

export interface Sector {
  id: string;
  name: string;
}

export default function useSectors() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSectors = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiRequest<Sector[]>('/api/v1/sectors');
        setSectors(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erreur inconnue';
        setError('Impossible de charger les secteurs.');
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  return { sectors, loading, error };
}