// src/app/espace-candidat/parametres/page.tsx

import { ParametresCandidat } from '@/components/candidate/ParametresCandidat';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paramètres',
  description: 'Gérez vos préférences, confidentialité et sécurité.',
};

export default function ParametresPage() {
  return <ParametresCandidat />;
}