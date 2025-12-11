// src/components/recruiter/Solutions.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Solutions() {
  const solutions = [
    {
      title: 'Boost d\'annonces',
      description: 'Mettez vos offres en avant pour 3x plus de visibilité',
      features: [
        'Position prioritaire 7 jours',
        'Badge "Offre vedette"',
        'Notification aux candidats ciblés',
        'Statistiques en temps réel'
      ],
      popular: false
    },
    {
      title: 'Sourcing Intelligent',
      description: 'Notre équipe trouve les candidats parfaits pour vous',
      features: [
        'Recherche active de profils',
        '5 candidats qualifiés livrés',
        'Présélection par nos experts',
        'Garantie satisfaction'
      ],
      popular: true
    },
    {
      title: 'Entretiens Vidéo',
      description: 'Système d\'entretiens vidéo différés pour gagner du temps',
      features: [
        'Questions personnalisées',
        'Réponses vidéo des candidats',
        'Notation et commentaires',
        'Partage avec votre équipe'
      ],
      popular: false
    },
    {
      title: 'Tests de compétences',
      description: 'Évaluez les candidats avec nos tests professionnels',
      features: [
        'Bibliothèque de 50+ tests',
        'Tests personnalisables',
        'Correction automatique',
        'Rapports détaillés'
      ],
      popular: false
    },
    {
      title: 'Multi-utilisateurs',
      description: 'Collaborez efficacement avec votre équipe RH',
      features: [
        'Comptes illimités',
        'Rôles et permissions',
        'Workflow d\'approbation',
        'Commentaires partagés'
      ],
      popular: false
    },
    {
      title: 'Analytics Avancé',
      description: 'Tableaux de bord et rapports détaillés de recrutement',
      features: [
        'Métriques de performance',
        'Temps de recrutement',
        'Taux de conversion',
        'Export Excel/PDF'
      ],
      popular: false
    }
  ];

  const packages = [
    {
      name: 'Starter',
      price: '49 000',
      currency: 'FCFA',
      period: 'mois',
      description: 'Pour les PME qui démarrent',
      features: [
        '3 offres actives',
        'CVthèque basique',
        'Support email',
        'Statistiques simples'
      ],
      highlighted: false
    },
    {
      name: 'Business',
      price: '129 000',
      currency: 'FCFA',
      period: 'mois',
      description: 'Pour les entreprises en croissance',
      features: [
        '10 offres actives',
        'CVthèque complète',
        'Support prioritaire',
        'Analytics avancé',
        '1 boost d\'annonce',
        'Multi-utilisateurs'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Sur mesure',
      currency: '',
      period: '',
      description: 'Pour les grandes structures',
      features: [
        'Offres illimitées',
        'CVthèque premium',
        'Account manager dédié',
        'API access',
        'Sourcing intelligent',
        'Formation équipe'
      ],
      highlighted: false
    }
  ];

  const benefits = [
    {
      title: 'Gain de temps',
      description: 'Réduisez de 60% le temps passé sur le recrutement'
    },
    {
      title: 'Meilleurs candidats',
      description: 'Accédez aux profils les plus qualifiés d\'Afrique'
    },
    {
      title: 'Sécurité des données',
      description: 'Vos données sont protégées selon les normes RGPD'
    },
    {
      title: 'Simple et rapide',
      description: 'Interface intuitive, aucune formation nécessaire'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge className="bg-yellow-500 text-gray-900 hover:bg-yellow-500 mb-4">
            Solutions de recrutement premium
          </Badge>
          <h1 className="mb-4">Des outils puissants pour recruter plus vite et mieux</h1>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            Automatisez votre recrutement avec nos solutions adaptées au marché africain
          </p>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="mb-3">Nos solutions pour recruteurs</h2>
          <p className="text-gray-600 text-lg">Choisissez les outils qui correspondent à vos besoins</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => {
            return (
              <Card key={index} className="p-6 hover:shadow-xl transition-all relative overflow-hidden group">
                {solution.popular && (
                  <Badge className="absolute top-4 right-4 bg-yellow-500 text-gray-900 hover:bg-yellow-500">
                    Populaire
                  </Badge>
                )}
                <h3 className="mb-2">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="text-sm">
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  En savoir plus
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Packages Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-3">Forfaits tout-en-un</h2>
            <p className="text-gray-600 text-lg">Combinez plusieurs solutions et économisez jusqu'à 30%</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`p-8 relative ${pkg.highlighted ? 'border-2 border-blue-600 shadow-xl' : ''}`}>
                {pkg.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 hover:bg-blue-600">
                    Recommandé
                  </Badge>
                )}
                <div className="text-center mb-6">
                  <h3 className="mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                  <div className="mb-2">
                    {pkg.currency ? (
                      <>
                        <span className="text-4xl">{pkg.price}</span>
                        <span className="text-gray-600 ml-2">{pkg.currency}/{pkg.period}</span>
                      </>
                    ) : (
                      <span className="text-3xl">{pkg.price}</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="text-sm">
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${pkg.highlighted ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' : ''}`}
                  variant={pkg.highlighted ? 'default' : 'outline'}
                >
                  {pkg.price === 'Sur mesure' ? 'Nous contacter' : 'Choisir ce forfait'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="mb-3">Pourquoi choisir nos solutions ?</h2>
          <p className="text-gray-600 text-lg">Des avantages concrets pour votre entreprise</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            return (
              <Card key={index} className="p-6 text-center">
                <h3 className="text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <Card className="p-8 bg-gradient-to-r from-blue-900 to-blue-800 text-white text-center">
          <h2 className="mb-3 text-white">Besoin de conseils pour choisir ?</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Nos experts RH vous accompagnent gratuitement dans le choix de vos solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              Discuter avec un expert
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Demander une démo
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}