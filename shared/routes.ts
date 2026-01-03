import { z } from 'zod';
import { insertSnippetSchema, snippets } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  snippets: {
    list: {
      method: 'GET' as const,
      path: '/api/snippets',
      responses: {
        200: z.array(z.custom<typeof snippets.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/snippets',
      input: insertSnippetSchema,
      responses: {
        201: z.custom<typeof snippets.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type InsertSnippet = z.infer<typeof api.snippets.create.input>;
export type SnippetResponse = z.infer<typeof api.snippets.create.responses[201]>;
