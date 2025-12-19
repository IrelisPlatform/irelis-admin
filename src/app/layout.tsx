// /src/app/layout.tsx

import { Suspense } from "react";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: "Irelis Jobs",
  description: "Plateforme d’offres d’emploi premium",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${GeistSans.className} min-h-screen bg-background text-foreground`}>
        <Suspense fallback={null}>
          <LanguageProvider>
              {children}
              <Toaster 
                position="bottom-center"
                theme="light"
                richColors
              />
            <div className="fixed bottom-4 right-4 z-[1000]">
              <LanguageSwitcher />
            </div>
          </LanguageProvider>
        </Suspense>
      </body>
    </html>
  );
}

