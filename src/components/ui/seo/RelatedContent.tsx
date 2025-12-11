import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export interface RelatedItem {
  id: string;
  title: string;
  description?: string;
  link?: string;
  onClick?: () => void;
  image?: string;
  category?: string;
}

interface RelatedContentProps {
  items: RelatedItem[];
  title?: string;
  type?: 'articles' | 'jobs' | 'courses' | 'generic';
  className?: string;
}

export function RelatedContent({ 
  items, 
  title,
  type = 'generic',
  className = '' 
}: RelatedContentProps) {
  const defaultTitles = {
    articles: 'Articles similaires',
    jobs: 'Offres similaires',
    courses: 'Formations recommandées',
    generic: 'Vous pourriez aussi aimer',
  };

  const displayTitle = title || defaultTitles[type];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#14548C]">
          <Sparkles className="h-5 w-5" />
          {displayTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <button
              onClick={item.onClick}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-[#14548C] hover:shadow-md transition-all bg-white"
            >
              <div className="flex items-start gap-3">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  {item.category && (
                    <span className="text-xs text-[#14548C] font-medium mb-1 block">
                      {item.category}
                    </span>
                  )}
                  <h4 className="font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-[#14548C] transition-colors">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#14548C] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
