// src/components/accompagnement/AccompagnePage.tsx
"use client";

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { ServicesGrid, services, Service } from '@/components/accompagnement/ServicesGrid';
import { ServiceDetail } from '@/components/accompagnement/ServiceDetail';
import { CountryFilter } from '@/components/accompagnement/CountryFilter';
import { CTABanner } from '@/components/accompagnement/CTABanner';
import { CTASection } from '@/components/accompagnement/CTASection';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  CheckCircle2, Link, Upload, Search, FileText, Briefcase, TrendingUp, GraduationCap, Target, MessageCircle, CheckCircle, Users, Repeat, UserCheck, Globe, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AccompagnePageProps {
  initialCountry?: string;
}

export function AccompagnePage({ initialCountry = 'CM' }: AccompagnePageProps) {
  const [selectedService, setSelectedService] = useState<Service>(services[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(initialCountry ?? null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // CV Booster state
  const [jobLink, setJobLink] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvFileName, setCvFileName] = useState('Aucun fichier choisi');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      setCvFileName(file.name);
    }
  };

  const handleAnalyzeClick = () => {
    if (!jobLink || !cvFile) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      alert('Analyse simulée ! Votre CV est compatible à 87% avec cette offre.');
    }, 1500);
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    if (!isDesktop) {
      setIsSheetOpen(true);
    }
  };

  // Filtrage des services
  const filteredServices = services.filter(service => {
    if (selectedCategory) {
      const title = service.title.toLowerCase();
      const category = (service.category || '').toLowerCase();
      switch (selectedCategory) {
        case 'cv':
          if (!title.includes('cv') && !title.includes('lettre') && category !== 'cv professionnel' && category !== 'diagnostic') return false;
          break;
        case 'entretien':
          if (!title.includes('entretien') && !title.includes('négociation') && !title.includes('tests')) return false;
          break;
        case 'strategie':
          if (!title.includes('stratégie') && !title.includes('recherche')) return false;
          break;
        case 'linkedin':
          if (!title.includes('linkedin')) return false;
          break;
        case 'jeunes':
          if (!title.includes('premier emploi') && category !== 'jeunes diplômés') return false;
          break;
        case 'suivi':
          if (!title.includes('relance')) return false;
          break;
        case 'optimisation':
          if (!title.includes('ats')) return false;
          break;
        case 'reconversion':
          if (!title.includes('reconversion') && !title.includes('bilan') && !title.includes('stratégie')) return false;
          break;
        case 'branding':
          if (!title.includes('linkedin') && !title.includes('cv')) return false;
          break;
        case 'international':
          if (!title.includes('international') && !title.includes('europe') && !title.includes('canada')) return false;
          break;
      }
    }

    if (selectedCountry) {
      const serviceCountries = service.countries ?? ['ALL'];
      if (!serviceCountries.includes('ALL') && !serviceCountries.includes(selectedCountry)) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#14548C] px-4 py-1.5 rounded-full mb-3 text-sm">
              <CheckCircle2 className="h-4 w-4 text-[#FFB800]" />
              <span>Accompagnement professionnel</span>
            </div>
            <h1 className="text-3xl md:text-4xl mb-3 font-bold text-gray-900">
              Accompagnement carrière personnalisé
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              22 modules pour booster votre carrière en Afrique
            </p>
          </div>
        </div>
      </section>

      {/* CV Booster */}
      <section className="py-6 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">CV Booster</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Évaluez la compatibilité de votre CV avec une offre avant de postuler
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                <Link className="h-4 w-4" /> Lien de l'offre d'emploi
              </Label>
              <Input
                placeholder="https://www.irelis.com/offres/..."
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Collez le lien d'une offre Irelis ou d'un autre site
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                <Upload className="h-4 w-4" /> Votre CV
              </Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <label className="cursor-pointer">
                    Choisir un fichier
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCvFileChange}
                      className="hidden"
                    />
                  </label>
                </Button>
                <span className="text-sm text-gray-600 truncate max-w-[150px]">{cvFileName}</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleAnalyzeClick}
            disabled={!jobLink || !cvFile || isAnalyzing}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V6a6 6 0 616 6h2a8 8 0 11-16 0z"></path>
                </svg>
                Analyse en cours...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Analyser la compatibilité
              </>
            )}
          </Button>
        </div>
      </section>

      {/* Filtres */}
      <section className="px-6 lg:px-12 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Barre de catégories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { id: 'all', label: 'Tous les modules', icon: null },
              { id: 'cv', label: 'CV & Documents', icon: FileText },
              { id: 'entretien', label: 'Entretien & Négociation', icon: Users },
              { id: 'strategie', label: 'Stratégie emploi', icon: Target },
              { id: 'linkedin', label: 'LinkedIn & Réseaux', icon: TrendingUp },
              { id: 'jeunes', label: 'Jeunes diplômés', icon: GraduationCap },
              { id: 'suivi', label: 'Suivi & Relance', icon: MessageCircle },
              { id: 'optimisation', label: 'Optimisation ATS', icon: CheckCircle },
              { id: 'reconversion', label: 'Reconversion', icon: Repeat },
              { id: 'branding', label: 'Personal branding', icon: UserCheck },
              { id: 'international', label: 'Carrière internationale', icon: Globe }
            ].map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id || (category.id === 'all' && selectedCategory === null);
              
              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id === 'all' ? null : category.id)}
                  variant="outline"
                  size="sm"
                  className={`text-xs sm:text-sm transition-colors ${
                    isSelected 
                      ? 'bg-[#14548C] text-white border-[#14548C] hover:bg-[#0d3a5f]'
                      : 'border-gray-300 text-gray-700 hover:border-[#14548C] hover:text-[#14548C] hover:bg-gray-50'
                  }`}
                >
                  {Icon && <Icon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />}
                  <span className="whitespace-nowrap">{category.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Filtre pays */}
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-[#14548C] flex-shrink-0" />
            <CountryFilter 
              selectedCountry={selectedCountry}
              onCountrySelect={setSelectedCountry}
            />
          </div>
        </div>
      </section>

      {/* Grille + Détail */}
      <main className="max-w-6xl mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-200 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
            <ServicesGrid 
              onServiceSelect={handleServiceSelect}
              selectedService={selectedService}
              filteredServices={filteredServices}
            />
          </div>
          <div className="hidden lg:block lg:w-1/2 bg-gray-50 rounded-r-lg p-6">
            <ServiceDetail service={selectedService} />
          </div>
        </div>
      </main>

      {/* Sheet Mobile */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
          <div className="flex-shrink-0 border-b px-6 py-4">
            <SheetHeader>
              <SheetTitle>Détails du service</SheetTitle>
              <SheetDescription>Voici les détails du service sélectionné.</SheetDescription>
            </SheetHeader>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <ServiceDetail service={selectedService} />
          </div>
        </SheetContent>
      </Sheet>

      {/* CTA */}
      <CTABanner />

      {/* CTA */}
      <CTASection />
    </div>
  );
}