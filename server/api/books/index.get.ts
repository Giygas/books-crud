import { db } from "~/server/database/db"
import { books, type Book } from "~/server/database/schema"

export default eventHandler(async () => {
  const allBooks = (await db.select().from(books)) as Book[]

  return allBooks
})
