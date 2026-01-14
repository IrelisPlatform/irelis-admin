// src/components/admin/DeleteJobDialog.tsx

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteJob } from "@/hooks/admin/useJobMutations";
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
  const deleteJobMutation = useDeleteJob();

  const handleDelete = () => {
    if (!job) return;
    deleteJobMutation.mutate(job.id, {
      onSuccess: (result) => {
        if (result.success) {
          onOpenChange(false);
        }
      },
    });
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
              disabled={deleteJobMutation.isPending}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteJobMutation.isPending}
            >
              {deleteJobMutation.isPending ? (
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
