// src/components/auth/AuthFooter.tsx
import Link from "next/link";

export function AuthFooter({ className = "" }) {
  return (
    <footer className={`py-4 text-center text-sm text-gray-500 ${className}`}>
      © {new Date().getFullYear()} Irelis ·{" "}
      <Link href="/legal/terms" className="hover:underline">Conditions d’utilisation</Link> ·{" "}
      <Link href="/legal/privacy" className="hover:underline">Politique de confidentialité</Link> ·{" "}
      <Link href="/legal/cookies" className="hover:underline">Cookies</Link>
    </footer>
  );
}