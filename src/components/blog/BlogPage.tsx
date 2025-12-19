// src/components/blog/BlogPage.tsx
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BlogArticleDetail } from '@/components/blog/BlogArticleDetail';
import { BlogCard, BlogArticle } from '@/components/blog/BlogCard';
import { LiveActivity } from '@/components/ui/LiveActivity';
import { SEOHead, Breadcrumb, FAQBlock, RelatedContent, StructuredData } from '@/components/ui/seo';
import type { SEOMetaData, BreadcrumbItem, FAQItem, RelatedItem } from '@/components/ui/seo';
import {
  LayoutGrid,   // pour "Tous les articles"
  Newspaper,    // pour "Actualités RH"
  Scale,        // pour "Code du Travail"
  User,         // pour "Conseils Candidats"
  Building      // pour "Conseils Entreprises"
} from 'lucide-react';

// Articles de blog avec contenu africain
const blogArticles: BlogArticle[] = [
  {
    id: '1',
    title: 'Le marché de l\'emploi en 2025 : Les secteurs qui recrutent',
    excerpt: 'Tendances 2025 : secteurs qui recrutent (Tech, Fintech, Agritech).',
    category: 'actualites',
    categoryLabel: 'Actualités RH',
    author: 'Fatou Ndiaye',
    date: '3 Nov 2025',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1573164574511-73c773193279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjBtZWV0aW5nfGVufDF8fHx8MTc2MjM0Mjc5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    tags: ['emploi', 'tendances', 'recrutement']
  },
  {
    id: '2',
    title: 'Code du Travail OHADA : Droits et devoirs des employés et employeurs',
    excerpt: 'Droit du travail OHADA : contrats, essai, préavis, congés, licenciement.',
    category: 'code-travail',
    categoryLabel: 'Code du Travail',
    author: 'Maître Kofi Mensah',
    date: '1 Nov 2025',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1739300293504-234817eead52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwb2ZmaWNlfGVufDF8fHx8MTc2MjQ0MDk1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    tags: ['droit', 'OHADA', 'contrat', 'juridique']
  },
  {
    id: '3',
    title: 'Comment réussir son entretien d\'embauche : Guide complet',
    excerpt: 'Préparez votre entretien : questions, tenue, comportement, suivi.',
    category: 'conseils-candidats',
    categoryLabel: 'Conseils Candidats',
    author: 'Amadou Diallo',
    date: '30 Oct 2025',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1758519289200-384c7ef2d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwam9iJTIwaW50ZXJ2aWV3fGVufDF8fHx8MTc2MjQ0MDk1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    tags: ['entretien', 'candidature', 'conseils', 'carrière']
  },
  {
    id: '4',
    title: 'Recruter efficacement : Guide pour PME et startups',
    excerpt: 'Recrutement optimisé : de l\'offre à l\'intégration du collaborateur.',
    category: 'conseils-entreprises',
    categoryLabel: 'Conseils Entreprises',
    author: 'Aïcha Traoré',
    date: '28 Oct 2025',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1655720348590-c739c860beed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdGVhbSUyMHdvcmt8ZW58MXx8fHwxNzYyNDQwOTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    tags: ['recrutement', 'RH', 'PME', 'stratégie']
  },
  {
    id: '5',
    title: 'Salaire minimum et grille salariale OHADA 2025',
    excerpt: 'Salaires minimums OHADA 2025 : SMIG, SMAG, grilles par secteur.',
    category: 'code-travail',
    categoryLabel: 'Code du Travail',
    author: 'Maître Kofi Mensah',
    date: '25 Oct 2025',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1616804827035-f4aa814c14ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyMzY1NDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    tags: ['salaire', 'SMIG', 'rémunération', 'droit']
  },
  {
    id: '6',
    title: 'CV gagnant : Modèles et exemples qui marchent en 2025',
    excerpt: 'CV gagnant : structure, contenu, modèles gratuits.',
    category: 'conseils-candidats',
    categoryLabel: 'Conseils Candidats',
    author: 'Amadou Diallo',
    date: '22 Oct 2025',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1573497160825-0d94a2724d40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZW50cmVwcmVuZXVyfGVufDF8fHx8MTc2MjQ0MDk1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    tags: ['CV', 'candidature', 'modèles', 'conseils']
  },
  {
    id: '7',
    title: 'Les 10 erreurs RH qui coûtent cher aux entreprises',
    excerpt: '10 erreurs RH coûteuses : mauvais recrutement, turn-over, conflits.',
    category: 'conseils-entreprises',
    categoryLabel: 'Conseils Entreprises',
    author: 'Aïcha Traoré',
    date: '20 Oct 2025',
    readTime: '11 min',
    image: 'https://images.unsplash.com/photo-1581067102120-97afebb5d0a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwb2ZmaWNlJTIwd29ya2Vyc3xlbnwxfHx8fDE3NjI0NDA5NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    tags: ['erreurs', 'RH', 'management', 'solutions']
  },
  {
    id: '8',
    title: 'Télétravail : Cadre légal et bonnes pratiques',
    excerpt: 'Télétravail : cadre légal, organisation, avantages.',
    category: 'actualites',
    categoryLabel: 'Actualités RH',
    author: 'Fatou Ndiaye',
    date: '18 Oct 2025',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1624948384140-e48e47087fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcmVtb3RlJTIwd29ya3xlbnwxfHx8fDE3NjI0NDA5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    tags: ['télétravail', 'remote', 'digital', 'organisation']
  }
];

type Category = 'all' | 'actualites' | 'code-travail' | 'conseils-candidats' | 'conseils-entreprises';

interface BlogPageProps {
  onTabChange?: (tab: string) => void;
}

export function BlogPage({ onTabChange }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [notifications] = useState(3);
  const [userEmail] = useState('agathnado@gmail.com');

  // Données SEO
  const seoMeta: SEOMetaData = {
    title: 'Blog RH Africain - Actualités Emploi et Recrutement | Irelis',
    description: 'Découvrez les dernières actualités RH, conseils carrière et tendances du marché de l\'emploi en Afrique. Articles sur le recrutement, le droit du travail OHADA et plus.',
    canonical: 'https://irelis.cm/blog',
    keywords: 'blog rh afrique, actualités emploi cameroun, recrutement afrique, conseils carrière, code travail ohada, marché emploi afrique',
    ogTitle: 'Blog RH Africain - Conseils et Actualités Emploi',
    ogDescription: 'Votre source d\'information sur l\'emploi et les RH en Afrique : articles, conseils et analyses du marché du travail.',
    ogImage: 'https://images.unsplash.com/photo-1573164574511-73c773193279?w=1200',
    ogType: 'website',
  };

  // Breadcrumb
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Blog RH', onClick: () => {} },
  ];

  // FAQ
  const faqItems: FAQItem[] = [
    {
      question: 'À quelle fréquence publiez-vous de nouveaux articles ?',
      answer: 'Nous publions 2 à 3 nouveaux articles par semaine sur des sujets variés : actualités RH, conseils carrière, code du travail, et tendances du marché de l\'emploi en Afrique.',
    },
    {
      question: 'Puis-je proposer un sujet d\'article ?',
      answer: 'Oui, nous sommes toujours à l\'écoute de notre communauté. Contactez-nous via WhatsApp ou email pour nous proposer des sujets qui vous intéressent.',
    },
    {
      question: 'Les articles sont-ils rédigés par des experts ?',
      answer: 'Tous nos articles sont rédigés par des professionnels des RH, des juristes spécialisés en droit du travail et des experts du marché de l\'emploi africain.',
    },
    {
      question: 'Comment m\'abonner à la newsletter ?',
      answer: 'Il suffit d\'entrer votre email dans le formulaire de la sidebar. Vous recevrez chaque semaine une sélection d\'articles et d\'offres d\'emploi.',
    },
  ];

  // Articles liés
  const relatedArticles: RelatedItem[] = blogArticles.slice(0, 3).map(article => ({
    id: article.id,
    title: article.title,
    description: article.excerpt,
    category: article.categoryLabel,
    image: article.image,
    onClick: () => setSelectedArticle(article),
  }));

  const filteredArticles = blogArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'Tous les articles', icon: LayoutGrid, color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
    { id: 'actualites', label: 'Actualités RH', icon: Newspaper, color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
    { id: 'code-travail', label: 'Code du Travail', icon: Scale, color: 'bg-red-100 text-red-700 hover:bg-red-200' },
    { id: 'conseils-candidats', label: 'Conseils Candidats', icon: User, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    { id: 'conseils-entreprises', label: 'Conseils Entreprises', icon: Building, color: 'bg-green-100 text-green-700 hover:bg-green-200' },
  ];


   return (
    <div className="w-full">
      {/* SEO Head */}
      <SEOHead meta={seoMeta} />
      
      {/* Structured Data */}
      <StructuredData 
        type="WebSite"
        data={{
          name: 'Irelis Blog RH',
          url: 'https://irelis.cm/blog',
          description: seoMeta.description,
        }}
      />
      
      {/* Widget flottant */}
      <LiveActivity />

      {/* Hero Section */}
      <div className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary via-[#1e3a8a] to-[#1e40af] text-primary-foreground rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl">
              Actualités RH, conseils carrière et recrutement
            </p>

            {/* Search bar */}
            <div className="max-w-2xl">
              <div className="relative">
                <Card className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-amber"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-card border-b border-border sticky top-0 z-sticky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as Category)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap flex items-center gap-2 transition-all ${
                    selectedCategory === cat.id
                      ? cat.color.replace('hover:', '')
                      : cat.color
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {cat.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedCategory === cat.id ? 'bg-white/30' : 'bg-black/10'
                  }`}>
                    {cat.id === 'all' ? blogArticles.length : blogArticles.filter(a => a.category === cat.id).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Articles */}
          <div className="flex-1">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Aucun article trouvé</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <BlogCard
                    key={article.id}
                    article={article}
                    onClick={setSelectedArticle}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block w-80 space-y-6">
            {/* Newsletter */}
            <div className="bg-gradient-to-br from-primary to-[#1e3a8a] text-primary-foreground rounded-lg p-6">
              <h3 className="mb-3">Newsletter RH</h3>
              <p className="text-sm text-white/90 mb-4">
                Articles et offres d'emploi chaque semaine
              </p>
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 rounded-lg text-gray-900 bg-gray-100 mb-3 focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
              />
              <button className="w-full bg-[#FFB800] text-[#030213] py-2 rounded-lg hover:bg-[#FFA500] transition-colors">
                S'abonner
              </button>
            </div>

            {/* Articles populaires */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="mb-4 text-gray-900">Articles populaires</h3>
              <div className="space-y-4">
                {blogArticles.slice(0, 4).map((article) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="cursor-pointer hover:text-[#14548C] transition-colors"
                  >
                    <p className="text-sm line-clamp-2 mb-1">{article.title}</p>
                    <p className="text-xs text-gray-500">{article.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-[#25D366] text-white rounded-lg p-6">
              <h3 className="mb-3">Rejoignez notre communauté</h3>
              <p className="text-sm mb-4">
                +5000 membres actifs partagent offres et conseils RH
              </p>
              <button className="w-full bg-white text-[#25D366] py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Rejoindre le groupe
              </button>
            </div>

            {/* FAQ */}
            <FAQBlock items={faqItems} />
            
            {/* Articles liés */}
            <RelatedContent items={relatedArticles} type="articles" />

          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedArticle && (
        <BlogArticleDetail
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}