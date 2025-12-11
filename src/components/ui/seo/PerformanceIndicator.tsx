import { useState, useEffect } from 'react';
import { Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PerformanceIndicatorProps {
  show?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function PerformanceIndicator({ 
  show = true, 
  position = 'bottom-right' 
}: PerformanceIndicatorProps) {
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const [performanceScore, setPerformanceScore] = useState<'excellent' | 'good' | 'poor'>('good');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mesurer le temps de chargement
    if (window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      
      if (pageLoadTime > 0) {
        const loadTimeSeconds = (pageLoadTime / 1000).toFixed(2);
        setLoadTime(parseFloat(loadTimeSeconds));

        // Déterminer le score
        if (pageLoadTime < 1000) {
          setPerformanceScore('excellent');
        } else if (pageLoadTime < 3000) {
          setPerformanceScore('good');
        } else {
          setPerformanceScore('poor');
        }
      }
    }

    // Afficher l'indicateur après un délai
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!show || loadTime === null || !isVisible) return null;

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-20 right-4',
    'top-left': 'top-20 left-4',
  };

  const scoreConfig = {
    excellent: {
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: CheckCircle2,
      label: 'Excellent',
    },
    good: {
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: Zap,
      label: 'Bon',
    },
    poor: {
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: AlertCircle,
      label: 'À améliorer',
    },
  };

  const config = scoreConfig[performanceScore];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`fixed ${positionClasses[position]} z-50`}
    >
      <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-lg shadow-lg p-3 flex items-center gap-2 max-w-xs`}>
        <div className={`${config.color} rounded-full p-1.5`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <p className={`text-xs font-medium ${config.textColor}`}>
            Vitesse : {config.label}
          </p>
          <p className="text-xs text-gray-600">
            {loadTime}s de chargement
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Composant pour afficher les métriques détaillées
export function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<{
    loadTime: number;
    domReady: number;
    firstPaint: number;
    resourcesCount: number;
  } | null>(null);

  useEffect(() => {
    if (window.performance) {
      const perfData = window.performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      const domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart;
      
      // First Paint (si disponible)
      let firstPaint = 0;
      if (window.performance.getEntriesByType) {
        const paintEntries = window.performance.getEntriesByType('paint');
        const firstPaintEntry = paintEntries.find(entry => entry.name === 'first-paint');
        if (firstPaintEntry) {
          firstPaint = firstPaintEntry.startTime;
        }
      }

      // Nombre de ressources chargées
      const resources = window.performance.getEntriesByType('resource');
      
      setMetrics({
        loadTime: loadTime / 1000,
        domReady: domReady / 1000,
        firstPaint: firstPaint / 1000,
        resourcesCount: resources.length,
      });
    }
  }, []);

  if (!metrics) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
      <h4 className="font-medium text-gray-900 flex items-center gap-2">
        <Zap className="h-4 w-4 text-[#14548C]" />
        Métriques de performance
      </h4>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-600">Temps de chargement</p>
          <p className="font-medium text-gray-900">{metrics.loadTime.toFixed(2)}s</p>
        </div>
        <div>
          <p className="text-gray-600">DOM prêt</p>
          <p className="font-medium text-gray-900">{metrics.domReady.toFixed(2)}s</p>
        </div>
        {metrics.firstPaint > 0 && (
          <div>
            <p className="text-gray-600">First Paint</p>
            <p className="font-medium text-gray-900">{metrics.firstPaint.toFixed(2)}s</p>
          </div>
        )}
        <div>
          <p className="text-gray-600">Ressources</p>
          <p className="font-medium text-gray-900">{metrics.resourcesCount}</p>
        </div>
      </div>
    </div>
  );
}
