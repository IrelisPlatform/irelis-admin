import { useEffect } from 'react';
import { useCountry } from '../../contexts/CountryContext';
import { logger } from '../../utils/logger';

interface LocalizedSEOProps {
  pageType?: 'home' | 'jobs' | 'company' | 'blog' | 'recruiter';
  customTitle?: string;
  customDescription?: string;
}

export function LocalizedSEO({ pageType = 'home', customTitle, customDescription }: LocalizedSEOProps) {
  const { currentCountry } = useCountry();

  useEffect(() => {
    // Si pas de pays sélectionné, ne rien faire
    if (!currentCountry) return;

    const getPageTitle = () => {
      if (customTitle) return customTitle;

      const pageTitles: Record<string, string> = {
        home: currentCountry.seoTitle,
        jobs: `Offres d'emploi ${currentCountry.name} | ${currentCountry.subdomain}.irelis.com`,
        company: `Entreprises qui recrutent ${currentCountry.name} | Irelis`,
        blog: `Blog carrière ${currentCountry.name} | Conseils emploi`,
        recruiter: `Recruteurs ${currentCountry.name} | Publier une offre d'emploi`,
      };

      return pageTitles[pageType] || currentCountry.seoTitle;
    };

    const getPageDescription = () => {
      if (customDescription) return customDescription;
      return currentCountry.seoDescription;
    };

    try {
      // Update title
      document.title = getPageTitle();

      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', getPageDescription());

      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', currentCountry.seoKeywords.join(', '));
    } catch (error) {
      logger.error('LocalizedSEO error:', error);
    }

  }, [currentCountry, pageType, customTitle, customDescription]);

  return null;
}