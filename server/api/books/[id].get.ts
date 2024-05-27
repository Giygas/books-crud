import { eq } from "drizzle-orm"
import { db } from "~/server/database/db"
import { books } from "~/server/database/schema"
import type { Book } from "~/server/database/schema"

export default defineEventHandler(async (event) => {
  const bookId = Number(getRouterParam(event, "id"))

  const book = await db
    .select()
    .from(books)
    .where(eq(books.id, bookId))
    .limit(1)

  if (book) {
    return book[0] as unknown as Book
  } else {
    return null
  }
})
