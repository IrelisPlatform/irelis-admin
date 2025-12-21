// src/components/recruiter/StatsCards.tsx

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { EnhancedStatCard } from "@/components/recruiter/EnhancedStatCard";
import { Briefcase, Users, Eye, TrendingUp } from "lucide-react";

// Note : StatCard interne supprimé (non utilisé)

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <EnhancedStatCard
        title="Offres actives"
        value="42"
        change="+18% ce mois"
        trend="up"
        icon={Briefcase}
      />
      <EnhancedStatCard
        title="Candidatures reçues"
        value="429"
        change="+27% ce mois"
        trend="up"
        icon={Users}
      />
      <EnhancedStatCard
        title="Vues totales"
        value="15,234"
        change="+12% ce mois"
        trend="up"
        icon={Eye}
      />
      <EnhancedStatCard
        title="Taux de conversion"
        value="6.5%"
        change="+0.8% ce mois"
        trend="up"
        icon={TrendingUp}
      />
    </div>
  );
}