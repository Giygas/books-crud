import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const books = sqliteTable("books", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  publicationYear: integer("publication_year").notNull(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  coverURL: text("cover_URL").notNull(),
  isbn: integer("isbn").unique(),
  openLibraryKey: text("open_library_key").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Coerce the publication date String into a Date type
export const insertBookSchema = createInsertSchema(books, {
  id: z.coerce.number(),
  publicationYear: z.coerce.number(),
  isbn: z.coerce.number().nullable(),
});

export const selectBookSchema = createSelectSchema(books);

export type Book = typeof books.$inferSelect;
