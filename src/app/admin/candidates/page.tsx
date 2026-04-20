import { AdminCandidates } from "@/components/admin/AdminCandidates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Candidats | Irelis Admin",
  description: "Gestion de la base de candidats",
};

export default function CandidatesPage() {
  return <AdminCandidates />;
}
