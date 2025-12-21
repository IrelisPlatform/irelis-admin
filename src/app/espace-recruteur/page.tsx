// src/app/espace-recruteur/page.tsx

"use client"

import { RecruiterProfileGuard } from "@/components/recruiter/RecruiterProfileGuard";
import { RecruiterSpace } from "@/components/recruiter/RecruiterSpace";
import { Suspense } from "react";
import {useSearchParams} from "next/navigation";

// Liste des tabs autorisés
const allowedTabs = [
  'dashboard', 'jobs', 'sourcing', 'analytics', 'team', 'templates',
  'solutions', 'offres', 'guides', 'cvtheque', 'contact', 'settings',
  'subscriptions', 'modeles-annonces', 'tri-scoring', 'questions-entretien',
  'multidiffusion', 'integration-ats', 'email-templates', 'support',
  'profil-entreprise'
];

export default function EspaceRecruteurPageClient() {
    const searchParams = useSearchParams();
    const tabFromUrl = searchParams.get("tab") || "dashboard";
    const initialTab = allowedTabs.includes(tabFromUrl) ? tabFromUrl : "dashboard";

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