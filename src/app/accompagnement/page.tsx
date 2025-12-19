// src/app/accompagnement/page.tsx

import { AccompagnePage } from '@/components/accompagnement/AccompagnePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accompagnement',
  description: 'Accompagnement carrière personnalisé avec Irelis.',
};

export default function AccompagnementPage() {
  return <AccompagnePage />;
}