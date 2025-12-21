// src/components/recruiter/EnhancedStatCard.tsx

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface EnhancedStatCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon?: LucideIcon;
  className?: string;
}

export function EnhancedStatCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon,
  className 
}: EnhancedStatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">{title}</p>
          {Icon && (
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          
          <div className="flex items-center gap-1.5">
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span className={`text-sm font-medium ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}>
              {change}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}