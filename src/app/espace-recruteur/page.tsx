// src/app/espace-recruteur/page.tsx

import { RecruiterProfileGuard } from "@/components/recruiter/RecruiterProfileGuard";
import { RecruiterSpace } from "@/components/recruiter/RecruiterSpace";
import { Suspense } from "react";

// Liste des tabs autorisés
const allowedTabs = [
  'dashboard', 'jobs', 'sourcing', 'analytics', 'team', 'templates',
  'solutions', 'offres', 'guides', 'cvtheque', 'contact', 'settings',
  'subscriptions', 'modeles-annonces', 'tri-scoring', 'questions-entretien',
  'multidiffusion', 'integration-ats', 'email-templates', 'support',
  'profil-entreprise'
];

export default function EspaceRecruteurPage({ searchParams }: { searchParams: { tab?: string } }) {
  // Récupère le tab depuis l'URL, avec fallback
  const tabFromUrl = searchParams.tab || 'dashboard';
  const initialTab = allowedTabs.includes(tabFromUrl) ? tabFromUrl : 'dashboard';

  // Redirige vers l'accueil public si "accueil" est demandé
  const handleTabChange = (tab: string) => {
    if (tab === "accueil") {
      window.location.href = "/";
    }
  };

  return (
    <RecruiterProfileGuard>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
        <RecruiterSpace 
          initialTab={initialTab}
          onTabChange={handleTabChange}
        />
      </Suspense>
    </RecruiterProfileGuard>
  );
}