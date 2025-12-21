// /src/components/recruiter/RecruiterSidebar.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

interface RecruiterSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNavigateHome?: () => void;
}

export function RecruiterSidebar({ activeTab, onTabChange, onNavigateHome }: RecruiterSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "jobs", label: "Mes offres" },
    { id: "sourcing", label: "Sourcing" },
    { id: "candidates", label: "Candidatures" },
    { id: "messaging", label: "Messagerie" },
    { id: "analytics", label: "Statistiques" },
    { id: "team", label: "Équipe" },
    { id: "templates", label: "Outils" },
    { id: "settings", label: "Paramètres" },
    { id: "support", label: "Support et aide" },
  ];

  return (
    <div className="w-64 bg-white border-r border-border h-screen sticky top-0 flex flex-col">
      {/* Logo et Titre Espace Recruteurs */}
      <div className="px-6 pt-3 pb-2 bg-white">
        <div className="pt-2 border-t border-blue-100 flex flex-col items-center gap-2">
          {/* Logo visible uniquement sur mobile */}
          <img 
            src="/icons/logo.png"
            alt="Irelis"
            className="h-14 w-auto cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onNavigateHome}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <p className="text-[#1e3a8a] text-center tracking-wide font-medium">Espace Recruteurs</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 bg-white">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onTabChange(item.id)}
          >
            <span className="truncate">{item.label}</span>
          </Button>
        ))}
      </nav>

      {/* Profil utilisateur en bas */}
      <div className="p-4 border-t border-border bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
            RH
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium">Équipe Recrutement</p>
            <p className="text-sm text-muted-foreground truncate">recrutement@ireliscameroun.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}