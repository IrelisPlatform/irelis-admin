import React from "react";

export const metadata = {
  title: "Politique de confidentialité - Irelis",
  description: "Comment nous collectons et protégeons vos données personnelles.",
};

export default function PrivacyPage() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">Politique de confidentialité</h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        Cette page décrit comment Irelis collecte, utilise et protège vos données. (Texte de
        politique de confidentialité — à personnaliser selon votre conformité RGPD/lois locales.)
      </p>
      <div className="prose max-w-none text-gray-700">
        <h3>Collecte des données</h3>
        <p>Nous collectons uniquement les données nécessaires au fonctionnement du service...</p>
        <h3>Utilisation</h3>
        <p>Les données sont utilisées pour fournir le service, améliorer l'expérience et pour la
        communication liée au produit.</p>
      </div>
    </section>
  );
}