import { sql } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

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

export type insertBook = typeof books.$inferInsert
export type selectBook = typeof books.$inferSelect
export type insertUser = typeof users.$inferInsert
export type selectUser = typeof users.$inferSelect
