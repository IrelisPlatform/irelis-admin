// src/components/accompagnement/CTABanner.tsx
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Mail } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-gray-700 px-4 py-1.5 rounded-full mb-6 text-sm">
          <span className="w-2 h-2 rounded-full bg-[#FFB800]"></span>
          <span>12 places disponibles cette semaine</span>
        </div>

        <h2 className="text-2xl md:text-3xl mb-4 text-gray-900 font-bold">
          Votre futur vous attend
        </h2>
        <p className="text-lg mb-8 text-gray-600">
          Nos conseillers vous rappellent <span className="text-[#14548C]">gratuitement</span> sous 2 heures
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Button className="bg-[#D50032] hover:bg-[#B8002B] text-white px-6 py-5 shadow-md rounded-lg">
            Réserver ma place gratuitement
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-5 rounded-lg">
            <Phone className="mr-2 h-5 w-5" />
            Appel immédiat
          </Button>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#14548C]" />
              <span><span className="text-[#14548C]">Cameroun:</span> +237 696 71 22 13</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#14548C]" />
              <span><span className="text-[#14548C]">Email:</span> support@irelis.cm</span>
            </div>
          </div>
          <div className="text-center mt-2 text-xs text-gray-500">
            Disponible du lundi au vendredi de 9h à 18h
          </div>
        </div>
      </div>
    </section>
  );
}