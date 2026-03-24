// src/components/admin/AdminDashboard.tsx

"use client";

import React from "react";
import { 
  Users, 
  Briefcase, 
  Handshake, 
  Layers, 
  TrendingUp, 
  Clock, 
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  LayoutDashboard
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  AreaChart,
  Area
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/axiosClient";
import Cookies from "js-cookie";
import { JobPage, PublishedJob } from "@/types/job";
import { AccompanimentPage } from "@/types/accompaniment";
import { Category } from "@/types/category";
import { formatDateRelative } from "@/services/date";
import { getStatusBadge, getContractTypeLabel } from "@/lib/jobs/job-helpers";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { CreateJobDialog } from "./CreateJobDialog";

// --- Types ---

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  trend?: {
    value: string;
    isUp: boolean;
  };
  color: string;
  bgColor: string;
}

// --- Components ---

const StatsCard = ({ title, value, description, icon: Icon, trend, color, bgColor }: StatsCardProps) => (
  <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
    <CardContent className="p-6">
      <div className="flex items-center justify-between space-x-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
            {trend && (
              <span className={`inline-flex items-center text-xs font-medium ${trend.isUp ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {trend.value}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className={`p-3 rounded-2xl ${bgColor}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </CardContent>
    <div className={`h-1.5 w-full ${color.replace('text-', 'bg-')}`} />
  </Card>
);

export function AdminDashboard() {
  const token = Cookies.get("access_token");

  // Fetch Jobs Stats
  const { data: jobsData, isLoading: isLoadingJobs } = useQuery({
    queryKey: ["admin-jobs-stats"],
    queryFn: async () => {
      const response = await api.get<JobPage>("/admin/jobs?page=0&size=5", {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    }
  });

  // Fetch Accompaniments Stats
  const { data: accData, isLoading: isLoadingAcc } = useQuery({
    queryKey: ["admin-acc-stats"],
    queryFn: async () => {
      const response = await api.get<AccompanimentPage>("/api/v1/accompaniments?page=0&size=5");
      return response.data;
    }
  });

  // Fetch Categories
  const { data: categories, isLoading: isLoadingCat } = useQuery({
    queryKey: ["admin-categories-stats"],
    queryFn: async () => {
      const response = await api.get<Category[]>("/api/v1/categories");
      return response.data;
    }
  });

  if (isLoadingJobs || isLoadingAcc || isLoadingCat) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-8 h-8" />
        <span className="ml-3 text-muted-foreground">Chargement du tableau de bord...</span>
      </div>
    );
  }

  const totalJobs = jobsData?.total_elements || 0;
  const totalAcc = accData?.total_elements || 0;
  const totalCat = categories?.length || 0;

  // Mock data for distribution (Real data would need an analytics endpoint)
  const jobStatusDistribution = [
    { name: "Publiées", value: Math.floor(totalJobs * 0.7), color: "#10b981" },
    { name: "Brouillons", value: Math.floor(totalJobs * 0.2), color: "#f59e0b" },
    { name: "Expirées", value: Math.ceil(totalJobs * 0.1), color: "#ef4444" },
  ];

  const jobsByCategory = categories?.slice(0, 5).map(cat => ({
    name: cat.name,
    count: Math.floor(Math.random() * 20) + 5 // Mock count per category
  })) || [];

  const activityData = [
    { name: "Lun", jobs: 4, acc: 2 },
    { name: "Mar", jobs: 7, acc: 3 },
    { name: "Mer", jobs: 5, acc: 6 },
    { name: "Jeu", jobs: 12, acc: 4 },
    { name: "Ven", jobs: 8, acc: 2 },
    { name: "Sam", jobs: 3, acc: 1 },
    { name: "Dim", jobs: 5, acc: 3 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1e3a8a] flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8" />
            Tableau de Bord
          </h1>
          <p className="text-muted-foreground">
            Bienvenue dans votre espace d'administration Irelis.
          </p>
        </div>
        <div className="flex gap-2">
          <CreateJobDialog>
            <Button className="bg-[#1e3a8a] hover:bg-[#1e40af]">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle offre
            </Button>
          </CreateJobDialog>
          <Button variant="outline" asChild>
            <Link href="/admin/accompagnement">
              <Handshake className="w-4 h-4 mr-2" />
              Gérer services
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Offres d'emploi" 
          value={totalJobs} 
          description="Total des offres créées"
          icon={Briefcase}
          trend={{ value: "+12%", isUp: true }}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatsCard 
          title="Services d'Accomp." 
          value={totalAcc} 
          description="Services disponibles"
          icon={Handshake}
          trend={{ value: "+5%", isUp: true }}
          color="text-emerald-600"
          bgColor="bg-emerald-50"
        />
        <StatsCard 
          title="Catégories" 
          value={totalCat} 
          description="Secteurs d'activité"
          icon={Layers}
          color="text-purple-600"
          bgColor="bg-purple-50"
        />
        <StatsCard 
          title="Vues Totales" 
          value="1.2K" 
          description="Vues cumulées ce mois"
          icon={TrendingUp}
          trend={{ value: "+18%", isUp: true }}
          color="text-orange-600"
          bgColor="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Activité de la semaine</CardTitle>
            <CardDescription>Évolution des publications d'offres et de services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="jobs" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorJobs)" 
                    name="Offres d'emploi"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="acc" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={0} 
                    name="Services"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Statut des offres</CardTitle>
            <CardDescription>Répartition par état de publication</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jobStatusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {jobStatusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {jobStatusDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Jobs */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Offres récentes</CardTitle>
              <CardDescription>Les 5 dernières offres publiées</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin">Voir tout</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobsData?.content.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">Aucune offre récente</p>
              ) : (
                jobsData?.content.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm line-clamp-1">{job.title}</p>
                        <p className="text-xs text-muted-foreground">{job.companyName} • {job.workCountryLocation}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(job.status)}
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {job.publishedAt ? formatDateRelative(job.publishedAt) : "—"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sectors Distribution */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Secteurs dynamiques</CardTitle>
            <CardDescription>Top secteurs par volume d'offres</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobsByCategory} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    width={100} 
                    fontSize={12}
                  />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
