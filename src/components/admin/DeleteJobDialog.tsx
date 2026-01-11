// src/components/admin/DeleteJobDialog.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteJobAction } from "@/app/_actions/jobs";
import { Loader2 } from "lucide-react";
import { PublishedJob } from "@/types/job";
import { formatDateLong } from "@/services/date";
import { getStatusBadge } from "@/lib/jobs/job-helpers";

type DeleteJobDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: PublishedJob | null;
};

export function DeleteJobDialog({
  open,
  onOpenChange,
  job,
}: DeleteJobDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!job) return;

    setIsLoading(true);
    try {
      const result = await deleteJobAction(job.id);
      if (result.success) {
        toast.success("Offre supprimée");
        // Invalider la query pour rafraîchir la table
        await queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
        onOpenChange(false);
      } else {
        toast.error(result.error || "Erreur lors de la suppression");
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'offre");
    } finally {
      setIsLoading(false);
    }
  };

  if (!job) return null;

  const location =
    job.workCities.length > 0
      ? `${job.workCountryLocation}, ${job.workCities.join("-")}`
      : job.workCountryLocation;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full sm:max-w-xl lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-destructive">
            Supprimer l&apos;offre de l&apos;entreprise ({job.companyName})
          </DialogTitle>
          <DialogDescription>
            Cette action est irréversible. Êtes-vous sûr ?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Titre du poste :
              </span>
              <p className="text-sm font-semibold">{job.title}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Localisation :
              </span>
              <p className="text-sm">{location}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Date de publication :
              </span>
              <p className="text-sm">
                {job.publishedAt
                  ? formatDateLong(job.publishedAt)
                  : "Non publiée"}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Statut :
              </span>
              <div className="mt-1">{getStatusBadge(job.status)}</div>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Supprimer"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
