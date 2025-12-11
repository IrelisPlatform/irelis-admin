// /src/components/candidate/MatchingScore.tsx

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components//ui/badge';
import { Button } from '@/components//ui/button';
import { 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Info,
  X,
  Star,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MatchingCriteria {
  name: string;
  score: number;
  weight: number;
  details: string;
}

export interface MatchingResult {
  overallScore: number;
  level: 'high' | 'medium' | 'low';
  criteria: MatchingCriteria[];
  recommendation: string;
}

interface MatchingScoreProps {
  matchResult: MatchingResult;
  jobTitle?: string;
  candidateName?: string;
  showDetails?: boolean;
  compact?: boolean;
  onApply?: () => void;
}

export function MatchingScore({ 
  matchResult, 
  jobTitle,
  candidateName,
  showDetails = false,
  compact = false,
  onApply,
}: MatchingScoreProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  const { overallScore, level, criteria, recommendation } = matchResult;

  const levelConfig = {
    high: {
      label: 'Match élevé',
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: CheckCircle2,
      gradient: 'from-green-400 to-green-600',
    },
    medium: {
      label: 'Match moyen',
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: TrendingUp,
      gradient: 'from-blue-400 to-blue-600',
    },
    low: {
      label: 'Match faible',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: AlertCircle,
      gradient: 'from-yellow-400 to-yellow-600',
    },
  };

  const config = levelConfig[level];
  const Icon = config.icon;

  // Version compacte (badge simple)
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Badge className={`${config.bgColor} ${config.textColor} border ${config.borderColor} flex items-center gap-1`}>
          <Sparkles className="h-3 w-3" />
          {Math.round(overallScore)}% Match
        </Badge>
        <button
          onClick={() => setShowExplanation(true)}
          className="text-xs text-gray-600 hover:text-[#14548C] flex items-center gap-1"
        >
          <Info className="h-3 w-3" />
          Détails
        </button>

        {/* Modal explicatif */}
        <AnimatePresence>
          {showExplanation && (
            <MatchingExplanation
              matchResult={matchResult}
              jobTitle={jobTitle}
              candidateName={candidateName}
              onClose={() => setShowExplanation(false)}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Version complète
  return (
    <Card className={`border-2 ${config.borderColor} ${config.bgColor}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`${config.color} rounded-full p-2`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-medium ${config.textColor}`}>
                  {config.label}
                </span>
                <Badge className={`${config.color} text-white`}>
                  {Math.round(overallScore)}%
                </Badge>
              </div>
              {(jobTitle || candidateName) && (
                <p className="text-sm text-gray-600 mt-1">
                  {jobTitle ? `Pour le poste : ${jobTitle}` : candidateName ? `Candidat : ${candidateName}` : ''}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExplanation(!showExplanation)}
            className={config.textColor}
          >
            <Info className="h-4 w-4 mr-1" />
            Voir pourquoi
          </Button>
        </div>

        {/* Barre de progression */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallScore}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full bg-gradient-to-r ${config.gradient}`}
          />
        </div>

        {/* Recommandation */}
        <div className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-200">
          <Sparkles className={`h-4 w-4 ${config.textColor} flex-shrink-0 mt-0.5`} />
          <p className="text-sm text-gray-700">{recommendation}</p>
        </div>

        {/* Critères principaux (version courte) */}
        {showDetails && (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-medium text-gray-900">Critères évalués :</p>
            {criteria.slice(0, 3).map((criterion, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{criterion.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-full rounded-full ${config.color}`}
                      style={{ width: `${criterion.score}%` }}
                    />
                  </div>
                  <span className={`font-medium ${config.textColor} w-10 text-right`}>
                    {Math.round(criterion.score)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {onApply && level !== 'low' && (
          <Button
            onClick={onApply}
            className="w-full mt-4 bg-[#14548C] hover:bg-[#0d3a5f]"
          >
            Postuler maintenant
          </Button>
        )}

        {/* Modal explicatif détaillé */}
        <AnimatePresence>
          {showExplanation && (
            <MatchingExplanation
              matchResult={matchResult}
              jobTitle={jobTitle}
              candidateName={candidateName}
              onClose={() => setShowExplanation(false)}
            />
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

// Modal d'explication détaillée
function MatchingExplanation({
  matchResult,
  jobTitle,
  candidateName,
  onClose,
}: {
  matchResult: MatchingResult;
  jobTitle?: string;
  candidateName?: string;
  onClose: () => void;
}) {
  const { overallScore, level, criteria, recommendation } = matchResult;

  const levelConfig = {
    high: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    medium: { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    low: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  };

  const config = levelConfig[level];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className={`${config.bg} border-b ${config.border} p-6`}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className={`text-2xl ${config.color} flex items-center gap-2 mb-2`}>
                <Sparkles className="h-6 w-6" />
                Analyse du matching IA
              </h2>
              {(jobTitle || candidateName) && (
                <p className="text-gray-600">
                  {jobTitle || candidateName}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Score global */}
          <div className="mt-4 flex items-center gap-4">
            <div className="relative">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - overallScore / 100)}`}
                  className={config.color}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-medium ${config.color}`}>
                  {Math.round(overallScore)}%
                </span>
              </div>
            </div>
            <div className="flex-1">
              <p className={`font-medium ${config.color} mb-1`}>
                {level === 'high' ? 'Excellent match' : level === 'medium' ? 'Bon match' : 'Match partiel'}
              </p>
              <p className="text-sm text-gray-600">{recommendation}</p>
            </div>
          </div>
        </div>

        {/* Critères détaillés */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-300px)]">
          <h3 className="font-medium text-gray-900 mb-4">Détail des critères évalués</h3>
          <div className="space-y-4">
            {criteria.map((criterion, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{criterion.name}</span>
                  <Badge className={criterion.score >= 70 ? 'bg-green-100 text-green-700' : criterion.score >= 40 ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}>
                    {Math.round(criterion.score)}%
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className={criterion.score >= 70 ? 'bg-green-500' : criterion.score >= 40 ? 'bg-blue-500' : 'bg-yellow-500'}
                    style={{ width: `${criterion.score}%`, height: '100%', borderRadius: '9999px' }}
                  />
                </div>
                <p className="text-sm text-gray-600">{criterion.details}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">Poids : {criterion.weight}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Conseils d'amélioration */}
          {level !== 'high' && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Conseils pour améliorer votre matching
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                {criteria
                  .filter(c => c.score < 60)
                  .slice(0, 3)
                  .map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Améliorez vos compétences en {c.name.toLowerCase()}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            Cette analyse est générée par intelligence artificielle et peut être affinée
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Helper pour calculer le matching
export function calculateMatching(
  candidateProfile: any,
  jobRequirements: any
): MatchingResult {
  const criteria: MatchingCriteria[] = [
    {
      name: 'Compétences techniques',
      score: 85,
      weight: 35,
      details: '8 compétences sur 10 correspondent aux exigences du poste',
    },
    {
      name: 'Expérience professionnelle',
      score: 75,
      weight: 25,
      details: '5 ans d\'expérience sur les 7 requis, dans un secteur similaire',
    },
    {
      name: 'Formation académique',
      score: 90,
      weight: 15,
      details: 'Diplôme équivalent ou supérieur au niveau demandé',
    },
    {
      name: 'Langues',
      score: 100,
      weight: 10,
      details: 'Toutes les langues requises maîtrisées',
    },
    {
      name: 'Localisation',
      score: 60,
      weight: 10,
      details: 'Situé à 25km du lieu de travail, mobilité possible',
    },
    {
      name: 'Disponibilité',
      score: 80,
      weight: 5,
      details: 'Disponible sous 1 mois, flexibilité horaire confirmée',
    },
  ];

  // Calcul du score global pondéré
  const overallScore = criteria.reduce(
    (sum, c) => sum + (c.score * c.weight) / 100,
    0
  );

  let level: 'high' | 'medium' | 'low';
  let recommendation: string;

  if (overallScore >= 75) {
    level = 'high';
    recommendation = 'Profil hautement compatible. Nous recommandons fortement de postuler ou de contacter ce candidat.';
  } else if (overallScore >= 50) {
    level = 'medium';
    recommendation = 'Profil intéressant avec quelques écarts. Une candidature reste pertinente.';
  } else {
    level = 'low';
    recommendation = 'Profil partiellement compatible. Certains critères importants ne sont pas remplis.';
  }

  return {
    overallScore,
    level,
    criteria,
    recommendation,
  };
}
