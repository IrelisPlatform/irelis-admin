// src/app/admin/accompagnement/page.tsx

import { AdminServicesTable } from "@/components/admin/AdminServicesTable";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Handshake } from "lucide-react";

export default function AdminAccompagnementPage() {
  return (
    <div className="space-y-8">
      <Alert className="bg-linear-to-r from-blue-50 to-indigo-50 border-blue-300">
        <Handshake className="h-5 w-5 text-blue-600" />
        <AlertDescription className="ml-2">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Services d&apos;accompagnement :</span> Gérez
            tous les modules de la page accompagnement de la plateforme.
          </p>
        </AlertDescription>
      </Alert>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a8a]">
            Gestion des services d&apos;accompagnement
          </h1>
          <p className="text-muted-foreground mt-1">
            Consultez, modifiez et supprimez les services affichés sur la page
            accompagnement.
          </p>
        </div>
      </div>

      <AdminServicesTable />
    </div>
  );
}
