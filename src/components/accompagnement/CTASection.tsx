import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-[#14548C] text-white relative overflow-hidden">
      {/* Fond minimaliste */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center">
        {/* Badge urgence */}
        <div className="inline-flex items-center gap-2 bg-red-500 px-4 py-2 rounded-full mb-6 animate-pulse">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">Offre limitée : Plus que 7 places ce mois-ci</span>
        </div>

        <h2 className="text-4xl md:text-5xl mb-6 tracking-tight leading-tight">
          Prêt à décrocher l'emploi que vous méritez ?
        </h2>
        <p className="text-xl mb-4 text-white/90">
          <span className="text-[#FFB800]">327 personnes</span> ont trouvé un emploi ce mois-ci
        </p>
        <p className="text-lg mb-8 text-white/80">
          Rejoignez-les dès maintenant et transformez votre carrière en 60 jours
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button className="bg-[#FFB800] hover:bg-[#FFA500] text-[#030213] px-10 py-7 text-lg shadow-2xl rounded-lg transition-all transform hover:scale-105 hover:shadow-3xl group">
            <span className="relative">
              Commencer gratuitement maintenant
              <ArrowRight className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          <Button variant="outline" className="bg-transparent border-2 border-white/30 text-white hover:bg-white hover:text-[#14548C] px-8 py-7 text-lg rounded-lg backdrop-blur-sm transition-all">
            Parler à un conseiller (2 min)
          </Button>
        </div>

        {/* Preuve sociale */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                ))}
              </div>
              <span>+243 personnes ont rejoint aujourd'hui</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 sur 2,847 avis</span>
            </div>
          </div>
        </div>
        
        {/* Garanties */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8 border-t border-white/10">
          <div className="flex flex-col items-center gap-2">
            <svg className="w-6 h-6 text-[#FFB800] mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div className="text-sm">Sans engagement</div>
            <div className="text-white/60 text-xs">Arrêtez quand vous voulez</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-6 h-6 text-[#FFB800] mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div className="text-sm">Satisfaction garantie</div>
            <div className="text-white/60 text-xs">Ou remboursé à 100%</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-6 h-6 text-[#FFB800] mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div className="text-sm">Réponse immédiate</div>
            <div className="text-white/60 text-xs">Sous 2h, 7j/7</div>
          </div>
        </div>

        {/* Urgence supplémentaire */}
        <div className="mt-8 text-sm text-white/70">
          Dernière inscription il y a 12 minutes · Ne manquez pas votre chance
        </div>
      </div>
    </section>
  );
}