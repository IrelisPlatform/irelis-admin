// src/components/accompagnement/ServicesGrid.tsx
'use client';

import { 
  FileText, Users, TrendingUp, BookOpen, Target, Globe,
  CheckCircle, Award, ArrowRight, Search, GraduationCap,
  DollarSign, MapPin, Send, ClipboardCheck, Star, Briefcase,
  Mail, Package, Zap
} from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  duration: string;
  price: string;
  originalPrice?: string;
  savings?: string;
  countries?: string[];
  benefits?: string[];
  process?: string[];
  testimonial?: {
    name: string;
    role: string;
    text: string;
  };
  targetAudience?: string[];
  prerequisites?: string[];
  deliverables?: string[];
  guarantees?: string[];
  faq?: {
    question: string;
    answer: string;
  }[];
  results?: string[];
  popular?: boolean;
  badge?: string;
}

export const services: Service[] = [
  // ==================== DIAGNOSTIC & AUDIT ====================
  {
    id: 'cv-audit-express',
    title: 'Audit CV Express',
    description: 'Diagnostic complet professionnel de votre CV en 24h par expert RH certifié',
    icon: Search,
    category: 'Diagnostic',
    duration: '24 heures',
    price: '8,500 FCFA',
    originalPrice: '15,000 FCFA',
    savings: 'Économisez 6,500 FCFA',
    benefits: [
      'Analyse des 15 erreurs bloquantes les plus fréquentes',
      'Score ATS détaillé sur 100 avec explication précise',
      'Rapport PDF professionnel de 4-5 pages illustré',
      'Recommandations prioritaires numérotées par importance',
      'Liste de corrections concrètes avec exemples avant/après',
      'Section Questions-Réponses 15 min incluse (tel/visio)',
      'Analyse mise en page et lisibilité',
      'Vérification orthographe et grammaire',
      'Compatibilité ATS (Applicant Tracking System)',
      'Benchmark vs CV de votre secteur'
    ],
    process: [
      'Envoi de votre CV actuel (PDF, Word, ou image)',
      'Analyse automatique par notre outil IA propriétaire',
      'Vérification et enrichissement par expert RH humain',
      'Génération rapport détaillé sous 24h maximum',
      'Envoi rapport + session explicative 15 min',
      'Réponses à vos questions de clarification'
    ],
    deliverables: [
      'Rapport PDF professionnel 4-5 pages',
      'Score ATS détaillé (/100) avec graphiques',
      'Liste 15+ erreurs identifiées avec gravité',
      'Plan de correction prioritaire numéroté',
      'Exemples avant/après pour 5 sections clés',
      '10 recommandations actionnables immédiatement',
      'Checklist de validation (20 points)',
      'Session Q&R 15 min (planifiée selon disponibilité)'
    ],
    targetAudience: [
      'Candidats envoyant 50+ candidatures sans réponses',
      'Professionnels avec CV datant de plus de 2 ans',
      'Personnes refusées malgré qualifications solides',
      'Candidats voulant vérification rapide avant candidature importante',
      'Professionnels ne comprenant pas pourquoi leur CV ne fonctionne pas'
    ],
    guarantees: [
      'Analyse par expert RH certifié avec 5+ ans expérience recrutement',
      'Rapport détaillé garanti livré sous 24h (jours ouvrés)',
      'Session Q&R 15 min incluse dans les 48h suivant livraison',
      'Satisfaction garantie ou audit gratuit supplémentaire',
      'Confidentialité absolue - Vos données jamais partagées'
    ],
    faq: [
      {
        question: 'Mon CV sera-t-il modifié ou juste analysé ?',
        answer: 'Nous analysons seulement votre CV actuel. Vous recevez un rapport détaillé pour corriger vous-même. Si vous voulez que nous le rédigions, choisissez le service "CV Optimisé ATS".'
      },
      {
        question: 'Quel format de CV acceptez-vous ?',
        answer: 'Tous formats : PDF, Word (.doc/.docx), image (JPG/PNG), Google Docs. Même les CV manuscrits scannés sont acceptés.'
      },
      {
        question: 'Le délai de 24h est-il garanti même le weekend ?',
        answer: 'Le délai de 24h s\'applique aux jours ouvrés (lundi-vendredi). CV envoyés weekend = rapport lundi soir.'
      },
      {
        question: 'Que se passe-t-il si je ne comprends pas le rapport ?',
        answer: 'La session Q&R de 15 min est incluse pour expliquer tous les points du rapport. Vous pouvez aussi nous contacter par email après.'
      }
    ],
    results: [
      'Taux identification erreurs : 98%',
      'Temps moyen correction après audit : 2-3h',
      'Score ATS moyen après corrections : +35 points',
      'Satisfaction clients : 4.8/5'
    ],
    testimonial: {
      name: 'Koffi Mensah',
      role: 'Analyste Financier - Ecobank',
      text: 'J\'ai découvert 7 erreurs graves dans mon CV que je faisais depuis 3 ans ! Le rapport m\'a ouvert les yeux. J\'ai corrigé en 2h et obtenu 5 entretiens la semaine suivante.'
    }
  },

  {
    id: 'analyse-complete-carriere',
    title: 'Analyse Complète Carrière 360°',
    description: 'Bilan approfondi CV + LinkedIn + Positionnement marché avec plan action 30 jours',
    icon: Target,
    category: 'Diagnostic',
    duration: '3-5 jours',
    price: '15,000 FCFA',
    badge: 'Nouveau',
    benefits: [
      'Audit CV complet (tous les points Audit Express +)',
      'Analyse profil LinkedIn avec score optimisation',
      'Bilan compétences techniques et soft skills',
      'Positionnement marché emploi dans votre secteur',
      'Benchmark salarial selon expérience et zone',
      'Identification forces et axes amélioration',
      'Plan d\'action personnalisé 30 jours',
      'Session coaching 1h30 avec expert RH',
      'Roadmap carrière avec jalons clairs',
      'Liste 50 entreprises cibles dans votre domaine'
    ],
    process: [
      'Questionnaire approfondi en ligne (45 min)',
      'Envoi CV + lien LinkedIn + documents pertinents',
      'Analyse multi-critères par expert senior',
      'Élaboration diagnostic complet',
      'Session visio 1h30 de restitution',
      'Remise plan action écrit détaillé',
      'Suivi email 7 jours pour questions'
    ],
    deliverables: [
      'Rapport analyse carrière 360° (12-15 pages PDF)',
      'Audit CV détaillé (4 pages)',
      'Audit LinkedIn avec checklist optimisation',
      'Cartographie compétences (schéma visuel)',
      'Positionnement marché (graphiques)',
      'Benchmark salarial (fourchette précise)',
      'Plan action 30 jours (15 actions concrètes)',
      'Liste 50 entreprises cibles avec contacts',
      'Session coaching 1h30 enregistrée',
      'Templates emails approche directe (3)'
    ],
    targetAudience: [
      'Professionnels en réflexion carrière profonde',
      'Candidats voulant diagnostic 360° complet',
      'Personnes en stagnation professionnelle depuis 2+ ans',
      'Cadres voulant comprendre leur positionnement marché',
      'Professionnels avant grosse décision carrière'
    ],
    guarantees: [
      'Expert senior RH avec 10+ ans expérience',
      'Session coaching 1h30 garantie',
      'Plan action concret et actionnable',
      'Suivi 7 jours inclus',
      'Remboursement si non satisfait'
    ],
    testimonial: {
      name: 'Aminata Traoré',
      role: 'Chef de Projet IT',
      text: 'L\'analyse 360° m\'a permis de comprendre pourquoi je stagnais. Le plan action était clair et concret. J\'ai obtenu une promotion 2 mois après en suivant les recommandations.'
    }
  },

  // ==================== RÉDACTION CV ====================
  {
    id: 'cv-optimise-ats',
    title: 'CV Optimisé ATS Professionnel',
    description: 'Rédaction complète CV professionnel compatible tous systèmes ATS avec score 95%+ garanti',
    icon: Target,
    category: 'CV Professionnel',
    duration: '2-3 jours',
    price: '25,000 FCFA',
    originalPrice: '40,000 FCFA',
    popular: true,
    badge: 'Le plus choisi',
    benefits: [
      'Restructuration complète professionnelle par expert RH',
      'Format ATS compatible 100% tous systèmes (Workday, Taleo, Lever, Greenhouse)',
      'Quantification de tous vos résultats avec chiffres impacts',
      'Mots-clés secteur optimisés pour votre industrie',
      'Verbes d\'action impactants (150+ liste propriétaire)',
      '3 révisions complètes incluses (7 jours)',
      'Mise en page sobre ATS-friendly moderne',
      'Optimisation sections : Résumé, Expériences, Compétences',
      'Adaptation au poste cible si fourni',
      'Format Word éditable + PDF professionnel',
      'Document explicatif de toutes modifications',
      'Guide personnalisation pour futures candidatures'
    ],
    process: [
      'Questionnaire approfondi (30 min) - Parcours, réalisations, objectifs',
      'Envoi CV actuel + description poste cible si disponible',
      'Entretien téléphonique 20 min pour précisions',
      'Rédaction professionnelle complète (2-3 jours)',
      'Livraison Version 1 (Word + PDF)',
      'Révisions selon vos retours (jusqu\'à 3 itérations)',
      'Validation finale avec checklist qualité',
      'Formation 15 min utilisation et personnalisation'
    ],
    deliverables: [
      'CV professionnel format Word (.docx) éditable',
      'CV format PDF haute qualité prêt envoi',
      'Score ATS 95%+ garanti avec rapport test',
      'Document explicatif modifications (2 pages)',
      'Guide personnalisation futures candidatures',
      'Checklist auto-validation (15 points)',
      '3 révisions gratuites pendant 7 jours',
      'Version alternative si 2 secteurs différents',
      'Support email 14 jours post-livraison'
    ],
    targetAudience: [
      'CV ne passant JAMAIS les filtres automatiques ATS',
      'Candidatures en ligne massives sans aucun succès',
      'Professionnels qualifiés mais jamais contactés',
      'Cadres soumettant CV à grandes entreprises (MTN, Total, Orange, banques)',
      'Candidats ayant CV complexe difficile à synthétiser',
      'Personnes voulant CV professionnel impactant'
    ],
    prerequisites: [
      'Avoir un CV existant (même basique)',
      'Connaître son parcours professionnel',
      'Avoir objectif professionnel clair',
      'Être disponible 20 min entretien téléphonique'
    ],
    guarantees: [
      'Compatible 100% tous systèmes ATS marché (testé sur 12 ATS majeurs)',
      'Score ATS minimum 95% garanti ou réécriture gratuite',
      'Révisions illimitées pendant 7 jours jusqu\'à satisfaction',
      'Satisfaction totale garantie ou remboursement intégral',
      'Confidentialité absolue - Signature NDA sur demande',
      'Expert RH certifié avec 500+ CV rédigés'
    ],
    faq: [
      {
        question: 'Qu\'est-ce qu\'un système ATS et pourquoi c\'est important ?',
        answer: 'ATS (Applicant Tracking System) = logiciel utilisé par 75% grandes entreprises africaines et 90% multinationales pour trier automatiquement les CV. Si votre CV n\'est pas optimisé ATS, il est rejeté avant qu\'un humain le voie. Notre optimisation garantit que votre CV passe ces filtres.'
      },
      {
        question: 'Mon CV actuel sera-t-il totalement changé ?',
        answer: 'Non, nous gardons toutes vos informations et expériences réelles. Nous optimisons la structure, le format, les mots-clés et la présentation pour maximiser l\'impact et passer les ATS. Vous reconnaîtrez votre parcours mais présenté de façon professionnelle et efficace.'
      },
      {
        question: 'Combien de révisions puis-je demander ?',
        answer: '3 révisions complètes incluses pendant 7 jours. Chaque révision peut modifier n\'importe quelle section. Au-delà, révisions à 3,000 FCFA/révision.'
      },
      {
        question: 'Le CV fonctionnera-t-il pour candidatures internationales ?',
        answer: 'Oui, notre format est universel et fonctionne pour candidatures au Cameroun, en Afrique et à l\'international. Nous adaptons le format selon la zone géographique cible si précisée.'
      }
    ],
    results: [
      'Taux de passage ATS : 97% (vs 35% moyenne CV standard)',
      'Taux de réponse après optimisation : +287% en moyenne',
      'Avant optimisation : 2 réponses sur 50 candidatures',
      'Après optimisation : 15 réponses sur 30 candidatures',
      'Délai moyen 1er entretien : 12 jours après envoi',
      'Score satisfaction clients : 4.9/5 (892 avis)'
    ],
    testimonial: {
      name: 'Mamadou Traoré',
      role: 'Ingénieur Logiciel - Douala',
      text: 'Résultat incroyable ! Avant : 2 réponses sur 50 candidatures en 4 mois. Après optimisation Irelis : 15 réponses sur 30 candidatures en 1 mois, dont 8 entretiens et 2 offres. Le ROI est de 1:40 !'
    }
  },

  {
    id: 'cv-premier-emploi',
    title: 'CV Premier Emploi Jeunes Diplômés',
    description: 'CV spécial débutants valorisant stages, projets et formations même sans expérience pro',
    icon: GraduationCap,
    category: 'Jeunes diplômés',
    duration: '2-3 jours',
    price: '18,000 FCFA',
    originalPrice: '25,000 FCFA',
    benefits: [
      'Structure CV spéciale débutants sans expérience',
      'Mise en valeur stages et projets académiques',
      'Valorisation compétences transférables (études → pro)',
      'Section formations et certifications optimisée',
      'Soft skills et qualités personnelles valorisées',
      'Format 1 page impactant (recommandé débutants)',
      'Objectif professionnel accrocheur',
      '2 révisions complètes incluses',
      'Guide pour adapter à différents postes',
      'Tips pour compenser manque d\'expérience'
    ],
    process: [
      'Questionnaire parcours détaillé : formations, stages, projets',
      'Identification compétences techniques et soft skills',
      'Rédaction CV optimisé pour débutants',
      'Livraison sous 48-72h (Word + PDF)',
      'Révisions selon vos retours (2 incluses)',
      'Conseils personnalisés pour décrocher 1er poste'
    ],
    deliverables: [
      'CV format Word 1 page professionnel',
      'CV format PDF prêt envoi',
      'Guide valorisation stages et projets (3 pages)',
      'Liste 50 verbes action pour débutants',
      '2 révisions complètes incluses',
      'Template lettre motivation jeune diplômé offert',
      'Conseils entretien 1er emploi (PDF 2 pages)'
    ],
    targetAudience: [
      'Jeunes diplômés sans expérience professionnelle',
      'Étudiants en fin de cursus recherchant 1er emploi',
      'Stagiaires voulant transformer stage en CDI',
      'Personnes ayant seulement stages ou projets académiques',
      'Reconversion sans expérience dans nouveau secteur'
    ],
    guarantees: [
      'CV professionnel même avec zéro expérience',
      'Livraison garantie sous 72h maximum',
      'Révisions jusqu\'à satisfaction (2 incluses)',
      'Expert spécialisé recrutement jeunes diplômés',
      'Format 1 page impactant garanti'
    ],
    faq: [
      {
        question: 'Comment valoriser mon parcours si je n\'ai aucune expérience ?',
        answer: 'Nous mettons en avant vos stages (même 1 mois), projets académiques, mémoires, travaux de groupe, compétences techniques, formations, certifications, activités associatives, bénévolat et soft skills. Tout compte et peut être valorisé professionnellement.'
      },
      {
        question: 'Mon CV fera-t-il vraiment 1 page alors que j\'ai peu de contenu ?',
        answer: 'Oui, 1 page est idéal et même recommandé pour jeunes diplômés. Nous remplissons intelligemment avec vos formations, compétences, projets et soft skills de façon structurée et aérée.'
      },
      {
        question: 'Puis-je utiliser ce CV pour postuler dans différents secteurs ?',
        answer: 'Oui, nous créons une version polyvalente. Le guide inclus vous explique comment adapter l\'objectif et les compétences selon le poste visé en 5 minutes.'
      }
    ],
    testimonial: {
      name: 'Adjara Diallo',
      role: 'Assistante Administrative Junior - Yaoundé',
      text: 'Sans aucune expérience après mes études, je pensais ne jamais décrocher. Le CV Irelis m\'a ouvert 5 portes en 2 semaines. J\'ai signé mon 1er CDI le mois suivant. Meilleur investissement de ma vie !'
    }
  },

  {
    id: 'cv-cadre-dirigeant',
    title: 'CV Executive Cadre Dirigeant',
    description: 'CV prestige pour cadres supérieurs et dirigeants avec storytelling carrière impactant',
    icon: Award,
    category: 'Executive',
    duration: '5-7 jours',
    price: '45,000 FCFA',
    badge: 'Premium',
    benefits: [
      'CV Executive 2 pages format prestige',
      'Storytelling carrière avec impacts business chiffrés',
      'Mise en avant réalisations stratégiques et leadership',
      'Quantification impacts : CA, rentabilité, économies, équipes',
      'Positionnement expertise et vision stratégique',
      'Biographie professionnelle 1 page (en bonus)',
      'Profil LinkedIn executive optimisé simultanément',
      'Références et recommandations structurées',
      'Format sobre prestige adapté niveau cadre sup',
      'Révisions illimitées pendant 14 jours',
      'Entretien approfondi 1h avec expert RH senior',
      'Discrétion et confidentialité absolue garantie'
    ],
    process: [
      'Entretien approfondi 1h (visio) - Parcours, réalisations, ambitions',
      'Recherche et benchmark secteur et concurrence',
      'Rédaction executive sur 5-7 jours',
      'Livraison CV + Biographie + LinkedIn',
      'Révisions jusqu\'à satisfaction totale (14 jours)',
      'Coaching 30 min utilisation et stratégie',
      'Support VIP pendant 30 jours'
    ],
    deliverables: [
      'CV Executive 2 pages format prestige (Word + PDF)',
      'Biographie professionnelle 1 page (format présentation)',
      'Profil LinkedIn executive optimisé',
      'Étude positionnement marché cadres votre secteur',
      'Révisions illimitées 14 jours',
      'Guide négociation salariale cadre sup (4 pages)',
      'Liste 30 chasseurs têtes Afrique avec contacts',
      'Template email approche chasseur (3 versions)',
      'Support VIP 30 jours (réponse <4h)'
    ],
    targetAudience: [
      'Cadres dirigeants (DG, DGA, Directeurs)',
      'Cadres supérieurs salaire >5M FCFA/an',
      'Executives recherchant opportunités stratégiques',
      'Profils board ou conseil administration',
      'Experts reconnus voulant visibilité prestige',
      'Cadres en transition vers poste supérieur'
    ],
    guarantees: [
      'Expert RH senior spécialisé recrutement executive',
      'Entretien 1h approfondi garanti',
      'Révisions illimitées 14 jours',
      'Confidentialité et discrétion absolue',
      'Signature NDA sur demande',
      'Format prestige adapté niveau cadre sup'
    ],
    testimonial: {
      name: 'Dr. Emmanuel Nkolo',
      role: 'Directeur Général Adjoint - Groupe Bancaire',
      text: 'Le CV Executive Irelis a transformé ma présentation professionnelle. J\'ai décroché 3 entretiens avec des boards de multinationales en 6 semaines. Le storytelling et les impacts chiffrés font toute la différence.'
    }
  },

  {
    id: 'cv-international',
    title: 'CV International Europe/Canada/USA',
    description: 'CV format international bilingue FR/EN adapté standards Europe, Canada, USA',
    icon: Globe,
    category: 'International',
    duration: '5-7 jours',
    price: '35,000 FCFA',
    benefits: [
      'Format adapté pays cible (France, Canada, USA, UK, Belgique, Suisse)',
      'Traduction professionnelle FR → EN par traducteur natif',
      'Version française ET version anglaise incluses',
      'Standards internationaux respectés (format, sections, terminologie)',
      'Optimisation ATS internationaux (Workday, Greenhouse, Lever)',
      'Équivalences diplômes et certifications internationales',
      'Adaptation culturelle selon pays cible',
      'Quantification résultats compréhensible internationalement',
      '3 révisions incluses',
      'Guide spécificités marché emploi pays cible'
    ],
    process: [
      'Sélection pays cible prioritaire',
      'Questionnaire parcours + objectifs',
      'Recherche standards pays cible',
      'Rédaction version française optimisée',
      'Traduction professionnelle en anglais',
      'Révisions bilingues simultanées',
      'Livraison 2 versions + guide pays'
    ],
    deliverables: [
      'CV français format international (Word + PDF)',
      'CV anglais traduit par natif (Word + PDF)',
      'Guide standards pays cible (4 pages)',
      'Équivalences diplômes officielles',
      'Liste 50 sites emploi pays cible',
      '3 révisions bilingues incluses',
      'Conseils visa travail si applicable',
      'Contacts recruteurs spécialisés diaspora'
    ],
    targetAudience: [
      'Candidats diaspora cherchant emploi Europe/Amérique',
      'Professionnels visant mobilité internationale',
      'Africains préparant immigration professionnelle',
      'Candidats projets PVT, études-travail, résidence',
      'Cadres ciblant multinationales présentes en Afrique et ailleurs'
    ],
    guarantees: [
      'Traduction professionnelle par natif anglophone',
      'Formats conformes standards internationaux',
      '2 versions FR + EN livrées',
      'Révisions bilingues incluses',
      'Guide pays cible fourni'
    ],
    faq: [
      {
        question: 'Quelle différence entre CV français et CV canadien/américain ?',
        answer: 'CV français : photo possible, état civil détaillé, format classique. CV Canada/USA : JAMAIS de photo, pas d\'âge/situation familiale (discrimination), format 2 pages max, focus résultats chiffrés. Nous adaptons selon pays cible.'
      },
      {
        question: 'La traduction anglaise est-elle vraiment professionnelle ?',
        answer: 'Oui, nous travaillons avec traducteurs natifs anglophones spécialisés RH. La traduction n\'est pas littérale mais adaptée culturellement et professionnellement.'
      },
      {
        question: 'Puis-je cibler plusieurs pays avec le même CV ?',
        answer: 'Oui dans une même zone (Europe francophone ou Amérique Nord). Pour zones très différentes (USA + France), mieux vaut 2 CV distincts.'
      }
    ],
    testimonial: {
      name: 'Yannick Owona',
      role: 'Développeur Full-Stack - Immigré Canada',
      text: 'Le CV international Irelis m\'a permis d\'obtenir 12 entretiens au Canada en 2 mois depuis Douala. Format parfait, traduction impeccable. J\'ai signé mon offre et j\'immigre dans 3 mois !'
    }
  },

  // ==================== LETTRES & EMAILS ====================
  {
    id: 'lettre-motivation-pro',
    title: 'Lettre Motivation Professionnelle',
    description: 'Rédaction 100% personnalisée lettre motivation percutante adaptée au poste visé',
    icon: FileText,
    category: 'Rédaction',
    duration: '24-48h',
    price: '12,000 FCFA',
    benefits: [
      'Rédaction 100% personnalisée et originale',
      'Accroche percutante garantie 3 premières lignes',
      'Adaptation parfaite au poste et entreprise cible',
      'Ton professionnel ajusté selon secteur',
      'Structure gagnante en 3 parties impactantes',
      'Mise en avant motivations et adéquation profil-poste',
      'Appel à action clair et convaincant',
      '2 révisions complètes incluses',
      'Format Word éditable + PDF',
      'Conseils adaptation pour autres postes'
    ],
    process: [
      'Brief détaillé 30 min (téléphone/visio)',
      'Envoi description poste + infos entreprise',
      'Questionnaire motivations et objectifs',
      'Rédaction personnalisée sur-mesure',
      'Livraison sous 24-48h',
      'Révisions selon retours (2 incluses)',
      'Validation finale avec tips utilisation'
    ],
    deliverables: [
      'Lettre motivation Word personnalisée (1 page)',
      'Version PDF prête à envoyer immédiatement',
      '2 révisions complètes incluses',
      'Guide adaptation à d\'autres postes similaires',
      'Checklist auto-validation qualité (10 points)',
      'Support email 7 jours post-livraison'
    ],
    targetAudience: [
      'Candidats ne sachant absolument pas quoi écrire',
      'Professionnels voulant se démarquer fortement',
      'Personnes n\'ayant jamais de réponses post-candidature',
      'Candidats pour poste très compétitif ou convoité',
      'Personnes manquant de temps pour rédiger'
    ],
    guarantees: [
      'Rédaction 100% originale et personnalisée (jamais de template)',
      'Livraison garantie sous 48h (jours ouvrés)',
      'Révisions jusqu\'à satisfaction (2 incluses)',
      'Accroche percutante garantie',
      'Zéro plagiat, zéro IA brute'
    ],
    faq: [
      {
        question: 'Dois-je fournir des informations spécifiques ?',
        answer: 'Oui, lors du brief de 30 min, nous récupérons : votre parcours, le poste visé précis, pourquoi vous voulez ce poste, pourquoi cette entreprise, vos atouts pour ce poste. Plus vous donnez d\'infos, plus la lettre sera personnalisée et impactante.'
      },
      {
        question: 'Puis-je utiliser la même lettre pour plusieurs postes ?',
        answer: 'Non recommandé. Chaque lettre est unique par poste/entreprise pour maximiser chances. Cependant, le guide fourni vous explique comment adapter facilement à des postes similaires.'
      },
      {
        question: 'La lettre sera-t-elle générique ou vraiment personnalisée ?',
        answer: 'Vraiment personnalisée à 100%. Nous ne travaillons JAMAIS avec templates. Chaque phrase est écrite spécifiquement pour vous, le poste et l\'entreprise cibles.'
      }
    ],
    testimonial: {
      name: 'Fatoumata Diop',
      role: 'Chef de Projet Marketing - Abidjan',
      text: 'La lettre Irelis a littéralement fait la différence. Le DRH m\'a dit que mon accroche l\'a interpellé et que ma motivation était palpable. Convoquée le lendemain, embauchée 3 jours après !'
    }
  },

  {
    id: 'pitch-mail',
    title: 'Pitch Mail / Email Candidature',
    description: 'Email candidature spontanée court et percutant de 150-200 mots avec objet accrocheur',
    icon: Send,
    category: 'Rédaction',
    duration: '24h',
    price: '5,000 FCFA',
    benefits: [
      'Email court impactant 150-200 mots',
      'Objet email accrocheur qui incite à ouvrir',
      'Accroche 3 premières lignes percutante',
      'Présentation synthétique et professionnelle',
      'Appel action clair et direct',
      'Format adapté candidature spontanée ou LinkedIn',
      '1 révision incluse',
      'Bonus : 3 variantes objets email'
    ],
    process: [
      'Brief rapide 10-15 min',
      'Rédaction email optimisé',
      'Livraison sous 24h',
      'Révision si besoin'
    ],
    deliverables: [
      'Email candidature 150-200 mots (Word + copie texte)',
      'Objet email accrocheur + 3 variantes',
      'Version adaptable LinkedIn',
      '1 révision incluse',
      'Tips envoi et timing optimal'
    ],
    targetAudience: [
      'Candidatures spontanées entreprises',
      'Messages privés LinkedIn recruteurs',
      'Relances après candidature',
      'Prises de contact réseau',
      'Candidatures rapides'
    ],
    testimonial: {
      name: 'Ibrahim Sow',
      role: 'Développeur Web',
      text: 'Email court mais ultra percutant ! 3 réponses positives sur 10 envois de candidatures spontanées. Taux jamais vu avant.'
    }
  },

  {
    id: 'pack-5-lettres',
    title: 'Pack 5 Lettres Motivation',
    description: 'Pack économique de 5 lettres personnalisées pour campagne candidatures multiples',
    icon: Package,
    category: 'Rédaction',
    duration: '5-7 jours',
    price: '45,000 FCFA',
    originalPrice: '60,000 FCFA',
    savings: 'Économisez 15,000 FCFA (25%)',
    benefits: [
      '5 lettres motivation 100% personnalisées',
      'Adaptation à 5 postes/entreprises différents',
      'Formats Word + PDF pour chaque lettre',
      'Guide personnalisation fourni',
      '2 révisions par lettre (10 révisions total)',
      'Livraison échelonnée ou groupée selon besoin',
      'Support étendu pendant toute durée projet'
    ],
    deliverables: [
      '5 lettres motivation personnalisées (Word + PDF)',
      'Guide personnalisation rapide',
      '10 révisions total (2 par lettre)',
      'Bonus : Template email envoi candidature'
    ],
    targetAudience: [
      'Candidats postulant à plusieurs postes simultanément',
      'Recherche emploi multi-secteurs',
      'Campagne candidatures massive ciblée',
      'Professionnels changeant secteur',
      'Candidats voulant économiser sur volume'
    ]
  },

  // ==================== TEMPLATES ====================
  {
    id: 'template-cv-premium',
    title: 'Template CV Premium Téléchargement',
    description: 'Modèle CV Word professionnel moderne téléchargeable instantanément',
    icon: FileText,
    category: 'Templates',
    duration: 'Immédiat',
    price: '3,500 FCFA',
    originalPrice: '8,000 FCFA',
    benefits: [
      'Template Word moderne et professionnel',
      '2 variantes couleurs (bleue sobre + grise élégante)',
      'Design ATS-compatible garanti',
      'Facile à personnaliser en 10 minutes',
      'Format 1-2 pages selon besoin',
      'Sections pré-structurées optimales',
      'Guide personnalisation rapide inclus',
      'Téléchargement immédiat 24/7',
      'Compatible Word 2010 et versions ultérieures',
      'Mise à jour gratuite 1 an'
    ],
    deliverables: [
      'Template Word (.docx) haute qualité',
      '2 variantes couleurs',
      'Guide personnalisation PDF (3 pages)',
      'Vidéo tutoriel 5 min (lien YouTube)',
      'Support email si problème technique'
    ],
    targetAudience: [
      'Candidats autonomes',
      'Budget limité',
      'Besoin urgent aujourd\'hui',
      'Personnes sachant rédiger leur CV',
      'Professionnels voulant design moderne'
    ],
    guarantees: [
      'Téléchargement immédiat après paiement',
      'Compatible tous systèmes (Windows, Mac)',
      'Support technique 48h',
      'Mise à jour 1 an offerte'
    ]
  },

  {
    id: 'pack-templates-cv',
    title: 'Pack 10 Templates CV Variés',
    description: 'Collection 10 designs CV professionnels styles variés pour tester et choisir le meilleur',
    icon: Package,
    category: 'Templates',
    duration: 'Immédiat',
    price: '12,000 FCFA',
    originalPrice: '35,000 FCFA',
    savings: 'Économisez 23,000 FCFA (66%)',
    benefits: [
      '10 templates CV designs très variés',
      'Styles : classique, moderne, créatif, minimaliste, coloré',
      'Tous formats ATS-compatibles',
      'Guide utilisation complet',
      'Téléchargement immédiat',
      'Tous éditables Word',
      'Vidéo tutoriel pour chaque template'
    ],
    deliverables: [
      '10 templates Word différents',
      'Guide utilisation 10 pages',
      '10 vidéos tutoriels courtes',
      'Bonus : 5 templates lettres motivation'
    ],
    targetAudience: [
      'Candidats voulant tester plusieurs styles',
      'Professionnels multi-secteurs',
      'Personnes indécises sur design optimal',
      'Recruteurs équipant candidats'
    ]
  },

  {
    id: 'template-lettre',
    title: 'Templates Lettres Motivation (15 secteurs)',
    description: '15 modèles lettres motivation pré-rédigées par secteur activité prêts personnalisation',
    icon: Mail,
    category: 'Templates',
    duration: 'Immédiat',
    price: '2,500 FCFA',
    benefits: [
      '15 templates par secteur activité',
      'Secteurs : IT, Finance, Marketing, RH, Logistique, Commerce, Santé, Éducation, BTP, Industrie, Agriculture, Tourisme, Communication, Juridique, Administration',
      'Structure gagnante pré-établie',
      '50 phrases accroche efficaces',
      'Guide adaptation rapide',
      'Exemples personnalisation concrets',
      'Téléchargement immédiat'
    ],
    deliverables: [
      '15 templates Word par secteur',
      'Banque 50 phrases accroche',
      'Guide adaptation (5 pages)',
      'Exemples personnalisation par secteur'
    ]
  },

  {
    id: 'pack-templates-complet',
    title: 'Pack Templates Complet (CV + Lettres + Emails)',
    description: 'Pack complet tous templates : 10 CV, 15 lettres, 5 emails, 3 relances + guides',
    icon: Package,
    category: 'Templates',
    duration: 'Immédiat',
    price: '15,000 FCFA',
    originalPrice: '40,000 FCFA',
    savings: 'Économisez 25,000 FCFA (62%)',
    popular: true,
    benefits: [
      '10 templates CV variés',
      '15 templates lettres motivation',
      '5 templates pitch mails',
      '3 templates emails relance',
      'Guides complets utilisation',
      'Vidéos tutoriels',
      'Support email 30 jours',
      'Mises à jour gratuites 1 an'
    ],
    deliverables: [
      '10 CV Word designs variés',
      '15 lettres motivation par secteur',
      '5 pitch mails efficaces',
      '3 emails relance',
      'Guide master complet 25 pages',
      'Vidéos tutoriels collection',
      'Bonus : Checklist candidature'
    ]
  },

  // ==================== COACHING & PRÉPARATION ====================
  {
    id: 'coaching-entretien',
    title: 'Coaching Entretien (1 Session)',
    description: 'Session coaching 1h30 avec simulation entretien réaliste et feedback expert RH',
    icon: Users,
    category: 'Coaching',
    duration: '1h30',
    price: '35,000 FCFA',
    popular: true,
    benefits: [
      'Session coaching personnalisée 1h30 (visio)',
      'Simulation entretien complète en conditions réelles',
      'Réponses préparées aux 20 questions pièges classiques',
      'Techniques anti-stress et gestion émotions',
      'Langage corporel et présentation professionnelle',
      'Vidéo enregistrement simulation pour révision',
      'Document écrit 20 questions-réponses personnalisées',
      'Plan action post-coaching',
      'Support WhatsApp 7 jours après session',
      'Bonus : Tips négociation salariale'
    ],
    process: [
      'Analyse du poste visé et entreprise (30 min préparation)',
      'Connexion visio à heure planifiée',
      'Coaching théorique 30 min (techniques, questions types)',
      'Simulation entretien 45 min (enregistrée)',
      'Feedback détaillé et plan amélioration 15 min',
      'Envoi vidéo + document + plan action',
      'Disponibilité WhatsApp 7 jours pour questions'
    ],
    deliverables: [
      'Session coaching 1h30 personnalisée',
      'Vidéo simulation pour révision illimitée',
      'Document 20 questions-réponses personnalisées (PDF 8 pages)',
      'Plan action amélioration (3 axes prioritaires)',
      'Checklist préparation entretien (15 points)',
      'Guide langage corporel (PDF 4 pages)',
      'Support WhatsApp 7 jours',
      'Bonus : Script négociation salariale'
    ],
    targetAudience: [
      'Candidats très stressés par entretiens',
      'Professionnels échouant systématiquement aux entretiens',
      'Personnes sans expérience entretien formel',
      'Candidats pour poste très important à décrocher',
      'Entretien dans 1-2 semaines et besoin préparation intensive'
    ],
    guarantees: [
      'Coach RH certifié avec 8+ ans expérience recrutement',
      'Simulation en conditions 100% réelles',
      'Enregistrement vidéo fourni pour révision',
      'Support WhatsApp 7 jours inclus',
      'Satisfaction garantie ou session gratuite supplémentaire'
    ],
    faq: [
      {
        question: 'La session se fait comment et sur quelle plateforme ?',
        answer: 'En visio (Zoom, Google Meet, WhatsApp Video, Teams - vous choisissez). Vous choisissez aussi le créneau horaire selon vos disponibilités. Simulation la plus réaliste possible avec caméra activée.'
      },
      {
        question: 'Puis-je refaire une simulation après la session ?',
        answer: 'Oui, sessions supplémentaires à tarif réduit (25,000 FCFA). Le support WhatsApp 7 jours permet aussi de poser questions et refaire mini-simulations écrites.'
      },
      {
        question: 'Le coaching est-il adapté à mon secteur spécifique ?',
        answer: 'Oui, nous adaptons totalement les questions et la simulation selon votre secteur (IT, Finance, Santé, Éducation, etc.) et le niveau de poste (junior, confirmé, cadre).'
      },
      {
        question: 'Vais-je vraiment recevoir la vidéo de ma simulation ?',
        answer: 'Oui, toujours ! Vidéo envoyée dans les 2h après session. Vous pouvez la revoir autant de fois que nécessaire et voir vos axes d\'amélioration.'
      }
    ],
    results: [
      'Taux réussite entretien après coaching : 78% (vs 32% avant)',
      'Amélioration confiance en soi : +420%',
      'Note moyenne clients : 4.9/5',
      'Nombre simulations réalisées : 1,247'
    ],
    testimonial: {
      name: 'Youssouf Kamara',
      role: 'Commercial - Orange Cameroun',
      text: 'Les simulations m\'ont donné une confiance incroyable. J\'ai anticipé 18 des 20 questions posées lors de mon entretien réel. J\'ai réussi 3 entretiens d\'affilée après ce coaching !'
    }
  },

  {
    id: 'pack-coaching-3',
    title: 'Pack 3 Sessions Coaching Entretien',
    description: 'Accompagnement progressif sur 3 sessions espacées avec suivi 30 jours complet',
    icon: Users,
    category: 'Coaching',
    duration: '3 sessions',
    price: '90,000 FCFA',
    originalPrice: '105,000 FCFA',
    savings: 'Économisez 15,000 FCFA (14%)',
    benefits: [
      '3 sessions coaching 1h30 espacées sur 3-4 semaines',
      'Progression évaluée entre chaque session',
      'Simulations différentes et progressives',
      'Vidéos des 3 simulations fournies',
      'Plan progression personnalisé',
      'Support WhatsApp 30 jours continus',
      'Perfectionnement progressif garanti',
      'Suivi long terme'
    ],
    deliverables: [
      '3 sessions coaching 1h30 chacune',
      '3 vidéos simulations',
      'Documents cumulatifs',
      'Plan progression sur 30 jours',
      'Support WhatsApp 30 jours'
    ]
  },

  {
    id: 'tests-psychotechniques',
    title: 'Simulation Tests Psychotechniques',
    description: 'Batterie complète tests psychotechniques avec correction détaillée et entraînement',
    icon: ClipboardCheck,
    category: 'Préparation',
    duration: '2-3h tests',
    price: '20,000 FCFA',
    benefits: [
      'Batterie complète tests professionnels',
      'Tests logique (matrices, suites, analogies)',
      'Tests numériques (calcul, tableaux, statistiques)',
      'Tests verbaux (compréhension, vocabulaire, orthographe)',
      'Tests attention et concentration',
      'Tests mémoire et raisonnement',
      'Correction automatique + analyse par expert',
      'Rapport détaillé forces et faiblesses',
      'Conseils amélioration personnalisés',
      'Session feedback 30 min',
      'Accès plateforme entraînement 15 jours'
    ],
    process: [
      'Inscription sur plateforme tests en ligne',
      'Passage batterie complète 2-3h',
      'Correction automatique immédiate',
      'Analyse approfondie par expert',
      'Rapport détaillé sous 48h',
      'Session feedback 30 min',
      'Accès entraînement supplémentaire 15 jours'
    ],
    deliverables: [
      'Accès plateforme tests en ligne',
      'Batterie 50+ tests variés',
      'Rapport analyse détaillé (12 pages PDF)',
      'Graphiques forces/faiblesses',
      'Conseils amélioration par domaine',
      'Session feedback 30 min',
      'Accès entraînement 15 jours (100+ tests)',
      'Correction détaillée chaque test'
    ],
    targetAudience: [
      'Candidats secteur bancaire (concours)',
      'Concours fonction publique',
      'Grandes entreprises (Total, MTN, Orange, banques)',
      'Écoles et formations sélectives',
      'Tests psychotechniques annoncés dans processus recrutement'
    ],
    results: [
      'Amélioration moyenne après entraînement : +38%',
      'Taux réussite concours après préparation : 73%'
    ]
  },

  {
    id: 'negociation-salaire',
    title: 'Coaching Négociation Salariale',
    description: 'Stratégie personnalisée négociation salaire avec benchmark marché et simulation',
    icon: DollarSign,
    category: 'Coaching',
    duration: '1h session',
    price: '25,000 FCFA',
    benefits: [
      'Benchmark salaires détaillé votre secteur/poste/expérience',
      'Analyse positionnement vs marché',
      'Stratégie négociation personnalisée',
      'Arguments chiffrés et factuels',
      'Techniques négociation éprouvées',
      'Simulation négociation réaliste',
      'Plan B si refus employeur',
      'Session coaching 1h',
      'Guide négociation écrit',
      'Scripts dialogues préparés'
    ],
    process: [
      'Questionnaire : poste, expérience, offre actuelle, prétentions',
      'Recherche benchmark salarial marché',
      'Préparation stratégie et arguments',
      'Session coaching 1h (visio)',
      'Simulation négociation',
      'Remise guide et scripts'
    ],
    deliverables: [
      'Benchmark salarial détaillé (PDF 6 pages)',
      'Positionnement vs marché (graphique)',
      'Stratégie négociation personnalisée',
      'Arguments valorisation (10 points)',
      'Session coaching 1h simulation',
      'Guide négociation (8 pages)',
      'Scripts dialogues (3 scénarios)',
      'Plan B si refus'
    ],
    results: [
      'Augmentation moyenne obtenue : +18%',
      'ROI moyen : 15× l\'investissement (1er mois)',
      'Taux succès négociation : 82%'
    ],
    testimonial: {
      name: 'Linda Essomba',
      role: 'Comptable Senior',
      text: 'Grâce au benchmark et aux arguments préparés, j\'ai obtenu 150,000 FCFA de plus que l\'offre initiale. ROI de 6:1 dès le premier mois !'
    }
  },

  // ==================== VISIBILITÉ & PERSONAL BRANDING ====================
  {
    id: 'linkedin-complet',
    title: 'Profil LinkedIn Complet Optimisé',
    description: 'Optimisation complète profil LinkedIn pour visibilité maximale auprès recruteurs',
    icon: TrendingUp,
    category: 'Visibilité',
    duration: '3-5 jours',
    price: '28,000 FCFA',
    popular: true,
    benefits: [
      'Audit complet profil actuel (20 points vérifiés)',
      'Réécriture section À propos percutante FR + EN',
      'Optimisation toutes sections Expériences',
      'Optimisation section Compétences avec mots-clés secteur',
      'Photo professionnelle retouchée gratuitement',
      'Bannière personnalisée créée (design)',
      'Stratégie mots-clés SEO LinkedIn pour votre secteur',
      'Formation utilisation LinkedIn 1h (visio)',
      'Recommandations stratégie contenu',
      'Suivi WhatsApp 30 jours',
      'Connexions suggérées (50 profils ciblés)'
    ],
    process: [
      'Audit profil LinkedIn actuel',
      'Questionnaire approfondi parcours et objectifs',
      'Rédaction sections optimisées',
      'Création bannière personnalisée',
      'Retouche photo professionnelle',
      'Optimisation SEO et mots-clés',
      'Formation 1h utilisation',
      'Suivi 30 jours'
    ],
    deliverables: [
      'Audit profil détaillé (5 pages)',
      'Sections optimisées (À propos FR + EN, Expériences)',
      'Photo professionnelle retouchée',
      'Bannière personnalisée (3 propositions)',
      'Liste mots-clés secteur (30+)',
      'Formation vidéo 1h enregistrée',
      'Guide stratégie contenu (6 pages)',
      'Liste 50 connexions ciblées',
      'Support WhatsApp 30 jours',
      'Checklist optimisation (25 points)'
    ],
    targetAudience: [
      'Candidats invisibles sur LinkedIn',
      'Professionnels cherchant opportunités internationales',
      'Cadres voulant attirer recruteurs passifs',
      'Personal branding professionnel',
      'Visibilité secteur et réseau'
    ],
    guarantees: [
      'Visibilité recherches +500% sous 30 jours ou refonte gratuite',
      'Formation 1h garantie',
      'Suivi 30 jours inclus',
      'Photo retouche professionnelle',
      'Satisfaction ou remboursement'
    ],
    faq: [
      {
        question: 'Combien de temps avant de voir des résultats concrets ?',
        answer: 'En moyenne, nos clients reçoivent leur 1er contact recruteur sous 7-14 jours après optimisation. Visibilité dans recherches augmente de 500% en 2-4 semaines.'
      },
      {
        question: 'La photo professionnelle est-elle vraiment importante ?',
        answer: 'OUI, crucial ! Les profils avec photo professionnelle ont 14× plus de vues. Nous retouchons gratuitement votre photo existante (luminosité, contraste, fond) pour rendu professionnel.'
      },
      {
        question: 'Je n\'ai pas de photo professionnelle, que faire ?',
        answer: 'Prenez une photo simple avec smartphone (fond neutre, lumière naturelle, tenue professionnelle). Nous la retouchons gratuitement pour rendu professionnel optimal.'
      }
    ],
    results: [
      'Visibilité recherches : +500% en moyenne',
      'Vues profil : +600% en 30 jours',
      'Contacts recruteurs : +700%',
      '1er contact sous : 7-14 jours',
      'Satisfaction : 4.8/5'
    ],
    testimonial: {
      name: 'Marie Kouadio',
      role: 'Data Analyst - Abidjan',
      text: 'En 2 semaines, 12 recruteurs m\'ont contactée dont 3 internationaux. Mon profil apparaît maintenant en 1ère page des recherches "data analyst Côte d\'Ivoire". ROI incroyable !'
    }
  },

  {
    id: 'pack-visibilite-360',
    title: 'Pack Visibilité 360° Complet',
    description: 'Pack complet CV ATS + LinkedIn + Lettre + Stratégie pour visibilité maximale',
    icon: Star,
    category: 'Visibilité',
    duration: '7-10 jours',
    price: '65,000 FCFA',
    originalPrice: '88,000 FCFA',
    savings: 'Économisez 23,000 FCFA (26%)',
    badge: 'Meilleure valeur',
    popular: true,
    benefits: [
      'CV Optimisé ATS complet (valeur 25,000)',
      'Profil LinkedIn optimisé (valeur 28,000)',
      'Lettre motivation pro (valeur 12,000)',
      'Stratégie recherche emploi (valeur 28,000)',
      'Approche intégrée et cohérente',
      'Support 30 jours',
      'Suivi résultats',
      'Économie 23,000 FCFA'
    ],
    deliverables: [
      'CV ATS professionnel (Word + PDF)',
      'LinkedIn complet optimisé',
      'Lettre motivation personnalisée',
      'Stratégie recherche 30 jours',
      'Guide intégration tous outils',
      'Support 30 jours'
    ],
    targetAudience: [
      'Recherche emploi complète et sérieuse',
      'Candidats voulant maximiser chances',
      'Visibilité 360° tous canaux',
      'Approche professionnelle intégrée'
    ],
    results: [
      'Taux entretiens obtenus : 65% dans 30 jours',
      'Emploi trouvé : 73% sous 2 mois',
      'ROI moyen : 12:1'
    ]
  },

  // ==================== STRATÉGIE & MÉTHODOLOGIE ====================
  {
    id: 'strategie-recherche',
    title: 'Stratégie Recherche Emploi Personnalisée',
    description: 'Méthode complète et personnalisée recherche emploi efficace en Afrique',
    icon: MapPin,
    category: 'Stratégie',
    duration: '1 semaine',
    price: '28,000 FCFA',
    benefits: [
      'Analyse approfondie profil et objectifs',
      'Plan recherche personnalisé 30 jours',
      'Liste 100+ sites emploi actifs par pays Afrique',
      'Techniques recherche ciblée par secteur',
      'Planning hebdomadaire optimisé détaillé',
      'Méthode approche directe entreprises',
      'Tableau suivi candidatures Excel automatisé',
      '50 entreprises cibles avec contacts',
      'Templates emails (candidature, relance, réseau)',
      'Accompagnement WhatsApp 7 jours',
      'Ajustements stratégie selon résultats'
    ],
    process: [
      'Questionnaire approfondi : profil, expérience, objectifs, contraintes',
      'Analyse par expert emploi spécialiste marché africain',
      'Élaboration plan recherche multi-canaux',
      'Création planning et outils de suivi',
      'Remise plan action + outils',
      'Formation 30 min utilisation outils',
      'Accompagnement 7 jours pour questions'
    ],
    deliverables: [
      'Rapport analyse profil (5 pages)',
      'Plan recherche personnalisé 30 jours (10 pages)',
      'Liste 100+ sites emploi Afrique par pays (Excel)',
      'Liste 50 entreprises cibles avec contacts (Excel)',
      'Planning hebdomadaire 4 semaines (Excel)',
      'Tableau suivi candidatures automatisé (Excel)',
      '5 templates emails (candidature, relance, réseau, remerciement, relecture)',
      'Guide approche directe entreprises (4 pages)',
      'Checklist quotidienne/hebdomadaire',
      'Support WhatsApp 7 jours'
    ],
    targetAudience: [
      'Recherche désorganisée et inefficace',
      'Candidatures massives sans résultats',
      'Perte de temps et découragement',
      'Besoin méthode structurée éprouvée',
      'Recherche 1er emploi ou après longue pause'
    ],
    guarantees: [
      'Méthode éprouvée sur 500+ candidats',
      'Outils Excel automatisés fournis',
      'Liste sites emploi actualisée 2024-2025',
      'Support 7 jours pour questions',
      'Ajustements gratuits si besoin'
    ],
    results: [
      'Temps recherche : -60% (méthode vs recherche aléatoire)',
      'Taux réponses : +180%',
      'Emploi trouvé : moyenne 3-8 semaines',
      'Organisation : +400%',
      'Motivation : +250%'
    ],
    testimonial: {
      name: 'Seydou Konaté',
      role: 'Logisticien - Bamako',
      text: 'Avant : je postulais au hasard, découragé. Avec la méthode Irelis : recherche structurée, 10h/semaine bien utilisées. Résultat : emploi trouvé en 3 semaines ! Incroyable.'
    }
  },

  {
    id: 'reconversion-complete',
    title: 'Pack Reconversion Professionnelle Complète',
    description: 'Accompagnement complet reconversion professionnelle sur 3-4 semaines',
    icon: Award,
    category: 'Reconversion',
    duration: '3-4 semaines',
    price: '125,000 FCFA',
    badge: 'Transformation',
    benefits: [
      'Bilan compétences approfondi (3h)',
      'Tests orientation professionnelle',
      'Définition nouvelle trajectoire',
      'CV nouvelle orientation rédigé',
      'LinkedIn repositionné',
      '2 lettres motivation nouvelle voie',
      '3 sessions coaching espacées',
      'Stratégie recherche 30 jours',
      'Support 30 jours continu',
      'Transformation complète'
    ],
    process: [
      'Bilan compétences 3h (2 sessions)',
      'Tests orientation et personnalité',
      'Analyse approfondie résultats',
      'Définition projet professionnel',
      'Rédaction CV + LinkedIn nouvelle orientation',
      '3 sessions coaching (semaines 1, 2, 4)',
      'Élaboration stratégie recherche',
      'Support 30 jours'
    ],
    deliverables: [
      'Rapport bilan compétences (20 pages)',
      'Résultats tests orientation',
      'Projet professionnel défini (4 pages)',
      'CV nouvelle orientation',
      'LinkedIn repositionné',
      '2 lettres motivation',
      'Stratégie recherche 30 jours',
      '3 sessions coaching enregistrées',
      'Support 30 jours'
    ],
    targetAudience: [
      'Reconversion professionnelle majeure',
      'Changement secteur complet',
      'Évolution carrière profonde',
      'Retour emploi après pause longue',
      'Réorientation totale'
    ]
  },

  {
    id: 'bilan-competences',
    title: 'Bilan de Compétences Approfondi',
    description: 'Bilan compétences complet avec tests orientation et projet professionnel',
    icon: CheckCircle,
    category: 'Bilan',
    duration: '2-3 semaines',
    price: '80,000 FCFA',
    benefits: [
      'Entretien exploration 2h',
      'Tests compétences techniques',
      'Tests personnalité professionnelle',
      'Tests orientation carrière',
      'Analyse approfondie par expert',
      'Projet professionnel défini',
      'Plan action 90 jours',
      '3 sessions coaching 2h chacune',
      'Rapport complet 20 pages'
    ],
    deliverables: [
      'Rapport bilan 20 pages',
      'Cartographie compétences',
      'Résultats tests détaillés',
      'Projet professionnel clair',
      'Plan action 90 jours',
      '3 sessions coaching'
    ]
  }
];

interface ServicesGridProps {
  onServiceSelect: (service: Service) => void;
  selectedService: Service;
  filteredServices?: Service[];
}

export function ServicesGrid({ onServiceSelect, selectedService, filteredServices }: ServicesGridProps) {
  const servicesToDisplay = Array.isArray(filteredServices ?? services)
    ? (filteredServices ?? services)
    : [];


  return (
    <div className="h-auto">
      <div className="p-6 space-y-3">
        {servicesToDisplay.map((service) => {
          const Icon = service.icon;
          const isSelected = selectedService && selectedService.id === service.id;
          return (
            <Card
              key={service.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected 
                  ? 'border-2 border-primary bg-primary/10 shadow-md' 
                  : 'border border-border hover:border-primary/50'
              }`}
              onClick={() => onServiceSelect?.(service)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-primary' : 'bg-muted'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      isSelected ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-foreground leading-tight">
                        {service.title}
                      </h3>
                      {service.popular && (
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200 shrink-0">
                          {service.badge || 'Populaire'}
                        </Badge>
                      )}
                      {service.badge && !service.popular && (
                        <Badge variant="outline" className="shrink-0">
                          {service.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`${
                            service.price === 'Gratuit' 
                              ? 'bg-green-50 text-green-700 border-green-200' 
                              : 'bg-blue-50 text-primary border-blue-200'
                          }`}
                        >
                          {service.originalPrice && (
                            <span className="line-through mr-1 opacity-60 text-xs">
                              {service.originalPrice}
                            </span>
                          )}
                          {service.price}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {service.duration}
                        </span>
                      </div>
                      <ArrowRight className={`h-4 w-4 ${
                        isSelected ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    {service.savings && (
                      <p className="text-xs text-green-600 mt-1 font-medium">
                        {service.savings}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}