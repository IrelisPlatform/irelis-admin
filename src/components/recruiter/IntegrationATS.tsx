// src/components/recruiter/IntegrationATS.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle } from "lucide-react";

export function IntegrationATS() {
  const [selectedATS, setSelectedATS] = useState<string | null>(null);
  const [showConfigForm, setShowConfigForm] = useState(false);

  const systemes = [
    {
      nom: "BambooHR",
      description: "Système RH tout-en-un incluant le recrutement et l'onboarding",
      statut: "Disponible",
      logo: "🎋",
      popularite: "Tout-en-un",
      fonctionnalites: [
        "Transfert des profils candidats",
        "Suivi du pipeline de recrutement",
        "Gestion des documents RH",
        "Reporting et analytics"
      ]
    },
    {
      nom: "Beetween",
      description: "ATS français nouvelle génération pour optimiser le recrutement",
      statut: "Disponible",
      logo: "🐝",
      popularite: "Innovant",
      fonctionnalites: [
        "IA pour scoring des CV",
        "Chatbot de préqualification",
        "Marque employeur avancée",
        "Campagnes de recrutement"
      ]
    },
    {
      nom: "Bullhorn",
      description: "Leader mondial des solutions ATS pour les agences de recrutement",
      statut: "Disponible",
      logo: "🐂",
      popularite: "Professionnel",
      fonctionnalites: [
        "Intégration CRM avancée",
        "Gestion multi-clients",
        "Suivi des placements",
        "Facturation intégrée"
      ]
    },
    {
      nom: "iCIMS",
      description: "Plateforme cloud leader pour grandes entreprises internationales",
      statut: "Disponible",
      logo: "☁️",
      popularite: "Grandes entreprises",
      fonctionnalites: [
        "Solution cloud scalable",
        "Conformité multi-pays",
        "Analytics avancés",
        "Onboarding intégré"
      ]
    },
    {
      nom: "Jobaffinity",
      description: "Solution française de gestion des recrutements adaptée aux PME",
      statut: "Disponible",
      logo: "🇫🇷",
      popularite: "PME France",
      fonctionnalites: [
        "Interface 100% en français",
        "Support client local",
        "Conformité RGPD intégrée",
        "Multidiffusion automatique"
      ]
    },
    {
      nom: "Odoo",
      description: "ERP open source avec module recrutement intégré",
      statut: "Disponible",
      logo: "⚙️",
      popularite: "Open Source",
      fonctionnalites: [
        "Intégration complète avec ERP",
        "Personnalisable à volonté",
        "Gestion de projets RH",
        "Base de données unifiée"
      ]
    },
    {
      nom: "Recruitee",
      description: "Plateforme collaborative de recrutement pour équipes modernes",
      statut: "Disponible",
      logo: "🎯",
      popularite: "Très populaire",
      fonctionnalites: [
        "Synchronisation bidirectionnelle des candidatures",
        "Gestion collaborative des offres",
        "Pipeline de recrutement visuel",
        "Reporting et analytics avancés"
      ]
    },
    {
      nom: "Sage 100 Paie & RH",
      description: "Solution RH complète incluant recrutement et paie pour PME",
      statut: "Disponible",
      logo: "📊",
      popularite: "RH Complet",
      fonctionnalites: [
        "Intégration paie-recrutement",
        "Gestion administrative du personnel",
        "Tableaux de bord RH",
        "Conformité sociale"
      ]
    },
    {
      nom: "SmartRecruiters",
      description: "Plateforme d'acquisition de talents moderne et intuitive",
      statut: "Disponible",
      logo: "🚀",
      popularite: "Entreprises",
      fonctionnalites: [
        "Marketplace d'intégrations",
        "Recrutement collaboratif",
        "Analyse prédictive",
        "Expérience candidat optimisée"
      ]
    },
    {
      nom: "Taleez",
      description: "Logiciel de recrutement simple et performant pour toutes tailles",
      statut: "Disponible",
      logo: "💼",
      popularite: "Simple",
      fonctionnalites: [
        "Prise en main rapide",
        "Multidiffusion automatique",
        "Gestion des cooptations",
        "Site carrières intégré"
      ]
    },
    {
      nom: "TTNet GRH/CRM",
      description: "Solution intégrée de gestion RH et relation candidat",
      statut: "Disponible",
      logo: "🔗",
      popularite: "Intégré",
      fonctionnalites: [
        "Gestion relation candidat (CRM)",
        "Base de données talents",
        "Suivi des formations",
        "Gestion des compétences"
      ]
    },
    {
      nom: "Zoho Recruit",
      description: "Solution complète de gestion du recrutement avec suivi des candidatures",
      statut: "Disponible",
      logo: "🔷",
      popularite: "Recommandé",
      fonctionnalites: [
        "Import automatique des candidatures",
        "Synchronisation bidirectionnelle des données",
        "Mise à jour du statut en temps réel",
        "Export des rapports de recrutement"
      ]
    }
  ];

  const connexions = [
    {
      systeme: "Zoho Recruit",
      dateConnexion: "15/10/2024",
      statut: "Connecté",
      derniereSync: "Aujourd'hui à 14:30",
      candidatsSync: 156
    }
  ];

  const handleConnectATS = (atsName: string) => {
    setSelectedATS(atsName);
    setShowConfigForm(true);
  };

  const renderConfigForm = () => {
    if (!selectedATS) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <CardTitle>Configurer la connexion avec {selectedATS}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Renseignez vos identifiants pour connecter {selectedATS} à votre espace Irelis
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>URL de votre compte {selectedATS}</Label>
                <Input 
                  type="url" 
                  placeholder={`https://votre-entreprise.${selectedATS.toLowerCase().replace(/\s/g, '')}.com`}
                />
                <p className="text-sm text-muted-foreground">
                  L'adresse complète de votre espace {selectedATS}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Clé API / Token d'authentification</Label>
                <Input 
                  type="password" 
                  placeholder="Collez votre clé API ici"
                />
                <p className="text-sm text-muted-foreground">
                  Générez une clé API depuis les paramètres de votre compte {selectedATS}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Identifiant API (si nécessaire)</Label>
                <Input 
                  placeholder="ID de l'API ou nom d'utilisateur"
                />
              </div>

              <div className="space-y-2">
                <Label>Données à synchroniser</Label>
                <div className="space-y-2">
                  {[
                    "Nouvelles candidatures reçues sur Irelis",
                    "Statut des candidats (accepté, refusé, en attente)",
                    "Notes et commentaires sur les candidatures",
                    "Offres d'emploi publiées",
                    "Documents joints (CV, lettres de motivation)"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 border rounded-lg">
                      <input type="checkbox" defaultChecked id={`sync-data-${idx}`} />
                      <label htmlFor={`sync-data-${idx}`} className="text-sm cursor-pointer">{item}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fréquence de synchronisation</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Temps réel (recommandé)</option>
                  <option>Toutes les 15 minutes</option>
                  <option>Toutes les heures</option>
                  <option>Toutes les 4 heures</option>
                  <option>Une fois par jour</option>
                </select>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-semibold mb-1">Comment trouver votre clé API</p>
                      <p className="text-muted-foreground">
                        Connectez-vous à votre compte {selectedATS}, allez dans Paramètres puis API ou Intégrations.
                        Générez une nouvelle clé d'accès et copiez-la ici.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setShowConfigForm(false);
                  setSelectedATS(null);
                }}
              >
                Annuler
              </Button>
              <Button className="flex-1">
                Tester et connecter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Intégration ATS</h1>
        <p className="text-muted-foreground">Connectez votre système de gestion RH existant pour centraliser vos données</p>
      </div>

      <Card className="bg-primary/5">
        <CardContent className="p-6">
          <h3 className="mb-3 font-semibold">Pourquoi intégrer un ATS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-1">Centralisation des données</p>
              <p className="text-muted-foreground">Tous vos candidats et offres dans un seul système</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Automatisation des tâches</p>
              <p className="text-muted-foreground">Synchronisation automatique sans ressaisie manuelle</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Meilleur suivi</p>
              <p className="text-muted-foreground">Historique complet du parcours candidat accessible partout</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="disponibles">
        <TabsList>
          <TabsTrigger value="disponibles">Systèmes disponibles</TabsTrigger>
          <TabsTrigger value="connectes">Mes connexions</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="disponibles" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemes.map((systeme, idx) => (
              <Card key={idx} className="hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{systeme.logo}</span>
                        <div>
                          <CardTitle className="text-lg">{systeme.nom}</CardTitle>
                          <Badge className="mt-1 bg-blue-100 text-blue-800 text-xs">
                            {systeme.popularite}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{systeme.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold mb-2">Fonctionnalités incluses</p>
                    <div className="space-y-1">
                      {systeme.fonctionnalites.map((fonc, foncIdx) => (
                        <div key={foncIdx} className="text-sm flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{fonc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => handleConnectATS(systeme.nom)}
                  >
                    Connecter {systeme.nom}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connectes" className="space-y-4 mt-6">
          {connexions.length > 0 ? (
            <>
              {connexions.map((connexion, idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-semibold">{connexion.systeme}</p>
                        <p className="text-sm text-muted-foreground">Connecté depuis le {connexion.dateConnexion}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{connexion.statut}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Dernière synchronisation</p>
                        <p className="font-semibold">{connexion.derniereSync}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Candidats synchronisés</p>
                        <p className="font-semibold">{connexion.candidatsSync}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Synchroniser maintenant</Button>
                      <Button size="sm" variant="outline">Paramètres</Button>
                      <Button size="sm" variant="outline">Déconnecter</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground mb-4">Aucun système connecté pour le moment</p>
                <Button>Connecter un système</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="configuration" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de synchronisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Fréquence de synchronisation automatique</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Temps réel (recommandé)</option>
                  <option>Toutes les 15 minutes</option>
                  <option>Toutes les heures</option>
                  <option>Toutes les 4 heures</option>
                  <option>Une fois par jour</option>
                  <option>Manuelle uniquement</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Notifications</Label>
                <div className="space-y-2">
                  {[
                    "M'alerter en cas d'erreur de synchronisation",
                    "Envoyer un rapport quotidien des syncs",
                    "Notifier les nouvelles candidatures synchronisées"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 border rounded-lg">
                      <input type="checkbox" defaultChecked id={`notif-${idx}`} />
                      <label htmlFor={`notif-${idx}`} className="text-sm cursor-pointer">{item}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full">Enregistrer les paramètres</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuration API personnalisée</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Clé API Irelis</Label>
                <div className="flex gap-2">
                  <Input value="irelis_api_xxxxxxxxxxxxxxxx" readOnly />
                  <Button variant="outline">Copier</Button>
                </div>
                <p className="text-sm text-muted-foreground">Utilisez cette clé pour authentifier vos requêtes API</p>
              </div>

              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input placeholder="https://votre-systeme.com/webhook  " />
                <p className="text-sm text-muted-foreground">Recevez les notifications en temps réel sur cette URL</p>
              </div>

              <div className="space-y-2">
                <Label>Documentation API</Label>
                <Button variant="outline" className="w-full">Télécharger la documentation complète</Button>
              </div>

              <div className="pt-4">
                <Button className="w-full">Enregistrer la configuration</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="mb-3 font-semibold">Besoin d'aide pour l'intégration</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Notre équipe technique peut vous accompagner dans la mise en place de votre intégration ATS.
                Contactez-nous pour un audit personnalisé et une assistance dédiée.
              </p>
              <Button>Contacter le support technique</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showConfigForm && renderConfigForm()}
    </div>
  );
}