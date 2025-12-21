// src/components/recruiter/Guides.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Guides() {
  const guideCategories = [
    {
      title: 'Rédaction d\'annonces',
      count: 12,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Sélection de candidats',
      count: 8,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Droit du travail',
      count: 15,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Stratégies RH',
      count: 10,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const featuredGuides = [
    {
      category: 'Rédaction',
      title: 'Comment rédiger une offre d\'emploi qui attire les meilleurs talents',
      description: 'Les 7 éléments essentiels pour une annonce efficace en Afrique',
      readTime: '8 min',
      downloads: 2453,
      popular: true
    },
    {
      category: 'Législation',
      title: 'Guide complet du Code du Travail au Cameroun',
      description: 'Tout ce que les recruteurs doivent savoir sur la législation locale',
      readTime: '15 min',
      downloads: 1876,
      popular: true
    },
    {
      category: 'Entretiens',
      title: 'Les 50 meilleures questions à poser en entretien',
      description: 'Questions adaptées au contexte professionnel africain',
      readTime: '12 min',
      downloads: 3102,
      popular: true
    },
    {
      category: 'Stratégie',
      title: 'Réduire le turnover de 40% : stratégies éprouvées',
      description: 'Fidélisation des talents dans un marché compétitif',
      readTime: '10 min',
      downloads: 1654,
      popular: false
    },
    {
      category: 'Salaires',
      title: 'Grille salariale 2025 : Cameroun, Sénégal, Côte d\'Ivoire',
      description: 'Benchmark complet par secteur et niveau d\'expérience',
      readTime: '20 min',
      downloads: 4231,
      popular: true
    },
    {
      category: 'Rédaction',
      title: 'Les erreurs à éviter dans vos annonces',
      description: '10 pièges qui font fuir les bons candidats',
      readTime: '6 min',
      downloads: 1543,
      popular: false
    }
  ];

  const templates = [
    {
      title: 'Modèle d\'offre d\'emploi',
      description: 'Template Word personnalisable pour tous secteurs',
      format: 'DOCX'
    },
    {
      title: 'Grille d\'évaluation candidat',
      description: 'Tableau Excel pour noter objectivement les profils',
      format: 'XLSX'
    },
    {
      title: 'Email de refus bienveillant',
      description: '5 modèles d\'emails pour préserver votre marque employeur',
      format: 'PDF'
    },
    {
      title: 'Contrat de travail type',
      description: 'Modèle conforme au Code du Travail camerounais',
      format: 'DOCX'
    }
  ];

  const webinars = [
    {
      title: 'Recruter sans se tromper : les clés du sourcing intelligent',
      date: '15 Décembre 2025',
      time: '14h00 GMT',
      speaker: 'Marie Kouassi',
      role: 'Experte RH',
      spots: 45
    },
    {
      title: 'Construire une marque employeur attractive en Afrique',
      date: '22 Décembre 2025',
      time: '15h00 GMT',
      speaker: 'Amadou Diallo',
      role: 'Consultant RH',
      spots: 28
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge className="bg-yellow-500 text-gray-900 hover:bg-yellow-500 mb-4">
            Centre de ressources
          </Badge>
          <h1 className="mb-4">Guides et ressources pour recruter comme un pro</h1>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            Tous nos conseils d'experts pour optimiser vos recrutements en Afrique
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {guideCategories.map((category, index) => {
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-all cursor-pointer group">
                <h3 className="text-lg mb-1">{category.title}</h3>
                <p className="text-gray-600 text-sm">{category.count} guides</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Featured Guides */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="mb-1">Guides populaires</h2>
            <p className="text-gray-600">Les ressources les plus téléchargées par les recruteurs</p>
          </div>
          <Button variant="outline">
            Tous les guides
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGuides.map((guide, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all group cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary">{guide.category}</Badge>
                {guide.popular && (
                  <span className="text-yellow-500 text-sm">★</span>
                )}
              </div>
              <h3 className="text-lg mb-2 group-hover:text-blue-600 transition-colors">
                {guide.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>{guide.readTime}</span>
                  <span>{guide.downloads} téléchargements</span>
                </div>
                <Button variant="ghost" size="sm" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  Lire
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Templates Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-3">Modèles téléchargeables</h2>
            <p className="text-gray-600 text-lg">Gagnez du temps avec nos templates prêts à l'emploi</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <Badge className="mb-3" variant="secondary">{template.format}</Badge>
                <h3 className="text-lg mb-2">{template.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Télécharger
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Webinars Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="mb-3">Webinaires gratuits</h2>
          <p className="text-gray-600 text-lg">Formations en ligne animées par des experts RH</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {webinars.map((webinar, index) => (
            <Card key={index} className="p-6">
              <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100">
                {webinar.spots} places restantes
              </Badge>
              <h3 className="text-lg mb-3">{webinar.title}</h3>
              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <p>{webinar.date} à {webinar.time}</p>
                <p>Animé par {webinar.speaker}, {webinar.role}</p>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                Réserver ma place
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <Card className="p-8 bg-gradient-to-r from-blue-900 to-blue-800 text-white text-center">
          <h2 className="mb-3 text-white">Recevez nos nouveaux guides par email</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Un guide pratique et des conseils d'experts chaque semaine dans votre boîte mail
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Votre email professionnel"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-white"
            />
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 whitespace-nowrap">
              S'abonner gratuitement
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}