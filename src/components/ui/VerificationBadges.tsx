// src/components/ui/VerificationBadges.tsx

'use client';

import { CheckCircle2, Shield, Award, Verified } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface VerificationStatus {
  identityVerified: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  diplomaVerified: boolean;
  experienceVerified: boolean;
  profileComplete: boolean;
}

interface VerificationBadgesProps {
  status: VerificationStatus;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

// ✅ Mapping des badges avec les variables CSS de ton thème
const badgeConfig = {
  identityVerified: {
    label: 'Identité vérifiée',
    icon: Shield,
    colorVar: 'var(--chart-3)', // bleu → oklch(0.398 0.07 227.392)
    description: 'Pièce d\'identité validée par nos équipes',
  },
  emailVerified: {
    label: 'Email vérifié',
    icon: CheckCircle2,
    colorVar: 'var(--chart-4)', // vert → oklch(0.828 0.189 84.429)
    description: 'Adresse email confirmée',
  },
  phoneVerified: {
    label: 'Téléphone vérifié',
    icon: CheckCircle2,
    colorVar: 'var(--chart-4)',
    description: 'Numéro de téléphone confirmé',
  },
  diplomaVerified: {
    label: 'Diplôme vérifié',
    icon: Award,
    colorVar: 'var(--chart-2)', // violet → oklch(0.6 0.118 184.704)
    description: 'Diplômes validés auprès des institutions',
  },
  experienceVerified: {
    label: 'Expérience vérifiée',
    icon: Verified,
    colorVar: 'var(--chart-5)', // orange → oklch(0.769 0.188 70.08)
    description: 'Références professionnelles confirmées',
  },
};

export function VerificationBadges({ 
  status, 
  size = 'sm',
  showTooltip = true 
}: VerificationBadgesProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const activeKeys = Object.keys(status).filter(
    key => status[key as keyof VerificationStatus]
  ) as Array<keyof typeof badgeConfig>;

  if (activeKeys.length === 0) return null;

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {activeKeys.map(key => {
          const config = badgeConfig[key];
          if (!config) return null;

          const Icon = config.icon;
          
          const badgeElement = (
            <Badge
              key={key}
              className={`${sizeClasses[size]} flex items-center gap-1 border-none text-white`}
              style={{ backgroundColor: config.colorVar }} // ✅ Utilise la variable CSS
            >
              <Icon className={iconSizes[size]} />
              {size !== 'sm' && config.label}
            </Badge>
          );

          if (!showTooltip) return badgeElement;

          return (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                {badgeElement}
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">{config.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

export function ProfileCompletionBadge({ percentage }: { percentage: number }) {
  const getStyle = () => {
    if (percentage === 100) return { backgroundColor: 'var(--chart-4)' }; // vert
    if (percentage >= 70) return { backgroundColor: 'var(--chart-5)' }; // orange
    return { backgroundColor: 'var(--muted-foreground)' }; // gris
  };

  const getLabel = () => {
    if (percentage === 100) return 'Profil complet';
    if (percentage >= 70) return 'Presque complet';
    return 'Profil incomplet';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            className="flex items-center gap-1 border-none text-white"
            style={getStyle()}
          >
            {percentage === 100 && <CheckCircle2 className="w-3 h-3" />}
            {getLabel()} {percentage}%
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">
            {percentage === 100 
              ? 'Votre profil est complet et optimisé pour les recruteurs' 
              : `Complétez votre profil à 100% pour être 3x plus visible`}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function TopCandidateBadge({ rank }: { rank: number }) {
  // Utilise un dégradé CSS ou une couleur du thème → ici, on prend chart-5 + chart-4
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            className="flex items-center gap-1 border-none text-white"
            style={{
              background: 'linear-gradient(90deg, var(--chart-5), var(--chart-4))',
            }}
          >
            <Award className="w-3 h-3" />
            Top {rank}% candidat
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">
            Vous êtes dans le top {rank}% des candidats les plus consultés ce mois
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function FastResponderBadge() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            className="flex items-center gap-1 border-none text-white"
            style={{ backgroundColor: 'var(--chart-4)' }} // vert
          >
            <CheckCircle2 className="w-3 h-3" />
            Réponse rapide
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">Répond aux recruteurs en moins de 24h</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}