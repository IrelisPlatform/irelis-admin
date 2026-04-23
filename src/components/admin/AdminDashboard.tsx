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
  LayoutDashboard,
  GraduationCap,
  Target,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  Area,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/axiosClient";
import Cookies from "js-cookie";
import { JobPage } from "@/types/job";
import { AccompanimentPage } from "@/types/accompaniment";
import { Category } from "@/types/category";
import { formatDateRelative } from "@/services/date";
import { getStatusBadge } from "@/lib/jobs/job-helpers";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { CreateJobDialog } from "./CreateJobDialog";
import { useDashboardStats } from "@/hooks/dashboard/useDashboard";
import usePublishedJobs from "@/hooks/usePublishedJobs";

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
  trend2?: {
    value: string;
    isUp: boolean;
  };
  iconColor: string;
  iconBg: string;
  bottomBarColor: string;
}

// --- Components ---

const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trend2,
  iconColor,
  iconBg,
  bottomBarColor,
}: StatsCardProps) => (
  <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative">
    <CardContent className="px-4 pt-4 pb-3 lg:px-5 lg:pt-5 lg:pb-3 flex-1 flex flex-col">
      <div className="flex items-start justify-between space-x-2">
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h2 className="text-2xl font-bold tracking-tight">{value}</h2>
        </div>
        <div className={`p-2.5 rounded-xl ${iconBg} shrink-0`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      <div className="mt-auto pt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{description}</span>
        {(trend || trend2) && (
          <div className="absolute right-4 bottom-3 lg:right-5 flex flex-col items-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            {trend && (
              <span
                className={`inline-flex items-center font-bold px-1.5 py-0.5 rounded backdrop-blur-md bg-white/90 shadow-sm border border-black/5 dark:bg-card/90 dark:border-white/10 ${trend.isUp ? "text-green-600" : "text-red-600"}`}
              >
                {trend.isUp ? (
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                )}
                {trend.value}
              </span>
            )}
            {trend2 && (
              <span
                className={`inline-flex items-center font-bold px-1.5 py-0.5 rounded backdrop-blur-md bg-white/90 shadow-sm border border-black/5 dark:bg-card/90 dark:border-white/10 ${trend2.isUp ? "text-green-600" : "text-red-600"}`}
              >
                {trend2.isUp ? (
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                )}
                {trend2.value}
              </span>
            )}
          </div>
        )}
      </div>
    </CardContent>
    <div className={`h-1.5 w-full ${bottomBarColor}`} />
  </Card>
);

export function AdminDashboard() {
  const token = Cookies.get("access_token");

  // Fetch Jobs Stats (Keep for recent jobs)
  const { data: jobsData, isLoading: isLoadingJobs } = useQuery({
    queryKey: ["admin-jobs-stats"],
    queryFn: async () => {
      const response = await api.get<JobPage>("/admin/jobs?page=0&size=5", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });

  // Fetch Accompaniments Stats (Keep for now if needed, but we'll use stats)
  const { data: accData, isLoading: isLoadingAcc } = useQuery({
    queryKey: ["admin-acc-stats"],
    queryFn: async () => {
      const response = await api.get<AccompanimentPage>(
        "/api/v1/accompaniments?page=0&size=5",
      );
      return response.data;
    },
  });

  // Fetch Global Stats
  const { data: statsData, isLoading: isLoadingStats } = useDashboardStats();

  if (isLoadingJobs || isLoadingAcc || isLoadingStats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-8 h-8" />
        <span className="ml-3 text-muted-foreground">
          Chargement du tableau de bord...
        </span>
      </div>
    );
  }

  const jobStatusLabels: Record<string, string> = {
    PUBLISHED: "Publiée",
  };

  const getJobStatusLabel = (field: string) =>
    jobStatusLabels[field] || field;

  const statusColors: Record<string, string> = {
    PENDING: "#f59e0b",
    REVIEWED: "#3b82f6",
    ACCEPTED: "#10b981",
    REJECTED: "#ef4444",
    WITHDRAWN: "#6b7280",
  };

  const statusLabels: Record<string, string> = {
    PENDING: "En attente",
    REVIEWED: "En revue",
    ACCEPTED: "Acceptées",
    REJECTED: "Refusées",
    WITHDRAWN: "Retirées",
  };

  const applicationsChartData = statsData?.applicationsByStatus
    ? Object.entries(statsData.applicationsByStatus).map(([status, count]) => ({
        name: statusLabels[status] || status,
        value: count,
        color: statusColors[status] || "#cbd5e1",
      }))
    : [];

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
          title="Utilisateurs"
          value={statsData?.totalUsers || 0}
          description="Utilisateurs inscrits"
          icon={Users}
          trend={{
            value: `+${statsData?.newUsersToday || 0} aujourd'hui`,
            isUp: true,
          }}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          bottomBarColor="bg-indigo-600"
        />
        <StatsCard
          title="Candidats"
          value={statsData?.totalCandidates || 0}
          description="Candidats qualifiés"
          icon={GraduationCap}
          trend={{
            value: `+${statsData?.newCandidatesLastMonth || 0} ce dernier mois`,
            isUp: true,
          }}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          bottomBarColor="bg-emerald-600"
        />
        <StatsCard
          title="Recruteurs"
          value={statsData?.totalRecruiters || 0}
          description="Entreprises partenaires"
          icon={Handshake}
          trend={{
            value: `+${statsData?.newRecruitersLastMonth || 0} ce dernier mois`,
            isUp: true,
          }}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          bottomBarColor="bg-amber-600"
        />
        <StatsCard
          title="Offres d'emploi"
          value={statsData?.totalJobOffers || 0}
          description="Offres publiées"
          icon={Briefcase}
          trend={{
            value: `+${statsData?.newJobOffersToday || 0} aujourd'hui`,
            isUp: true,
          }}
          trend2={{
            value: `+${statsData?.newJobOffersLastMonth || 0} ce dernier mois`,
            isUp: true,
          }}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          bottomBarColor="bg-blue-600"
        />
        <StatsCard
          title="Candidatures"
          value={statsData?.totalApplications || 0}
          description="Soumissions totales"
          icon={FileText}
          trend={{
            value: `+${statsData?.newApplicationsToday || 0} aujourd'hui`,
            isUp: true,
          }}
          trend2={{
            value: `+${statsData?.newApplicationsLastMonth || 0} ce dernier mois`,
            isUp: true,
          }}
          iconColor="text-cyan-600"
          iconBg="bg-cyan-50"
          bottomBarColor="bg-cyan-600"
        />
        <StatsCard
          title="Vues Offres"
          value={statsData?.totalViews || 0}
          description="Vues cumulées ce mois"
          icon={TrendingUp}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
          bottomBarColor="bg-orange-600"
        />
        <StatsCard
          title="Conversion Moy."
          value={`${((statsData?.averageConversionRate || 0) / 100).toFixed(2)} %`}
          description="Taux de candidature"
          icon={Target}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          bottomBarColor="bg-purple-600"
        />
        <StatsCard
          title="Délai Traitement"
          value={`${(statsData?.averageProcessingTimeDays || 0).toFixed(1)} j`}
          description="Durée moyenne d'embauche"
          icon={Clock}
          iconColor="text-rose-600"
          iconBg="bg-rose-50"
          bottomBarColor="bg-rose-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        {/*<Card className="lg:col-span-2 border-none shadow-md">*/}
        {/*  <CardHeader>*/}
        {/*    <CardTitle className="text-xl">Activité de la semaine</CardTitle>*/}
        {/*    <CardDescription>*/}
        {/*      Évolution des publications d'offres et de services*/}
        {/*    </CardDescription>*/}
        {/*  </CardHeader>*/}
        {/*  /!*<CardContent>*!/*/}
        {/*  /!*  <div className="h-[300px] w-full">*!/*/}
        {/*  /!*    <ResponsiveContainer width="100%" height="100%">*!/*/}
        {/*  /!*      <AreaChart data={activityData}>*!/*/}
        {/*  /!*        <defs>*!/*/}
        {/*  /!*          <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">*!/*/}
        {/*  /!*            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />*!/*/}
        {/*  /!*            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />*!/*/}
        {/*  /!*          </linearGradient>*!/*/}
        {/*  /!*        </defs>*!/*/}
        {/*  /!*        <CartesianGrid strokeDasharray="3 3" vertical={false} />*!/*/}
        {/*  /!*        <XAxis dataKey="name" axisLine={false} tickLine={false} />*!/*/}
        {/*  /!*        <YAxis axisLine={false} tickLine={false} />*!/*/}
        {/*  /!*        <Tooltip />*!/*/}
        {/*  /!*        <Legend />*!/*/}
        {/*  /!*        <Area*!/*/}
        {/*  /!*          type="monotone"*!/*/}
        {/*  /!*          dataKey="jobs"*!/*/}
        {/*  /!*          stroke="#3b82f6"*!/*/}
        {/*  /!*          strokeWidth={3}*!/*/}
        {/*  /!*          fillOpacity={1}*!/*/}
        {/*  /!*          fill="url(#colorJobs)"*!/*/}
        {/*  /!*          name="Offres d'emploi"*!/*/}
        {/*  /!*        />*!/*/}
        {/*  /!*        <Area*!/*/}
        {/*  /!*          type="monotone"*!/*/}
        {/*  /!*          dataKey="acc"*!/*/}
        {/*  /!*          stroke="#10b981"*!/*/}
        {/*  /!*          strokeWidth={3}*!/*/}
        {/*  /!*          fillOpacity={0}*!/*/}
        {/*  /!*          name="Services"*!/*/}
        {/*  /!*        />*!/*/}
        {/*  /!*      </AreaChart>*!/*/}
        {/*  /!*    </ResponsiveContainer>*!/*/}
        {/*  /!*  </div>*!/*/}
        {/*  /!*</CardContent>*!/*/}
        {/*</Card>*/}

        {/* Status Distribution */}

      </div>

      <div className="space-y-8">
        {/* ROW 1: Top Offers Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Offers By Applications */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">
                Top Offres (Candidatures)
              </CardTitle>
              <CardDescription>
                Offres attirant le plus de postulants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!statsData?.topOffersByApplications ||
                statsData.topOffersByApplications.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    Aucune donnée
                  </p>
                ) : (
                  statsData.topOffersByApplications.map((offer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border max-w-full"
                    >
                      <div className="flex items-center space-x-4 max-w-[60%]">
                        <div className="shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="truncate">
                          <p className="font-medium  truncate">
                            {offer.jobTitle}
                          </p>
                          <p className="font-bold text-sm truncate">
                            {offer.companyName}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-bold text-emerald-600">
                          {offer.applicationCount}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          candidatures
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Top Offers By Views */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Top Offres (Vues)</CardTitle>
              <CardDescription>Offres les plus consultées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!statsData?.topOffersByViews ||
                statsData.topOffersByViews.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    Aucune donnée
                  </p>
                ) : (
                  statsData.topOffersByViews.map((offer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border max-w-full"
                    >
                      <div className="flex items-center space-x-4 max-w-[60%]">
                        <div className="shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Eye className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="truncate">
                          <p className="font-medium truncate">
                            {offer.jobTitle}
                          </p>
                          <p className="font-bold text-sm truncate">
                            {offer.companyName}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-bold text-orange-600">
                          {offer.viewCount}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          vues
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {statsData?.applicationsPerJobRatio !== undefined && (
                <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    Ratio global (Candidature / Offre) :
                  </span>
                  <span className="font-bold text-blue-600">
                    {statsData.applicationsPerJobRatio.toFixed(2)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
          {/*<Card className="border-none shadow-md">*/}
          {/*  <CardHeader>*/}
          {/*    <CardTitle className="text-xl">État des candidatures</CardTitle>*/}
          {/*    <CardDescription>Répartition par statut global</CardDescription>*/}
          {/*  </CardHeader>*/}
          {/*  <CardContent>*/}
          {/*    {applicationsChartData.length > 0 ? (*/}
          {/*        <>*/}
          {/*          <div className="h-[250px] w-full">*/}
          {/*            <ResponsiveContainer width="100%" height="100%">*/}
          {/*              <PieChart>*/}
          {/*                <Pie*/}
          {/*                    data={applicationsChartData}*/}
          {/*                    cx="50%"*/}
          {/*                    cy="50%"*/}
          {/*                    innerRadius={60}*/}
          {/*                    outerRadius={80}*/}
          {/*                    paddingAngle={5}*/}
          {/*                    dataKey="value"*/}
          {/*                >*/}
          {/*                  {applicationsChartData.map((entry, index) => (*/}
          {/*                      <Cell key={`cell-${index}`} fill={entry.color} />*/}
          {/*                  ))}*/}
          {/*                </Pie>*/}
          {/*                <Tooltip />*/}
          {/*                <Legend />*/}
          {/*              </PieChart>*/}
          {/*            </ResponsiveContainer>*/}
          {/*          </div>*/}
          {/*          <div className="mt-4 space-y-2">*/}
          {/*            {applicationsChartData.map((item) => (*/}
          {/*                <div*/}
          {/*                    key={item.name}*/}
          {/*                    className="flex items-center justify-between text-sm"*/}
          {/*                >*/}
          {/*                  <div className="flex items-center">*/}
          {/*                    <div*/}
          {/*                        className="w-3 h-3 rounded-full mr-2"*/}
          {/*                        style={{ backgroundColor: item.color }}*/}
          {/*                    />*/}
          {/*                    <span className="text-muted-foreground">*/}
          {/*                {item.name}*/}
          {/*              </span>*/}
          {/*                  </div>*/}
          {/*                  <span className="font-semibold">{item.value}</span>*/}
          {/*                </div>*/}
          {/*            ))}*/}
          {/*          </div>*/}
          {/*        </>*/}
          {/*    ) : (*/}
          {/*        <div className="flex items-center justify-center h-[300px] text-muted-foreground">*/}
          {/*          Aucune donnée*/}
          {/*        </div>*/}
          {/*    )}*/}
          {/*  </CardContent>*/}
          {/*</Card>*/}
        </div>

        {/* ROW 2: Recent Jobs */}
        <div className="gap-8">
          <Card className="border-none shadow-md flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Offres récentes</CardTitle>
                <CardDescription>Dernières publications</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin">Tout voir</Link>
              </Button>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                {jobsData?.content.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    Aucune offre récente
                  </p>
                ) : (
                  jobsData?.content.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="truncate">
                          <p className="font-medium text-sm line-clamp-1">
                            {job.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {job.companyName} • {job.workCountryLocation}
                          </p>
                        </div>
                      </div>
                      <div className="hidden lg:block text-right">
                        {getStatusBadge(job.status)}
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {job.publishedAt
                            ? formatDateRelative(job.publishedAt)
                            : "—"}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
          {/* Right column placeholder, leaving it empty on large screens to keep "Offres recentes" at left. */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </div>
  );
}
