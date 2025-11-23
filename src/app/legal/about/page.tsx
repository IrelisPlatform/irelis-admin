import React from "react";

export const metadata = {
  title: "À propos - Irelis",
  description: "Notre mission : connecter talents et entreprises en Afrique francophone.",
};

export default function AboutPage() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">À propos d'Irelis</h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        Irelis connecte talents et entreprises en Afrique francophone. Notre mission est de ...
      </p>
      <div className="text-gray-700 text-sm">
        <h3>Notre mission</h3>
        <p>Faciliter la rencontre entre talents qualifiés et entreprises locales.</p>
      </div>
    </section>
  );
}