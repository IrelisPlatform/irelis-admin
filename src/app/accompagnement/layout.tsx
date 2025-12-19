// src/app/accompagnement/layout.tsx

'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ReactNode } from 'react';

export default function CandidateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}