// src/components/ui/LiveActivity.tsx

'use client';

import { useState, useEffect } from 'react';

const activities = [
  { name: "Sarah M.", location: "Douala", action: "a réservé une consultation" },
  { name: "Ibrahim K.", location: "Yaoundé", action: "a téléchargé son CV optimisé" },
  { name: "Fatou D.", location: "Douala", action: "a rejoint le programme" },
  { name: "Jean-Paul B.", location: "Yaoundé", action: "a décroché un entretien" },
  { name: "Aminata S.", location: "Bafoussam", action: "a réservé une consultation" },
];

export function LiveActivity() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentActivity((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activity = activities[currentActivity];

  return (
    <div className="fixed bottom-24 left-6 z-40 hidden lg:block">
      <div 
        className={`bg-card rounded-xl shadow-lg border border-border p-4 max-w-xs transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Indicateur en direct */}
          <div className="flex-shrink-0 mt-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
          
          {/* Contenu */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground">
              <span className="font-medium">{activity.name}</span> à {activity.location}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{activity.action}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Il y a quelques instants</p>
          </div>
        </div>
      </div>
    </div>
  );
}