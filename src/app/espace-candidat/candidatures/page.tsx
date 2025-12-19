// src/app/espace-candidat/candidatures/page.tsx

import { MesCandidatures } from '@/components/candidate/MesCandidatures';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mes candidatures',
  description: 'Suivez vos candidatures envoyées.',
};

export default function CandidaturesPage() {
  return <MesCandidatures />;
}