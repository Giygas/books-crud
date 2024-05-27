import { sql } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const books = sqliteTable("books", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  publicationDate: integer("publication_date", { mode: "timestamp" }).notNull(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  isbn: integer("isbn").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Coerce the publication date String into a Date type
export const insertBookSchema = createInsertSchema(books, {
  publicationDate: z.coerce.date(),
})

export const selectBookSchema = createSelectSchema(books, {
  publicationDate: z.coerce.date(),
})

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  books: text("books", { mode: "json" })
    .notNull()
    .$type<string[]>()
    .default(sql`'[]'`),
})

export const insertUserSchema = createInsertSchema(users)

export type Book = typeof books.$inferSelect
export type User = typeof users.$inferSelect
