import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Internal API routes (fallback/optional if Supabase is used on client)
  
  app.get(api.snippets.list.path, async (req, res) => {
    const snippets = await storage.getSnippets();
    res.json(snippets);
  });

  app.post(api.snippets.create.path, async (req, res) => {
    try {
      const input = api.snippets.create.input.parse(req.body);
      const snippet = await storage.createSnippet(input);
      res.status(201).json(snippet);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
