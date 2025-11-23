// src/app/legal/layout.tsx

import React from "react";
import Link from "next/link";
import { LegalHeader } from "@/components/legal/LegalHeader";

export const metadata = {
  title: "Irelis - Documents légaux",
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#f9fafb] text-gray-800">
        <div className="min-h-screen flex flex-col">
          {/* Logo + titre */}
          <div className="bg-white border-b">
            <div className="max-w-3xl mx-auto px-6 py-6">
              <LegalHeader />
              <h1 className="text-xl font-semibold text-[#1e3a8a] text-center mt-4">
                Informations légales
              </h1>
              <p className="text-sm text-gray-500 mt-1 text-center">
                Informations et documents officiels
              </p>
            </div>
          </div>

          <main className="flex-1 flex justify-center py-10 px-4">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border p-8">
              {children}
            </div>
          </main>

          {/* pseudo footer (like auth pages) with small links */}
          <footer className="py-6 text-center text-sm text-gray-500">
            <div className="max-w-3xl mx-auto px-6 space-y-2">
              <div>
                <Link href="/" className="underline hover:text-[#1e3a8a]">
                  Retour à l'accueil
                </Link>
              </div>
              <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                <Link href="/legal/privacy">Politique de confidentialité</Link>
                <span>•</span>
                <Link href="/legal/terms">Mentions légales</Link>
                <span>•</span>
                <Link href="/legal/faq">FAQ</Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}