import { Card, CardContent } from "@/components/ui/card";
import { EnhancedStatCard } from "@/components/ui/EnhancedStatCard";
import { Briefcase, Users, Eye, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon?: React.ReactNode;
  trend: "up" | "down";
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight mt-2">{value}</p>
            <p className={`text-sm mt-2 font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {change}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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