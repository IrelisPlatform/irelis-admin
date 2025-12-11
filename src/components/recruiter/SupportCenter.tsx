// src/components/recruiter/SupportCenter.tsx

"use client";

import { useState } from "react";
import {
  Search,
  Book,
  Video,
  MessageCircle,
  PhoneCall,
  Mail,
  HelpCircle,
  FileText,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

// ✅ Stub du composant manquant
function CallbackRequest() {
  const requestCallback = () => {
    toast.success("Demande de rappel envoyée ! Un conseiller vous contactera sous 2h.");
  };

  return (
    <Button size="sm" onClick={requestCallback}>
      Demander un rappel
    </Button>
  );
}

const faqs = [
  {
    category: "Création d'offres",
    questions: [
      {
        q: "Comment créer une nouvelle offre d'emploi ?",
        a: "Pour créer une nouvelle offre, cliquez sur le bouton 'Nouvelle offre' dans la section 'Mes offres'. Remplissez tous les champs requis (titre, description, localisation, etc.) et cliquez sur 'Créer l'offre'.",
      },
      {
        q: "Puis-je programmer la publication d'une offre ?",
        a: "Oui, lors de la création d'une offre, vous pouvez choisir de la publier immédiatement ou de programmer sa publication à une date ultérieure.",
      },
      {
        q: "Comment ajouter des questions de présélection ?",
        a: "Dans le formulaire de création d'offre, vous trouverez une section 'Questions de présélection' où vous pouvez ajouter des questions personnalisées pour filtrer les candidatures.",
      },
    ],
  },
  {
    category: "Gestion des candidatures",
    questions: [
      {
        q: "Comment filtrer les candidatures reçues ?",
        a: "Utilisez les filtres en haut du tableau des candidatures pour trier par statut, poste, localisation ou autres critères. Vous pouvez également utiliser la barre de recherche pour trouver un candidat spécifique.",
      },
      {
        q: "Quels sont les différents statuts de candidature ?",
        a: "Les statuts disponibles sont : Nouveau, Examiné, Entretien, Offre et Refusé. Vous pouvez changer le statut d'un candidat en cliquant sur le menu d'actions.",
      },
      {
        q: "Comment planifier un entretien avec un candidat ?",
        a: "Dans la messagerie ou depuis la fiche candidat, cliquez sur 'Planifier entretien'. Choisissez le type d'entretien, la date, l'heure et envoyez l'invitation.",
      },
    ],
  },
  {
    category: "CVthèque & Sourcing",
    questions: [
      {
        q: "Comment accéder à la CVthèque Irelis ?",
        a: "Accédez à la section 'Candidats & Sourcing' puis cliquez sur l'onglet 'CVthèque Irelis'. Utilisez les filtres avancés pour affiner votre recherche par compétences, expérience, localisation, etc.",
      },
      {
        q: "Qu'est-ce que le score de matching ?",
        a: "Le score de matching est un pourcentage qui indique la pertinence d'un profil par rapport aux critères de votre recherche. Plus le score est élevé, plus le candidat correspond à vos besoins.",
      },
      {
        q: "Comment inviter un candidat à postuler ?",
        a: "Depuis la CVthèque Irelis, cliquez sur 'Inviter à postuler' (fonctionnalité Premium). Sélectionnez l'offre concernée et personnalisez votre message d'invitation. Le candidat recevra votre invitation directement.",
      },
      {
        q: "Quelle est la différence entre candidatures reçues et CVthèque ?",
        a: "Les candidatures reçues sont les candidats qui ont postulé spontanément à vos offres. La CVthèque Irelis vous permet de rechercher proactivement des profils qualifiés qui n'ont pas encore postulé, et de les inviter à candidater.",
      },
    ],
  },
  {
    category: "Collaboration et équipe",
    questions: [
      {
        q: "Comment ajouter un membre à mon équipe ?",
        a: "Dans la section 'Gestion d'équipe', cliquez sur 'Ajouter un membre'. Renseignez ses informations et choisissez son rôle (Administrateur, Recruteur, Manager ou Lecteur).",
      },
      {
        q: "Quelles sont les différences entre les rôles ?",
        a: "Les Administrateurs ont tous les droits. Les Recruteurs peuvent créer et gérer leurs offres. Les Managers peuvent superviser toutes les offres. Les Lecteurs ont un accès en lecture seule.",
      },
    ],
  },
  {
    category: "Statistiques et rapports",
    questions: [
      {
        q: "Comment exporter mes données ?",
        a: "Dans la plupart des tableaux, vous trouverez un bouton 'Exporter' qui vous permet de télécharger les données au format Excel ou PDF.",
      },
      {
        q: "Puis-je personnaliser mes rapports ?",
        a: "Oui, dans la section Statistiques, vous pouvez créer des rapports personnalisés en sélectionnant les métriques qui vous intéressent et la période souhaitée.",
      },
    ],
  },
];

const tutorials = [
  {
    title: "Premiers pas avec Irelis Recruteur",
    duration: "5 min",
    type: "video",
    description: "Découvrez les fonctionnalités principales de la plateforme",
  },
  {
    title: "Créer une offre d'emploi efficace",
    duration: "8 min",
    type: "video",
    description: "Apprenez à rédiger une offre attractive et optimisée",
  },
  {
    title: "Utiliser la CVthèque Irelis",
    duration: "10 min",
    type: "video",
    description: "Maîtrisez la recherche avancée de candidats et le sourcing proactif",
  },
  {
    title: "Gérer les candidatures efficacement",
    duration: "7 min",
    type: "video",
    description: "Optimisez votre processus de sélection",
  },
  {
    title: "Analyser vos performances de recrutement",
    duration: "6 min",
    type: "video",
    description: "Utilisez les statistiques pour améliorer vos résultats",
  },
];

const resources = [
  {
    title: "Guide complet de l'utilisateur",
    icon: Book,
    description: "Documentation complète de toutes les fonctionnalités",
  },
  {
    title: "Meilleures pratiques de recrutement",
    icon: FileText,
    description: "Conseils pour optimiser votre stratégie de recrutement",
  },
  {
    title: "Guide de conformité RGPD",
    icon: FileText,
    description: "Tout ce qu'il faut savoir sur la protection des données",
  },
  {
    title: "Optimiser vos annonces",
    icon: FileText,
    description: "Techniques pour augmenter la visibilité de vos offres",
  },
];

export function SupportCenter() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.a.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1>Centre d'aide & Support</h1>
        <p className="text-muted-foreground">
          Trouvez des réponses à vos questions et optimisez votre utilisation
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:border-primary cursor-pointer transition-colors">
          <CardContent className="p-6">
            <MessageCircle className="h-8 w-8 text-primary mb-3" />
            <h3>Chat en direct</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Discutez avec notre équipe support
            </p>
            <Button variant="link" className="p-0 mt-3">
              Démarrer une conversation <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-primary cursor-pointer transition-colors">
          <CardContent className="p-6">
            <Mail className="h-8 w-8 text-primary mb-3" />
            <h3>Support par email</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Réponse sous 24h
            </p>
            <Button variant="link" className="p-0 mt-3">
              support@ireliscameroun.com <ExternalLink className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-primary transition-colors">
          <CardContent className="p-6">
            <PhoneCall className="h-8 w-8 text-primary mb-3" />
            <h3>Demander un rappel</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Nous vous rappelons sous 2h
            </p>
            <div className="mt-3">
              <CallbackRequest />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="tutorials">
            <Video className="h-4 w-4 mr-2" />
            Tutoriels
          </TabsTrigger>
          <TabsTrigger value="resources">
            <Book className="h-4 w-4 mr-2" />
            Ressources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans la FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* FAQ Categories */}
          {filteredFaqs.length > 0 ? (
            <div className="space-y-6">
              {filteredFaqs.map((category) => (
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((question, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger>{question.q}</AccordionTrigger>
                          <AccordionContent>{question.a}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  Aucune question trouvée. Essayez une autre recherche ou contactez notre support.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="hover:border-primary cursor-pointer transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Video className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3>{tutorial.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {tutorial.description}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">{tutorial.duration}</Badge>
                        <Button variant="link" className="p-0">
                          Regarder <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card key={index} className="hover:border-primary cursor-pointer transition-colors">
                  <CardContent className="p-6">
                    <Icon className="h-8 w-8 text-primary mb-3" />
                    <h3>{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {resource.description}
                    </p>
                    <Button variant="link" className="p-0 mt-3">
                      Télécharger <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Besoin d'aide personnalisée ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Notre équipe peut vous accompagner pour optimiser votre utilisation de la plateforme et améliorer vos résultats de recrutement.
              </p>
              <Button>
                Demander une formation personnalisée
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}