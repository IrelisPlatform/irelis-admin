// src/components/recruiter/QuestionsEntretien.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function QuestionsEntretien() {
  const categories = [
    {
      name: "Questions générales",
      questions: [
        {
          question: "Parlez-moi de votre parcours professionnel",
          objectif: "Évaluer la cohérence du parcours et la capacité de synthèse",
          bonneReponse: "Réponse structurée, chronologique, mettant en avant les expériences pertinentes pour le poste"
        },
        {
          question: "Pourquoi souhaitez-vous travailler dans notre entreprise",
          objectif: "Mesurer la motivation et l'intérêt réel pour l'entreprise",
          bonneReponse: "Connaissance de l'entreprise, alignement avec les valeurs, objectifs de carrière cohérents"
        },
        {
          question: "Quels sont vos points forts et vos axes d'amélioration",
          objectif: "Évaluer la connaissance de soi et la capacité d'auto-critique",
          bonneReponse: "Points forts pertinents pour le poste, axes d'amélioration honnêtes avec plan d'action"
        },
        {
          question: "Où vous voyez-vous dans 5 ans",
          objectif: "Comprendre les ambitions et la projection professionnelle",
          bonneReponse: "Objectifs réalistes, désir d'évolution dans l'entreprise, cohérence avec le poste"
        }
      ]
    },
    {
      name: "Compétences techniques",
      questions: [
        {
          question: "Décrivez une situation où vous avez utilisé cette compétence technique",
          objectif: "Vérifier la maîtrise concrète d'une compétence annoncée",
          bonneReponse: "Exemple précis, contexte clair, résultat mesurable, apprentissage tiré"
        },
        {
          question: "Comment vous formez-vous pour rester à jour dans votre domaine",
          objectif: "Évaluer la capacité d'apprentissage et la curiosité professionnelle",
          bonneReponse: "Démarche active de formation, ressources variées, exemples concrets récents"
        },
        {
          question: "Avez-vous déjà formé ou encadré quelqu'un dans cette compétence",
          objectif: "Mesurer le niveau d'expertise et la capacité de transmission",
          bonneReponse: "Expérience de transmission, pédagogie, résultats obtenus par la personne formée"
        }
      ]
    },
    {
      name: "Comportement et savoir-être",
      questions: [
        {
          question: "Racontez une situation de conflit que vous avez gérée",
          objectif: "Évaluer la gestion des conflits et l'intelligence émotionnelle",
          bonneReponse: "Situation concrète, écoute active, recherche de solution, résolution constructive"
        },
        {
          question: "Comment réagissez-vous face à une critique ou un échec",
          objectif: "Mesurer la résilience et la capacité de remise en question",
          bonneReponse: "Acceptation constructive, analyse des causes, mise en place d'actions correctives"
        },
        {
          question: "Décrivez une situation où vous avez travaillé en équipe",
          objectif: "Évaluer l'esprit d'équipe et la collaboration",
          bonneReponse: "Rôle clair dans l'équipe, contribution active, reconnaissance du travail collectif"
        },
        {
          question: "Comment gérez-vous les priorités quand vous avez plusieurs tâches urgentes",
          objectif: "Mesurer l'organisation et la gestion du stress",
          bonneReponse: "Méthode de priorisation claire, communication avec hiérarchie, gestion réaliste"
        }
      ]
    },
    {
      name: "Motivation et engagement",
      questions: [
        {
          question: "Qu'est-ce qui vous motive le plus dans votre travail",
          objectif: "Comprendre les leviers de motivation du candidat",
          bonneReponse: "Motivations alignées avec le poste et la culture d'entreprise"
        },
        {
          question: "Pourquoi avez-vous quitté ou souhaitez quitter votre poste actuel",
          objectif: "Identifier les raisons du changement et détecter d'éventuels signaux",
          bonneReponse: "Raisons positives et constructives, pas de critique excessive de l'ancien employeur"
        },
        {
          question: "Quelles sont vos attentes vis-à-vis de ce poste",
          objectif: "Vérifier l'adéquation entre les attentes et ce que l'entreprise peut offrir",
          bonneReponse: "Attentes réalistes, alignées avec le poste, ouverture à la négociation"
        }
      ]
    },
    {
      name: "Questions spécifiques secteur",
      metiers: [
        {
          secteur: "Commerce et vente",
          questions: [
            "Comment abordez-vous un client difficile ou mécontent",
            "Décrivez votre meilleure vente et ce qui l'a rendue réussie",
            "Comment gérez-vous le refus ou l'objection d'un client",
            "Quelles techniques utilisez-vous pour atteindre vos objectifs de vente"
          ]
        },
        {
          secteur: "Artisanat et métiers manuels",
          questions: [
            "Décrivez votre processus de travail du début à la fin d'un projet",
            "Comment assurez-vous la qualité de votre travail",
            "Avez-vous déjà dû résoudre un problème technique complexe",
            "Comment gérez-vous les délais serrés tout en maintenant la qualité"
          ]
        },
        {
          secteur: "Santé et services",
          questions: [
            "Comment gérez-vous une situation d'urgence ou de stress",
            "Décrivez une situation où vous avez fait preuve d'empathie",
            "Comment maintenez-vous la confidentialité et le respect des patients",
            "Comment travaillez-vous en équipe pluridisciplinaire"
          ]
        },
        {
          secteur: "Restauration",
          questions: [
            "Comment gérez-vous les pics d'activité et la pression en cuisine",
            "Décrivez votre expérience avec les normes d'hygiène et de sécurité",
            "Comment réagissez-vous à une plainte client sur un plat",
            "Avez-vous déjà créé ou adapté une recette avec succès"
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Base de questions d'entretien</h1>
        <p className="text-muted-foreground">Préparez des entretiens structurés avec des questions adaptées à chaque profil</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-3 lg:grid-cols-5 gap-2">
          <TabsTrigger value="general">Générales</TabsTrigger>
          <TabsTrigger value="technique">Techniques</TabsTrigger>
          <TabsTrigger value="comportement">Comportement</TabsTrigger>
          <TabsTrigger value="motivation">Motivation</TabsTrigger>
          <TabsTrigger value="secteur">Par secteur</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Questions générales d'entretien</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories[0].questions.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold flex-1">{item.question}</h3>
                    <Button size="sm" variant="outline">Ajouter</Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Objectif</p>
                      <p>{item.objectif}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ce qu'on attend comme réponse</p>
                      <p>{item.bonneReponse}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technique" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Questions sur les compétences techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories[1].questions.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold flex-1">{item.question}</h3>
                    <Button size="sm" variant="outline">Ajouter</Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Objectif</p>
                      <p>{item.objectif}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ce qu'on attend comme réponse</p>
                      <p>{item.bonneReponse}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comportement" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Questions comportementales et savoir-être</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories[2].questions.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold flex-1">{item.question}</h3>
                    <Button size="sm" variant="outline">Ajouter</Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Objectif</p>
                      <p>{item.objectif}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ce qu'on attend comme réponse</p>
                      <p>{item.bonneReponse}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="motivation" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Questions sur la motivation et l'engagement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories[3].questions.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold flex-1">{item.question}</h3>
                    <Button size="sm" variant="outline">Ajouter</Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Objectif</p>
                      <p>{item.objectif}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ce qu'on attend comme réponse</p>
                      <p>{item.bonneReponse}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="secteur" className="space-y-4 mt-6">
          {categories[4].metiers.map((metier, metierIdx) => (
            <Card key={metierIdx}>
              <CardHeader>
                <CardTitle>{metier.secteur}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {metier.questions.map((question, qIdx) => (
                  <div key={qIdx} className="flex items-start justify-between gap-4 border rounded-lg p-3">
                    <p className="flex-1">{question}</p>
                    <Button size="sm" variant="outline">Ajouter</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Créer votre grille d'entretien personnalisée</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Poste concerné</label>
            <Input placeholder="Ex: Vendeur en boutique" />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Questions sélectionnées</label>
            <div className="border rounded-lg p-4 min-h-32 space-y-2">
              <p className="text-sm text-muted-foreground">Cliquez sur Ajouter à côté des questions pour créer votre grille</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">Enregistrer la grille</Button>
            <Button variant="outline">Télécharger PDF</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}