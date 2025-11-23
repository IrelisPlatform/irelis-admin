import React from "react";

export const metadata = {
  title: "Mentions légales - Irelis",
};

export default function TermsPage() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">Mentions légales</h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        Informations légales de l'éditeur et de l'hébergeur. (Remplacez par vos mentions légales
        officielles.)
      </p>
      <div className="text-gray-700 space-y-3 text-sm">
        <p><strong>Éditeur</strong>: Irelis Platform</p>
        <p><strong>Adresse</strong>: (adresse de l'entreprise)</p>
        <p><strong>Contact</strong>: contact@irelis.example</p>
      </div>
    </section>
  );
}