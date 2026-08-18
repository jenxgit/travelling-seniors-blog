import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string(),
    author: z.object({
      name: z.string(),
      avatar: z.string(),
      role: z.string().optional().default('Senior Travel Editor'),
    }),
    image: z.object({
      url: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    }),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    readingTime: z.string().optional().default('5 min read'),
  }),
});

export const collections = { news };
