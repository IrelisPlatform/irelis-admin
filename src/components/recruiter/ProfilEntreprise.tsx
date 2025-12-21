// src/components/recruiter/ProfilEntreprise.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  Shield,
  Building2,
  MapPin,
  FileText,
  Upload,
  User,
  X,
  Users,
  Briefcase,
  Globe,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

// 🔧 logger non fourni → fallback
function loggerInfo(message: string, data?: any) {
  if (typeof window !== "undefined") {
    console.log(`[ProfilEntreprise] ${message}`, data);
  }
}

function loggerError(message: string, data?: any) {
  console.error(`[ProfilEntreprise] ${message}`, data);
}

export function ProfilEntreprise() {
  const [accountType, setAccountType] = useState<'entreprise' | 'particulier' | null>(null);
  const [emailError, setEmailError] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Commun
    email: '',
    phone: '',
    whatsapp: '',
    password: '',
    confirmPassword: '',
    
    // Entreprise
    companyName: '',
    companySize: '',
    sector: '',
    registrationNumber: '',
    taxNumber: '',
    website: '',
    address: '',
    city: '',
    country: '',
    description: '',
    
    // Particulier
    firstName: '',
    lastName: '',
    title: '',
    hiringFor: ''
  });

  const [acceptTerms, setAcceptTerms] = useState(false);

  // === GESTION DU DRAFT ===
  const saveDraft = () => {
    try {
      const draft = { accountType, formData, logoPreview };
      localStorage.setItem("recruiterProfileDraft", JSON.stringify(draft));
    } catch (e) {
      console.warn("Impossible de sauvegarder le draft");
    }
  };

  const restoreDraft = () => {
    try {
      const draftStr = localStorage.getItem("recruiterProfileDraft");
      if (draftStr) {
        const draft = JSON.parse(draftStr);
        if (draft.accountType) setAccountType(draft.accountType);
        if (draft.formData) setFormData(draft.formData);
        if (draft.logoPreview) setLogoPreview(draft.logoPreview);
      }
    } catch (e) {
      console.warn("Impossible de restaurer le draft");
    }
  };
  
  // Restaurer le draft au chargement
  useEffect(() => {
    restoreDraft();
  }, []);

  const router = useRouter();
  const { getValidToken, logout } = useAuth();

  const secteurs = [
    'Banque et Finance',
    'Commerce et Distribution',
    'Construction et BTP',
    'Éducation et Formation',
    'Énergie et Mines',
    'Hôtellerie et Restauration',
    'Immobilier',
    'Industrie et Manufacturing',
    'Informatique et Technologie',
    'Santé et Pharmacie',
    'Services aux entreprises',
    'Télécommunications',
    'Transport et Logistique',
    'Agriculture et Agroalimentaire',
    'ONG et Associations',
    'Autre'
  ];

  const taillesEntreprise = [
    '1-10 employés',
    '11-50 employés',
    '51-200 employés',
    '201-500 employés',
    '500+ employés'
  ];

  const pays = [
    'Bénin',
    'Burkina Faso',
    'Cameroun',
    'Congo',
    'Côte d\'Ivoire',
    'Gabon',
    'Guinée',
    'Mali',
    'Niger',
    'RD Congo',
    'Sénégal',
    'Tchad',
    'Togo',
    'Autre'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      // Sauvegarder le draft à chaque modification
      localStorage.setItem("recruiterProfileDraft", JSON.stringify({
        accountType,
        formData: updated,
        logoPreview,
      }));
      return updated;
    });
    
    // Validation email selon le type de compte
    if (field === 'email') {
      if (accountType === 'particulier') {
        validatePersonalEmail(value);
      } else if (accountType === 'entreprise') {
        validateBusinessEmail(value);
      }
    }
  };

  const validatePersonalEmail = (email: string) => {
    if (!email) {
      setEmailError('');
      return;
    }

    // Domaines de messagerie personnelle acceptés
    const personalDomains = [
      'gmail.com', 'yahoo.com', 'yahoo.fr', 'hotmail.com', 'hotmail.fr',
      'outlook.com', 'outlook.fr', 'live.com', 'live.fr', 'icloud.com',
      'protonmail.com', 'protonmail.ch', 'mail.com', 'aol.com', 'zoho.com',
      'gmx.com', 'gmx.fr', 'yandex.com', 'mail.ru', 'inbox.com'
    ];

    const emailDomain = email.split('@')[1]?.toLowerCase();
    
    if (emailDomain && !personalDomains.includes(emailDomain)) {
      setEmailError('Vous devez utiliser une adresse e-mail personnelle (Gmail, Yahoo, Outlook, etc.) pour créer un compte particulier. Pour un compte professionnel, veuillez créer un compte Entreprise.');
    } else {
      setEmailError('');
    }
  };

  const validateBusinessEmail = (email: string) => {
    if (!email) {
      setEmailError('');
      return;
    }

    // Domaines de messagerie personnelle NON acceptés pour entreprise
    const personalDomains = [
      'gmail.com', 'yahoo.com', 'yahoo.fr', 'hotmail.com', 'hotmail.fr',
      'outlook.com', 'outlook.fr', 'live.com', 'live.fr', 'icloud.com',
      'protonmail.com', 'protonmail.ch', 'mail.com', 'aol.com', 'zoho.com',
      'gmx.com', 'gmx.fr', 'yandex.com', 'mail.ru', 'inbox.com'
    ];

    const emailDomain = email.split('@')[1]?.toLowerCase();
    
    if (emailDomain && personalDomains.includes(emailDomain)) {
      setEmailError('Vous devez utiliser une adresse e-mail professionnelle de votre entreprise pour créer un compte Entreprise. Pour un compte personnel, veuillez créer un compte Particulier.');
    } else {
      setEmailError('');
    }
  };
    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔑 Récupérer le token
    const token = await getValidToken();
    if (!token) {
      toast.error('Session expirée. Veuillez vous reconnecter.');
      logout();
      return;
    }

    // 🎯 Mapper les données selon le type de compte
    let payload: Record<string, string> = {};

    if (accountType === 'particulier') {
      // Pour un particulier, on remplit les champs backend requis avec les données perso
      payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        function: (formData.title || "Recruteur indépendant").trim(),
        companyName: `Compte de ${formData.firstName.trim()} ${formData.lastName.trim()}`,
        companyEmail: formData.email.trim(),
        country: formData.country.trim(),
        city: formData.city || formData.country.trim(), // fallback si city vide
        phone: formData.phone.trim(),
      };
    } else {
      // Pour une entreprise
      payload = {
        firstName: formData.firstName.trim(), // requis
        lastName: formData.lastName.trim(),  // requis
        function: (formData.function || "Responsable RH").trim(), // requis
        companyName: formData.companyName.trim(),
        companyEmail: formData.email.trim(),
        country: formData.country.trim(),
        city: formData.city.trim(),
        phone: formData.phone.trim(),
      };
    }

    // ✅ Vérifier les champs obligatoires selon le backend
    const requiredFields: (keyof typeof payload)[] = [
      'firstName', 'lastName', 'function', 'companyName', 'companyEmail', 'country', 'city'
    ];

    const missing = requiredFields.find(field => !payload[field]?.trim());
    if (missing) {
      toast.error(`Le champ "${missing}" est requis.`);
      return;
    }

    // 📦 Préparer FormData pour PATCH (multipart/form-data)
    const formDataBackend = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formDataBackend.append(key, value);
    });

    // 🖼️ Ajouter le logo si présent
    if (logo) {
      formDataBackend.append('file', logo);
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/recruiters/profile', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          // ⚠️ Ne PAS définir Content-Type → le browser le fait avec boundary
        },
        body: formDataBackend,
      });

      if (res.ok) {
        toast.success('Votre profil recruteur a été enregistré avec succès !');
        localStorage.removeItem("recruiterProfileDraft"); // nettoyer le draft
        window.location.href = "/espace-recruteur";
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "Erreur lors de l’enregistrement du profil.");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      toast.error("Une erreur réseau est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setAccountType(null);
    setEmailError('');
    setLogo(null);
    setLogoPreview('');
    setFormData({
      email: '',
      phone: '',
      whatsapp: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      companySize: '',
      sector: '',
      registrationNumber: '',
      taxNumber: '',
      website: '',
      address: '',
      city: '',
      country: '',
      description: '',
      firstName: '',
      lastName: '',
      title: '',
      hiringFor: ''
    });
  };

  if (!accountType) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <Badge className="bg-yellow-500 text-gray-900 hover:bg-yellow-500 mb-4">
              Inscription gratuite
            </Badge>
            <h1 className="mb-4">Créez votre compte recruteur</h1>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              Choisissez le type de compte adapté à vos besoins de recrutement
            </p>
          </div>
        </div>

        {/* Account Type Selection */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Compte Entreprise */}
            <Card className="p-8 hover:shadow-2xl transition-all cursor-pointer border-2 hover:border-blue-600 group">
              <div className="text-center">
                <h2 className="mb-1">Compte Entreprise</h2>
                <p className="text-sm text-blue-600 mb-4">Personnes morales</p>
                <div className="flex justify-center mb-6">
                  <p className="text-sm text-gray-500 max-w-md">TPE, PME, Multinationales, ONG, Associations, Autres</p>
                </div>
                
                <div className="space-y-3 mb-8 text-left">
                  <p className="text-sm">Page entreprise personnalisée avec logo et description</p>
                  <p className="text-sm">Gestion multi-utilisateurs pour votre équipe RH</p>
                  <p className="text-sm">Badge de confiance vérifié sur vos offres</p>
                  <p className="text-sm">Statistiques avancées et analytics</p>
                  <p className="text-sm">Facturation et paiement sur facture disponibles</p>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  onClick={() => setAccountType('entreprise')}
                >
                  Créer un compte entreprise
                </Button>
              </div>
            </Card>

            {/* Compte Particulier */}
            <Card className="p-8 hover:shadow-2xl transition-all cursor-pointer border-2 hover:border-green-600 group">
              <div className="text-center">
                <h2 className="mb-1">Compte Particulier</h2>
                <p className="text-sm text-green-600 mb-4">Personnes physiques</p>
                <div className="flex justify-center mb-6">
                  <p className="text-sm text-gray-500 max-w-md">Besoins individuels, Freelances, Autres</p>
                </div>
                
                <div className="space-y-3 mb-8 text-left">
                  <p className="text-sm">Inscription rapide en 2 minutes</p>
                  <p className="text-sm">Publication immédiate de vos annonces</p>
                  <p className="text-sm">Gestion simple de vos candidatures</p>
                  <p className="text-sm">Accès à la CVthèque complète</p>
                  <p className="text-sm">Paiement flexible Mobile Money ou carte</p>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  onClick={() => setAccountType('particulier')}
                >
                  Créer un compte particulier
                </Button>
              </div>
            </Card>
          </div>

          {/* Trust Section */}
          <div className="mt-16 text-center">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-2xl text-blue-600">100%</span>
                </div>
                <p className="text-gray-600 text-sm">Gratuit pendant 30 jours</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-2xl text-blue-600">2500+</span>
                </div>
                <p className="text-gray-600 text-sm">Recruteurs actifs</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <span className="text-2xl text-blue-600">15 000+</span>
                </div>
                <p className="text-gray-600 text-sm">Offres publiées</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="text-2xl text-blue-600">14</span>
                </div>
                <p className="text-gray-600 text-sm">Pays couverts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-blue-800 mb-4"
            onClick={resetForm}
          >
            ← Retour au choix du compte
          </Button>
          <Badge className={`${accountType === 'entreprise' ? 'bg-blue-500' : 'bg-green-500'} text-white hover:${accountType === 'entreprise' ? 'bg-blue-500' : 'bg-green-500'} mb-4`}>
            {accountType === 'entreprise' ? 'Compte Entreprise' : 'Compte Particulier'}
          </Badge>
          <h1 className="mb-3">Inscription {accountType === 'entreprise' ? 'Entreprise' : 'Particulier'}</h1>
          <p className="text-blue-100 text-lg">
            Remplissez le formulaire ci-dessous pour créer votre compte recruteur
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="p-8">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Informations de connexion */}
            <div>
              <h3 className="text-xl mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Informations de connexion
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">
                    {accountType === 'entreprise' ? 'Adresse e-mail professionnelle' : 'Adresse e-mail personnelle'}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={accountType === 'entreprise' ? 'votremail@entreprise.com' : 'votremail@gmail.com'}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={emailError ? 'border-red-500' : ''}
                    required
                  />
                  {emailError && (
                    <Alert className="mt-2" variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="ml-2">
                        {emailError}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+229 XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">Numéro WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="+229 XX XX XX XX"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Min. 8 caractères"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Informations Entreprise */}
            {accountType === 'entreprise' && (
              <>
                <div>
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Informations de l'entreprise
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                      <Input
                        id="companyName"
                        placeholder="Ex: Société Générale Côte d'Ivoire"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        required={accountType === 'entreprise'}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sector">Secteur d'activité</Label>
                      <Select value={formData.sector} onValueChange={(value) => handleInputChange('sector', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          {secteurs.map((secteur) => (
                            <SelectItem key={secteur} value={secteur}>
                              {secteur}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="companySize">Taille de l'entreprise</Label>
                      <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          {taillesEntreprise.map((taille) => (
                            <SelectItem key={taille} value={taille}>
                              {taille}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="registrationNumber">Numéro RCCM ou équivalent</Label>
                      <Input
                        id="registrationNumber"
                        placeholder="Ex: CI-ABJ-2023-A-12345"
                        value={formData.registrationNumber}
                        onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="taxNumber">Numéro d'identification fiscale</Label>
                      <Input
                        id="taxNumber"
                        placeholder="Ex: 1234567890"
                        value={formData.taxNumber}
                        onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="website">Site web (optionnel)</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://www.votresite.com  "
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Votre fonction
                  </h3>
                  <div className="grid md:grid-cols-1 gap-6">
                    <div>
                      <Label htmlFor="function">
                        Votre fonction dans l'entreprise *
                      </Label>
                      <Input
                        id="function"
                        placeholder="Ex: Responsable RH, Chargé de recrutement, CEO..."
                        value={formData.function}
                        onChange={(e) => handleInputChange('function', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Localisation
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="country">Pays *</Label>
                      <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          {pays.map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="city">Ville *</Label>
                      <Input
                        id="city"
                        placeholder="Ex: Abidjan, Cotonou, Dakar..."
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Adresse complète</Label>
                      <Input
                        id="address"
                        placeholder="Ex: Plateau, Avenue Nogues"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Description de l'entreprise
                  </h3>
                  <div>
                    <Label htmlFor="description">Présentation de votre entreprise</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez votre entreprise, vos activités, votre culture d'entreprise..."
                      rows={6}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-2">Cette description apparaîtra sur votre page entreprise</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-blue-600" />
                    Logo de l'entreprise
                  </h3>
                  <div>
                    <div className="flex items-start gap-6">
                      {logoPreview ? (
                        <div className="relative">
                          <div className="w-32 h-32 rounded-lg border-2 border-gray-200 overflow-hidden bg-white">
                            <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                            onClick={() => {
                              setLogo(null);
                              setLogoPreview('');
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <label className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-600 flex items-center justify-center cursor-pointer transition-all bg-gray-50 hover:bg-blue-50">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setLogo(file);
                                setLogoPreview(URL.createObjectURL(file));
                              }
                            }}
                            className="hidden"
                          />
                          <Upload className="w-8 h-8 text-gray-400" />
                        </label>
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-blue-600 mb-2">Augmentez votre visibilité en ajoutant votre logo</p>
                        <p className="text-sm text-gray-600 mt-2">
                          Formats acceptés : PNG, JPEG, JPG, WEBP. Taille maximale : 2 Mo.
                        </p>
                        <label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setLogo(file);
                                setLogoPreview(URL.createObjectURL(file));
                              }
                            }}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              (e.currentTarget.previousElementSibling as HTMLInputElement)?.click();
                            }}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            {logoPreview ? 'Changer le logo' : 'Télécharger un logo'}
                          </Button>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Informations Particulier */}
            {accountType === 'particulier' && (
              <>
                <div>
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-green-600" />
                    Vos informations
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        placeholder="Votre prénom"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        placeholder="Votre nom"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Fonction ou titre</Label>
                      <Input
                        id="title"
                        placeholder="Ex: Entrepreneur, Chef de projet..."
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country *">Pays</Label>
                      <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          {pays.map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="hiringFor">Pour quel type de recrutement ?</Label>
                      <Textarea
                        id="hiringFor"
                        placeholder="Ex: Recherche un assistant personnel, développeur pour projet ponctuel..."
                        rows={3}
                        value={formData.hiringFor}
                        onChange={(e) => handleInputChange('hiringFor', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Actions */}
            <div className="border-t pt-6">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300"
                  required
                />
                <Label htmlFor="terms" className="cursor-pointer text-sm">
                  J'accepte les conditions générales d'utilisation et la politique de confidentialité
                </Label>
              </div>

              {/* Alertes email gratuites */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="email-alerts-recruiter"
                    defaultChecked
                    className="mt-1 w-4 h-4 text-green-600 rounded border-gray-300"
                  />
                  <div className="flex-1">
                    <label htmlFor="email-alerts-recruiter" className="text-sm font-medium text-gray-900 cursor-pointer">
                      Alertes email gratuites
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      Recevez des notifications pour les nouveaux profils correspondant à vos critères de recrutement
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={resetForm}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className={`flex-1 ${accountType === 'entreprise' ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'}`}
                >
                  Créer mon compte recruteur
                </Button>
              </div>
            </div>
          </form>
        </Card>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-center gap-2 text-blue-900">
              <Shield className="w-5 h-5" />
              <p className="text-sm">
                Vos données sont sécurisées et ne seront jamais partagées avec des tiers sans votre consentement
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}