// TODO: delete book by id
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
    const parsedBook = selectBookSchema.parse(deletedBook)

    setResponseStatus(event, 200)
    return {
      success: true,
      deletedBook: parsedBook,
      message: `Book ${parsedBook.title} deleted from the database`,
    }
  } else {
    setResponseStatus(event, 500)
    return {
      success: false,
      deletedBook: undefined,
      message: "Error deleting book from the database",
    }
  }
})
