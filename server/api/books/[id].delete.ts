import { eq } from "drizzle-orm"
import { db } from "~/server/database/db"
import { books, selectBookSchema } from "~/server/database/schema"

export default defineEventHandler(async (event) => {
  const bookId = Number(getRouterParam(event, "id"))

  const deletedBook = await db
    .delete(books)
    .where(eq(books.id, bookId))
    .returning()

  if (deletedBook) {
    const parsedBook = selectBookSchema.parse(deletedBook[0])

    setResponseStatus(event, 200)
    return {
      success: true,
      data: parsedBook,
      message: `Book ${parsedBook.title} deleted from the database`,
    }
  } else {
    setResponseStatus(event, 500)
    return {
      success: false,
      data: undefined,
      message: "Error deleting book from the database",
    }
  }
})
