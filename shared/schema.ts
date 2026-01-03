import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";

export const snippets = pgTable("snippets", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  language: text("language").notNull(),
  code: text("code").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});