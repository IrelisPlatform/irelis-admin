// src/app/admin/jobs/[id]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { JobOffer } from "@/types/job";

export default function EditJobPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [job, setJob] = useState<JobOffer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token || !id) return;

      setLoading(true);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim() || 'http://api-irelis.us-east-2.elasticbeanstalk.com';
        const res = await fetch(`${backendUrl}/admin/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data: JobOffer = await res.json();
          setJob(data);
        } else {
          throw new Error("Échec du chargement de l'offre");
        }
      } catch (err) {
        toast.error("Erreur réseau");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token || !job) return;

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim() || 'http://api-irelis.us-east-2.elasticbeanstalk.com';
      const res = await fetch(`${backendUrl}/admin/jobs/${job.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(job)
      });

      if (res.ok) {
        toast.success("Offre mise à jour avec succès");
        router.push("/admin");
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "Échec de la mise à jour");
      }
    } catch (err) {
      toast.error("Erreur réseau");
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (!job) return <div>Offre non trouvée</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Modifier l’offre : {job.title}</h1>
      <div className="space-y-4">
        <div>
          <Label>Titre *</Label>
          <Input
            value={job.title}
            onChange={(e) => setJob({ ...job, title: e.target.value })}
          />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            value={job.description}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
            rows={6}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Ville</Label>
            <Input
              value={job.workCityLocation}
              onChange={(e) => setJob({ ...job, workCityLocation: e.target.value })}
            />
          </div>
          <div>
            <Label>Pays</Label>
            <Input
              value={job.workCountryLocation}
              onChange={(e) => setJob({ ...job, workCountryLocation: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label>Type de contrat</Label>
          <Select value={job.contractType} onValueChange={(v) => setJob({ ...job, contractType: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="CDI">CDI</SelectItem>
              <SelectItem value="CDD">CDD</SelectItem>
              <SelectItem value="FREELANCE">Freelance</SelectItem>
              <SelectItem value="INTERNSHIP">Stage</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Salaire</Label>
          <Input
            value={job.salary}
            onChange={(e) => setJob({ ...job, salary: e.target.value })}
          />
        </div>
        <div>
          <Label>Statut</Label>
          <Badge variant="outline" className={
            job.status === "PUBLISHED" ? "bg-green-100 text-green-800 border-green-200" :
            job.status === "PENDING" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
            "bg-gray-100 text-gray-800 border-gray-200"
          }>
            {job.status === "PUBLISHED" ? "Publiée" : job.status === "PENDING" ? "En attente" : "Brouillon"}
          </Badge>
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        <Button onClick={handleSave}>Sauvegarder les modifications</Button>
        <Button variant="outline" onClick={() => router.back()}>Annuler</Button>
      </div>
    </div>
  );
}