// src/components/recruiter/Facturation.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function Facturation() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge className="bg-yellow-500 text-gray-900 hover:bg-yellow-500 mb-4">
            14 jours d'essai gratuit
          </Badge>
          <h1 className="mb-4">Choisissez la formule adaptée à vos besoins de recrutement</h1>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto mb-8">
            Accédez aux meilleurs talents du Cameroun et de toute l'Afrique francophone
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-lg transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-blue-900'
                  : 'bg-blue-800 text-white hover:bg-blue-700'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-lg transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-blue-900'
                  : 'bg-blue-800 text-white hover:bg-blue-700'
              }`}
            >
              Annuel
              <Badge className="ml-2 bg-yellow-500 text-gray-900 hover:bg-yellow-500">
                -20%
              </Badge>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-center items-start gap-8 flex-wrap max-w-[1400px] mx-auto">
          {/* Essentiel */}
          <Card className="p-8 hover:shadow-2xl transition-all relative w-full lg:w-[380px]">
            <div className="text-center mb-6">
              <h2 className="mb-2">Essentiel</h2>
              <p className="text-gray-600 text-sm mb-4">Recrutements occasionnels</p>
              <p className="text-xs text-gray-500 mb-6">1 à 10 postes par an</p>
              
              <div className="mb-6">
                <div className="text-4xl text-blue-600 mb-2">
                  {billingPeriod === 'monthly' ? '65 000' : '650 000'}
                  <span className="text-lg"> FCFA</span>
                </div>
                <p className="text-sm text-gray-600">
                  par {billingPeriod === 'monthly' ? 'mois' : 'an'}
                </p>
                {billingPeriod === 'yearly' && (
                  <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
                    Économisez 130 000 FCFA
                  </Badge>
                )}
              </div>

              <div className="mb-6">
                <p className="text-sm text-blue-600">25 contacts par mois</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <p className="text-sm text-left">Accédez à des candidats qualifiés correspondant à vos critères de sélection</p>
              <p className="text-sm text-left">Consultez la CVthèque sans limite et filtrez par secteur, ville et expérience</p>
              <p className="text-sm text-left">Combinez vos critères de recherche pour affiner ou élargir vos résultats</p>
              <p className="text-sm text-left">Sauvegardez vos recherches et recevez une alerte par SMS ou WhatsApp</p>
              <p className="text-sm text-left">Créez vos propres messages de contact personnalisés</p>
              <p className="text-sm text-left">Centralisez et suivez les réponses des candidats dans votre tableau de bord</p>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              Commencer l'essai gratuit
            </Button>
          </Card>

          {/* Découverte - Featured */}
          <Card className="p-8 hover:shadow-2xl transition-all relative border-2 border-green-500 w-full lg:w-[380px]">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-green-500 text-white hover:bg-green-500 px-4 py-1">
                Recommandé
              </Badge>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="mb-2">Découverte</h2>
              <p className="text-gray-600 text-sm mb-4">Testez la plateforme pendant 14 jours</p>
              
              <div className="mb-6">
                <div className="text-4xl text-green-600 mb-2">
                  Gratuit
                </div>
                <p className="text-sm text-gray-600">
                  Sans engagement ni paiement
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-green-600">5 contacts sur la période d'essai</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <p className="text-sm text-gray-900 mb-3 text-left">Tous les avantages Essentiel, plus :</p>
              <p className="text-sm text-left">Filtres avancés : mobilité géographique, type de contrat, disponibilité immédiate</p>
              <p className="text-sm text-left">Statistiques de performance pour suivre l'activité de votre équipe RH</p>
              <p className="text-sm text-left">Collaboration en équipe avec partage des profils et commentaires internes</p>
              <p className="text-sm text-left">Interface simplifiée pour les managers avec suivi en temps réel</p>
              <p className="text-sm text-left">Personnalisez l'objet de vos messages pour maximiser le taux de réponse</p>
              <p className="text-sm text-left">Relances automatiques par email et WhatsApp pour les candidats sans réponse</p>
            </div>

            <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
              Commencer gratuitement
            </Button>
          </Card>

          {/* Premium */}
          <Card className="p-8 hover:shadow-2xl transition-all relative border-2 border-purple-200 w-full lg:w-[380px]">
            <div className="text-center mb-6">
              <h2 className="mb-2">Premium</h2>
              <p className="text-gray-600 text-sm mb-4">Recrutement intensif toute l'année</p>
              
              <div className="mb-6">
                <div className="text-4xl text-purple-600 mb-2">
                  {billingPeriod === 'monthly' ? '200 000' : '2 000 000'}
                  <span className="text-lg"> FCFA</span>
                </div>
                <p className="text-sm text-gray-600">
                  par {billingPeriod === 'monthly' ? 'mois' : 'an'}
                </p>
                {billingPeriod === 'yearly' && (
                  <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
                    Économisez 400 000 FCFA
                  </Badge>
                )}
              </div>

              <div className="mb-6">
                <p className="text-sm text-purple-600">80 contacts par mois</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <p className="text-sm text-gray-900 mb-3 text-left">Tous les avantages Essentiel, plus :</p>
              <p className="text-sm text-left">Filtres avancés : mobilité géographique, type de contrat, disponibilité immédiate</p>
              <p className="text-sm text-left">Tableau de bord analytics avec métriques de recrutement et taux de conversion</p>
              <p className="text-sm text-left">Mutualisez vos contacts entre tous vos comptes Premium (multi-filiales)</p>
              <p className="text-sm text-left">Collaboration en équipe avec partage des profils et commentaires internes</p>
              <p className="text-sm text-left">Interface simplifiée pour les managers avec suivi en temps réel</p>
              <p className="text-sm text-left">Personnalisez l'objet de vos messages pour maximiser le taux de réponse</p>
              <p className="text-sm text-left">Relances automatiques par email et WhatsApp pour les candidats sans réponse</p>
              <p className="text-sm text-left">Support prioritaire par téléphone et WhatsApp</p>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
              Commencer l'essai gratuit
            </Button>
          </Card>
        </div>

        {/* Comparaison Section */}
        <div className="mt-16">
          <h2 className="text-center mb-8">Toutes les formules en un coup d'oeil</h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm">Fonctionnalités</th>
                    <th className="px-6 py-4 text-center text-sm">Essentiel</th>
                    <th className="px-6 py-4 text-center text-sm bg-green-50">Découverte</th>
                    <th className="px-6 py-4 text-center text-sm">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm">Contacts candidats par mois</td>
                    <td className="px-6 py-4 text-center text-sm">25</td>
                    <td className="px-6 py-4 text-center text-sm bg-green-50">5 total</td>
                    <td className="px-6 py-4 text-center text-sm">80</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm">Accès CVthèque illimité</td>
                    <td className="px-6 py-4 text-center text-sm">Oui</td>
                    <td className="px-6 py-4 text-center text-sm bg-green-50">Oui</td>
                    <td className="px-6 py-4 text-center text-sm">Oui</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm">Filtres de recherche standard</td>
                    <td className="px-6 py-4 text-center text-sm">Oui</td>
                    <td className="px-6 py-4 text-center text-sm bg-green-50">Oui</td>
                    <td className="px-6 py-4 text-center text-sm">Oui</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm">Alertes SMS et WhatsApp</td>
                    <td className="px-6 py-4 text-center text-sm">Oui</td>
                    <td className="px-6 py-4 text-center text-sm bg-green-50">Oui</td>
                    <td className="px-6 py-4 text-center text-sm">Oui</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm">Messages personnalisés</td>
                    <td className="px-6 py-4 text-center text-sm">Oui</td>
                    <td className="px-6 py-4 text-center text-sm bg-green-50">Oui</td>
                    <td className="px-6 py-4 text-center text-sm">Oui</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm">Filtres avancés</td>
                    <td className="px-6 py-4 text-center text-gray-300">—</td>
                    <td className="px-6 py-4 text-center text-sm bg-green-50">Oui</td>
                    <td className="px-6 py-4 text-center text-sm">Oui</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm">Statistiques et analytics</td>
                    <td className="px-6 py-4 text-center text-gray-300">—</td>
                    <td className="px-6 py-4 text-center text-sm bg-green-50">Oui</td>
                    <td className="px-6 py-4 text-center text-sm">Oui</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm">Collaboration en équipe</td>
                    <td className="px-6 py-4 text-center text-gray-300">—</td>
                    <td className="px-6 py-4 text-center text-sm bg-green-50">Oui</td>
                    <td className="px-6 py-4 text-center text-sm">Oui</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm">Relances automatiques</td>
                    <td className="px-6 py-4 text-center text-gray-300">—</td>
                    <td className="px-6 py-4 text-center text-sm bg-green-50">Oui</td>
                    <td className="px-6 py-4 text-center text-sm">Oui</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm">Mutualisation contacts multi-filiales</td>
                    <td className="px-6 py-4 text-center text-gray-300">—</td>
                    <td className="px-6 py-4 text-center bg-green-50 text-gray-300">—</td>
                    <td className="px-6 py-4 text-center text-sm">Oui</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm">Support prioritaire</td>
                    <td className="px-6 py-4 text-center text-gray-300">—</td>
                    <td className="px-6 py-4 text-center bg-green-50 text-gray-300">—</td>
                    <td className="px-6 py-4 text-center text-sm">Oui</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-blue-50 border-blue-200">
            <h3 className="mb-2">Besoin d'aide pour choisir ?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Notre équipe est disponible pour vous conseiller sur la formule adaptée à vos besoins
            </p>
            <Button variant="outline" className="bg-white">
              Nous appeler
            </Button>
          </Card>

          <Card className="p-8 bg-green-50 border-green-200">
            <h3 className="mb-2">Questions sur la facturation ?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Contactez-nous sur WhatsApp pour toute question sur les tarifs ou les moyens de paiement
            </p>
            <Button variant="outline" className="bg-white">
              WhatsApp
            </Button>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-center mb-8">Questions fréquentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-sm mb-2">Quels moyens de paiement acceptez-vous ?</h3>
              <p className="text-sm text-gray-600">
                Mobile Money (Orange Money, MTN Mobile Money), carte bancaire et virement bancaire pour les entreprises
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm mb-2">Puis-je changer de formule en cours d'abonnement ?</h3>
              <p className="text-sm text-gray-600">
                Oui, vous pouvez upgrader ou downgrader votre formule à tout moment. Les ajustements sont au prorata
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm mb-2">Les contacts non utilisés sont-ils reportés ?</h3>
              <p className="text-sm text-gray-600">
                Non, les contacts sont valables pour le mois en cours uniquement et ne sont pas cumulables
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm mb-2">Puis-je annuler mon abonnement à tout moment ?</h3>
              <p className="text-sm text-gray-600">
                Oui, sans frais ni pénalités. Votre accès reste actif jusqu'à la fin de la période payée
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}