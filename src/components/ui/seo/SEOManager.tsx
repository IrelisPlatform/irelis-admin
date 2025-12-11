//src/componets/ui/seo/SEOManager.tsx

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Save, 
  Eye, 
  AlertCircle, 
  CheckCircle2,
  Link as LinkIcon,
  FileText,
  Share2,
  Code,
} from 'lucide-react';
import { SEOMetaData } from '@/components/ui/seo/SEOHead';
import { toast } from 'sonner';

interface SEOManagerProps {
  initialData?: SEOMetaData;
  onSave?: (data: SEOMetaData) => void;
  pageUrl?: string;
}

export function SEOManager({ initialData, onSave, pageUrl = '' }: SEOManagerProps) {
  const [meta, setMeta] = useState<SEOMetaData>(
    initialData || {
      title: '',
      description: '',
      canonical: '',
      keywords: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      noIndex: false,
      noFollow: false,
    }
  );

  const [previewMode, setPreviewMode] = useState<'google' | 'facebook' | 'twitter'>('google');

  const updateMeta = (field: keyof SEOMetaData, value: any) => {
    setMeta({ ...meta, [field]: value });
  };

  const handleSave = () => {
    onSave?.(meta);
    toast.success('Paramètres SEO enregistrés');
  };

  const getTitleLength = () => meta.title?.length || 0;
  const getDescriptionLength = () => meta.description?.length || 0;

  const titleStatus = getTitleLength() === 0 
    ? 'empty' 
    : getTitleLength() < 50 || getTitleLength() > 60 
    ? 'warning' 
    : 'good';

  const descriptionStatus = getDescriptionLength() === 0
    ? 'empty'
    : getDescriptionLength() < 150 || getDescriptionLength() > 160
    ? 'warning'
    : 'good';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-[#14548C]" />
          Paramètres SEO
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basique</TabsTrigger>
            <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
            <TabsTrigger value="advanced">Avancé</TabsTrigger>
            <TabsTrigger value="preview">Aperçu</TabsTrigger>
          </TabsList>

          {/* Onglet Basique */}
          <TabsContent value="basic" className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="title">Titre de la page</Label>
                <div className="flex items-center gap-2">
                  <Badge variant={titleStatus === 'good' ? 'default' : 'outline'} className={
                    titleStatus === 'good' ? 'bg-green-100 text-green-800' :
                    titleStatus === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {getTitleLength()} caractères
                  </Badge>
                  {titleStatus === 'good' && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                  {titleStatus === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                </div>
              </div>
              <Input
                id="title"
                value={meta.title}
                onChange={(e) => updateMeta('title', e.target.value)}
                placeholder="Ex: Trouvez un emploi au Cameroun - Irelis"
                maxLength={70}
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommandé: 50-60 caractères. Apparaît dans les résultats de recherche.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="description">Meta description</Label>
                <Badge variant={descriptionStatus === 'good' ? 'default' : 'outline'} className={
                  descriptionStatus === 'good' ? 'bg-green-100 text-green-800' :
                  descriptionStatus === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }>
                  {getDescriptionLength()} caractères
                </Badge>
              </div>
              <Textarea
                id="description"
                value={meta.description}
                onChange={(e) => updateMeta('description', e.target.value)}
                placeholder="Décrivez le contenu de cette page en quelques mots..."
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommandé: 150-160 caractères. Résumé affiché dans les résultats.
              </p>
            </div>

            <div>
              <Label htmlFor="keywords">Mots-clés</Label>
              <Input
                id="keywords"
                value={meta.keywords}
                onChange={(e) => updateMeta('keywords', e.target.value)}
                placeholder="emploi cameroun, recrutement, offres d'emploi"
              />
              <p className="text-xs text-gray-500 mt-1">
                Séparez les mots-clés par des virgules. Moins important aujourd'hui.
              </p>
            </div>

            <div>
              <Label htmlFor="canonical">URL canonique</Label>
              <Input
                id="canonical"
                value={meta.canonical}
                onChange={(e) => updateMeta('canonical', e.target.value)}
                placeholder={pageUrl || 'https://irelis.cm/page'}
              />
              <p className="text-xs text-gray-500 mt-1">
                URL préférée pour cette page. Évite le contenu dupliqué.
              </p>
            </div>
          </TabsContent>

          {/* Onglet Réseaux sociaux */}
          <TabsContent value="social" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#14548C]">
                <Share2 className="h-5 w-5" />
                <h3 className="font-medium">Open Graph (Facebook, LinkedIn)</h3>
              </div>

              <div>
                <Label htmlFor="og-title">Titre OG</Label>
                <Input
                  id="og-title"
                  value={meta.ogTitle}
                  onChange={(e) => updateMeta('ogTitle', e.target.value)}
                  placeholder={meta.title || 'Titre pour les réseaux sociaux'}
                />
              </div>

              <div>
                <Label htmlFor="og-description">Description OG</Label>
                <Textarea
                  id="og-description"
                  value={meta.ogDescription}
                  onChange={(e) => updateMeta('ogDescription', e.target.value)}
                  placeholder={meta.description || 'Description pour les réseaux sociaux'}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="og-image">Image OG (URL)</Label>
                <Input
                  id="og-image"
                  value={meta.ogImage}
                  onChange={(e) => updateMeta('ogImage', e.target.value)}
                  placeholder="https://irelis.cm/images/og-image.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommandé: 1200x630px. Image affichée lors du partage.
                </p>
              </div>

              <div>
                <Label htmlFor="og-type">Type OG</Label>
                <select
                  id="og-type"
                  value={meta.ogType}
                  onChange={(e) => updateMeta('ogType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="website">Site web</option>
                  <option value="article">Article</option>
                  <option value="profile">Profil</option>
                </select>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#14548C]">
                <Share2 className="h-5 w-5" />
                <h3 className="font-medium">Twitter Card</h3>
              </div>

              <div>
                <Label htmlFor="twitter-card">Type de carte</Label>
                <select
                  id="twitter-card"
                  value={meta.twitterCard}
                  onChange={(e) => updateMeta('twitterCard', e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="summary">Résumé</option>
                  <option value="summary_large_image">Résumé avec grande image</option>
                </select>
              </div>

              <div>
                <Label htmlFor="twitter-title">Titre Twitter</Label>
                <Input
                  id="twitter-title"
                  value={meta.twitterTitle}
                  onChange={(e) => updateMeta('twitterTitle', e.target.value)}
                  placeholder={meta.ogTitle || meta.title || 'Titre pour Twitter'}
                />
              </div>
            </div>
          </TabsContent>

          {/* Onglet Avancé */}
          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">NoIndex</p>
                  <p className="text-sm text-gray-600">
                    Empêcher l'indexation par les moteurs de recherche
                  </p>
                </div>
                <Switch
                  checked={meta.noIndex}
                  onCheckedChange={(checked) => updateMeta('noIndex', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">NoFollow</p>
                  <p className="text-sm text-gray-600">
                    Empêcher le suivi des liens sur cette page
                  </p>
                </div>
                <Switch
                  checked={meta.noFollow}
                  onCheckedChange={(checked) => updateMeta('noFollow', checked)}
                />
              </div>

              {(meta.noIndex || meta.noFollow) && (
                <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Attention</p>
                    <p>Cette page ne sera pas indexée par les moteurs de recherche.</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Onglet Aperçu */}
          <TabsContent value="preview" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button
                variant={previewMode === 'google' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('google')}
                className={previewMode === 'google' ? 'bg-[#14548C]' : ''}
              >
                Google
              </Button>
              <Button
                variant={previewMode === 'facebook' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('facebook')}
                className={previewMode === 'facebook' ? 'bg-[#14548C]' : ''}
              >
                Facebook
              </Button>
              <Button
                variant={previewMode === 'twitter' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('twitter')}
                className={previewMode === 'twitter' ? 'bg-[#14548C]' : ''}
              >
                Twitter
              </Button>
            </div>

            {previewMode === 'google' && (
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <LinkIcon className="h-3 w-3" />
                    <span>{meta.canonical || pageUrl || 'irelis.cm'}</span>
                  </div>
                  <h3 className="text-xl text-blue-600 hover:underline cursor-pointer">
                    {meta.title || 'Titre de la page'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {meta.description || 'Description de la page qui apparaîtra dans les résultats de recherche Google.'}
                  </p>
                </div>
              </div>
            )}

            {previewMode === 'facebook' && (
              <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                {meta.ogImage && (
                  <img
                    src={meta.ogImage}
                    alt="Aperçu"
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-4 bg-gray-50">
                  <p className="text-xs text-gray-500 uppercase mb-1">
                    {new URL(meta.canonical || pageUrl || 'https://irelis.cm').hostname}
                  </p>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {meta.ogTitle || meta.title || 'Titre de la page'}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {meta.ogDescription || meta.description || 'Description'}
                  </p>
                </div>
              </div>
            )}

            {previewMode === 'twitter' && (
              <div className="border border-gray-300 rounded-2xl overflow-hidden bg-white max-w-md">
                {meta.twitterImage || meta.ogImage ? (
                  <img
                    src={meta.twitterImage || meta.ogImage}
                    alt="Aperçu"
                    className="w-full h-48 object-cover"
                  />
                ) : null}
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {meta.twitterTitle || meta.ogTitle || meta.title || 'Titre'}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                    {meta.twitterDescription || meta.ogDescription || meta.description || 'Description'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new URL(meta.canonical || pageUrl || 'https://irelis.cm').hostname}
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Aperçu
          </Button>
          <Button onClick={handleSave} className="bg-[#14548C] hover:bg-[#0d3a5f]">
            <Save className="h-4 w-4 mr-2" />
            Enregistrer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
