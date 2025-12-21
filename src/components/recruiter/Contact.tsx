// src/components/recruiter/Contact.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";

export function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <h1>Contactez-nous</h1>
          <p className="text-muted-foreground mt-2">
            Notre équipe est là pour vous accompagner dans vos recrutements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de contact */}
          <Card>
            <CardHeader>
              <CardTitle>Envoyez-nous un message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" placeholder="Votre nom" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="votre@email.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" type="tel" placeholder="+237 6XX XX XX XX" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input id="subject" placeholder="Objet de votre demande" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  rows={6} 
                  placeholder="Décrivez votre demande en détail..."
                />
              </div>
              
              <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e40af]">
                Envoyer le message
              </Button>
            </CardContent>
          </Card>

          {/* Informations de contact */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nos coordonnées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p>Email</p>
                    <p className="text-muted-foreground">contact@irelisgroup.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p>Pays</p>
                    <p className="text-muted-foreground">Cameroun</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p>Horaires</p>
                    <p className="text-muted-foreground">24h/24, 7j/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Pour une assistance immédiate, contactez-nous via WhatsApp
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Discuter sur WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Questions fréquentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-sm">Comment publier une offre ?</p>
                  <p className="text-sm text-muted-foreground">
                    Cliquez sur le bouton dans le tableau de bord
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">Combien de temps reste une offre active ?</p>
                  <p className="text-sm text-muted-foreground">
                    Les offres restent actives pendant 30 jours
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">Comment accéder à la CVthèque ?</p>
                  <p className="text-sm text-muted-foreground">
                    Utilisez le menu CVthèque en haut de page
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}