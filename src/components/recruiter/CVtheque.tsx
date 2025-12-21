// src/components/recruiter/CVtheque.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  availability: string;
  verified: boolean;
  matchScore: number;
}

export function CVtheque() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');

  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Amadou Diallo',
      title: 'Développeur Full Stack',
      location: 'Dakar, Sénégal',
      experience: '5 ans',
      education: 'Master Informatique',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      availability: 'Disponible immédiatement',
      verified: true,
      matchScore: 95
    },
    {
      id: '2',
      name: 'Fatou Ndiaye',
      title: 'Chef de Projet Digital',
      location: 'Abidjan, Côte d\'Ivoire',
      experience: '7 ans',
      education: 'Master Marketing Digital',
      skills: ['Gestion de projet', 'Agile', 'Marketing', 'Analytics'],
      availability: 'Sous préavis 1 mois',
      verified: true,
      matchScore: 92
    },
    {
      id: '3',
      name: 'Jean-Paul Koffi',
      title: 'Comptable Senior',
      location: 'Douala, Cameroun',
      experience: '10 ans',
      education: 'Master Comptabilité',
      skills: ['Comptabilité', 'Audit', 'Fiscalité', 'OHADA'],
      availability: 'Disponible immédiatement',
      verified: true,
      matchScore: 88
    },
    {
      id: '4',
      name: 'Marie Kouassi',
      title: 'Responsable RH',
      location: 'Yaoundé, Cameroun',
      experience: '6 ans',
      education: 'Master GRH',
      skills: ['Recrutement', 'Formation', 'Paie', 'Droit du travail'],
      availability: 'Sous préavis 2 mois',
      verified: false,
      matchScore: 85
    },
    {
      id: '5',
      name: 'Ibrahim Traoré',
      title: 'Ingénieur Commercial',
      location: 'Lomé, Togo',
      experience: '4 ans',
      education: 'Licence Commerce',
      skills: ['Vente B2B', 'Négociation', 'CRM', 'Prospection'],
      availability: 'Disponible immédiatement',
      verified: true,
      matchScore: 82
    }
  ];

  const stats = [
    { label: 'CV disponibles', value: '12 450' },
    { label: 'CV vérifiés', value: '8 320' },
    { label: 'Nouveaux cette semaine', value: '234' },
    { label: 'Profils Premium', value: '3 180' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-3">
        <div className="max-w-7xl mx-auto px-6">
          {/* Barre de recherche avancée */}
          <Card className="p-2 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-1.5">
              <div className="md:col-span-2">
                <Input
                  placeholder="Poste, compétences, mots-clés..."
                  className="h-8 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Localisation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les villes</SelectItem>
                  <SelectItem value="douala">Douala</SelectItem>
                  <SelectItem value="yaounde">Yaoundé</SelectItem>
                  <SelectItem value="abidjan">Abidjan</SelectItem>
                  <SelectItem value="dakar">Dakar</SelectItem>
                  <SelectItem value="lome">Lomé</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Expérience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toute expérience</SelectItem>
                  <SelectItem value="junior">0-2 ans</SelectItem>
                  <SelectItem value="intermediate">3-5 ans</SelectItem>
                  <SelectItem value="senior">5-10 ans</SelectItem>
                  <SelectItem value="expert">10+ ans</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t">
              <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                Filtres avancés
              </Button>
              <Button size="sm" className="h-7 text-xs px-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                Rechercher
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {stats.map((stat, index) => {
            return (
              <Card key={index} className="p-2 text-center">
                <div className="text-lg mb-0.5">{stat.value}</div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Résultats de recherche */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="mb-1">Candidats disponibles</h2>
            <p className="text-gray-600">{candidates.length} profils correspondent à votre recherche</p>
          </div>
          <Select defaultValue="score">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Score de correspondance</SelectItem>
              <SelectItem value="recent">Plus récents</SelectItem>
              <SelectItem value="experience">Plus d'expérience</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {candidates.map((candidate, index) => (
            <Card key={candidate.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg">Candidat #{candidate.id}</h3>
                        {candidate.verified && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            Vérifié
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-900">{candidate.title}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                    <span>{candidate.location}</span>
                    <span>{candidate.experience}</span>
                    <span>{candidate.education}</span>
                    <span>{candidate.availability}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="ml-6 text-center">
                  <div className="mb-3">
                    <div className="text-3xl text-blue-600 mb-1">{candidate.matchScore}%</div>
                    <p className="text-gray-600 text-xs">Correspondance</p>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                      Voir le profil
                    </Button>
                    <Button variant="outline" className="w-full">
                      Télécharger CV
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA pour plus de résultats */}
        <Card className="mt-8 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="text-center">
            <h3 className="mb-2">Accédez à l'intégralité de la CVthèque</h3>
            <p className="text-gray-600 mb-6">Débloquez tous les profils et contactez directement les candidats</p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              Découvrir nos forfaits CVthèque
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}