import { eq } from "drizzle-orm"
import { db } from "~/server/database/db"
import { books } from "~/server/database/schema"

export default defineEventHandler(async (event) => {
  const bookId = Number(getRouterParam(event, "id"))

  const book = await db.select().from(books).where(eq(books.id, bookId))

  return book
})
