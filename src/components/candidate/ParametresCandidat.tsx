// src/components/candidate/ParametresCandidat.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Settings,
  User,
  Bell,
  Shield,
  Eye,
  Mail,
  Smartphone,
  Lock,
  Download,
  Trash2,
  Globe,
  Clock,
  FileText,
  AlertCircle,
  Check,
  Monitor,
  LogOut,
  Save,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export function ParametresCandidat() {
  // Paramètres du compte
  const [ancienMotDePasse, setAncienMotDePasse] = useState('');
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState('');
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');

  // Notifications
  const [alertesEmail, setAlertesEmail] = useState(true);
  const [alertesWhatsApp, setAlertesWhatsApp] = useState(true);
  const [alertesSMS, setAlertesSMS] = useState(false);
  const [frequenceAlertes, setFrequenceAlertes] = useState('quotidien');
  const [notifCandidatures, setNotifCandidatures] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifEntretiens, setNotifEntretiens] = useState(true);
  const [rappelsRelance, setRappelsRelance] = useState(true);
  const [newsletterRH, setNewsletterRH] = useState(true);
  const [conseilsCarriere, setConseilsCarriere] = useState(true);

  // Confidentialité
  const [profilVisible, setProfilVisible] = useState(true);
  const [visiblePour, setVisiblePour] = useState('tous');
  const [afficherPhoto, setAfficherPhoto] = useState(true);
  const [afficherTelephone, setAfficherTelephone] = useState(true);
  const [afficherEmail, setAfficherEmail] = useState(true);
  const [masquerEntreprises, setMasquerEntreprises] = useState('');
  const [cvPublic, setCvPublic] = useState(false);

  // Communication
  const [email] = useState('agathnado@gmail.com');
  const [telephone] = useState('+225 07 12 34 56 78');
  const [prefContactEmail, setPrefContactEmail] = useState(true);
  const [prefContactTel, setPrefContactTel] = useState(true);
  const [prefContactWhatsApp, setPrefContactWhatsApp] = useState(true);
  const [disponibiliteAppels, setDisponibiliteAppels] = useState('9h-18h');
  const [messageAuto, setMessageAuto] = useState(false);
  const [texteMessageAuto, setTexteMessageAuto] = useState('');

  // Sécurité
  const [authentification2FA, setAuthentification2FA] = useState(false);
  const [emailSecurite, setEmailSecurite] = useState(email);
  const [connexionsRecentes] = useState([
    { appareil: 'Chrome sur Windows', date: '2024-01-20 14:30', lieu: 'Abidjan, CI' },
    { appareil: 'Mobile Android', date: '2024-01-19 09:15', lieu: 'Abidjan, CI' },
  ]);

  const sauvegarderParametres = () => {
    toast.success('Paramètres enregistrés avec succès');
  };

  const changerMotDePasse = () => {
    if (nouveauMotDePasse !== confirmationMotDePasse) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    if (nouveauMotDePasse.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    toast.success('Mot de passe modifié avec succès');
    setAncienMotDePasse('');
    setNouveauMotDePasse('');
    setConfirmationMotDePasse('');
  };

  const telechargerDonnees = () => {
    toast.success('Vos données sont en cours de préparation. Vous recevrez un email.');
  };

  const supprimerCompte = () => {
    // TODO: Appeler DELETE /auth/users/me
    toast.success('Demande de suppression enregistrée. Vous recevrez une confirmation par email.');
  };

  const deconnecterAutresSessions = () => {
    toast.success('Toutes les autres sessions ont été déconnectées');
  };

  return (
    <div className="w-full">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
          <p className="text-muted-foreground mt-1">Gérez vos préférences et votre confidentialité</p>
        </div>
        <Button
          onClick={sauvegarderParametres}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Save className="h-4 w-4" />
          Enregistrer
        </Button>
      </div>

      <Tabs defaultValue="compte" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8 bg-transparent">
          <TabsTrigger
            value="compte"
            className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <User className="h-4 w-4" />
            Compte
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="confidentialite"
            className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Shield className="h-4 w-4" />
            Confidentialité
          </TabsTrigger>
          <TabsTrigger
            value="communication"
            className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Mail className="h-4 w-4" />
            Communication
          </TabsTrigger>
          <TabsTrigger
            value="securite"
            className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Lock className="h-4 w-4" />
            Sécurité
          </TabsTrigger>
        </TabsList>

        {/* Onglet Compte */}
        <TabsContent value="compte" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Modifier le mot de passe</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="ancien-mdp">Ancien mot de passe</Label>
                <Input
                  id="ancien-mdp"
                  type="password"
                  value={ancienMotDePasse}
                  onChange={(e) => setAncienMotDePasse(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="nouveau-mdp">Nouveau mot de passe</Label>
                <Input
                  id="nouveau-mdp"
                  type="password"
                  value={nouveauMotDePasse}
                  onChange={(e) => setNouveauMotDePasse(e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum 8 caractères avec lettres et chiffres
                </p>
              </div>
              <div>
                <Label htmlFor="confirm-mdp">Confirmer le mot de passe</Label>
                <Input
                  id="confirm-mdp"
                  type="password"
                  value={confirmationMotDePasse}
                  onChange={(e) => setConfirmationMotDePasse(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button
                onClick={changerMotDePasse}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Changer le mot de passe
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Onglet Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Alertes emploi</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground mb-1">Alertes par email</div>
                  <p className="text-xs text-muted-foreground">
                    Recevoir les nouvelles offres correspondant à votre profil
                  </p>
                </div>
                <Switch checked={alertesEmail} onCheckedChange={setAlertesEmail} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground mb-1">Alertes WhatsApp</div>
                  <p className="text-xs text-muted-foreground">
                    Notifications instantanées des offres urgentes
                  </p>
                </div>
                <Switch checked={alertesWhatsApp} onCheckedChange={setAlertesWhatsApp} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground mb-1">Alertes SMS</div>
                  <p className="text-xs text-muted-foreground">Recevoir les offres par SMS</p>
                </div>
                <Switch checked={alertesSMS} onCheckedChange={setAlertesSMS} />
              </div>
              {alertesEmail && (
                <div>
                  <Label>Fréquence des alertes</Label>
                  <Select value={frequenceAlertes} onValueChange={setFrequenceAlertes}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instantane">
                        Instantané - Dès qu'une offre est publiée
                      </SelectItem>
                      <SelectItem value="quotidien">Quotidien - Résumé journalier</SelectItem>
                      <SelectItem value="hebdomadaire">Hebdomadaire - Résumé le lundi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Notifications de candidatures</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground mb-1">Statut des candidatures</div>
                  <p className="text-xs text-muted-foreground">
                    Être notifié des changements de statut
                  </p>
                </div>
                <Switch checked={notifCandidatures} onCheckedChange={setNotifCandidatures} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground mb-1">Messages des recruteurs</div>
                  <p className="text-xs text-muted-foreground">Nouveaux messages et réponses</p>
                </div>
                <Switch checked={notifMessages} onCheckedChange={setNotifMessages} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground mb-1">Invitations à entretien</div>
                  <p className="text-xs text-muted-foreground">Propositions de rendez-vous</p>
                </div>
                <Switch checked={notifEntretiens} onCheckedChange={setNotifEntretiens} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground mb-1">Rappels de relance</div>
                  <p className="text-xs text-muted-foreground">
                    Rappel après 7 jours sans réponse
                  </p>
                </div>
                <Switch checked={rappelsRelance} onCheckedChange={setRappelsRelance} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Contenus et conseils</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground mb-1">Newsletter RH</div>
                  <p className="text-xs text-muted-foreground">
                    Actualités du marché de l'emploi
                  </p>
                </div>
                <Switch checked={newsletterRH} onCheckedChange={setNewsletterRH} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground mb-1">Conseils carrière</div>
                  <p className="text-xs text-muted-foreground">
                    Tips pour optimiser votre recherche
                  </p>
                </div>
                <Switch checked={conseilsCarriere} onCheckedChange={setConseilsCarriere} />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Onglet Confidentialité */}
        <TabsContent value="confidentialite" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Visibilité du profil</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground mb-1">Profil visible</div>
                  <p className="text-xs text-muted-foreground">
                    Permettre aux recruteurs de trouver votre profil
                  </p>
                </div>
                <Switch checked={profilVisible} onCheckedChange={setProfilVisible} />
              </div>
              {profilVisible && (
                <>
                  <div>
                    <Label>Visible pour</Label>
                    <Select value={visiblePour} onValueChange={setVisiblePour}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tous">Tous les recruteurs</SelectItem>
                        <SelectItem value="verifies">Recruteurs vérifiés uniquement</SelectItem>
                        <SelectItem value="premium">Comptes premium uniquement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator className="my-4 bg-border" />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-foreground mb-1">Afficher la photo</div>
                      <p className="text-xs text-muted-foreground">
                        Votre photo de profil est visible
                      </p>
                    </div>
                    <Switch checked={afficherPhoto} onCheckedChange={setAfficherPhoto} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-foreground mb-1">Afficher le téléphone</div>
                      <p className="text-xs text-muted-foreground">
                        Les recruteurs peuvent voir votre numéro
                      </p>
                    </div>
                    <Switch checked={afficherTelephone} onCheckedChange={setAfficherTelephone} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-foreground mb-1">Afficher l'email</div>
                      <p className="text-xs text-muted-foreground">
                        Les recruteurs peuvent voir votre email
                      </p>
                    </div>
                    <Switch checked={afficherEmail} onCheckedChange={setAfficherEmail} />
                  </div>
                </>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Masquer votre profil</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="masquer-entreprises">Entreprises à bloquer</Label>
                <Input
                  id="masquer-entreprises"
                  value={masquerEntreprises}
                  onChange={(e) => setMasquerEntreprises(e.target.value)}
                  placeholder="Ex: Entreprise actuelle, concurrents..."
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Ces entreprises ne verront pas votre profil. Séparez par des virgules
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground mb-1">CV public</div>
                  <p className="text-xs text-muted-foreground">
                    Permettre le téléchargement de votre CV
                  </p>
                </div>
                <Switch checked={cvPublic} onCheckedChange={setCvPublic} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Download className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Vos données personnelles</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <div className="text-sm text-foreground mb-1">Télécharger mes données</div>
                  <p className="text-xs text-muted-foreground">
                    Recevez une copie de toutes vos données
                  </p>
                </div>
                <Button
                  onClick={telechargerDonnees}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Télécharger
                </Button>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20 cursor-pointer hover:bg-destructive/20 transition-colors">
                    <div>
                      <div className="text-sm text-destructive mb-1">Supprimer mon compte</div>
                      <p className="text-xs text-destructive/80">
                        Cette action est irréversible
                      </p>
                    </div>
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-background border-border">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer votre compte ?</AlertDialogTitle>
                    <AlertDialogDescription className="text-foreground/80">
                      Cette action est définitive. Toutes vos données, candidatures et paramètres seront supprimés. Vous ne pourrez pas récupérer votre compte.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-border">Annuler</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={supprimerCompte}
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    >
                      Supprimer définitivement
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        </TabsContent>

        {/* Onglet Communication */}
        <TabsContent value="communication" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Préférences de contact</h2>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Comment souhaitez-vous être contacté par les recruteurs ?
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-foreground">Email</div>
                    <p className="text-xs text-muted-foreground">{email}</p>
                  </div>
                </div>
                <Switch checked={prefContactEmail} onCheckedChange={setPrefContactEmail} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-foreground">Téléphone</div>
                    <p className="text-xs text-muted-foreground">{telephone}</p>
                  </div>
                </div>
                <Switch checked={prefContactTel} onCheckedChange={setPrefContactTel} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-foreground">WhatsApp</div>
                    <p className="text-xs text-muted-foreground">{telephone}</p>
                  </div>
                </div>
                <Switch checked={prefContactWhatsApp} onCheckedChange={setPrefContactWhatsApp} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Disponibilité pour les appels</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Meilleur créneau pour vous joindre</Label>
                <Select value={disponibiliteAppels} onValueChange={setDisponibiliteAppels}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matin">Matin - 8h à 12h</SelectItem>
                    <SelectItem value="apres-midi">Après-midi - 14h à 18h</SelectItem>
                    <SelectItem value="9h-18h">Journée complète - 9h à 18h</SelectItem>
                    <SelectItem value="soir">Soirée - après 18h</SelectItem>
                    <SelectItem value="weekend">Weekend</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Informez les recruteurs de votre meilleure disponibilité
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Message automatique</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground mb-1">Activer la réponse automatique</div>
                  <p className="text-xs text-muted-foreground">
                    Envoyé aux recruteurs qui vous contactent
                  </p>
                </div>
                <Switch checked={messageAuto} onCheckedChange={setMessageAuto} />
              </div>
              {messageAuto && (
                <div>
                  <Label htmlFor="texte-auto">Texte du message</Label>
                  <Input
                    id="texte-auto"
                    value={texteMessageAuto}
                    onChange={(e) => setTexteMessageAuto(e.target.value)}
                    placeholder="Ex: Merci pour votre message. Je reviendrai vers vous rapidement."
                    className="mt-1"
                  />
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Onglet Sécurité */}
        <TabsContent value="securite" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">
                Authentification à deux facteurs
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground mb-1">Activer l'authentification 2FA</div>
                  <p className="text-xs text-muted-foreground">
                    Sécurisez votre compte avec un code SMS
                  </p>
                </div>
                <Switch checked={authentification2FA} onCheckedChange={setAuthentification2FA} />
              </div>
              {authentification2FA && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-green-800">
                    <Check className="h-5 w-5" />
                    <span className="text-sm">Authentification à deux facteurs activée</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Email de sécurité</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email-securite">Email de récupération</Label>
                <Input
                  id="email-securite"
                  type="email"
                  value={emailSecurite}
                  onChange={(e) => setEmailSecurite(e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Utilisé pour récupérer votre compte et les alertes de sécurité
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Connexions récentes</h2>
            </div>
            <div className="space-y-3">
              {connexionsRecentes.map((connexion, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Monitor className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-foreground">{connexion.appareil}</div>
                      <p className="text-xs text-muted-foreground">
                        {connexion.date} - {connexion.lieu}
                      </p>
                    </div>
                  </div>
                  {index === 0 && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Actuelle
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            <Button
              onClick={deconnecterAutresSessions}
              variant="outline"
              className="w-full mt-4 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnecter les autres sessions
            </Button>
          </Card>

          <Card className="p-6 bg-blue-50/50 border border-primary/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="text-sm text-foreground mb-2">Conseils de sécurité</h3>
                <ul className="space-y-1 text-xs text-foreground/80">
                  <li>• Utilisez un mot de passe unique et complexe</li>
                  <li>• Ne partagez jamais vos identifiants</li>
                  <li>• Activez l'authentification à deux facteurs</li>
                  <li>• Vérifiez régulièrement vos connexions récentes</li>
                  <li>• Méfiez-vous des offres trop alléchantes</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}