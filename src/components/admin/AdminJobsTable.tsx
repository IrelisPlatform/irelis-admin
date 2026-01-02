//src/components/admin/AdminJobsTable.tsx

"use client";

import React, {useState, useEffect, useMemo, Fragment, useCallback, useRef} from "react";
import {
    Search, Filter, Plus, MoreVertical, Edit, Trash2, Eye, ShieldCheck, Star,
    AlertCircle, Briefcase, Banknote, MapPin, Clock, Calendar, Globe, Users,
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
import {SerializedEditorState} from "lexical";
import {Editor} from "@/components/blocks/editor-00/editor";
import {ReadonlyEditor} from "@/components/ReadonlyEditor";

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
    companyLength: "",
    sectorId: "",

    // Champs offre
    title: "",
    description: null as SerializedEditorState | null,
    workCountryLocation: "",
    workCityLocation: "",
    responsibilities: null as SerializedEditorState | null,
    requirements: null as SerializedEditorState | null,
    benefits: null as SerializedEditorState | null,
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
const INITIAL_EDIT_JOB_STATE = {
    // Champs entreprise (étape 1)
    companyName: "",
    companyEmail: "",
    companyDescription: "",
    companyLength: "",
    sectorId: "",

    // Champs offre
    title: "",
    description: null as SerializedEditorState | null,
    workCountryLocation: "",
    workCityLocation: "",
    responsibilities: null as SerializedEditorState | null,
    requirements: null as SerializedEditorState | null,
    benefits: null as SerializedEditorState | null,
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
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [updateLoading, setUpdateLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const canGoToNextStep = (step: number) => {
        switch (step) {
            case 1:
                return (
                    newJob.companyName?.trim() !== "" &&
                    newJob.companyDescription?.trim() !== "" &&
                    newJob.sectorId?.trim() !== ""
                );

            case 2:
                return (
                    newJob.title?.trim() !== "" &&
                    newJob.description !== null &&
                    newJob.workCountryLocation?.trim() !== "" &&
                    newJob.workCityLocation?.trim() !== ""
                );

            case 3:
                return (
                    newJob.jobType?.trim() !== "" &&
                    newJob.responsibilities !== null &&
                    newJob.requirements !== null &&
                    newJob.contractType?.trim() !== ""
                );

            case 4:
                return newJob.requiredLanguage?.trim() !== ""

            default:
                return false;
        }
    };



    const handleUpdateJob = async () => {
        try {

            setUpdateLoading(true);
            if (!editJob) return;
            const payload = {
                companyName: editJob.companyName?.trim() || "",
                companyDescription: editJob.companyDescription?.trim() || "",
                companyLength: editJob.companyLength,
                sectorId: editJob.sectorId,
                companyEmail: editJob.companyEmail?.trim() || undefined,
                title: editJob.title?.trim() || "",
                description: JSON.stringify(editJob.description),
                workCountryLocation: editJob.workCountryLocation || "",
                workCityLocation: editJob.workCityLocation || "",
                responsibilities: JSON.stringify(editJob.responsibilities),
                requirements: JSON.stringify(editJob.requirements),
                benefits: JSON.stringify(editJob.benefits),
                contractType: editJob.contractType,
                jobType: editJob.jobType,
                salary: editJob.salary,
                isUrgent: editJob.isUrgent,
                isFeatured: editJob.isFeatured,
                expirationDate: editJob.expirationDate || "",
                requiredLanguage: editJob.requiredLanguage?.trim() || "",
                postNumber: editJob.postNumber || 1,
                tagDto: editJob.tagDto,
                requiredDocuments: editJob.requiredDocuments,
            };


            const formData = new FormData();
            formData.append(
                "data",
                new Blob([JSON.stringify(payload)], { type: "application/json" })
            );

            if (companyLogo) {
                formData.append("companyLogo", companyLogo);
            }

            await updateJob(editJob.id, formData);

            toast.success("Offre mise à jour !");
            setIsEditDialogOpen(false);
            setCurrentStep(1);
            const updatedJobs = await getAllJobs();
            setJobs(updatedJobs);
            setUpdateLoading(false);
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors de la mise à jour de l'offre");
        }
        finally {
            setUpdateLoading(false);
        }
    }



    function setJobField<K extends keyof typeof INITIAL_JOB_STATE>(
        field: K,
        value: (typeof INITIAL_JOB_STATE)[K]
    ) {
        setNewJob((prev) => ({
            ...prev,
            [field]: value,
        }))
    }
    function setEditJobField<K extends keyof typeof INITIAL_EDIT_JOB_STATE>(
        field: K,
        value: (typeof INITIAL_EDIT_JOB_STATE)[K]
    ) {
        setEditJob((prev) => ({
            ...prev,
            [field]: value,
        }));
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

    function getEditorState(value?: string): SerializedEditorState {
        if (!value) return initialValue;

        try {
            const parsed = JSON.parse(value);

            if (
                !parsed?.root ||
                !Array.isArray(parsed.root.children) ||
                parsed.root.children.length === 0
            ) {
                return initialValue;
            }

            return parsed;
        } catch {
            return initialValue;
        }
    }


    const {
        getAllJobs,
        createJob,
        publishJob,
        updateJob,
        deleteJob,
        loading: jobLoading,
    } = useAdminJobs();


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
    const [editJob, setEditJob] = useState(INITIAL_EDIT_JOB_STATE);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);


    // console.log("description ",editJob.description);
    // console.log("missions ",editJob.responsibilities);
    // console.log("competences ",editJob.requirements)
    // console.log("benefits ",editJob.benefits);


    const salaryRanges: string[] = []

    for (let start = 0; start < 1000000; start += 100000) {
        const end = start + 50000
        salaryRanges.push(`${start.toLocaleString()} - ${end.toLocaleString()} FCFA`)
    }

    salaryRanges.push("+1.000.000 FCFA")

    const documentLabels: Record<string, string> = {
        CV: "Curriculum Vitae",
        COVER_LETTER: "Lettre de motivation",
        PORTFOLIO: "Portfolio",
        IDENTITY_DOC: "Carte d'identite",
        CERTIFICATE: "Certificat"
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


    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedSectorName, setSelectedSectorName] = useState("");
    const [otherCompetence, setOtherCompetence] = useState<string | null>(null);
    const [formationLevel, setFormationLevel] = useState("");
    const [formationDetail, setFormationDetail] = useState("");
    const [experiences, setExperiences] = useState("");
    const [otherExperience, setOtherExperience] = useState("");

    // État pour stocker les compétences sélectionnées (tableau)
    // const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    // // Ajouter une compétence
    // const addSkill = (skill: string) => {
    //     if (skill.trim() && !selectedSkills.includes(skill.trim())) {
    //         const updated = [...selectedSkills, skill.trim()];
    //         setSelectedSkills(updated);
    //         // Synchronise avec newJob.requirements
    //         setNewJob(prev => ({...prev, requirements: updated.join(', ')}));
    //     }
    // };

    // Supprimer une compétence
    // const removeSkill = (skillToRemove: string) => {
    //     const updated = selectedSkills.filter(s => s !== skillToRemove);
    //     setSelectedSkills(updated);
    //     setNewJob(prev => ({...prev, requirements: updated.join(', ')}));
    // };

    // Réinitialiser quand le secteur change
    // useEffect(() => {
    //     setSelectedSkills([]);
    //     setOtherCompetence(null);
    //     setNewJob(prev => ({...prev, requirements: ""}));
    // }, [selectedSectorName]);

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


    // const skillsForSector = useMemo(() => {
    //     return getSkillsForSector(selectedSectorName);
    // }, [selectedSectorName]);

    //
    // useEffect(() => {
    //     const parts: string[] = [];
    //
    //     if (selectedSkills.length > 0) {
    //         parts.push(...selectedSkills);
    //     }
    //
    //     if (formationDetail) {
    //         parts.push(formationDetail);
    //     }
    //
    //     if (experiences && experiences !== "Autre") {
    //         parts.push(experiences);
    //     } else if (experiences === "Autre" && otherExperience.trim()) {
    //         parts.push(otherExperience.trim());
    //     }
    //
    //     setNewJob(prev => ({...prev, requirements: parts.join(', ')}));
    // }, [selectedSkills, formationDetail, experiences, otherExperience]);

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
            salary: newJob.salary,
            isUrgent: newJob.isUrgent,
            isFeatured: newJob.isFeatured,
            expirationDate: expirationDateISO,
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
            // setOtherCompetence("");
            // setFormationLevel(null);
            // setFormationDetail("");
            // setExperiences("");
            // setOtherExperience("");
            setIsCreateDialogOpen(false);
            setCompanyLogo(null)
            setIsPreviewOpen(false);
            setCurrentStep(1);
        } catch (err) {
            console.error(err);
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
                        <DialogContent className="max-w-5xl overflow-y-auto max-h-[90vh]">
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
                                                ref={fileInputRef}
                                                accept="image/png,image/jpeg,image/webp"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    const MAX_SIZE = 2 * 1024 * 1024;
                                                    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

                                                    if (!allowedTypes.includes(file.type)) {
                                                        toast.error("Format non supporté (PNG, JPEG, WEBP uniquement)");
                                                        e.target.value = "";
                                                        return;
                                                    }

                                                    if (file.size > MAX_SIZE) {
                                                        toast.error("Le logo ne doit pas dépasser 2 Mo");
                                                        e.target.value = "";
                                                        return;
                                                    }

                                                    setCompanyLogo(file);
                                                }}
                                            />
                                            <p className="mt-1 text-sm text-gray-500">
                                               Taille maximale : 2 Mo
                                            </p>

                                            {companyLogo && (
                                                <div className="mt-3 flex items-center gap-3">
                                                    <img
                                                        src={URL.createObjectURL(companyLogo)}
                                                        alt="Logo entreprise"
                                                        className="w-16 h-16 rounded-lg object-contain border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setCompanyLogo(null);
                                                            if (fileInputRef.current) {
                                                                fileInputRef.current.value = "";
                                                            }
                                                        }}
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
                                                <SelectContent className="max-h-60 overflow-y-auto">
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
                                                onValueChange={(v) => setNewJob({...newJob, companyLength: v})}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner la taille de l’entreprise"/>
                                                </SelectTrigger>
                                                <SelectContent className="max-h-60 overflow-y-auto">
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
                                                        {selectedCountry && COUNTRIES_WITH_CITIES[selectedCountry as keyof typeof COUNTRIES_WITH_CITIES]
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
                                            <Label className="mb-2">Missions <span
                                                className="text-red-500">*</span></Label>
                                            <Editor
                                                editorSerializedState={newJob.responsibilities ?? undefined}
                                                onSerializedChange={(value) =>
                                                    setJobField("responsibilities", value)
                                                }
                                            />
                                        </div>

                                        {/* Sélection multiple de compétences */}
                                        <div className="space-y-2">
                                            <Label className="mb-2">Competences requises<span
                                                className="text-red-500">*</span></Label>
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
                                                onValueChange={(v) => setNewJob({...newJob, salary: v})}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner un salaire"/>
                                                </SelectTrigger>
                                                <SelectContent className="max-h-60 overflow-y-auto">
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
                                            <Label className="mb-4">Tags(utile pour le referencement mais pas
                                                obligatoire) </Label>
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
                                            <Label className="mb-2">Type de contrat <span
                                                className="text-red-500">*</span></Label>
                                            <Select
                                                value={newJob.contractType}
                                                onValueChange={(v) => setNewJob({...newJob, contractType: v as any})}
                                            >
                                                <SelectTrigger><SelectValue/></SelectTrigger>
                                                <SelectContent className="max-h-60 overflow-y-auto">
                                                    <SelectItem value="CDI">CDI</SelectItem>
                                                    <SelectItem value="CDI_PART_TIME">CDI (Temps partiel)</SelectItem>
                                                    <SelectItem value="CDD">CDD</SelectItem>
                                                    <SelectItem value="CDI_PART_TIME">CDD (Temps partiel)</SelectItem>
                                                    <SelectItem value="INTERIM">Intérim</SelectItem>
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
                                    <Button
                                        onClick={() => {
                                            if (canGoToNextStep(currentStep)) {
                                                setCurrentStep(currentStep + 1);
                                            } else {
                                                toast.error(
                                                    "Veuillez remplir tous les champs obligatoires pour passer à l’étape suivante"
                                                );
                                            }
                                        }}
                                    >
                                        Suivant
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => {
                                            if (canGoToNextStep(currentStep)) {
                                                setIsPreviewOpen(true);
                                            } else {
                                                toast.error(
                                                    "Veuillez remplir tous les champs obligatoires avant la prévisualisation"
                                                );
                                            }
                                        }}
                                        disabled={jobLoading}
                                    >
                                        Visualiser
                                    </Button>
                                )}

                            </div>
                        </DialogContent>
                    </Dialog>


                    {/* MODAL MODIFICATION D'OFFRE */}
                    <Dialog
                        open={isEditDialogOpen}
                        onOpenChange={(open) => {
                            setIsEditDialogOpen(open);
                            if (!open) setCurrentStep(1); // reset étapes
                        }}
                    >
                        {editJob && (
                            <DialogContent className="max-w-5xl overflow-y-auto max-h-[90vh]">
                                <DialogHeader>
                                    <DialogTitle>Modifier l'offre (Étape {currentStep}/4)</DialogTitle>
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
                                                            setCompanyLogo(file)
                                                            setLogoPreview(URL.createObjectURL(file))
                                                        }
                                                    }}
                                                />
                                                <p className="text-xs text-gray-500 mt-1">
                                                   Taille max : 2 Mo
                                                </p>
                                                {logoPreview && (
                                                    <div className="mt-3 flex items-center gap-3">
                                                        <img
                                                            src={logoPreview}
                                                            alt="Logo entreprise"
                                                            className="w-16 h-16 rounded-lg object-contain border"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setCompanyLogo(null);
                                                                setLogoPreview(null);
                                                            }}
                                                            className="text-sm text-red-500 hover:underline"
                                                        >
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <Label className="mb-2">Nom de l'entreprise <span className="text-red-500">*</span></Label>
                                                <Input
                                                    value={editJob.companyName ?? ""}
                                                    onChange={(e) => setEditJob({ ...editJob, companyName: e.target.value })}
                                                    placeholder="Ex: Irelis SARL"
                                                />
                                            </div>

                                            <div>
                                                <Label className="mb-2">Description de l'entreprise <span className="text-red-500">*</span></Label>
                                                <Textarea
                                                    rows={3}
                                                    value={editJob.companyDescription ?? ""}
                                                    onChange={(e) => setEditJob({ ...editJob, companyDescription: e.target.value })}
                                                />
                                            </div>

                                            <div>
                                                <Label className="mb-2">Email de l'entreprise</Label>
                                                <Input
                                                    type="email"
                                                    value={editJob.companyEmail ?? ""}
                                                    onChange={(e) => setEditJob({ ...editJob, companyEmail: e.target.value })}
                                                />
                                            </div>

                                            <div>
                                                <Label className="mb-2">Secteur d'activité <span className="text-red-500">*</span></Label>
                                                <Select
                                                    value={editJob.sectorId}
                                                    onValueChange={(v) => setEditJob({ ...editJob, sectorId: v })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Sélectionnez un secteur" />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-60 overflow-y-auto">
                                                        {sectors.map((s) => (
                                                            <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label className="mb-2">Taille de l'entreprise</Label>
                                                <Select
                                                    value={editJob.companyLength}
                                                    onValueChange={(v) => setEditJob({ ...editJob, companyLength: v })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Sélectionner la taille de l’entreprise"/>
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-60 overflow-y-auto">
                                                        {companySizeRanges.map((range) => (
                                                            <SelectItem key={range} value={range}>{range}</SelectItem>
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
                                                <Label className="mb-2">Titre de l'offre <span className="text-red-500">*</span></Label>
                                                <Input
                                                    value={editJob.title ?? ""}
                                                    placeholder="Ex: Directeur de Production"
                                                    onChange={(e) => setEditJob({...editJob, title: e.target.value})}
                                                />
                                            </div>
                                            <div>
                                                <Label className="mb-2">Description de l'offre <span className="text-red-500">*</span></Label>
                                                {/*<Editor*/}
                                                {/*    editorSerializedState={editJob.description ? JSON.parse(editJob.description) : undefined}*/}
                                                {/*    onSerializedChange={(value) =>*/}
                                                {/*        setEditJobField("description", value)*/}
                                                {/*    }*/}
                                                {/*/>*/}
                                                <Editor
                                                    editorSerializedState={editJob.description}
                                                    onSerializedChange={(value) =>
                                                        setEditJobField("description", value)
                                                    }
                                                />

                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="mb-2">Pays <span className="text-red-500">*</span></Label>
                                                    <Select
                                                        value={editJob.workCountryLocation}
                                                        onValueChange={(v) => {
                                                            setEditJob({...editJob, workCountryLocation: v});
                                                            setSelectedCountry(v);
                                                        }}
                                                    >
                                                        <SelectTrigger><SelectValue placeholder="Sélectionnez un pays"/></SelectTrigger>
                                                        <SelectContent>
                                                            {COUNTRIES.map((country) => (
                                                                <SelectItem key={country} value={country}>{country}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label className="mb-2">Ville <span className="text-red-500">*</span></Label>
                                                    <Select
                                                        value={editJob.workCityLocation}
                                                        onValueChange={(v) => setEditJob({...editJob, workCityLocation: v})}
                                                    >
                                                        <SelectTrigger><SelectValue placeholder="Sélectionnez une ville"/></SelectTrigger>
                                                        <SelectContent>
                                                            {selectedCountry && COUNTRIES_WITH_CITIES[selectedCountry as keyof typeof COUNTRIES_WITH_CITIES]
                                                                ? COUNTRIES_WITH_CITIES[selectedCountry as keyof typeof COUNTRIES_WITH_CITIES].map((city) => (
                                                                    <SelectItem key={city} value={city}>{city}</SelectItem>
                                                                ))
                                                                : (
                                                                    <SelectItem value="__placeholder__" disabled>
                                                                        Sélectionnez d'abord un pays
                                                                    </SelectItem>
                                                                )
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div>
                                                <Label className="mb-2">Date d'expiration</Label>
                                                <Input
                                                    type="date"
                                                    value={editJob.expirationDate || ""}
                                                    onChange={(e) => setEditJob({...editJob, expirationDate: e.target.value})}
                                                />
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Date actuelle : {editJob.expirationDate ? formatDateLong(editJob.expirationDate) : 'non spécifié'}
                                                </p>

                                            </div>
                                        </div>
                                    )}

                                    {/* ÉTAPE 3 : DÉTAILS DU POSTE */}
                                    {currentStep === 3 && (
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <Label className="mb-2">Type de poste <span className="text-red-500">*</span></Label>
                                                <Select
                                                    value={editJob.jobType}
                                                    onValueChange={(v) => setEditJob({...editJob, jobType: v as any})}
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

                                            <div className="space-y-2">
                                                <Label className="mb-2">Missions <span className="text-red-500">*</span></Label>
                                                <Editor
                                                    editorSerializedState={editJob.responsibilities}
                                                    onSerializedChange={(value) =>
                                                        setEditJobField("responsibilities", value)
                                                    }
                                                />

                                                {/*<Editor*/}
                                                {/*    editorSerializedState={getEditorState(editJob.responsibilities)}*/}
                                                {/*    onSerializedChange={(value) =>*/}
                                                {/*        setEditJobField("responsibilities", value)*/}
                                                {/*    }*/}
                                                {/*/>*/}

                                            </div>

                                            <div className="space-y-2">
                                                <Label className="mb-2">Compétences requises <span className="text-red-500">*</span></Label>
                                                <Editor
                                                    editorSerializedState={editJob.requirements}
                                                    onSerializedChange={(value) =>
                                                        setEditJobField("requirements", value)
                                                    }
                                                />
                                                {/*<Editor*/}
                                                {/*    editorSerializedState={getEditorState(editJob.requirements)}*/}
                                                {/*    onSerializedChange={(value) =>*/}
                                                {/*        setEditJobField("requirements", value)*/}
                                                {/*    }*/}
                                                {/*/>*/}

                                            </div>

                                            <div className="space-y-2">
                                                <Label className="mb-2">Avantages</Label>
                                                <Editor
                                                    editorSerializedState={editJob.benefits}
                                                    onSerializedChange={(value) =>
                                                        setEditJobField("benefits", value)
                                                    }
                                                />
                                                {/*<Editor*/}
                                                {/*    editorSerializedState={getEditorState(editJob.benefits)}*/}
                                                {/*    onSerializedChange={(value) =>*/}
                                                {/*        setEditJobField("benefits", value)*/}
                                                {/*    }*/}
                                                {/*/>*/}

                                            </div>

                                            <div className="space-y-2">
                                                <Label className="mb-2">Salaire</Label>
                                                <Select
                                                    value={editJob.salary}
                                                    onValueChange={(v) => setEditJob({...editJob, salary: v})}
                                                >
                                                    <SelectTrigger><SelectValue placeholder="Sélectionner un salaire"/></SelectTrigger>
                                                    <SelectContent className="max-h-60 overflow-y-auto">
                                                        {salaryRanges.map((range) => (
                                                            <SelectItem key={range} value={range}>{range}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Tags */}
                                            <div className="space-y-3">
                                                <Label className="mb-4">Tags (facultatif)</Label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <Select value={newTagType} onValueChange={(v) => setNewTagType(v as TagType)}>
                                                        <SelectTrigger><SelectValue placeholder="Type"/></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="skill">Compétence</SelectItem>
                                                            <SelectItem value="tool">Outil</SelectItem>
                                                            <SelectItem value="domain">Domaine</SelectItem>
                                                        </SelectContent>
                                                    </Select>

                                                    <Select value={newTagName} onValueChange={setNewTagName}>
                                                        <SelectTrigger><SelectValue placeholder="Nom"/></SelectTrigger>
                                                        <SelectContent>
                                                            {TAG_NAMES[newTagType].map(name => (
                                                                <SelectItem key={`${newTagType}-${name}`} value={name}>{name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>

                                                    <Button type="button" onClick={addTag} size="sm">+ Ajouter</Button>
                                                </div>

                                                {editJob.tagDto.length > 0 ? (
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {editJob.tagDto.map((tag, index) => (
                                                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                                                {tag.name} ({tag.type})
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeTag(index)}
                                                                    className="ml-1 text-xs text-muted-foreground hover:text-foreground"
                                                                >✕</button>
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                ) : <p className="text-sm text-muted-foreground">Aucun mot-clé ajouté.</p>}
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="mb-2">Type de contrat <span className="text-red-500">*</span></Label>
                                                <Select
                                                    value={editJob.contractType}
                                                    onValueChange={(v) => setEditJob({...editJob, contractType: v as any})}
                                                >
                                                    <SelectTrigger><SelectValue/></SelectTrigger>
                                                    <SelectContent className="max-h-60 overflow-y-auto">
                                                        <SelectItem value="CDI">CDI</SelectItem>
                                                        <SelectItem value="CDI_PART_TIME">CDI (Temps partiel)</SelectItem>
                                                        <SelectItem value="CDD">CDD</SelectItem>
                                                        <SelectItem value="CDI_PART_TIME">CDD (Temps partiel)</SelectItem>
                                                        <SelectItem value="INTERIM">Intérim</SelectItem>
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
                                                    <Label className="mb-2">Langue requise <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        value={editJob.requiredLanguage}
                                                        onChange={(e) => setEditJob({...editJob, requiredLanguage: e.target.value})}
                                                        placeholder="Ex: Français"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 pt-2">
                                                <Checkbox
                                                    id="urgent"
                                                    checked={editJob.isUrgent}
                                                    onCheckedChange={(checked) => setEditJob({...editJob, isUrgent: checked as boolean})}
                                                />
                                                <Label htmlFor="urgent">Offre urgente</Label>
                                            </div>

                                            <div>
                                                <Label className="mb-2">Nombre de postes</Label>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    value={editJob.postNumber || 1}
                                                    onChange={(e) => setEditJob({...editJob, postNumber: Number(e.target.value) || 1})}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="mb-2">Documents requis <span className="text-red-500">*</span></Label>
                                                <div className="flex flex-wrap gap-2">
                                                    {DOCUMENT_TYPES.map((doc) => {
                                                        const isChecked = editJob.requiredDocuments.some(d => d.type === doc.value);
                                                        return (
                                                            <div key={doc.value} className="flex items-center gap-1">
                                                                <Checkbox
                                                                    id={`doc-${doc.value}`}
                                                                    checked={isChecked}
                                                                    onCheckedChange={(checked) => {
                                                                        let updated = [...editJob.requiredDocuments];
                                                                        if (checked) updated.push({type: doc.value});
                                                                        else updated = updated.filter(d => d.type !== doc.value);
                                                                        if (updated.length === 0) return;
                                                                        setEditJob({...editJob, requiredDocuments: updated});
                                                                    }}
                                                                />
                                                                <Label htmlFor={`doc-${doc.value}`} className="text-sm">{doc.label}</Label>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* BOUTONS PRÉCÉDENT / SUIVANT / ENREGISTRER */}
                                <div className="flex justify-between gap-2 pt-2">
                                    {currentStep > 1 && (
                                        <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>Précédent</Button>
                                    )}
                                    {currentStep < STEPS.length ? (
                                        <Button onClick={() => setCurrentStep(currentStep + 1)}>Suivant</Button>
                                    ) : (
                                        <Button
                                            onClick={handleUpdateJob}
                                        >
                                            {updateLoading ? <><Spinner className="h-4 w-4 text-white"/> <span className="ml-2">En cours</span></> : "Modifier"}
                                        </Button>
                                    )}
                                </div>
                            </DialogContent>
                        )}

                    </Dialog>


                    <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                        <DialogContent
                            className="max-w-5xl max-h-[90vh] overflow-y-auto p-6 rounded-xl bg-white">
                            <DialogHeader className="pl-2">
                                <DialogTitle className="text-2xl font-bold mb-2 text-[#1e3a8a] ">Prévisualisation de
                                    l'offre</DialogTitle>
                                <p className="text-sm text-gray-500 mb-4">Vérifiez toutes les informations avant de
                                    publier votre offre.</p>
                            </DialogHeader>

                            {/* Card container */}
                            <div
                                className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-10 rounded-xl border border-blue-100/50 shadow-sm space-y-6">
                                {/* Header */}
                                <div className="flex items-center gap-4">
                                    {companyLogo && (
                                        <img
                                            src={URL.createObjectURL(companyLogo)}
                                            alt="Logo entreprise"
                                            className="w-16 h-16 rounded-lg border"
                                        />
                                    )}
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-semibold text-[#1e3a8a]">{newJob.title}</h3>
                                        <p className="text-gray-700">{newJob.companyName}</p>
                                    </div>
                                </div>

                                {/* Grid of fields */}
                                <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 text-sm text-gray-700">
                                    {[
                                        {label: "Type de contrat", value: getContractTypeLabel(newJob.contractType), icon: Briefcase},
                                        {label: "Salaire", value: newJob.salary || "Non spécifié", icon: Banknote},
                                        {
                                            label: "Lieu",
                                            value: `${newJob.workCityLocation}, ${newJob.workCountryLocation}`,
                                            icon: MapPin
                                        },
                                        {
                                            label: "Date d'expiration",
                                            value: formatDateLong(newJob.expirationDate) || "Non définie",
                                            icon: Clock
                                        },
                                        {label: "Langue requise", value: newJob.requiredLanguage || "-", icon: Globe},
                                        {label: "Nombre de postes", value: newJob.postNumber ?? 1, icon: Users},
                                        {
                                            label: "Offre urgente",
                                            value: newJob.isUrgent ? "Oui" : "Non",
                                            icon: AlertCircle
                                        },
                                    ].map((item, i) => (
                                        <div key={i} className="flex p-2 items-start gap-4 text-base">
                                            <item.icon className="w-4 h-4 text-[#1e3a8a]/70 flex-shrink-0 mt-1"/>
                                            <div className="flex-1 flex gap-2">
                                                <span className="font-medium text-gray-800">{item.label}</span>
                                                <span className="text-gray-700 break-words">{item.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    {/* Description */}
                                    {newJob.description && (
                                        <div>
                                            <h4 className="text-[#1e3a8a] font-semibold mb-1">Description de
                                                l'offre</h4>
                                            <ReadonlyEditor
                                                value={newJob.description}
                                                namespace={`job-description`}
                                            />
                                        </div>
                                    )}

                                    {/* Missions */}
                                    {newJob.responsibilities && (
                                        <div>
                                            <h4 className="text-[#1e3a8a] font-semibold mb-1">Missions</h4>
                                            <ReadonlyEditor
                                                value={newJob.responsibilities}
                                                namespace={`job-responsibilities`}
                                            />
                                        </div>
                                    )}

                                    {/* Compétences */}
                                    {newJob.requirements && (
                                        <div>
                                            <h4 className="text-[#1e3a8a] font-semibold mb-1">Compétences requises</h4>
                                            <ReadonlyEditor
                                                value={newJob.requirements}
                                                namespace={`job-requirements`}
                                            />
                                        </div>
                                    )}

                                    {/* Avantages */}
                                    {newJob.benefits && (
                                        <div>
                                            <h4 className="text-[#1e3a8a] font-semibold mb-1">Avantages</h4>
                                            <ReadonlyEditor
                                                value={newJob.benefits}
                                                namespace={`job-benefits`}
                                            />
                                        </div>
                                    )}

                                    {/* Documents requis */}
                                    {newJob.requiredDocuments.length > 0 && (
                                        <div>
                                            <h4 className="text-[#1e3a8a] font-semibold mb-1">Documents requis</h4>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                                {newJob.requiredDocuments.map(d => (
                                                    <li key={d.type}>{documentLabels[d.type]}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {newJob.tagDto.length > 0 && (
                                        <div>
                                            <h4 className="text-[#1e3a8a] font-semibold mb-1">Tags</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {newJob.tagDto.map(tag => (
                                                    <span
                                                        key={tag.name}
                                                        className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded"
                                                    >
            {tag.name}
          </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="flex justify-between gap-2 mt-6">
                                <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                                    Revenir
                                </Button>
                                <Button onClick={handleCreateJob} disabled={jobLoading}>
                                    {jobLoading ? <><Spinner className="h-4 w-4 text-white"/> <span className="ml-2">En cours</span></> : "Publier l'offre"}
                                </Button>
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
                                        <Badge variant="outline">{getContractTypeLabel(job.contractType)}</Badge>
                                    </TableCell>
                                    <TableCell className="">{getStatusBadge(job.status)}</TableCell>
                                    <TableCell>
                                        {job.publishedAt
                                            ? formatDateRelative(job.publishedAt)
                                            : "—"}
                                    </TableCell>
                                    <TableCell className=" text-sm">
                                        {job.expirationDate
                                            ? formatDateLong(job.expirationDate)
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
                                                {/*<DropdownMenuItem onClick={() => alert('view')}>*/}
                                                {/*    <Eye className="h-4 w-4 mr-2"/>*/}
                                                {/*    Voir les details*/}
                                                {/*</DropdownMenuItem>*/}
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setEditJob({
                                                            ...job,
                                                            description: job.description ? JSON.parse(job.description) : undefined,
                                                            responsibilities: job.responsibilities ? JSON.parse(job.responsibilities) : undefined,
                                                            requirements: job.requirements ? JSON.parse(job.requirements) : undefined,
                                                            benefits: job.benefits ? JSON.parse(job.benefits) : undefined,
                                                        });
                                                        setIsEditDialogOpen(true);
                                                        setSelectedCountry(job.workCountryLocation)
                                                        setLogoPreview(job.companyLogoUrl || null);
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator/>
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