import { eq } from "drizzle-orm"
import { db } from "~/server/database/db"
import { books, insertBookSchema } from "~/server/database/schema"

export default defineEventHandler(async (event) => {
  // handle PUT requests for the 'api/books/[id]' endpoint
  const bookId = Number(getRouterParam(event, "id"))
  const body = await readBody(event)

  const { data, error } = insertBookSchema
    .omit({ createdAt: true })
    .safeParse(body)

  if (error) {
    setResponseStatus(event, 400)
    return {
      success: false,
      error: true,
      message: error.flatten().fieldErrors,
    }
  } else {
    // Separate the book id so it won't update in the database
    const updatedBook = data
    delete updatedBook.id

    // If there are no errors, update the database
    let update
    try {
      update = await db
        .update(books)
        .set({ ...updatedBook })
        .where(eq(books.id, bookId))
    } catch (e) {
      setResponseStatus(event, 500)
      return { success: false, error: true, message: String() }
    }
    setResponseStatus(event, 202)
    return {
      success: true,
      message: "The book has been updated",
      updated: update,
    }
  }
})
