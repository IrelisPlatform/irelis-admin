import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Banknote, Info, Briefcase, DollarSign, Clock, Users, Building2, Bookmark, Share2, Send, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { JobDetail } from "@/lib/mockJobDetails";

interface JobDetailsProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    posted: string;
    description: string;
    tags: string[];
    isNew?: boolean;
    isUrgent?: boolean;
    responsibilities: string[];
    qualifications: string[];
    benefits: string[];
    about: string;
    sector: string;
    companySize: string;
  };
}


export default function JobDetails({ job }: { job: JobDetail }) {
  const { user } = useAuth();
  const router = useRouter()
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = () => {

    if (!user) {
      router.push(`/auth/signin?returnTo=/jobs/${job.id}`);
      return;
    }

    router.push(`/jobs/${job.id}/apply`);

    setIsApplying(true);
    setTimeout(() => setIsApplying(false), 2000);
  };

  return (
    <Card className="h-full flex flex-col shadow-xl border-gray-100 overflow-hidden">
      <ScrollArea className="flex-1">
        <div className="p-8">

          {/* En-tête avec logo et info entreprise */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="w-20 h-20 bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] rounded-2xl flex items-center justify-center text-white mb-5 shadow-xl"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl select-none">{job.company.substring(0, 2).toUpperCase()}</span>
            </motion.div>
            
            <h2 className="mb-3 text-[#1e293b]">{job.title}</h2>
            <p className="text-gray-600 mb-6">{job.company}</p>
            
            {/* Informations clés dans une carte */}
            <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-5 rounded-xl border border-blue-100/50 shadow-sm">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <motion.span 
                  className="flex items-center gap-2 text-gray-700"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <MapPin className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  <span className="flex-1">{job.location}</span>
                </motion.span>
                <motion.span 
                  className="flex items-center gap-2 text-gray-700"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Briefcase className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  {job.type}
                </motion.span>
                <motion.span 
                  className="flex items-center gap-2 text-gray-700"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <DollarSign className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  <span className="flex-1">{job.salary}</span>
                </motion.span>
                <motion.span 
                  className="flex items-center gap-2 text-gray-700"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Clock className="w-4 h-4 text-[#1e3a8a]" />
                  </div>
                  {job.posted}
                </motion.span>
              </div>
            </div>

            {/* Badges et Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {job.isNew && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Badge 
                    className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 border border-blue-700 shadow-sm"
                  >
                    Nouveau
                  </Badge>
                </motion.div>
              )}
              {job.isUrgent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Badge 
                    className="bg-red-600 text-white hover:bg-red-700 transition-all duration-200 border border-red-700 shadow-sm"
                  >
                    Urgent
                  </Badge>
                </motion.div>
              )}
              {job.tags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Badge 
                    variant="secondary" 
                    className="bg-blue-100 text-[#1e3a8a] hover:bg-blue-200 transition-all duration-200 border border-blue-200 shadow-sm rounded-full px-3"
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Boutons d'action principaux */}
            <div className="flex gap-3 mt-6">
              <motion.div 
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white w-full shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden group"
                  onClick={handleApply}
                  disabled={isApplying}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={isApplying ? { x: "100%" } : {}}
                    transition={{ duration: 0.6, repeat: isApplying ? Infinity : 0 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    {isApplying ? 'Envoi en cours...' : 'Postuler maintenant'}
                    {!isApplying && <Send className="w-4 h-4" />}
                  </span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={`border-2 transition-all duration-200 ${
                    isBookmarked 
                      ? 'border-[#1e3a8a] bg-blue-50 text-[#1e3a8a]' 
                      : 'border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white'
                  }`}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <motion.div
                    animate={isBookmarked ? { 
                      scale: [1, 1.3, 1],
                      rotate: [0, -15, 15, 0]
                    } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white transition-all duration-200"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <Separator className="my-8" />

          {/* Contenu détaillé */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* --- Description --- */}
            <div>
              <h3 className="mb-4 text-[#1e3a8a] flex items-center gap-2">
                <div className="w-1 h-6 bg-[#1e3a8a] rounded-full" />
                <Info className="w-5 h-5" /> Description du poste
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* --- Accordions Sections --- */}
            <Accordion type="single" collapsible className="w-full space-y-4">
              {/* Responsibilities */}
              <AccordionItem value="responsibilities">
                <AccordionTrigger className="text-lg font-medium text-[#1e3a8a]">
                  Responsabilités
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc ml-6 space-y-2">
                    {job.responsibilities.map((r, idx) => (
                      <motion.li 
                        key={idx}
                        className="text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
                      >
                        {r}
                      </motion.li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Qualifications */}
              <AccordionItem value="qualifications">
                <AccordionTrigger className="text-lg font-medium text-[#1e3a8a]">
                  Qualifications requises
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc ml-6 space-y-2">
                    {job.qualifications.map((q, idx) => (
                      <motion.li 
                        key={idx}
                        className="text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
                      >
                        {q}
                      </motion.li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Benefits */}
              <AccordionItem value="benefits">
                <AccordionTrigger className="text-lg font-medium text-[#1e3a8a]">
                  Avantages
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc ml-6 space-y-2">
                    {job.benefits.map((b, idx) => (
                      <motion.li 
                        key={idx}
                        className="text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + idx * 0.05 }}
                      >
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator />

            {/* --- About the Company --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="bg-gradient-to-br from-gray-50 to-blue-50/30 p-6 rounded-xl border border-gray-200/50"
            >
              <h3 className="mb-4 text-[#1e3a8a] flex items-center gap-2">
                <div className="w-1 h-6 bg-[#1e3a8a] rounded-full" />
                <Users className="w-5 h-5" /> À propos de {job.company}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {job.about}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Secteur :</span> {job.sector}
                </p>
                <p>
                  <span className="font-medium">Taille :</span> {job.companySize}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </ScrollArea>
    </Card>
  );
}