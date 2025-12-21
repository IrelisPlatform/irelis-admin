// src/components/recruiter/Multidiffusion.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Multidiffusion() {
  const plateformes = [
    {
      categorie: "Sites d'emploi généralistes africains",
      sites: [
        { nom: "Emploi.sn", pays: "Sénégal", gratuit: true, audience: "Grande", delai: "Immédiat" },
        { nom: "Jumia Jobs Sénégal", pays: "Sénégal", gratuit: true, audience: "Grande", delai: "Immédiat" },
        { nom: "Emploi.ci", pays: "Côte d'Ivoire", gratuit: true, audience: "Grande", delai: "Immédiat" },
        { nom: "Jumia Jobs Côte d'Ivoire", pays: "Côte d'Ivoire", gratuit: true, audience: "Grande", delai: "Immédiat" },
        { nom: "Emploi.cm", pays: "Cameroun", gratuit: true, audience: "Grande", delai: "Immédiat" },
        { nom: "CamerSpace", pays: "Cameroun", gratuit: false, audience: "Grande", delai: "Immédiat" }
      ]
    },
    {
      categorie: "Réseaux sociaux professionnels",
      sites: [
        { nom: "LinkedIn", pays: "International", gratuit: true, audience: "Très grande", delai: "Immédiat" },
        { nom: "Facebook Jobs", pays: "International", gratuit: true, audience: "Très grande", delai: "Immédiat" },
        { nom: "Groupes Facebook sectoriels", pays: "Local", gratuit: true, audience: "Moyenne", delai: "Manuel" },
        { nom: "WhatsApp Business", pays: "Local", gratuit: true, audience: "Ciblée", delai: "Manuel" }
      ]
    },
    {
      categorie: "Sites spécialisés par secteur",
      sites: [
        { nom: "Santé Afrique Jobs", pays: "Multi-pays", gratuit: false, audience: "Moyenne", delai: "24h" },
        { nom: "BTP Recrutement Afrique", pays: "Multi-pays", gratuit: false, audience: "Moyenne", delai: "24h" },
        { nom: "Agri-emploi", pays: "Multi-pays", gratuit: true, audience: "Petite", delai: "48h" },
        { nom: "Commerce Retail Jobs", pays: "Multi-pays", gratuit: false, audience: "Moyenne", delai: "24h" }
      ]
    },
    {
      categorie: "Médias et presse locale",
      sites: [
        { nom: "Journal quotidien Le Soleil", pays: "Sénégal", gratuit: false, audience: "Grande", delai: "3-5 jours" },
        { nom: "Fraternité Matin", pays: "Côte d'Ivoire", gratuit: false, audience: "Grande", delai: "3-5 jours" },
        { nom: "Cameroon Tribune", pays: "Cameroun", gratuit: false, audience: "Grande", delai: "3-5 jours" },
        { nom: "Radio locale annonces emploi", pays: "Local", gratuit: false, audience: "Moyenne", delai: "Manuel" }
      ]
    },
    {
      categorie: "Institutions et organisations",
      sites: [
        { nom: "ANPE locale", pays: "National", gratuit: true, audience: "Grande", delai: "48h" },
        { nom: "Chambre de Commerce", pays: "Local", gratuit: false, audience: "Moyenne", delai: "Manuel" },
        { nom: "Centres de formation professionnelle", pays: "Local", gratuit: true, audience: "Petite", delai: "Manuel" }
      ]
    }
  ];

  const campagnes = [
    {
      poste: "Vendeur en boutique",
      dateCreation: "05/11/2024",
      plateformes: 8,
      candidatures: 42,
      vues: 623,
      statut: "Active"
    },
    {
      poste: "Maçon chef d'équipe",
      dateCreation: "03/11/2024",
      plateformes: 6,
      candidatures: 34,
      vues: 512,
      statut: "Active"
    },
    {
      poste: "Chef cuisinier",
      dateCreation: "01/11/2024",
      plateformes: 5,
      candidatures: 27,
      vues: 387,
      statut: "Terminée"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Module de multidiffusion automatisée</h1>
        <p className="text-muted-foreground">Diffusez vos offres sur plusieurs plateformes simultanément</p>
      </div>

      <Card className="bg-primary/5">
        <CardContent className="p-6">
          <h3 className="mb-3 font-semibold">Avantages de la multidiffusion</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-1">Gain de temps</p>
              <p className="text-muted-foreground">Publiez sur 10+ plateformes en un clic au lieu de le faire manuellement</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Visibilité maximale</p>
              <p className="text-muted-foreground">Touchez un public plus large et diversifié pour trouver les meilleurs talents</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Gestion centralisée</p>
              <p className="text-muted-foreground">Suivez toutes vos publications depuis un seul tableau de bord</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sélectionner les plateformes de diffusion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm">Offre à diffuser</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une offre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vendeur">Vendeur en boutique</SelectItem>
                <SelectItem value="macon">Maçon chef d'équipe</SelectItem>
                <SelectItem value="cuisinier">Chef cuisinier</SelectItem>
                <SelectItem value="infirmier">Infirmier diplômé d'État</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {plateformes.map((categorie, catIdx) => (
            <div key={catIdx} className="space-y-3">
              <h3 className="font-semibold">{categorie.categorie}</h3>
              <div className="space-y-2">
                {categorie.sites.map((site, siteIdx) => (
                  <div key={siteIdx} className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Checkbox id={`site-${catIdx}-${siteIdx}`} />
                      <label htmlFor={`site-${catIdx}-${siteIdx}`} className="cursor-pointer">
                        <p className="font-semibold">{site.nom}</p>
                        <p className="text-sm text-muted-foreground">
                          {site.pays} • Audience: {site.audience} • Délai: {site.delai}
                        </p>
                      </label>
                    </div>
                    {site.gratuit ? (
                      <Badge className="bg-green-100 text-green-800">Gratuit</Badge>
                    ) : (
                      <Badge variant="outline">Payant</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold">Récapitulatif</p>
              <p className="text-sm text-muted-foreground">12 plateformes sélectionnées</p>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1">Lancer la diffusion</Button>
              <Button variant="outline">Enregistrer la sélection</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historique des campagnes de multidiffusion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {campagnes.map((campagne, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold">{campagne.poste}</p>
                    <p className="text-sm text-muted-foreground">Créée le {campagne.dateCreation}</p>
                  </div>
                  <Badge className={
                    campagne.statut === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }>
                    {campagne.statut}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Plateformes</p>
                    <p className="font-semibold">{campagne.plateformes}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Candidatures</p>
                    <p className="font-semibold">{campagne.candidatures}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Vues totales</p>
                    <p className="font-semibold">{campagne.vues}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">Voir détails</Button>
                  <Button size="sm" variant="outline">Re-diffuser</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conseils pour optimiser votre multidiffusion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="p-3 border rounded-lg">
            <p className="font-semibold mb-1">Adaptez le titre selon la plateforme</p>
            <p className="text-muted-foreground">Utilisez des mots-clés pertinents pour chaque canal de diffusion</p>
          </div>
          <div className="p-3 border rounded-lg">
            <p className="font-semibold mb-1">Privilégiez les plateformes locales</p>
            <p className="text-muted-foreground">Pour les métiers manuels, les sites nationaux ont souvent plus d'impact</p>
          </div>
          <div className="p-3 border rounded-lg">
            <p className="font-semibold mb-1">Combinez gratuit et payant</p>
            <p className="text-muted-foreground">Maximisez la visibilité en mixant plateformes gratuites et options premium</p>
          </div>
          <div className="p-3 border rounded-lg">
            <p className="font-semibold mb-1">Suivez les performances</p>
            <p className="text-muted-foreground">Analysez quelles plateformes génèrent le plus de candidatures qualifiées</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}