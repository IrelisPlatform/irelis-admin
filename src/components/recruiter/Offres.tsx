// src/components/recruiter/Offres.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Offres() {
  const pricingPlans = [
    {
      name: 'Pack Starter',
      description: 'Pour votre première publication',
      price: '8 000',
      offersCount: '1',
      features: [
        { text: '1 annonce publiée (emploi ou stage)', included: true },
        { text: '5 jours de visibilité sur la plateforme et réseaux partenaires', included: true },
        { text: 'Partage WhatsApp inclus', included: true },
        { text: 'Guide express pour bien rédiger son annonce', included: true },
        { text: 'Assistance e-mail gratuite', included: true },
        { text: 'Accès CVthèque', included: false },
        { text: 'Support prioritaire', included: false },
        { text: 'Outil de tri de candidatures', included: false }
      ],
      buttonText: 'Acheter ce pack',
      popular: false
    },
    {
      name: 'Pack Visibilité',
      description: 'Pour multiplier vos annonces',
      price: '25 000',
      offersCount: '4',
      features: [
        { text: 'Jusqu\'à 4 annonces (emploi, stage, alternance)', included: true },
        { text: '10 jours de visibilité multicanale sur le site, WhatsApp, Facebook, LinkedIn', included: true },
        { text: 'Accès à 10 CV ciblés (téléchargement direct)', included: true },
        { text: 'Mini-guide recrutement et checklist de diffusion', included: true },
        { text: 'Option optimisation annonce', included: true },
        { text: 'Partage prioritaire sur réseaux spécialisés', included: true },
        { text: 'Outil de tri de candidatures', included: false },
        { text: 'Support client prioritaire', included: false }
      ],
      buttonText: 'Acheter ce pack',
      popular: true
    },
    {
      name: 'Pack Premium',
      description: 'Pour vos campagnes longue durée',
      price: '70 000',
      offersCount: '10',
      features: [
        { text: 'Jusqu\'à 10 annonces à publier pendant 30 jours', included: true },
        { text: 'Diffusion maximale (site, réseaux, push, groupe WhatsApp VIP)', included: true },
        { text: 'Accès à 30 CV sélectionnés', included: true },
        { text: 'Modèle d\'e-mail de convocation personnalisable', included: true },
        { text: 'Outil de tri de candidatures', included: true },
        { text: 'Support client prioritaire', included: true },
        { text: 'Assistance complète à la rédaction d\'annonces', included: true },
        { text: 'Boost en tête de liste pendant 7 jours', included: true }
      ],
      buttonText: 'Acheter ce pack',
      popular: false
    }
  ];

  const addons = [
    {
      name: 'Boost 7 jours',
      description: 'Propulsez votre offre en tête de liste pendant 7 jours',
      price: '8 000',
      color: 'bg-orange-100 text-orange-700'
    },
    {
      name: 'Ciblage Premium',
      description: 'Notifications push aux candidats correspondant exactement',
      price: '12 000',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      name: 'Sourcing assisté',
      description: 'Notre équipe trouve et contacte 10 profils pour vous',
      price: '35 000',
      color: 'bg-green-100 text-green-700'
    }
  ];

  const advantages = [
    {
      title: 'Publication immédiate',
      description: 'Votre offre en ligne en moins de 5 minutes'
    },
    {
      title: 'Paiement sécurisé',
      description: 'Mobile Money, carte bancaire ou virement'
    },
    {
      title: 'Modification gratuite',
      description: 'Modifiez votre annonce autant que nécessaire'
    },
    {
      title: 'Diffusion élargie',
      description: 'Visible sur 12+ sites partenaires en Afrique'
    }
  ];

  const getPrice = (plan: typeof pricingPlans[0]) => {
    return plan.price;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge className="bg-yellow-500 text-gray-900 hover:bg-yellow-500 mb-4">
            Tarifs transparents
          </Badge>
          <h1 className="mb-4">Achetez vos offres d'emploi en packs réutilisables</h1>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            Utilisez vos offres quand vous voulez, elles restent en stock sans limite de temps
          </p>
        </div>
      </div>

      {/* Info banner */}
      <div className="max-w-7xl mx-auto px-6 -mt-6">
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-center gap-2 text-green-900">
            <p className="text-sm">Offre de lancement : tous les packs gratuits pendant 30 jours pour tester la plateforme</p>
          </div>
        </Card>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-8 relative ${plan.popular ? 'border-2 border-blue-600 shadow-2xl scale-105' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-600">
                  Le plus populaire
                </Badge>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-2">
                  <div className="text-gray-400 flex items-baseline justify-center gap-2">
                    <span className="text-3xl blur-sm">{getPrice(plan)}</span>
                    <span>FCFA</span>
                  </div>
                  <div className="text-green-600 mt-1">
                    <span className="text-4xl">Gratuit</span>
                  </div>
                  <p className="text-green-600 text-sm mt-1">pendant 30 jours</p>
                </div>
                <p className="text-gray-600 text-sm mb-1">
                  {parseInt(plan.offersCount) === 1 ? `${plan.offersCount} annonce` : `Jusqu'à ${plan.offersCount} annonces`}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`text-sm ${!feature.included ? 'text-gray-400' : ''}`}>
                      {feature.included ? '✓' : '✗'} {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' : ''}`}
                variant={plan.popular ? 'default' : 'outline'}
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Add-ons Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-3">Options complémentaires</h2>
            <p className="text-gray-600 text-lg">Boostez vos offres avec nos services premium</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {addons.map((addon, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all">
                <div className={`inline-block px-3 py-1 rounded-lg ${addon.color} mb-4`}>
                  {addon.name}
                </div>
                <p className="text-gray-600 text-sm mb-4">{addon.description}</p>
                <div className="mb-4">
                  <div className="flex items-baseline justify-center gap-1 text-gray-400">
                    <span className="text-2xl blur-sm">{addon.price}</span>
                    <span className="text-sm">FCFA</span>
                  </div>
                  <p className="text-green-600 text-sm mt-1 text-center">Gratuit pendant 1 mois</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Ajouter
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Advantages Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center">
              <h3 className="text-lg mb-2">{advantage.title}</h3>
              <p className="text-gray-600 text-sm">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <Card className="p-8 bg-gradient-to-r from-blue-900 to-blue-800 text-white text-center">
          <h2 className="mb-3 text-white">Besoin d'un forfait personnalisé ?</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Pour les grandes entreprises, nous créons des offres sur mesure adaptées à vos volumes
          </p>
          <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
            Demander un devis personnalisé
          </Button>
        </Card>
      </div>
    </div>
  );
}