import { useEffect } from 'react';

export type SchemaType =
  | 'Organization'
  | 'JobPosting'
  | 'Article'
  | 'FAQPage'
  | 'BreadcrumbList'
  | 'WebSite'
  | 'Course'
  | 'Person'
  | 'Service';

interface StructuredDataProps {
  type: SchemaType;
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    };

    const scriptId = `schema-${type}-${JSON.stringify(data).substring(0, 20)}`;
    
    // Supprimer l'ancien script s'il existe
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Créer un nouveau script
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, data]);

  return null;
}

// Helpers pour créer des schémas courants

export const createOrganizationSchema = (name: string, url: string, logo: string, description: string) => ({
  name,
  url,
  logo,
  description,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+237-696-712-213',
    contactType: 'customer service',
    areaServed: ['CM', 'CI', 'SN', 'GA', 'CG', 'CD', 'BJ', 'TG', 'ML', 'BF'],
    availableLanguage: ['French'],
  },
  sameAs: [
    'https://wa.me/237696712213',
  ],
});

export const createJobPostingSchema = (
  title: string,
  description: string,
  company: string,
  location: string,
  salary?: { min: number; max: number; currency: string }
) => ({
  title,
  description,
  hiringOrganization: {
    '@type': 'Organization',
    name: company,
  },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: location,
      addressCountry: 'CM',
    },
  },
  datePosted: new Date().toISOString(),
  employmentType: 'FULL_TIME',
  ...(salary && {
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: salary.currency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: salary.min,
        maxValue: salary.max,
        unitText: 'MONTH',
      },
    },
  }),
});

export const createArticleSchema = (
  headline: string,
  description: string,
  author: string,
  datePublished: string,
  image?: string
) => ({
  headline,
  description,
  author: {
    '@type': 'Person',
    name: author,
  },
  datePublished,
  dateModified: datePublished,
  publisher: {
    '@type': 'Organization',
    name: 'Irelis',
    logo: {
      '@type': 'ImageObject',
      url: 'https://irelis.cm/logo.png',
    },
  },
  ...(image && { image }),
});

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const createCourseSchema = (
  name: string,
  description: string,
  provider: string,
  price?: { amount: number; currency: string }
) => ({
  name,
  description,
  provider: {
    '@type': 'Organization',
    name: provider,
  },
  ...(price && {
    offers: {
      '@type': 'Offer',
      price: price.amount,
      priceCurrency: price.currency,
    },
  }),
});