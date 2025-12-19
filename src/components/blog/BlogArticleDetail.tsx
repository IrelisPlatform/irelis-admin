// src/components/blog/BlogArticleDetail.tsx
'use client';

import { X, Calendar, Clock, CheckCircle2, Share2, Bookmark } from 'lucide-react';
import { BlogArticle } from '@/components/blog/BlogCard';
import { ImageWithFallback } from '@/components/blog/ImageWithFallback';

interface BlogArticleProps {
  article: BlogArticle;
  onClose: () => void;
}

export function BlogArticleDetail({ article, onClose }: BlogArticleProps) {
  const categoryColors = {
    'actualites': 'bg-purple-100 text-purple-700',
    'code-travail': 'bg-red-100 text-red-700',
    'conseils-candidats': 'bg-blue-100 text-blue-700',
    'conseils-entreprises': 'bg-green-100 text-green-700',
  };

  // Contenu détaillé selon la catégorie
  const getArticleContent = () => {
    switch (article.id) {
      case '1':
        return (
          <div className="prose prose-lg max-w-none">
            <h2>Le marché de l'emploi en pleine mutation</h2>
            <p>
              Le continent africain connaît une transformation sans précédent de son marché du travail. 
              Avec une population jeune et dynamique, l'Afrique représente un vivier de talents inégalé 
              pour les entreprises locales et internationales.
            </p>
            
            <h3>Les secteurs qui recrutent</h3>
            <ul>
              <li><strong>Technologies de l'information :</strong> Développement web, data science, cybersécurité</li>
              <li><strong>Banque et Finance :</strong> Fintech, mobile money, microfinance</li>
              <li><strong>Agriculture :</strong> Agritech, transformation agroalimentaire</li>
              <li><strong>Énergie :</strong> Énergies renouvelables, gestion de réseaux</li>
              <li><strong>Santé :</strong> E-santé, laboratoires, pharmacie</li>
            </ul>

            <h3>Les compétences recherchées en 2025</h3>
            <p>
              Les employeurs africains recherchent principalement des candidats maîtrisant :
            </p>
            <ul>
              <li>Les outils numériques et collaboratifs (Suite Office, Google Workspace)</li>
              <li>Les compétences en communication (français, anglais, langues locales)</li>
              <li>L'adaptabilité et la résolution de problèmes</li>
              <li>Le travail en équipe et le leadership</li>
            </ul>

            <h3>Conseils pour les candidats</h3>
            <p>
              Pour maximiser vos chances, nous recommandons de :
            </p>
            <ol>
              <li>Mettre à jour votre profil sur les plateformes comme Irelis</li>
              <li>Suivre des formations certifiantes en ligne</li>
              <li>Développer votre réseau professionnel sur LinkedIn</li>
              <li>Rejoindre les groupes WhatsApp/Telegram de recrutement</li>
              <li>Préparer un CV adapté au marché africain</li>
            </ol>

            <blockquote>
              "Le marché africain offre des opportunités exceptionnelles pour ceux qui savent 
              s'adapter et développer les bonnes compétences." - Amadou Diallo, DRH chez Orange Côte d'Ivoire
            </blockquote>
          </div>
        );

      case '2':
        return (
          <div className="prose prose-lg max-w-none">
            <h2>Le droit du travail OHADA : Ce que vous devez savoir</h2>
            <p>
              L'Organisation pour l'Harmonisation en Afrique du Droit des Affaires (OHADA) régit 
              les relations de travail dans 17 pays africains. Comprendre ces règles est essentiel 
              pour employeurs et employés.
            </p>
            
            <h3>Les types de contrats de travail</h3>
            <p><strong>1. Contrat à Durée Indéterminée (CDI)</strong></p>
            <ul>
              <li>Contrat sans limite de durée</li>
              <li>Période d'essai : 1 à 6 mois selon la catégorie professionnelle</li>
              <li>Préavis obligatoire en cas de rupture</li>
            </ul>

            <p><strong>2. Contrat à Durée Déterminée (CDD)</strong></p>
            <ul>
              <li>Maximum 2 ans, renouvelable une fois</li>
              <li>Doit être justifié par un besoin temporaire</li>
              <li>Prime de précarité à la fin du contrat</li>
            </ul>

            <h3>Période d'essai et préavis</h3>
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Catégorie</th>
                  <th className="border border-gray-300 px-4 py-2">Période d'essai</th>
                  <th className="border border-gray-300 px-4 py-2">Préavis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Ouvriers</td>
                  <td className="border border-gray-300 px-4 py-2">8 jours</td>
                  <td className="border border-gray-300 px-4 py-2">15 jours</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Employés</td>
                  <td className="border border-gray-300 px-4 py-2">1 mois</td>
                  <td className="border border-gray-300 px-4 py-2">1 mois</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Agents de maîtrise</td>
                  <td className="border border-gray-300 px-4 py-2">2 mois</td>
                  <td className="border border-gray-300 px-4 py-2">2 mois</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Cadres</td>
                  <td className="border border-gray-300 px-4 py-2">3 mois</td>
                  <td className="border border-gray-300 px-4 py-2">3 mois</td>
                </tr>
              </tbody>
            </table>

            <h3>Salaire minimum et avantages</h3>
            <ul>
              <li><strong>SMIG :</strong> Varie selon les pays (60 000 - 80 000 FCFA en moyenne)</li>
              <li><strong>Congés payés :</strong> Minimum 2,5 jours par mois travaillé</li>
              <li><strong>Heures supplémentaires :</strong> Majorées de 20% à 50% selon l'horaire</li>
              <li><strong>Prime d'ancienneté :</strong> Après 2 ans de service</li>
            </ul>

            <h3>Licenciement et indemnités</h3>
            <p>
              En cas de licenciement, l'employeur doit verser :
            </p>
            <ul>
              <li>Préavis ou indemnité compensatrice</li>
              <li>Indemnité de licenciement (selon l'ancienneté)</li>
              <li>Solde de tout compte (congés non pris, primes, etc.)</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <p className="text-sm">
                ⚠️ <strong>Important :</strong> Les règles peuvent varier légèrement selon les pays. 
                Consultez toujours le Code du Travail local et un avocat spécialisé.
              </p>
            </div>
          </div>
        );

      case '3':
        return (
          <div className="prose prose-lg max-w-none">
            <h2>Comment réussir son entretien d'embauche en Afrique</h2>
            <p>
              L'entretien d'embauche est une étape cruciale dans votre recherche d'emploi. 
              Voici nos conseils adaptés au contexte africain pour maximiser vos chances de succès.
            </p>

            <h3>Avant l'entretien</h3>
            <p><strong>1. Préparez-vous minutieusement</strong></p>
            <ul>
              <li>Renseignez-vous sur l'entreprise (site web, réseaux sociaux, actualités)</li>
              <li>Relisez l'offre d'emploi et préparez des exemples concrets</li>
              <li>Préparez vos réponses aux questions classiques</li>
              <li>Imprimez plusieurs copies de votre CV</li>
            </ul>

            <p><strong>2. Soignez votre présentation</strong></p>
            <ul>
              <li><strong>Tenue vestimentaire :</strong> Costume/tailleur sobre et professionnel</li>
              <li><strong>Ponctualité :</strong> Arrivez 10-15 minutes en avance</li>
              <li><strong>Documents :</strong> CV, diplômes, certificats, pièce d'identité</li>
            </ul>

            <h3>Pendant l'entretien</h3>
            <p><strong>Les règles d'or</strong></p>
            <ol>
              <li><strong>Salutation respectueuse :</strong> Serrez la main fermement, souriez</li>
              <li><strong>Langage corporel :</strong> Regardez dans les yeux, posture droite</li>
              <li><strong>Écoute active :</strong> Laissez le recruteur terminer ses questions</li>
              <li><strong>Réponses structurées :</strong> Utilisez la méthode STAR (Situation, Tâche, Action, Résultat)</li>
              <li><strong>Politesse :</strong> Utilisez "Monsieur", "Madame", "Vous"</li>
            </ol>

            <h3>Questions fréquentes et comment y répondre</h3>
            
            <p><strong>"Parlez-moi de vous"</strong></p>
            <p>
              Bon exemple : "Je suis diplômé en comptabilité de l'Université de Yaoundé. 
              J'ai 3 ans d'expérience chez Total où j'ai géré la facturation clients. 
              Je maîtrise Excel avancé et SAP. Je souhaite rejoindre votre entreprise pour..."
            </p>

            <p><strong>"Pourquoi voulez-vous travailler chez nous ?"</strong></p>
            <p>
              Bon exemple : "J'ai suivi l'expansion de votre entreprise au Cameroun. 
              Votre engagement dans la formation des jeunes et votre croissance de 30% cette année 
              montrent que vous êtes un employeur d'avenir. Mon expérience en... peut contribuer à..."
            </p>

            <p><strong>"Quels sont vos défauts ?"</strong></p>
            <p>
              Bon exemple : "Je suis parfois trop perfectionniste, ce qui peut ralentir mon travail. 
              Mais j'ai appris à prioriser et à déléguer pour améliorer mon efficacité."
            </p>

            <h3>Questions à poser au recruteur</h3>
            <ul>
              <li>Quelles sont les responsabilités quotidiennes du poste ?</li>
              <li>Quelle est la structure de l'équipe ?</li>
              <li>Quelles sont les perspectives d'évolution ?</li>
              <li>Quels sont les prochaines étapes du processus de recrutement ?</li>
            </ul>

            <h3>Après l'entretien</h3>
            <ul>
              <li>Envoyez un email de remerciement dans les 24h</li>
              <li>Relancez poliment après 1 semaine si pas de nouvelles</li>
              <li>Continuez vos recherches en parallèle</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="text-sm">
                <strong>Astuce locale :</strong> En Afrique, les relations humaines sont primordiales. 
                Montrez votre respect, votre sérieux et votre motivation avec authenticité.
              </p>
            </div>
          </div>
        );

      case '4':
        return (
          <div className="prose prose-lg max-w-none">
            <h2>Guide du recrutement efficace pour PME africaines</h2>
            <p>
              Recruter les bons talents est crucial pour la croissance de votre entreprise. 
              Ce guide vous donne les clés pour optimiser votre processus de recrutement.
            </p>

            <h3>1. Définir clairement le besoin</h3>
            <p><strong>Fiche de poste complète</strong></p>
            <ul>
              <li>Titre du poste clair et attractif</li>
              <li>Missions et responsabilités détaillées</li>
              <li>Compétences techniques et humaines requises</li>
              <li>Niveau d'expérience et diplômes</li>
              <li>Fourchette salariale (transparence = plus de candidatures)</li>
              <li>Avantages (transport, repas, formation, assurance...)</li>
            </ul>

            <h3>2. Choisir les bons canaux de diffusion</h3>
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Canal</th>
                  <th className="border border-gray-300 px-4 py-2">Avantages</th>
                  <th className="border border-gray-300 px-4 py-2">Coût</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Irelis Job Board</td>
                  <td className="border border-gray-300 px-4 py-2">Large audience, ciblé RH</td>
                  <td className="border border-gray-300 px-4 py-2">Gratuit à 50€/mois</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Groupes WhatsApp</td>
                  <td className="border border-gray-300 px-4 py-2">Viral, gratuit, local</td>
                  <td className="border border-gray-300 px-4 py-2">Gratuit</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">LinkedIn</td>
                  <td className="border border-gray-300 px-4 py-2">Profils qualifiés</td>
                  <td className="border border-gray-300 px-4 py-2">Gratuit à 200€/mois</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Universités</td>
                  <td className="border border-gray-300 px-4 py-2">Jeunes diplômés motivés</td>
                  <td className="border border-gray-300 px-4 py-2">Gratuit</td>
                </tr>
              </tbody>
            </table>

            <h3>3. Processus de sélection efficace</h3>
            <p><strong>Étape 1 : Tri des CV (J+1 à J+3)</strong></p>
            <ul>
              <li>Vérifiez les critères essentiels (diplôme, expérience)</li>
              <li>Éliminez les candidatures hors sujet</li>
              <li>Classez en 3 catégories : A (excellent), B (bon), C (moyen)</li>
            </ul>

            <p><strong>Étape 2 : Entretien téléphonique (J+4 à J+7)</strong></p>
            <ul>
              <li>Durée : 10-15 minutes</li>
              <li>Vérifier la motivation et la disponibilité</li>
              <li>Confirmer les prétentions salariales</li>
              <li>Évaluer la communication</li>
            </ul>

            <p><strong>Étape 3 : Entretien physique (J+8 à J+15)</strong></p>
            <ul>
              <li>Préparez vos questions à l'avance</li>
              <li>Évaluez les compétences techniques (test pratique si nécessaire)</li>
              <li>Observez le comportement et la présentation</li>
              <li>Présentez l'entreprise et le poste en détail</li>
            </ul>

            <p><strong>Étape 4 : Vérifications (J+16 à J+20)</strong></p>
            <ul>
              <li>Appeler les références (2 minimum)</li>
              <li>Vérifier les diplômes auprès des universités</li>
              <li>Demander un extrait de casier judiciaire si nécessaire</li>
            </ul>

            <h3>4. L'offre d'emploi et l'onboarding</h3>
            <p><strong>Proposition écrite</strong></p>
            <ul>
              <li>Titre du poste et rattachement hiérarchique</li>
              <li>Date de début et lieu de travail</li>
              <li>Salaire brut et avantages</li>
              <li>Type de contrat (CDI, CDD, période d'essai)</li>
              <li>Délai de réponse (généralement 5-7 jours)</li>
            </ul>

            <p><strong>Intégration réussie (premiers 90 jours)</strong></p>
            <ol>
              <li><strong>J-7 :</strong> Envoyez un email de bienvenue avec le programme de la première semaine</li>
              <li><strong>Jour 1 :</strong> Visite des locaux, présentation de l'équipe, remise du matériel</li>
              <li><strong>Semaine 1 :</strong> Formation aux outils et process, définition des objectifs</li>
              <li><strong>Mois 1 :</strong> Point hebdomadaire avec le manager</li>
              <li><strong>Mois 3 :</strong> Entretien de fin de période d'essai</li>
            </ol>

            <h3>5. Erreurs à éviter</h3>
            <ul>
              <li>❌ Ne pas répondre aux candidats (mauvaise image de marque)</li>
              <li>❌ Processus trop long (les bons candidats partent ailleurs)</li>
              <li>❌ Promesses non tenues (salaire, évolution...)</li>
              <li>❌ Discrimination (âge, sexe, ethnie, religion)</li>
              <li>❌ Négliger l'intégration (fort taux de départ en période d'essai)</li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6">
              <p className="text-sm">
                ✅ <strong>Conseil Irelis :</strong> Utilisez notre tableau de bord recruteur pour 
                centraliser toutes vos candidatures, collaborer avec votre équipe et suivre vos KPIs. 
                Gagnez 70% de temps sur votre processus de recrutement !
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="prose prose-lg max-w-none">
            <p>{article.excerpt}</p>
            <p>Contenu complet de l'article à venir...</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-modal-backdrop overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto bg-background rounded-lg shadow-2xl border border-border">
          {/* Header avec image */}
          <div className="relative h-80">
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              width={300}
              height={200}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-background text-foreground rounded-full p-2 hover:bg-muted transition-colors shadow-lg"
            >
              <X className="h-6 w-6" />
            </button>
            
            {article.verified && (
              <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Article vérifié
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Meta */}
            <div className="flex items-center justify-between mb-6">
              <span className={`px-4 py-2 rounded-full text-sm ${categoryColors[article.category]}`}>
                {article.categoryLabel}
              </span>
              <div className="flex items-center gap-4">
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-foreground">{article.title}</h1>

            {/* Author & Date */}
            <div className="flex items-center gap-6 mb-8 pb-6 border-b border-border">
              <span className="text-muted-foreground">Par {article.author}</span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>

            {/* Article Content */}
            <div className="text-foreground/80 leading-relaxed">
              {getArticleContent()}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
              {article.tags.map((tag) => (
                <span key={tag} className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 bg-gradient-to-r from-primary to-[#1e3a8a] text-primary-foreground rounded-lg p-6 text-center">
              <p className="mb-4">
                Rejoignez notre communauté RH africaine !
              </p>
              <div className="flex gap-4 justify-center">
                <button className="bg-[#25D366] hover:bg-[#20BD5A] px-6 py-2 rounded-lg transition-colors">
                  Rejoindre WhatsApp
                </button>
                <button className="bg-background text-primary hover:bg-muted px-6 py-2 rounded-lg transition-colors">
                  S'inscrire à la newsletter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}