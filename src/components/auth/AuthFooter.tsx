export function AuthFooter({ className = "" }) {
  return (
    <footer className={`py-4 text-center text-sm text-gray-500 ${className}`}>
      © {new Date().getFullYear()} Irelis · Conditions d’utilisation · Politique de confidentialité · Cookies
    </footer>
  );
}
