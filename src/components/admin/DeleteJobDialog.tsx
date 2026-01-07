// src/components/admin/DeleteJobDialog.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteJobAction } from "@/app/_actions/jobs";

type DeleteJobDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string | null;
};

export function DeleteJobDialog({
  open,
  onOpenChange,
  jobId,
}: DeleteJobDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!jobId) return;

    setIsLoading(true);
    try {
      const result = await deleteJobAction(jobId);
      if (result.success) {
        toast.success("Offre supprimée");
        onOpenChange(false);
        router.refresh();
      } else {
        toast.error(result.error || "Erreur lors de la suppression");
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'offre");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer l'offre</DialogTitle>
          <DialogDescription>
            Cette action est irréversible. Êtes-vous sûr ?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
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
            {isLoading ? "Suppression..." : "Supprimer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
