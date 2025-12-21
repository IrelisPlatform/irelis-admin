// src/components/recruiter/Subscriptions.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star, Zap, Crown, Info } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SubscriptionFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
  details?: string;
  tooltip?: string;
}

interface SubscriptionPlan {
  name: string;
  price: string;
  priceDetails: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  buttonText: string;
  buttonVariant: "outline" | "default";
  features: SubscriptionFeature[];
  highlight?: boolean;
}

export function Subscriptions() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  // Liste complète des fonctionnalités (identique pour les 3 formules)
  const allFeatures = [
    {
      id: "offres",
      essentiel: { name: "3 offres d'emploi actives simultanément", included: true, tooltip: "Publiez jusqu'à 3 annonces en même temps sur la plateforme" },
      pro: { name: "15 offres d'emploi actives simultanément", included: true, tooltip: "Publiez jusqu'à 15 annonces en même temps sur la plateforme" },
      enterprise: { name: "Offres illimitées", included: true, highlight: true, tooltip: "Publiez autant d'annonces que vous le souhaitez sans restriction" },
    },
    {
      id: "publication",
      essentiel: { name: "Publication sur Irelis.cm uniquement", included: true, tooltip: "Vos offres sont visibles uniquement sur le site Irelis" },
      pro: { name: "Publication optimisée Irelis + Réseaux sociaux", included: true, tooltip: "Vos offres sont partagées automatiquement sur nos réseaux sociaux pour plus de visibilité" },
      enterprise: { name: "Publication optimisée Irelis + Réseaux sociaux", included: true, tooltip: "Vos offres sont partagées automatiquement sur nos réseaux sociaux pour plus de visibilité" },
    },
    {
      id: "visibilite",
      essentiel: { name: "30 jours de visibilité par offre", included: true, tooltip: "Chaque annonce reste active et visible pendant 1 mois" },
      pro: { name: "60 jours de visibilité par offre", included: true, tooltip: "Chaque annonce reste active et visible pendant 2 mois" },
      enterprise: { name: "90 jours de visibilité par offre", included: true, tooltip: "Chaque annonce reste active et visible pendant 3 mois complets" },
    },
    {
      id: "cvtheque",
      essentiel: { name: "Accès CVthèque limité", included: true, details: "10 profils/mois", tooltip: "Consultez 10 CV de candidats inscrits chaque mois" },
      pro: { name: "CVthèque complète illimitée", included: true, highlight: true, tooltip: "Accès à tous les CV de candidats inscrits sans limitation" },
      enterprise: { name: "CVthèque Premium accès prioritaire", included: true, highlight: true, tooltip: "Accès prioritaire aux nouveaux profils avant les autres recruteurs" },
    },
    {
      id: "coordonnees",
      essentiel: { name: "Accès coordonnées candidats qualifiés", included: false, tooltip: "Email et téléphone des candidats (disponible en formule Pro)" },
      pro: { name: "Accès coordonnées candidats qualifiés", included: true, highlight: true, tooltip: "Récupérez email et téléphone des candidats pour les contacter directement" },
      enterprise: { name: "Accès coordonnées candidats qualifiés", included: true, highlight: true, tooltip: "Récupérez email et téléphone des candidats pour les contacter directement" },
    },
    {
      id: "matching",
      essentiel: { name: "Matching IA intelligent", included: false, tooltip: "Suggestions automatiques de candidats par intelligence artificielle (disponible en formule Pro)" },
      pro: { name: "Matching IA intelligent", included: true, highlight: true, details: "Top 10 candidats suggérés par offre", tooltip: "L'intelligence artificielle analyse les CV et vous propose les 10 meilleurs profils pour chaque poste" },
      enterprise: { name: "Matching IA intelligent", included: true, highlight: true, details: "Top 10 candidats suggérés par offre", tooltip: "L'intelligence artificielle analyse les CV et vous propose les 10 meilleurs profils pour chaque poste" },
    },
    {
      id: "multidiffusion",
      essentiel: { name: "Multidiffusion automatique", included: false, tooltip: "Publication simultanée sur plusieurs plateformes (disponible en formule Pro)" },
      pro: { name: "Multidiffusion 3 plateformes", included: true, details: "LinkedIn, Facebook, WhatsApp, Telegram", tooltip: "Publiez automatiquement sur LinkedIn, Facebook, WhatsApp et Telegram depuis Irelis pour maximiser la visibilité auprès des candidats africains" },
      enterprise: { name: "Multidiffusion internationale", included: true, details: "Hors Afrique, LinkedIn, Réseaux sociaux, Communautés", tooltip: "Publication automatique hors Afrique, LinkedIn, réseaux sociaux et communautés professionnelles pour attirer des talents africains et internationaux. Les candidatures reçues sont transférées sur votre tableau de bord Irelis" },
    },
    {
      id: "statistiques",
      essentiel: { name: "Statistiques de base", included: true, details: "Vues, candidatures, taux de conversion", tooltip: "Nombre de vues de vos offres et candidatures reçues" },
      pro: { name: "Statistiques détaillées et exports", included: true, tooltip: "Rapports complets avec exports Excel/PDF sur vos performances de recrutement" },
      enterprise: { name: "Rapports analytiques avancés", included: true, tooltip: "Tableaux de bord personnalisés, KPIs recrutement et rapports exécutifs détaillés" },
    },
    {
      id: "modeles",
      essentiel: { name: "Modèles d'annonces pré-remplis", included: true, tooltip: "Utilisez nos templates d'offres d'emploi prêts à l'emploi" },
      pro: { name: "Modèles personnalisables et banque de questions", included: true, tooltip: "Créez vos propres templates d'annonces et questionnaires de présélection" },
      enterprise: { name: "Modèles personnalisables et banque de questions", included: true, tooltip: "Créez vos propres templates d'annonces et questionnaires de présélection" },
    },
    {
      id: "emails",
      essentiel: { name: "Emails automatisés aux candidats", included: false, tooltip: "Envoi automatique d'accusés de réception et de suivis personnalisés (disponible en formule Pro)" },
      pro: { name: "Emails automatisés aux candidats", included: true, tooltip: "Envoi automatique d'accusés de réception et de suivis personnalisés" },
      enterprise: { name: "Emails automatisés aux candidats", included: true, tooltip: "Envoi automatique d'accusés de réception et de suivis personnalisés" },
    },
    {
      id: "ats",
      essentiel: { name: "ATS simplifié", included: true, tooltip: "Tableau de bord simple pour suivre vos candidatures reçues" },
      pro: { name: "ATS complet avec pipeline", included: false, tooltip: "Système de gestion avancé avec pipeline de recrutement (disponible en formule Enterprise)" },
      enterprise: { name: "ATS Enterprise avec workflows", included: true, tooltip: "Système avancé avec processus de recrutement personnalisables et automatisations sur mesure" },
    },
    {
      id: "chasse",
      essentiel: { name: "Chasse de têtes IA", included: false, tooltip: "Recherche proactive de talents rares par intelligence artificielle (disponible en formule Enterprise)" },
      pro: { name: "Chasse de têtes IA", included: false, tooltip: "Recherche proactive de talents rares par intelligence artificielle (disponible en formule Enterprise)" },
      enterprise: { name: "Chasse de têtes IA", included: true, highlight: true, tooltip: "L'IA recherche activement dans toute la CVthèque les talents rares correspondant à vos critères" },
    },
    {
      id: "support",
      essentiel: { name: "Support email sous 48h", included: true, tooltip: "Notre équipe vous répond par email dans les 48h" },
      pro: { name: "Support prioritaire (email + chat)", included: true, tooltip: "Assistance rapide par chat en direct et email avec réponse sous 4h" },
      enterprise: { name: "Support 24/7 prioritaire (téléphone)", included: true, tooltip: "Assistance téléphonique disponible 24h/24 et 7j/7 avec réponse immédiate" },
    },
    {
      id: "multiuser",
      essentiel: { name: "Gestion multi-utilisateurs", included: false, tooltip: "Ajoutez des membres de votre équipe RH (disponible en formule Pro)" },
      pro: { name: "Gestion multi-utilisateurs", included: true, details: "Jusqu'à 5 comptes", tooltip: "Ajoutez jusqu'à 5 membres de votre équipe RH avec accès personnalisé" },
      enterprise: { name: "Gestion multi-utilisateurs illimitée", included: true, tooltip: "Nombre illimité de comptes pour votre équipe RH avec permissions personnalisées" },
    },
    {
      id: "api",
      essentiel: { name: "Intégration API et SSO", included: false, tooltip: "Connectez Irelis à vos outils RH existants (disponible en formule Enterprise)" },
      pro: { name: "Intégration API et SSO", included: false, tooltip: "Connectez Irelis à vos outils RH existants (disponible en formule Enterprise)" },
      enterprise: { name: "Intégration API et SSO", included: true, tooltip: "Connectez Irelis à vos outils RH existants (SIRH, ERP) et authentification unique pour votre équipe" },
    },
    {
      id: "branding",
      essentiel: { name: "Branding entreprise personnalisé", included: false, tooltip: "Pages carrières aux couleurs de votre entreprise (disponible en formule Enterprise)" },
      pro: { name: "Branding entreprise personnalisé", included: false, tooltip: "Pages carrières aux couleurs de votre entreprise (disponible en formule Enterprise)" },
      enterprise: { name: "Branding entreprise personnalisé", included: true, tooltip: "Pages carrières aux couleurs de votre entreprise avec logo et charte graphique" },
    },
    {
      id: "formation",
      essentiel: { name: "Formation équipe RH incluse", included: false, tooltip: "Sessions de formation pour maîtriser les fonctionnalités (disponible en formule Enterprise)" },
      pro: { name: "Formation équipe RH incluse", included: false, tooltip: "Sessions de formation pour maîtriser les fonctionnalisités (disponible en formule Enterprise)" },
      enterprise: { name: "Formation équipe RH incluse", included: true, tooltip: "Sessions de formation en ligne ou en présentiel pour maîtriser toutes les fonctionnalités" },
    },
    {
      id: "manager",
      essentiel: { name: "Account manager dédié", included: false, tooltip: "Conseiller RH personnel pour vous accompagner (disponible en formule Enterprise)" },
      pro: { name: "Account manager dédié", included: false, tooltip: "Conseiller RH personnel pour vous accompagner (disponible en formule Enterprise)" },
      enterprise: { name: "Account manager dédié", included: true, highlight: true, tooltip: "Conseiller RH personnel disponible pour vous accompagner dans votre stratégie de recrutement" },
    },
    {
      id: "sla",
      essentiel: { name: "SLA garanti 99.9%", included: false, tooltip: "Garantie de disponibilité de la plateforme (disponible en formule Enterprise)" },
      pro: { name: "SLA garanti 99.9%", included: false, tooltip: "Garantie de disponibilité de la plateforme (disponible en formule Enterprise)" },
      enterprise: { name: "SLA garanti 99.9%", included: true, tooltip: "Garantie de disponibilité de la plateforme à 99,9% avec compensation en cas d'indisponibilité" },
    },
  ];

  const plans: SubscriptionPlan[] = [
    {
      name: "Formule Essentiel",
      price: billingCycle === "monthly" ? "49 500 FCFA" : "475 200 FCFA",
      priceDetails: billingCycle === "monthly" ? "/mois" : "/an (économisez 118 800 FCFA)",
      description: "Pour les PME et startups qui recrutent occasionnellement",
      icon: <Star className="w-6 h-6 text-blue-600" />,
      buttonText: "Démarrer",
      buttonVariant: "outline",
      features: allFeatures.map(f => f.essentiel).sort((a, b) => (b.included ? 1 : 0) - (a.included ? 1 : 0)),
    },
    {
      name: "Formule Pro",
      price: billingCycle === "monthly" ? "94 500 FCFA" : "907 200 FCFA",
      priceDetails: billingCycle === "monthly" ? "/mois" : "/an (économisez 226 800 FCFA)",
      description: "Pour les entreprises en croissance avec besoins réguliers",
      icon: <Zap className="w-6 h-6 text-orange-600" />,
      badge: "Le plus populaire",
      badgeColor: "bg-orange-500",
      buttonText: "Choisir Pro",
      buttonVariant: "default",
      highlight: true,
      features: allFeatures.map(f => f.pro).sort((a, b) => (b.included ? 1 : 0) - (a.included ? 1 : 0)),
    },
    {
      name: "Formule Enterprise",
      price: billingCycle === "monthly" ? "199 500 FCFA" : "1 915 200 FCFA",
      priceDetails: billingCycle === "monthly" ? "/mois" : "/an (économisez 478 800 FCFA)",
      description: "Solution sur mesure pour grandes entreprises et cabinets RH",
      icon: <Crown className="w-6 h-6 text-purple-600" />,
      badge: "Premium",
      badgeColor: "bg-purple-600",
      buttonText: "Nous contacter",
      buttonVariant: "outline",
      features: allFeatures.map(f => f.enterprise).sort((a, b) => (b.included ? 1 : 0) - (a.included ? 1 : 0)),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Abonnements et tarifs</h1>
        <p className="text-muted-foreground">
          Choisissez la formule adaptée à vos besoins de recrutement
        </p>
      </div>

      {/* Toggle facturation mensuelle/annuelle */}
      <div className="flex items-center justify-center gap-4 p-4 bg-muted/50 rounded-lg">
        <button
          onClick={() => setBillingCycle("monthly")}
          className={`px-6 py-2 rounded-lg transition-all ${
            billingCycle === "monthly"
              ? "bg-primary text-white"
              : "bg-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Mensuel
        </button>
        <button
          onClick={() => setBillingCycle("annual")}
          className={`px-6 py-2 rounded-lg transition-all ${
            billingCycle === "annual"
              ? "bg-primary text-white"
              : "bg-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Annuel
          <Badge className="ml-2 bg-green-600 hover:bg-green-600">-20%</Badge>
        </button>
      </div>

      {/* Grille des formules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`relative ${
              plan.highlight
                ? "border-2 border-primary shadow-lg scale-105"
                : "border"
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className={`${plan.badgeColor} text-white px-4 py-1`}>
                  {plan.badge}
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-3">{plan.icon}</div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <p className="text-3xl font-bold">{plan.price}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.priceDetails}
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {plan.description}
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <Button
                variant={plan.buttonVariant}
                className={`w-full ${
                  plan.highlight ? "bg-primary hover:bg-primary/90" : ""
                }`}
              >
                {plan.buttonText}
              </Button>

              <div className="space-y-3 pt-4 border-t">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          feature.highlight ? "text-primary" : "text-green-600"
                        }`}
                      />
                    ) : (
                      <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-300" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-sm ${
                            feature.included
                              ? feature.highlight
                                ? "font-semibold text-primary"
                                : "text-foreground"
                              : "text-muted-foreground line-through"
                          }`}
                        >
                          {feature.name}
                        </p>
                        {feature.tooltip && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help flex-shrink-0" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-[250px]">
                                <p className="text-sm">{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      {feature.details && feature.included && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {feature.details}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Section FAQ/Informations complémentaires */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Informations importantes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Modes de paiement acceptés</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Mobile Money (MTN Mobile Money, Orange Money)</li>
                <li>• Carte bancaire (Visa, Mastercard)</li>
                <li>• Virement bancaire pour formule Enterprise</li>
                <li>• Paiement à la facture (sur demande)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Garanties incluses</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Annulation sans frais sous 14 jours</li>
                <li>• Remboursement si aucun candidat qualifié</li>
                <li>• Changement de formule à tout moment</li>
                <li>• Support technique inclus</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section contact pour Enterprise */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Besoin d'une solution sur mesure ?</h3>
              <p className="text-sm text-muted-foreground">
                Notre équipe est disponible pour vous accompagner et créer une formule adaptée à vos besoins spécifiques.
              </p>
            </div>
            <Button className="flex items-center gap-2">
              Contactez-nous
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}