import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    author: z.string().default('Q:XS Team'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const reports = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reports' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string(),
    category: z.string(),
    author: z.string().default('Q:XS Research'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, reports };
