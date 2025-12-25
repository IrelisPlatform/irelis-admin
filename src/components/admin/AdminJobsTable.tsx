//src/components/admin/AdminJobsTable.tsx

"use client";

import React, {useState, useEffect, useMemo, Fragment} from "react";
import {
    Search, Filter, Plus, MoreVertical, Edit, Trash2, Eye, ShieldCheck, Star,
    AlertCircle,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Badge} from "@/components/ui/badge";
import {Checkbox} from "@/components/ui/checkbox";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import useSectors, {Sector} from '@/hooks/useSectors';
import {useAdminJobs} from '@/hooks/admin/useAdminJobs';
import {PublishedJob} from '@/types/job';
import {COUNTRIES_WITH_CITIES, COUNTRIES} from '@/lib/countries';
import {getSkillsForSector, EDUCATION_LEVELS, EXPERIENCE_OPTIONS} from '@/lib/jobRequirements';
import {TAG_NAMES, TagType} from '@/lib/jobTags';
import {formatDateLong, formatDateRelative, formatDateShort} from "@/services/date";
import {Spinner} from "@/components/ui/spinner";
import CkEditor from "@/components/CkEditor";
import TiptapEditor from "@/components/TiptapEditor";
import {SerializedEditorState} from "lexical";
import {Editor} from "@/components/blocks/editor-00/editor";

const STEPS = [
    {id: 1, name: "Création de l'entreprise"},
    {id: 2, name: "Informations générales"},
    {id: 3, name: "Détails du poste"},
    {id: 4, name: "Options avancées"},
];

type TagDto = {
    name: string;
    type: "domain" | "skill" | "tool";
};






const DOCUMENT_TYPES = [
    {value: "CV", label: "CV"},
    {value: "COVER_LETTER", label: "Lettre de motivation"},
    {value: "PORTFOLIO", label: "Portfolio"},
    {value: "CERTIFICATE", label: "Certificat"},
    {value: "IDENTITY_DOC", label: "Pièce d'identité"},
] as const;

// État initial du formulaire
const INITIAL_JOB_STATE = {
    // Champs entreprise (étape 1)
    companyName: "",
    companyEmail: "",
    companyDescription: "",
    companyLength:"",
    sectorId: "",

    // Champs offre
    title: "",
    description: null as SerializedEditorState | null,
    workCountryLocation: "",
    workCityLocation: "",
    responsibilities: null as SerializedEditorState | null,
    requirements: null as SerializedEditorState | null,
    benefits: null as SerializedEditorState | null ,
    contractType: "CDI" as const,
    status: "PENDING" as const,
    jobType: "FULL_TIME" as const,
    salary: "",
    publishedAt: "",
    expirationDate: "",
    isFeatured: false,
    isUrgent: false,
    requiredLanguage: "",
    sectorName: "",
    postNumber: 1,
    tagDto: [] as TagDto[],
    requiredDocuments: [{type: "CV"}],
};

export function AdminJobsTable() {
    const router = useRouter();
    const {sectors, loading: sectorsLoading} = useSectors();
    const [companyLogo, setCompanyLogo] = useState<File | null>(null);


    function setJobField<K extends keyof typeof INITIAL_JOB_STATE>(
        field: K,
        value: (typeof INITIAL_JOB_STATE)[K]
    ) {
        setNewJob((prev) => ({
            ...prev,
            [field]: value,
        }))
    }
    const companySizeRanges = [
        "1 - 10 employés",
        "11 - 50 employés",
        "51 - 200 employés",
        "201 - 500 employés",
        "501 - 1000 employés",
        "1001 - 5000 employés",
        "5001 - 10 000 employés",
        "Plus de 10 000 employés",
    ];

    const initialValue = {
        root: {
            children: [
                {
                    children: [
                        {
                            detail: 0,
                            format: 0,
                            mode: "normal",
                            style: "",
                            text: "Hello World ",
                            type: "text",
                            version: 1,
                        },
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    type: "paragraph",
                    version: 1,
                },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
        },
    } as unknown as SerializedEditorState
    const [editorState, setEditorState] =
        useState<SerializedEditorState>(initialValue)

    const {
        getAllJobs,
        createJob,
        publishJob,
        deleteJob,
        loading:jobLoading,
    } = useAdminJobs();

    // const handleEditorUpdate = (content: string) => {
    //     setNewJob(prev => ({
    //         ...prev,
    //         description: content,
    //     }));
    // };



    const [jobs, setJobs] = useState<PublishedJob[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [jobToDelete, setJobToDelete] = useState<string | null>(null);
    const [newJob, setNewJob] = useState(INITIAL_JOB_STATE);


    const salaryRanges: string[] = []

    for (let start = 50000; start < 1000000; start += 100000) {
        const end = start + 50000
        salaryRanges.push(`${start.toLocaleString()} - ${end.toLocaleString()} FCFA`)
    }





    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedSectorName, setSelectedSectorName] = useState("");
    const [otherCompetence, setOtherCompetence] = useState<string | null>(null);
    const [formationLevel, setFormationLevel] = useState("");
    const [formationDetail, setFormationDetail] = useState("");
    const [experiences, setExperiences] = useState("");
    const [otherExperience, setOtherExperience] = useState("");

    // État pour stocker les compétences sélectionnées (tableau)
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    // Ajouter une compétence
    const addSkill = (skill: string) => {
        if (skill.trim() && !selectedSkills.includes(skill.trim())) {
            const updated = [...selectedSkills, skill.trim()];
            setSelectedSkills(updated);
            // Synchronise avec newJob.requirements
            setNewJob(prev => ({...prev, requirements: updated.join(', ')}));
        }
    };

    // Supprimer une compétence
    const removeSkill = (skillToRemove: string) => {
        const updated = selectedSkills.filter(s => s !== skillToRemove);
        setSelectedSkills(updated);
        setNewJob(prev => ({...prev, requirements: updated.join(', ')}));
    };

    // Réinitialiser quand le secteur change
    useEffect(() => {
        setSelectedSkills([]);
        setOtherCompetence(null);
        setNewJob(prev => ({...prev, requirements: ""}));
    }, [selectedSectorName]);

    const [newTagType, setNewTagType] = useState<"skill" | "tool" | "domain">("skill");
    const [newTagName, setNewTagName] = useState("");


    const addTag = () => {
        if (newTagName.trim()) {
            setNewJob(prev => ({
                ...prev,
                tagDto: [...prev.tagDto, {name: newTagName.trim(), type: newTagType}]
            }));
            setNewTagName("");
        }
    };

    const removeTag = (index: number) => {
        setNewJob(prev => ({
            ...prev,
            tagDto: prev.tagDto.filter((_, i) => i !== index)
        }));
    };


    useEffect(() => {
        const sector = sectors.find(s => s.id === newJob.sectorId);
        setSelectedSectorName(sector?.name || "");
    }, [newJob.sectorId, sectors]);


    const skillsForSector = useMemo(() => {
        return getSkillsForSector(selectedSectorName);
    }, [selectedSectorName]);


    useEffect(() => {
        const parts: string[] = [];

        if (selectedSkills.length > 0) {
            parts.push(...selectedSkills);
        }

        if (formationDetail) {
            parts.push(formationDetail);
        }

        if (experiences && experiences !== "Autre") {
            parts.push(experiences);
        } else if (experiences === "Autre" && otherExperience.trim()) {
            parts.push(otherExperience.trim());
        }

        setNewJob(prev => ({...prev, requirements: parts.join(', ')}));
    }, [selectedSkills, formationDetail, experiences, otherExperience]);

    useEffect(() => {

        const fetchJobs = async () => {
            try {
                const data = await getAllJobs();
                setJobs(data);
                console.log(data)
            } catch (err) {

            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.workCityLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.workCityLocation.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || job.status === statusFilter;
        const matchesType = typeFilter === "all" || job.status === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });


    // Validation et création d'une offre
    const handleCreateJob = async () => {
        // Validation champs entreprise (étape 1)
        if (!newJob.companyName.trim()) {
            toast.error("Le nom de l'entreprise est obligatoire.");
            setCurrentStep(1);
            return;
        }
        if (!newJob.companyDescription.trim()) {
            toast.error("La description de l'entreprise est obligatoire.");
            setCurrentStep(1);
            return;
        }
        if (!newJob.sectorId || newJob.sectorId === "") {
            toast.error("Veuillez sélectionner un secteur d'activité.");
            setCurrentStep(1);
            return;
        }
        if (newJob.companyEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newJob.companyEmail)) {
            toast.error("Email de l'entreprise invalide.");
            setCurrentStep(1);
            return;
        }

        const validTags = newJob.tagDto.filter(tag => tag.name?.trim());

        if (newJob.requiredDocuments.length === 0) {
            toast.error("Au moins un document requis est requis.");
            return;
        }
        // Validation champs offre
        if (
            !newJob.title.trim() ||
            !newJob.description ||
            !newJob.workCityLocation.trim() ||
            !newJob.workCountryLocation.trim() ||
            !newJob.responsibilities ||
            !newJob.requirements ||
            !newJob.contractType ||
            !newJob.jobType ||
            !newJob.requiredLanguage.trim()
        ) {
            toast.error("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        let expirationDateISO: string | null = null;

        if (newJob.expirationDate) {
            const expDate = new Date(newJob.expirationDate);
            if (!isNaN(expDate.getTime())) {
                expDate.setHours(23, 59, 59, 999);
                expirationDateISO = expDate.toISOString();
            } else {
                toast.error("Date d'expiration invalide.");
            }
        }

        const cleanTagDto = validTags
            .filter(tag => tag.type?.trim())
            .map(tag => ({
                name: tag.name.trim(),
                type: tag.type.trim(),
            }));
        //
        // if (cleanTagDto.length === 0) {
        //     toast.error("Au moins un mot-clé doit avoir un type.");
        //     return;
        // }

        // Préparer le payload exactement comme attendu par Swagger
        const payload = {
            companyName: newJob.companyName.trim(),
            companyDescription: newJob.companyDescription.trim(),
            companyLength: newJob.companyLength,
            sectorId: newJob.sectorId,
            companyEmail: newJob.companyEmail?.trim() || undefined,
            title: newJob.title.trim(),
            description: JSON.stringify(newJob.description),
            workCountryLocation: newJob.workCountryLocation,
            workCityLocation: newJob.workCityLocation,
            responsibilities: JSON.stringify(newJob.responsibilities),
            requirements: JSON.stringify(newJob.requirements),
            benefits: JSON.stringify(newJob.benefits),
            contractType: newJob.contractType,
            jobType: newJob.jobType,
            salary: newJob.salary ,
            isUrgent: newJob.isUrgent,
            isFeatured: newJob.isFeatured,
            expirationDate: expirationDateISO ,
            requiredLanguage: newJob.requiredLanguage.trim(),
            postNumber: newJob.postNumber || 1,
            tagDto: cleanTagDto,
            requiredDocuments: newJob.requiredDocuments,
        };

        const formData = new FormData();

        // formData.append("data", JSON.stringify(payload));


        formData.append(
            "data",
            new Blob([JSON.stringify(payload)], {
                type: "application/json",
            })
        );
        if (companyLogo) {
            formData.append("file", companyLogo);
        }

        try {
            await createJob(formData);
            // Recharger la liste
            const updatedJobs = await getAllJobs();
            setJobs(updatedJobs);
            // Réinitialiser
            setNewJob(INITIAL_JOB_STATE);
            setSelectedCountry("");
            setSelectedSectorName("");
            setOtherCompetence("");
            // setFormationLevel(null);
            setFormationDetail("");
            setExperiences("");
            setOtherExperience("");
            setIsCreateDialogOpen(false);
            setCurrentStep(1);
        } catch (err) {
            // Erreur déjà affichée par le hook
        }
    };

    const handlePublishClick = (id: string) => {
        publishJob(id);
        setTimeout(async () => {
            const updated = await getAllJobs();
            setJobs(updated);
        }, 1500);
    };


    const confirmDelete = async () => {
        if (!jobToDelete) return;
        await deleteJob(jobToDelete);
        // Recharger
        const updated = await getAllJobs();
        setJobs(updated);
        setDeleteModalOpen(false);
        setJobToDelete(null);
    };

    // Affichage du statut
    const getStatusBadge = (status: string) => {
        const variants = {
            PUBLISHED: "bg-green-100 text-green-800 border-green-200",
            PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
            DRAFT: "bg-gray-100 text-gray-800 border-gray-200",
        };
        const labels = {
            PUBLISHED: "Publiée",
            PENDING: "En attente",
            DRAFT: "Brouillon",
        };
        return (
            <Badge variant="outline" className={variants[status as keyof typeof variants] || "bg-gray-100"}>
                {labels[status as keyof typeof labels] || status}
            </Badge>
        );
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div className="space-y-4">

            {/* Alerte */}
            <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-300">
                <ShieldCheck className="h-5 w-5 text-green-600"/>
                <AlertDescription className="ml-2">
                    <p className="text-sm text-green-900">
                        <span className="font-semibold">Espace administration :</span> Vous gérez toutes les offres de
                        la plateforme.
                    </p>
                </AlertDescription>
            </Alert>

            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                        <Input
                            placeholder="Rechercher par titre ou localisation..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40">
                            <Filter className="h-4 w-4 mr-2"/> Statut
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="PUBLISHED">Publiée</SelectItem>
                            <SelectItem value="PENDING">En attente</SelectItem>
                            <SelectItem value="DRAFT">Brouillon</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-40">
                            <Filter className="h-4 w-4 mr-2"/> Type
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            <SelectItem value="CDI">CDI</SelectItem>
                            <SelectItem value="CDD">CDD</SelectItem>
                            <SelectItem value="FREELANCE">Freelance</SelectItem>
                            <SelectItem value="INTERNSHIP">Stage</SelectItem>
                        </SelectContent>
                    </Select>

                    <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
                        setIsCreateDialogOpen(open);
                        if (!open) setCurrentStep(1);
                    }}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2"/> Nouvelle offre
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
                            <DialogHeader>
                                <DialogTitle>Créer une offre (Étape {currentStep}/4)</DialogTitle>
                                <div className="flex mt-2 space-x-1">
                                    {STEPS.map((step) => (
                                        <div
                                            key={step.id}
                                            className={`h-1 flex-1 rounded-full ${
                                                currentStep >= step.id ? "bg-[#1e3a88]" : "bg-gray-200"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </DialogHeader>

                            <div className="py-4">
                                {/* ÉTAPE 1 : ENTREPRISE */}
                                {currentStep === 1 && (
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="mb-2">Logo de l’entreprise</Label>
                                            <Input
                                                type="file"
                                                accept="image/png,image/jpeg,image/webp"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setCompanyLogo(file);
                                                    }
                                                }}
                                            />
                                            {companyLogo && (
                                                <div className="mt-3 flex items-center gap-3">
                                                    <img
                                                        src={URL.createObjectURL(companyLogo)}
                                                        alt="Logo entreprise"
                                                        className="w-16 h-16 rounded-lg object-cover border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setCompanyLogo(null)}
                                                        className="text-sm text-red-500 hover:underline"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <Label className="mb-2">
                                                Nom de l'entreprise <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                value={newJob.companyName}
                                                onChange={(e) => setNewJob({...newJob, companyName: e.target.value})}
                                                placeholder="Ex: Irelis SARL"
                                            />
                                        </div>
                                        <div>
                                            <Label className="mb-2">
                                                Description de l'entreprise <span className="text-red-500">*</span>
                                            </Label>
                                            <Textarea
                                                placeholder="Décrivez votre entreprise en quelques lignes... Ex: Nous sommes une startup tech basée à Douala, spécialisée dans l’IA appliquée aux ressources humaines."
                                                value={newJob.companyDescription}
                                                onChange={(e) => setNewJob({
                                                    ...newJob,
                                                    companyDescription: e.target.value
                                                })}
                                                rows={3}
                                            />
                                        </div>
                                        <div>
                                            <Label className="mb-2">Email de l'entreprise</Label>
                                            <Input
                                                type="email"
                                                value={newJob.companyEmail}
                                                onChange={(e) => setNewJob({...newJob, companyEmail: e.target.value})}
                                                placeholder="contact@entreprise.com"
                                            />
                                        </div>
                                        <div>
                                            <Label className="mb-2">
                                                Secteur d'activité <span className="text-red-500">*</span>
                                            </Label>
                                            <Select
                                                value={newJob.sectorId}
                                                onValueChange={(v) => setNewJob({...newJob, sectorId: v})}
                                                disabled={sectorsLoading}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionnez un secteur"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {sectors
                                                        .filter(sector => sector.id.trim() !== "")
                                                        .map((sector: Sector) => (
                                                            <SelectItem key={sector.id} value={sector.id}>
                                                                {sector.name}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label className="mb-2">Taille de l'entreprise</Label>
                                            <Select
                                                value={newJob.companyLength}
                                                onValueChange={(v) => setNewJob({ ...newJob, companyLength: v })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner la taille de l’entreprise" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {companySizeRanges.map((range) => (
                                                        <SelectItem key={range} value={range}>
                                                            {range}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                {/* ÉTAPE 2 : INFOS GÉNÉRALES */}
                                {currentStep === 2 && (
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="mb-2">
                                                Titre de l'offre <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                value={newJob.title}
                                                placeholder="Ex: Directeur de Production"
                                                onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <Label className="mb-2">
                                                Description de l'offre <span className="text-red-500">*</span>
                                            </Label>

                                            <Editor
                                                editorSerializedState={newJob.description ?? undefined}
                                                onSerializedChange={(value) =>
                                                    setJobField("description", value)
                                                }
                                            />

                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="mb-2">
                                                    Pays <span className="text-red-500">*</span>
                                                </Label>
                                                <Select
                                                    value={newJob.workCountryLocation}
                                                    onValueChange={(v) => {
                                                        setNewJob({...newJob, workCountryLocation: v});
                                                        setSelectedCountry(v);
                                                    }}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Sélectionnez un pays"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {COUNTRIES.map((country) => (
                                                            <SelectItem key={country} value={country}>
                                                                {country}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="mb-2">
                                                    Ville <span className="text-red-500">*</span>
                                                </Label>
                                                <Select
                                                    value={newJob.workCityLocation}
                                                    onValueChange={(v) => setNewJob({...newJob, workCityLocation: v})}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Sélectionnez une ville"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {selectedCountry && COUNTRIES_WITH_CITIES[selectedCountry as keyof typeof COUNTRIES_WITH_CITIES ]
                                                            ? COUNTRIES_WITH_CITIES[selectedCountry as keyof typeof COUNTRIES_WITH_CITIES].map((city) => (
                                                                <SelectItem key={city} value={city}>
                                                                    {city}
                                                                </SelectItem>
                                                            ))
                                                            : (
                                                                <SelectItem value="__placeholder__" disabled>
                                                                    Sélectionnez d'abord un pays
                                                                </SelectItem>
                                                            )}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                        </div>
                                        <div>
                                            <Label className="mb-2">
                                                Date d'expiration
                                            </Label>
                                            <Input
                                                type="date"
                                                value={newJob.expirationDate || ""}
                                                onChange={(e) => setNewJob({...newJob, expirationDate: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* ÉTAPE 3 : DÉTAILS DU POSTE */}
                                {currentStep === 3 && (
                                    <div className="space-y-6">
                                        {/* Type de poste */}
                                        <div className="space-y-2">
                                            <Label className="mb-2">
                                                Type de poste <span className="text-red-500">*</span>
                                            </Label>
                                            <Select
                                                value={newJob.jobType}
                                                onValueChange={(v) => setNewJob({...newJob, jobType: v as any})}
                                            >
                                                <SelectTrigger><SelectValue/></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="FULL_TIME">Temps plein</SelectItem>
                                                    <SelectItem value="PART_TIME">Temps partiel</SelectItem>
                                                    <SelectItem value="REMOTE">Télétravail</SelectItem>
                                                    <SelectItem value="HYBRID">Hybride</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Missions */}
                                        <div className="space-y-2">
                                            <Label className="mb-2">Missions <span className="text-red-500">*</span></Label>
                                            <Editor
                                                editorSerializedState={newJob.responsibilities ?? undefined}
                                                onSerializedChange={(value) =>
                                                    setJobField("responsibilities", value)
                                                }
                                            />
                                        </div>

                                        {/* Sélection multiple de compétences */}
                                        <div className="space-y-2">
                                            <Label className="mb-2">Competences requises<span className="text-red-500">*</span></Label>
                                            <Editor
                                                editorSerializedState={newJob.requirements ?? undefined}
                                                onSerializedChange={(value) =>
                                                    setJobField("requirements", value)
                                                }
                                            />
                                        </div>


                                        {/* Avantages */}
                                        <div className="space-y-2">
                                            <Label className="mb-2">Avantages</Label>
                                            <Editor
                                                editorSerializedState={newJob.benefits ?? undefined}
                                                onSerializedChange={(value) =>
                                                    setJobField("benefits", value)
                                                }
                                            />
                                        </div>

                                        {/* Salaire */}
                                        <div className="space-y-2">
                                            <Label className="mb-2">Salaire</Label>
                                            <Select
                                                value={newJob.salary}
                                                onValueChange={(v) => setNewJob({ ...newJob, salary: v })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner un salaire" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {salaryRanges.map((range) => (
                                                        <SelectItem key={range} value={range}>
                                                            {range}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                        </div>

                                        {/* Gestion des tags (compétences, outils, domaines) */}
                                        <div className="space-y-3">
                                            <Label className="mb-4">Tags(utile pour le referencement mais pas obligatoire) </Label>
                                            {/* Nouveau tag */}
                                            <div className="grid grid-cols-3 gap-2">
                                                <Select value={newTagType}
                                                        onValueChange={(v) => setNewTagType(v as TagType)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Type"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="skill">Compétence</SelectItem>
                                                        <SelectItem value="tool">Outil</SelectItem>
                                                        <SelectItem value="domain">Domaine</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                                <Select value={newTagName} onValueChange={setNewTagName}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Nom"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {TAG_NAMES[newTagType].map(name => (
                                                            <SelectItem key={`${newTagType}-${name}`} value={name}>
                                                                {name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <Button type="button" onClick={addTag} size="sm">
                                                    + Ajouter
                                                </Button>
                                            </div>

                                            {/* Tags existants */}
                                            {newJob.tagDto.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {newJob.tagDto.map((tag, index) => (
                                                        <Badge key={index} variant="secondary"
                                                               className="flex items-center gap-1">
                                                            {tag.name} ({tag.type})
                                                            <button
                                                                type="button"
                                                                onClick={() => removeTag(index)}
                                                                className="ml-1 text-xs text-muted-foreground hover:text-foreground"
                                                            >
                                                                ✕
                                                            </button>
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}

                                            {newJob.tagDto.length === 0 && (
                                                <p className="text-sm text-muted-foreground">Aucun mot-clé ajouté.</p>
                                            )}
                                        </div>


                                        {/* Type de contrat */}
                                        <div className="space-y-2">
                                            <Label className="mb-2">Type de contrat <span className="text-red-500">*</span></Label>
                                            <Select
                                                value={newJob.contractType}
                                                onValueChange={(v) => setNewJob({...newJob, contractType : v as any })}
                                            >
                                                <SelectTrigger><SelectValue/></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="CDI">CDI</SelectItem>
                                                    <SelectItem value="CDD">CDD</SelectItem>
                                                    <SelectItem value="FREELANCE">Freelance</SelectItem>
                                                    <SelectItem value="INTERNSHIP">Stage</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                {/* ÉTAPE 4 : OPTIONS AVANCÉES */}
                                {currentStep === 4 && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label className="mb-2">
                                                    Langue requise <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    value={newJob.requiredLanguage}
                                                    onChange={(e) => setNewJob({
                                                        ...newJob,
                                                        requiredLanguage: e.target.value
                                                    })}
                                                    placeholder="Ex: Français"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 pt-2">
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="urgent"
                                                    checked={newJob.isUrgent}
                                                    onCheckedChange={(checked) => setNewJob({
                                                        ...newJob,
                                                        isUrgent: checked as boolean
                                                    })}
                                                />
                                                <Label htmlFor="urgent">Offre urgente</Label>
                                            </div>
                                        </div>

                                        <div>
                                            <Label className="mb-2">Nombre de postes</Label>
                                            <Input
                                                type="number"
                                                min="1"
                                                value={newJob.postNumber || 1}
                                                onChange={(e) => setNewJob({
                                                    ...newJob,
                                                    postNumber: Number(e.target.value) || 1
                                                })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="mb-2">
                                                Documents requis <span className="text-red-500">*</span>
                                            </Label>
                                            <div className="flex flex-wrap gap-2">
                                                {DOCUMENT_TYPES.map((doc) => {
                                                    const isChecked = newJob.requiredDocuments.some(d => d.type === doc.value);
                                                    return (
                                                        <div key={doc.value} className="flex items-center gap-1">
                                                            <Checkbox
                                                                id={`doc-${doc.value}`}
                                                                checked={isChecked}
                                                                onCheckedChange={(checked) => {
                                                                    let updated = [...newJob.requiredDocuments];
                                                                    if (checked) {
                                                                        updated.push({type: doc.value});
                                                                    } else {
                                                                        updated = updated.filter(d => d.type !== doc.value);
                                                                    }
                                                                    if (updated.length === 0) return;
                                                                    setNewJob({...newJob, requiredDocuments: updated});
                                                                }}
                                                            />
                                                            <Label htmlFor={`doc-${doc.value}`} className="text-sm">
                                                                {doc.label}
                                                            </Label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between gap-2 pt-2">
                                {currentStep > 1 && (
                                    <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                                        Précédent
                                    </Button>
                                )}
                                {currentStep < STEPS.length ? (
                                    <Button onClick={() => setCurrentStep(currentStep + 1)}>Suivant</Button>
                                ) : (
                                    <Button
                                        onClick={handleCreateJob}
                                        disabled={jobLoading}
                                    >
                                        {jobLoading ? <><Spinner className="h-4 w-4 text-white" /> <span className="ml-2">En cours</span></>: 'Creer une offre'}
                                    </Button>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead>Titre</TableHead>
                            {/*<TableHead>Logo</TableHead>*/}
                            <TableHead>Nom de l'entreprise</TableHead>
                            <TableHead>Localisation</TableHead>
                            <TableHead>Type de contrat</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Date de publication</TableHead>
                            <TableHead>Date d'expiration</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8">Chargement...</TableCell>
                            </TableRow>
                        ) : filteredJobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8">Aucune offre trouvée</TableCell>
                            </TableRow>
                        ) : (
                            filteredJobs.map((job: PublishedJob) => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-medium">{job.title}</TableCell>
                                    {/*<TableCell>{job.companyLogo ? (*/}
                                    {/*    <img*/}
                                    {/*        src={job.companyLogo}*/}
                                    {/*        alt={`Logo ${job.companyName}`}*/}
                                    {/*        className="w-full h-full object-contain"*/}
                                    {/*        loading="lazy"*/}
                                    {/*    />*/}
                                    {/*) : (*/}
                                    {/*    <span className=" font-semibold text-lg select-none">{job.companyName.substring(0, 2).toUpperCase()}</span>*/}
                                    {/*)}</TableCell>*/}
                                    <TableCell className="font-medium">{job.companyName}</TableCell>
                                    <TableCell>{job.workCityLocation}, {job.workCountryLocation}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{job.contractType}</Badge>
                                    </TableCell>
                                    <TableCell className="">{getStatusBadge(job.status)}</TableCell>
                                    <TableCell>
                                        {job.publishedAt
                                            ? formatDateShort(job.publishedAt)
                                            : "—"}
                                    </TableCell>
                                    <TableCell className=" text-sm">
                                        {job.expirationDate
                                            ? formatDateShort(job.expirationDate)
                                            : job.status === "PUBLISHED"
                                                ? "Postuler au plutot"
                                                : "Non publiée"}
                                    </TableCell>

                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="h-4 w-4"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {job.status !== "PUBLISHED" && (
                                                    <DropdownMenuItem onClick={() => handlePublishClick(job.id)}>
                                                        <Eye className="h-4 w-4 mr-2"/> Publier
                                                    </DropdownMenuItem>
                                                )}
                                                {/*<DropdownMenuItem>*/}
                                                {/*    <Edit className="h-4 w-4 mr-2"/>*/}
                                                {/*    Modifier (non disponible)*/}
                                                {/*</DropdownMenuItem>*/}
                                                {/*<DropdownMenuSeparator/>*/}
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() => {
                                                        setJobToDelete(job.id);
                                                        setDeleteModalOpen(true);
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2"/> Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* Modal suppression */}
            <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Supprimer l’offre</DialogTitle>
                        <DialogDescription>
                            Cette action est irréversible. Êtes-vous sûr ?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Annuler</Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={jobLoading}
                        >
                            Supprimer
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}