
import { CandidateProfileGuard } from "@/components/candidate/CandidateProfileGuard";
import { ProfilCandidat } from "@/components/candidate/ProfilCandidat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon profil candidat",
  description: "Gérez et complétez votre profil candidat.",
};

export default function ProfilePage() {
  return (
    <CandidateProfileGuard>
      <ProfilCandidat />
    </CandidateProfileGuard>
  );
}