// /src/components/recruiter/TeamManagement.tsx

"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Mail,
  Shield,
  Trash2,
  Edit,
  UserPlus,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "recruiter" | "manager" | "viewer";
  department: string;
  jobsAssigned: number;
  candidatesManaged: number;
  status: "active" | "inactive";
  lastActive: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Nadège Essomba",
    email: "n.essomba@ireliscameroun.com",
    role: "admin",
    department: "RH",
    jobsAssigned: 8,
    candidatesManaged: 45,
    status: "active",
    lastActive: "En ligne",
  },
  {
    id: "2",
    name: "Patrick Kouassi",
    email: "p.kouassi@ireliscameroun.com",
    role: "recruiter",
    department: "IT",
    jobsAssigned: 12,
    candidatesManaged: 67,
    status: "active",
    lastActive: "Il y a 5 min",
  },
  {
    id: "3",
    name: "Khadija Bello",
    email: "k.bello@ireliscameroun.com",
    role: "manager",
    department: "Commercial",
    jobsAssigned: 6,
    candidatesManaged: 34,
    status: "active",
    lastActive: "Il y a 2h",
  },
  {
    id: "4",
    name: "Alain Nguema",
    email: "a.nguema@ireliscameroun.com",
    role: "recruiter",
    department: "IT",
    jobsAssigned: 10,
    candidatesManaged: 52,
    status: "active",
    lastActive: "Hier",
  },
  {
    id: "5",
    name: "Christelle Kamdem",
    email: "c.kamdem@ireliscameroun.com",
    role: "viewer",
    department: "Direction",
    jobsAssigned: 0,
    candidatesManaged: 0,
    status: "active",
    lastActive: "Il y a 3 jours",
  },
];

const activityLog = [
  {
    id: "1",
    user: "Patrick Kouassi",
    action: "a créé l'offre",
    target: "Développeur Full Stack Senior",
    timestamp: "Il y a 10 min",
  },
  {
    id: "2",
    user: "Khadija Bello",
    action: "a modifié le statut de",
    target: "Aminata Ndiaye (Entretien planifié)",
    timestamp: "Il y a 25 min",
  },
  {
    id: "3",
    user: "Alain Nguema",
    action: "a contacté",
    target: "Thomas Petit",
    timestamp: "Il y a 1h",
  },
  {
    id: "4",
    user: "Marie Dupont",
    action: "a archivé l'offre",
    target: "Chef de Projet Junior",
    timestamp: "Il y a 2h",
  },
  {
    id: "5",
    user: "Pierre Laurent",
    action: "a ajouté un nouveau membre",
    target: "Julie Rousseau",
    timestamp: "Hier",
  },
];

export function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "recruiter",
    department: "",
  });

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: TeamMember["role"]) => {
    const variants = {
      admin: "bg-purple-100 text-purple-800 border-purple-200",
      recruiter: "bg-blue-100 text-blue-800 border-blue-200",
      manager: "bg-green-100 text-green-800 border-green-200",
      viewer: "bg-gray-100 text-gray-800 border-gray-200",
    };
    const labels = {
      admin: "Administrateur",
      recruiter: "Recruteur",
      manager: "Manager",
      viewer: "Lecteur",
    };
    return (
      <Badge variant="outline" className={variants[role]}>
        {labels[role]}
      </Badge>
    );
  };

  const handleAddMember = () => {
    const member: TeamMember = {
      id: (members.length + 1).toString(),
      name: newMember.name,
      email: newMember.email,
      role: newMember.role as TeamMember["role"],
      department: newMember.department,
      jobsAssigned: 0,
      candidatesManaged: 0,
      status: "active",
      lastActive: "En ligne",
    };
    setMembers([...members, member]);
    setIsAddMemberDialogOpen(false);
    setNewMember({ name: "", email: "", role: "recruiter", department: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Gestion d'équipe</h1>
        <p className="text-muted-foreground">
          Gérez les membres de votre équipe et leurs accès
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Membres actifs</p>
            <p className="mt-1">{members.filter((m) => m.status === "active").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Administrateurs</p>
            <p className="mt-1">{members.filter((m) => m.role === "admin").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Recruteurs</p>
            <p className="mt-1">{members.filter((m) => m.role === "recruiter").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Managers</p>
            <p className="mt-1">{members.filter((m) => m.role === "manager").length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Membres de l'équipe</TabsTrigger>
          <TabsTrigger value="activity">Historique d'activité</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, email ou département..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un membre
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau membre</DialogTitle>
                  <DialogDescription>
                    Ajoutez un nouveau membre à votre équipe.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      placeholder="ex: Jean Dupont"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ex: j.dupont@irelis.fr"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle *</Label>
                    <Select
                      value={newMember.role}
                      onValueChange={(value) => setNewMember({ ...newMember, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrateur</SelectItem>
                        <SelectItem value="recruiter">Recruteur</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="viewer">Lecteur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Département *</Label>
                    <Input
                      id="department"
                      placeholder="ex: IT"
                      value={newMember.department}
                      onChange={(e) =>
                        setNewMember({ ...newMember, department: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddMemberDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button
                    onClick={handleAddMember}
                    disabled={
                      !newMember.name || !newMember.email || !newMember.department
                    }
                  >
                    Ajouter
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Members Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Membre</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Département</TableHead>
                    <TableHead className="text-right">Offres assignées</TableHead>
                    <TableHead className="text-right">Candidats gérés</TableHead>
                    <TableHead>Dernière activité</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p>{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(member.role)}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell className="text-right">{member.jobsAssigned}</TableCell>
                      <TableCell className="text-right">{member.candidatesManaged}</TableCell>
                      <TableCell>{member.lastActive}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="h-4 w-4 mr-2" />
                              Changer le rôle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Envoyer un message
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Retirer de l'équipe
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLog.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
                    <History className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p>
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}{" "}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Matrice des permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permission</TableHead>
                    <TableHead className="text-center">Administrateur</TableHead>
                    <TableHead className="text-center">Recruteur</TableHead>
                    <TableHead className="text-center">Manager</TableHead>
                    <TableHead className="text-center">Lecteur</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { permission: "Créer des offres", admin: true, recruiter: true, manager: true, viewer: false },
                    { permission: "Modifier toutes les offres", admin: true, recruiter: false, manager: true, viewer: false },
                    { permission: "Supprimer des offres", admin: true, recruiter: false, manager: true, viewer: false },
                    { permission: "Accéder à la CVthèque", admin: true, recruiter: true, manager: true, viewer: false },
                    { permission: "Contacter les candidats", admin: true, recruiter: true, manager: true, viewer: false },
                    { permission: "Voir les statistiques", admin: true, recruiter: true, manager: true, viewer: true },
                    { permission: "Gérer l'équipe", admin: true, recruiter: false, manager: false, viewer: false },
                    { permission: "Accéder aux paramètres", admin: true, recruiter: false, manager: false, viewer: false },
                  ].map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.permission}</TableCell>
                      <TableCell className="text-center">
                        {row.admin ? "✓" : "—"}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.recruiter ? "✓" : "—"}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.manager ? "✓" : "—"}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.viewer ? "✓" : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}