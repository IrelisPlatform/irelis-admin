// src/types/accompaniment.ts
export interface Accompaniment {
  id: string;
  accompanimentId: string;
  title: string;
  imageUrl: string;
  shortDescription: string;

  contents: string[];
  details: string[];
  targets: string[];

  duration: string;
  price: number;
  originalPrice: number;

  rewards: string[];
  guarantees: string[];

  categoryId: string;
  tagNames: { name: string }[];
}

export interface AccompanimentPage {
  content: Accompaniment[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  first: boolean;
  last: boolean;
}
