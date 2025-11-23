import React from "react";

export const metadata = {
  title: "FAQ - Irelis",
  description: "Questions fréquentes sur l'utilisation de la plateforme Irelis.",
};

export default function FaqPage() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">FAQ</h2>
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h4 className="font-medium">Comment postuler ?</h4>
          <p>Créez un compte, consultez une offre et cliquez sur "Postuler".</p>
        </div>
        <div>
          <h4 className="font-medium">Comment publier une offre ?</h4>
          <p>Les entreprises peuvent publier via l'espace recruteur.</p>
        </div>
      </div>
    </section>
  );
}