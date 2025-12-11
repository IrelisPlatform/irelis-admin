import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className={`py-3 ${className}`}>
      <ol className="flex items-center flex-wrap gap-2 text-sm">
        <li>
          <button
            onClick={() => items[0]?.onClick?.()}
            className="flex items-center gap-1 text-gray-600 hover:text-[#14548C] transition-colors"
            aria-label="Retour à l'accueil"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Accueil</span>
          </button>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
            {index === items.length - 1 ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                onClick={item.onClick}
                className="text-gray-600 hover:text-[#14548C] transition-colors hover:underline"
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
