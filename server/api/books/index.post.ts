import { db } from "~/server/database/db"
import { books, insertBookSchema } from "~/server/database/schema"

export default defineEventHandler(async (event) => {
  // handle POST requests for the 'api/books' endpoint
  const body = await readBody(event)

  const { error } = insertBookSchema.safeParse(body)

  if (error) {
    return {
      error: true,
      errors: error.flatten().fieldErrors,
    }
  } else {
    // If there are no errors, insert the body into the database
    const book = insertBookSchema.parse(body)
    try {
      const query = await db.insert(books).values(book)
    } catch (e) {
      return { success: false, message: "Database acting weird", error: e }
    }
    return { success: true, message: "The book has been added" }
  }
})
