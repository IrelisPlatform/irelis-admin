// src/components/recruiter/OutilTriScoring.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

export function OutilTriScoring() {
  const candidatures = [
    {
      nom: "Aminata Ndiaye",
      poste: "Vendeur en boutique",
      score: 92,
      criteres: {
        experience: 95,
        formation: 90,
        competences: 88,
        localisation: 100,
        disponibilite: 90
      },
      details: {
        experience: "3 ans en vente prêt-à-porter",
        formation: "BAC + Formation vente",
        localisation: "Dakar Plateau",
        disponibilite: "Immédiate"
      }
    },
    {
      nom: "Moussa Diallo",
      poste: "Vendeur en boutique",
      score: 85,
      criteres: {
        experience: 80,
        formation: 85,
        competences: 90,
        localisation: 80,
        disponibilite: 95
      },
      details: {
        experience: "2 ans en vente chaussures",
        formation: "BAC",
        localisation: "Dakar Ouakam",
        disponibilite: "Immédiate"
      }
    },
    {
      nom: "Fatou Sow",
      poste: "Vendeur en boutique",
      score: 78,
      criteres: {
        experience: 70,
        formation: 80,
        competences: 85,
        localisation: 75,
        disponibilite: 80
      },
      details: {
        experience: "1 an en vente alimentaire",
        formation: "BAC",
        localisation: "Guédiawaye",
        disponibilite: "Préavis 1 mois"
      }
    },
    {
      nom: "Ibrahima Sarr",
      poste: "Vendeur en boutique",
      score: 71,
      criteres: {
        experience: 60,
        formation: 75,
        competences: 80,
        localisation: 70,
        disponibilite: 85
      },
      details: {
        experience: "6 mois stage vente",
        formation: "BAC",
        localisation: "Pikine",
        disponibilite: "Immédiate"
      }
    },
    {
      nom: "Marieme Ba",
      poste: "Vendeur en boutique",
      score: 65,
      criteres: {
        experience: 50,
        formation: 70,
        competences: 75,
        localisation: 65,
        disponibilite: 80
      },
      details: {
        experience: "Aucune expérience vente",
        formation: "BAC en cours",
        localisation: "Rufisque",
        disponibilite: "Immédiate"
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Outil de tri et scoring des candidatures</h1>
        <p className="text-muted-foreground">Évaluez objectivement les candidats selon vos critères prioritaires</p>
      </div>

      <Tabs defaultValue="scoring">
        <TabsList>
          <TabsTrigger value="scoring">Candidats notés</TabsTrigger>
          <TabsTrigger value="criteria">Configurer les critères</TabsTrigger>
        </TabsList>

        <TabsContent value="scoring" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Classement des candidatures pour Vendeur en boutique</CardTitle>
                <Select defaultValue="score">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Score décroissant</SelectItem>
                    <SelectItem value="date">Date de candidature</SelectItem>
                    <SelectItem value="experience">Expérience</SelectItem>
                    <SelectItem value="localisation">Localisation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {candidatures.map((candidat, idx) => (
                <div key={idx} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                        candidat.score >= 85 ? 'bg-green-500' :
                        candidat.score >= 70 ? 'bg-blue-500' :
                        'bg-gray-400'
                      }`}>
                        {candidat.score}
                      </div>
                      <div>
                        <p className="font-semibold">{candidat.nom}</p>
                        <p className="text-sm text-muted-foreground">{candidat.poste}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Voir le CV</Button>
                      <Button size="sm">Contacter</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Expérience</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-secondary rounded-full h-1.5">
                          <div 
                            className="bg-primary rounded-full h-1.5" 
                            style={{ width: `${candidat.criteres.experience}%` }}
                          ></div>
                        </div>
                        <span>{candidat.criteres.experience}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Formation</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-secondary rounded-full h-1.5">
                          <div 
                            className="bg-primary rounded-full h-1.5" 
                            style={{ width: `${candidat.criteres.formation}%` }}
                          ></div>
                        </div>
                        <span>{candidat.criteres.formation}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Compétences</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-secondary rounded-full h-1.5">
                          <div 
                            className="bg-primary rounded-full h-1.5" 
                            style={{ width: `${candidat.criteres.competences}%` }}
                          ></div>
                        </div>
                        <span>{candidat.criteres.competences}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Localisation</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-secondary rounded-full h-1.5">
                          <div 
                            className="bg-primary rounded-full h-1.5" 
                            style={{ width: `${candidat.criteres.localisation}%` }}
                          ></div>
                        </div>
                        <span>{candidat.criteres.localisation}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Disponibilité</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-secondary rounded-full h-1.5">
                          <div 
                            className="bg-primary rounded-full h-1.5" 
                            style={{ width: `${candidat.criteres.disponibilite}%` }}
                          ></div>
                        </div>
                        <span>{candidat.criteres.disponibilite}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm pt-2 border-t">
                    <div>
                      <p className="text-muted-foreground">Expérience</p>
                      <p>{candidat.details.experience}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Formation</p>
                      <p>{candidat.details.formation}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Localisation</p>
                      <p>{candidat.details.localisation}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Disponibilité</p>
                      <p>{candidat.details.disponibilite}</p>
                    </div>
                  </div>

                  {candidat.score >= 85 && (
                    <div className="pt-2">
                      <Badge className="bg-green-100 text-green-800">Candidat recommandé</Badge>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="criteria" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Définir les critères de notation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Expérience professionnelle</Label>
                    <span className="text-sm text-muted-foreground">Pondération : 30%</span>
                  </div>
                  <Slider defaultValue={[30]} max={100} step={5} />
                  <div className="text-sm text-muted-foreground">
                    Nombre d'années d'expérience dans le domaine ou secteur similaire
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Formation et diplômes</Label>
                    <span className="text-sm text-muted-foreground">Pondération : 25%</span>
                  </div>
                  <Slider defaultValue={[25]} max={100} step={5} />
                  <div className="text-sm text-muted-foreground">
                    Niveau d'études et diplômes en adéquation avec le poste
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Compétences techniques</Label>
                    <span className="text-sm text-muted-foreground">Pondération : 20%</span>
                  </div>
                  <Slider defaultValue={[20]} max={100} step={5} />
                  <div className="text-sm text-muted-foreground">
                    Maîtrise des outils, logiciels ou techniques spécifiques au métier
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Localisation géographique</Label>
                    <span className="text-sm text-muted-foreground">Pondération : 15%</span>
                  </div>
                  <Slider defaultValue={[15]} max={100} step={5} />
                  <div className="text-sm text-muted-foreground">
                    Proximité du lieu de travail et facilité de déplacement
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Disponibilité</Label>
                    <span className="text-sm text-muted-foreground">Pondération : 10%</span>
                  </div>
                  <Slider defaultValue={[10]} max={100} step={5} />
                  <div className="text-sm text-muted-foreground">
                    Délai avant prise de poste et compatibilité horaires
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-3">Critères spécifiques au poste</p>
                <div className="space-y-3">
                  <Input placeholder="Ex: Maîtrise du français et de l'anglais" />
                  <Input placeholder="Ex: Permis de conduire catégorie B" />
                  <Input placeholder="Ex: Expérience en gestion d'équipe" />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1">Enregistrer les critères</Button>
                <Button variant="outline">Réinitialiser</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5">
            <CardContent className="p-6">
              <h3 className="mb-3 font-semibold">Comment fonctionne le scoring</h3>
              <div className="space-y-2 text-sm">
                <p>Le système attribue une note sur 100 à chaque candidature en fonction de vos critères.</p>
                <p>Plus un critère a une pondération élevée, plus il influence le score final.</p>
                <p>Score 85-100 : Candidats hautement qualifiés recommandés pour entretien</p>
                <p>Score 70-84 : Candidats qualifiés à considérer selon disponibilités</p>
                <p>Score en dessous de 70 : Profils ne correspondant pas aux exigences prioritaires</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}