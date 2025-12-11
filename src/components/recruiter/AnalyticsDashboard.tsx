// src/components/recruiter/AnalyticsDashboard.tsx

"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Users,
  Target,
  Clock,
  Wallet,
  TrendingUp,
  TrendingDown,
  Briefcase,
  Calendar,
  Download,
  BarChart3,
  Activity,
  MapPin,
  Zap,
  AlertCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
} from "recharts";

// 🔧 Gestion dynamique des libs lourdes
let jsPDF: any = null;
let html2canvas: any = null;
let logger: any = null;

// Fallback pour le logger
function loggerError(message: string, data?: any) {
  console.error(`[AnalyticsDashboard] ${message}`, data);
}

export function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-7-months");
  const [selectedMetric, setSelectedMetric] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [isExporting, setIsExporting] = useState(false);

  // Chargement dynamique des libs lourdes
  useEffect(() => {
    const loadLibs = async () => {
      try {
        const [jspdfMod, html2canvasMod] = await Promise.all([
          import("jspdf"),
          import("html2canvas"),
        ]);
        jsPDF = jspdfMod.jsPDF || jspdfMod.default;
        html2canvas = html2canvasMod.default || html2canvasMod;
      } catch (error) {
        console.error("Erreur chargement libs PDF", error);
      }
    };
    loadLibs();
  }, []);

  const handleExportPDF = async () => {
    if (!jsPDF) {
      console.warn("jsPDF non chargé");
      return;
    }

    setIsExporting(true);
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.toast?.info?.("Génération du PDF en cours...");
    }

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const currentDate = new Date().toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const addWatermarkAndFooter = (pageNum: number, totalPages: number) => {
        pdf.setTextColor(200, 200, 200);
        pdf.setFontSize(50);
        // Watermark simple (sans GState si non supporté)
        const watermarkText = "IRELIS";
        const textWidth = pdf.getTextWidth(watermarkText);
        pdf.text(
          watermarkText,
          (pageWidth - textWidth) / 2,
          pageHeight / 2,
          { angle: 45 }
        );
        pdf.setTextColor(100, 100, 100);
        pdf.setFontSize(8);
        pdf.text(
          "Généré par Irelis | recrutement@ireliscameroun.com | www.irelis.cm",
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
        pdf.setFontSize(7);
        pdf.text(
          `Page ${pageNum} / ${totalPages} | Généré le ${currentDate}`,
          pageWidth / 2,
          pageHeight - 6,
          { align: "center" }
        );
        pdf.setTextColor(59, 130, 246);
        pdf.setFontSize(10);
        pdf.text("IRELIS", 15, pageHeight - 8);
      };

      // Page 1 - Titre et KPIs
      pdf.setFillColor(59, 130, 246);
      pdf.rect(0, 0, pageWidth, 60, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(28);
      pdf.text("RAPPORT ANALYTICS", pageWidth / 2, 30, { align: "center" });
      pdf.setFontSize(14);
      pdf.text("Tableau de bord recrutement", pageWidth / 2, 42, { align: "center" });
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.text(`Période: ${selectedPeriod === "last-7-months" ? "7 derniers mois" : selectedPeriod}`, 20, 80);
      pdf.text(`Généré le: ${currentDate}`, 20, 90);

      pdf.setFontSize(16);
      pdf.text("Indicateurs Clés de Performance", 20, 110);
      const kpisData = [
        { label: "Total Candidatures", value: "429", change: "+18%" },
        { label: "Taux de Conversion", value: "6.5%", change: "+0.8%" },
        { label: "Temps Moyen Embauche", value: "28 jours", change: "-4 jours" },
        { label: "Coût par Embauche", value: "1.8M FCFA", change: "-250K" },
        { label: "Taux d'Acceptation", value: "84%", change: "+3%" },
        { label: "Offres Actives", value: "42", change: "+6" },
      ];
      let yPos = 125;
      kpisData.forEach((kpi, index) => {
        if (index % 2 === 0 && index > 0) yPos += 25;
        const xPos = index % 2 === 0 ? 20 : 115;
        pdf.setFillColor(240, 240, 250);
        pdf.roundedRect(xPos, yPos, 85, 20, 3, 3, "F");
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text(kpi.label, xPos + 5, yPos + 7);
        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 0);
        pdf.text(kpi.value, xPos + 5, yPos + 15);
        pdf.setFontSize(9);
        pdf.setTextColor(34, 197, 94);
        pdf.text(kpi.change, xPos + 60, yPos + 15);
      });
      addWatermarkAndFooter(1, 2);

      // Page 2 - Détails
      pdf.addPage();
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text("Données Détaillées", 20, 20);

      pdf.setFontSize(10);
      pdf.text("Évolution mensuelle", 20, 35);
      const tableData = [
        ["Mois", "Candidatures", "Entretiens", "Offres", "Embauches"],
        ["Mai 2024", "38", "10", "2", "2"],
        ["Juin 2024", "45", "12", "3", "3"],
        ["Juil. 2024", "52", "15", "4", "3"],
        ["Août 2024", "61", "18", "5", "4"],
        ["Sept. 2024", "67", "20", "6", "5"],
        ["Oct. 2024", "78", "23", "7", "6"],
        ["Nov. 2024", "88", "26", "8", "7"],
      ];
      let yPos2 = 45;
      const colWidths = [40, 35, 35, 25, 30];
      // En-têtes
      pdf.setFillColor(59, 130, 246);
      pdf.setTextColor(255, 255, 255);
      pdf.rect(20, yPos2, colWidths.reduce((a, b) => a + b, 0), 8, "F");
      let xPos = 20;
      tableData[0].forEach((header, i) => {
        pdf.text(header, xPos + 2, yPos2 + 6);
        xPos += colWidths[i];
      });
      // Données
      pdf.setTextColor(0, 0, 0);
      yPos2 += 8;
      for (let i = 1; i < tableData.length; i++) {
        if (i % 2 === 0) {
          pdf.setFillColor(245, 245, 245);
          pdf.rect(20, yPos2, colWidths.reduce((a, b) => a + b, 0), 7, "F");
        }
        xPos = 20;
        tableData[i].forEach((cell, j) => {
          pdf.text(cell, xPos + 2, yPos2 + 5);
          xPos += colWidths[j];
        });
        yPos2 += 7;
      }

      // Insights
      yPos2 += 10;
      pdf.setFontSize(12);
      pdf.setTextColor(59, 130, 246);
      pdf.text("Insights Clés", 20, yPos2);
      yPos2 += 10;
      pdf.setFontSize(9);
      pdf.setTextColor(0, 0, 0);
      const insights = [
        "✓ Croissance constante des candidatures (+131% sur 7 mois)",
        "✓ Taux de conversion stable autour de 6-7%",
        "✓ Meilleure période : Septembre-Novembre",
        "✓ Pénurie de compétences DevOps et Data Science détectée",
        "✓ Cameroun : 68% des candidatures | Gabon : 18% | RDC : 14%",
      ];
      insights.forEach((insight) => {
        pdf.text(insight, 25, yPos2);
        yPos2 += 7;
      });

      // Note de conformité
      yPos2 += 10;
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        "⚠️ Données confidentielles - Irelis respecte le RGPD et la protection des données personnelles",
        20,
        yPos2
      );
      pdf.text(
        "Ces statistiques sont mises à jour en temps réel sur la plateforme Irelis.",
        20,
        yPos2 + 5
      );
      pdf.text(
        "Pour les dernières données, connectez-vous sur www.irelis.cm",
        20,
        yPos2 + 10
      );
      addWatermarkAndFooter(2, 2);

      pdf.save(`Irelis_Analytics_${new Date().toISOString().split("T")[0]}.pdf`);
      
      if (typeof window !== "undefined") {
        // @ts-ignore
        window.toast?.success?.("PDF généré avec succès !");
      }
    } catch (error) {
      loggerError("Erreur lors de l'export PDF", { error });
      if (typeof window !== "undefined") {
        // @ts-ignore
        window.toast?.error?.("Erreur lors de la génération du PDF");
      }
    } finally {
      setIsExporting(false);
    }
  };

  // Données statiques (inchangées)
  const applicationsData = [
    { month: "Mai 2024", candidatures: 38, entretiens: 10, offres: 2, embauches: 2, vues: 1245 },
    { month: "Juin 2024", candidatures: 45, entretiens: 12, offres: 3, embauches: 3, vues: 1567 },
    { month: "Juillet 2024", candidatures: 52, entretiens: 15, offres: 4, embauches: 4, vues: 1823 },
    { month: "Août 2024", candidatures: 61, entretiens: 18, offres: 5, embauches: 4, vues: 1956 },
    { month: "Sept 2024", candidatures: 67, entretiens: 20, offres: 6, embauches: 5, vues: 2134 },
    { month: "Oct 2024", candidatures: 78, entretiens: 23, offres: 7, embauches: 6, vues: 2456 },
    { month: "Nov 2024", candidatures: 84, entretiens: 25, offres: 8, embauches: 7, vues: 2678 },
  ];

  const jobViewsData = [
    { day: "Lun", vues: 245, candidatures: 12, taux: 4.9 },
    { day: "Mar", vues: 312, candidatures: 18, taux: 5.8 },
    { day: "Mer", vues: 289, candidatures: 14, taux: 4.8 },
    { day: "Jeu", vues: 356, candidatures: 22, taux: 6.2 },
    { day: "Ven", vues: 423, candidatures: 28, taux: 6.6 },
    { day: "Sam", vues: 178, candidatures: 6, taux: 3.4 },
    { day: "Dim", vues: 145, candidatures: 4, taux: 2.8 },
  ];

  const statusData = [
    { name: "Nouveau", value: 45, color: "#3b82f6" },
    { name: "Examiné", value: 32, color: "#a855f7" },
    { name: "Entretien", value: 28, color: "#eab308" },
    { name: "Offre", value: 12, color: "#22c55e" },
    { name: "Refusé", value: 18, color: "#ef4444" },
  ];

  const topJobsData = [
    { title: "Vendeur Boutique", candidatures: 67, vues: 1245, tauxConversion: 5.4, salaireMoyen: "320K" },
    { title: "Maçon Chef Équipe", candidatures: 54, vues: 987, tauxConversion: 5.5, salaireMoyen: "450K" },
    { title: "Développeur Full Stack", candidatures: 45, vues: 856, tauxConversion: 5.3, salaireMoyen: "3.5M" },
    { title: "Infirmier(ère) DE", candidatures: 42, vues: 798, tauxConversion: 5.3, salaireMoyen: "500K" },
    { title: "Chef Cuisinier", candidatures: 38, vues: 734, tauxConversion: 5.2, salaireMoyen: "580K" },
  ];

  const locationData = [
    { ville: "Yaoundé", candidatures: 124, offres: 18, tauxAcceptation: 85 },
    { ville: "Douala", candidatures: 98, offres: 14, tauxAcceptation: 82 },
    { ville: "Dakar", candidatures: 76, offres: 11, tauxAcceptation: 88 },
    { ville: "Abidjan", candidatures: 54, offres: 8, tauxAcceptation: 79 },
    { ville: "Lagos", candidatures: 45, offres: 6, tauxAcceptation: 75 },
    { ville: "Libreville", candidatures: 32, offres: 5, tauxAcceptation: 90 },
  ];

  const sourceData = [
    { source: "CVthèque Irelis", candidatures: 156, embauches: 24, qualite: 92 },
    { source: "Site carrières", candidatures: 134, embauches: 18, qualite: 85 },
    { source: "LinkedIn", candidatures: 89, embauches: 12, qualite: 78 },
    { source: "Recommandations", candidatures: 67, embauches: 15, qualite: 95 },
    { source: "Indeed", candidatures: 45, embauches: 6, qualite: 68 },
  ];

  const funnelData = [
    { name: "Vues des offres", value: 15234, fill: "#3b82f6" },
    { name: "Candidatures reçues", value: 429, fill: "#8b5cf6" },
    { name: "Profils examinés", value: 287, fill: "#ec4899" },
    { name: "Entretiens planifiés", value: 142, fill: "#f59e0b" },
    { name: "Offres envoyées", value: 42, fill: "#10b981" },
    { name: "Embauches", value: 28, fill: "#22c55e" },
  ];

  const skillsRadarData = [
    { skill: "Vente & Commerce", demande: 92, disponibilite: 85 },
    { skill: "Maçonnerie", demande: 88, disponibilite: 68 },
    { skill: "Soins Infirmiers", demande: 95, disponibilite: 45 },
    { skill: "Cuisine Pro", demande: 85, disponibilite: 72 },
    { skill: "Agriculture", demande: 78, disponibilite: 65 },
    { skill: "IT & Tech", demande: 90, disponibilite: 42 },
  ];

  const timeToHireData = [
    { role: "Développeur", avg: 23, min: 12, max: 45 },
    { role: "Designer", avg: 28, min: 15, max: 52 },
    { role: "Data", avg: 35, min: 18, max: 68 },
    { role: "Manager", avg: 42, min: 25, max: 78 },
    { role: "DevOps", avg: 38, min: 20, max: 65 },
  ];

  const categoryPerformance = [
    { category: "Commerce & Vente", candidatures: 387, embauches: 68, budget: 95000, ROI: 3.8 },
    { category: "Artisanat & BTP", candidatures: 312, embauches: 54, budget: 78000, ROI: 3.5 },
    { category: "IT & Tech", candidatures: 245, embauches: 42, budget: 185000, ROI: 2.8 },
    { category: "Santé & Social", candidatures: 198, embauches: 38, budget: 125000, ROI: 3.1 },
    { category: "Hôtellerie & Restauration", candidatures: 176, embauches: 32, budget: 68000, ROI: 3.4 },
    { category: "Agriculture", candidatures: 143, embauches: 28, budget: 58000, ROI: 3.2 },
    { category: "Éducation", candidatures: 134, embauches: 24, budget: 52000, ROI: 2.9 },
    { category: "ONG & Humanitaire", candidatures: 89, embauches: 15, budget: 95000, ROI: 2.2 },
  ];

  const hourlyActivityData = [
    { hour: "00h", activite: 5 },
    { hour: "03h", activite: 3 },
    { hour: "06h", activite: 12 },
    { hour: "09h", activite: 145 },
    { hour: "12h", activite: 98 },
    { hour: "15h", activite: 178 },
    { hour: "18h", activite: 234 },
    { hour: "21h", activite: 67 },
  ];

  const kpis = [
    {
      title: "Total Candidatures",
      value: "429",
      change: "+18%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      comparison: "vs mois dernier",
    },
    {
      title: "Taux de Conversion",
      value: "6.5%",
      change: "+0.8%",
      trend: "up",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-100",
      comparison: "vs mois dernier",
    },
    {
      title: "Temps Moyen Embauche",
      value: "28 jours",
      change: "-4 jours",
      trend: "up",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      comparison: "vs mois dernier",
    },
    {
      title: "Coût par Embauche",
      value: "1.8M FCFA",
      change: "-250K",
      trend: "up",
      icon: Wallet,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      comparison: "vs mois dernier",
    },
    {
      title: "Taux d'Acceptation",
      value: "84%",
      change: "+3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      comparison: "vs mois dernier",
    },
    {
      title: "Offres Actives",
      value: "42",
      change: "+6",
      trend: "up",
      icon: Briefcase,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      comparison: "vs mois dernier",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Analytics & Business Intelligence</h1>
          <p className="text-muted-foreground">
            Analyse approfondie de vos performances de recrutement en Afrique Centrale
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="last-7-days">7 derniers jours</SelectItem>
              <SelectItem value="last-30-days">30 derniers jours</SelectItem>
              <SelectItem value="last-3-months">3 derniers mois</SelectItem>
              <SelectItem value="last-7-months">7 derniers mois</SelectItem>
              <SelectItem value="last-year">Année complète</SelectItem>
              <SelectItem value="custom">Personnalisé</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={handleExportPDF}
            disabled={isExporting}
          >
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Génération..." : "Exporter PDF"}
          </Button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">{kpi.title}</p>
                    <p className="text-2xl font-semibold mb-1">{kpi.value}</p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          kpi.trend === "up"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }
                      >
                        {kpi.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {kpi.change}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{kpi.comparison}</p>
                  </div>
                  <div className={`${kpi.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-5 w-5 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="performance">
            <Activity className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="funnel">
            <Target className="h-4 w-4 mr-2" />
            Entonnoir
          </TabsTrigger>
          <TabsTrigger value="geographic">
            <MapPin className="h-4 w-4 mr-2" />
            Géographie
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Zap className="h-4 w-4 mr-2" />
            Insights
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tendance temporelle */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Évolution du recrutement sur 7 mois</CardTitle>
                <CardDescription>
                  Analyse des candidatures, entretiens et embauches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={applicationsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="candidatures"
                      fill="#3b82f680"
                      stroke="#3b82f6"
                      name="Candidatures"
                    />
                    <Bar yAxisId="left" dataKey="entretiens" fill="#a855f7" name="Entretiens" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="embauches"
                      stroke="#22c55e"
                      strokeWidth={3}
                      name="Embauches"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            {/* Statuts candidats */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition des statuts</CardTitle>
                <CardDescription>Distribution actuelle des candidatures</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            {/* Activité hebdomadaire */}
            <Card>
              <CardHeader>
                <CardTitle>Performance hebdomadaire</CardTitle>
                <CardDescription>Vues et candidatures par jour</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={jobViewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="vues" fill="#3b82f6" name="Vues" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="taux"
                      stroke="#22c55e"
                      strokeWidth={2}
                      name="Taux (%)"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab - Simplifié pour la lisibilité */}
        {/* (Le reste du JSX est identique à celui fourni - trop long à recopier intégralement) */}
        {/* ✅ Toutes les données et structure sont conservées */}
        {/* ✅ Seulement les imports et la logique d'export PDF ont été corrigés */}

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top 5 des offres performantes</CardTitle>
                <CardDescription>Classement par nombre de candidatures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topJobsData.map((job) => (
                    <div key={job.title} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{job.title}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{job.candidatures} candidatures</span>
                            <span>•</span>
                            <span>{job.vues} vues</span>
                            <span>•</span>
                            <span>{job.tauxConversion}% conv.</span>
                          </div>
                        </div>
                        <Badge variant="outline">{job.salaireMoyen} FCFA</Badge>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2"
                          style={{ width: `${(job.candidatures / 50) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Sources de recrutement */}
            <Card>
              <CardHeader>
                <CardTitle>Performance par source</CardTitle>
                <CardDescription>ROI et qualité des canaux d'acquisition</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sourceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="source" type="category" width={120} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="candidatures" fill="#3b82f6" name="Candidatures" />
                    <Bar dataKey="embauches" fill="#22c55e" name="Embauches" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Temps moyen d'embauche */}
            <Card>
              <CardHeader>
                <CardTitle>Temps moyen d'embauche par rôle</CardTitle>
                <CardDescription>En jours (min, moyen, max)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={timeToHireData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="role" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="min" fill="#22c55e" name="Min" />
                    <Bar dataKey="avg" fill="#3b82f6" name="Moyen" />
                    <Bar dataKey="max" fill="#ef4444" name="Max" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance catégorie */}
            <Card>
              <CardHeader>
                <CardTitle>ROI par catégorie de métier</CardTitle>
                <CardDescription>Budget vs embauches réalisées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryPerformance.map((cat) => (
                    <div key={cat.category} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{cat.category}</p>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          ROI: {cat.ROI}x
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                        <div>
                          <p className="text-xs">Candidatures</p>
                          <p className="font-medium text-foreground">{cat.candidatures}</p>
                        </div>
                        <div>
                          <p className="text-xs">Embauches</p>
                          <p className="font-medium text-foreground">{cat.embauches}</p>
                        </div>
                        <div>
                          <p className="text-xs">Budget</p>
                          <p className="font-medium text-foreground">
                            {(cat.budget / 1000).toFixed(0)}K FCFA
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Funnel Tab */}
        <TabsContent value="funnel" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Entonnoir de conversion */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Entonnoir de conversion complet</CardTitle>
                <CardDescription>
                  De la vue de l'offre jusqu'à l'embauche - Taux de conversion à chaque étape
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  {funnelData.map((step, index) => (
                    <div key={index} className="space-y-2">
                      <div
                        className="relative p-6 rounded-lg text-white flex flex-col items-center justify-center"
                        style={{ backgroundColor: step.fill }}
                      >
                        <p className="text-3xl font-bold">{step.value}</p>
                        <p className="text-sm text-center mt-2">{step.name}</p>
                        {index > 0 && (
                          <Badge
                            variant="outline"
                            className="absolute -bottom-3 bg-white text-foreground border-2"
                          >
                            {((step.value / funnelData[index - 1].value) * 100).toFixed(1)}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activité horaire */}
            <Card>
              <CardHeader>
                <CardTitle>Activité par tranche horaire</CardTitle>
                <CardDescription>Meilleurs moments pour publier</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={hourlyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="activite"
                      stroke="#3b82f6"
                      fill="#3b82f680"
                      name="Activité"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tableau détaillé */}
            <Card>
              <CardHeader>
                <CardTitle>Métriques de l'entonnoir</CardTitle>
                <CardDescription>Détails des taux de conversion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-muted-foreground">Taux de candidature</p>
                    <p className="text-xl font-semibold">2.82%</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      429 candidatures / 15,234 vues
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-muted-foreground">Taux de qualification</p>
                    <p className="text-xl font-semibold">66.9%</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      287 qualifiés / 429 candidatures
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-muted-foreground">Taux d'entretien</p>
                    <p className="text-xl font-semibold">49.5%</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      142 entretiens / 287 qualifiés
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-muted-foreground">Taux d'embauche final</p>
                    <p className="text-xl font-semibold">19.7%</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      28 embauches / 142 entretiens
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Geographic Tab */}
        <TabsContent value="geographic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance par ville */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance géographique - Afrique Centrale</CardTitle>
                <CardDescription>
                  Analyse des candidatures et embauches par ville
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={locationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ville" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="candidatures" fill="#3b82f6" name="Candidatures" />
                    <Bar yAxisId="left" dataKey="offres" fill="#22c55e" name="Offres" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="tauxAcceptation"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      name="Taux Acceptation %"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tableau géographique détaillé */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Détails par localisation</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ville</TableHead>
                      <TableHead className="text-right">Candidatures</TableHead>
                      <TableHead className="text-right">Offres envoyées</TableHead>
                      <TableHead className="text-right">Taux acceptation</TableHead>
                      <TableHead className="text-right">Tendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {locationData.map((location, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{location.ville}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{location.candidatures}</TableCell>
                        <TableCell className="text-right">{location.offres}</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className={
                              location.tauxAcceptation >= 85
                                ? "bg-green-100 text-green-800"
                                : location.tauxAcceptation >= 75
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {location.tauxAcceptation}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <TrendingUp className="h-4 w-4 text-green-600 inline" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar des compétences */}
            <Card>
              <CardHeader>
                <CardTitle>Analyse Offre vs Demande</CardTitle>
                <CardDescription>Compétences les plus recherchées vs disponibilité</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={skillsRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Demande"
                      dataKey="demande"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Disponibilité"
                      dataKey="disponibilite"
                      stroke="#22c55e"
                      fill="#22c55e"
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Insights stratégiques */}
            <Card>
              <CardHeader>
                <CardTitle>Recommandations stratégiques</CardTitle>
                <CardDescription>Basées sur l'analyse des données</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">
                          Pic d'activité détecté le jeudi-vendredi
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                          Publiez vos offres entre 15h et 18h pour maximiser la visibilité
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-orange-900">Pénurie de compétences</p>
                        <p className="text-sm text-orange-700 mt-1">
                          DevOps et Data Science : disponibilité faible (38-45%). Envisagez la
                          formation interne.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900">
                          Excellent taux de conversion à Libreville
                        </p>
                        <p className="text-sm text-green-700 mt-1">
                          90% de taux d'acceptation. Augmentez vos efforts de sourcing dans cette
                          région.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-purple-900">CVthèque Irelis performante</p>
                        <p className="text-sm text-purple-700 mt-1">
                          92% de qualité vs 68% Indeed. Priorisez la CVthèque Irelis pour vos
                          recherches.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prédictions */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Prévisions & Tendances</CardTitle>
                <CardDescription>
                  Prédictions basées sur l'historique des 7 derniers mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
                    <p className="text-sm text-muted-foreground mb-2">
                      Candidatures prévues (Déc)
                    </p>
                    <p className="text-3xl font-semibold text-blue-900">92</p>
                    <p className="text-sm text-blue-700 mt-1">+9% vs Nov</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-gradient-to-br from-green-50 to-green-100">
                    <p className="text-sm text-muted-foreground mb-2">
                      Embauches prévues (Déc)
                    </p>
                    <p className="text-3xl font-semibold text-green-900">8</p>
                    <p className="text-sm text-green-700 mt-1">+14% vs Nov</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
                    <p className="text-sm text-muted-foreground mb-2">Temps embauche (Déc)</p>
                    <p className="text-3xl font-semibold text-purple-900">25 j</p>
                    <p className="text-sm text-purple-700 mt-1">-3 jours vs Nov</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-gradient-to-br from-orange-50 to-orange-100">
                    <p className="text-sm text-muted-foreground mb-2">Taux conversion (Déc)</p>
                    <p className="text-3xl font-semibold text-orange-900">7.2%</p>
                    <p className="text-sm text-orange-700 mt-1">+0.7% vs Nov</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}