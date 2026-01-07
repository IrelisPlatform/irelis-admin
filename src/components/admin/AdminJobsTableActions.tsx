// src/components/admin/AdminJobsTableActions.tsx

"use client";

import { useState } from "react";
import { MoreVertical, Edit, Trash2, Eye } from "lucide-react";
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
import { publishJobAction } from "@/app/_actions/jobs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PublishedJob } from "@/types/job";

type AdminJobsTableActionsProps = {
  job: PublishedJob;
};

export function AdminJobsTableActions({ job }: AdminJobsTableActionsProps) {
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handlePublish = async () => {
    try {
      const result = await publishJobAction(job.id);
      if (result.success) {
        toast.success("Offre publiée !");
        router.refresh();
      } else {
        toast.error(result.error || "Erreur lors de la publication");
      }
    } catch (error) {
      toast.error("Erreur lors de la publication");
    }
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
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        jobId={job.id}
      />
    </>
  );
}
