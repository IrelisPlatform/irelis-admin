// src/components/recruiter/CompanySettings.tsx
"use client";

import { useState, useRef } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useRecruiterProfile } from "@/hooks/useRecruiterProfile";

export function CompanySettings() {
  const { profile, loading, updateProfile } = useRecruiterProfile();
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyWebsite: "",
    companyDescription: "",
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Charger les données existantes
  if (loading) {
    return <div>Chargement des informations...</div>;
  }

  if (!profile) {
    return <div>Profil non disponible.</div>;
  }

  // Initialiser le formulaire une fois
  if (formData.companyName === "") {
    setFormData({
      companyName: profile.companyName || "",
      companyEmail: profile.companyEmail || "",
      companyPhone: profile.companyPhone || "",
      companyWebsite: profile.companyWebsite || "",
      companyDescription: profile.companyDescription || "",
    });
    if (profile.companyLogoUrl) {
      setLogoPreview(profile.companyLogoUrl);
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const removeLogo = () => {
    setLogo(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(
        {
          companyName: formData.companyName,
          companyEmail: formData.companyEmail,
          companyPhone: formData.companyPhone,
          companyWebsite: formData.companyWebsite,
          companyDescription: formData.companyDescription,
        },
        logo
      );
      toast.success("Informations mises à jour avec succès !");
    } catch (err: any) {
      toast.error(err.message || "Échec de la mise à jour");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations de l'entreprise</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Logo */}
          <div>
            <Label>Logo de l'entreprise</Label>
            <div className="flex items-start gap-6 mt-2">
              {logoPreview ? (
                <div className="relative">
                  <div className="w-24 h-24 rounded-lg border overflow-hidden bg-white">
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 rounded-full w-7 h-7 p-0"
                    onClick={removeLogo}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Changer le logo
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  Formats : PNG, JPEG, JPG, WEBP. Max 2 Mo.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Champs texte */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Nom de l'entreprise *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyEmail">Email de contact *</Label>
            <Input
              id="companyEmail"
              type="email"
              value={formData.companyEmail}
              onChange={(e) => handleInputChange("companyEmail", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyPhone">Téléphone</Label>
            <Input
              id="companyPhone"
              type="tel"
              value={formData.companyPhone}
              onChange={(e) => handleInputChange("companyPhone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyWebsite">Site web</Label>
            <Input
              id="companyWebsite"
              type="url"
              value={formData.companyWebsite}
              onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyDescription">Description de l'entreprise</Label>
            <Textarea
              id="companyDescription"
              rows={4}
              value={formData.companyDescription}
              onChange={(e) => handleInputChange("companyDescription", e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Enregistrer les modifications
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}