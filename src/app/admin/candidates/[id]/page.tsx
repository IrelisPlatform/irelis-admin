import { AdminCandidateDetail } from "@/components/admin/AdminCandidateDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Détails du Candidat | Irelis Admin",
  description: "Profil détaillé du candidat",
};

export default async function CandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <AdminCandidateDetail id={resolvedParams.id} />;
}
