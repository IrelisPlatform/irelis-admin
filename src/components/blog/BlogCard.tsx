// src/components/blog/BlogCard.tsx

'use client';

import { Calendar, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from '@/components/blog/ImageWithFallback';

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: 'actualites' | 'code-travail' | 'conseils-candidats' | 'conseils-entreprises';
  categoryLabel: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  verified?: boolean;
  tags: string[];
}

interface BlogCardProps {
  article: BlogArticle;
  onClick: (article: BlogArticle) => void;
}

export function BlogCard({ article, onClick }: BlogCardProps) {
  const categoryColors = {
    'actualites': 'bg-purple-100 text-purple-700',
    'code-travail': 'bg-red-100 text-red-700',
    'conseils-candidats': 'bg-blue-100 text-blue-700',
    'conseils-entreprises': 'bg-green-100 text-green-700',
  };

  return (
    <div 
      onClick={() => onClick(article)}
      className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <ImageWithFallback
          src={article.image}
          alt={article.title}
          width={300}
          height={200}
          className="w-full h-full object-cover"
        />
        {article.verified && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Vérifié
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category & Meta */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs ${categoryColors[article.category]}`}>
            {article.categoryLabel}
          </span>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag) => (
            <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>

        {/* Author & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Par {article.author}</span>
          <button className="text-primary text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Lire la suite
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}