"use client";

import { usePathname } from "next/navigation";
import AdminUserMenu from "@/components/admin/AdminUserMenu";
import React from "react";
import Image from "next/image";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryProvider } from "@/lib/providers/query-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const showHeader =
    pathname !== "/admin/login" && pathname !== "/admin/register";

  return (
    <QueryProvider>
      <div className="min-h-screen flex flex-col bg-[#f9fafb]">
        {showHeader && (
          <header className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/logo.png"
                  alt="Irelis"
                  width={32}
                  height={32}
                  loading="eager"
                  className="h-8 w-auto"
                />
              </div>
              <AdminUserMenu />
            </div>
          </header>
        )}

        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <NuqsAdapter>{children}</NuqsAdapter>
        </main>
      </div>
    </QueryProvider>
  );
}
