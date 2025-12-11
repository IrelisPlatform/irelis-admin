// src/components/recruiter/RecruiterHeader.tsx
"use client";

import { Bell, Settings, LogOut, Building2, FileText, ChevronDown, MessageCircle, Menu, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface RecruiterHeaderProps {
  onTabChange?: (tab: string) => void;
  onSettingsClick?: () => void;
  notifications?: number;
  onHeaderNavClick?: (tab: string) => void;
}

export function RecruiterHeader({ 
  onTabChange, 
  onSettingsClick,
  notifications = 5, 
  onHeaderNavClick
}: RecruiterHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth(); // ✅ email dynamique
  const companyEmail = user?.email || "recruteur@irelis.com";
  
  const getInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };

  const handleNavClick = (tab: string) => {
    onHeaderNavClick?.(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] border-b-2 border-blue-900 shadow-lg sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Section gauche - Logo + Navigation */}
          <div className="flex items-center gap-4 lg:gap-6 flex-wrap w-[80%]">
            {/* Logo */}
            <div className="flex-shrink-0 max-w-[120px]">
              <img
                src="/icons/logo.png"
                alt="Logo Irelis"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>

            {/* Navigation principale */}
            <nav className="hidden md:flex items-center gap-1 flex-wrap" role="navigation" aria-label="Navigation recruteur">
              <button 
                onClick={() => handleNavClick('cvtheque')}
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
                aria-label="Accéder à la CVthèque et au sourcing"
              >
                Sourcing
              </button>
              <button 
                onClick={() => handleNavClick('solutions')}
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
                aria-label="Accéder aux outils et solutions"
              >
                Outils
              </button>
              <button 
                onClick={() => handleNavClick('offres')}
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
                aria-label="Gérer vos offres d'emploi"
              >
                Mes offres
              </button>
              <button 
                onClick={() => handleNavClick('guides')}
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
                aria-label="Accéder aux guides et au support"
              >
                Support
              </button>
              <button 
                onClick={() => handleNavClick('subscriptions')}
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
                aria-label="Voir les abonnements et tarifs"
              >
                Abonnements et tarifs
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
                aria-label="Nous contacter"
              >
                Nous contacter
              </button>
              <button 
                onClick={() => handleNavClick('messages')}
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
                aria-label="Messages"
              >
                Messages
              </button>
            </nav>
          </div>

          {/* Section droite - Actions utilisateur */}
          <div className="flex items-center gap-2">
            {/* Notifications avec badge */}
            <button 
              className="relative hover:bg-white/10 text-white transition-all duration-200 w-11 h-11 rounded-lg flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
              aria-label={notifications > 0 ? `Notifications : ${notifications} non lues` : "Notifications"}
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-yellow-500 hover:bg-yellow-500 text-gray-900 text-xs font-semibold">
                  {notifications}
                </Badge>
              )}
            </button>

            {/* Avatar entreprise (initiales) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-200 h-11">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">
                    {getInitials(companyEmail)}
                  </div>
                  <span className="hidden lg:block">{companyEmail}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuItem 
                  className="cursor-pointer py-3"
                  onClick={() => handleNavClick('profilentreprise')}
                >
                  <Building2 className="w-4 h-4 mr-3" />
                  Profil entreprise
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  className="cursor-pointer py-3"
                  onClick={() => handleNavClick('offres')}
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Mes offres publiées
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  onClick={onSettingsClick} 
                  className="cursor-pointer py-3"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Paramètres du compte
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  className="cursor-pointer py-3 text-red-600 focus:text-red-600"
                  onClick={() => onTabChange?.('accueil')}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Menu burger mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sheet pour le menu mobile */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-white">
          <SheetHeader>
            <SheetTitle>Menu Recruteur</SheetTitle>
            <SheetDescription>Accédez à toutes les fonctionnalités</SheetDescription>
          </SheetHeader>
          
          {/* Logo dans le menu mobile */}
          <div className="py-4 border-b border-gray-200">
            <img
              src="/icons/logo.png"
              alt="Logo Irelis"
              className="h-8 w-auto object-contain"
            />
          </div>

          <div className="flex flex-col gap-2 mt-6">
            {/* Navigation */}
            <button
              onClick={() => handleNavClick('cvtheque')}
              className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              Sourcing
            </button>
            
            <button
              onClick={() => handleNavClick('solutions')}
              className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              Outils
            </button>
            
            <button
              onClick={() => handleNavClick('offres')}
              className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              Mes offres
            </button>
            
            <button
              onClick={() => handleNavClick('guides')}
              className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              Support
            </button>

            <button
              onClick={() => handleNavClick('subscriptions')}
              className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Abonnements et tarifs
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              Nous contacter
            </button>
            
            <button
              onClick={() => handleNavClick('messages')}
              className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Messages
            </button>
            
            <button
              onClick={() => handleNavClick('profilentreprise')}
              className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Profil entreprise
            </button>
            
            <button
              onClick={onSettingsClick}
              className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Paramètres
            </button>

            <div className="border-t border-gray-200 my-4"></div>

            {/* Déconnexion */}
            <button
              onClick={() => { onTabChange?.('accueil'); setIsMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}