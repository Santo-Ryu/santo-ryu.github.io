import { defineCollection } from "astro:content";
import { z } from "astro:schema";
import { glob } from 'astro/loaders'

const reports = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reports' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).default([]),
    difficulty: z.string().optional(),
    author: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const journey = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journey' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).default([]),
    difficulty: z.string().optional(),
    author: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  reports, journey
};
