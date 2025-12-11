import { useEffect } from 'react';

export interface SEOMetaData {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

interface SEOHeadProps {
  meta: SEOMetaData;
}

export function SEOHead({ meta }: SEOHeadProps) {
  useEffect(() => {
    // Mise à jour du titre
    document.title = meta.title;

    // Suppression des anciennes balises meta
    const existingMetas = document.querySelectorAll(
      'meta[data-seo="true"]'
    );
    existingMetas.forEach(tag => tag.remove());

    // Suppression des anciennes balises canonical
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) existingCanonical.remove();

    // Ajout des nouvelles balises meta
    const head = document.head;

    // Meta description
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = meta.description;
    metaDescription.setAttribute('data-seo', 'true');
    head.appendChild(metaDescription);

    // Keywords
    if (meta.keywords) {
      const metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = meta.keywords;
      metaKeywords.setAttribute('data-seo', 'true');
      head.appendChild(metaKeywords);
    }

    // Canonical URL
    if (meta.canonical) {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = meta.canonical;
      head.appendChild(canonical);
    }

    // Robots
    if (meta.noIndex || meta.noFollow) {
      const robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      const robotsContent = [];
      if (meta.noIndex) robotsContent.push('noindex');
      if (meta.noFollow) robotsContent.push('nofollow');
      robotsMeta.content = robotsContent.join(', ');
      robotsMeta.setAttribute('data-seo', 'true');
      head.appendChild(robotsMeta);
    }

    // Open Graph
    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = meta.ogTitle || meta.title;
    ogTitle.setAttribute('data-seo', 'true');
    head.appendChild(ogTitle);

    const ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.content = meta.ogDescription || meta.description;
    ogDescription.setAttribute('data-seo', 'true');
    head.appendChild(ogDescription);

    const ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.content = meta.ogType || 'website';
    ogType.setAttribute('data-seo', 'true');
    head.appendChild(ogType);

    if (meta.ogImage) {
      const ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      ogImage.content = meta.ogImage;
      ogImage.setAttribute('data-seo', 'true');
      head.appendChild(ogImage);
    }

    // Twitter Card
    const twitterCard = document.createElement('meta');
    twitterCard.name = 'twitter:card';
    twitterCard.content = meta.twitterCard || 'summary_large_image';
    twitterCard.setAttribute('data-seo', 'true');
    head.appendChild(twitterCard);

    const twitterTitle = document.createElement('meta');
    twitterTitle.name = 'twitter:title';
    twitterTitle.content = meta.twitterTitle || meta.title;
    twitterTitle.setAttribute('data-seo', 'true');
    head.appendChild(twitterTitle);

    const twitterDescription = document.createElement('meta');
    twitterDescription.name = 'twitter:description';
    twitterDescription.content = meta.twitterDescription || meta.description;
    twitterDescription.setAttribute('data-seo', 'true');
    head.appendChild(twitterDescription);

    if (meta.twitterImage) {
      const twitterImage = document.createElement('meta');
      twitterImage.name = 'twitter:image';
      twitterImage.content = meta.twitterImage;
      twitterImage.setAttribute('data-seo', 'true');
      head.appendChild(twitterImage);
    }
  }, [meta]);

  return null;
}
