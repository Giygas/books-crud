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
    await db.insert(books).values(body)
    return { success: true, message: "The book has been added" }
  }
})
