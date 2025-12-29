

import { Card} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Banknote, Info, Briefcase, DollarSign, Clock, Calendar, Users, Building2, Bookmark, Share2, Send, ExternalLink, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { PublishedJob } from "@/types/job";
import { useLanguage } from "@/context/LanguageContext";
import {formatDateLong, formatDateRelative, formatDateShort} from "@/services/date";
import {ReadonlyEditor} from "@/components/ReadonlyEditor";


export default function JobDetails({ job }: { job: PublishedJob }) {
    const { t } = useLanguage();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const documentLabels: Record<string, string> = {
        CV: "Curriculum Vitae",
        COVER_LETTER: "Lettre de motivation",
        PORTFOLIO: "Portfolio",
        IDENTITY_DOC:"Carte d'identite",
        CERTIFICATE:"Certificat"
    }

     const ContractTypeLabels: Record<string, string> = {
        CDI: "CDI (Temps plein)",
        CDD: "CDD (Temps plein)",
        CDI_PART_TIME: "CDI (Temps partiel)",
        CDD_PART_TIME: "CDD (Temps partiel)",
        INTERNSHIP: "Stage",
        ALTERNATIVE: "Alternance",
        FREELANCE: "Freelance",
        INTERIM: "Intérim"
    }
    const getContractTypeLabel = (type?: string) =>
        type && ContractTypeLabels[type]
            ? ContractTypeLabels[type]
            : "Type de contrat non spécifié"



    const handleApply = () => {
        alert("Fonctionnalité de candidature bientôt disponible !");
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleShare = () => {
        // Optionnel : partager l'URL actuelle
        if (navigator.share) {
            navigator.share({
                title: job.title,
                text: `Découvrez cette offre chez ${job.company}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Lien copié dans le presse-papiers !");
        }
    };

    const displayCompany = job.company || "l'entreprise";

    return (
        <Card className="w-full max-w-full h-3/4 flex flex-col shadow-xl border-gray-100 overflow-hidden">
            <div className="w-full max-w-full overflow-x-hidden p-4 sm:p-6">
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}>
                    <motion.div
                        className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden "
                        whileHover={{scale: 1.05, rotate: 2}}
                        transition={{type: "spring", stiffness: 300}}>

                        {job.companyLogo ? (
                            <img
                                src={job.companyLogo}
                                alt={`Logo ${job.company}`}
                                className="w-full h-full object-contain"
                                loading="lazy"
                            />
                        ) : (
                            <span className="text-white font-semibold text-lg select-none">{job.company.substring(0, 2).toUpperCase()}</span>
                        )}
                    </motion.div>
                    <h2 className="text-xl sm:text-2xl mb-2 text-[#1e3a8a] break-words">
                        {job.title}
                    </h2>
                    <p className="text-gray-600 mb-4 break-words">{displayCompany}</p>


                    {/* Informations clés */}
                    <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-3 sm:p-5 rounded-xl border border-blue-100/50 shadow-sm">
                        <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                            {[
                                { icon: MapPin, text: job.location },
                                {
                                    icon: Briefcase,
                                    text: getContractTypeLabel(job.type)
                                },
                                {
                                    icon: Banknote,
                                    text: job.salary && job.salary.trim() !== ""
                                        ? job.salary
                                        : "Non spécifié"
                                },
                                {
                                    icon: Clock,
                                    text: job.expirationDate
                                        ? formatDateLong(job.expirationDate)
                                        : "Postuler au plus tot"
                                },
                                {
                                    icon: Calendar,
                                    text: job.publishedAt
                                        ? `Publiée ${formatDateRelative(job.publishedAt)}`
                                        : "_"
                                }
                            ].map((item, i) => (
                                <motion.span
                                    key={i}
                                    className="flex items-center gap-2 text-gray-700"
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                        <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#1e3a8a]" />
                                    </div>
                                    <span className="flex-1 break-words">{item.text}</span>
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-3">
                        {/*{job.isNew && (*/}
                        {/*    <Badge className="bg-blue-600 text-white text-xs sm:text-sm">*/}
                        {/*        {t.jobDetails.new}*/}
                        {/*    </Badge>*/}
                        {/*)}*/}
                        {job.isUrgent && (
                            <Badge className="bg-red-300 text-white text-xs sm:text-sm">
                                {t.jobDetails.urgent}
                            </Badge>
                        )}
                        {job?.tags?.map((tag, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="bg-blue-100 text-[#1e3a8a] text-xs sm:text-sm rounded-full px-2 sm:px-3"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Boutons */}
                    <div className="flex gap-2 mt-4">
                        <Button
                            onClick={handleApply}
                            className="flex-1 bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-medium py-3 rounded-lg shadow-md transition-all duration-200"
                        >
                            Postuler
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-[#1e3a8a]"
                            onClick={handleBookmark}
                        >
                            <Bookmark className="w-4 h-4" />
                            <span className="ml-1 text-xs">
                {isBookmarked ? t.jobDetails.saved : t.jobDetails.save}
              </span>
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-[#1e3a8a]"
                            onClick={handleShare}
                        >
                            <Share2 className="w-4 h-4" />
                            <span className="ml-1 text-xs">{t.jobDetails.share}</span>
                        </Button>
                    </div>
                </motion.div>

                <Separator className="my-6" />

                {/* Contenu */}
                <motion.div className="space-y-6 text-xs sm:text-sm">
                    <div>
                        <h3 className="mb-3 text-[#1e3a8a] flex items-center gap-2">
                            <Info className="w-4 h-4" /> {t.jobDetails.description}
                        </h3>
                        {job.description ? (
                            <ReadonlyEditor
                                value={JSON.parse(job.description)}
                                namespace={`job-description-${job.id}`}
                            />
                        ) : (
                            <p className="text-gray-600">Aucune description fournie.</p>
                        )}

                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-3">
                        <AccordionItem value="responsibilities">
                            <AccordionTrigger className="text-[#1e3a8a] text-sm sm:text-base">
                                {t.jobDetails.responsibilities}
                            </AccordionTrigger>
                            <AccordionContent>
                                {job.responsibilities ? (
                                    <ReadonlyEditor
                                        value={JSON.parse(job.responsibilities)}
                                        namespace={`job-responsabilities-${job.id}`}
                                    />
                                ) : (
                                    "Aucune description fournie."
                                )}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="qualifications">
                            <AccordionTrigger className="text-[#1e3a8a] text-sm sm:text-base">
                                {t.jobDetails.qualifications}
                            </AccordionTrigger>
                            <AccordionContent>
                                {job.qualifications ? (
                                    <ReadonlyEditor
                                        value={JSON.parse(job.qualifications)}
                                        namespace={`job-qualifications-${job.id}`}
                                    />
                                ) : (
                                    <p className="text-gray-600">Aucune qualification fournie.</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="benefits">
                            <AccordionTrigger className="text-[#1e3a8a] text-sm sm:text-base">
                                {t.jobDetails.benefits}
                            </AccordionTrigger>
                            <AccordionContent>
                                    {job.benefits ? (
                                        <ReadonlyEditor
                                            value={JSON.parse(job.benefits)}
                                            namespace={`job-benefits-${job.id}`}
                                        />
                                    ) : (
                                        <p className="text-gray-600">Non specifie</p>
                                    )}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="benefits">
                            <AccordionTrigger className="text-[#1e3a8a] text-sm sm:text-base">
                                Documents de candidatures
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="grid grid-cols-1 gap-2">
                                    <ul className="list-disc pl-5 space-y-1">
                                        {job.requiredDocuments.map((doc) => (
                                            <li key={doc.type}>{documentLabels[doc.type]}</li>
                                        ))}
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="language">
                            <AccordionTrigger className="text-[#1e3a8a] text-sm sm:text-base">
                               Langues
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <ul className="list-disc pl-5 space-y-1 gap-2">
                                        <li>{job.requiredLanguage}</li>
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>



                    </Accordion>

                    <Separator />

                    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 p-3 sm:p-4 rounded-xl">
                        <h3 className="mb-3 text-[#1e3a8a] flex items-center gap-2">
                            <Users className="w-4 h-4" /> {t.jobDetails.about} {displayCompany}
                        </h3>
                        <p className="text-gray-600 mb-3 break-words">
                            {job.about || "Aucune information disponible sur l'entreprise."}
                        </p>
                        <div className="  text-gray-600 text-base">
                            <p className="text-base"><span className="font-bold ">Secteur d'activite</span> : {job.sector}</p>
                            <p className="mt-2 text-base"><span className="font-bold ">{t.jobDetails.companySize}</span> {job.companySize ? job.companySize : "-"}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Card>
    );
}








