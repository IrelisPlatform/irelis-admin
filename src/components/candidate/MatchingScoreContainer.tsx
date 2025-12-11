// src/components/candidate/MatchingScoreContainer.tsx
import { useState, useEffect } from "react";
import { MatchingScore, MatchingResult } from "@/components/candidate/MatchingScore";
import { useMatchingScore } from "@/hooks/candidate/useMatchingScore";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface MatchingScoreContainerProps {
  jobOfferId: string;
  jobTitle?: string;
  compact?: boolean;
  onApply?: () => void;
}

export function MatchingScoreContainer({
  jobOfferId,
  jobTitle,
  compact = false,
  onApply,
}: MatchingScoreContainerProps) {
  const { calculateScore, loading, error } = useMatchingScore();
  const [matchResult, setMatchResult] = useState<MatchingResult | null>(null);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const result = await calculateScore(jobOfferId);
        setMatchResult(result);
      } catch (err) {
        console.error("Erreur matching", err);
      }
    };
    if (jobOfferId) {
      fetchScore();
    }
  }, [jobOfferId]);

  if (loading) {
    return (
      <Card className="p-4">
        <CardContent className="flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4 border-destructive/20">
        <CardContent>
          <p className="text-sm text-destructive">Impossible de calculer le matching.</p>
        </CardContent>
      </Card>
    );
  }

  if (!matchResult) {
    return null;
  }

  return (
    <MatchingScore
      matchResult={matchResult}
      jobTitle={jobTitle}
      compact={compact}
      onApply={onApply}
    />
  );
}