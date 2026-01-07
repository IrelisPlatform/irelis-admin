---
name: Refactor AdminJobsTable
overview: "Refactoriser le composant AdminJobsTable en séparant les responsabilités : créer des composants dédiés pour la recherche/filtres, création, modification, suppression et prévisualisation. Transformer AdminJobsTable en server component qui affiche uniquement la table. Utiliser nuqs pour la gestion des paramètres URL, Zod pour la validation du formulaire de création, et créer des server actions pour les opérations CRUD."
todos:
  - id: setup-nuqs
    content: Configurer NuqsAdapter dans src/app/layout.tsx
    status: completed
  - id: create-server-actions
    content: Créer src/app/_actions/jobs.ts avec les server actions (create, update, delete, publish)
    status: completed
  - id: create-api-route
    content: Créer src/app/api/admin/jobs/route.ts pour récupérer les offres avec filtres
    status: completed
  - id: create-zod-schemas
    content: Créer src/lib/jobs/job-schemas.ts avec les 4 schémas Zod pour le wizard
    status: completed
  - id: create-filters-component
    content: Créer src/components/admin/AdminJobsFilters.tsx avec nuqs pour recherche/filtres
    status: completed
    dependencies:
      - setup-nuqs
  - id: create-create-dialog
    content: Créer src/components/admin/CreateJobDialog.tsx avec react-hook-form et Zod
    status: completed
    dependencies:
      - create-zod-schemas
      - create-server-actions
  - id: create-preview-dialog
    content: Créer src/components/admin/JobPreviewDialog.tsx pour la prévisualisation
    status: completed
  - id: create-edit-dialog
    content: Créer src/components/admin/EditJobDialog.tsx pour la modification (sans Zod)
    status: completed
    dependencies:
      - create-server-actions
  - id: create-delete-dialog
    content: Créer src/components/admin/DeleteJobDialog.tsx pour la suppression
    status: completed
    dependencies:
      - create-server-actions
  - id: move-helpers
    content: Déplacer les helpers et constantes dans src/lib/jobs/job-helpers.ts
    status: completed
  - id: refactor-admin-table
    content: Refactoriser AdminJobsTable.tsx en server component qui affiche uniquement la table
    status: completed
    dependencies:
      - create-api-route
      - create-edit-dialog
      - create-delete-dialog
      - move-helpers
  - id: update-admin-page
    content: Restructurer src/app/admin/page.tsx avec tous les nouveaux composants
    status: completed
    dependencies:
      - create-filters-component
      - create-create-dialog
      - create-preview-dialog
      - refactor-admin-table
---

# Refactorisation du composant AdminJobsTable

## Architecture cible

```javascript
src/app/admin/page.tsx (Server Component)
├── AdminJobsFilters (Client Component avec nuqs)
├── CreateJobDialog (Client Component avec Zod + react-hook-form)
├── JobPreviewDialog (Client Component)
└── AdminJobsTable (Server Component)
    ├── EditJobDialog (Client Component)
    └── DeleteJobDialog (Client Component)
```



## Étapes de refactorisation

### 1. Configuration nuqs

**Fichier**: `src/app/layout.tsx`

- Ajouter `NuqsAdapter` autour de `{children}` pour activer la gestion des paramètres URL dans toute l'application

### 2. Server Actions pour les opérations CRUD

**Fichier**: `src/app/_actions/jobs.ts`

- Gérer les server actions avec simplement:
- `createJobAction` : Création d'offre (FormData avec logo)
- `updateJobAction` : Mise à jour d'offre (FormData avec logo optionnel)
- `deleteJobAction` : Suppression d'offre
- `publishJobAction` : Publication d'offre
- Utiliser la logique de `src/hooks/admin/useAdminJobs.ts` pour les appels API
- Gérer les erreurs et retourner des résultats typés

### 3. API Route pour récupérer les offres

**Fichier**: `src/app/api/admin/jobs/route.ts`

- Créer une route GET qui :
- Récupère les paramètres de recherche/filtres depuis `searchParams`
- Appelle l'API backend en utilisant fetch en prenant exemple de `useAdminJobs.getAllJobs()`
- Transforme les résultats avec `transformJob` de `usePublishedJobs.ts`
- réponse paginée de type `JobPage`
- Appliquer les filtres correspondants
- Gérer l'authentification avec les cookies

### 4. Composant de recherche et filtres

**Fichier**: `src/components/admin/AdminJobsFilters.tsx` (Client Component)

- Utiliser `useQueryState` de nuqs pour :
- `searchTerm` (string)
- `statusFilter` (string avec valeurs: "all", "PUBLISHED", "PENDING", "DRAFT")
- `typeFilter` (string avec valeurs: "all", "CDI", "CDD", etc.)
- Afficher les inputs de recherche et les Select pour les filtres
- Les valeurs sont synchronisées avec l'URL automatiquement

### 5. Schémas Zod pour la création d'offre

**Fichier**: `src/lib/jobs/job-schemas.ts`

- Créer 4 schémas Zod correspondant aux 4 étapes :
- `companyStepSchema` : companyName, companyEmail, companyDescription, sectorId, companyLength
- `generalInfoStepSchema` : title, description (SerializedEditorState), workCountryLocation, workCityLocation, expirationDate
- `jobDetailsStepSchema` : jobType, responsibilities, requirements, benefits, salary, contractType, tagDto
- `advancedOptionsStepSchema` : requiredLanguage, isUrgent, postNumber, requiredDocuments
- Créer un schéma global `createJobSchema` qui combine les 4 étapes
- Utiliser `.refine()` pour les validations croisées si nécessaire

### 6. Composant de création d'offre

**Fichier**: `src/components/admin/CreateJobDialog.tsx` (Client Component)

- Utiliser `react-hook-form` avec `zodResolver` et le schéma global
- Implémenter le wizard en 4 étapes avec validation par étape
- Gérer l'upload du logo avec FormData
- Après succès : fermer le dialog, réinitialiser le formulaire, appeler `router.refresh()`
- Supprimer la fonction `canGoToNextStep` et utiliser la validation Zod à la place

### 7. Composant de prévisualisation

**Fichier**: `src/components/admin/JobPreviewDialog.tsx` (Client Component)

- Afficher un résumé de l'offre avant publication
- Utiliser `ReadonlyEditor` pour les champs riches
- Bouton "Publier" qui appelle `createJobAction` puis `publishJobAction`
- Ou simplement afficher les données en lecture seule

### 8. Composant de modification d'offre

**Fichier**: `src/components/admin/EditJobDialog.tsx` (Client Component)

- Garder la logique actuelle (sans Zod pour l'instant comme demandé)
- Utiliser `useServerAction` pour appeler `updateJobAction`
- Gérer l'upload du logo optionnel
- Après succès : fermer le dialog, appeler `router.refresh()`

### 9. Composant de suppression d'offre

**Fichier**: `src/components/admin/DeleteJobDialog.tsx` (Client Component)

- Dialog de confirmation simple
- Utiliser `useServerAction` pour appeler `deleteJobAction`
- Après succès : fermer le dialog, appeler `router.refresh()`

### 10. Refactorisation de AdminJobsTable

**Fichier**: `src/components/admin/AdminJobsTable.tsx` (Server Component)

- Transformer en Server Component
- Récupérer les paramètres de recherche via `createSearchParamsCache` de nuqs (côté serveur)
- Appeler l'API route `/api/admin/jobs` avec les paramètres
- Afficher uniquement la table avec les données
- Intégrer `EditJobDialog` et `DeleteJobDialog` comme composants enfants
- Supprimer toutes les fonctions/logiques non utilisées :
- `canGoToNextStep`
- `handleCreateJob`
- `handlePublishClick`
- `confirmDelete`
- États de création/modification
- Logique de filtrage (déplacée dans l'API route)
- Garder uniquement : `getStatusBadge`, `getContractTypeLabel`, et les helpers de formatage

### 11. Page principale admin

**Fichier**: `src/app/admin/page.tsx` (Server Component)

- utilsier  await ServiceParamsCache.parse(searchParams);
- Importer et organiser les composants :
- `AdminJobsFilters`
- `CreateJobDialog` (avec bouton trigger)
- `JobPreviewDialog`
- `AdminJobsTable` (dans un Suspense)
- Gérer la structure de layout

### 12. Déplacement des helpers

**Fichier**: `src/lib/jobs/job-helpers.ts`

- Déplacer les constantes et helpers :
- `STEPS`
- `DOCUMENT_TYPES`
- `ContractTypeLabels`
- `getContractTypeLabel`
- `companySizeRanges`
- `salaryRanges`
- `documentLabels`
- Nettoyer `AdminJobsTable.tsx` de ces éléments

### 13. Types et interfaces

**Fichier**: `src/types/job.ts`

- Centraliser les types liés aux jobs si nécessaire
- `TagDto` peut rester dans `AdminJobsTable` ou être déplacé

## Fichiers à créer/modifier

### Nouveaux fichiers

- `src/app/_actions/jobs.ts`
- `src/app/api/admin/jobs/route.ts`
- `src/components/admin/AdminJobsFilters.tsx`
- `src/components/admin/CreateJobDialog.tsx`
- `src/components/admin/JobPreviewDialog.tsx`
- `src/components/admin/EditJobDialog.tsx`
- `src/components/admin/DeleteJobDialog.tsx`
- `src/lib/jobs/job-schemas.ts`
- `src/lib/jobs/job-helpers.ts`

### Fichiers à modifier

- `src/app/layout.tsx` (ajouter NuqsAdapter)
- `src/app/admin/page.tsx` (restructurer avec les nouveaux composants)
- `src/components/admin/AdminJobsTable.tsx` (refactoriser en server component)

### Fichiers à nettoyer

- `src/components/admin/AdminJobsTable.tsx` (supprimer code inutilisé)

## Points d'attention

1. **Authentification** : S'assurer que les server actions et API routes vérifient l'authentification admin