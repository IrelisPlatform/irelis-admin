// src/components/accompagnement/ModuleCategoryButtons.tsx
import { FileText, Briefcase, TrendingUp, GraduationCap, Target, MessageCircle, CheckCircle, Users, Repeat, UserCheck, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModuleCategoryButtonsProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export function ModuleCategoryButtons({ selectedCategory, onCategorySelect }: ModuleCategoryButtonsProps) {
  const categories = [
    { id: 'all', label: ('filters.allModules'), icon: null },
    { id: 'cv', label: ('filters.cvDocuments'), icon: FileText },
    { id: 'entretien', label: ('filters.interview'), icon: Users },
    { id: 'strategie', label: ('filters.jobStrategy'), icon: Target },
    { id: 'linkedin', label: ('filters.linkedin'), icon: TrendingUp },
    { id: 'jeunes', label: ('filters.graduates'), icon: GraduationCap },
    { id: 'suivi', label: ('filters.followUp'), icon: MessageCircle },
    { id: 'optimisation', label: ('filters.atsOptim'), icon: CheckCircle },
    { id: 'reconversion', label: ('filters.careerChange'), icon: Repeat },
    { id: 'branding', label: ('filters.personalBranding'), icon: UserCheck },
    { id: 'international', label: ('filters.international'), icon: Globe }
  ];

  return (
    <div className="py-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id || (category.id === 'all' && selectedCategory === null);
          
          return (
            <Button
              key={category.id}
              onClick={() => onCategorySelect(category.id === 'all' ? null : category.id)}
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              className={`text-xs sm:text-sm transition-colors ${
                isSelected 
                  ? 'bg-[#14548C] text-white hover:bg-[#0d3a5f]'
                  : 'border-gray-300 text-gray-700 hover:border-[#14548C] hover:text-[#14548C] hover:bg-gray-50'
              }`}
            >
              {Icon && <Icon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />}
              <span className="whitespace-nowrap">{category.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}