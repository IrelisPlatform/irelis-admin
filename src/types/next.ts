// src/types/next.ts

import type { ReadonlyURLSearchParams } from "next/navigation";

export type PageParams<TParams extends Record<string, string> = {}> = {
  params: Promise<TParams>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export type LayoutParams<TParams extends Record<string, string> = {}> = {
  params: Promise<TParams>;
  children: React.ReactNode;
};

