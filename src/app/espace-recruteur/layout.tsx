// src/app/espace-recruteur/layout.tsx

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="[--background:#ffffff] [--foreground:oklch(0.145_0_0)] [--primary:#030213] [--primary-foreground:oklch(1_0_0)] [--card:#ffffff] [--border:rgba(0,0,0,0.1)]"
    >
      {children}
    </div>
  );
}