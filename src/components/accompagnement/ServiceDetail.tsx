// src/components/accompagnement/ServiceDetail.tsx
'use client';

import { CheckCircle, ArrowRight, Clock, Award, Quote, Users, Package, Shield, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Service } from '@/components/accompagnement/ServicesGrid';

interface ServiceDetailProps {
  service: Service;
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const Icon = service.icon;

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-4 bg-primary text-primary-foreground rounded-xl">
            <Icon className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <Badge 
              variant="outline" 
              className={`mb-3 ${
                service.price === 'Gratuit' 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              {service.price}
            </Badge>
            <h2 className="text-2xl md:text-3xl mb-2 text-foreground">
              {service.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {service.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="h-4 w-4 text-primary" />
            <span>{service.category}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>Durée: {service.duration}</span>
          </div>
        </div>

        {/* Description détaillée pour CV Premium */}
        {service.id === 'guide-cv-1page' && (
          <Card className="mb-6 border-2 border-primary/20 bg-primary/10">
            <CardContent className="p-6">
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  Vous souhaitez marquer les esprits des recruteurs ? Découvrez notre modèle de CV innovant, au format Word, pensé pour vous démarquer en toute simplicité.
                </p>
                <p>
                  Ce template moderne, conçu pour capter l'attention même dans une pile de candidatures, met en valeur votre parcours tout en restant sobre et professionnel.
                </p>
                <p>
                  Facile à personnaliser, il vous suffit de remplacer le texte pour adapter chaque section à votre profil : la mise en page vous guide et vous fait gagner du temps.
                </p>
                <p>
                  Idéal pour tous les profils, il offre même une deuxième page dédiée pour approfondir votre expérience ou vos compétences.
                </p>
                <p>
                  Téléchargement instantané 24h/24, au Cameroun, à l'étranger ou partout dans le monde : dès votre paiement validé, accédez à votre espace, téléchargez et commencez à personnaliser votre CV en quelques minutes.
                </p>
                <p className="text-primary">
                  Offrez-vous une chance supplémentaire de décrocher des entretiens rapidement !
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Avantages */}
      <Card className="mb-6 border-2 border-border">
        <CardContent className="p-6">
          <h3 className="text-xl mb-4 text-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Ce que vous obtenez
          </h3>
          <ul className="space-y-3">
            {(service.benefits ?? []).map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-foreground/80">{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Processus */}
      <Card className="mb-6 border-2 border-border">
        <CardContent className="p-6">
          <h3 className="text-xl mb-4 text-foreground flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-primary" />
            Comment ça marche
          </h3>
          <div className="space-y-4">
            {(service.process ?? []).length > 0 ? (
              (service.process ?? []).map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Process non disponible.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bouton Commander */}
      <div className="mb-6">
        <Button 
          className="w-full bg-brand-amber hover:bg-brand-amber/90 text-foreground py-7 text-lg shadow-2xl hover:shadow-3xl transition-all transform hover:scale-[1.02] group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center">
            Commander maintenant - {service.price}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </Button>
        
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            143 personnes ont commandé ce service ce mois-ci
          </p>
        </div>
      </div>

      {/* Pour qui ? */}
      {service.targetAudience && service.targetAudience.length > 0 && (
        <Card className="mb-6 border-2 border-border">
          <CardContent className="p-6">
            <h3 className="text-xl mb-4 text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Pour qui ce module ?
            </h3>
            <ul className="space-y-3">
              {service.targetAudience.map((audience, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-3 w-3 text-blue-600" />
                  </div>
                  <span className="text-foreground/80">{audience}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Livrables */}
      {service.deliverables && service.deliverables.length > 0 && (
        <Card className="mb-6 border-2 border-border">
          <CardContent className="p-6">
            <h3 className="text-xl mb-4 text-foreground flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Ce que vous recevez
            </h3>
            <ul className="space-y-3">
              {service.deliverables.map((deliverable, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-3 w-3 text-purple-600" />
                  </div>
                  <span className="text-foreground/80">{deliverable}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Garanties */}
      {service.guarantees && service.guarantees.length > 0 && (
        <Card className="mb-6 border-2 border-green-200 bg-green-50/30">
          <CardContent className="p-6">
            <h3 className="text-xl mb-4 text-foreground flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Nos garanties
            </h3>
            <ul className="space-y-3">
              {service.guarantees.map((guarantee, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-3 w-3 text-green-700" />
                  </div>
                  <span className="text-foreground/80">{guarantee}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* FAQ */}
      {service.faq && service.faq.length > 0 && (
        <Card className="mb-6 border-2 border-border">
          <CardContent className="p-6">
            <h3 className="text-xl mb-4 text-foreground flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Questions fréquentes
            </h3>
            <div className="space-y-4">
              {service.faq?.map((item, index) => (
                <div key={index} className="border-l-4 border-primary pl-4 py-2">
                  <p className="text-foreground mb-1">{item.question}</p>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Témoignage */}
      {service.testimonial && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Quote className="h-6 w-6 text-primary flex-shrink-0" />
              <p className="text-foreground/80 italic">
                "{service.testimonial.text}"
              </p>
            </div>
            <div className="flex items-center gap-3 ml-9">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                {service.testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="text-foreground">{service.testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{service.testimonial.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA Footer */}
      <div className="mt-8 p-6 bg-muted rounded-lg text-center">
        <p className="text-muted-foreground mb-4">
          Prêt à démarrer votre accompagnement ?
        </p>
        <Button 
          variant="outline" 
          className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Contactez un conseiller
        </Button>
      </div>
    </div>
  );
}