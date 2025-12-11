// src/app/espace-candidat/messages/page.tsx

import { CandidateMessaging } from '@/components/candidate/CandidateMessaging';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mes messages',
  description: 'Échangez avec les recruteurs intéressés par votre profil.',
};

export default function MessagesPage() {
  return <CandidateMessaging />;
}