// /app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { FloatingContact } from "@/components/FloatingContact";
import { AuthProvider } from "@/context/AuthProvider";


export const metadata = {
  title: "Irelis Jobs",
  description: "Plateforme d’offres d’emploi premium",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${GeistSans.className} min-h-screen bg-background text-foreground`}>

        <AuthProvider>
          <FloatingContact />
          {children}
        </AuthProvider>

      </body>
    </html>
  );
}


