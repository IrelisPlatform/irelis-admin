// src/components/admin/AdminJobsTableActions.tsx

"use client";

import { useState } from "react";
import { MoreVertical, Edit, Trash2, Eye, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { EditJobDialog } from "./EditJobDialog";
import { DeleteJobDialog } from "./DeleteJobDialog";
import { usePublishJob } from "@/hooks/admin/useJobMutations";
import { PublishedJob } from "@/types/job";

type AdminJobsTableActionsProps = {
  job: PublishedJob;
};

export function AdminJobsTableActions({ job }: AdminJobsTableActionsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const publishJobMutation = usePublishJob();

  const handlePublish = () => {
    publishJobMutation.mutate(job.id);
  };

  const handleViewDetails = () => {
    // TODO: Implémenter l'affichage des détails de l'offre
    console.log("View details for job:", job.id);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleViewDetails}>
            <Info className="h-4 w-4 mr-2" /> Voir les détails
          </DropdownMenuItem>
          {job.status !== "PUBLISHED" && (
            <DropdownMenuItem onClick={handlePublish}>
              <Eye className="h-4 w-4 mr-2" /> Publier
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" /> Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditJobDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        job={job}
      />

      <DeleteJobDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        job={job}
      />
    </>
  );
}
