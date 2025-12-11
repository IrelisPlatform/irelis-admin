// src/app/blog/page.tsx

import { BlogPage } from '@/components/blog/BlogPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog RH',
  description: 'Actualités RH, conseils carrière et recrutement en Afrique.',
};

export default function Blog() {
  return <BlogPage />;
}