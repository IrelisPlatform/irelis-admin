import React from "react";

export const metadata = {
  title: "Politique Cookies - Irelis",
};

export default function CookiesPage() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">Politique Cookies</h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        Description des cookies utilisés, finalités et comment les désactiver.
      </p>
      <ul className="list-disc ml-6 text-gray-700 text-sm">
        <li>Cookies essentiels (authentification, sécurité)</li>
        <li>Cookies analytiques (statistiques anonymes)</li>
        <li>Cookies marketing (si applicables)</li>
      </ul>
    </section>
  );
}