"use client";

import { usePathname, useRouter } from "next/navigation";
import AdminUserMenu from "@/components/admin/AdminUserMenu";
import React from "react";
import Image from "next/image";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryProvider } from "@/lib/providers/query-provider";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleNavigateHome = () => {
    router.push("/");
  };

  const pathname = usePathname();

  const isAuthPage =
    pathname === "/admin/login" || pathname === "/admin/register";

  return (
    <QueryProvider>
      <div className="min-h-screen bg-[#f9fafb]">
        {isAuthPage ? (
          <NuqsAdapter>{children}</NuqsAdapter>
        ) : (
          <div className="w-full max-w-[1920px] mx-auto flex min-h-screen">
            {/* Sidebar - fixe et cachée sur mobile */}
            <div className="hidden lg:block w-64 shrink-0 transition-all duration-300">
              <AdminSidebar onNavigateHome={handleNavigateHome} />
            </div>

            {/* Contenu principal */}
            <div className="flex-1 flex flex-col w-full min-w-0 transition-all duration-300">
              <AdminHeader />

              <main className="flex-1 overflow-y-auto bg-gray-50/50">
                <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 max-w-[1600px] mx-auto w-full">
                  <NuqsAdapter>{children}</NuqsAdapter>
                </div>
              </main>
            </div>
          </div>
        )}
      </div>
    </QueryProvider>
  );
}
