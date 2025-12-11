import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal, Eye, Star, X } from "lucide-react";

interface Candidate {
  name: string;
  job: string;
  time: string;
  status: string;
  matchScore?: number;
}

interface CandidateListItemProps {
  candidate: Candidate;
  onView?: (candidate: Candidate) => void;
  onAction?: (candidate: Candidate, action: string) => void;
}

const getInitials = (name: string) => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export function CandidateListItem({ 
  candidate, 
  onView, 
  onAction 
}: CandidateListItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border">
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {getInitials(candidate.name)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView?.(candidate)}
            className="font-medium text-primary hover:underline truncate text-left"
          >
            {candidate.name}
          </button>
          {candidate.matchScore && candidate.matchScore > 70 && (
            <Badge variant="outline" className="text-xs whitespace-nowrap">
              {candidate.matchScore}% match
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {candidate.job}
        </p>
      </div>
      
      <div className="flex items-center gap-3 flex-shrink-0">
        <Badge variant="secondary" className="whitespace-nowrap px-3 py-1.5">
          {candidate.status}
        </Badge>
        <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:block">
          {candidate.time}
        </span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView?.(candidate)}>
              <Eye className="h-4 w-4 mr-2" />
              Voir profil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction?.(candidate, 'shortlist')}>
              <Star className="h-4 w-4 mr-2" />
              Shortlist
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction?.(candidate, 'reject')}>
              <X className="h-4 w-4 mr-2" />
              Rejeter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
