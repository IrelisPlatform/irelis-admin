// src/components/recruiter/EmailTemplates.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, Filter, FileText, Send, Clock, Mail, Sparkles, CheckCircle, XCircle, Tag, Plus, Save, Eye, Copy, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface EmailTemplate {
  id: string;
  name: string;
  category: "accusé-réception" | "rejet" | "convocation" | "offre" | "relance" | "autre";
  subject: string;
  body: string;
  usageCount: number;
  lastUsed: string;
  language: "fr" | "en";
  tags: string[];
}

const mergeTags = [
  { tag: "{prenom}", description: "Prénom du candidat" },
  { tag: "{nom}", description: "Nom du candidat" },
  { tag: "{poste}", description: "Titre du poste" },
  { tag: "{entreprise}", description: "Nom de l'entreprise" },
  { tag: "{date_entretien}", description: "Date de l'entretien" },
  { tag: "{heure_entretien}", description: "Heure de l'entretien" },
  { tag: "{lieu_entretien}", description: "Lieu de l'entretien" },
  { tag: "{nom_recruteur}", description: "Nom du recruteur" },
  { tag: "{salaire_propose}", description: "Salaire proposé" },
  { tag: "{date_debut}", description: "Date de début souhaitée" },
];

const defaultTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Accusé de réception standard",
    category: "accusé-réception",
    subject: "Votre candidature pour {poste} chez {entreprise}",
    body: `Bonjour {prenom},

Nous avons bien reçu votre candidature pour le poste de {poste}.

Votre profil a retenu notre attention et nous l'examinons attentivement. Nous reviendrons vers vous dans les 5 jours ouvrables pour vous informer de la suite donnée à votre candidature.

En attendant, n'hésitez pas à consulter notre page carrières pour découvrir d'autres opportunités.

Cordialement,
{nom_recruteur}
{entreprise}`,
    usageCount: 245,
    lastUsed: "Il y a 2h",
    language: "fr",
    tags: ["standard", "automatique"],
  },
  {
    id: "2",
    name: "Rejet bienveillant",
    category: "rejet",
    subject: "Suite de votre candidature - {poste}",
    body: `Bonjour {prenom},

Nous vous remercions sincèrement pour l'intérêt que vous portez à {entreprise} et pour le temps que vous avez consacré à votre candidature pour le poste de {poste}.

Après une étude attentive de votre profil, nous sommes au regret de vous informer que nous ne pourrons pas donner suite à votre candidature pour ce poste spécifique. Cette décision ne remet nullement en cause vos compétences, mais reflète simplement l'adéquation avec nos besoins actuels et les profils des autres candidats.

Nous conservons votre CV dans notre CVthèque et n'hésiterons pas à vous recontacter si une opportunité plus adaptée à votre profil se présente.

Nous vous souhaitons plein succès dans vos recherches.

Cordialement,
{nom_recruteur}
{entreprise}`,
    usageCount: 189,
    lastUsed: "Il y a 5h",
    language: "fr",
    tags: ["bienveillant", "cvthèque"],
  },
  {
    id: "3",
    name: "Convocation entretien",
    category: "convocation",
    subject: "Invitation à un entretien - {poste}",
    body: `Bonjour {prenom},

Bonne nouvelle ! Votre candidature pour le poste de {poste} a retenu toute notre attention.

Nous serions ravis de vous rencontrer pour échanger davantage sur votre parcours et vos motivations.

📅 Date: {date_entretien}
🕐 Heure: {heure_entretien}
📍 Lieu: {lieu_entretien}
⏱️ Durée estimée: 45 minutes

Merci de confirmer votre présence en répondant à cet email avant 48h.

Pour préparer au mieux cet entretien, nous vous invitons à:
- Apporter une copie de votre CV
- Vous munir d'une pièce d'identité
- Préparer des questions sur le poste et l'entreprise

Nous restons à votre disposition pour toute question.

À très bientôt,
{nom_recruteur}
{entreprise}`,
    usageCount: 156,
    lastUsed: "Il y a 1 jour",
    language: "fr",
    tags: ["entretien", "confirmation"],
  },
  {
    id: "4",
    name: "Proposition d'embauche",
    category: "offre",
    subject: "🎉 Proposition d'embauche - {poste}",
    body: `Bonjour {prenom},

Nous sommes heureux de vous annoncer que suite à notre processus de recrutement, nous souhaitons vous proposer le poste de {poste} au sein de {entreprise}.

📋 Détails de l'offre:
- Poste: {poste}
- Salaire mensuel brut: {salaire_propose}
- Date de prise de fonction souhaitée: {date_debut}
- Type de contrat: CDI
- Période d'essai: 3 mois

Cette offre est valable jusqu'au [date limite]. Vous trouverez en pièce jointe le contrat de travail détaillé.

Nous serions ravis de vous compter parmi notre équipe et contribuer ensemble au développement de {entreprise}.

N'hésitez pas à nous contacter pour toute question ou clarification.

Félicitations et bienvenue dans l'équipe !

Cordialement,
{nom_recruteur}
{entreprise}`,
    usageCount: 67,
    lastUsed: "Il y a 3 jours",
    language: "fr",
    tags: ["offre", "contrat", "félicitations"],
  },
  {
    id: "5",
    name: "Relance candidat",
    category: "relance",
    subject: "Rappel - Votre candidature pour {poste}",
    body: `Bonjour {prenom},

Nous vous avions contacté récemment concernant votre candidature pour le poste de {poste}.

N'ayant pas reçu de retour de votre part, nous souhaitions nous assurer que vous avez bien reçu notre message et que vous êtes toujours intéressé(e) par cette opportunité.

Si tel est le cas, nous serions ravis d'échanger avec vous dans les prochains jours.

Merci de nous confirmer votre intérêt par retour d'email.

Cordialement,
{nom_recruteur}
{entreprise}`,
    usageCount: 98,
    lastUsed: "Il y a 4h",
    language: "fr",
    tags: ["relance", "suivi"],
  },
];

export function EmailTemplates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(defaultTemplates);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<Partial<EmailTemplate>>({
    name: "",
    category: "autre",
    subject: "",
    body: "",
    language: "fr",
    tags: [],
  });

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateTemplate = () => {
    const newTemplate: EmailTemplate = {
      id: Date.now().toString(),
      name: editingTemplate.name || "Nouveau template",
      category: editingTemplate.category as EmailTemplate["category"],
      subject: editingTemplate.subject || "",
      body: editingTemplate.body || "",
      usageCount: 0,
      lastUsed: "Jamais",
      language: editingTemplate.language as "fr" | "en",
      tags: editingTemplate.tags || [],
    };

    setTemplates([...templates, newTemplate]);
    setIsCreateDialogOpen(false);
    setEditingTemplate({
      name: "",
      category: "autre",
      subject: "",
      body: "",
      language: "fr",
      tags: [],
    });
    toast.success("Template créé avec succès !");
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
    toast.success("Template supprimé");
  };

  const handleDuplicateTemplate = (template: EmailTemplate) => {
    const duplicated: EmailTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (copie)`,
      usageCount: 0,
      lastUsed: "Jamais",
    };
    setTemplates([...templates, duplicated]);
    toast.success("Template dupliqué !");
  };

  const insertMergeTag = (tag: string) => {
    setEditingTemplate({
      ...editingTemplate,
      body: (editingTemplate.body || "") + tag,
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "accusé-réception":
        return <CheckCircle className="h-4 w-4" />;
      case "rejet":
        return <XCircle className="h-4 w-4" />;
      case "convocation":
        return <Clock className="h-4 w-4" />;
      case "offre":
        return <Sparkles className="h-4 w-4" />;
      case "relance":
        return <Mail className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "accusé-réception":
        return "bg-blue-100 text-blue-800";
      case "rejet":
        return "bg-red-100 text-red-800";
      case "convocation":
        return "bg-purple-100 text-purple-800";
      case "offre":
        return "bg-green-100 text-green-800";
      case "relance":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Templates d'emails personnalisables</h1>
        <p className="text-muted-foreground">
          Gagnez du temps avec des modèles d'emails professionnels et personnalisables
        </p>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total templates</p>
                <p className="text-2xl font-semibold mt-1">{templates.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Emails envoyés</p>
                <p className="text-2xl font-semibold mt-1">
                  {templates.reduce((sum, t) => sum + t.usageCount, 0)}
                </p>
              </div>
              <Send className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Temps économisé</p>
                <p className="text-2xl font-semibold mt-1">~45h</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Plus utilisé</p>
                <p className="text-sm font-medium mt-1">Accusé réception</p>
              </div>
              <Sparkles className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un template..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes catégories</SelectItem>
            <SelectItem value="accusé-réception">Accusé réception</SelectItem>
            <SelectItem value="rejet">Rejet</SelectItem>
            <SelectItem value="convocation">Convocation</SelectItem>
            <SelectItem value="offre">Offre</SelectItem>
            <SelectItem value="relance">Relance</SelectItem>
            <SelectItem value="autre">Autre</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              Nouveau template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer un nouveau template d'email</DialogTitle>
              <DialogDescription>
                Utilisez les merge tags pour personnaliser automatiquement vos emails
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom du template</Label>
                  <Input
                    placeholder="Ex: Relance après entretien"
                    value={editingTemplate.name}
                    onChange={(e) =>
                      setEditingTemplate({ ...editingTemplate, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Catégorie</Label>
                  <Select
                    value={editingTemplate.category}
                    onValueChange={(value) =>
                      setEditingTemplate({
                        ...editingTemplate,
                        category: value as EmailTemplate["category"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accusé-réception">Accusé réception</SelectItem>
                      <SelectItem value="rejet">Rejet</SelectItem>
                      <SelectItem value="convocation">Convocation</SelectItem>
                      <SelectItem value="offre">Offre</SelectItem>
                      <SelectItem value="relance">Relance</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Sujet de l'email</Label>
                <Input
                  placeholder="Ex: Suite à votre candidature pour {poste}"
                  value={editingTemplate.subject}
                  onChange={(e) =>
                    setEditingTemplate({ ...editingTemplate, subject: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Corps du message</Label>
                <Textarea
                  rows={12}
                  placeholder="Rédigez votre message..."
                  value={editingTemplate.body}
                  onChange={(e) =>
                    setEditingTemplate({ ...editingTemplate, body: e.target.value })
                  }
                />
              </div>

              {/* Merge tags */}
              <div className="border rounded-lg p-4 bg-muted/50">
                <p className="text-sm font-medium mb-3">Merge tags disponibles</p>
                <div className="flex flex-wrap gap-2">
                  {mergeTags.map((mergeTag) => (
                    <Button
                      key={mergeTag.tag}
                      variant="outline"
                      size="sm"
                      onClick={() => insertMergeTag(mergeTag.tag)}
                      className="text-xs"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {mergeTag.tag}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Ces champs seront automatiquement remplacés par les vraies valeurs lors de
                  l'envoi
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateTemplate}>
                <Save className="h-4 w-4 mr-2" />
                Créer le template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Liste des templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <Badge className={`mt-2 ${getCategoryColor(template.category)}`}>
                    {getCategoryIcon(template.category)}
                    <span className="ml-1">{template.category}</span>
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedTemplate(template);
                        setIsPreviewDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Prévisualiser
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicateTemplate(template)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Dupliquer
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sujet:</p>
                  <p className="text-sm mt-1 line-clamp-1">{template.subject}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Aperçu:</p>
                  <p className="text-sm mt-1 line-clamp-3 text-muted-foreground">
                    {template.body}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Send className="h-3 w-3" />
                      {template.usageCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {template.lastUsed}
                    </span>
                  </div>
                  <Button size="sm" variant="outline">
                    <Mail className="h-3 w-3 mr-1" />
                    Utiliser
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucun template trouvé</p>
            <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Créer votre premier template
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Prévisualisation du template</DialogTitle>
            <DialogDescription>{selectedTemplate?.name}</DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-muted/50">
                <p className="text-sm font-medium mb-2">Sujet:</p>
                <p className="text-sm">{selectedTemplate.subject}</p>
              </div>
              <div className="border rounded-lg p-4 bg-muted/50">
                <p className="text-sm font-medium mb-3">Message:</p>
                <div className="whitespace-pre-wrap text-sm">{selectedTemplate.body}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getCategoryColor(selectedTemplate.category)}>
                  {selectedTemplate.category}
                </Badge>
                <Badge variant="outline">Utilisé {selectedTemplate.usageCount} fois</Badge>
                <Badge variant="outline">{selectedTemplate.language.toUpperCase()}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}