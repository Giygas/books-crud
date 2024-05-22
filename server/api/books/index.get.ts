import { db } from "~/server/database/db"
import { books, type selectBook } from "~/server/database/schema"

export default eventHandler(async () => {
  const allBooks = (await db.select().from(books)) as selectBook[]

  return allBooks
})
