// src/components/recruiter/ModelesAnnonces.tsx

// src/components/recruiter/ModelesAnnonces.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

export function ModelesAnnonces() {
  const templates = [
    {
      category: "Commerce et vente",
      jobs: [
        {
          title: "Vendeur en boutique",
          description: "Recherchons vendeur dynamique pour boutique de prêt-à-porter située à Dakar. Accueil clients, conseil, encaissement.",
          profile: "Niveau BAC minimum, expérience 2 ans en vente, excellent relationnel, présentation soignée.",
          conditions: "CDI, salaire 150 000 FCFA + commissions, 6 jours/semaine, mutuelle santé."
        },
        {
          title: "Commercial terrain",
          description: "Entreprise agroalimentaire cherche commercial pour développer portefeuille clients dans la région de l'Est.",
          profile: "BAC+2 commercial, permis B obligatoire, expérience 3 ans en vente BtoB, connaissance du secteur alimentaire.",
          conditions: "CDD 12 mois renouvelable, fixe 200 000 FCFA + primes sur objectifs, véhicule de fonction."
        }
      ]
    },
    {
      category: "Artisanat et métiers manuels",
      jobs: [
        {
          title: "Maçon chef d'équipe",
          description: "Société de construction recherche chef d'équipe maçonnerie pour chantiers résidentiels et commerciaux.",
          profile: "CAP maçonnerie ou équivalent, 5 ans d'expérience minimum, capacité à encadrer une équipe de 5 personnes.",
          conditions: "CDI, 180 000 FCFA/mois, primes de chantier, équipements fournis, transport assuré."
        },
        {
          title: "Couturière qualifiée",
          description: "Atelier de confection haut de gamme recrute couturière expérimentée pour réalisation sur mesure.",
          profile: "Formation couture professionnelle, 3 ans d'expérience, maîtrise machine industrielle, sens du détail.",
          conditions: "CDI, rémunération selon production, 5 jours/semaine, formation continue aux nouvelles techniques."
        }
      ]
    },
    {
      category: "Santé et services",
      jobs: [
        {
          title: "Infirmier diplômé d'État",
          description: "Clinique privée cherche IDE pour service médecine générale et urgences. Travail en rotation jour/nuit.",
          profile: "Diplôme IDE reconnu, inscription à l'Ordre, 2 ans d'expérience minimum, maîtrise des soins d'urgence.",
          conditions: "CDI, 250 000 FCFA/mois, primes de garde, assurance maladie, congés payés selon convention collective."
        },
        {
          title: "Aide-soignant",
          description: "Établissement de santé recrute aide-soignant pour assistance aux soins et accompagnement des patients.",
          profile: "Certificat aide-soignant, expérience 1 an souhaitée, patience et empathie, disponibilité horaires variables.",
          conditions: "CDD 6 mois, 120 000 FCFA/mois, possibilité CDI après période d'essai, repas midi fourni."
        }
      ]
    },
    {
      category: "Restauration",
      jobs: [
        {
          title: "Chef cuisinier",
          description: "Restaurant gastronomique recherche chef pour cuisine africaine revisitée et cuisine internationale.",
          profile: "CAP cuisine ou formation équivalente, 5 ans d'expérience en restaurant, créativité, gestion des stocks.",
          conditions: "CDI, 280 000 FCFA/mois, 2 jours repos/semaine, participation aux bénéfices, uniforme fourni."
        },
        {
          title: "Serveur expérimenté",
          description: "Hôtel 4 étoiles cherche serveur pour restaurant et service en salle. Clientèle internationale.",
          profile: "Expérience 2 ans en restauration haut de gamme, français et anglais courants, présentation impeccable.",
          conditions: "CDI, 140 000 FCFA + pourboires, 6 jours/semaine, repas du personnel, formations régulières."
        }
      ]
    },
    {
      category: "Agriculture",
      jobs: [
        {
          title: "Agronome maraîchage",
          description: "Ferme moderne recrute agronome pour supervision production légumes bio et gestion des équipes agricoles.",
          profile: "BAC+3 agronomie, 3 ans d'expérience cultures maraîchères, connaissance agriculture biologique, leadership.",
          conditions: "CDI, 300 000 FCFA/mois, logement sur site possible, participation récoltes, véhicule de service."
        }
      ]
    },
    {
      category: "Bureautique et administration",
      jobs: [
        {
          title: "Secrétaire polyvalent",
          description: "PME dynamique cherche secrétaire pour accueil, gestion administrative et assistanat de direction.",
          profile: "BAC+2 secrétariat, maîtrise Pack Office, français impeccable écrit et oral, 2 ans d'expérience.",
          conditions: "CDI, 180 000 FCFA/mois, horaires de bureau 8h-17h, mutuelle santé, prime de fin d'année."
        },
        {
          title: "Assistant comptable",
          description: "Cabinet comptable recrute assistant pour saisie, rapprochements bancaires et déclarations fiscales.",
          profile: "BAC+2 comptabilité, logiciels de compta (Sage, Ciel), rigueur, discrétion, 1 an d'expérience minimum.",
          conditions: "CDD 12 mois, 200 000 FCFA/mois, possibilité CDI, formations logiciels, environnement dynamique."
        }
      ]
    }
  ];

  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1>Modèles d'annonces personnalisables</h1>
        <p className="text-muted-foreground">Gagnez du temps avec nos modèles pré-rédigés adaptés au marché africain</p>
      </div>

      <Tabs defaultValue="templates">
        <TabsList>
          <TabsTrigger value="templates">Bibliothèque de modèles</TabsTrigger>
          <TabsTrigger value="create">Créer une annonce</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6 mt-6">
          {templates.map((category, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.jobs.map((job, jobIdx) => (
                  <div key={jobIdx} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{job.title}</h3>
                      <Button size="sm" onClick={() => setSelectedTemplate(job)}>Utiliser ce modèle</Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Description du poste</p>
                        <p>{job.description}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Profil recherché</p>
                        <p>{job.profile}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Conditions</p>
                        <p>{job.conditions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="create" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Créer une nouvelle annonce</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Catégorie de métier</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="commerce">Commerce et vente</SelectItem>
                    <SelectItem value="artisanat">Artisanat et métiers manuels</SelectItem>
                    <SelectItem value="sante">Santé et services</SelectItem>
                    <SelectItem value="restauration">Restauration</SelectItem>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="bureau">Bureautique et administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Titre du poste</Label>
                <Input placeholder="Ex: Vendeur en boutique de mode" />
              </div>

              <div className="space-y-2">
                <Label>Description du poste</Label>
                <Textarea rows={4} placeholder="Décrivez les missions principales du poste..." />
              </div>

              <div className="space-y-2">
                <Label>Profil recherché</Label>
                <Textarea rows={4} placeholder="Formation, expérience, compétences requises..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type de contrat</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cdi">CDI</SelectItem>
                      <SelectItem value="cdd">CDD</SelectItem>
                      <SelectItem value="stage">Stage</SelectItem>
                      <SelectItem value="apprentissage">Apprentissage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Fourchette de salaire (optionnel)</Label>
                  <Input placeholder="Ex: 150 000 - 200 000 FCFA ou À négocier" />
                  <p className="text-xs text-muted-foreground">
                    Non obligatoire - Laissez vide si non communiqué
                  </p>
                </div>
              </div>

              <div className="space-y-3 border rounded-lg p-4 bg-muted/30">
                <div className="flex items-start space-x-3">
                  <Checkbox id="anti-scam" className="mt-1" />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="anti-scam" className="cursor-pointer flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <span>Activer le message anti-arnaque pour cette offre</span>
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Un message de sécurité sera affiché aux candidats pour éviter qu'un malfaiteur se fasse passer pour votre entreprise. Recommandé pour toutes les offres.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Avantages et conditions</Label>
                <Textarea rows={3} placeholder="Primes, mutuelle, transport, horaires..." />
              </div>

              <div className="space-y-2">
                <Label>Lieu de travail</Label>
                <Input placeholder="Ex: Dakar, Plateau" />
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1">Publier l'annonce</Button>
                <Button variant="outline">Enregistrer comme brouillon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedTemplate && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Modèle sélectionné</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Catégorie de métier</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commerce">Commerce et vente</SelectItem>
                  <SelectItem value="artisanat">Artisanat et métiers manuels</SelectItem>
                  <SelectItem value="sante">Santé et services</SelectItem>
                  <SelectItem value="restauration">Restauration</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="bureau">Bureautique et administration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Titre du poste</Label>
              <Input placeholder="Ex: Vendeur en boutique de mode" value={selectedTemplate.title} />
            </div>

            <div className="space-y-2">
              <Label>Description du poste</Label>
              <Textarea rows={4} placeholder="Décrivez les missions principales du poste..." value={selectedTemplate.description} />
            </div>

            <div className="space-y-2">
              <Label>Profil recherché</Label>
              <Textarea rows={4} placeholder="Formation, expérience, compétences requises..." value={selectedTemplate.profile} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type de contrat</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cdi">CDI</SelectItem>
                    <SelectItem value="cdd">CDD</SelectItem>
                    <SelectItem value="stage">Stage</SelectItem>
                    <SelectItem value="apprentissage">Apprentissage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fourchette de salaire (optionnel)</Label>
                <Input placeholder="Ex: 150 000 - 200 000 FCFA ou À négocier" />
                <p className="text-xs text-muted-foreground">
                  Non obligatoire - Laissez vide si non communiqué
                </p>
              </div>
            </div>

            <div className="space-y-3 border rounded-lg p-4 bg-muted/30">
              <div className="flex items-start space-x-3">
                <Checkbox id="anti-scam" className="mt-1" />
                <div className="flex-1 space-y-1">
                  <Label htmlFor="anti-scam" className="cursor-pointer flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <span>Activer le message anti-arnaque pour cette offre</span>
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Un message de sécurité sera affiché aux candidats pour éviter qu'un malfaiteur se fasse passer pour votre entreprise. Recommandé pour toutes les offres.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Avantages et conditions</Label>
              <Textarea rows={3} placeholder="Primes, mutuelle, transport, horaires..." value={selectedTemplate.conditions} />
            </div>

            <div className="space-y-2">
              <Label>Lieu de travail</Label>
              <Input placeholder="Ex: Dakar, Plateau" />
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1">Publier l'annonce</Button>
              <Button variant="outline">Enregistrer comme brouillon</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}