export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-4xl font-bold text-[#1e3a8a] mb-4">
        Page introuvable
      </h1>
      <p className="text-gray-600 mb-6">
        La page que vous cherchez n'existe pas.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-[#1e3a8a] text-white rounded-xl hover:bg-[#1e40af]"
      >
        Retour à l'accueil
      </a>
    </div>
  );
}


