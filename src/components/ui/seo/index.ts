// src/components/ui/seo/index.ts

export { SEOHead } from './SEOHead';
export type { SEOMetaData } from './SEOHead';

export { Breadcrumb } from './Breadcrumb';
export type { BreadcrumbItem } from './Breadcrumb';

export { FAQBlock } from './FAQBlock';
export type { FAQItem } from './FAQBlock';

export { RelatedContent } from './RelatedContent';
export type { RelatedItem } from './RelatedContent';

export { StructuredData } from './StructuredData';
export type { SchemaType } from './StructuredData';
export {
  createOrganizationSchema,
  createJobPostingSchema,
  createArticleSchema,
  createFAQSchema,
  createBreadcrumbSchema,
  createCourseSchema,
} from './StructuredData';

export { PerformanceIndicator, PerformanceMetrics } from './PerformanceIndicator';

export { OptimizedImage, ImageAltEditor } from './OptimizedImage';

export { SEOManager } from './SEOManager';
