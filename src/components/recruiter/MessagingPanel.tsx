// /src/components/recruiter/MessagingPanel.tsx

"use client";

// ⚠️ logger non fourni → fallback sur console.log
function loggerInfo(message: string, data?: any) {
  if (typeof window !== "undefined") {
    console.log(`[MessagingPanel] ${message}`, data);
  }
}

import { useState } from "react";
import {
  Send,
  Search,
  Paperclip,
  Video,
  Calendar,
  MoreVertical,
  Star,
  Archive,
  TrendingUp,
  MessageSquare,
  Edit,
  Check,
  X,
  Lightbulb,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  candidateName: string;
  jobTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: string;
}

interface MessageTemplate {
  id: string;
  name: string;
  category: "reponse-candidature" | "invitation-entretien" | "refus" | "acceptation" | "suivi";
  subject: string;
  content: string;
  variables: string[];
}

const conversations: Conversation[] = [
  {
    id: "1",
    candidateName: "Aminata Ndiaye",
    jobTitle: "Maçon Chef d'Équipe",
    lastMessage: "Merci pour votre retour, je suis disponible la semaine prochaine",
    lastMessageTime: "Il y a 10 min",
    unreadCount: 2,
    status: "active",
  },
  {
    id: "2",
    candidateName: "Jean-Paul Mbarga",
    jobTitle: "Vendeur Boutique",
    lastMessage: "Bonjour, pouvez-vous me donner plus d'informations sur le poste ?",
    lastMessageTime: "Il y a 2h",
    unreadCount: 1,
    status: "active",
  },
  {
    id: "3",
    candidateName: "Grace Tchamba",
    jobTitle: "Infirmière DE",
    lastMessage: "Je confirme ma présence pour l'entretien de demain",
    lastMessageTime: "Hier",
    unreadCount: 0,
    status: "active",
  },
  {
    id: "4",
    candidateName: "Kofi Mensah",
    jobTitle: "Chef Cuisinier",
    lastMessage: "Excellente nouvelle ! J'accepte votre proposition",
    lastMessageTime: "Il y a 2 jours",
    unreadCount: 0,
    status: "completed",
  },
];

const messages: Message[] = [
  {
    id: "1",
    senderId: "recruiter",
    text: "Bonjour Aminata, merci pour votre candidature. Nous avons examiné votre profil et nous sommes très intéressés.",
    timestamp: "10:30",
    isRead: true,
  },
  {
    id: "2",
    senderId: "candidate",
    text: "Bonjour ! Merci beaucoup pour votre retour positif. Je suis ravie de cette opportunité.",
    timestamp: "10:35",
    isRead: true,
  },
  {
    id: "3",
    senderId: "recruiter",
    text: "Seriez-vous disponible pour un entretien vidéo la semaine prochaine ?",
    timestamp: "10:40",
    isRead: true,
  },
  {
    id: "4",
    senderId: "candidate",
    text: "Merci pour votre retour, je suis disponible la semaine prochaine",
    timestamp: "14:25",
    isRead: false,
  },
];

const defaultTemplates: MessageTemplate[] = [
  {
    id: "template-1",
    name: "Accusé de réception candidature",
    category: "reponse-candidature",
    subject: "Réception de votre candidature - {poste}",
    content: `Bonjour {prenom},

Nous avons bien reçu votre candidature pour le poste de {poste} chez {entreprise}.

Votre profil a retenu notre attention et nous l'examinons actuellement avec soin. Nous reviendrons vers vous dans les {delai} prochains jours pour vous tenir informé(e) de la suite donnée à votre candidature.

Si vous ne recevez pas de réponse de notre part passé ce délai, veuillez considérer que votre candidature n'a malheureusement pas été retenue pour ce poste.

Nous vous remercions de l'intérêt que vous portez à notre organisation.

Cordialement,
L'équipe RH
{email_contact}`,
    variables: ["{prenom}", "{poste}", "{entreprise}", "{delai}", "{email_contact}"],
  },
  {
    id: "template-2",
    name: "Invitation à un entretien",
    category: "invitation-entretien",
    subject: "Invitation à un entretien - {poste}",
    content: `Bonjour {prenom},

Nous avons le plaisir de vous informer que votre candidature pour le poste de {poste} a retenu notre attention.

Nous souhaiterions vous rencontrer pour un entretien {type_entretien} le {date} à {heure}.

{lieu_ou_lien}

La durée prévue de l'entretien est de {duree}.

Pourriez-vous nous confirmer votre disponibilité ?

Dans l'attente de votre retour, nous vous prions d'agréer nos salutations distinguées.

Cordialement,
{nom_recruteur}
{email_contact}`,
    variables: [
      "{prenom}",
      "{poste}",
      "{type_entretien}",
      "{date}",
      "{heure}",
      "{lieu_ou_lien}",
      "{duree}",
      "{nom_recruteur}",
      "{email_contact}",
    ],
  },
  {
    id: "template-3",
    name: "Refus poli et encourageant",
    category: "refus",
    subject: "Suite à votre candidature - {poste}",
    content: `Bonjour {prenom},

Nous tenons à vous remercier sincèrement pour l'intérêt que vous avez porté à notre organisation et pour le temps consacré à votre candidature pour le poste de {poste}.

Après une étude approfondie de votre profil, nous avons le regret de vous informer que nous ne pouvons pas donner suite à votre candidature pour ce poste précis. Cette décision ne remet nullement en cause la qualité de votre parcours.

Nous conservons votre CV dans notre CVthèque et n'hésiterons pas à vous recontacter si une opportunité correspondant mieux à votre profil se présente.

Nous vous souhaitons plein succès dans vos recherches et votre parcours professionnel.

Cordialement,
L'équipe RH {entreprise}
{email_contact}`,
    variables: ["{prenom}", "{poste}", "{entreprise}", "{email_contact}"],
  },
  {
    id: "template-4",
    name: "Proposition d'embauche",
    category: "acceptation",
    subject: "Proposition d'embauche - {poste}",
    content: `Bonjour {prenom},

C'est avec grand plaisir que nous vous informons que vous avez été retenu(e) pour le poste de {poste} au sein de {entreprise}.

Nous souhaitons vous proposer les conditions suivantes :
- Type de contrat : {type_contrat}
- Rémunération : {salaire}
- Date de démarrage souhaitée : {date_debut}
- Localisation : {lieu}

Vous trouverez ci-joint le contrat de travail détaillé. Nous serions ravis de vous accueillir dans notre équipe !

Pourriez-vous nous confirmer votre acceptation dans les {delai_reponse} prochains jours ?

Nous restons à votre disposition pour toute question.

Félicitations et bienvenue chez {entreprise} !

Cordialement,
{nom_recruteur}
{email_contact}`,
    variables: [
      "{prenom}",
      "{poste}",
      "{entreprise}",
      "{type_contrat}",
      "{salaire}",
      "{date_debut}",
      "{lieu}",
      "{delai_reponse}",
      "{nom_recruteur}",
      "{email_contact}",
    ],
  },
  {
    id: "template-5",
    name: "Demande de documents",
    category: "suivi",
    subject: "Documents complémentaires - {poste}",
    content: `Bonjour {prenom},

Merci pour votre candidature au poste de {poste}.

Afin de poursuivre l'étude de votre dossier, nous aurions besoin des documents suivants :
{liste_documents}

Pourriez-vous nous les transmettre avant le {date_limite} ?

Nous restons disponibles pour toute question.

Cordialement,
L'équipe RH
{email_contact}`,
    variables: ["{prenom}", "{poste}", "{liste_documents}", "{date_limite}", "{email_contact}"],
  },
  {
    id: "template-6",
    name: "Suivi après entretien",
    category: "suivi",
    subject: "Suite à notre entretien - {poste}",
    content: `Bonjour {prenom},

Je vous remercie d'avoir pris le temps de participer à notre entretien pour le poste de {poste} le {date_entretien}.

Nous avons beaucoup apprécié notre échange et votre intérêt pour rejoindre {entreprise}.

Nous finalisons actuellement notre processus de recrutement et reviendrons vers vous d'ici {delai} avec notre décision.

Si vous avez des questions entre-temps, n'hésitez pas à nous contacter.

Cordialement,
{nom_recruteur}
{email_contact}`,
    variables: [
      "{prenom}",
      "{poste}",
      "{date_entretien}",
      "{entreprise}",
      "{delai}",
      "{nom_recruteur}",
      "{email_contact}",
    ],
  },
];

export function MessagingPanel() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [templates, setTemplates] = useState<MessageTemplate[]>(defaultTemplates);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Disclaimer anti-arnaque automatique
  const antiScamDisclaimer = `\n\n⚠️ IMPORTANT - MESSAGE DE SÉCURITÉ IRELIS\nIrelis et ses partenaires ne demandent JAMAIS d'argent pour un recrutement. Aucun frais de dossier, frais de formation ou caution n'est requis. Si on vous demande de payer, c'est une ARNAQUE. Signalez-le immédiatement à recrutement@ireliscameroun.com`;

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Ajouter automatiquement le disclaimer anti-arnaque
      const messageWithDisclaimer = messageText + antiScamDisclaimer;
      
      // ✅ Correction : utiliser console.log temporairement
      loggerInfo("Message envoyé", { 
        hasDisclaimer: true, 
        length: messageWithDisclaimer.length 
      });
      
      // TODO: Implémenter l'envoi réel du message via API
      
      setMessageText("");
    }
  };

  const handleUseTemplate = (template: MessageTemplate) => {
    setMessageText(template.content);
    setIsTemplateDialogOpen(false);
  };

  const handleSaveTemplate = (templateId: string) => {
    setTemplates(
      templates.map((t) => (t.id === templateId ? { ...t, content: editingContent } : t))
    );
    setEditingTemplateId(null);
    setEditingContent("");
  };

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  return (
    <div className="space-y-6">
      <div>
        <h1>Messagerie</h1>
        <p className="text-muted-foreground">
          Communiquez avec vos candidats et planifiez des entretiens
        </p>
      </div>

      {/* Slogan Marque Employeur */}
      <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <TrendingUp className="h-5 w-5 text-blue-600" />
        <AlertDescription className="ml-2">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Multipliez votre marque employeur par 4 et attirez plus de talents, en donnant un retour à chaque candidat</span>
          </p>
        </AlertDescription>
      </Alert>

      {/* Alerte Anti-Arnaque */}
      <Alert className="bg-gradient-to-r from-red-50 to-orange-50 border-red-300">
        <ShieldAlert className="h-5 w-5 text-red-600" />
        <AlertDescription className="ml-2">
          <p className="text-sm text-red-900">
            <span className="font-semibold">Protection anti-arnaque activée : </span>
            Tous vos messages incluent automatiquement un avertissement rappelant aux candidats qu'aucun frais n'est jamais demandé pour un recrutement.
          </p>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-320px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-440px)]">
              <div className="divide-y">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedConversation === conv.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedConversation(conv.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {conv.candidateName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="truncate">{conv.candidateName}</p>
                          {conv.unreadCount > 0 && (
                            <Badge className="bg-primary text-primary-foreground">
                              {conv.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {conv.jobTitle}
                        </p>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {conv.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {conv.lastMessageTime}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Messages Area */}
        <Card className="lg:col-span-2">
          {selectedConv ? (
            <CardContent className="p-0 flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarFallback>
                      {selectedConv.candidateName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{selectedConv.candidateName}</p>
                    <p className="text-sm text-muted-foreground truncate">{selectedConv.jobTitle}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Star className="h-4 w-4 mr-2" />
                        Marquer comme important
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="h-4 w-4 mr-2" />
                        Archiver la conversation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Boutons */}
                <div className="flex gap-2">
                  {/* Messages types */}
                  <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Messages types
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Messages automatiques modifiables</DialogTitle>
                        <DialogDescription>
                          Personnalisez vos messages types pour répondre rapidement et
                          professionnellement
                        </DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="reponse-candidature">
                        <TabsList className="grid w-full grid-cols-5">
                          <TabsTrigger value="reponse-candidature">Réception</TabsTrigger>
                          <TabsTrigger value="invitation-entretien">Invitation</TabsTrigger>
                          <TabsTrigger value="refus">Refus</TabsTrigger>
                          <TabsTrigger value="acceptation">Acceptation</TabsTrigger>
                          <TabsTrigger value="suivi">Suivi</TabsTrigger>
                        </TabsList>

                        {["reponse-candidature", "invitation-entretien", "refus", "acceptation", "suivi"].map(
                          (category) => (
                            <TabsContent
                              key={category}
                              value={category}
                              className="space-y-4 mt-4"
                            >
                              {templates
                                .filter((t) => t.category === category)
                                .map((template) => (
                                  <Card key={template.id} className="border-2">
                                    <CardHeader>
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <CardTitle className="text-base">
                                            {template.name}
                                          </CardTitle>
                                          <p className="text-sm text-muted-foreground mt-1">
                                            Objet : {template.subject}
                                          </p>
                                        </div>
                                        <div className="flex gap-2">
                                          {editingTemplateId === template.id ? (
                                            <>
                                              <Button
                                                size="sm"
                                                onClick={() => handleSaveTemplate(template.id)}
                                              >
                                                <Check className="h-4 w-4" />
                                              </Button>
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                  setEditingTemplateId(null);
                                                  setEditingContent("");
                                                }}
                                              >
                                                <X className="h-4 w-4" />
                                              </Button>
                                            </>
                                          ) : (
                                            <>
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                  setEditingTemplateId(template.id);
                                                  setEditingContent(template.content);
                                                }}
                                              >
                                                <Edit className="h-4 w-4 mr-2" />
                                                Modifier
                                              </Button>
                                              <Button
                                                size="sm"
                                                onClick={() => handleUseTemplate(template)}
                                              >
                                                Utiliser
                                              </Button>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </CardHeader>
                                    <CardContent>
                                      {editingTemplateId === template.id ? (
                                        <Textarea
                                          value={editingContent}
                                          onChange={(e) => setEditingContent(e.target.value)}
                                          rows={12}
                                          className="font-mono text-sm"
                                        />
                                      ) : (
                                        <div className="bg-muted p-4 rounded-md">
                                          <pre className="text-sm whitespace-pre-wrap font-sans">
                                            {template.content}
                                          </pre>
                                        </div>
                                      )}
                                      <div className="mt-3 flex flex-wrap gap-2">
                                        <p className="text-xs text-muted-foreground w-full">
                                          Variables disponibles :
                                        </p>
                                        {template.variables.map((variable) => (
                                          <Badge key={variable} variant="outline" className="text-xs">
                                            {variable}
                                          </Badge>
                                        ))}
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                            </TabsContent>
                          )
                        )}
                      </Tabs>
                    </DialogContent>
                  </Dialog>

                  {/* Planifier entretien */}
                  <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        Planifier entretien
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Planifier un entretien</DialogTitle>
                        <DialogDescription>
                          Choisissez la date et l'heure pour planifier un entretien avec le candidat
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Type d'entretien</Label>
                          <select className="w-full px-3 py-2 border rounded-md">
                            <option>Entretien téléphonique</option>
                            <option>Entretien vidéo</option>
                            <option>Entretien en personne</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <CalendarComponent
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Heure</Label>
                          <Input type="time" defaultValue="10:00" />
                        </div>
                        <div className="space-y-2">
                          <Label>Durée</Label>
                          <select className="w-full px-3 py-2 border rounded-md">
                            <option>30 minutes</option>
                            <option>45 minutes</option>
                            <option>1 heure</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Lien visioconférence (optionnel)</Label>
                          <Input placeholder="https://meet.google.com/...  " />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsScheduleDialogOpen(false)}
                        >
                          Annuler
                        </Button>
                        <Button onClick={() => setIsScheduleDialogOpen(false)}>
                          Envoyer l'invitation
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === "recruiter" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId === "recruiter"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === "recruiter"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lightbulb className="h-3 w-3" />
                  <span>
                    Astuce : Utilisez les messages types ci-dessus pour gagner du temps
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea
                    placeholder="Écrivez votre message... (Ctrl+Entrée pour envoyer)"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="min-h-[80px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                Sélectionnez une conversation pour commencer
              </p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}