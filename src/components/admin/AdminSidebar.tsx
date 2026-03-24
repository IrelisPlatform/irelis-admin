// /src/components/recruiter/RecruiterSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  Package,
  FileText,
  Grid,
  Handshake,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";

interface AdminSidebarProps {
  onNavigateHome?: () => void;
}

const menuItems = [
  {
    id: "dashboard",
    label: "Tableau de bord",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    id: "jobs",
    label: "Offres",
    icon: FileText,
    href: "/admin",
  },
  {
    id: "modules",
    label: "Modules",
    icon: Package,
    href: "/admin/accompagnement",
  },
  // {
  //   id: "categories",
  //   label: "Categories",
  //   icon: Grid,
  //   href: "/admin/categories",
  // },
  // {
  //   id: "accompagnement",
  //   label: "Accompagnement",
  //   icon: Handshake,
  //   href: "/admin/accompagnement",
  // },
];

export function AdminSidebar({ onNavigateHome }: AdminSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "dashboard";
  const { user, logout } = useUser();
  const getInitials = () => {
    if (!user) return "AD";

    if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }

    return "AD";
  };


  return (
    <div className="w-64 bg-white border-r border-border h-screen fixed top-0 left-0 flex flex-col">
      {/* Logo et Titre Espace Administrateur */}
      <div className="px-6 pt-3 pb-2 bg-white shrink-0">
        <div className="pt-2 border-t border-blue-100 flex flex-col items-center gap-2">
          {/* Logo */}
          <img
            src="/icons/logo.png"
            alt="Irelis"
            className="h-14 w-auto cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onNavigateHome}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          <p className="text-[#1e3a8a] text-center tracking-wide font-medium">
            Espace Administrateur
          </p>
        </div>
      </div>

      {/* Navigation avec scrollbar invisible */}
      <nav className="flex-1 p-4 space-y-1 bg-white overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // Dashboard is active only on exact match, others on startsWith
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#1e3a8a]/10 text-[#1e3a8a]"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Profil utilisateur en bas */}
      <div className="p-4 border-t border-border bg-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
            {getInitials()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium">Administrateur</p>
            <p className="text-sm text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
