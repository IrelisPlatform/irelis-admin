// src/app/admin/dashboard/page.tsx

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tableau de Bord | Irelis Admin",
  description: "Vue d'ensemble de la plateforme Irelis",
};

export default function DashboardPage() {
  return <AdminDashboard />;
}
