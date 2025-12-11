// src/components/recruiter/RecruiterSpace.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Shield, CreditCard, FileText, LayoutDashboard, Briefcase } from "lucide-react";
import { RecruiterHeader } from "@/components/recruiter/RecruiterHeader";
import { RecruiterSidebar } from "@/components/recruiter/RecruiterSidebar";
import { StatsCards } from "@/components/recruiter/StatsCards";
import { JobsTable } from "@/components/recruiter/JobsTable";
import { SmartSourcing } from "@/components/recruiter/SmartSourcing";
import { UnifiedCandidates } from "@/components/recruiter/UnifiedCandidates";
import { MessagingPanel } from "@/components/recruiter/MessagingPanel";
import { AnalyticsDashboard } from "@/components/recruiter/AnalyticsDashboard";
import { TeamManagement } from "@/components/recruiter/TeamManagement";
import { ModelesAnnonces } from "@/components/recruiter/ModelesAnnonces";
import { OutilTriScoring } from "@/components/recruiter/OutilTriScoring";
import { QuestionsEntretien } from "@/components/recruiter/QuestionsEntretien";
import { Multidiffusion } from "@/components/recruiter/Multidiffusion";
import { IntegrationATS } from "@/components/recruiter/IntegrationATS";
import { EmailTemplates } from "@/components/recruiter/EmailTemplates"; // ✅ corrigé
import { SupportCenter } from "@/components/recruiter/SupportCenter";
import { Subscriptions } from "@/components/recruiter/Subscriptions";
import { Offres } from "@/components/recruiter/Offres"; // ✅ ajouté
import { Guides } from "@/components/recruiter/Guides"; // ✅ ajouté
import { ProfilEntreprise } from "@/components/recruiter/ProfilEntreprise"; // ✅ ajouté
import { Contact } from "@/components/recruiter/Contact"; // ✅ ajouté
import { RecruiterProfileGuard } from "@/components/recruiter/RecruiterProfileGuard";
import { CompanySettings } from "@/components/recruiter/CompanySettings";
import { useAuth } from "@/context/AuthContext";

interface RecruiterSpaceProps {
  onTabChange?: (tab: string) => void;
  initialTab?: string;
}

export function RecruiterSpace({ onTabChange, initialTab = "dashboard" }: RecruiterSpaceProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [notifications] = useState(3);
  
  const { deleteAccount } = useAuth();

  const handleNavigateHome = () => {
    if (onTabChange) {
      onTabChange("accueil");
    }
  };

  const handleHeaderNavClick = (tab: string) => {
    const tabMapping: { [key: string]: string } = {
      'cvtheque': 'sourcing',
      'solutions': 'templates',
      'offres': 'jobs',
      'guides': 'support',
      'subscriptions': 'subscriptions',
      'profilentreprise': 'settings',
      'contact': 'contact', // ✅ ajouté
      'messages': 'messaging',
      // ✅ ajout des nouveaux onglets
      'solutions-market': 'solutions',
      'offres-market': 'offres',
      'guides-market': 'guides',
      'cvtheque-market': 'cvtheque',
    };
    
    setActiveTab(tabMapping[tab] || tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        // ... (inchangé)
        return (
          <div className="space-y-6">
            <div>
              <h1>Tableau de bord</h1>
              <p className="text-muted-foreground">
                Pilotez vos recrutements
              </p>
            </div>
            <StatsCards />
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="hover:border-primary cursor-pointer transition-colors" onClick={() => setActiveTab("sourcing")}>
                <CardContent className="p-6">
                  <h3>Publier une nouvelle offre</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Créer une offre d'emploi/stage...
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:border-primary cursor-pointer transition-colors" onClick={() => setActiveTab("sourcing")}>
                <CardContent className="p-6">
                  <h3>CVthèque Irelis</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Sourcez de nouveaux talents
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:border-primary cursor-pointer transition-colors" onClick={() => setActiveTab("analytics")}>
                <CardContent className="p-6">
                  <h3>Voir les stats</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Analysez vos performances
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dernières candidatures</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Aminata Ndiaye", job: "Maçon Chef d'Équipe", time: "Il y a 1h", status: "Nouveau", matchScore: 85 },
                      { name: "Jean-Paul Mbarga", job: "Vendeur Boutique", time: "Il y a 3h", status: "Nouveau", matchScore: 78 },
                      { name: "Grace Tchamba", job: "Infirmière DE", time: "Il y a 5h", status: "Examiné", matchScore: 92 },
                      { name: "Ibrahim Diallo", job: "Chef Cuisinier", time: "Hier", status: "Nouveau", matchScore: 71 },
                      { name: "Marie Etang", job: "Couturière Pro", time: "Hier", status: "Examiné", matchScore: 65 },
                    ].map((candidate, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b last:border-0 last:pb-0 gap-4">
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">{candidate.job}</p>
                        </div>
                        <div className="text-right space-y-2 flex-shrink-0">
                          <span className="inline-block text-xs bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full">
                            {candidate.status}
                          </span>
                          <p className="text-xs text-muted-foreground">{candidate.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Offres les plus actives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Vendeur Boutique Mode", candidates: 42, views: 623, status: "Active" },
                      { title: "Maçon Chef d'Équipe", candidates: 34, views: 512, status: "Active" },
                      { title: "Chef Cuisinier Restaurant", candidates: 27, views: 387, status: "Active" },
                      { title: "Infirmier(ère) Diplômé(e)", candidates: 18, views: 298, status: "Active" },
                      { title: "Agronome Maraîchage", candidates: 9, views: 156, status: "En attente" },
                    ].map((job, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b last:border-0 last:pb-0 gap-4">
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {job.candidates} candidatures • {job.views} vues
                          </p>
                        </div>
                        <span className={`text-xs px-3 py-1.5 rounded-full flex-shrink-0 ${
                          job.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {job.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Vue d'ensemble des campagnes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Offres actives</p>
                    <p className="mt-1">42</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Offres expirées</p>
                    <p className="mt-1">8</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Brouillons</p>
                    <p className="mt-1">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "jobs":
        return (
          <div className="space-y-6">
            <div>
              <h1>Gestion des offres d'emploi</h1>
              <p className="text-muted-foreground">Créez, modifiez et gérez toutes vos offres</p>
            </div>
            <JobsTable />
          </div>
        );

      case "sourcing":
        return <SmartSourcing />;

      case "candidates":
        return <UnifiedCandidates />;

      case "messaging":
        return <MessagingPanel />;

      case "analytics":
        return <AnalyticsDashboard />;

      case "team":
        return <TeamManagement />;

      case "solutions":
        return <Solutions />; // ✅ ajouté

      case "offres":
        return <Offres />; // ✅ ajouté

      case "guides":
        return <Guides />; // ✅ ajouté

      case "cvtheque":
        return <CVtheque />; // ✅ ajouté

      case "contact":
        return <Contact />; // ✅ ajouté

      case "profil-entreprise":
        return <ProfilEntreprise />; // ✅ ajouté

      case "templates":
        // ... (inchangé)
        return (
          <div className="space-y-6">
            <div>
              <h1>Boîte à outils</h1>
              <p className="text-muted-foreground">Outils essentiels pour optimiser vos recrutements</p>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2 font-semibold">Connectez votre système RH existant</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Synchronisez automatiquement vos candidatures avec Recruitee, Zoho Recruit, Bullhorn, SmartRecruiters, Jobaffinity, Beetween, Taleez, Sage 100 Paie & RH, TTNet GRH/CRM, iCIMS, Odoo, BambooHR ou votre ATS actuel.
                    </p>
                    <Button onClick={() => setActiveTab('integration-ats')}>Configurer l'intégration ATS</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Modèles d'annonces personnalisables", desc: "Gagnez du temps et attirez de bons candidats", value: "modeles-annonces" },
                { title: "Outil de tri et scoring des candidatures", desc: "Sélectionnez rapidement et objectivement les meilleurs profils", value: "tri-scoring" },
                { title: "Base de questions d'entretien", desc: "Structurez les entretiens et évaluez efficacement les compétences", value: "questions-entretien" },
                { title: "Module de multidiffusion automatisée", desc: "Maximisez la visibilité des offres sur plusieurs plateformes et réseaux", value: "multidiffusion" },
                { title: "Intégration ATS", desc: "Fluidifiez la gestion des candidatures avec les outils RH existants", value: "integration-ats" },
                { title: "Templates d'email", desc: "Créez et personnalisez vos emails de recrutement", value: "email-templates" },
              ].map((template, index) => (
                <Card key={index} className="hover:border-primary cursor-pointer transition-colors" onClick={() => setActiveTab(template.value)}>
                  <CardContent className="p-6">
                    <h3 className="mb-3 font-semibold">{template.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {template.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "modeles-annonces":
        return <ModelesAnnonces />;

      case "tri-scoring":
        return <OutilTriScoring />;

      case "questions-entretien":
        return <QuestionsEntretien />;

      case "multidiffusion":
        return <Multidiffusion />;

      case "integration-ats":
        return <IntegrationATS />;

      case "email-templates":
        return <EmailTemplates />;

      case "settings":
        // ... (inchangé)
        return (
          <div className="space-y-6">
            <div>
              <h1>Paramètres</h1>
              <p className="text-muted-foreground">Configurez votre espace recruteur</p>
            </div>

            <Tabs defaultValue="company">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
                <TabsTrigger value="company">Entreprise</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Sécurité & RGPD</TabsTrigger>
                <TabsTrigger value="billing">Facturation</TabsTrigger>
              </TabsList>

              <TabsContent value="company" className="space-y-4 mt-6">
                <CompanySettings />
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Préférences de notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Nouvelles candidatures</p>
                        <p className="text-sm text-muted-foreground">
                          Recevoir un email pour chaque nouvelle candidature
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Résumé quotidien</p>
                        <p className="text-sm text-muted-foreground">
                          Recevoir un rapport chaque matin
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Résumé hebdomadaire</p>
                        <p className="text-sm text-muted-foreground">
                          Recevoir un rapport détaillé chaque lundi
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Offres expirées</p>
                        <p className="text-sm text-muted-foreground">
                          Alerte 7 jours avant l'expiration d'une offre
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Messages candidats</p>
                        <p className="text-sm text-muted-foreground">
                          Notifications pour les nouveaux messages
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sécurité et protection des données (RGPD)</CardTitle>
                  </CardHeader>
                  <div className="pt-4 border-t border-border mt-4">
                    <h3 className="font-medium text-destructive mb-2">Supprimer mon compte</h3>
                    <p className="text-sm text-muted-foreground mb-3">
    Supprimez définitivement votre compte et toutes vos données (profil, offres, candidatures, etc.).
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={async () => {
                        const confirmed = confirm("⚠️ Cette action est irréversible.\n\nToutes vos données seront perdues.\n\nContinuer ?");
                        if (confirmed) {
                          await deleteAccount();
                        }
                      }}
                    >
                      Supprimer mon compte (RGPD)
                    </Button>
                  </div>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p>Conformité RGPD</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Vos données et celles de vos candidats sont protégées conformément au RGPD.
                            Toutes les actions sont tracées et un historique complet est disponible.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Durée de conservation des CV (mois)</Label>
                      <Input type="number" defaultValue="24" />
                      <p className="text-sm text-muted-foreground">
                        Les CV sont automatiquement supprimés après cette période
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p>Anonymisation automatique</p>
                        <p className="text-sm text-muted-foreground">
                          Anonymiser les candidatures refusées après 6 mois
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p>Politique de confidentialité</p>
                        <p className="text-sm text-muted-foreground">
                          Afficher votre politique sur les offres d'emploi
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="space-y-2">
                      <Label>Politique de confidentialité</Label>
                      <Textarea
                        rows={4}
                        defaultValue="Les données collectées sont utilisées uniquement dans le cadre du processus de recrutement..."
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Historique et traçabilité</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Toutes les actions effectuées sur la plateforme sont enregistrées et consultables.
                    </p>
                    <div className="space-y-2">
                      {[
                        { action: "Modification de l'offre 'Développeur Full Stack'", user: "Marie Dupont", date: "Aujourd'hui à 14:30" },
                        { action: "Changement de statut candidat", user: "Pierre Laurent", date: "Aujourd'hui à 11:20" },
                        { action: "Accès aux données candidat 'Sophie Martin'", user: "Marie Dupont", date: "Hier à 16:45" },
                      ].map((log, index) => (
                        <div key={index} className="p-3 border rounded-lg text-sm">
                          <p>{log.action}</p>
                          <p className="text-muted-foreground mt-1">
                            Par {log.user} • {log.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Abonnement et facturation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p>Plan Premium</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Offres illimitées • CVthèque complète • Support prioritaire
                          </p>
                        </div>
                        <p>499€/mois</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Crédits CVthèque disponibles</Label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-secondary rounded-full h-2">
                          <div className="bg-primary rounded-full h-2 w-3/4"></div>
                        </div>
                        <span className="text-sm">750/1000</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Mode de paiement</Label>
                      <div className="p-3 border rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <p>•••• •••• •••• 4242</p>
                            <p className="text-sm text-muted-foreground">Expire 12/2025</p>
                          </div>
                        </div>
                        <p className="text-sm text-primary cursor-pointer">Modifier</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Historique de facturation</Label>
                      <div className="space-y-2">
                        {[
                          { date: "01/11/2024", amount: "499€", status: "Payée" },
                          { date: "01/10/2024", amount: "499€", status: "Payée" },
                          { date: "01/09/2024", amount: "499€", status: "Payée" },
                        ].map((invoice, index) => (
                          <div key={index} className="p-3 border rounded-lg flex items-center justify-between">
                            <div>
                              <p>{invoice.date}</p>
                              <p className="text-sm text-muted-foreground">{invoice.amount}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                {invoice.status}
                              </span>
                              <p className="text-sm text-primary cursor-pointer">Télécharger</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );

      case "support":
        return <SupportCenter />;

      case "subscriptions":
        return <Subscriptions />;

      case "profil-entreprise":
        return <ProfilEntreprise />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-[1920px] mx-auto flex min-h-screen">
        {/* Sidebar - cachée sur mobile */}
        <div className="hidden lg:block">
          <RecruiterSidebar activeTab={activeTab} onTabChange={setActiveTab} onNavigateHome={handleNavigateHome} />
        </div>
        
        {/* Contenu principal avec header intégré */}
        <div className="flex-1 flex flex-col w-full min-w-0">
          <RecruiterHeader 
            onTabChange={onTabChange}
            onSettingsClick={() => setActiveTab('settings')}
            notifications={notifications}
            onHeaderNavClick={handleHeaderNavClick}
          />
          
          <main className="flex-1 overflow-y-auto">
            <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 max-w-[1600px] mx-auto w-full">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}