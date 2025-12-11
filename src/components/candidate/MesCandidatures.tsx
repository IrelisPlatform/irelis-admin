// src/components/candidate/MesCandidatures.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ExternalLink, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Candidature {
  id: string;
  dateEnvoi: string;
  intitulePoste: string;
  recruteur: string;
  ville: string;
  typeContrat: string;
  lienOffre: string;
  reponseRecue: 'oui' | 'non';
  dateRelance: string;
  moyenRelance: string;
  dateEntretien: string;
  contactRecrutement: string;
  posteContact: string;
  emailTel: string;
}

export function MesCandidatures() {
  const [candidatures, setCandidatures] = useState<Candidature[]>([
    {
      id: '1',
      dateEnvoi: '2024-01-15',
      intitulePoste: 'Développeur Full Stack',
      recruteur: 'TechAfrica',
      ville: 'Dakar',
      typeContrat: 'CDI',
      lienOffre: 'https://example.com/offre1',
      reponseRecue: 'oui',
      dateRelance: '2024-01-22',
      moyenRelance: 'Email',
      dateEntretien: '2024-01-25',
      contactRecrutement: 'Amadou Diallo',
      posteContact: 'RH Manager',
      emailTel: 'a.diallo@techafrica.com',
    },
    {
      id: '2',
      dateEnvoi: '2024-01-18',
      intitulePoste: 'Chef de Projet Digital',
      recruteur: 'Digital Solutions CI',
      ville: 'Abidjan',
      typeContrat: 'CDD',
      lienOffre: 'https://example.com/offre2',
      reponseRecue: 'non',
      dateRelance: '2024-01-25',
      moyenRelance: 'Téléphone',
      dateEntretien: '',
      contactRecrutement: 'Fatou Koné',
      posteContact: 'Directrice RH',
      emailTel: '+225 07 00 00 00',
    },
  ]);

  const [editingCell, setEditingCell] = useState<{ id: string; field: string } | null>(null);

  const addNewCandidature = () => {
    const newCandidature: Candidature = {
      id: Date.now().toString(),
      dateEnvoi: new Date().toISOString().split('T')[0],
      intitulePoste: '',
      recruteur: '',
      ville: '',
      typeContrat: '',
      lienOffre: '',
      reponseRecue: 'non',
      dateRelance: '',
      moyenRelance: '',
      dateEntretien: '',
      contactRecrutement: '',
      posteContact: '',
      emailTel: '',
    };
    setCandidatures([...candidatures, newCandidature]);
  };

  const deleteCandidature = (id: string) => {
    setCandidatures(candidatures.filter(c => c.id !== id));
  };

  const updateCandidature = (id: string, field: keyof Candidature, value: string) => {
    setCandidatures(candidatures.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const handleCellClick = (id: string, field: string) => {
    setEditingCell({ id, field });
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const exportToCSV = () => {
    const headers = [
      'Date envoi',
      'Intitulé du poste',
      'Recruteur',
      'Ville',
      'Type de contrat',
      'Lien offre',
      'Réponse reçue',
      'Date relance',
      'Moyen relance',
      'Date entretien',
      'Contact recrutement',
      'Poste contact',
      'Email/Tél',
    ];

    const rows = candidatures.map(c => [
      c.dateEnvoi,
      c.intitulePoste,
      c.recruteur,
      c.ville,
      c.typeContrat,
      c.lienOffre,
      c.reponseRecue,
      c.dateRelance,
      c.moyenRelance,
      c.dateEntretien,
      c.contactRecrutement,
      c.posteContact,
      c.emailTel,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'mes_candidatures.csv';
    link.click();
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-white border-b border-border py-6">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">Mes candidatures</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Suivez l'évolution de vos candidatures en un coup d'œil
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={exportToCSV}
                variant="outline"
                className="gap-2 text-sm"
              >
                <Download className="h-4 w-4" />
                Exporter CSV
              </Button>
              <Button
                onClick={addNewCandidature}
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-sm"
              >
                <Plus className="h-4 w-4" />
                Nouvelle candidature
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau */}
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="min-w-[120px]">Date envoi</TableHead>
                  <TableHead className="min-w-[200px]">Intitulé du poste</TableHead>
                  <TableHead className="min-w-[150px]">Recruteur</TableHead>
                  <TableHead className="min-w-[120px]">Ville</TableHead>
                  <TableHead className="min-w-[120px]">Type contrat</TableHead>
                  <TableHead className="min-w-[150px]">Lien offre</TableHead>
                  <TableHead className="min-w-[130px]">Réponse reçue</TableHead>
                  <TableHead className="min-w-[120px]">Date relance</TableHead>
                  <TableHead className="min-w-[140px]">Moyen relance</TableHead>
                  <TableHead className="min-w-[130px]">Date entretien</TableHead>
                  <TableHead className="min-w-[150px]">Contact recrutement</TableHead>
                  <TableHead className="min-w-[150px]">Poste contact</TableHead>
                  <TableHead className="min-w-[180px]">Email/Tél</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidatures.map((candidature) => (
                  <TableRow key={candidature.id} className="hover:bg-muted/50">
                    <TableCell>
                      {editingCell?.id === candidature.id && editingCell?.field === 'dateEnvoi' ? (
                        <Input
                          type="date"
                          value={candidature.dateEnvoi}
                          onChange={(e) => updateCandidature(candidature.id, 'dateEnvoi', e.target.value)}
                          onBlur={handleCellBlur}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <div
                          onClick={() => handleCellClick(candidature.id, 'dateEnvoi')}
                          className="cursor-pointer hover:bg-muted px-2 py-1 rounded text-foreground"
                        >
                          {candidature.dateEnvoi || '-'}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCell?.id === candidature.id && editingCell?.field === 'intitulePoste' ? (
                        <Input
                          value={candidature.intitulePoste}
                          onChange={(e) => updateCandidature(candidature.id, 'intitulePoste', e.target.value)}
                          onBlur={handleCellBlur}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <div
                          onClick={() => handleCellClick(candidature.id, 'intitulePoste')}
                          className="cursor-pointer hover:bg-muted px-2 py-1 rounded text-foreground"
                        >
                          {candidature.intitulePoste || '-'}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCell?.id === candidature.id && editingCell?.field === 'recruteur' ? (
                        <Input
                          value={candidature.recruteur}
                          onChange={(e) => updateCandidature(candidature.id, 'recruteur', e.target.value)}
                          onBlur={handleCellBlur}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <div
                          onClick={() => handleCellClick(candidature.id, 'recruteur')}
                          className="cursor-pointer hover:bg-muted px-2 py-1 rounded text-foreground"
                        >
                          {candidature.recruteur || '-'}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCell?.id === candidature.id && editingCell?.field === 'ville' ? (
                        <Input
                          value={candidature.ville}
                          onChange={(e) => updateCandidature(candidature.id, 'ville', e.target.value)}
                          onBlur={handleCellBlur}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <div
                          onClick={() => handleCellClick(candidature.id, 'ville')}
                          className="cursor-pointer hover:bg-muted px-2 py-1 rounded text-foreground"
                        >
                          {candidature.ville || '-'}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCell?.id === candidature.id && editingCell?.field === 'typeContrat' ? (
                        <Select
                          value={candidature.typeContrat}
                          onValueChange={(value) => {
                            updateCandidature(candidature.id, 'typeContrat', value);
                            handleCellBlur();
                          }}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CDI">CDI</SelectItem>
                            <SelectItem value="CDD">CDD</SelectItem>
                            <SelectItem value="Stage">Stage</SelectItem>
                            <SelectItem value="Freelance">Freelance</SelectItem>
                            <SelectItem value="Alternance">Alternance</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div
                          onClick={() => handleCellClick(candidature.id, 'typeContrat')}
                          className="cursor-pointer hover:bg-muted px-2 py-1 rounded text-foreground"
                        >
                          {candidature.typeContrat || '-'}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCell?.id === candidature.id && editingCell?.field === 'lienOffre' ? (
                        <Input
                          value={candidature.lienOffre}
                          onChange={(e) => updateCandidature(candidature.id, 'lienOffre', e.target.value)}
                          onBlur={handleCellBlur}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <div
                            onClick={() => handleCellClick(candidature.id, 'lienOffre')}
                            className="cursor-pointer hover:bg-muted px-2 py-1 rounded flex-1 truncate text-foreground"
                          >
                            {candidature.lienOffre || '-'}
                          </div>
                          {candidature.lienOffre && (
                            <a
                              href={candidature.lienOffre}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/90"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCell?.id === candidature.id && editingCell?.field === 'reponseRecue' ? (
                        <Select
                          value={candidature.reponseRecue}
                          onValueChange={(value: 'oui' | 'non') => {
                            updateCandidature(candidature.id, 'reponseRecue', value);
                            handleCellBlur();
                          }}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="oui">Oui</SelectItem>
                            <SelectItem value="non">Non</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div
                          onClick={() => handleCellClick(candidature.id, 'reponseRecue')}
                          className="cursor-pointer hover:bg-muted px-2 py-1 rounded"
                        >
                          <span className={`inline-flex px-2 py-0.5 rounded text-xs ${
                            candidature.reponseRecue === 'oui' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {candidature.reponseRecue === 'oui' ? 'Oui' : 'Non'}
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCell?.id === candidature.id && editingCell?.field === 'dateRelance' ? (
                        <Input
                          type="date"
                          value={candidature.dateRelance}
                          onChange={(e) => updateCandidature(candidature.id, 'dateRelance', e.target.value)}
                          onBlur={handleCellBlur}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <div
                          onClick={() => handleCellClick(candidature.id, 'dateRelance')}
                          className="cursor-pointer hover:bg-muted px-2 py-1 rounded text-foreground"
                        >
                          {candidature.dateRelance || '-'}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCell?.id === candidature.id && editingCell?.field === 'moyenRelance' ? (
                        <Select
                          value={candidature.moyenRelance}
                          onValueChange={(value) => {
                            updateCandidature(candidature.id, 'moyenRelance', value);
                            handleCellBlur();
                          }}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Email">Email</SelectItem>
                            <SelectItem value="Téléphone">Téléphone</SelectItem>
                            <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                            <SelectItem value="Courrier">Courrier</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div
                          onClick={() => handleCellClick(candidature.id, 'moyenRelance')}
                          className="cursor-pointer hover:bg-muted px-2 py-1 rounded text-foreground"
                        >
                          {candidature.moyenRelance || '-'}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCell?.id === candidature.id && editingCell?.field === 'dateEntretien' ? (
                        <Input
                          type="date"
                          value={candidature.dateEntretien}
                          onChange={(e) => updateCandidature(candidature.id, 'dateEntretien', e.target.value)}
                          onBlur={handleCellBlur}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <div
                          onClick={() => handleCellClick(candidature.id, 'dateEntretien')}
                          className="cursor-pointer hover:bg-muted px-2 py-1 rounded text-foreground"
                        >
                          {candidature.dateEntretien || '-'}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCell?.id === candidature.id && editingCell?.field === 'contactRecrutement' ? (
                        <Input
                          value={candidature.contactRecrutement}
                          onChange={(e) => updateCandidature(candidature.id, 'contactRecrutement', e.target.value)}
                          onBlur={handleCellBlur}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <div
                          onClick={() => handleCellClick(candidature.id, 'contactRecrutement')}
                          className="cursor-pointer hover:bg-muted px-2 py-1 rounded text-foreground"
                        >
                          {candidature.contactRecrutement || '-'}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCell?.id === candidature.id && editingCell?.field === 'posteContact' ? (
                        <Input
                          value={candidature.posteContact}
                          onChange={(e) => updateCandidature(candidature.id, 'posteContact', e.target.value)}
                          onBlur={handleCellBlur}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <div
                          onClick={() => handleCellClick(candidature.id, 'posteContact')}
                          className="cursor-pointer hover:bg-muted px-2 py-1 rounded text-foreground"
                        >
                          {candidature.posteContact || '-'}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCell?.id === candidature.id && editingCell?.field === 'emailTel' ? (
                        <Input
                          value={candidature.emailTel}
                          onChange={(e) => updateCandidature(candidature.id, 'emailTel', e.target.value)}
                          onBlur={handleCellBlur}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <div
                          onClick={() => handleCellClick(candidature.id, 'emailTel')}
                          className="cursor-pointer hover:bg-muted px-2 py-1 rounded text-foreground"
                        >
                          {candidature.emailTel || '-'}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => deleteCandidature(candidature.id)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {candidatures.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Aucune candidature pour le moment</p>
              <Button
                onClick={addNewCandidature}
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-sm"
              >
                <Plus className="h-4 w-4" />
                Ajouter ma première candidature
              </Button>
            </div>
          )}
        </Card>

        {/* Stats */}
        {candidatures.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-muted-foreground text-sm mb-1">Total candidatures</div>
              <div className="text-2xl text-foreground">{candidatures.length}</div>
            </Card>
            <Card className="p-4">
              <div className="text-muted-foreground text-sm mb-1">Réponses reçues</div>
              <div className="text-2xl text-green-600">
                {candidatures.filter(c => c.reponseRecue === 'oui').length}
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-muted-foreground text-sm mb-1">En attente</div>
              <div className="text-2xl text-red-600">
                {candidatures.filter(c => c.reponseRecue === 'non').length}
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-muted-foreground text-sm mb-1">Entretiens</div>
              <div className="text-2xl text-blue-600">
                {candidatures.filter(c => c.dateEntretien).length}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}