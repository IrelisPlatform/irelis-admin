import logo from "@/../public/icons/logo.png";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo et description */}
          <div className="md:col-span-1">
            <img src={logo.src} alt="Irelis" className="h-12 mb-5 brightness-0 invert" />
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              La plateforme de référence pour trouver un emploi au Cameroun et en Afrique centrale.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#1e3a8a] hover:scale-110 transition-all duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#1e3a8a] hover:scale-110 transition-all duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#1e3a8a] hover:scale-110 transition-all duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#1e3a8a] hover:scale-110 transition-all duration-200">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Candidats */}
          <div>
            <h4 className="text-white mb-5">Candidats</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Rechercher un emploi</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Créer mon CV</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Accompagnement</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Conseils carrière</a></li>
            </ul>
          </div>

          {/* Entreprises */}
          <div>
            <h4 className="text-white mb-5">Entreprises</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Publier une offre</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Nos solutions RH</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Tarifs</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Espace recruteur</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-5">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#1e3a8a]" />
                <span>AKWA - Douala, Cameroun</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-[#1e3a8a]" />
                <span>+237 696 71 22 13</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-[#1e3a8a]" />
                <span>support@irelis.cm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-gray-400">© 2025 Irelis. Tous droits réservés.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/legal/terms" className="hover:text-white transition-all duration-200">Mentions légales</Link>
            <Link href="/legal/privacy" className="hover:text-white transition-all duration-200">Confidentialité</Link>
            <Link href="/legal/cgu" className="hover:text-white transition-all duration-200">CGU</Link>
            <Link href="/legal/faq" className="hover:text-white transition-all duration-200">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}